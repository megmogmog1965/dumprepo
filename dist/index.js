#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import process from 'process';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EOL } from 'node:os';
import { glob } from 'glob';
import { fileTypeFromFile } from 'file-type';
const __dirname = dirname(fileURLToPath(import.meta.url));
const _CONFIG_PATH = './dumprepo.json';
/**
 * main function.
 */
export async function main() {
    var _a;
    // create default config file if not exists.
    createConfigIfNotExists();
    // load config file.
    const config = loadConfig();
    const dot = (_a = config.dot) !== null && _a !== void 0 ? _a : false;
    // find all target files.
    const allFiles = await findTargetFiles(config.projectStructure.include, config.projectStructure.exclude, dot);
    const textFiles = await findTargetFiles(config.textFiles.include, config.textFiles.exclude, dot);
    // to stdout.
    const stream = process.stdout;
    try {
        // write project structure.
        stream.write(separatorLines('Project Structure'));
        stream.write(EOL.repeat(2));
        stream.write(allFiles.join(EOL));
        stream.write(EOL.repeat(2));
        // write file contents.
        for (const filePath of textFiles) {
            // ignore binary file.
            const type = await fileTypeFromFile(filePath);
            if (type) {
                continue;
            }
            const fileContent = fs.readFileSync(filePath);
            stream.write(separatorLines(`FILE: ${filePath}`));
            stream.write(EOL.repeat(2));
            stream.write(fileContent);
            stream.write(EOL.repeat(2));
        }
    }
    finally {
        stream.end();
    }
}
/**
 * load `dumprepo.json` config file.
 *
 * @returns config object.
 */
function loadConfig() {
    return JSON.parse(fs.readFileSync(_CONFIG_PATH, 'utf8'));
}
/**
 * create default config file if not exists.
 */
function createConfigIfNotExists() {
    if (!fs.existsSync(_CONFIG_PATH)) {
        fs.copyFileSync(path.join(__dirname, 'dumprepo.json'), _CONFIG_PATH);
    }
}
/**
 * find all target files.
 *
 * @param {string[]} blobIncludes e.g. `*.{js,mjs,cjs,ts,tsx}`
 * @param {string[]} blobExcludes e.g. `node_modules/**", "dist/**`
 * @param {boolean} dot false = ignores files start with dot.
 * @returns {Promise<string[]>} a list of file paths.
 */
async function findTargetFiles(blobIncludes, blobExcludes, dot) {
    const paths = await glob(blobIncludes, {
        nodir: true,
        ignore: blobExcludes,
        dot: dot,
    });
    return paths.sort();
}
function separatorLines(filePath) {
    return `//////////////// ${filePath} ////////////////`.trim();
}
// module call.
await main();
//# sourceMappingURL=index.js.map