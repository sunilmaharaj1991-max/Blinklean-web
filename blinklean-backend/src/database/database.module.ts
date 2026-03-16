import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const dbUrl = configService.get<string>('DATABASE_URL');
        const config: TypeOrmModuleOptions = {
          autoLoadEntities: true,
          synchronize: true,
          type: 'postgres', // Default type, will be overridden
        };

        if (dbUrl) {
          console.log('DATABASE_URL found. Connecting to PostgreSQL...');
          Object.assign(config, {
            type: 'postgres',
            url: dbUrl,
            ssl: { rejectUnauthorized: false },
          });
        } else {
          console.log('DATABASE_URL not found. Falling back to SQLite...');
          Object.assign(config, {
            type: 'sqlite',
            database: 'blinklean.sqlite',
          });
        }

        return config;
      },
    }),
  ],
})
export class DatabaseModule {}
