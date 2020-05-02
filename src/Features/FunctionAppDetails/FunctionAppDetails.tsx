import React from 'react';
import { useStore } from "../../Stores/Core";
import { FunctionAppsStore } from '../../Stores/FunctionApps.store';
import { useObserver } from 'mobx-react-lite';
import { FunctionAppDetailsHeader } from './FunctionAppDetailsHeader';
import { FunctionAppExecutionsList } from './FunctionAppExecutionsList';
import { SectionContainer } from '../../Core/Layouts/SectionContainer';

export const FunctionAppDetails = () => {
  const functionAppsStore: FunctionAppsStore = useStore("functionApps");

  return useObserver(() => (
    <div>
      <FunctionAppDetailsHeader functionName={functionAppsStore.selectedFunctionApp?.name} />
      <SectionContainer>
        <FunctionAppExecutionsList />
      </SectionContainer>
    </div>
  ))
}