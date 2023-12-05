import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Procon API')
    .setDescription('Procon API description')
    .setVersion('1.0')
    .setBasePath('api')
    .addServer('http://localhost:3000/api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.enableCors({
    origin: '*',
  });
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
