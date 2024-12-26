import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';


//import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const pgConfig:PostgresConnectionOptions = {
    //dun put it here instead put in ENV file
   url:'postgresql://realEstateDB_owner:5CNyXLjH6YrZ@ep-rapid-violet-a5sqmi8v.us-east-2.aws.neon.tech/realEstateDB?sslmode=require', 
   type:'postgres',
   port:3306,
   entities:[__dirname+'/**/*.entity{.ts,.js}'],
   synchronize:true, // production must set it to false

}
export const getDbConfig = (
  configService: ConfigService,
): PostgresConnectionOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.get<string>('DB_USERNAME', 'postgres'),
  password: configService.get<string>('DB_PASS', ''),
  database: configService.get<string>('DB_NAME', 'derk_neak'),
  entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],
  synchronize: true,
});



//import { Property } from "src/entities/property.entity";
//import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

// export const getDbConfig:PostgresConnectionOptions = {
//     //dun put it here instead put in ENV file
//    url:'postgresql://realEstateDB_owner:5CNyXLjH6YrZ@ep-rapid-violet-a5sqmi8v.us-east-2.aws.neon.tech/realEstateDB?sslmode=require', 
//    type:'postgres',
//    port:3306,
//    entities:[__dirname+'/**/*.entity{.ts,.js}'],
//    synchronize:true, // production must set it to false

// }
