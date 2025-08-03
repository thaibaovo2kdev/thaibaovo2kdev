import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './shared/filters/global-exception.filter';
import { ResponseMiddleware } from './shared/middleware/response.middleware';
import { LoggerService } from './shared/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggerService);
  app.useLogger(logger);
  app.useGlobalFilters(new GlobalExceptionFilter(logger));
  app.use(new ResponseMiddleware(logger).use);
  await app.listen(3000);
  logger.log('Application started on port 3000');
}
bootstrap();