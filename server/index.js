const Koa = require('koa')
const KoaRouter = require('koa-router')
const cors = require('@koa/cors')

const app = new Koa()
const router = new KoaRouter()

module.exports = function init() {
  router.get('/apis/test', async function(ctx, next) {
    ctx.body = {
      code: 0,
      data: {
        name: 'xiao'
      },
      msg: 'hello, world'
    }
  })

  router.post('/apis/test', async function(ctx) {
    ctx.body = 'post'
  })

  app.use(
    cors({
      origin: '*'
    })
  )

  app.use(router.routes()).use(router.allowedMethods())

  app.listen(8425, function() {
    console.log('✨ Server run in http://localhost/')
  })
}
