import { ChildStore } from "./Core";
import { toObservable } from "../Core/Utils/MobxUtils";
import { observable, computed, action } from "mobx";
import { ExecutionPartsModel } from "../Models/ExecutionPart.model";
import { switchMap, tap, map, filter } from "rxjs/operators";
import { ExecutionPartsService } from "../Services/ExecutionParts.service";
import { ExecutionPartsDto } from "../Dtos/ExecutionPart.dto";

export class ExecutionPartsStore extends ChildStore {

  @observable isLoading: boolean = false;
  @observable executionParts: ExecutionPartsModel | null = null;
  @observable selectedPartId: string = "";

  @computed
  get selectedPart(): ExecutionPartsModel | null {
    if (!this.executionParts || !this.selectedPartId) {
      return null;
    }

    return this.findExecutionPart(this.executionParts, this.selectedPartId);
  }

  initialize() {
    toObservable(() => this.root.executions.selectedExecutionId)
      .pipe(
        filter(executionId => !executionId)
      )
      .subscribe(() => this.selectPart(""))

    toObservable(() => this.root.executions.selectedExecutionId)
      .pipe(
        filter(executionId => !!executionId),
        tap(_ => this.isLoading = true),
        switchMap(executionId => ExecutionPartsService.getExecutionParts(executionId)),
        map(executionPartsDto => this.convertToModel(executionPartsDto))
      )
      .subscribe(executionPartsModel => {
        this.executionParts = executionPartsModel;
        this.isLoading = false;
      });
  }

  @action
  selectPart(partId: string) {
    this.selectedPartId = partId;
  }

  private convertToModel({ startTime, endTime, children, ...rest }: ExecutionPartsDto): ExecutionPartsModel {
    return {
      ...rest,
      startTime: startTime ? new Date(startTime) : undefined,
      endTime: endTime ? new Date(endTime) : undefined,
      children: children?.map(child => this.convertToModel(child))
    }
  }

  private findExecutionPart(executionPart: ExecutionPartsModel, idToFind: string): ExecutionPartsModel | null {
    if (executionPart.id === idToFind) {
      return executionPart;
    }

    for (const child of executionPart.children) {
      const foundInChildren = this.findExecutionPart(child, idToFind);
      if (foundInChildren) {
        return foundInChildren;
      }
    }

    return null;
  }
}