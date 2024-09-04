# dumprepo

## Usage

Please use node v18, or higher.

```bash
npx dumprepo
```

dumprepo outputs the project's source code as a single bundle to stdout.

```
//////////////// Project Structure ////////////////

{list of files with directory structure}

//////////////// FILE: {filename} ////////////////

{file content}

...
```

## Configuration

The command `dumprepo` generates a configuration file `dumprepo.json` on its first run.
```json
{
  "projectStructure": {
    "include": ["**/*"],
    "exclude": ["node_modules/**", ".next/**", "dumprepo.json"]
  },
  "textFiles": {
    "include": ["**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,html,css,scss,sass,csv,xml,json,yaml,yml,md,txt,sh,bat}"],
    "exclude": ["node_modules/**", ".next/**", "dumprepo.json"]
  }
}
```

* `projectStructure`: Settings for files to include or exclude in the file list displayed in the Project Structure section.
* `textFiles`: Settings to determine which files contents should be output.
