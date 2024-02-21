import * as fs from 'fs';
import { ConfigLoader } from './config-loader';
import { FileCombiner } from './file-combiner';
import { FileList } from './file-list';
import { IConfigFileGroup } from './models/config-file-group.model';
import { IConfig } from './models/config.model';

export function combineFiles(fileList: string[], fileGroup: IConfigFileGroup, rootPath?: string): string {
  rootPath = rootPath || './';
  const resolvedFiles = new FileList(fileList, rootPath, fileGroup);
  const combiner = new FileCombiner(fileGroup, resolvedFiles.list);
  const fileText = combiner.getText();
  if (fileGroup.outputFileName) {
    fs.writeFileSync(fileGroup.outputFileName, fileText, { encoding: 'utf8' });
  }
  return fileText;
}

export { ConfigLoader, IConfig, IConfigFileGroup, FileCombiner, FileList };
