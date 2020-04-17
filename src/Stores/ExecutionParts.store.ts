import { ChildStore } from "./Core";
import { toObservable } from "../Core/Utils/MobxUtils";
import { observable } from "mobx";
import { ExecutionPartsModel } from "../Models/ExecutionPart.model";
import { switchMap, tap, map } from "rxjs/operators";
import { ExecutionPartsService } from "../Services/ExecutionParts.service";
import { ExecutionPartsDto } from "../Dtos/ExecutionPart.dto";

export class ExecutionPartsStore extends ChildStore {

  @observable isLoading: boolean = false;
  @observable executionParts: ExecutionPartsModel | null = null;

  initialize() {
    toObservable(() => this.root.executions.selectedExecutionId)
      .pipe(
        tap(_ => this.isLoading = true),
        switchMap(executionId => ExecutionPartsService.getExecutionParts(executionId)),
        map(executionPartsDto => this.convertToModel(executionPartsDto))
      )
      .subscribe(executionPartsModel => {
        console.log("MODELS: ", executionPartsModel);
        this.executionParts = executionPartsModel;
        this.isLoading = false;
      });
  }

  private convertToModel({ startTime, endTime, children, ...rest }: ExecutionPartsDto): ExecutionPartsModel {
    return {
      ...rest,
      startTime: startTime ? new Date(startTime) : undefined,
      endTime: endTime ? new Date(endTime) : undefined,
      children: children?.map(child => this.convertToModel(child))
    }
  }
}