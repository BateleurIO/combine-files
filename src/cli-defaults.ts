import { IConfigFileGroup } from './models/config-file-group.model';

export const defaultConfig: {
  [key: string]: IConfigFileGroup;
} = {
  '*.md': {
    entryFooter: ['', '---', ''],
    entryHeader: ['', '> ${entryPath}', '---'],
    fileFooter: [],
    fileGlobs: ['**/*.md'],
    fileHeader: ['# Combined Document', ''],
    includeToc: true,
    tocEntry: '* ${lineNo}\t\t${entryPath}',
    tocFooter: ['', '---', ''],
    tocHeader: ['## Included Files'],
  },
  '*.sql': {
    entryFooter: [
      'GO',
      '/*********************************************************************************',
      '* End: ${entryPath}',
      '**********************************************************************************/',
      "print 'End: ${entryPath}'",
      'GO',
      '/*********************************************************************************/',
    ],
    entryHeader: [
      '/*********************************************************************************',
      '* Start: ${entryPath}',
      '**********************************************************************************/',
      "print 'Start: ${entryPath}'",
      'GO',
    ],
    fileFooter: [],
    fileGlobs: ['**/*.sql'],
    fileHeader: [
      '/**********************************************************************************',
      '* This is a concatenation of all the selected files, including files in subfolders.',
      '* The start and end of each file contains a comment with its name, as well as a',
      '* print statement.',
      '* Generated at: ${now} ',
      '***********************************************************************************',
    ],
    includeToc: true,
    tocEntry: '* ${lineNo}\t\t${entryPath}',
    tocFooter: ['***********************************************************************************/'],
    tocHeader: ['* These are the line numbers for the included files:'],
  },
  '*.txt': {
    entryFooter: ['', '---', ''],
    entryHeader: ['', '> ${entryPath}', '---'],
    fileFooter: [],
    fileGlobs: ['**/*.txt'],
    fileHeader: ['# Combined Document', ''],
    includeToc: true,
    tocEntry: '* ${lineNo}\t\t${entryPath}',
    tocFooter: ['', '---', ''],
    tocHeader: ['## Included Files'],
  },
};
