import { MikroOrmModuleOptions as Options } from '@mikro-orm/nestjs';
import { Todo } from './entities/todo.entity';

const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;

const config: Options = {
  type: 'postgresql',
  host: process.env.DB_HOST ?? 'localhost',
  port,
  user: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASS ?? 'postgres',
  dbName: process.env.DB_NAME ?? 'postgres',
  entities: [Todo],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
};

export default config;
