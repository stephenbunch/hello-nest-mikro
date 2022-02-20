import {
  Get,
  Controller,
  Post,
  Param,
  Body,
  Patch,
  NotFoundException,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { EntityRepository, QueryOrder, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Todo } from 'src/entities/todo.entity';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('todos')
export class TodosController {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: EntityRepository<Todo>,
  ) {}

  @ApiOkResponse({ type: Todo, isArray: true })
  @Get()
  async find() {
    return await this.todoRepository.findAll({
      orderBy: { id: QueryOrder.ASC },
    });
  }

  @ApiOkResponse({ type: Todo })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const todo = await this.todoRepository.findOne(id);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }

  @ApiCreatedResponse({ type: Todo })
  @Post()
  async create(@Body() body: CreateTodoDto) {
    const todo = new Todo();

    wrap(todo).assign(body);
    await this.todoRepository.persistAndFlush(todo);

    return todo;
  }

  @ApiOkResponse({ type: Todo })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateTodoDto) {
    const todo = await this.todoRepository.findOne(id);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    wrap(todo).assign(body);
    await this.todoRepository.persistAndFlush(todo);

    return todo;
  }

  @ApiNoContentResponse()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    const todo = await this.todoRepository.findOne(id);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    await this.todoRepository.removeAndFlush(todo);
  }

  @Post('/delete-completed')
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCompleted() {
    await this.todoRepository.nativeDelete({ completed: true });
  }

  @ApiNoContentResponse()
  @Post('/update')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateMany(@Body() body: UpdateTodoDto) {
    await this.todoRepository.nativeUpdate({}, body);
  }
}
