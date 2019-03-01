import winston, { format } from 'winston';

const logPath = process.cwd() + '/logs/app.log';
const logLevel = process.env.LOG_lEVEL || 'debug';

const options = {
  console: {
    // colorize: true,
    // handleExceptions: true,
    // json: false,
    // level: 'debug'
  },

  file: {
    colorize: false,
    filename: logPath,
    // handleExceptions: true,
    json: true,
    // level: logFileLevel,
    maxFiles: 5,
    maxsize: 5242880, // 5MB
  },
};

// instantiate a new Winston Logger with the settings defined above
// new winston.Logger
const logger = winston.createLogger({
  exitOnError: false, // do not exit on handled exceptions
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  level: logLevel,
  transports: [new winston.transports.File(options.file), new winston.transports.Console()],
});

export default logger;
