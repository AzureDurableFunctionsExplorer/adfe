import { Observable, from } from 'rxjs';
import { delay } from 'rxjs/operators'
import { FunctionAppDto } from '../../Dtos';

export class FunctionsService {

  public static getAllFunctions(): Observable<FunctionAppDto[]> {
    const elements: FunctionAppDto[][] = [];
    elements.push([]);
    for (let index = 0; index < 300; index++) {
      elements[0].push({
        id: `${index}`,
        name: `Cool Function ${index}`
      });
    }

    return from(elements)
      .pipe(
        delay(2000)
      );
  }
}