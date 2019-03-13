import { ConfigLoader } from "./config-loader";

test('Can merge object', () => {
    expect(ConfigLoader.mergeObjects(
        { a: 'A', b: 'B' }, { b: 'BB', c: 'CC' }
    )).toMatchObject(
        { a: 'A', b: 'BB', c: 'CC' }
    );
});
test('Reports default config', () => {
    const loader = new ConfigLoader({ 
        fileGroups: [{
            groupName: 'Group1',
            fileGlobs: ['**/bob*.sql']
        }]
    });
    loader.addConfigFile('./test/sample.config.json');
    expect(loader.config).toMatchObject({
        fileGroups: [{
            groupName: 'Group1',
            fileGlobs: ['**/bob*.sql'] 
        }, {
            groupName: 'Group2',
            fileGlobs: ['**/bob2*.md'],
            tocEntry: '  TOC Entry goes here' 
        }]
    });
});
test('Creates default config', () => {
    const loader = new ConfigLoader(undefined);
    loader.addConfig({
        fileGroups: [{
           groupName: 'TestGroup',
           fileGlobs: ['**/bob2*.md'],
           tocEntry: '  TOC Entry goes here' 
        }]
    });
    expect(loader.config).toMatchObject({
        fileGroups: [{
            groupName: 'TestGroup',
            fileGlobs: ['**/bob2*.md'],
            tocEntry: '  TOC Entry goes here' 
         }]
    });
});
test('Creates default config', () => {
    const loader = new ConfigLoader({
        fileGroups: [{
           groupName: 'TestGroup',
           fileGlobs: ['**/bob2*.md'],
           tocEntry: '  TOC Entry goes here' 
        }]
    });
    loader.addConfig({
        fileGroups: [{
           groupName: 'TestGroup',
           fileGlobs: ['**/bob2*.sql'],
           tocEntry: '  TOC Entry 2 goes here' 
        }]
    });
    expect(loader.config).toMatchObject({
        fileGroups: [{
            groupName: 'TestGroup',
            fileGlobs: ['**/bob2*.sql'],
            tocEntry: '  TOC Entry 2 goes here' 
         }]
    });
});
test('Can load config file', () => {
    const loader = new ConfigLoader(undefined);
    loader.addConfig({
        fileGroups: [{
           groupName: 'TestGroup',
           fileGlobs: ['**/bob2*.md'],
           tocEntry: '  TOC Entry goes here' 
        }]
    });
    expect(loader.config).toMatchObject({
        fileGroups: [{
            groupName: 'TestGroup',
            fileGlobs: ['**/bob2*.md'],
            tocEntry: '  TOC Entry goes here' 
         }]
    });
});
