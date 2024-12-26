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
import {  getDbConfig, pgConfig } from 'dbConfig';

@Module({
  imports: [ TypeOrmModule.forRoot(pgConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => getDbConfig(configService),
    // }),
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

// export const pgConfig:PostgresConnectionOptions = {
//   //dun put it here instead put in ENV file
//  url:'postgresql://realEstateDB_owner:5CNyXLjH6YrZ@ep-rapid-violet-a5sqmi8v.us-east-2.aws.neon.tech/realEstateDB?sslmode=require', 
//  type:'postgres',
//  port:3306,
//  entities:[__dirname+'/**/*.entity{.ts,.js}'],
//  synchronize:true, // production must set it to false

// }
// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       //url:'postgresql://realEstateDB_owner:5CNyXLjH6YrZ@ep-rapid-violet-a5sqmi8v.us-east-2.aws.neon.tech/realEstateDB?sslmode=require', 
//   //type:'postgres',
//   //port:3306,
//   //entities:[__dirname+'/**/*.entity{.ts,.js}'],
//   //synchronize:true, // production must set it to false
//       type: 'postgres', 
//       host: 'localhost',
//       port: 5432, 
//       username: 'postgres',
//       password: 'sophal168-',
//       database: 'database',
//       entities: [__dirname + '/**/*.entity{.ts,.js}'],
//       synchronize: false, 
//     }),
//     RoutesModule,
//   ],
// })
 export class AppModule {}

