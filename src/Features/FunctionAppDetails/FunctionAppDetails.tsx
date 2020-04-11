import React from 'react';
import { useStore } from "../../Stores/Core";
import { FunctionAppsStore } from '../../Stores/FunctionAppsStore';
import { useObserver } from 'mobx-react-lite';
import FunctionAppDetailsHeader from './FunctionAppDetailsHeader';

const FunctionAppDetails = () => {
  const functionAppsStore: FunctionAppsStore = useStore("functionApps");

  return useObserver(() => (
    functionAppsStore.selectedFunctionApp !== null
      ? <FunctionAppDetailsHeader functionName={functionAppsStore.selectedFunctionApp.name} />
      : null
  ))
}

export default FunctionAppDetails;