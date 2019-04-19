import { path } from './dependencies.all';
import { FileList } from './file-list';

test('Add files', () => {
  const basePath = './test';
  const fileLists = new FileList([basePath], basePath, {
    fileGlobs: ['**/*.json'],
    groupName: 'Test JSON',
  }).list;
  const foundItem = fileLists.find(item => {
    const relPath = path.relative(basePath, item);
    return relPath === 'SAMPLE.CONFIG.JSON';
  });
  expect(foundItem).toBeDefined();
});
test('Add files with constrained glob', () => {
  const basePath = './test';
  const fileLists = new FileList([basePath], basePath, {
    fileGlobs: ['../test/*.json'],
    groupName: 'Test JSON',
  }).list;
  const foundItem = fileLists.find(item => {
    const relPath = path.relative(basePath, item);
    return relPath === 'SAMPLE.CONFIG.JSON';
  });
  expect(foundItem).toBeDefined();
});
test('Add files with constrained glob', () => {
  const basePath = './test';
  const fileLists = new FileList([], basePath, {
    fileGlobs: ['sample.config.json'],
    groupName: 'Test JSON',
  }).list;
  const foundItem = fileLists.find(item => {
    const relPath = path.relative(basePath, item);
    return !relPath || relPath === 'SAMPLE.CONFIG.JSON';
  });
  expect(foundItem).toBeDefined();
});
test('Add files from multiple sources', () => {
  const basePath = './';
  const fileLists = new FileList(['test', 'src', 'tsconfig.json'], basePath, {
    fileGlobs: ['**/*.spec.*s'],
  }).list;
  expect(fileLists.length).toBe(4);
});
