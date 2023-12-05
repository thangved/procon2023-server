import { ApiProperty } from '@nestjs/swagger';
import BaseModel from './BaseModel';

export default class Action extends BaseModel {
  @ApiProperty({ enum: ['STAY', 'MOVE', 'BUILD', 'DESTROY'] })
  action: 'STAY' | 'MOVE' | 'BUILD' | 'DESTROY';

  @ApiProperty({
    enum: [
      'UP',
      'DOWN',
      'LEFT',
      'RIGHT',
      'ABOVE',
      'BELOW',
      'UP_LEFT',
      'UP_RIGHT',
      'DOWN_LEFT',
      'DOWN_RIGHT',
    ],
  })
  action_param?:
    | 'UP'
    | 'DOWN'
    | 'LEFT'
    | 'RIGHT'
    | 'ABOVE'
    | 'BELOW'
    | 'UP_LEFT'
    | 'UP_RIGHT'
    | 'DOWN_LEFT'
    | 'DOWN_RIGHT';
  craftsman_id: string;

  @ApiProperty()
  action_id: number;

  @ApiProperty({ required: false })
  disabled?: boolean;
}
