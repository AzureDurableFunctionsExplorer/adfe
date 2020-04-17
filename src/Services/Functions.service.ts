import { from } from 'rxjs';
import { delay } from 'rxjs/operators'
import { FunctionAppDto } from '../Dtos';
import MockApps from '../assets/mocks/MockApps.json';

export class FunctionsService {

  public static getAllFunctions(): Promise<FunctionAppDto[]> {
    const functionApps: FunctionAppDto[] = MockApps.map(mockApp => mockApp as FunctionAppDto);

    return from([functionApps])
      .pipe(
        delay(1000)
      )
      .toPromise();
  }
}