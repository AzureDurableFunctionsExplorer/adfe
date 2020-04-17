import React from "react";
import { Skeleton } from '@material-ui/lab';
import { FunctionApp } from "./FunctionApp";
import { useStore } from "../../Stores/Core";
import { useObserver } from "mobx-react-lite";

const FunctionsListLoader = ({ repeat }: { repeat?: number }) => {
  const dummyArray = Array.from(new Array(repeat || 1).keys());

  return (
    <>
      {
        dummyArray.map(i =>
          <div style={{ display: "flex", padding: "0 10px", alignItems: "center" }} key={i}>
            <Skeleton variant="circle" width={30} height={30} />
            <Skeleton variant="text" height={30} style={{ flexGrow: 1, margin: "5px" }} />
          </div>
        )
      }
    </>
  )
}

export const FunctionsList = () => {
  const functionsStore = useStore("functionApps");

  return useObserver(() => (
    functionsStore.isLoading
      ? <FunctionsListLoader repeat={6} />
      : <div> {functionsStore.functionApps.map(func =>
        <FunctionApp
          key={func.id}
          functionApp={func}
          isSelected={func.id === functionsStore.selectedFunctionApp?.id}
          functionSelected={(functionApp) => { functionsStore.selectFunctionApp(functionApp.id) }} />
      )}</div>
  ))
};
