import { Module } from '@nestjs/common';
import { PlayerModule } from './player/player.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import Action from './models/Action';
import Field from './models/Field';
import Game from './models/Game';
import GameAction from './models/GameAction';
import Side from './models/Side';

@Module({
  imports: [
    PlayerModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      synchronize: true,
      database: 'db.sqlite',
      entities: [Action, Field, Game, GameAction, Side],
    }),
  ],
})
export class AppModule {}
