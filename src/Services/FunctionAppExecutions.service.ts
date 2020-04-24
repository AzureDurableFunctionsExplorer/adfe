import { from } from "rxjs";
import { delay } from "rxjs/operators";
import MockOrchestrators from '../assets/mocks/MockOrchestrators.json';
import { FunctionExecutionDto } from "../Dtos/FunctionExecution.dto";

class FunctionAppExecutionServiceClass {
  public getFunctionAppExecutions(functionAppId: string): Promise<FunctionExecutionDto[]> {
    const executions = MockOrchestrators.map(({ endTime, ...rest }) => ({
      ...rest,
      endTime: endTime ? Date.parse(endTime) : undefined
    }) as unknown as FunctionExecutionDto);

    return from([executions])
      .pipe(
        delay(functionAppId === "9" ? 300000 : 2000)
      )
      .toPromise();
  }
}

export const FunctionAppExecutionService = new FunctionAppExecutionServiceClass();