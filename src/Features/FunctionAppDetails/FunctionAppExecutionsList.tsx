import React from 'react'
import { useStore } from '../../Stores/Core';
import { useObserver } from 'mobx-react-lite';
import { Skeleton } from '@material-ui/lab';
import FunctionAppExecution from './FunctionAppExeuction';

const FunctionAppExecutionsLoader = ({ repeat }: { repeat?: number }) => {

  const dummyArray = Array.from(new Array(repeat || 1).keys());

  return (
    <>
      {
        dummyArray.map(i =>
          <div style={{ display: "flex", margin: "5px 0", padding: "0 15px", alignItems: "center" }} key={i}>
            <Skeleton variant="circle" width={20} height={20} />
            <div style={{ flexGrow: 1, margin: "0 15px", display: "flex", flexDirection: "column" }}>
              <Skeleton variant="text" height={30} />
              <Skeleton variant="text" height={16} width="60%" />
            </div>
            <Skeleton variant="circle" width={15} height={15} />
          </div>
        )
      }
    </>
  )
}

const FunctionAppExecutionsList = () => {
  const executionsStore = useStore("executions");

  return useObserver(() => (
    executionsStore.isLoading
      ? <FunctionAppExecutionsLoader repeat={6} />
      :
      <div>
        {
          executionsStore.executions.map(
            exec => <FunctionAppExecution execution={exec} />
          )
        }
      </div>
  ))
}

export default FunctionAppExecutionsList;