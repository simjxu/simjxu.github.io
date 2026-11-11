# The Mush — simjxu.github.io

This branch (`master`) is the published, static website. The homepage, About,
Projects, and error pages are plain HTML, with one small shared stylesheet and
a script that retires the previous Gatsby offline cache. They need no build or
package installation. Posts, their data, and their legacy Gatsby assets are
preserved as published.

## Publish to GitHub Pages

The primary URL is **https://simjxu.github.io/**.

1. Run the checks below, then commit and push `master` to `origin`.
2. In [repository Settings → Pages](https://github.com/simjxu/simjxu.github.io/settings/pages),
   use **Deploy from a branch**, branch **master**, folder **/ (root)**.
   Leave **Custom domain** empty and enable **Enforce HTTPS**. Keep `CNAME`
   absent and `.nojekyll` present to serve these already-built files directly.
3. Wait for the **pages build and deployment** workflow to succeed for the
   pushed commit, then verify the live site:

   ```sh
   curl -I https://simjxu.github.io/
   curl -I https://simjxu.github.io/posts/sublimehighlight/
   curl -I https://simjxu.github.io/assets/site.css
   ```

   Each HTTPS URL should return `200` without redirecting to another hostname.
   Also check browser navigation from the homepage to a post and back.

### November 2026 outage

GitHub Pages was configured to redirect every request to `http://www.simonxu.com/`,
but `www.simonxu.com` had no DNS record. The apex `simonxu.com` forwarded to the
GitHub address through Namecheap, so it also led to the broken hostname. The
published HTML and assets were intact; the custom-domain redirect made them
unreachable through the public URLs.

The restoration removes `CNAME`, clears the Pages custom-domain setting, and
uses `https://simjxu.github.io` in metadata and the sitemap. Registrar DNS is
unchanged. Removing the file alone is not sufficient: verify the Pages setting
and the actual HTTP response after deployment. If a browser remembers the old
permanent redirect, try a private window or clear its cached redirect.

Reintroducing a custom domain requires working DNS and a valid HTTPS certificate
as well as the Pages setting. Follow [GitHub's custom-domain setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
as a separate hosting change; adding `CNAME` without completing that setup can
recreate this outage.

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
Open Graph URLs, `robots.txt`, and `sitemap.xml` consistent with `https://simjxu.github.io`.
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
output, including `.nojekyll`, route handoffs, cache retirement, and the primary
URL. Keep the publishing output free of `CNAME` while using the GitHub address.
