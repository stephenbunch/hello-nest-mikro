import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Todo } from 'src/entities/todo.entity';
import { TodosController as TodoController } from './todo.controller';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [Todo],
    }),
  ],
  controllers: [TodoController],
  providers: [],
})
export class TodoModule {}
