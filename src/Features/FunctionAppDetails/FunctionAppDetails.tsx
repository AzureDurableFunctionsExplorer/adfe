import React from 'react';
import { useStore } from "../../Stores/Core";
import { FunctionAppsStore } from '../../Stores/FunctionAppsStore';
import { useObserver } from 'mobx-react-lite';
import { FunctionAppDetailsHeader } from './FunctionAppDetailsHeader';
import { FunctionAppExecutionsList } from './FunctionAppExecutionsList';

export const FunctionAppDetails = () => {
  const functionAppsStore: FunctionAppsStore = useStore("functionApps");

  return useObserver(() => (
    <div>
      <FunctionAppDetailsHeader functionName={functionAppsStore.selectedFunctionApp?.name} />
      <div style={{ marginTop: "25px" }}>
        <FunctionAppExecutionsList />
      </div>
    </div>
  ))
}