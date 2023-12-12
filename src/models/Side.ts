import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Game from './Game';

@Entity()
export default class Side {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column()
  side: string;

  @ApiProperty()
  @Column()
  team_name: string;

  @ApiProperty()
  @Column()
  team_id: number;

  @ManyToOne(() => Game, (game) => game.sides)
  game: Game;
}
