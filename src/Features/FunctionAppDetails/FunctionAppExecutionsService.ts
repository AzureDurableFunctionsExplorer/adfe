import { from } from "rxjs";
import { delay } from "rxjs/operators";
import MockOrchestrators from '../../assets/mocks/MockOrchestrators.json';
import { FunctionExecutionDto } from "../../Dtos/FunctionExecution.dto";

export class FunctionAppExecutionService {
  public static getFunctionAppExecutions(functionAppId: string): Promise<FunctionExecutionDto[]> {
    const executions = MockOrchestrators.map(mockItem => mockItem as unknown as FunctionExecutionDto);

    return from([executions])
      .pipe(
        delay(functionAppId === "9" ? 300000 : 2000)
      )
      .toPromise();
  }
}