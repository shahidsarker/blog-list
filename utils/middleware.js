const logger = require("./logger");

const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path: ", req.path);
  logger.info("Body: ", req.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unkown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "invalid token" });
  }

  next(error);
};

const tokenExtractor = (req, res, next) => {
  const auth = req.get("authorization");
  req.token =
    auth && auth.toLowerCase().startsWith("bearer ") ? auth.substring(7) : null;

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
