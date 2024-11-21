import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new LoggerService();

  private getStatusColor(statusCode: number): string {
    if (statusCode >= 200 && statusCode < 300) return '\x1b[32m'; // Green for success
    if (statusCode >= 300 && statusCode < 400) return '\x1b[36m'; // Cyan for redirection
    if (statusCode >= 400 && statusCode < 500) return '\x1b[33m'; // Yellow for client errors
    if (statusCode >= 500) return '\x1b[31m'; // Red for server errors
    return '\x1b[0m'; // Reset for default
  }

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const statusCode = res.statusCode;
      // const statusColor = this.getStatusColor(statusCode);
      const logMessage = `
      -------------------------------------------------
      Request URL   : ${req.url}
      Method        : ${req.method}
      Params        : ${JSON.stringify(req.params)}
      Body          : ${JSON.stringify(req.body)}
      Status Code   : ${statusCode}
      -------------------------------------------------
          `;
      this.logger.log(
        logMessage,
        RequestLoggerMiddleware.name, // Provide context here
      );
    });

    next();
  }
}
