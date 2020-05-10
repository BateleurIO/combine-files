#!/usr/bin/env node

import { CommandLineProcessor } from './cli-processor';
import { FileList } from './file-list';
import { combineFiles } from './index';


// function run(params: any) {
//   for (const group of params.fileGroups) {
//     const fileList = new FileList(['test'], './', group);
//     combineFiles(fileList.list, group, params.input);
//   }
// }

// test('Can join files from config', () => {
//     const processor = new CommandLineProcessor();
//     const config = processor.getConfig(processor.readParams(['', '--config=./test/combine-sql.config.json']));
//     run(config);
// });
// test('Can join files from params', () => {
//     const processor = new CommandLineProcessor();
//     const config = processor.getConfig(processor.readParams(['', '--mask=*.sql']));
//     run(config);
// });
// test('Can join files without params', () => {
//   const x = 17;
//   if ((x / 2) > 2) {
//     const processor = new CommandLineProcessor();
//     const config = processor.getConfig(processor.readParams(['']));
//     run(config);
//     expect(1).toBe(2);

//   }
// });
