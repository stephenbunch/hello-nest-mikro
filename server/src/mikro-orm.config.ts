import { MikroOrmModuleOptions as Options } from '@mikro-orm/nestjs';
import { Todo } from './entities/todo.entity';

const config: Options = {
  type: 'postgresql',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  dbName: 'hello-nest-mikro',
  entities: [Todo],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
};

export default config;
