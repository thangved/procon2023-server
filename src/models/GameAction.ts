import { ApiProperty } from '@nestjs/swagger';
import Action from './Action';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import Game from './Game';

@Entity()
export default class GameAction {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column()
  turn: number;

  @ApiProperty()
  @Column()
  team_id: number;

  @ApiProperty()
  @OneToMany(() => Action, (action) => action.game_action, { eager: true })
  actions: Action[];

  @ManyToOne(() => Game, (game) => game.actions)
  game: Game;
}
