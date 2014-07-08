# Hull + [SideComments.js](http://aroc.github.io/side-comments-demo/) = :heart:

## What is it?

It's a [Hull](http://hull.io) component to save your
[SideComments.js](http://aroc.github.io/side-comments-demo/)-powered blog/app
using Hull backend.

## Why?

If you're anyhow like us, you love the commenting system on
[Medium](http://medium.com).
And, like us, when [SideComments.js](http://aroc.github.io/side-comments-demo/)
was released, you thought it would be awesome to add it to your
blog/app/site.

But, __unlike us__, you don't have the necessary backend to store your comments.
Bummer.

Use this component with your [Hull.io](http://hull.io)'s account
and you're all set.

## How?

1. Copy/clone the contents of this repository in your app (say in `%BASE_PATH%/app/components/`)
1. Create a Hull account from [https://accounts.hullapp.io][]
1. Adapt and copy the following snippet:

```js
Hull.init({
  appId: 'YOUR_APP_ID',
  orgUrl: 'YOUR_ORG_URL',
  sources: {
    default: '%BASE_URL%/app/components'
  }
});
```

## Contact

If you want to know more or get some help on what you can achieve with Hull,
send us an email to [support@hull.io](mailto:support@hull.io).
