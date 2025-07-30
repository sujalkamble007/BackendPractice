/**
 * Initializes and configures an Express application with the following middleware:
 * - CORS: Enables Cross-Origin Resource Sharing with configurable origin and credentials.
 * - JSON body parser: Parses incoming JSON requests with a configurable size limit.
 * - URL-encoded body parser: Parses incoming URL-encoded requests with a configurable size limit.
 * - Static file serving: Serves static files from the "public" directory.
 * - Cookie parser: Parses cookies attached to the client request object.
 * 
 * Loads environment variables using dotenv.
 * 
 * Exports the configured Express app instance.
 */
import express, { urlencoded } from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {Limit} from './constants.js';
const app = express();


app.use(cors({
    origin : process.env.CROS_ORIGIN || '*',
    Credential: true

}))

app.use(express.json({
    limit : Limit
}))

app.use(urlencoded({extended: true , limit : Limit}))

app.use(express.static("public"))

app.use(cookieParser())


export  { app }  ;    