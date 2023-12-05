import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateActionDto } from 'src/dtos/CreateActionDto';
import Game from 'src/models/Game';
import GameAction from 'src/models/GameAction';
import GameStatus from 'src/models/GameStatus';
import GetTime from 'src/models/GetTime';
import { PlayerService } from './player.service';

@Controller('player')
@ApiTags('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get('games')
  @ApiResponse({ status: 200, type: Game, isArray: true })
  async getAll(): Promise<Game[]> {
    return await this.playerService.getAllGames();
  }

  @Get('games/:id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: Game })
  async getById(@Param('id') id: string): Promise<Game> {
    return await this.playerService.getById(+id);
  }

  @Get('games/:id/actions')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: GameAction, isArray: true })
  async getActionsByGameId(@Param('id') id: string): Promise<GameAction[]> {
    return await this.playerService.getActionsByGameId(+id);
  }

  @Get('games/:id/status')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: GameStatus })
  async getGameStatusById(@Param('id') id: string): Promise<GameStatus> {
    return this.playerService.getGameStatus(+id);
  }

  @Post('games/:id/actions')
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: CreateActionDto })
  @ApiResponse({ status: 200, type: GameStatus })
  async createGameAction(
    @Param('id') id: string,
    @Body() body: CreateActionDto,
  ): Promise<GameStatus> {
    return await this.playerService.createGameAction(+id, body);
  }

  @Get('time')
  @ApiResponse({ status: 200, type: GetTime })
  async getTime(): Promise<GetTime> {
    return this.playerService.getTime();
  }
}
