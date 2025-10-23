#!/usr/bin/env node

import { CommandLineProcessor } from './cli-processor';
import { FileList } from './file-list';
import { combineFiles } from './index';

function run(params: any) {
  for (const group of params.fileGroups) {
    combineFiles([params.input], group, params.input);
  }
}
const processor = new CommandLineProcessor();
const config = processor.getConfig(processor.readParams(process.argv));
run(config);
