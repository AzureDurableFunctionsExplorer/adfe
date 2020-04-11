import { from } from "rxjs";
import { delay } from "rxjs/operators";
import MockOrchestrators from '../../assets/mocks/MockOrchestrators.json';

export class FunctionAppExecutionService {
  public static getFunctionAppExecutions(functionAppId: string): Promise<string[]> {
    const executions = MockOrchestrators.map(orchestrator => `${orchestrator.functionName} (${functionAppId})`);

    return from([executions])
      .pipe(
        delay(2000)
      )
      .toPromise();
  }
}