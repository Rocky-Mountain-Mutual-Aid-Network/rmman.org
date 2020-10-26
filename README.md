# rmman.org
Rocky Mountain Mutual Aid Network

This website is built in [Jekyll](https://jekyllrb.com/docs) hosted (for free) using GitHub Pages. 
If you wish to clone this design just fork the repository!

The website uses some cool features to make it fast and easy for people to edit. Many pages here
load from Google Documents. For instance [/covid](https://rmman.org/covid) is created from [this Google Doc](https://docs.google.com/document/d/1-0lvs_bWE-yJiS4tCQEBjRPRm96AR79K-74MEXhQV-0/edit).

This allows volunteers to edit the content of the website without having to deal with code!

## Contributing

If you'd like to make edits to the website please fork the repository and make a pull request.

## Bulma CSS Framework

This project uses [Bulma CSS Framework](https://bulma.io/documentation) to add structure and style.
Please review the documentation and understand how columns, sections, layout, and buttons work.

## Social data (Open Graph)

When sharing a page we can set the image, title, and description that shows up on social media. 
In the `front matter` of a page (the section at the top between the dashes `---`) you can set the
Open Graph data.

```
og:
 title: Help people in need!
 image: /rmman-graph-image-default.png
 description: >-
    Directly help your neighbors in need with a helping hand.
```

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

1. Publish your Google Doc - In the doc if you want to use as your page content go to `file > publish` and publish the doc, save the link URL for later.
2. include `google-doc.html` to your page
3. set the `url` attribute of the include to the **published URL** (not the document url!)

``` html
{% include google-doc.html url="https://docs.google.com/document/d/e/2PACX-1vQUhG21mO6ahV6njQ6RB3lA_94LFoilOvganxxtFIZsd4GXfiZWwUNJMwwcR4B6av6KvBMwZ7xXq0oh/pub" %}
```

### Document Style

By default the Google Doc's style is stripped from the imported HTML. You can disable this by adding the attribute
`style="true"` to the include. Like this:

``` html
{% include google-doc.html style="true" url="https://docs.google.com/document/d/e/2PACX-1vQUhG21mO6ahV6njQ6RB3lA_94LFoilOvganxxtFIZsd4GXfiZWwUNJMwwcR4B6av6KvBMwZ7xXq0oh/pub" %}
```

**Note**: The style that gets pulled in from Google will influence any other content on the page!

**Gotchas:** 

* Make sure you use the published url and not the document's edit url with the `url` attribute!
* If the document content doesn't load an iframe, it will be put in it's place, this might cause issues if you have other content in the `<body>`
