import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Procon API')
    .setDescription('Procon API description')
    .setVersion('1.0')
    .addServer('/api', 'Local')
    .addServer('https://api.procon23.thangved.com/api', 'Production')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
