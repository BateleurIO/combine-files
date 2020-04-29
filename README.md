# combine-files

Combines several files into one, traversing folders as needed and adding optional headers and footers.

This can be useful in many scenarios, for example:

1. Generate a single (or a handful of) SQL script from sources for easier deployment.
2. Combine Markdown files located throughout a repo.
3. Make one file containing all your style sheets.
4. You get the idea.

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install combine-files
```

## Usage

### Command Line

```
combine-files --glob=**/*.sql --input=./ --output=./output.sql
```

### Simple One-Liner

**From JavaScript**
```js
var c = require('@cobuskruger/combine-files');
const result = c.combineFiles(['./test/test1.txt', './test/test2.txt'], config);
```

**From TypeScript**
```typescript
import { combineFiles } from '@cobuskruger/combine-files';
const result = c.combineFiles(['./test/test1.txt', './test/test2.txt'], config);
```

**Result**
In both cases, `result` will contain the combined test of all the files in the supplied array.

### Simple Examples

#### Combine All SQL Scripts in a Subfolder

```typescript
import { combineFiles } from '@cobuskruger/combine-files';
const result = combineFiles([], { includeToc: false, fileGlobs: ['**/*.sql'] }, './test');
```

**Result**
`result` contains the combined text of all the `.sql` files in `'/test` and all its subfolders.

#### Write Output to a File

```typescript
import { combineFiles } from '@cobuskruger/combine-files';
const result = combineFiles([], {
    fileGlobs: ['**/*.sql'],
    outputFileName: './test/output.sql' }, './test');
```

#### Add Headers, Footers and a Table of Content

```typescript
import { combineFiles } from '@cobuskruger/combine-files';
const result = combineFiles([], {
    fileGlobs: [
        '**/*.sql'
    ],
    outputFileName: './test/output.sql' 
    fileHeader: [
        "/* This text is placed at the very top of the output file, before the",
        "   table of contents and input file content. You can add multiple lines",
        "   and they will be separated by EOL markers. You can also optionally ",
        "   use ${now} to insert the current date and time.",
        "*/"
    ],
    includeToc: true,
    tocHeader: [
        "/* This will be placed directly below the file header when includeToc === true"
    ],
    tocEntry: "* ${lineNo}\t\t${entryPath}",
    tocFooter: [
        "* This will be placed below the last of the TOC entries",
        "*/"
    ],
    entryHeader: [
        "/* An 'entry' is the content of one of the input files, or a file matching any",
        " * fileGlobs entry. ",
        " * This is the block of text that will be added to the top of each entry.",
        " * You can make it more useful, by using a variable, as shown below.",
        " */",
        "print 'Start: ${entryPath}'",
        "GO"
    ],
    entryFooter: [
        "/* This text is placed at the bottom of each entry.
    ],
    fileFooter: [
        "/* This text is placed at the very end of the output file. */",
        "GO"
        "print 'Start: ${entryPath}'",
        "GO"
    ],
}, './test');
```

### Advanced Usage

Apart from the simple `combineFiles` function, you can also use the various exported classes directly, which provides extra capabilities.

#### File List Manipulation

Given the following folder structure:

```
some
    folder
        file1.spec.ts
        file2.spec.ts
    other
        folder
            file3.spec.ts
            file4.spec.ts
        unrelated1
            file5.spec.ts
            file6.spec.ts
    unrelated2
        file7.spec.ts
unrelated3
    folder1
        file8.spec.ts
    folder2
        file9.spec.ts
tests.js
```

This listing will find tests in a selection of subfolders:

```typescript
import { combineFiles, FileList } from '@cobuskruger/combine-files';

const files = new FileList(['some/folder', 'some/other/folder', './tests.js'], './', {
    fileGlobs: ['**/*.spec.*s']
});

combineFiles(files.list, config);
```

The list of files passed to `combineFiles` will be:
*   ./some/folder/file1.spec.ts
*   ./some/folder/file2.spec.ts
*   ./some/other/folder/file3.spec.ts
*   ./some/other/folder/file4.spec.ts
*   ./tests.js

<!-- #### Multiple Configurations

Given the following folder structure:

```
TableChanges
    1.Drop
    2.Create
    3.Alter
    4.Indexes
Routines
    1.Functions
    2.StoredProcedures
DataScripts
```

Several `.sql` files exist in the numbered folders, and also under `/DataScripts`.

I want to generate three files:

* `table-changes.sql`
* `routines.sql`
* `data.sql`

I can do that with one single call, by directly using the `FileCombiner` class:

