const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const Router = require('@koa/router');
const { PORT } = require('./config');

const errorMiddleware = require('./middlewares/error');
const authRoutes = require('./routes/auth');
const todoListRoutes = require('./routes/todoList');
const listItemsRoutes = require('./routes/listItems');

const app = new Koa();
const root = new Router();

app.use(cors({
  origin: '*',
  allowMethods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser({ enableTypes: ['json'] }));
app.use(async (ctx, next) => {
  console.log(new Date().toISOString(), ctx.method, ctx.url);
  await next();
});
app.use(errorMiddleware);

root.use(authRoutes.routes(), authRoutes.allowedMethods());
root.use(todoListRoutes.routes(), todoListRoutes.allowedMethods());
root.use(listItemsRoutes.routes(), listItemsRoutes.allowedMethods());
app.use(root.routes()).use(root.allowedMethods());

app.listen(PORT, () => {
  console.log(`API listening on ${PORT}`);
});


