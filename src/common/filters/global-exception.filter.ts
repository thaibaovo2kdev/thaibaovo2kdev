import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  import { getMessage } from '../../utils/localize';
 
  @Catch()
  export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const lang = request.headers['accept-language']?.toLowerCase() || 'vi';
 
      const status = exception instanceof HttpException
        ? exception.getStatus()
        : 500;
 
      let messageKey = 'INTERNAL_ERROR';
      if (typeof exception.message === 'string') {
        messageKey = exception.message.toUpperCase().replace(/ /g, '_');
      }
 
      const localizedMessage = getMessage(messageKey, lang);
 
      response.status(status).json({
        success: false,
        data: null,
        message: localizedMessage,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
