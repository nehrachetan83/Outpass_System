const asyncHandler = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (err) {
      res.status(Number.isInteger(err.code) && err.code >= 100 && err.code < 600 ? err.code : 500).json({
        success: false,
        message: err.message,
      });
      
    }
  };
};
export { asyncHandler };
