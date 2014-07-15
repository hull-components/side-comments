# [Hull](http://hull.io) + [SideComments.js](http://aroc.github.io/side-comments-demo/) = ♥

---


### What is it?

It's a [Hull](http://hull.io) component to make it super-easy to add Medium-style comments with [SideComments.js](http://aroc.github.io/side-comments-demo/) to any web app including static ones, thanks to Hull's engagement layer as-a-service.

### Why?

If you're somewhat like us, you love the commenting system on
[Medium](http://medium.com). And like us, when [SideComments.js](http://aroc.github.io/side-comments-demo/) was released, you thought it would be awesome to add it to your blog/app/site.

But, __unlike us__, you don't have the backend to store your comments, or you're still using some Iframe-based commenting system.

*Bummer.*

Well, use this component with your [Hull.io](http://hull.io) account
and you're all set to add paragraph comments to your blog, cms, essay, notes etc... 

### How?

1. Copy/clone the contents of this repository in your app (say in `%BASE_PATH%/app/components/`)

2. Create a Hull account from [https://accounts.hullapp.io](https://accounts.hullapp.io)

3. Adapt and copy the following snippet:

    ```js
    Hull.init({
      appId: 'YOUR_APP_ID',
      orgUrl: 'YOUR_ORG_URL',
      sources: {
        default: '%BASE_URL%/app/components'
      }
    });
    ```
1. Declare the component on the element that wraps your content, with the `data-hull-component` attribute, as follows:

    ```html
      <div class="content" data-hull-component="side-comments">
        ...
      </div>
    ```


## Options

The options and their default values are described below.
You can change the default behaviour with `data-*` attributes on the element which uses the component:

* `data-hull-selector`: The selector to define the commentable sections (Defaults to 'p')
* `data-hull-id`: The unique identifier for the object which the comments will be bound to (Defaults to the current page, based on it's URL. This is where you could improve and use a permalink)

## Contact

If you want to know more or get some help on what you can achieve with Hull,
send us an email to [support@hull.io](mailto:support@hull.io).

---
