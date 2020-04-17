import { ChildStore } from "./Core/ChildStore";
import { FunctionAppModel } from "../Models";
import { FunctionsService } from "../Services/Functions.service";
import { observable, action, computed } from "mobx";

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
    this.functionApps = await FunctionsService.getAllFunctions();
    this.isLoading = false;
  }

  @action
  selectFunctionApp(functionAppId: string) {
    this.selectedFunctionAppId = functionAppId;
  }
}