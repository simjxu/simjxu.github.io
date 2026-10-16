# The Mush — simonxu.com

This branch (`master`) is the published, static website. The homepage, About,
Projects, and error pages are plain HTML, with one small shared stylesheet and
a script that retires the previous Gatsby offline cache. They need no build or
package installation. Posts, their data, and their legacy Gatsby assets are
preserved as published.

## Restore the custom domain

The October 2026 check found that `simonxu.com` was using Namecheap URL forwarding
to `https://simjxu.github.io`, and `www.simonxu.com` had no DNS record. The GitHub
Pages site itself was responding successfully. A redirect to the GitHub address
does not serve the site at the custom domain.

1. Commit and push the changes on this branch when ready to publish.
2. Open [repository Settings → Pages](https://github.com/simjxu/simjxu.github.io/settings/pages).
   Use **Deploy from a branch**, branch **master**, folder **/ (root)**. Set
   **Custom domain** to **www.simonxu.com** and save it **before changing DNS**.
   The root `CNAME` file must contain that same domain. `.nojekyll` tells Pages
   to serve these already-built files without Jekyll processing.
3. In Namecheap, open **Domain List → Manage → Advanced DNS → Host Records**.
   Remove the `@` URL Redirect to the GitHub address, and replace conflicting
   `@`/`www` website records with these:

   | Type | Host | Value |
   | --- | --- | --- |
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `simjxu.github.io` |

   Preserve the domain's email MX/TXT records and other unrelated records.
   The `www` target is a hostname, without `https://` or a path.
4. Wait for the DNS check and certificate provisioning in GitHub Pages, then
   enable **Enforce HTTPS**. DNS changes and certificate availability can take
   up to 24 hours. GitHub redirects `simonxu.com` to `www.simonxu.com` when both
   have the correct DNS records.

Verify both hostnames after provisioning:

```sh
dig +short simonxu.com A
dig +short www.simonxu.com CNAME
curl -I https://simonxu.com
curl -I https://www.simonxu.com
```

Expect the four GitHub IP addresses, the `simjxu.github.io` CNAME, a redirect
from the apex domain to `www`, and a successful response at `www`.

References: [GitHub custom domain setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site),
[Namecheap instructions](https://www.namecheap.com/support/knowledgebase/article.aspx/9645/2208/how-do-i-link-my-domain-to-github-pages/),
[GitHub publishing sources](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

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
`CNAME`, `robots.txt`, and `sitemap.xml` consistent with `https://www.simonxu.com`.
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
page improvements and can remove `CNAME` again. Publish this branch directly.
Before using that older pipeline again, port these changes into its generated
output, including `CNAME`, `.nojekyll`, route handoffs, and cache retirement.
Gatsby copies files in its `static/` source folder into the published root, so
that source branch would need `static/CNAME` to preserve the domain.
