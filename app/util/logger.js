/* eslint-disable no-console */
const { createLogger, format, transports } = require('winston');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const { omit } = require('lodash');
const chalk = require('chalk');

require('winston-daily-rotate-file');

const { NODE_ENV, SERVICE_NAME = 'SERVICE_NAME', TEST_LOGS = false } = process.env;
const { dateFormats } = require('.');
const { WINSTON_CONFIG } = require('../../config/config');

const LOG_DIR = path.resolve(
  path.dirname(require.main.filename),
  `../log/${SERVICE_NAME.toLowerCase()}`
);
if (!fs.existsSync(LOG_DIR)) {
  mkdirp(LOG_DIR, err => {
    if (err) console.error(err);
    else console.info('log directory created!');
  });
}
const createLogFileName = level => `${LOG_DIR}/${SERVICE_NAME}-${level}.%DATE%.log`;

// eslint-disable-next-line no-console
console.info('Logs will write to Directory >> ', LOG_DIR);

// FORMATS FOR TRANSPORTS
const FORMATS = {
  label: format.label({
    label: { environment: NODE_ENV, service_name: SERVICE_NAME },
    message: false
  }),
  timestamp: format.timestamp({
    format: dateFormats.SHORT_DATETIME
  }),
  colorize: format.colorize({ all: true }),
  printf: format.printf(info => {
    // get all props except some that always need to be same order
    let payload = JSON.stringify(omit(info, ['message', 'level', 'timestamp', 'label']));
    payload = payload === '{}' ? '' : payload;
    // get splat message
    const splat = JSON.stringify(info[Object.getOwnPropertySymbols(info)[1]]) || '';
    // return log in format of : [ts] [env] [service_name] [level] [...]
    return `[${chalk.blue(info.timestamp)}] [${chalk.magentaBright(
      NODE_ENV
    )}] [${chalk.magentaBright(SERVICE_NAME)}] [${info.level}] [${
      info.message
    }] [${chalk.bgBlackBright(payload)}] [${chalk.bgBlackBright(splat)}]`;
  })
};

// TRANSPORTS
const defaultTransport = new transports.DailyRotateFile({
  filename: createLogFileName('info'),
  zippedArchive: WINSTON_CONFIG.zippedArchive,
  maxSize: WINSTON_CONFIG.maxSize,
  maxFiles: WINSTON_CONFIG.maxFiles,
  json: format.json(),
  format: format.logstash()
});
const exceptionsTransport = new transports.DailyRotateFile({
  filename: createLogFileName('exceptions'),
  zippedArchive: WINSTON_CONFIG.zippedArchive,
  maxSize: WINSTON_CONFIG.maxSize,
  maxFiles: WINSTON_CONFIG.maxFiles
});

const consoleTransport = new transports.Console({
  level: 'debug',
  format: format.combine(FORMATS.timestamp, FORMATS.colorize, FORMATS.printf)
});

const logger = createLogger({
  level: 'info',
  format: format.combine(FORMATS.label, FORMATS.timestamp, format.errors({ stack: true })),
  splat: format.splat(),
  // defaultMeta: {
  //   // some meta data...
  // },
  transports: [defaultTransport],
  exceptionHandlers: [exceptionsTransport] // catch exceptions
});

// If we're not in production then *ALSO* log to the `console`
// with the colorized simple format.
if (process.env.NODE_ENV !== 'production') {
  logger.add(consoleTransport);
} else {
  // prevent winston to stop if Error occurred
  logger.exitOnError = false;
}

module.exports = logger;
