import { ApiProperty } from '@nestjs/swagger';

export default class BaseModel {
  @ApiProperty({ uniqueItems: true })
  id: number;
}
