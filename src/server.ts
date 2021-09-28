import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './validation/http-exception.filter';
import { Logger } from '@nestjs/common';

const logger = new Logger('server');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Pokemon API')
    .setDescription('API definition for a CRUD API for Pokemons.')
    .setContact(
      'Ricardo Rincon',
      'https://github.com/rrriki',
      'ricardo_rm25@hotmail.com',
    )
    .setVersion('1.0')
    .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, swaggerDocument);
  
  const port = process.env.PORT || 8080;
  await app.listen(port, ()=> logger.log(`Server started listening on port ${port}`));
}
bootstrap();
