import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HealthController } from './health.controller';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'web', 'build'),
    }),
    ApiModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
