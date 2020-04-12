import { ChildStore } from "./Core";
import { observe, observable } from "mobx";
import { FunctionAppExecutionService } from "../Features/FunctionAppDetails/FunctionAppExecutionsService";
import { FunctionExecutionModel } from "../Models/FunctionExecution.model";

export class FunctionExecutionsStore extends ChildStore {
  @observable isLoading: boolean = false;
  @observable executions: FunctionExecutionModel[] = [];

  initialize() {
    observe(
      this.root.functionApps,
      "selectedFunctionAppId",
      async change => {
        this.isLoading = true;
        this.executions = await FunctionAppExecutionService.getFunctionAppExecutions(change.newValue);
        this.isLoading = false;
      });
  }
}