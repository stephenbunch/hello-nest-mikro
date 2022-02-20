import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import cuid from 'cuid';

@Entity()
export class Todo {
  @ApiProperty()
  @PrimaryKey()
  id: string = cuid();

  @ApiProperty()
  @Property()
  description: string;

  @ApiProperty()
  @Property({ default: false })
  completed: boolean;
}
