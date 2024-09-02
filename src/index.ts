#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import process from 'process'
import { EOL } from 'node:os'
import { glob } from 'glob'
import { Config } from './types.js'

const _CONFIG_PATH ='./dumprepo.json'

/**
 * main function.
 */
async function main() {
  // create default config file if not exists.
  createConfigIfNotExists()

  // load config file.
  const config = loadConfig()

  // find all target files.
  const allFiles = await findTargetFiles(config.projectStructure.include, config.projectStructure.exclude)
  const textFiles = await findTargetFiles(config.textFiles.include, config.textFiles.exclude)

  // to stdout.
  const stream = process.stdout
  try {
    // write project structure.
    stream.write(separatorLines('Project Structure'))
    stream.write(EOL.repeat(2))
    stream.write(allFiles.join(EOL))
    stream.write(EOL.repeat(2))

    // write file contents.
    textFiles.forEach(filePath => {
      const fileContent = fs.readFileSync(filePath)
      stream.write(separatorLines(`FILE: ${filePath}`))
      stream.write(EOL.repeat(2))
      stream.write(fileContent)
      stream.write(EOL.repeat(2))
    })
  } finally {
    stream.end()
  }
}

/**
 * load `dumprepo.json` config file.
 *
 * @returns config object.
 */
function loadConfig(): Config {
  return JSON.parse(fs.readFileSync(_CONFIG_PATH, 'utf8'))
}

/**
 * create default config file if not exists.
 */
function createConfigIfNotExists(): void {
  if (!fs.existsSync(_CONFIG_PATH)) {
    fs.copyFileSync(path.join(import.meta.dirname, 'dumprepo.json'), _CONFIG_PATH)
  }
}

/**
 * find all target files.
 *
 * @param {string[]} blobIncludes e.g. `*.{js,mjs,cjs,ts,tsx}`
 * @param {string[]} blobExcludes e.g. `node_modules/**", "dist/**`
 * @returns {Promise<string[]>} a list of file paths.
 */
async function findTargetFiles(
  blobIncludes: string[],
  blobExcludes: string[],
): Promise<string[]> {
  const paths = await glob(
    blobIncludes,
    {
      nodir: true,
      ignore: blobExcludes,
    },
  )

  return paths.sort()
}

function separatorLines(filePath: string): string {
  return `//////////////// ${filePath} ////////////////`.trim()
}

// module call.
main()
