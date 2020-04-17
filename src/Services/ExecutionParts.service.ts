import MockExecutionParts from '../assets/mocks/MockExecutionParts.json'
import { ExecutionPartsDto } from '../Dtos/ExecutionPart.dto';
import { from } from 'rxjs';
import { delay } from 'rxjs/operators';

export class ExecutionPartsService {
  public static getExecutionParts(executionId: string): Promise<ExecutionPartsDto> {
    const foundParts: ExecutionPartsDto = MockExecutionParts.find(executionPart => executionPart.id === executionId) as unknown as ExecutionPartsDto;

    return from([foundParts])
      .pipe(
        delay(3000)
      )
      .toPromise()
  }
}