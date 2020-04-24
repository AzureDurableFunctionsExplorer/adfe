import { ChildStore } from "./Core";
import { action, observable } from "mobx";
import { UserModel } from "../Models/User.model";
import { UserService } from "../Services/User.service";
import { filter, switchMap, tap } from "rxjs/operators";

export class UserStore extends ChildStore {

  @observable
  loggedInUser: UserModel | undefined;

  @observable
  isLoggedIn: boolean = false;

  initialize() {
    UserService.isLoggedIn
      .pipe(
        switchMap(isLoggedIn => isLoggedIn ? this.getUser(false) : Promise.resolve(undefined)),
        tap(userModel => this.loggedInUser = userModel),
        tap(userModel => this.isLoggedIn = !!userModel),
        filter(userModel => !!userModel),
        switchMap(_ => this.getUser(true))
      )
      .subscribe(userModel => this.loggedInUser = userModel);
  }

  @action
  login(): void {
    UserService.login();
  }

  @action
  logout(): void {
    UserService.logout();
  }

  private async getUser(includePicture: boolean): Promise<UserModel | undefined> {
    const userInfoDto = UserService.getUserInfo();
    if (userInfoDto) {
      const userModel: UserModel = {
        displayName: userInfoDto.displayName,
        email: userInfoDto.userName,
      }

      if (includePicture) {
        const imageBlob = await UserService.getUserImage();
        userModel.imageUrl = URL.createObjectURL(imageBlob);
      }

      return userModel;
    }
  }
}