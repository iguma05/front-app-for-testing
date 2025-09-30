const Router = require('@koa/router');
const { apiPost } = require('../utils/httpClient');

const router = new Router({ prefix: '/api/auth' });

router.post('/sign-in', async (ctx) => {
  const body = ctx.request.body || {};
  const username = body.username || body.email;
  const password = body.password;

  if (!username || !password) {
    ctx.status = 400;
    ctx.body = { error: 'Требуются поля username/email и password' };
    return;
  }

  const data = await apiPost(ctx, '/auth/sign-in', { username, password });
  const token = data?.token || '';

  if (token) {
    ctx.cookies.set('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });
  }

  ctx.status = 200;
  ctx.body = { token };
});

router.post('/logout', async (ctx) => {
  try {
    await apiPost(ctx, '/auth/logout', {});
  } catch (_) {}
  ctx.status = 200;
  ctx.body = { token_log: '', message: 'Пользователь вышел из системы' };
});

module.exports = router;


