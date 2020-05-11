import { fs } from './dependencies.all';
import { IConfigFileGroup } from './models/config.model';
import { TagReplacer } from './tag-replacer';

export class FileCombiner {
  public static defaultConfigGroup: IConfigFileGroup = {
    entryFooter: [],
    entryHeader: [],
    fileFooter: [],
    fileHeader: [],
    includeToc: false,
    tocEntry: '\t${lineNo}\t\t${entryPath}',
    tocFooter: [],
    tocHeader: [],
  };
  private items: string[] = [];
  private lineNumbers: any = {};
  private tocIndex = 0;
  constructor(private fileGroup: IConfigFileGroup, fileList: string[]) {
    this.fileGroup = { ...FileCombiner.defaultConfigGroup, ...this.fileGroup };
    this.addHeader();
    if (this.fileGroup.includeToc) {
      this.addToc(fileList);
    }
    for (const uri of fileList) {
      this.addFile(uri);
    }
    if (this.fileGroup.includeToc) {
      this.updateToc();
    }
    this.addFooter();
  }
  public getText() {
    return this.items.join('\n');
  }

  private addToc(uriList: string[]): any {
    this.items.push(...this.fileGroup.tocHeader);
    this.tocIndex = this.items.length;
    this.items.push(...uriList.map(() => ''));
    this.items.push(...this.fileGroup.tocFooter);
  }
  private updateToc(): any {
    let idx = this.tocIndex;
    for (const entry in this.lineNumbers) {
      if (this.lineNumbers.hasOwnProperty(entry)) {
        this.items[idx++] = TagReplacer.replaceTags(this.fileGroup.tocEntry, entry, this.lineNumbers[entry]);
      }
    }
  }
  private addHeader(): any {
    this.items.push(...TagReplacer.replaceTimeStamp(this.fileGroup.fileHeader));
  }
  private addFooter(): any {
    this.items.push(...this.fileGroup.fileFooter);
  }
  private addFile(uri: string): any {
    const currentLength = this.items.length;
    const data = this.removeBom(fs.readFileSync(uri, 'UTF-8'))
      .toString()
      .replace(/\r/, '')
      .replace(/\u00ef\u00bb\u00bf/, '')
      .split('\n');
    // if (currentLength !==  this.items.length) {
    this.lineNumbers[uri] = currentLength + 1;
    // }
    this.items.push(...TagReplacer.replaceTagsArr(this.fileGroup.entryHeader, uri, this.lineNumbers[uri]));
    this.items.push(...data);
    this.items.push(...TagReplacer.replaceTagsArr(this.fileGroup.entryFooter, uri, this.lineNumbers[uri]));
  }
  private removeBom(x: any) {
    // Catches EFBBBF (UTF-8 BOM) because the buffer-to-string
    // conversion translates it to FEFF (UTF-16 BOM)
    if (typeof x === 'string' && x.charCodeAt(0) === 0xfeff) {
      return x.slice(1);
    }

    if (Buffer.isBuffer(x) && x[0] === 0xef && x[1] === 0xbb && x[2] === 0xbf) {
      return x.slice(3);
    }
    return x;
  }
}
