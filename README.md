# rmman.org
Rocky Mountain Mutual Aid Network

This website built in [Jekyll](https://jekyllrb.com/docs) hosted (for free) using GitHub Pages. 
If you wish to clone this design just fork the repository! 

## Layouts

The default layout for pages is set in the `/_config.yml` file. Unless specified in the front matter with `layout: whatever`.

The `_layouts/default.html` pulls in it's own layout (nested layouts!) of `_layouts/base.html`. The base layout contains
the `<head>` and other base elements of the page layout.

## Buttons

You can build buttons using includes. They accept the following variables:

- `href` - the url you want to link to
- `text` - text of the button
- `class` - any class names you want to add

```
{% include btn.html href="/covid" class="" text="See Resources" %}
```

## Embedding Google Doc Content

This website makes use of published Googld Doc content. Javascript pulls the HTML of **published** Google Docs
and displays the `#content` div (or the body content of the document). If it can't load the HTML content it 
will gracefully fall back to an embedded iframe.

To add Google Doc content you'll need to do the following:

1. Publish your Google Doc - In the doc you want to use as your page content go to `file > publish` and publish the doc, save the link URL for later.
2. include `google-doc.html` to your page
3. set the `url` attribute of the include to the **published URL** (not the document url!)

``` html
{% include google-doc.html url="https://docs.google.com/document/d/e/2PACX-1vQUhG21mO6ahV6njQ6RB3lA_94LFoilOvganxxtFIZsd4GXfiZWwUNJMwwcR4B6av6KvBMwZ7xXq0oh/pub" %}
```

**Gotchas:** 

* Make sure you use the published url and not the document's edit url with the `url` attribute!
* If the document content doesn't load an iframe will be put in it's place, this might cause issues if you have other content in the `<body>`
* When the document is pulled from Google you'll also get the document's style sheet!
