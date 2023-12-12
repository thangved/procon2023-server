import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import GameAction from './GameAction';

export type ActionTypes = 'STAY' | 'MOVE' | 'BUILD' | 'DESTROY';
export type ActionParams =
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

@Entity()
export default class Action {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column()
  action: ActionTypes;

  @ApiProperty()
  @Column()
  action_param?: ActionParams;

  @ApiProperty({ uniqueItems: true })
  @Column()
  craftsman_id: string;

  @ManyToOne(() => GameAction, (game_action) => game_action.actions)
  game_action: GameAction;
}
