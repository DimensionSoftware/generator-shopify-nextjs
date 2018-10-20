const shopifyAuth = require('@shopify/koa-shopify-auth').default

const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = new Koa()
    const router = new Router()
      server.use(
        shopifyAuth({
          // if specified, mounts the routes off of the given path
          // eg. /shopify/auth, /shopify/auth/callback
          // defaults to ''
          prefix: '/shopify',
          // your shopify app api key
          apiKey: process.env.SHOPIFY_API_KEY,
          // your shopify app secret
          secret: process.env.SHOPIFY_SECRET,
          // scopes to request on the merchants store
          scopes: ['write_orders, write_products'],
          // callback for when auth is completed
          afterAuth(ctx) {
            const {shop, accessToken} = ctx.session;

            console.log('We did it!', accessToken);

            ctx.redirect('/');
          },
        })
      )

    router.get('/a', async ctx => {
      await app.render(ctx.req, ctx.res, '/b', ctx.query)
      ctx.respond = false
    })

    router.get('/b', async ctx => {
      await app.render(ctx.req, ctx.res, '/a', ctx.query)
      ctx.respond = false
    })

    router.get('*', async ctx => {
      await handle(ctx.req, ctx.res)
      ctx.respond = false
    })

    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200
      await next()
    })

    server.use(router.routes())
    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
