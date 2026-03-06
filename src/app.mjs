/*
 * Copyright (C) 2026 brittni and the polar bear LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
 * AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import express from 'express';

import cors from 'cors';
import helmet from 'helmet';

import { rateLimit } from 'express-rate-limit';

import { REQUEST_LOGGING_ENABLED } from './constants.mjs';

export const APP = express();

const LIMITER = rateLimit({
    windowMs: 1_000 * 60,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56
});

APP.disable('x-powered-by');

APP.set('trust proxy', false);
APP.set('views', 'views');
APP.set('view engine', 'ejs');

APP.use(helmet());
APP.use(cors());
APP.use(express.json({ limit: '1mb' }));
APP.use(LIMITER);
APP.use(express.static('public'));

if (REQUEST_LOGGING_ENABLED) {
    APP.use((request, response, next) => {
        response.on('finish', () => {
            const baseMessage = `Request received: ${request.method} ${request.originalUrl || request.url}`;
            console.log(response.statusCode === 404 ? `${baseMessage} [404 - Not Found]` : baseMessage);
        });
        next();
    });
}

APP.get('/', (request, response) => {
    response.render('index');
});
