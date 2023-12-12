import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Game from './Game';

@Entity()
export default class Field {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ minimum: 1 })
  @Column()
  castle_coeff: number;

  @ApiProperty({ minimum: 1 })
  @Column()
  wall_coeff: number;

  @ApiProperty({ minimum: 1 })
  @Column()
  territory_coeff: number;

  @ApiProperty({ minimum: 1 })
  @Column()
  width: number;

  @ApiProperty({ minimum: 1 })
  @Column()
  height: number;

  @ApiProperty()
  @Column()
  ponds: string;

  @ApiProperty()
  @Column()
  castles: string;

  @ApiProperty()
  @Column()
  craftsmen: string;

  @OneToMany(() => Game, (game) => game.field)
  games: Game[];
}
