export class TagReplacer {
  public static replaceTagsArr(input: string[], path: string, lineNo: number): string[] {
    const that = this;
    return input.map(line => {
      return that.replaceTags(line, path, lineNo);
    });
  }
  public static replaceTags(line: string, path: string, lineNo: number): string {
    const newLine = line.replace(/\$\{entryPath\}/, path.toUpperCase()).replace(/\$\{lineNo\}/, lineNo.toString());
    return newLine;
  }
  public static replaceTimeStamp(line: string[]): string[] {
    const parsed = line.map(value => value.replace(/\$\{now\}/, new Date().toString()));
    return parsed;
  }
}
