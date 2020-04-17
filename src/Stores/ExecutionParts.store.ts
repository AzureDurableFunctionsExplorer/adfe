import { ChildStore } from "./Core";
import { toObservable } from "../Core/Utils/MobxUtils";
import { observable } from "mobx";
import { ExecutionPartsModel } from "../Models/ExecutionPart.model";
import { switchMap, tap } from "rxjs/operators";
import { ExecutionPartsService } from "../Services/ExecutionParts.service";

export class ExecutionPartsStore extends ChildStore {

  @observable executionParts: ExecutionPartsModel | null = null;

  initialize() {
    toObservable(() => this.root.executions.selectedExecutionId)
      .pipe(
        tap(executionId => console.log("Execution: ", executionId)),
        switchMap(executionId => ExecutionPartsService.getExecutionParts(executionId))
      )
      .subscribe(parts => console.log("PARTS: ", parts))
  }
}