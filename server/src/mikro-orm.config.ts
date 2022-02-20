import { MikroOrmModuleOptions as Options } from '@mikro-orm/nestjs';
import { Todo } from './entities/todo.entity';

const url =
  process.env.DATABASE_URL ??
  'postgres://postgres:postgres@localhost:5432/postgres';

const config: Options = {
  type: 'postgresql',
  clientUrl: url,
  entities: [Todo],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
    // https://github.com/mikro-orm/mikro-orm/issues/1842#issuecomment-845072313
    disableForeignKeys: false,
  },
  driverOptions: {
    // https://github.com/mikro-orm/mikro-orm/issues/303#issuecomment-737342298
    connection: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};

export default config;
