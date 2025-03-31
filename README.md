# Static Ring 🌐

Static Ring is a webring system that outputs static HTML. It's made with [eleventy](https://www.11ty.dev).

From [Wikipedia](https://en.wikipedia.org/wiki/Webring), a webring is a collection of
websites linked together in a circular structure, usually organized around a
specific theme, and often educational or social.

In general, webrings use a server (PHP, Node.js or something else) to receive the HTTP requests and redirect
as needed. The purpose of Static Ring is to create webring functionality with static HTML only,
making hosting much easier.

## How it works

The idea is to make use of the HTML meta tag `<meta http-equiv="Refresh" content="0; url='https://example.com'">` and
redirect the user to the destination.

The websites can be added in the `sites.js` file. Eleventy will then create corresponding `previous` and `next` pages
for each site. The website owners would then add links to the `previous` and `next` pages on their website. When
the webring is updated, these pages are updated as well, and no action is needed from the website owners.

If you're not familiar with [eleventy](https://www.11ty.dev), it is a
[static site generator (SSG)](https://en.wikipedia.org/wiki/Static_site_generator). A SSG takes input files,
or other data, to generate static web pages. In this case, it takes the website data from `sites.js` and
generates corresponding `previous` and `next` pages for each one.

## Limitations

### Meta tag dependant

If the browser can't or won't redirect when reading the `<meta http-equiv...>` tag, the user will be
"stuck" in the redirect page. There's a link they can click when this happens, but it won't be as seamless.

### Javascript dependant

If the browser doesn't support javascript, or it is disabled by the user, the random page option will simply not work.
I couldn't think of a way to mitigate this problem.

### Caching

When a browser downloads something from the web, it usually caches the content so it doesn't have to
be downloaded again. This can make the browser skip the updated file and use the cached one instead,
potentially redirecting the user to a removed site from the webring.

## Requirements

Node.js version 18 or higher, according to [Eleventy docs](https://www.11ty.dev/docs/).

## Build instructions

Start by cloning the repository (or by downloading the zip file from Code > Download ZIP). Inside the directory, run `npm install` from the command line to download dependencies. You can also use [pnpm](https://pnpm.io), [yarn](https://yarnpkg.com) or other package managers. Read about it on [Evelenty documentation](https://www.11ty.dev/docs/usage/).

You can now edit the `sites.js` file. Here is where the data about the websites is stored. The `sites.js` file contains an array of objects with the following fields:

| field | description |
| --- | --- |
| `id` | A unique identifier for the website. The id should be url friendly, as it's used to create the pages. |
| `name`| The website's name. (optional) |
| `url` | The link to the website. |
| `added` | The date the website was added to the webring (optional). |
| `description` | A short description for the website (optional). |

The `id` value should be unique for each website. It should also be url friendly, cause it's used to create the `next` and `previous` pages. The `id` should be informed to the website owners so they can add the previous and next links on their webpages. The final links will look like this:

- next: `https://yourwebsite.com/webring/redirect/next/id.html`
- prev: `https://yourwebsite.com/webring/redirect/prev/id.html`

To run Eleventy and build the pages, use `npm run build` on the command line. The generated pages will be found at the `_site` directory.

You can also use `npm run serve` to start a local server that will rebuild the files everytime they change. It's good for development.

If, for some reason, the commands above don't work, you can try `npx @11ty/eleventy` and `npx @11ty/eleventy --serve`.

### TLDR

- download the repo.
- run `npm install` from the command line to download dependencies.
- edit `sites.js` file to add and remove sites.
- run `npm run build` to build the files. The built files will be found on the `_site` directory.

## Customising

You can customize the files to add content, styles, etc. It uses [Nunjucks](https://mozilla.github.io/nunjucks/) for templating.

### `index.html`

You can edit this page however you want. The default one contains a table that list the websites.

### `_includes/redirect.html`

This page is the one responsible for the redirect. The important parts are the meta tag:

```html
<meta http-equiv="Refresh" content="0; url='{{ target.url }}'">
```

and the fallback link:

```html
<a href="{{ target.url }}">go to the {{ direction }} site</a>
```

I suggest making this file as lightweight as possible, avoiding external files (images, css, etc.), as its only purpose is to redirect the user to the target page.

### `redirect/next.html` and `redirect/prev.html`

These pages extend `_include/redirect.html`, setting the information about the target website. Only change them if you're messing around.

### `redirect/random.html`

This page is responsible for the redirecting the user to a random website. It all happens inside the script tag. Try to keep this file lightweight as well.

I recommend changing the content inside `<noscript>` tag, as your webring url might differ.
