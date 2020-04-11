import { from } from "rxjs";
import { delay } from "rxjs/operators";

export class FunctionAppExecutionService {
  public static getFunctionAppExecutions(functionAppId: string): Promise<string[]> {
    const executions: string[] = ["EXEC 1_" + functionAppId, "EXEC 2_" + functionAppId, "EXEC 3_" + functionAppId];

    return from([executions])
      .pipe(
        delay(2000)
      )
      .toPromise();
  }
}