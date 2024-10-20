import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

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
  app.useGlobalPipes(new ValidationPipe());

  /**
   * Global Port
   * This is used to get the port from the environment variables
   * If no port is found, it will use the default port 3000
   */
  const port = process.env.PORT || 3000;
  
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
