# generator-shopify-nextjs [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> A Yeoman generator for Serverless Shopify apps using Next.js, Koa, Prisma GraphQL & Shopify's Polaris

## The Stack

* [next.js](https://github.com/zeit/next.js)
* [koa](https://github.com/koajs/koa)
* [koa-shopify-auth](https://github.com/Shopify/quilt/tree/master/packages/koa-shopify-auth)
* [koa-shopify-graphql-proxy](https://github.com/Shopify/quilt/tree/master/packages/koa-shopify-graphql-proxy)
* [Polaris](https://polaris.shopify.com/)
* [Prisma](https://www.prisma.io/)
* [Apollo](https://www.apollographql.com/client)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-shopify-nextjs using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-shopify-nextjs
```

Then generate your new project:

```bash
cd /path/to/empty/directory
yo shopify-nextjs name-of-app
```

## Setup

### Prisma

This is the default data store that's hosted at [app.prisma.io](https://app.prisma.io/).
It's a hosted GraphQL service that has a free tier, so it's easy to get started.
To initialize a prisma instance, do the following:

```sh
cd data
prisma init
cp datamodel.prisma.example datamodel.prisma
prisma deploy
```

If you want to use a different data store, it's easy enough to replace with whatever you
want.  In `server.js`, you just have to store the `accessToken` that Shopify gives you
upon app installation using your own database libraries.

### Shopify Partner

* TODO - Explain how to register an app as a Shopify partner.
* TODO - Explain how this is where the API keys for your new Shopify app come from.


### Fill out .env

Your .env should have the following entries:

```
SHOPIFY_API_KEY=...
SHOPIFY_SECRET=...
SERVER_SECRET=...
NEXT_STATIC_GRAPHQL_URI=...
```

## Deployment

```sh
npm i -g now
now
```

## REPL

```sh
bin/repl
```

## License

MIT © [Dimension Software](https://dimensionsoftware.com)


[npm-image]: https://badge.fury.io/js/generator-shopify-nextjs.svg
[npm-url]: https://npmjs.org/package/generator-shopify-nextjs
[travis-image]: https://travis-ci.org/DimensionSoftware/generator-shopify-nextjs.svg?branch=master
[travis-url]: https://travis-ci.org/DimensionSoftware/generator-shopify-nextjs
[daviddm-image]: https://david-dm.org/DimensionSoftware/generator-shopify-nextjs.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/DimensionSoftware/generator-shopify-nextjs
[coveralls-image]: https://coveralls.io/repos/DimensionSoftware/generator-shopify-nextjs/badge.svg
[coveralls-url]: https://coveralls.io/r/DimensionSoftware/generator-shopify-nextjs
