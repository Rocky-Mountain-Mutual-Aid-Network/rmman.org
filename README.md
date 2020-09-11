# rmman.org
Rocky Mountain Mutual Aid Network

This website is a super simple flat HTML site that is hosted (for free) using GitHub Pages. 
If you wish to clone this design just fork the repository! 

The page uses javascript to pull in the HTML of a Google Doc and display the `#content` div.

If the page can't pull the content it instead loads an iframe of the content.

## Embedding Google Doc Content

This website makes use of published Googld Doc content. Javascript pulls the HTML of **published** Google Docs
and displays the `#content` div (or the body content of the document). If it can't load the HTML content it 
will gracefully fall back to an embedded iframe.

To add Google Doc content you'll need to do the following:

1. Publish your Google Doc - In the doc you want to use as your page content go to `file > publish` and publish the doc, save the link URL for later.
2. add `<script src="/script-google-doc.js"></script>` to the page.
3. add an element with the class `doc` and attribute `data-gdoc-url` with the published url

``` html
<div id="doc" data-gdoc-url="https://docs.google.com/document/d/e/2PACX-1vT5gCxJy7b1abHTQ0AKOFCYbssHDy1pVQyjJmBvsRrwA1T7GiULwaENsv2k_Mfwj8xYdBEiQzvJtD8N/pub">
    Loading...
</div>

<script src="/script-google-doc.js"></script>
```

**Gotchas:** Make sure you use the published url and not the document's edit url with the `data-gdoc-url` attribute!

