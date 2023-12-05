import { ApiProperty } from '@nestjs/swagger';
import { ActionDto } from './ActionDto';

export class CreateActionDto {
  @ApiProperty()
  turn: number;

  @ApiProperty({ type: ActionDto, isArray: true })
  actions: ActionDto[];
}
