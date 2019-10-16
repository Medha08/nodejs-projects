const { createLogger, transports } = require("winston");
const logger = createLogger({
  transports: [
    // new transports.File({
    //   level: "debug",
    //   filename: "combined.log",
    //   handleExceptions: true
    // }),
    new transports.Console({
      level: "debug",
      json: true,
      handleExceptions: true
    })
  ],
  exitOnError: false //if uncaught error received will not stop logging
}); // resolves to require("./winston/logger").Logger to point to internal logger module thus creates new instance of Logger

module.exports = logger;
