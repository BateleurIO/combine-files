import { TagReplacer } from './tag-replacer';

test('Test replacement of string tags', () => {
  const input = ['This is an entry for', '   ${entryPath}', '   which starts at line ${lineNo}'];
  const output = TagReplacer.replaceTagsArr(input, 'C:/Whatever/file.json', 62);
  expect(output).toEqual(['This is an entry for', '   C:/Whatever/file.json', '   which starts at line 62']);
});
