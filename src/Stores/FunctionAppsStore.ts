import { ChildStore } from "./Core/ChildStore";
import { FunctionAppModel } from "../Models";
import { FunctionsService } from "../Features/FunctionsList/FunctionsService";
import { observable } from "mobx";

export class FunctionAppsStore extends ChildStore {

  @observable isLoading: boolean = false;
  @observable functionApps: FunctionAppModel[] = [];

  async initialize() {
    this.isLoading = true;
    this.functionApps = await FunctionsService.getAllFunctions();
    this.isLoading = false;
  }
}