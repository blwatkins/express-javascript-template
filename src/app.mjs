/*
 * Copyright (C) 2026 Brittni Watkins.
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
import path from 'path';

import { rateLimit } from 'express-rate-limit';
import { fileURLToPath } from 'url';

import {
    ALLOWED_ORIGINS,
    HOURS_PER_DAY,
    MILLIS_PER_SECOND,
    MINUTES_PER_HOUR,
    REQUEST_LOGGING_ENABLED,
    SECONDS_PER_MINUTE,
    TRUST_PROXY
} from './constants.mjs';

export const APP = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const LIMITER = rateLimit({
    windowMs: MILLIS_PER_SECOND * SECONDS_PER_MINUTE,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56
});

const CORS_OPTIONS = {
    origin: ALLOWED_ORIGINS,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY
};

APP.disable('x-powered-by');

APP.set('trust proxy', TRUST_PROXY);
APP.set('views', path.join(__dirname, '..', 'views'));
APP.set('view engine', 'ejs');

APP.use(helmet());
APP.use(cors(CORS_OPTIONS));
APP.use(express.json({ limit: '1mb' }));
APP.use(LIMITER);
APP.use(express.static(path.join(__dirname, '..', 'public')));

if (REQUEST_LOGGING_ENABLED) {
    APP.use((request, response, next) => {
        response.on('finish', () => {
            const requestPath = (request.baseUrl || '') + (request.path || '');
            const message = `Request received: ${request.method} ${requestPath} [status ${response.statusCode}]`;
            console.log(message);
        });
        next();
    });
}

APP.get('/', (request, response) => {
    response.render('index');
});
