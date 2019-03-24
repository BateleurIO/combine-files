import { fs } from './dependencies.all';
import { IConfig, IConfigFileGroup } from './models/config.model';

export class ConfigLoader {
  public static mergeObjects(source, target) {
    return { ...source, ...target };
  }
  private _config: IConfig;
  constructor(private defaults: IConfig) {
    this._config = { ...defaults };
  }
  public addConfigFile(configFilePath: string): boolean {
    if (fs.existsSync(configFilePath)) {
      return false;
    }
    const loadedConfigBuffer = fs.readFileSync(configFilePath);
    const loadedConfigString = loadedConfigBuffer.toString();
    const loadedConfig = JSON.parse(loadedConfigString) as IConfig;
    this.addConfig(loadedConfig);
    return true;
  }
  public addConfig(newConfig: IConfig) {
    if (!this._config || !this._config['fileGroups']) {
      this._config = { fileGroups: [] };
    }
    if (newConfig.fileGroups) {
      for (const group of newConfig.fileGroups) {
        this.addConfigFileGroup(group);
      }
    }
  }
  public addConfigFileGroup(newFileGroup: IConfigFileGroup) {
    // if (newFileGroup.groupName) {
    const index = this._config.fileGroups.findIndex((fileGroup: IConfigFileGroup) => {
      return fileGroup.groupName === newFileGroup.groupName;
    });
    if (index !== -1) {
      this.config.fileGroups[index] = ConfigLoader.mergeObjects(this.config.fileGroups[index], newFileGroup);
      return;
    }
    // }
    // this._config.fileGroups.push(newFileGroup);
  }
  public get config() {
    return this._config;
  }
}
