import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { enableOpenApi } from './open-api';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const isProduction =
    (process.env.NODE_ENV ?? '').toLowerCase() === 'production';

  await enableOpenApi(app, {
    server: {
      prefix: 'api',
    },
    ...(isProduction === false && {
      generateDocument: {
        fileExtension: 'yaml',
        destinationPath: process.cwd(),
        fileName: 'my-api',
      },
      generateClient: {
        destinationPath: join(process.cwd(), '..', 'client', 'lib'),
      },
    }),
  });

  await app.listen(3000);
}

bootstrap();
