import { ApiProperty } from '@nestjs/swagger';
import Field from './Field';
import Side from './Side';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import GameAction from './GameAction';

@Entity()
export default class Game {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ minimum: 1 })
  @Column()
  num_of_turns: number;

  @ApiProperty({ minimum: 3 })
  @Column()
  time_per_turn: number;

  @ApiProperty()
  @Column()
  start_time: string;

  @OneToMany(() => Side, (side) => side.game, { eager: true })
  @ApiProperty()
  sides: Side[];

  @ManyToOne(() => Field, (field) => field.games, { eager: true })
  // @ApiProperty()
  field: Field;

  @OneToMany(() => GameAction, (action) => action.game, { eager: true })
  actions: GameAction[];
}
