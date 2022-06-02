/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UserProfileDto } from './user.profileDto';
import { UserService } from './user.service';

@Controller('users')
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserProfile(@Query(userId: string, )@Param('id', ParseIntPipe) id: number) :Promise<UserProfileDto> {
    const response = await this.userService.getProfileInfo(id);

    const userProfile : UserProfileDto = {
      email: response[0].email,
      urlPicture: response[1].url,
    };
    //NOTE: Nestjs return 200 an implicit 200 if the request is succesfull
    if ( Object.keys(userProfile).length > 0 ) return userProfile;
    else throw new HttpException('Theres is an error', HttpStatus.BAD_REQUEST);
  }
}
