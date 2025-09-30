const Router = require('@koa/router');
const { apiGet, apiPost, apiPut, apiDelete } = require('../utils/httpClient');

const router = new Router({ prefix: '/api' });

router.post('/todo-list', async (ctx) => {
  const body = ctx.request.body || {};
  if (!body.title) {
    ctx.status = 400;
    ctx.body = { error: 'Требуется поле title' };
    return;
  }
  const { id, ...requestBody } = body;
  const data = await apiPost(ctx, '/api/lists/', requestBody);
  ctx.status = 200;
  ctx.body = data;
});

router.get('/todo-list', async (ctx) => {
  const data = await apiGet(ctx, '/api/lists/');
  ctx.status = 200;
  ctx.body = data;
});

router.get('/todo-list/:id', async (ctx) => {
  const { id } = ctx.params;
  const data = await apiGet(ctx, `/api/lists/${id}`);
  ctx.status = 200;
  ctx.body = data;
});

router.put('/todo-list', async (ctx) => {
  const body = ctx.request.body || {};
  const data = await apiPut(ctx, '/api/lists/', body);
  ctx.status = 200;
  ctx.body = data;
});

router.delete('/todo-list', async (ctx) => {
  const body = ctx.request.body || {};
  if (!body.id) {
    ctx.status = 400;
    ctx.body = { error: 'Требуется поле id' };
    return;
  }
  const data = await apiDelete(ctx, `/api/lists/${body.id}`);
  ctx.status = 200;
  ctx.body = data;
});

module.exports = router;


