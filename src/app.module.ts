import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getEnvPath } from './common/helper/env.helper';
import { UserModule } from './api/user/user.module';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { ApiModule } from './api/api.module';
import { AuthorizationMiddleware } from './api/auth/auth.middleware';
import { AuthModule } from './api/auth/auth.module';
import { TaskModule } from './api/task/task.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ApiModule,
    UserModule,
    AuthModule,
    TaskModule

  ],
  controllers: [],
  providers: [],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes('user');
    consumer.apply(AuthorizationMiddleware).forRoutes('task');
    consumer.apply(AuthorizationMiddleware).forRoutes('auth/logout');
  }
}