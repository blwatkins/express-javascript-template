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
 * @type {number}
 */
export const PORT = getPortNumber();

/**
 * @type {boolean}
 */
export const REQUEST_LOGGING_ENABLED = process.env.REQUEST_LOGGING_ENABLED === 'true';
