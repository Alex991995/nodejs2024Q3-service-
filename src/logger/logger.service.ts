import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as path from 'node:path';
import * as fsPromises from 'fs/promises';

@Injectable()
export class LoggerService extends ConsoleLogger {
  log_level = +process.env.LOG_LEVEL;
  log_size = +process.env.LOG_SIZE;

  async logToFile(entry: string) {
    const formattedEntry = `${Intl.DateTimeFormat('en-GB', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'Europe/Moscow',
    }).format(new Date())}\t${entry}\n`;

    try {
      const pathFolder = path.join('/usr/src/app/logs');

      if (!(await this.checkIfExistFolder(pathFolder))) {
        await fsPromises.mkdir(pathFolder);
      }

      // Determine the latest log file or create a new one
      let numFiles = (await this.howManyFiles(pathFolder, 'logs')) || 0;
      let pathFile = path.join(pathFolder, `logs.v${numFiles}.log`);

      if (numFiles === 0 || (await this.checkSize(pathFile)) > this.log_size) {
        pathFile = path.join(pathFolder, `logs.v${++numFiles}.log`);
      }

      await fsPromises.appendFile(pathFile, formattedEntry);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  }

  async logToErrorFile(entry: string) {
    const formattedEntry = `${Intl.DateTimeFormat('en-GB', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'Europe/Moscow',
    }).format(new Date())}\t${entry}\n`;

    try {
      const pathFolder = path.join('/usr/src/app/logs');

      if (!(await this.checkIfExistFolder(pathFolder))) {
        console.log('create');
        await fsPromises.mkdir(pathFolder);
      }

      // Determine the latest log file or create a new one
      let numFiles = (await this.howManyFiles(pathFolder, 'errorlogs')) || 0;
      let pathFile = path.join(pathFolder, `errorlogs.v${numFiles}.log`);

      if (numFiles === 0 || (await this.checkSize(pathFile)) > this.log_size) {
        pathFile = path.join(pathFolder, `errorlogs.v${++numFiles}.log`);
      }

      await fsPromises.appendFile(pathFile, formattedEntry);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  }

  log(message: string, context?: string) {
    if (this.log_level >= 1) {
      const entry = `${context} LOG ${message} \t`;
      this.logToFile(entry);
      super.log(message, context);
    }
  }
  error(message: string, context?: string) {
    if (this.log_level >= 0) {
      const entry = `${context} ERROR ${message} \t`;

      this.logToErrorFile(entry);
      // this.logToFile(entry)
      super.error(message, context);
    }
  }

  verbose(message: string, context?: string) {
    if (this.log_level >= 4) {
      const entry = `${context} VERBOSE ${message}\t`;
      this.logToFile(entry);
      super.verbose(message, context);
    }
  }

  warn(message: string, context?: string) {
    if (this.log_level >= 3) {
      const entry = `${context} WARN ${message} \t`;
      this.logToFile(entry);
      super.verbose(message, context);
    }
  }

  debug(message: string, context?: string) {
    if (this.log_level >= 2) {
      const entry = `${context} DEBUG ${message}\t`;
      this.logToFile(entry);
      super.verbose(message, context);
    }
  }

  async checkSize(pathFile: string) {
    const res = await fsPromises.stat(pathFile);
    return Math.floor(Math.log(res.size) / Math.log(1024));
  }

  async howManyFiles(pathFolder: string, nameFile: string) {
    try {
      const files = await fsPromises.readdir(pathFolder);
      const s = files.filter((f) => f.startsWith(nameFile));
      // console.log(s.length);
      return s.length;

      // for (const file of files) console.log(file);
    } catch (err) {
      console.error(err);
    }
  }

  async checkIfExistFolder(pathFolder: string) {
    try {
      await fsPromises.access(pathFolder);
      return true;
    } catch {
      return false;
    }
  }
}
