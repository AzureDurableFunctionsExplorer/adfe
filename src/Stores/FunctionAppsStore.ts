import { ChildStore } from "./Core/ChildStore";
import { FunctionAppModel } from "../Models";
import { FunctionsService } from "../Features/FunctionsList/FunctionsService";
import { observable, action } from "mobx";

export class FunctionAppsStore extends ChildStore {

  @observable isLoading: boolean = false;
  @observable functionApps: FunctionAppModel[] = [];
  @observable selectedFunctionApp: FunctionAppModel | null = null;

  async initialize() {
    this.isLoading = true;
    this.functionApps = await FunctionsService.getAllFunctions();
    this.isLoading = false;
  }

  @action
  selectFunctionApp(functionApp: FunctionAppModel) {
    this.selectedFunctionApp = functionApp;
  }
}