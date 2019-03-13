import { fs, path, GlobSync } from './dependencies.all';
import { ConfigFileGroup } from './models/config.model';

export class FileList {
    private _list: string[] = [];
    public get list() { return this._list; }

    constructor (pathList: string[], private rootPath: string, private fileGroup: ConfigFileGroup) {
        pathList.forEach(pathName => this.addFilesToList(pathName));
        this._list = [...new Set(this.list)];
    }
    addFilesToList(pathName: string) {
        for (const pattern of this.fileGroup.fileGlobs) {
            if (fs.lstatSync(pathName).isDirectory()) {
                let finalPattern = pattern;
                if (!pattern.startsWith('**') && !path.isAbsolute(pattern)) {
                    const rootPattern = path.resolve(this.rootPath, pattern);
                    finalPattern = path.relative(pathName, rootPattern);
                    const backNavIndex = finalPattern.search(/(\.\.\/)+|(\.\.\\)+/);
                    if (backNavIndex !== -1) {
                        continue;
                    }
                }
                var glob = new GlobSync(finalPattern, { cwd: pathName, absolute: true });
                this.list.push(...glob.found.map(item => path.normalize(item.toUpperCase())));
            } else if (fs.lstatSync(pathName).isFile()) {
                this.list.push(path.normalize(pathName.toUpperCase()));
            }
        }
    }
}