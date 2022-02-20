import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional()
  completed?: boolean;
}

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
