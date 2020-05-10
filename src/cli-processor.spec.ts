import { CommandLineProcessor } from "./cli-processor";

test('Can read parameters', () => {
    const processor = new CommandLineProcessor();
    const params = processor.readParams([
        'c:/program-file.exe', '--output=./output.sql', '--input=./input', '--mask=*.sql', '--help'
    ]);
    expect(Object.keys(params).length).toBe(4);
    expect(params['--config']).toBeUndefined();
    expect(params['--output']).toBe('./output.sql');
    expect(params['--input']).toBe('./input');
    expect(params['--mask']).toBe('*.sql');
    expect(params['--help']).toBe(true);
});
test('Can process command line without config file', () => {
    const processor = new CommandLineProcessor();
    const params = processor.readParams([
        'c:/program-file.exe', '--output=./output.sql', '--input=./input', '--mask=*.sql'
    ]);
    const config = processor.getConfig(params);
    expect(config['input']).toBe('./input');
    expect(config.fileGroups).toHaveLength(1);
    const fileGroup = config.fileGroups[0];
    expect(fileGroup).toBeDefined();
    expect(fileGroup.fileGlobs).toHaveLength(1);
    expect(fileGroup.fileGlobs).toContainEqual('**/*.sql');
});
test('Can process command line with config file', () => {
    const processor = new CommandLineProcessor();
    const params = processor.readParams([
        'c:/program-file.exe', '--config=./test/sample.config.json'
    ]);
    const config = processor.getConfig(params);
    expect(config['input']).toBe('./');
    expect(config.fileGroups.length).toBe(1);
    const fileGroup = config.fileGroups[0];
    expect(fileGroup).toBeDefined();
    expect(fileGroup.fileGlobs).toHaveLength(1);
    expect(fileGroup.fileGlobs).toContainEqual('**/bob2*.md');
});
test('Calculates extension from list', () => {
    const processor = new CommandLineProcessor();
    const ext = processor.calculateExtension(['**/*.*', '**/*.sql']);
    expect(ext).toBe('.sql');
});
test('Calculates extension from parameter', () => {
    const processor = new CommandLineProcessor();
    const ext = processor.calculateExtension(['**/*.*', '**/*.sql'], '*.md');
    expect(ext).toBe('.md');
});
test('Calculates extension from default', () => {
    const processor = new CommandLineProcessor();
    const ext = processor.calculateExtension(['**/*.*', '**/bob.*'], '*.*');
    expect(ext).toBe('.txt');
});
test('Calculates filename from file group', () => {
    const processor = new CommandLineProcessor();
    const outputFileName = processor.calculateOutputFile({
        fileGlobs: ['*.sql'],
        outputFileName: './output.sql',
    }, undefined, undefined);
    expect(outputFileName).toBe('./output.sql');
});
test('Calculates filename from command line', () => {
    const processor = new CommandLineProcessor();
    const outputFileName = processor.calculateOutputFile({
        fileGlobs: ['*.sql'],
        outputFileName: './output.sql',
    }, './result.md', undefined);
    expect(outputFileName).toBe('./result.md');
});
test('Calculates filename from default with extension', () => {
    const processor = new CommandLineProcessor();
    const outputFileName = processor.calculateOutputFile({
        fileGlobs: ['*.sql'],
    }, undefined, '*.md');
    expect(outputFileName).toBe('./output.md');
});
test('Calculates filename from default with default extension', () => {
    const processor = new CommandLineProcessor();
    const outputFileName = processor.calculateOutputFile({
        fileGlobs: [],
    }, undefined, undefined);
    expect(outputFileName).toBe('./output.txt');
});
