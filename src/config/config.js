import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const ADMIN_MAIL = process.env.ADMIN_MAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL;
const PERSISTENCE = process.env.PERSISTENCE;

export const config = {
    server: {
        port: PORT,
        persistence: PERSISTENCE
    },
    mongo: {
        url: MONGO_URL
    },
    auth: {
        account: ADMIN_MAIL,
        pass: ADMIN_PASSWORD,
        sessionSecret: SESSION_SECRET,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackUrl: CALLBACK_URL
    }
}