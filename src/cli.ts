#!/usr/bin/env node

import { combineFiles } from './index';

function readParams() {
    const value = process.argv.slice(1).reduce((obj, current) => {
        const parts = current.split('=');
        if (!parts || parts.length < 2) {
            return obj;
        }
        return {
            ...obj,
            [parts[0]]: parts[1],
        }
    }, {});
    return value;
}
function processCommandLine() {
    const params = readParams();
    const output = params['--output'] || './output.sql';
    const input = params['--input'] || '.';
    const glob = params['--glob'] || '**/*.sql';
    return {
        glob, input, output,
    };
}

function run(params) {
    combineFiles([params.input], {
        fileGlobs: [params.glob],
        outputFileName: params.output
    });
}
run(processCommandLine());