import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as path from 'node:path';
import * as fsPromises from 'fs/promises';

@Injectable()
export class LoggerService extends ConsoleLogger {
  async logToFile(entry: string) {
    const formatedEntry = `${Intl.DateTimeFormat('en-GB', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'Europe/Moscow',
    }).format(new Date())}\t${entry}\n`;

    const pathFolder = path.join('/usr/src/app/logs');
    const pathFile = path.join(pathFolder, 'myLogs.log');

    try {
      await fsPromises.appendFile(pathFile, formatedEntry);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  }

  log(message: string, context?: string) {
    const entry = `${context}\t${message}`;
    this.logToFile(entry);
    super.log(message, context);
  }
  error(message: string, context?: string) {
    const entry = `${context}\t${message}`;
    this.logToFile(entry);
    super.error(message, context);
  }
}
