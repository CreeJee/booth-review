type Environment = {
    PORT: string
    ORIGIN: string
    DATABASE_URL: string
}
export const ENV = process.env as Environment;
export const APP_PORT = ENV.PORT;
export const DATABASE_URL = ENV.DATABASE_URL;
export const APP_ORIGIN = ENV.ORIGIN;
export default {APP_PORT, DATABASE_URL};
