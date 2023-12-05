import { ApiProperty } from '@nestjs/swagger';
import BaseModel from './BaseModel';

export default class Field extends BaseModel {
  @ApiProperty()
  name: string;

  @ApiProperty({ minimum: 1 })
  castle_coeff: number;

  @ApiProperty({ minimum: 1 })
  wall_coeff: number;

  @ApiProperty({ minimum: 1 })
  territory_coeff: number;

  @ApiProperty({ minimum: 1 })
  width: number;

  @ApiProperty({ minimum: 1 })
  height: number;

  @ApiProperty()
  ponds: string;

  @ApiProperty()
  castles: string;
  @ApiProperty()
  craftsmen: string;
  @ApiProperty()
  match_id: number;
}
