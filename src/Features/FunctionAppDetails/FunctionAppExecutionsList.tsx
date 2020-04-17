import React from 'react'
import { useStore } from '../../Stores/Core';
import { useObserver } from 'mobx-react-lite';
import { Skeleton } from '@material-ui/lab';
import { FunctionAppExecution } from './FunctionAppExeuction';
import { FunctionExecutionModel } from '../../Models/FunctionExecution.model';

const FunctionAppExecutionsLoader = ({ repeat }: { repeat?: number }) => {

  const dummyArray = Array.from(new Array(repeat || 1).keys());

  return (
    <>
      {
        dummyArray.map(i =>
          <div style={{ display: "flex", margin: "5px 0", padding: "5px 15px", alignItems: "center", maxHeight: "45px" }} key={i}>
            <Skeleton variant="circle" width={20} height={20} />
            <div style={{ flexGrow: 1, margin: "0 15px", display: "flex", flexDirection: "column" }}>
              <Skeleton variant="text" height={24} />
              <Skeleton variant="text" height={17} width="50%" />
            </div>
            <Skeleton variant="circle" width={18} height={18} />
          </div>
        )
      }
    </>
  )
}

export const FunctionAppExecutionsList = () => {
  const executionsStore = useStore("executions");

  return useObserver(() => (
    executionsStore.isLoading
      ? <FunctionAppExecutionsLoader repeat={6} />
      :
      <div>
        {
          executionsStore.executions.map(
            execution =>
              <FunctionAppExecution
                key={execution.id}
                execution={execution}
                isSelected={execution.id === executionsStore.selectedExecutionId}
                executionSelected={(selectedExecution: FunctionExecutionModel) => executionsStore.selectExecution(selectedExecution.id)} />
          )
        }
      </div>
  ))
}