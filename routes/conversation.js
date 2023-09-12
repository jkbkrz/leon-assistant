import * as dotenv from 'dotenv';
import express from 'express';
import { fakerPL } from '@faker-js/faker';
import { rateLimit } from 'express-rate-limit';
import { createFromPattern, getRandomNumber } from '../helpers.js';
import OpenAI from 'openai';

dotenv.config()

const router = express.Router()

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 10 requests per `window` (here, per 1 minute)
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const apiKey = process.OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey
});

router.post('/initialize', limiter, (req, res) => {
    const id = createFromPattern('xxxxxxxxx-xxxxxxxxx-xxxxxxxxx');

    const person = {
        username: fakerPL.person.firstName('female'),
        age: getRandomNumber(18, 25)
    };

    res.status(200).json({ id, person });
})

router.post('/chat', limiter, async (req, res) => {
    const messages = [];
    const person = req.body.person

    if (!person || !person.username || !person.age) return res.status(400).json({ message: "Incomplete request" })

    messages.concat(req.body.messages);

    const initialSystemMessage = { "role": "system", "content": `You are a helpful assistant. Your name is ${person.name} and you are ${person.age} years old.` };

    messages.unshift(initialSystemMessage);

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages,
    });

    res.status(200).json(response);
})

export default router