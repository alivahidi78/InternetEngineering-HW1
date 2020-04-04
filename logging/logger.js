const winston = require('winston');
const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new winston.transports.File({ filename: './logging/error.log', level: 'error' }),
        new winston.transports.File({ filename: './logging/combined.log', level: 'info' })
    ]
});

module.exports = logger;