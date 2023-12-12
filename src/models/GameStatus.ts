import { ApiProperty } from '@nestjs/swagger';

export default class GameStatus {
  @ApiProperty()
  cur_turn: number;

  @ApiProperty()
  max_turn: number;

  @ApiProperty()
  remaining: number;
}
