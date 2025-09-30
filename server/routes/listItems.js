const Router = require('@koa/router');
const { apiGet, apiPost, apiPut, apiDelete } = require('../utils/httpClient');

const router = new Router({ prefix: '/api' });

router.get('/list/:id/items', async (ctx) => {
  const { id } = ctx.params;
  const data = await apiGet(ctx, `/api/lists/${id}/items`);
  ctx.status = 200;
  ctx.body = data;
});

router.post('/list-items/items', async (ctx) => {
  const body = ctx.request.body || {};
  const data = await apiPost(ctx, '/api/lists/items', body);
  ctx.status = 200;
  ctx.body = data;
});

router.get('/list/items/:id', async (ctx) => {
  const { id } = ctx.params;
  const data = await apiGet(ctx, `/api/lists/items/${id}`);
  ctx.status = 200;
  ctx.body = data;
});

router.put('/list/items/:id', async (ctx) => {
  const { id } = ctx.params;
  const body = ctx.request.body || {};
  const withId = { ...body, id };
  const data = await apiPut(ctx, `/api/lists/items/${id}`, withId);
  ctx.status = 200;
  ctx.body = data;
});

router.delete('/list/items/:id', async (ctx) => {
  const { id } = ctx.params;
  const body = ctx.request.body || {};
  const withId = { ...body, id };
  const data = await apiDelete(ctx, `/api/lists/items/${id}`, withId);
  ctx.status = 200;
  ctx.body = data;
});

router.get('/list-items', async (ctx) => {
  const data = await apiGet(ctx, '/api/lists/items');
  ctx.status = 200;
  ctx.body = data;
});

module.exports = router;


