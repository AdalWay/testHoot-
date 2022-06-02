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

  @Get()
  async getUserProfile(@Query('userId', ParseIntPipe) userId: number): Promise<UserProfileDto> {
    console.log
    const response = await this.userService.getProfileInfo(userId);

    const userProfile : UserProfileDto = {
      email: response[0].email,
      urlPicture: response[1].url,
    };
    //NOTE: Nestjs return 200 an implicit 200 if the request is succesfull
    if ( Object.keys(userProfile).length > 0 ) return userProfile;
    else throw new HttpException('Theres is an error', HttpStatus.BAD_REQUEST);
  }
}
