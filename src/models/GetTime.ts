import { ApiProperty } from '@nestjs/swagger';

export default class GetTime {
  @ApiProperty({ example: new Date().toISOString() })
  time: string;
}
