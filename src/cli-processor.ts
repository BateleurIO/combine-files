import * as fs from 'fs';
import * as path from 'path';
import { defaultConfig } from './cli-defaults';
import { ConfigLoader } from './config-loader';
import { IConfigFileGroup } from './models/config.model';

export class CommandLineProcessor {
    public getConfig(params: any) {
        const output: string = params['--output'];
        const input: string = params['--input'] || './';
        const fileMask: string = params['--mask'] || '*.*';
        const configFile = params['--config'] || './combinefiles.json';
        const showHelp = params['--help']
        const defaultFileGroup = defaultConfig[fileMask.toLowerCase()];
        let config = defaultFileGroup ? { fileGroups: [defaultFileGroup] } : { fileGroups: [] };
        const configLoader = new ConfigLoader(config);
        const configFilePath = path.resolve(input, configFile);
        if (fs.existsSync(configFilePath)) {
            configLoader.addConfigFile(configFilePath);
        }
        config = configLoader.config;
        for (const fileGroup of config.fileGroups) {
            fileGroup.outputFileName = this.calculateOutputFile(fileGroup, output, fileMask);
        }
        config['input'] = input;

        if (showHelp || !config.fileGroups || config.fileGroups.length === 0) {
            this.showHelp();
        }
        return config;
    }
    public calculateExtension(globPatterns: string[], fileMask?: string): string {
        const patterns = [...globPatterns];
        if (fileMask) {
            patterns.unshift(fileMask);
        }
        for (const globPattern of patterns) {
            const ext = path.extname(globPattern);
            if (ext !== '.*') {
                return ext;
            }
        }
        return '.txt';
    }
    public calculateOutputFile(fileGroupValue: IConfigFileGroup, cliValue: string, fileMask: string): string {
        const result = cliValue || fileGroupValue.outputFileName;
        if (!result) {
            const ext = this.calculateExtension(fileGroupValue.fileGlobs, fileMask);
            return './output' + ext;
        }
        return result;
    }
    public readParams(argv: string[]) {
        const value = argv.slice(1).reduce((obj, current) => {
            const parts = current.split('=');
            if (!parts || parts.length === 0) {
                return obj;
            }
            return {
                ...obj,
                [parts[0]]: parts[1] || true,
            };
        }, {});
        return value;
    }
    private showHelp() {
        // tslint:disable-next-line: no-console
        console.log('Examples:');
        // tslint:disable-next-line: no-console
        console.log('combine-files --mask=*.txt');
        // tslint:disable-next-line: no-console
        console.log('-\tRecursively combines all *.txt files in the current folder and stores the result in output.txt');
        // tslint:disable-next-line: no-console
        console.log('combine-files --mask=*.sql --input=./scripts --output=./combined-script.sql');
        // tslint:disable-next-line: no-console
        console.log('-\tRecursively combines all *.sql files in the ./scripts folder and stores the result in ./combined-script.sql');
        // tslint:disable-next-line: no-console
        console.log('combine-files --config=./sample-config.json');
        // tslint:disable-next-line: no-console
        console.log('-\tRecursively combines files according to the configuration found in ./sample-config.json');
        // tslint:disable-next-line: no-console
        console.log('combine-files');
        // tslint:disable-next-line: no-console
        console.log('-\tRecursively combines files according to the configuration found in ./combinefiles.json');
        // tslint:disable-next-line: no-console
        console.log(' \tDocumentation for the config file may be found here: https://github.com/BateleurIO/combine-files#config-file-format');
    }
}