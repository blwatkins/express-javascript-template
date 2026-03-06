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

const DEFAULT_PORT = 3000;
const MIN_PORT = 0;
const MAX_PORT = 65535;

/**
 * @returns {string[]|boolean}
 */
function getAllowedOrigins() {
    const allowedOriginsEnv = process.env.ALLOWED_ORIGINS;

    if (typeof allowedOriginsEnv === 'string') {
        const allowedOrigins = allowedOriginsEnv.split(',')
            .map((token) => token.trim())
            .filter((token) => token.length > 0);

        if (allowedOrigins.length > 0) {
            return allowedOrigins;
        }
    }

    return false;
}

/**
 * @returns {number}
 */
function getPortNumber() {
    let port = Number.parseInt(process.env.PORT, 10);

    if (Number.isNaN(port) || port < MIN_PORT || port > MAX_PORT) {
        return DEFAULT_PORT;
    }

    return port;
}

/**
 * Get the trust proxy setting from environment variables.
 *
 * @return {number|boolean} `true` for 'true', a number for valid numeric strings, or `false` for any other value or if not set.
 */
function getTrustProxy() {
    const trustProxy = process.env.TRUST_PROXY;
    const digitsRegex = /^\d+$/;

    if (trustProxy === 'true') {
        return true;
    }

    if (typeof trustProxy === 'string' && digitsRegex.test(trustProxy)) {
        return Number.parseInt(trustProxy, 10);
    }

    return false;
}

/**
 * @type {number}
 */
export const MILLIS_PER_SECOND = 1_000;

/**
 * @type {number}
 */
export const SECONDS_PER_MINUTE = 60;

/**
 * @type {number}
 */
export const MINUTES_PER_HOUR = 60;

/**
 * @type {number}
 */
export const HOURS_PER_DAY = 24;

/**
 * @type {string[]|boolean}
 */
export const ALLOWED_ORIGINS = getAllowedOrigins()

/**
 * @type {number}
 */
export const PORT = getPortNumber();

/**
 * @type {boolean}
 */
export const REQUEST_LOGGING_ENABLED = process.env.REQUEST_LOGGING_ENABLED === 'true';

/**
 * @type {number|boolean}
 */
export const TRUST_PROXY = getTrustProxy();
