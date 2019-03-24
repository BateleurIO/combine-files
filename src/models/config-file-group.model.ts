export interface IConfigFileGroup {
  groupName?: string;
  outputFileName?: string;
  fileGlobs?: string[];
  fileHeader?: string[];
  fileFooter?: string[];
  includeToc?: boolean;
  tocHeader?: string[];
  tocEntry?: string;
  tocFooter?: string[];
  entryHeader?: string[];
  entryFooter?: string[];
}
