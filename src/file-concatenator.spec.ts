import { FileConcatenator } from "./file-concatenator";
import { path } from './dependencies.all';

test('Can concatenate files', () => {
    const rootPath = '';
    const fileList: string[] = [path.resolve('./test/file1.txt'), path.resolve('./test/file2.txt')];
    const concatenator = new FileConcatenator({
        groupName: 'Test',
        fileHeader: ['File Header'],
        fileFooter: ['File Footer'],
        entryHeader: ['Entry Header'],
        entryFooter: ['Entry Footer'],
        tocHeader: ['TOC Header'],
        tocEntry: '\t${lineNo}\t\t${entryPath}',
        tocFooter: ['TOC Footer'],
        includeToc: true
    }, rootPath, fileList);
    const text = concatenator.getText();
    const expectedText = `File Header
TOC Header
\t6\t\tC:\\Dev\\Github\\combine-files\\test\\file1.txt
\t9\t\tC:\\Dev\\Github\\combine-files\\test\\file2.txt
TOC Footer
Entry Header
File 1
Entry Footer
Entry Header
File 2
Entry Footer
File Footer`
    expect(text).toBe(expectedText);
});

