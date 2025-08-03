import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../logger/logger.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ResponseMiddleware implements NestMiddleware {
  constructor(private logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const requestId = uuidv4();
    req['requestId'] = requestId;
    this.logger.log(`Request ${requestId}: ${req.method} ${req.url}`);

    const originalJson = res.json;
    res.json = function (data) {
      return originalJson.call(this, {
        success: true,
        statusCode: res.statusCode,
        data,
        timestamp: new Date().toISOString(),
        requestId,
      });
    };
    next();
  }
}