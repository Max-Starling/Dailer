module.exports = (ctx, showWarn = true) => {
  if (ctx && ctx.session && ctx.session.email) {
    return ctx.session.email;
  }
  if (showWarn) {
    warn('User is unauthorized');
  }
  return null;
};

