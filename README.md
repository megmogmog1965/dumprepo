[glob pattern]:https://github.com/isaacs/node-glob/tree/v11.0.0?tab=readme-ov-file#glob-primer

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
    "include": ["**/*"],
    "exclude": ["node_modules/**", ".next/**", "dumprepo.json", "*.svg", "package-lock.json"]
  },
  "dot": false
}
```

* `projectStructure`: [glob pattern] settings for files to include or exclude in the file list displayed in the Project Structure section.
* `textFiles`: [glob pattern] settings to determine which files contents should be output.
* `dot`: `false` ::= Ignores files start with dot.
