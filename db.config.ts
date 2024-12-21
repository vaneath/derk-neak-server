import { ConfigService, registerAs } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';

// export const getDbConfig = (
//   configService: ConfigService,
// ): PostgresConnectionOptions => ({
//   type: 'postgres',
//   host: configService.get<string>('DB_HOST', 'localhost'),
//   port: configService.get<number>('DB_PORT', 5432),
//   username: configService.get<string>('DB_USERNAME', 'postgres'),
//   password: configService.get<string>('DB_PASSWORD', ''),
//   database: configService.get<string>('DB_NAME', 'derk_neak'),
//   entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],
//   synchronize: configService.get<boolean>('DB_SYNC', false),
// });

export default registerAs('database', (): PostgresConnectionOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'derk_neak',
  entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],
  synchronize:  process.env.DB_SYNC === 'true' || false,
}));
