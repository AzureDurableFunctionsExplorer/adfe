import { ChildStore } from "./Core";
import { observable, action, computed } from "mobx";
import { FunctionAppExecutionService } from "../Features/FunctionAppDetails/FunctionAppExecutionsService";
import { FunctionExecutionModel } from "../Models/FunctionExecution.model";
import { toStream } from "mobx-utils";
import { from } from "rxjs";
import { tap, switchMap, map } from "rxjs/operators";
import { FunctionExecutionDto } from "../Dtos/FunctionExecution.dto";
import { toObservable } from "../Core/Utils/MobxUtils";

export class FunctionExecutionsStore extends ChildStore {
  @observable isLoading: boolean = false;
  @observable executions: FunctionExecutionModel[] = [];
  @observable selectedExecutionId: string = "";

  @computed
  get selectedExecution(): FunctionExecutionModel {
    return this.executions.find(execution => execution.id === this.selectedExecutionId)!;
  }

  initialize() {
    // The following line is broken in strict mode due to mobx-utils toStream and rxjs from combination.
    // @ts-ignore
    toObservable(() => this.root.functionApps.selectedFunctionAppId)
      .pipe(
        tap(_ => this.isLoading = true),
        tap(_ => this.selectedExecutionId = ""),
        switchMap((functionId: string) => FunctionAppExecutionService.getFunctionAppExecutions(functionId)),
        map((executionDtos: FunctionExecutionDto[]) => executionDtos.map(({ endTime, ...rest }) => ({ ...rest, isRunning: !endTime })))
      )
      .subscribe((executionModels: FunctionExecutionModel[]) => {
        this.executions = executionModels;
        this.isLoading = false;
      });
  }

  @action
  selectExecution(executionId: string) {
    this.selectedExecutionId = executionId;
  }
}