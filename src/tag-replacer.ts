export class TagReplacer {
    public static replaceTagsArr(input: string[], path: string, lineNo: number): string[] {
        const that = this;
        return input.map(line => {
            return that.replaceTags(line, path, lineNo);
        });
    }
    public static replaceTags(line: string, path: string, lineNo: number): string {
        const newLine = line.replace(/\$\{entryPath\}/, path).replace(/\$\{lineNo\}/, lineNo.toString());
        return newLine;
    }
}