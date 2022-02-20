import { MikroOrmModuleOptions as Options } from '@mikro-orm/nestjs';
import { Todo } from './entities/todo.entity';
import { parse } from 'pg-connection-string';

const url =
  process.env.DATABASE_URL ??
  'postgres://postgres:postgres@localhost:5432/postgres';
const options = parse(url);

const config: Options = {
  type: 'postgresql',
  host: options.host,
  port: options.port !== undefined ? parseInt(options.port, 10) : undefined,
  user: options.user,
  password: options.password,
  dbName: options.database,
  entities: [Todo],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
};

export default config;
