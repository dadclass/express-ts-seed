import logger from './logger';

const debug = (caller: string, message: string): void => {
    logger.debug(`[${caller}] ${message}`);
}

const info = (caller: string, message: string): void => {
    logger.info(`[${caller}] ${message}`);
}

const warn = (caller: string, message: string): void => {
    logger.warn(`[${caller}] ${message}`);
}

function error(caller: string, message: string): void {
    logger.error(`[${caller}] ${message}`);
}

const log =  {
    debug,
    error,
    info,
    warn
}

export default log;