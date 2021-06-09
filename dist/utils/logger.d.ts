import winston from 'winston';
declare const logger: winston.Logger;
declare const stream: {
    write: (message: string) => void;
};
export { logger, stream };
