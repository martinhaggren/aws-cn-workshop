// middleware.js
module.exports = function createMiddleware(injectFault) {
  return (req, res, next) => {
      if (req.path === '/503' && !injectFault.flag) {
          injectFault.flag = true;

          setTimeout(() => {
              injectFault.flag = false;
          }, 180 * 1000);

          return res.send('Fault injected');
      }

      if (injectFault.flag) {
          return res.status(503).send('Service unavailable');
      }

      next();
  };
};
