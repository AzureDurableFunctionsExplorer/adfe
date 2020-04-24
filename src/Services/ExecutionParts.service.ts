import MockExecutionParts from '../assets/mocks/MockExecutionParts.json'
import { ExecutionPartsDto } from '../Dtos/ExecutionPart.dto';
import { from } from 'rxjs';
import { delay } from 'rxjs/operators';

class ExecutionPartsServiceClass {
  public getExecutionParts(executionId: string): Promise<ExecutionPartsDto> {
    const foundParts: ExecutionPartsDto = MockExecutionParts.find(executionPart => executionPart.id === executionId) as unknown as ExecutionPartsDto;

    return from([foundParts])
      .pipe(
        delay(2000)
      )
      .toPromise()
  }
}

export const ExecutionPartsService = new ExecutionPartsServiceClass();