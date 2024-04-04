const pino = require("pino");

const PORT = 4700;

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "UTC:yyyy-mm-dd HH:MM:ss",
    },
  },
  level: "info",
});

class Response {
  constructor(statusCode, httpStatus, message, data) {
    this.timestamp = new Date().toLocaleString();
    this.statusCode = statusCode;
    this.httpStatus = httpStatus;
    this.message = message;
    this.data = data;
  }
}

const HttpStatus = {
  OK: { code: 200, status: "OK" },
  CREATED: { code: 201, status: "CREATED" },
  NO_CONTENT: { code: 204, status: "NO_CONTENT" },
  BAD_REQUEST: { code: 400, status: "BAD_REQUEST" },
  NOT_FOUND: { code: 404, status: "NOT_FOUND" },
  NOT_ACCEPTABLE: { code: 406, status: "NOT_ACCEPTABLE"},
  INTERNAL_SERVER_ERROR: { code: 500, status: "INTERNAL_SERVER_ERROR" },
};

module.exports = { logger, Response, HttpStatus, PORT };