```typescript
import { FileCombiner, Config } from '@cobuskruger/combine-files';

const config: Config = {
    fileGroups: [{
        groupName: 'Table Changes',
        fileGlobs: ['./TableChanges/**/*.sql'],
        outputFilePath: './table-changes.sql'
    }, {
        groupName: 'Functions And Stored Procedures',
        fileGlobs: ['./Routines/**/*.sql'],
        outputFilePath: './routines.sql'
    }, {
        groupName: 'Table Changes',
        fileGlobs: ['./DataScripts/**/*.sql'],
        outputFilePath: './data.sql'
    }]
};
const combiner = new FileCombiner(config, fileList);
```
For each `FileGroup` you can also add all the modifications shown before, including `fileHeader`, `entryHeader` and the TOC-related properties. -->

#### Default Configuration

If you want to reuse file or entry headers and footers, you can do so by overriding the default configuration:

```typescript
FileCombiner.defaultConfigGroup = {
    entryFooter: ['/* End: ${entryPath} */'],
    entryHeader: ['/* Start: ${entryPath} */'],
    fileFooter: ['/* The end */'],
    fileHeader: ['/* The start */'],
    includeToc: true,
    tocEntry: '/*\t${lineNo}\t\t${entryPath} */',
    tocFooter: ['/* Table of Contents */'],
    tocHeader: [],
  };
```

If you supply a default, that will be combined with each individual `fileGroups` entry. Values you specify in a `fileGroupEntry` will override the values in the default.

## API

### combineFiles function
```js
function combineFiles(
    fileList: string[], 
    fileGroup: IConfigFileGroup, 
    rootPath?: string
): string
```

**Parameters**

* `fileList` - A list of files or folders to include. Files are included as-is, while folders are searched for candidate files according to the globs listed in the `fileGroup`.
* `fileGroup` - An `IConfigFileGroup` instance, which controls how to combine the files.
* `rootPath` - All other paths are considered relative to this path. If omitted, defaults to the current directory.

**Return Value**

Returns the combined text of all the files, taking into account header, footer and TOC configuration.

**Side Effects**

If the `fileGroup` parameter has an `outputFileName` specified, this function creates that file containing the combined text.

### FileCombiner Class

This class is used internally and can combine the files specified in fileList. The result is returned in `getText()`.

```typescript
export class FileCombiner {
  public static defaultConfigGroup: IConfigFileGroup;
  constructor(private fileGroup: IConfigFileGroup, fileList: string[]);
  public getText();
}
```

### FileList Class

This class receives a list of input files and folders, applies the `fileGlobs` specified and returns a list of matching files in the `list` property.

```typescript
export class FileList {
    public get list(): string[];
    constructor(
        pathList: string[],
        rootPath: string,
        fileGroup: IConfigFileGroup
    );
    public addFilesToList(pathName: string);
}
```

### IConfigFileGroup interface

Represents the configuration used to search for files to include and how to combine them.

```typescript
export interface IConfigFileGroup {
    groupName?: string;
    outputFileName?: string;
    fileGlobs?: string[];
    fileHeader?: string[];
    fileFooter?: string[];
    includeToc?: boolean;
    tocHeader?: string[];
    tocEntry?: string;
    tocFooter?: string[];
    entryHeader?: string[];
    entryFooter?: string[];
}
```

All the properties are optional.

*   `groupName` - Not used. Use this to label multiple configurations.
*   `outputFileName` - The name of the output file. No file is written if this is not specified.
*   `fileGlobs` - A list of glob patterns to match. A file is included if it matches *any* glob pattern. Defaults to `*.*` if none is specified.
*   `fileHeader` - The lines of text to be placed at the beginning of the output. Defaults to empty array.
*   `fileFooter` - The lines of text to be placed at the end of the output. Defaults to empty array.
*   `includeToc` - A table of contents will be written after `fileHeader` but before the first `entryHeader` if this is `true`. Defaults to `false`.
*   `tocHeader` - If `includeToc === true`, the lines of text to be placed after the `fileHeader`, but before the first `tocEntry`. Defaults to empty array.
*   `tocEntry` - If `includeToc === true`, the single line of text that is added once for each included file. Defaults to `'\t${lineNo}\t\t${entryPath}'`, which will show the line number and original file name for each entry.
*   `tocFooter` - If `includeToc === true`, the lines of text to be placed after the last `tocEntry`, but before the first `entryHeader`. Defaults to empty array.
*   `entryHeader` - The lines of text to be placed at the beginning of each file entry. You can also include the `${entryPath}` variable anywhere in this value. Defaults to empty array.
*   `entryFooter` - The lines of text to be placed at the end of each file entry. You can also include the `${entryPath}` variable anywhere in this value. Defaults to empty array.

## See Also

- [Combine Scripts for Azure Data Studio](https://github.com/BateleurIO/azuredatastudio-combine-scripts) is an extension for Microsoft Azure Data Studio that uses this to concatenate SQL script files. Supports configuration files and the ability to run several configurations in one action.
- [Combine Files for Visual Studio Code](https://github.com/BateleurIO/vscode-combine-files) is an extension for Microsoft Visual Studio Code that uses this to concatenate files of many kinds. Supports configuration files and the ability to run several configurations in one action.

## License

MIT

