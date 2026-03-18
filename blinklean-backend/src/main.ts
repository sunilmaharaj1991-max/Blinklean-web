import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import compression from 'compression';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    helmet({
      crossOriginResourcePolicy: false, // Allow cross-origin requests
    }),
  );
  app.use(compression());
  app.enableCors({
    origin: (origin, callback) => {
      // Allow all origins to prevent "Failed to fetch" on mobile/various domains
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      callback(null, true);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT || 5000;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Blinklean API is running on: http://0.0.0.0:${port}/api/v1`);
}
bootstrap().catch((err) => {
  console.error('Bootstrap failed', err);
});
