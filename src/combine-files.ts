import { ConfigFileGroup, Config } from "./models/config.model";
import { tmp, path, fs } from "./dependencies.all";
import { FileConcatenator } from "./file-concatenator";
import { FileList } from "./file-list";
import { FilteredFileLists } from "./models/filtered-file-lists.model";

export class CombineFiles {
    constructor (private config: Config, private rootPath: string) { }
    public execute(pathList: string[]): string[] {
        const result: string[] = [];
        for (const fileGroup of this.config.fileGroups) {
            const fileLists = this.loadFullFileList(pathList, fileGroup);
            result.push(...this.createFiles(fileLists, fileGroup));
        }     
        return result;   
    }

    public loadFullFileList(pathList: string[], fileGroup: ConfigFileGroup): FilteredFileLists {
        const fileLists = new FileList(pathList, this.rootPath, fileGroup).list;
        return this.filterFileList(fileLists);
    }

    public filterFileList(pathList: string[]): FilteredFileLists {
        const files = pathList;
        const fileLists: FilteredFileLists = {};
        for (const file of files) {
            const ext = <any>(file.split('.').pop());
            if (!fileLists.hasOwnProperty(ext)) {
                fileLists[ext] = [];
            }
            fileLists[ext].push(file);
        }
        return fileLists;
    }

    public createFiles(fileLists: FilteredFileLists, fileGroup: ConfigFileGroup): string[] {
        const outputFiles: string[] = [];
        for (const key in fileLists) {
            if (!fileLists.hasOwnProperty(key)) {
                continue;
            }
            let text = (new FileConcatenator(fileGroup, this.rootPath, fileLists[key])).getText();

            let outputFileName = fileGroup.outputFileName || tmp.tmpNameSync() + '.' + key;
            if (!path.isAbsolute(outputFileName)) {
                outputFileName = path.join(this.rootPath, outputFileName);
            }
            fs.writeFileSync(outputFileName, text);
            outputFiles.push(outputFileName);
        }
        return outputFiles;
    }
}