import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateActionDto } from 'src/dtos/CreateActionDto';
import Game from 'src/models/Game';
import GameAction from 'src/models/GameAction';
import GameStatus from 'src/models/GameStatus';
import GetTime from 'src/models/GetTime';

@Injectable()
export class PlayerService {
  private readonly games: Game[];
  private readonly actions: GameAction[];

  constructor() {
    this.games = [
      {
        field: {
          castle_coeff: 20,
          castles: JSON.stringify([
            {
              x: 1,
              y: 6,
            },
            {
              x: 13,
              y: 5,
            },
            {
              x: 10,
              y: 17,
            },
            {
              x: 8,
              y: 2,
            },
            {
              x: 7,
              y: 14,
            },
          ]),
          craftsmen: JSON.stringify([
            {
              x: 18,
              y: 16,
              id: '0',
              side: 'A',
            },
            {
              x: 4,
              y: 5,
              id: '1',
              side: 'A',
            },
            {
              x: 12,
              y: 5,
              id: '2',
              side: 'A',
            },
            {
              x: 13,
              y: 10,
              id: '3',
              side: 'A',
            },
            {
              x: 5,
              y: 8,
              id: '4',
              side: 'A',
            },
            {
              x: 8,
              y: 8,
              id: '5',
              side: 'B',
            },
            {
              x: 17,
              y: 12,
              id: '6',
              side: 'B',
            },
            {
              x: 11,
              y: 2,
              id: '7',
              side: 'B',
            },
            {
              x: 14,
              y: 6,
              id: '8',
              side: 'B',
            },
            {
              x: 3,
              y: 12,
              id: '9',
              side: 'B',
            },
          ]),
          height: 20,
          id: 0,
          match_id: 0,
          name: 'Random Field',
          ponds: JSON.stringify([
            {
              x: 18,
              y: 15,
            },
            {
              x: 6,
              y: 11,
            },
            {
              x: 11,
              y: 16,
            },
            {
              x: 12,
              y: 13,
            },
            {
              x: 14,
              y: 12,
            },
          ]),
          territory_coeff: 5,
          wall_coeff: 1,
          width: 20,
        },
        field_id: 0,
        id: 0,
        name: 'Random Game',
        num_of_turns: 100,
        sides: [
          {
            game_id: 0,
            id: 0,
            side: 'A',
            team_id: 0,
            team_name: 'A',
          },
          {
            game_id: 0,
            id: 1,
            side: 'B',
            team_id: 1,
            team_name: 'B',
          },
        ],
        start_time: new Date(new Date().getTime() + 20000).toISOString(),
        time_per_turn: 3,
      },
    ];
    this.actions = [];
  }

  async getAllGames(): Promise<Game[]> {
    return this.games;
  }

  async getById(id: number): Promise<Game> {
    const game = this.games.find((game) => game.id === id);
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    return game;
  }

  async getActionsByGameId(gameId: number): Promise<GameAction[]> {
    return this.actions.filter((action) => action.game_id === gameId);
  }

  async getGameStatus(gameId: number): Promise<GameStatus> {
    const game = await this.getById(gameId);
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
    const remaining = Math.round(
      ((now - start) % (game.time_per_turn * 1000)) / 1000,
    );

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

    if (status.cur_turn >= body.turn) {
      throw new HttpException('Invalid turn', 400);
    }

    this.actions.push({
      actions: body.actions.map((action) => ({
        ...action,
        action_id: this.actions.length,
        id: 0,
      })),
      created_time: new Date().toISOString(),
      game_id: gameId,
      id: this.actions.length,
      team_id: 0,
      turn: body.turn,
    });

    return await this.getGameStatus(gameId);
  }

  getTime(): GetTime {
    return {
      time: new Date().toISOString(),
    };
  }
}
