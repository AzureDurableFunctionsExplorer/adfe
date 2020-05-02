import { from } from "rxjs";
import { delay } from "rxjs/operators";
import MockOrchestrators from '../assets/mocks/MockOrchestrators.json';
import { FunctionExecutionDto } from "../Dtos/FunctionExecution.dto";
import storage, { TableService, ServiceResponse } from 'azure-storage';

class FunctionAppExecutionServiceClass {
  public getFunctionAppExecutions(functionAppId: string): Promise<FunctionExecutionDto[]> {

    const sasUrl = "https://adfetestapp.table.core.windows.net/?sv=2019-02-02&ss=t&srt=sco&sp=rwdlacu&se=2020-04-26T03:42:59Z&st=2020-04-25T19:42:59Z&spr=https,http&sig=j5uw3Rmqu48Vzwq6xIrGJzLnLdref2WWegtTpeNE4Eo%3D";
    const splitSasUrl: string[] = sasUrl.split("?");
    console.log("Parts: ", splitSasUrl);

    const service: TableService = storage.createTableServiceWithSas(splitSasUrl[0], `?${splitSasUrl[1]}`);
    // @ts-ignore
    service.setProxy({
      // @ts-ignore
      headers: new Map<any>()
    })
    service.proxy.headers["pragma"] = "no-cache";
    service.proxy.headers["cache-control"] = "no-cache";

    // @ts-ignore
    service.listTablesSegmented(undefined, {}, (error: Error, result: TableService.ListTablesResponse, response: ServiceResponse) => {
      console.log("ERROR: ", error);
      console.log("RESULT: ", result);
      console.log("RESPONSE: ", response);
    });


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