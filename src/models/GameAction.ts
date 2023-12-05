import { ApiProperty } from '@nestjs/swagger';
import Action from './Action';
import BaseModel from './BaseModel';

export default class GameAction extends BaseModel {
  @ApiProperty()
  turn: number;

  @ApiProperty()
  team_id: number;

  @ApiProperty()
  game_id: number;

  @ApiProperty()
  created_time: Date | string;

  @ApiProperty()
  actions: Action[];

  @ApiProperty()
  disabled?: boolean;
}
