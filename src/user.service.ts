import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { forkJoin, from, lastValueFrom, map, Observable } from 'rxjs';

@Injectable()
export class UserService {
  private userInfo = {};
  constructor(private httpService: HttpService) {}

  getResultFromTwoRequest(id: number) {
    const userInfo = this.getEmailById(id);
    const userProfilePicture = this.getProfilePictureById(id);

    forkJoin([userInfo, userProfilePicture]).subscribe((results) => {
      results[0].image = results[1];
      this.userInfo = results[0];
    });
  }

  public getProfileInfo(id: number): Promise<[any, any]> {
    return Promise.all([
      this.getEmailById(id),
      this.getProfilePictureById(id),
    ]).then((result) => result);
  }

  private getEmailById(id: number): Promise<any> {
    return this.httpService
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .pipe(map((response: any) => response.data))
      .toPromise();
  }
  private getProfilePictureById(id: number): Promise<any> {
    return this.httpService
      .get(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .pipe(map((response: any) => response.data))
      .toPromise();
  }
}
