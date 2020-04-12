import { ChildStore } from "./Core";
import { observe, observable, action } from "mobx";
import { FunctionAppExecutionService } from "../Features/FunctionAppDetails/FunctionAppExecutionsService";
import { FunctionExecutionModel } from "../Models/FunctionExecution.model";

export class FunctionExecutionsStore extends ChildStore {
  @observable isLoading: boolean = false;
  @observable executions: FunctionExecutionModel[] = [];
  @observable selectedExecutionId: string = "";

  initialize() {
    observe(
      this.root.functionApps,
      "selectedFunctionAppId",
      async change => {
        this.isLoading = true;
        const executionDtos = await FunctionAppExecutionService.getFunctionAppExecutions(change.newValue);
        this.executions = executionDtos.map(({ endTime, ...rest }) => {
          console.log("Item: ", rest, endTime);
          return {
            ...rest,
            isRunning: !endTime
          }
        })
        console.log(this.executions);
        this.isLoading = false;
      });
  }

  @action
  selectExecution(executionId: string) {
    this.selectedExecutionId = executionId;
  }
}