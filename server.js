import * as dotenv from 'dotenv';
import express, { json } from 'express';
import helmet from "helmet";
import cors from "cors";
dotenv.config()

const app = express();
app.use(json({ limit: '50mb' }));
app.use(helmet());

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));

const apiKey = process.OPENAI_API_KEY;
const port = process.env.PORT || 8080

app.get('/', function (req, res) {
    res.send('Hello World');
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});