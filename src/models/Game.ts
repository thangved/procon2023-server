import { ApiProperty } from '@nestjs/swagger';
import BaseModel from './BaseModel';
import Field from './Field';
import Side from './Side';

export default class Game extends BaseModel {
  @ApiProperty()
  name: string;

  @ApiProperty({ minimum: 1 })
  num_of_turns: number;

  @ApiProperty({ minimum: 3 })
  time_per_turn: number;

  @ApiProperty()
  start_time: string;

  @ApiProperty()
  field_id: number;

  @ApiProperty()
  sides: Side[];

  @ApiProperty()
  field: Field;
}
