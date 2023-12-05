import { ApiProperty } from '@nestjs/swagger';
import BaseModel from './BaseModel';

export default class Side extends BaseModel {
  @ApiProperty()
  side: string;
  @ApiProperty()
  team_name: string;
  @ApiProperty()
  team_id: number;
  @ApiProperty()
  game_id: number;
}
