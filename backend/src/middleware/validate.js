import AppError from "../utils/AppError.js";

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query,
  });

  if (!result.success) {
    const message = result.error.issues.map((issue) => issue.message).join(", ");
    return next(new AppError(message, 400));
  }

  req.body = result.data.body;
  req.params = result.data.params;
  req.validated = {
    body: result.data.body,
    params: result.data.params,
    query: result.data.query,
  };

  next();
};
