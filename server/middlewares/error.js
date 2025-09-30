module.exports = async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404 && !ctx.body) {
      ctx.status = 404;
      ctx.body = { error: 'Not Found' };
    }
  } catch (e) {
    const status = e?.response?.status || 500;
    const message = e?.response?.data?.error || e?.message || 'Server error';
    ctx.status = status;
    ctx.body = { error: message };
  }
};


