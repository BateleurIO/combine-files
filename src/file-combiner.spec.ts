import { path } from './dependencies.all';
import { FileCombiner } from './file-combiner';

test('Can concatenate files', () => {
  const fileList: string[] = [path.resolve('./test/file1.txt'), path.resolve('./test/file2.txt')];
  const combiner = new FileCombiner(
    {
      entryFooter: ['Entry Footer'],
      entryHeader: ['Entry Header'],
      fileFooter: ['File Footer'],
      fileHeader: ['File Header'],
      groupName: 'Test',
      includeToc: true,
      tocEntry: '\t${lineNo}\t\t${entryPath}',
      tocFooter: ['TOC Footer'],
      tocHeader: ['TOC Header'],
    },
    fileList,
  );
  const text = combiner.getText();
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
File Footer`;
  expect(text).toBe(expectedText);
});
