import { useState, useEffect } from 'react'
import { FunctionsService } from './FunctionsService';

export function useFunctions(): string[] | null {
  const [isLoaded, setIsLoaded] = useState(false);
  const [functionsList, setFunctionsList] = useState(new Array<string>());

  useEffect(() => {

    const handleFunctionsList = (functions: string[]) => {
      setIsLoaded(true);
      setFunctionsList(functions)
    };

    const subscription = FunctionsService.getAllFunctions().subscribe(handleFunctionsList);
    return () => {
      subscription.unsubscribe();
    }
  });

  return isLoaded ? functionsList : null;
}