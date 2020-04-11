import React from 'react';
import { useStore } from "../../Stores/Core";
import { FunctionAppsStore } from '../../Stores/FunctionAppsStore';
import { useObserver } from 'mobx-react-lite';

const FunctionAppDetails = () => {
  const functionAppsStore: FunctionAppsStore = useStore("functionApps");

  return useObserver(() => (
    <div>{functionAppsStore.selectedFunctionApp?.name}</div>
  ))
}

export default FunctionAppDetails;