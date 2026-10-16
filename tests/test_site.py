"""Offline regression checks for the static shell and preserved Gatsby posts.

Run with: python3 -m unittest discover -s tests -p 'test_*.py' -v
Git HEAD supplies the original content while reviewing this migration.
"""

import hashlib
import json
from html.parser import HTMLParser
from pathlib import Path
import subprocess
import unittest
from urllib.parse import unquote, urljoin, urlsplit
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://www.simonxu.com"
PAGES = {
    "index.html": "/",
    "about/index.html": "/about/",
    "projects/index.html": "/projects/",
    "404.html": "/404.html",
    "404/index.html": "/404/",
    "my-files/index.html": "/my-files/",
}
NOINDEX = {"404.html", "404/index.html", "my-files/index.html"}
PROTECTED_DIRS = (
    "posts/", "page-data/posts/", "static/",
    "about/aboutme/", "page-data/about/aboutme/", "icons/",
)


def git(*args):
    return subprocess.check_output(["git", *args], cwd=ROOT)


def original_json(path):
    return json.loads(git("show", f"HEAD:{path}"))


class Element:
    def __init__(self, tag, attrs=()):
        self.tag = tag
        self.attrs = dict(attrs)
        self.children = []

    def find(self, tag):
        found = []
        for child in self.children:
            if isinstance(child, Element):
                if child.tag == tag:
                    found.append(child)
                found.extend(child.find(tag))
        return found

    def text(self):
        return " ".join("".join(
            child.text() if isinstance(child, Element) else child
            for child in self.children
        ).split())


class Document(HTMLParser):
    VOID = {
        "area", "base", "br", "col", "embed", "hr", "img", "input",
        "link", "meta", "param", "source", "track", "wbr",
    }

    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.root = Element("document")
        self.stack = [self.root]
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        element = Element(tag, attrs)
        self.stack[-1].children.append(element)
        if tag not in self.VOID:
            self.stack.append(element)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in self.VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                del self.stack[index:]
                break

    def handle_data(self, data):
        self.stack[-1].children.append(data)


def document(path):
    return Document((ROOT / path).read_text()).root


def local_path(url, page):
    """Resolve a site URL to the corresponding file, excluding other origins."""
    parsed = urlsplit(urljoin(ORIGIN + PAGES.get(page, "/" + page), url))
    if parsed.scheme not in {"http", "https"} or parsed.netloc not in {
        "www.simonxu.com", "simonxu.com",
    }:
        return None
    path = ROOT / unquote(parsed.path).lstrip("/")
    if parsed.path.endswith("/") or path.is_dir():
        path /= "index.html"
    return path


def references(tree):
    for tag in ("a", "link", "script", "img", "source"):
        for element in tree.find(tag):
            for attr in ("href", "src", "poster"):
                if element.attrs.get(attr):
                    yield element.attrs[attr]
            for candidate in element.attrs.get("srcset", "").split(","):
                if candidate.strip():
                    yield candidate.strip().split()[0]


class SiteTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.original_posts = original_json("page-data/index/page-data.json")[
            "result"]["data"]["allMarkdownRemark"]
        cls.nodes = [edge["node"] for edge in cls.original_posts["edges"]]
        cls.pages = {path: document(path) for path in PAGES}

    def test_homepage_preserves_post_content_and_order(self):
        actual = []
        for article in self.pages["index.html"].find("article"):
            links = [a for a in article.find("a")
                     if a.attrs.get("href", "").startswith("/posts/")]
            self.assertEqual(len(links), 1)
            times = article.find("time")
            self.assertEqual(len(times), 1)
            excerpts = article.find("p")
            self.assertEqual(len(excerpts), 1)
            actual.append((links[0].attrs["href"], links[0].text(),
                           times[0].text(), excerpts[0].text()))
        expected = [(node["fields"]["slug"], node["frontmatter"]["title"],
                     node["frontmatter"]["date"], node["excerpt"])
                    for node in self.nodes]
        self.assertEqual(actual, expected)
        self.assertEqual(len(actual), self.original_posts["totalCount"])

    def test_static_pages_have_accessible_landmarks_and_metadata(self):
        titles = {}
        for path, tree in self.pages.items():
            with self.subTest(page=path):
                self.assertEqual(tree.find("html")[0].attrs.get("lang"), "en")
                self.assertEqual(len(tree.find("main")), 1)
                self.assertEqual(len(tree.find("nav")), 1)
                self.assertEqual(len(tree.find("h1")), 1)
                main = tree.find("main")[0]
                self.assertTrue(main.attrs.get("id"))
                self.assertTrue(any(
                    a.attrs.get("href") == "#" + main.attrs["id"]
                    and "skip" in a.text().lower() for a in tree.find("a")))
                self.assertEqual(len(tree.find("title")), 1)
                title = tree.find("title")[0].text()
                self.assertGreater(len(title), 8)
                if path != "404/index.html":
                    self.assertNotIn(title, titles)
                    titles[title] = path
                metas = {m.attrs.get("name"): m.attrs.get("content", "")
                         for m in tree.find("meta")}
                self.assertGreaterEqual(len(metas.get("description", "")), 30)
                self.assertNotEqual(metas["description"].lower(), "sample")
                canonicals = [e for e in tree.find("link")
                              if e.attrs.get("rel") == "canonical"]
                if path in NOINDEX:
                    self.assertIn("noindex", metas.get("robots", ""))
                else:
                    self.assertNotIn("noindex", metas.get("robots", ""))
                    self.assertEqual([e.attrs.get("href") for e in canonicals],
                                     [ORIGIN + PAGES[path]])

    def test_static_page_links_and_assets_resolve(self):
        for page, tree in self.pages.items():
            for url in references(tree):
                with self.subTest(page=page, url=url):
                    path = local_path(url, page)
                    if path is not None:
                        self.assertTrue(path.is_file(), str(path.relative_to(ROOT)))
                    if url.startswith("#"):
                        target = unquote(url[1:])
                        all_elements = [tree] + sum(
                            [tree.find(tag) for tag in {"main", "section", "h1", "h2", "h3"}], [])
                        self.assertTrue(any(e.attrs.get("id") == target
                                            for e in all_elements))

    def test_existing_post_dependencies_resolve(self):
        protected_pages = list((ROOT / "posts").rglob("*.html"))
        protected_pages += list((ROOT / "about/aboutme").rglob("*.html"))
        self.assertTrue(protected_pages)
        for path in protected_pages:
            page = path.relative_to(ROOT).as_posix()
            for url in references(document(page)):
                local = local_path(url, page)
                if local is not None:
                    with self.subTest(page=page, url=url):
                        self.assertTrue(local.is_file(), str(local.relative_to(ROOT)))

    def test_posts_and_legacy_assets_are_byte_for_byte_unchanged(self):
        objects = git("ls-tree", "-r", "-z", "HEAD").split(b"\0")
        object_format = git("rev-parse", "--show-object-format").decode().strip()
        protected = set()
        for record in filter(None, objects):
            metadata, raw_path = record.split(b"\t", 1)
            path = raw_path.decode()
            root_asset = "/" not in path and (
                path.endswith((".js", ".js.map", ".css"))
                or path.startswith("favicon-"))
            if path == "sw.js" or not (path.startswith(PROTECTED_DIRS) or root_asset):
                continue
            protected.add(path)
            with self.subTest(path=path):
                self.assertTrue((ROOT / path).is_file())
                contents = (ROOT / path).read_bytes()
                blob = b"blob " + str(len(contents)).encode() + b"\0" + contents
                self.assertEqual(hashlib.new(object_format, blob).hexdigest(),
                                 metadata.split()[2].decode())
        self.assertTrue(any(path.startswith("posts/") for path in protected))
        for prefix in PROTECTED_DIRS:
            current = {path.relative_to(ROOT).as_posix()
                       for path in (ROOT / prefix).rglob("*") if path.is_file()}
            self.assertEqual(current, {p for p in protected if p.startswith(prefix)})

    def test_static_routes_keep_original_data_and_use_full_page_navigation(self):
        for route in ("index", "about", "projects", "404", "404.html", "my-files"):
            path = f"page-data/{route}/page-data.json"
            with self.subTest(path=path):
                original = original_json(path)
                current = json.loads((ROOT / path).read_text())
                self.assertEqual(current["componentChunkName"], "")
                self.assertEqual(current["path"], original["path"])
                self.assertEqual(current["result"], original["result"])

    def test_sitemap_covers_posts_and_indexable_main_routes(self):
        tree = ET.parse(ROOT / "sitemap.xml")
        namespace = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
        self.assertEqual(tree.getroot().tag, namespace + "urlset")
        urls = [element.text for element in tree.findall(f"{namespace}url/{namespace}loc")]
        expected = {ORIGIN + route for route in ("/", "/about/", "/projects/")}
        expected.update(ORIGIN + node["fields"]["slug"] for node in self.nodes)
        self.assertEqual(set(urls), expected)
        self.assertEqual(len(urls), len(set(urls)))

    def test_domain_and_manifest_configuration(self):
        self.assertEqual((ROOT / "CNAME").read_text().strip(), urlsplit(ORIGIN).hostname)
        self.assertEqual((ROOT / ".nojekyll").read_bytes(), b"")
        self.assertIn(f"Sitemap: {ORIGIN}/sitemap.xml", (ROOT / "robots.txt").read_text())
        manifest = json.loads((ROOT / "manifest.webmanifest").read_text())
        self.assertEqual(manifest["start_url"], "/")
        self.assertNotIn("starter", manifest["name"].lower())
        for icon in manifest["icons"]:
            self.assertTrue(local_path("/" + icon["src"], "index.html").is_file())

    def test_static_pages_have_small_resource_budgets(self):
        for page, tree in self.pages.items():
            with self.subTest(page=page):
                assets = set()
                for tag in ("script", "link"):
                    for element in tree.find(tag):
                        if tag == "link" and element.attrs.get("rel") != "stylesheet":
                            continue
                        url = element.attrs.get("src" if tag == "script" else "href", "")
                        asset = local_path(url, page)
                        self.assertIsNotNone(asset, "Avoid third-party runtime dependencies")
                        assets.add(asset)
                        if tag == "script":
                            self.assertTrue("defer" in element.attrs or "type" in element.attrs
                                            and element.attrs["type"] == "module")
                payload = (ROOT / page).stat().st_size + sum(p.stat().st_size for p in assets)
                self.assertLess(payload, 30_000, "HTML, CSS, and JS should stay below 30 kB")


if __name__ == "__main__":
    unittest.main()
