export const logginMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};
