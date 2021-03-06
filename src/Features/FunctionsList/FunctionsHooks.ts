import { useState, useEffect } from 'react'
import { FunctionsService } from '../../Services/Functions.service';
import { FunctionAppDto } from '../../Dtos';
import { FunctionAppModel } from '../../Models';

export function useFunctions(): FunctionAppModel[] | null {
  const [isLoaded, setIsLoaded] = useState(false);
  const [functionsList, setFunctionsList] = useState(new Array<FunctionAppModel>());

  useEffect(() => {

    const handleFunctionsList = (functions: FunctionAppDto[]) => {
      setIsLoaded(true);
      setFunctionsList(functions)
    };

    FunctionsService.getAllFunctions().then(handleFunctionsList);
  }, []);

  return isLoaded ? functionsList : null;
}