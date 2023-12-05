import { ApiProperty } from '@nestjs/swagger';

export class ActionDto {
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
    required: false,
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

  @ApiProperty({ uniqueItems: true })
  craftsman_id: string;
}
