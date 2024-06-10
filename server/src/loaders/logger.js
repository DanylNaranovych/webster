import winston from 'winston';
const { combine, timestamp, printf, colorize, align,cli } = winston.format;

const LoggerInstance = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        cli(),
        timestamp({
            format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [new winston.transports.File({
        filename: `./logs/${Date.now()}.log`,
    }),
        new winston.transports.Console()],
});

export default LoggerInstance;