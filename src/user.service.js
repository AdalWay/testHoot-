"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var rxjs_1 = require("rxjs");
var UserService = /** @class */ (function () {
    function UserService(httpService) {
        this.httpService = httpService;
        this.userInfo = {};
    }
    // getResultFromTwoRequest(id: number) {
    //   const userInfo = this.getEmailById(id);
    //   const userProfilePicture = this.getProfilePictureById(id);
    //   forkJoin([userInfo, userProfilePicture]).subscribe((results) => {
    //     results[0].image = results[1];
    //     this.userInfo = results[0];
    //   });
    // }
    UserService.prototype.getProfileInfo = function (id) {
        return Promise.allSettled([
            this.getEmailById(id),
            this.getProfilePictureById(id),
        ]).then(function (result) { return result; }, function (err) { return err; });
    };
    UserService.prototype.getEmailById = function (id) {
        return this.httpService
            .get("https://jsonplaceholder.typicode.com/users/".concat(id))
            .pipe((0, rxjs_1.map)(function (response) { return response.data; }))
            .toPromise();
    };
    UserService.prototype.getProfilePictureById = function (id) {
        return this.httpService
            .get("https://jsonplaceholder.typicode.com/photos/".concat(id))
            .pipe((0, rxjs_1.map)(function (response) { return response.data; }))
            .toPromise();
    };
    UserService = __decorate([
        (0, common_1.Injectable)()
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
