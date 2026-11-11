# The Mush — simonxu.com

This branch (`master`) is the published, static website. The homepage, About,
Projects, and error pages are plain HTML, with one small shared stylesheet and
a script that retires the previous Gatsby offline cache. They need no build or
package installation. Posts, their data, and their legacy Gatsby assets are
preserved as published.

## Publish to GitHub Pages

The primary URL is **https://simonxu.com/**.

1. Run the checks below, then commit and push `master` to `origin`.
2. In [repository Settings → Pages](https://github.com/simjxu/simjxu.github.io/settings/pages),
   use **Deploy from a branch**, branch **master**, folder **/ (root)**.
   Set **Custom domain** to **simonxu.com** and enable **Enforce HTTPS** once
   the certificate is ready. Keep the root `CNAME` file set to `simonxu.com`
   and `.nojekyll` present to serve these already-built files directly.
3. Wait for the **pages build and deployment** workflow to succeed for the
   pushed commit, then verify the live site:

   ```sh
   curl -I https://simonxu.com/
   curl -I https://simonxu.com/posts/sublimehighlight/
   curl -I https://simonxu.com/assets/site.css
   curl -I http://simonxu.com/
   curl -I https://www.simonxu.com/
   curl -I https://simjxu.github.io/
   ```

   The first three URLs should return `200`. Plain HTTP, `www.simonxu.com`,
   and the GitHub Pages address should redirect to the HTTPS apex domain.
   Also check browser navigation from the homepage to a post and back.

### Custom-domain DNS

The domain's DNS provider must publish these website records:

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `simjxu.github.io` |

Keep email MX/TXT records and unrelated records intact. Remove any conflicting
website records or registrar URL forwarding for `@` and `www`. The `www` CNAME
points directly to the GitHub hostname, without a protocol or path.

Verify the DNS records and wait for GitHub's certificate before enabling
**Enforce HTTPS**. See [GitHub's custom-domain setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

At the November 11 setup check, authoritative and public DNS were correct;
GitHub's certificate issuance was still pending. Complete the HTTPS and redirect
checks above after GitHub approves the certificate.

```sh
dig +short simonxu.com A
dig +short www.simonxu.com CNAME
```

### November 2026 outage

The site initially redirected to `www.simonxu.com` while that hostname had no
DNS record, and the apex domain forwarded back to GitHub through Namecheap.
The published HTML and assets were intact. Clearing the broken custom domain
temporarily restored access at `simjxu.github.io`.

On November 11, the apex A records and `www` CNAME were corrected and the Pages
custom domain was set to `simonxu.com`. Metadata and the sitemap now use that
primary domain. Keep DNS, the Pages setting, and `CNAME` consistent. If a browser
remembers the old permanent redirect, try a private window or clear its cached
redirect.

Reference: [GitHub publishing sources](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Local preview and checks

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open <http://127.0.0.1:8000/>. To check the actual error page locally, open
`/404.html` (Python's server has its own response for missing paths).

```sh
python3 -m unittest discover -s tests -p 'test_*.py' -v
node --test tests/retire-worker.test.mjs
git diff --check
```

The main pages work without JavaScript. The deferred retirement script updates
only an existing root Gatsby service worker. Its replacement at `/sw.js` clears
only Gatsby's offline caches and unregisters itself, so returning readers receive
current HTML. Keep `/sw.js` available for existing visitors and legacy posts.

## Editing and legacy Gatsby source

Edit the main HTML pages and `assets/site.css` directly. Keep canonical URLs,
Open Graph URLs, `CNAME`, `robots.txt`, and `sitemap.xml` consistent with `https://simonxu.com`.
The unavailable `app.simonxu.com` link was removed from the main navigation;
its HTTPS certificate did not cover that hostname when checked.

`posts/`, `page-data/posts/`, `static/`, the hashed Gatsby bundles, and the legacy
`about/aboutme/` page remain unchanged. Keep those assets: posts still use them.
The non-post `page-data/*/page-data.json` files preserve their original data but
use an empty `componentChunkName`. This deliberately makes Gatsby links on old
posts fall back to full browser navigation, reaching the new static pages rather
than rendering stale React components. Keep these handoff records in place.

The older **`gh-pages` branch contains the Gatsby source**. Its `npm run deploy`
command builds Gatsby and replaces `master`, which would overwrite the static
page improvements. Publish this branch directly.
Before using that older pipeline again, port these changes into its generated
output, including `CNAME`, `.nojekyll`, route handoffs, cache retirement, and the
primary URL. Gatsby copies its source `static/` folder into the published root,
so the old source branch would need `static/CNAME` to preserve the custom domain.
