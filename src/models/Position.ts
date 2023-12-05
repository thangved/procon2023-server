import { ApiProperty } from '@nestjs/swagger';

export default class Position {
  @ApiProperty()
  x: number;
  @ApiProperty()
  y: number;
}

export class CraftsmenPosition extends Position {
  @ApiProperty()
  id: string;
  @ApiProperty({ enum: ['A', 'B'] })
  side: 'A' | 'B';
}
