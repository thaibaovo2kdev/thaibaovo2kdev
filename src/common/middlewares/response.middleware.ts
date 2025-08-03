import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getMessage } from '../../utils/localize';

@Injectable()
export class ResponseMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: NextFunction) {
    const oldJson = res.json;

    res.json = function (data: any) {
      const lang = req.headers['accept-language']?.toLowerCase() || 'vi';
      const localizedMessage = getMessage('SUCCESS', lang);

      oldJson.call(res, {
        success: true,
        data,
        message: localizedMessage,
        statusCode: res.statusCode,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
      });
    };

    next();
  }
}
