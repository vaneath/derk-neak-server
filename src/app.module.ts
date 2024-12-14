import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BusesModule } from './buses/buses.module';
import { RoutesModule } from './routes/routes.module';
import { BlogsModule } from './blogs/blogs.module';
import { SchedulesModule } from './schedules/schedules.module';
import { AuthModule } from './auth/auth.module';
import { getDbConfig } from 'db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}` || '.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => getDbConfig(configService),
    }),
    UsersModule,
    BusesModule,
    RoutesModule,
    BlogsModule,
    SchedulesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
