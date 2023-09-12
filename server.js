import * as dotenv from 'dotenv';
import express, { json, urlencoded } from 'express';
import helmet from "helmet";
import cors from "cors";

import conversationRoute from './routes/conversation.js';

dotenv.config()

const app = express();
app.use(json({ limit: '50mb' }));
app.use(urlencoded({ extended: true, limit: '50mb' }))
app.use(helmet());

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));

const port = process.env.PORT || 8080;

app.use('/conversation', conversationRoute);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});