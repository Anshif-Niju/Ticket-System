import AppError from "../utils/AppError.js";

export const notFound = (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
};

export const errorHandler = (error, req, res, next) => {
  let currentError = error;

  if (error.name === "CastError") {
    currentError = new AppError("Invalid resource identifier", 400);
  } else if (error.code === 11000) {
    currentError = new AppError("Duplicate field value entered", 409);
  } else if (
    error.name === "JsonWebTokenError" ||
    error.name === "TokenExpiredError"
  ) {
    currentError = new AppError("Invalid or expired token.", 401);
  } else if (!(error instanceof AppError)) {
    currentError = new AppError(
      error.message || "Internal server error",
      500
    );
  }

  res.status(currentError.statusCode || 500).json({
    status: currentError.status || "error",
    message: currentError.message || "Internal server error",
    ...(process.env.NODE_ENV !== "production" && {
      stack: currentError.stack,
    }),
  });
};
