import { Config, ConfigFileGroup } from './models/config.model';
import { fs } from './dependencies.all';

export class ConfigLoader {
    private _config: Config;
    constructor(private defaults: Config) {
        this._config = {...defaults};
    }
    public addConfigFile(configFilePath: string) {
        const loadedConfigBuffer = fs.readFileSync(configFilePath);
        const loadedConfigString = loadedConfigBuffer.toString();
        const loadedConfig = <Config>JSON.parse(loadedConfigString);
        this.addConfig(loadedConfig);
    }
    public addConfig(newConfig: Config) {
        if (!this._config || !this._config['fileGroups']) {
            this._config = { fileGroups: [] };
        }
        if (newConfig.fileGroups) {
            for (const group of newConfig.fileGroups) {
                this.addConfigFileGroup(group);
            }
        }
    }
    public addConfigFileGroup(newFileGroup: ConfigFileGroup) {
        if (newFileGroup.groupName) {
            const index = this._config.fileGroups.findIndex((fileGroup: ConfigFileGroup) => {
                return (fileGroup.groupName === newFileGroup.groupName);
            });
            if (index !== -1) {
                this.config.fileGroups[index] = ConfigLoader.mergeObjects(this.config.fileGroups[index], newFileGroup);
                return;
            }
        }
        this._config.fileGroups.push(newFileGroup);
    }
    public static mergeObjects(source, target) {
        return { ...source, ...target };
    }
    public get config() {
        return this._config;
    }
}
