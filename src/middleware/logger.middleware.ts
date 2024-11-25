import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new LoggerService();

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const statusCode = res.statusCode;
      const logMessage = `
      -------------------------------------------------
      Request URL   : ${req.url}
      Method        : ${req.method}
      Params        : ${JSON.stringify(req.params)}
      Body          : ${JSON.stringify(req.body)}
      Status Code   : ${statusCode}
      -------------------------------------------------
          `;
      this.logger.log(logMessage, RequestLoggerMiddleware.name);
    });

    next();
  }
}
