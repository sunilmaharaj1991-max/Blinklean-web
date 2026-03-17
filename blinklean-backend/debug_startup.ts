import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('DebugStartup');
  try {
    logger.log('Starting Nest application for health check...');
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn'], // Minimal logging for check
    });

    logger.log('Application created successfully.');
    await app.init();
    logger.log(
      'Application initialized successfully. Database connection verified.',
    );

    await app.close();
    logger.log('Health check passed. Closing.');
    process.exit(0);
  } catch (err) {
    logger.error('--- CRITICAL REPRODUCTION ERROR ---');
    logger.error(err instanceof Error ? err.stack : err);
    process.exit(1);
  }
}
bootstrap();
