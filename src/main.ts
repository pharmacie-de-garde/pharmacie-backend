import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Configure CORS
    app.enableCors({
      origin: '*', 
      methods: ['GET', 'POST', 'PUT', 'DELETE'], 
   
    });

  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new LoggingInterceptor())

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();