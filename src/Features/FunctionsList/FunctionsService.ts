import { Observable, from } from 'rxjs';
import { delay } from 'rxjs/operators'

export class FunctionsService {

  public static getAllFunctions(): Observable<string[]> {
    const elements: string[][] = [];
    elements.push([]);
    for (let index = 0; index < 300; index++) {
      elements[0].push(`Cool function number ${index}.`);
    }

    return from(elements)
      .pipe(
        delay(5000)
      );
  }
}