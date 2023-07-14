import * as fs from 'fs';
import * as path from 'path';

interface FileTypes {
  [key: string]: string[];
}

export class FileOrganizer {
  private fileTypes: FileTypes;

  constructor(fileTypes: FileTypes) {
    this.fileTypes = fileTypes;
  }

  organizeFiles(directory: string): void {
    this.createFolders(directory);
    this.moveFiles(directory);
  }

  private createFolders(directory: string): void {
    for (const folder of Object.keys(this.fileTypes)) {
      const folderPath = path.join(directory, folder);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
    }
  }

  private moveFiles(directory: string): void {
    fs.readdirSync(directory).forEach((file) => {
      const filePath = path.join(directory, file);
      if (fs.statSync(filePath).isFile()) {
        const fileExtension = path.extname(filePath);
        for (const [folder, extensions] of Object.entries(this.fileTypes)) {
          if (extensions.includes(fileExtension)) {
            this.moveFile(filePath, directory, folder, file);
            break;
          }
        }
      }
    });
  }

  private moveFile(filePath: string, directory: string, folder: string, file: string): void {
    const destinationFolder = path.join(directory, folder);
    const newFilePath = path.join(destinationFolder, file);
    fs.renameSync(filePath, newFilePath);
    console.log(`Moved file '${file}' to '${newFilePath}'`);
  }
}