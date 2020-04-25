import { ChildStore } from "./Core/ChildStore";
import { FunctionAppModel } from "../Models";
import { FunctionsService } from "../Services/Functions.service";
import { observable, action, computed } from "mobx";
import { UserService } from "../Services/User.service";
import { filter, switchMap, take } from "rxjs/operators";

export class FunctionAppsStore extends ChildStore {

  @observable isLoading: boolean = false;
  @observable functionApps: FunctionAppModel[] = [];
  @observable selectedFunctionAppId: string = "";

  @computed
  get selectedFunctionApp(): FunctionAppModel {
    return this.functionApps.find(func => func.id === this.selectedFunctionAppId)!;
  }

  async initialize() {
    this.isLoading = true;
    UserService.isLoggedIn
      .pipe(
        filter(isLoggedIn => isLoggedIn),
        switchMap(_ => FunctionsService.getAllFunctions()),
        take(1)
      )
      .subscribe(functionApps => {
        this.functionApps = functionApps;
        this.isLoading = false;
      });
  }

  @action
  selectFunctionApp(functionAppId: string) {
    this.selectedFunctionAppId = functionAppId;
  }
}