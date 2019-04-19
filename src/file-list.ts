import { fs, GlobSync, path } from './dependencies.all';
import { IConfigFileGroup } from './models/config.model';

export class FileList {
  private _list: string[] = [];
  public get list() {
    return this._list;
  }

  constructor(pathList: string[], private rootPath: string, private fileGroup: IConfigFileGroup) {
    pathList = !pathList || pathList.length === 0 ? ['.'] : pathList;
    pathList.forEach(pathName => this.addFilesToList(pathName));
    this._list = [...new Set(this.list)];
  }
  public addFilesToList(pathName: string) {
    for (const pattern of this.fileGroup.fileGlobs || ['*.*']) {
      let finalPattern = pattern;
      if (!pattern.startsWith('**') && !path.isAbsolute(pattern)) {
        const rootPattern = path.resolve(this.rootPath, pattern);
        finalPattern = path.relative(pathName, rootPattern);
        const backNavIndex = finalPattern.search(/(\.\.\/)+|(\.\.\\)+/);
        if (backNavIndex !== -1) {
          continue;
        }
      }

      let cwd = pathName;
      let absFileName: string;
      if (fs.lstatSync(pathName).isFile()) {
        absFileName = path.normalize(path.resolve(this.rootPath, pathName).toUpperCase());
        cwd = path.dirname(absFileName);
      }

      const glob = new GlobSync(finalPattern, { cwd, absolute: true });
      this.list.push(
        ...glob.found
          .map(item => path.normalize(item.toUpperCase()))
          .filter(item => !absFileName || item === absFileName),
      );
    }
  }
}
