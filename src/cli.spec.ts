#!/usr/bin/env node

import { CommandLineProcessor } from './cli-processor';
import { FileList } from './file-list';
import { combineFiles } from './index';

test('Placeholder', () => {
  // These tests are not presently valid.
});

// function run(params: any) {
//   for (const group of params.fileGroups) {
//     combineFiles([params.input], group, params.input);
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
//     const processor = new CommandLineProcessor();
//     const config = processor.getConfig(processor.readParams(['']));
//     run(config);
//     expect(1).toBe(2);
// });