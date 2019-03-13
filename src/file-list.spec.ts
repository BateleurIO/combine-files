import { FileList } from './file-list'
import { path } from './dependencies.all';

test('Add files', () => {
    const basePath = './test';
    const fileLists = new FileList([basePath], basePath, {
        groupName: 'Test JSON',
        fileGlobs: ['**/*.json']
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
        groupName: 'Test JSON',
        fileGlobs: ['../test/*.json']
    }).list;
    const foundItem = fileLists.find(item => {
        const relPath = path.relative(basePath, item);
        return relPath === 'SAMPLE.CONFIG.JSON';
    });
    expect(foundItem).toBeDefined();
});
test('Add files with constrained glob', () => {
    const basePath = './test/sample.config.json';
    const fileLists = new FileList([basePath], basePath, {
        groupName: 'Test JSON',
        fileGlobs: ['./sample.config.json']
    }).list;
    const foundItem = fileLists.find(item => {
        const relPath = path.relative(basePath, item);
        return !relPath || relPath === 'SAMPLE.CONFIG.JSON';
    });
    expect(foundItem).toBeDefined();
});



