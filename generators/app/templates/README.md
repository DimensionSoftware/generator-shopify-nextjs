# Shopify App: <%= name %>

## The Stack

* [next.js](https://github.com/zeit/next.js)
* [koa](https://github.com/koajs/koa)
* [koa-shopify-auth](https://github.com/Shopify/quilt/tree/master/packages/koa-shopify-auth)
* [koa-shopify-graphql-proxy](https://github.com/Shopify/quilt/tree/master/packages/koa-shopify-graphql-proxy)
* [Polaris](https://polaris.shopify.com/)
* [Prisma](https://www.prisma.io/)
* [Apollo](https://www.apollographql.com/client)

## Setup

### Prisma

This is the default data store that's hosted at [app.prisma.io](https://app.prisma.io/).
It's a hosted GraphQL service that has a free tier, so it's easy to get started with it.
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
