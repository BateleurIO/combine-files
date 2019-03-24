import { ConfigLoader } from './config-loader';

test('Can merge object', () => {
  expect(ConfigLoader.mergeObjects({ a: 'A', b: 'B' }, { b: 'BB', c: 'CC' })).toMatchObject({
    a: 'A',
    b: 'BB',
    c: 'CC',
  });
});
test('Reports default config', () => {
  const loader = new ConfigLoader({
    fileGroups: [
      {
        fileGlobs: ['**/bob*.sql'],
        groupName: 'Group1',
      },
    ],
  });
  loader.addConfigFile('./test/sample.config.json');
  expect(loader.config).toMatchObject({
    fileGroups: [
      {
        fileGlobs: ['**/bob*.sql'],
        groupName: 'Group1',
      },
      {
        fileGlobs: ['**/bob2*.md'],
        groupName: 'Group2',
        tocEntry: '  TOC Entry goes here',
      },
    ],
  });
});
test('Creates default config', () => {
  const loader = new ConfigLoader(undefined);
  loader.addConfig({
    fileGroups: [
      {
        fileGlobs: ['**/bob2*.md'],
        groupName: 'TestGroup',
        tocEntry: '  TOC Entry goes here',
      },
    ],
  });
  expect(loader.config).toMatchObject({
    fileGroups: [
      {
        fileGlobs: ['**/bob2*.md'],
        groupName: 'TestGroup',
        tocEntry: '  TOC Entry goes here',
      },
    ],
  });
});
test('Creates default config', () => {
  const loader = new ConfigLoader({
    fileGroups: [
      {
        fileGlobs: ['**/bob2*.md'],
        groupName: 'TestGroup',
        tocEntry: '  TOC Entry goes here',
      },
    ],
  });
  loader.addConfig({
    fileGroups: [
      {
        fileGlobs: ['**/bob2*.sql'],
        groupName: 'TestGroup',
        tocEntry: '  TOC Entry 2 goes here',
      },
    ],
  });
  expect(loader.config).toMatchObject({
    fileGroups: [
      {
        fileGlobs: ['**/bob2*.sql'],
        groupName: 'TestGroup',
        tocEntry: '  TOC Entry 2 goes here',
      },
    ],
  });
});
test('Can load config file', () => {
  const loader = new ConfigLoader(undefined);
  loader.addConfig({
    fileGroups: [
      {
        fileGlobs: ['**/bob2*.md'],
        groupName: 'TestGroup',
        tocEntry: '  TOC Entry goes here',
      },
    ],
  });
  expect(loader.config).toMatchObject({
    fileGroups: [
      {
        fileGlobs: ['**/bob2*.md'],
        groupName: 'TestGroup',
        tocEntry: '  TOC Entry goes here',
      },
    ],
  });
});
