import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateActionDto } from 'src/dtos/CreateActionDto';
import Action from 'src/models/Action';
import Field from 'src/models/Field';
import Game from 'src/models/Game';
import GameAction from 'src/models/GameAction';
import GameStatus from 'src/models/GameStatus';
import GetTime from 'src/models/GetTime';
import Side from 'src/models/Side';
import { Repository } from 'typeorm';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Field)
    private readonly fieldRepository: Repository<Field>,
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(Side)
    private readonly sideRepository: Repository<Side>,
    @InjectRepository(GameAction)
    private readonly gameActionRepository: Repository<GameAction>,
    @InjectRepository(Action)
    private readonly actionRepository: Repository<Action>,
  ) {}

  async getAllGames(): Promise<Game[]> {
    return this.gameRepository.find();
  }

  async getGameById(id: number): Promise<Game> {
    const game = await this.gameRepository.findOne({ where: { id } });

    if (!game) {
      throw new NotFoundException('Game not found');
    }
    return game;
  }

  async getActionsByGameId(gameId: number): Promise<GameAction[]> {
    const game = await this.getGameById(gameId);

    return game.actions;
  }

  async getGameStatus(gameId: number): Promise<GameStatus> {
    const game = await this.getGameById(gameId);
    const now = new Date().getTime();
    const start = new Date(game.start_time).getTime();

    const cur_turn =
      Math.floor((now - start) / (game.time_per_turn * 1000)) + 1;

    if (cur_turn > game.num_of_turns) {
      throw new HttpException('Game has ended', 400);
    }

    if (cur_turn < 0) {
      throw new HttpException('Game has not started', 400);
    }

    const max_turn = game.num_of_turns;
    const remaining =
      Math.round(((now - start) % (game.time_per_turn * 1000)) / 1000) ||
      game.time_per_turn;

    return {
      cur_turn,
      max_turn,
      remaining,
    };
  }

  async createGameAction(
    gameId: number,
    body: CreateActionDto,
  ): Promise<GameStatus> {
    const status = await this.getGameStatus(gameId);
    const game = await this.getGameById(gameId);

    if (status.cur_turn >= body.turn) {
      throw new HttpException('Invalid turn', 400);
    }

    const gameAction = this.gameActionRepository.create({
      game,
      turn: body.turn,
      team_id: body.turn % 2,
    });
    await this.gameActionRepository.save(gameAction);

    for (const act of body.actions) {
      const action = this.actionRepository.create({
        action: act.action,
        action_param: act.action_param,
        craftsman_id: act.craftsman_id,
        game_action: gameAction,
      });

      await this.actionRepository.save(action);
    }

    return await this.getGameStatus(gameId);
  }

  async randomGame(): Promise<Game> {
    const width = Math.floor(Math.random() * 10) + 10;
    const height = Math.floor(Math.random() * 10) + 10;
    const num_of_turns = Math.floor(Math.random() * 50) * 2;
    const time_per_turn = Math.floor(Math.random() * 3) + 1;
    const start_time = new Date(Date.now() + 20_000).toISOString(); // 20 seconds from now
    const num_of_craftsmen = Math.floor(Math.random() * 5) + 3;
    const num_of_castles = Math.floor(Math.random() * 2) + 3;
    const num_of_ponds = Math.floor(Math.random() * 5) + 3;

    const field = this.fieldRepository.create({
      width,
      height,
      name: Math.random().toString(36).substring(2, 9),
      castle_coeff: 20,
      territory_coeff: 5,
      wall_coeff: 1,
      craftsmen: '',
      castles: '',
      ponds: '',
    });

    const craftsmen = [];
    for (let i = 0; i < num_of_craftsmen; i++) {
      craftsmen.push({
        id: Math.random().toString(36).substring(2, 9),
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
        side: 'A',
      });

      craftsmen.push({
        id: Math.random().toString(36).substring(2, 9),
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
        side: 'B',
      });
    }
    field.craftsmen = JSON.stringify(craftsmen);

    const castles = [];
    for (let i = 0; i < num_of_castles; i++) {
      castles.push({
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
      });
    }
    field.castles = JSON.stringify(castles);

    const ponds = [];
    for (let i = 0; i < num_of_ponds; i++) {
      ponds.push({
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
      });
    }
    field.ponds = JSON.stringify(ponds);

    await this.fieldRepository.save(field);

    const game = this.gameRepository.create({
      num_of_turns,
      time_per_turn,
      start_time,
      field,
      name: Math.random().toString(36).substring(2, 9),
    });

    await this.gameRepository.save(game);

    const sideA = this.sideRepository.create({
      game,
      side: 'A',
      team_id: 0,
      team_name: 'Team A',
    });

    const sideB = this.sideRepository.create({
      game,
      side: 'B',
      team_id: 1,
      team_name: 'Team B',
    });

    await this.sideRepository.save(sideA);
    await this.sideRepository.save(sideB);

    return game;
  }

  getTime(): GetTime {
    return {
      time: new Date().toISOString(),
    };
  }
}
