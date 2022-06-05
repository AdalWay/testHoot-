/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { User } from './user.entity';
import { UserService } from './user.service';

enum PromiseStatus {
  Fullfilled = "fulfilled",
  Rejected = "rejected",
};

@Controller('users')
export class AppController {
  private user: User = {};
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUserProfile(@Res() res: Response, @Query('userId', ParseIntPipe) userId: number ): Promise<Response<User>>{
   
    const response: any = await this.userService.getProfileInfo(userId);
    
    const emailResponseStatus = response[0].status;
    const UrlPictureResponseStatus = response[1].status;

    const isResponseStatusFullfilled: boolean = (emailResponseStatus == PromiseStatus.Fullfilled && UrlPictureResponseStatus == PromiseStatus.Fullfilled) ? true : false;

    if (isResponseStatusFullfilled) {
      
      this.user.email = response[0].value.email;
      this.user.urlPicture =  response[1].value.url;

      return res.status(HttpStatus.OK).json(this.user);
    }
    

    else throw new HttpException('Something went wrong... I will figure it out when I wake up.', HttpStatus.BAD_REQUEST);
  }
}
