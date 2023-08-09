import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('Drone')
      .setDescription('The Drone API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    app.enableCors({
      origin: process.env.ALLOW_ORIGIN,
    });
    await app.listen(parseInt(process.env.PORT, 10) || 3000);
  }
  bootstrap();
}
bootstrap();
