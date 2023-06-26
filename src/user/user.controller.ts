import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Public } from '../decorators/public.decorator';
import { ParamsDto } from '../database/dto/params.dto';

@UseGuards(JwtAuthGuard)
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'User creation service for persisting user data in a database',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary:
      'Multiple users retrieval service for fetching all user data from a database',
  })
  findAll(@Query() params: ParamsDto) {
    return this.userService.findAll(params);
  }

  @Get(':userId')
  @ApiOperation({
    summary:
      'Single user retrieval service for fetching user data from a database',
  })
  findOne(@Param('userId') userId: string) {
    return this.userService.findOne(userId);
  }

  @Get(':userId/favoriteMovies')
  @ApiOperation({
    summary: `User's favorite movies retrieval service for fetching a user's list of favorite movies`,
  })
  findFavoriteMovies(
    @Param('userId') userId: string,
    @Query() params: ParamsDto,
  ) {
    return this.userService.findFavoriteMovies(params, userId);
  }

  @Public()
  @Get(':userId/notes')
  @ApiOperation({
    summary:
      'User notes retrieval service for fetching all notes associated with a specific user',
  })
  findNotes(@Query() params: ParamsDto, @Param('userId') userId: string) {
    return this.userService.findNotes(params, userId);
  }

  @Patch(':userId')
  @ApiOperation({
    summary:
      'User information update service for modifying and updating user data',
  })
  update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  @ApiOperation({
    summary: 'User deletion service for removing a user from the system',
  })
  remove(@Param('userId') userId: string) {
    return this.userService.remove(userId);
  }
}
