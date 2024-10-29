import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  /**
   * Global Prefix
   * This is used to prefix the routes with the global prefix
   * This is useful for the frontend to know where the API is located
   * All routes will be prefixed with /api
   */
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  /**
   * Global Validation Pipe
   * This is used to validate the body of the request
   * It will throw an error if the body is not valid
   */
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  /**
   * Global Exception Filter
   * This is used to handle all exceptions
   */
  app.useGlobalFilters(new HttpExceptionFilter());

  /**
   * Global Port
   * This is used to get the port from the environment variables
   * If no port is found, it will use the default port 3000
   */
  const port = process.env.PORT || 3000;

  /**
   * Swagger Setup
   * This is used to create the Swagger documentation
   */
  const config = new DocumentBuilder()
    .setTitle('Split API')
    .setDescription('The Split API description')
    .setVersion('1.0')
    .addTag('split')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
