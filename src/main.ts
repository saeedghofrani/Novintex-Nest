import { ValidationPipe } from '@nestjs/common';
//no authorization
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from "helmet";
import * as xss from 'xss-clean';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(xss());
  app.enableCors();

  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');


  const configSwagger = new DocumentBuilder()
    .addBearerAuth({ type: 'http', scheme: 'bearer' }, 'access-token')
    .setTitle('Novintex')
    .setDescription('The Project structure API description')
    .setVersion('1.0')
    .build();


  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(port, () => {
    console.log('[WEB]', config.get<string>('BASE_URL'));
  });

}
bootstrap();