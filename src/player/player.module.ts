import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Action from 'src/models/Action';
import Field from 'src/models/Field';
import Game from 'src/models/Game';
import GameAction from 'src/models/GameAction';
import Side from 'src/models/Side';

@Module({
  controllers: [PlayerController],
  providers: [PlayerService],
  imports: [TypeOrmModule.forFeature([Action, Field, Game, GameAction, Side])],
})
export class PlayerModule {}
