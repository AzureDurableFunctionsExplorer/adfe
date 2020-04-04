import React from "react";
import { useFunctions } from "./FunctionsHooks";
import { Skeleton } from '@material-ui/lab';


const FunctionsListLoader = ({ repeat }: { repeat?: number }) => {
  const dummyArray = Array.from(new Array(repeat || 1).keys());

  return (
    <>
      {
        dummyArray.map(i =>
          <div style={{ display: "flex", margin: "10px" }} key={i}>
            <Skeleton variant="circle" width={50} height={50} style={{ margin: "5px" }} />
            <Skeleton variant="text" height={50} style={{ flexGrow: 1, margin: "5px" }} />
          </div>
        )
      }
    </>
  )
}

const FunctionsList = () => {
  const functions: string[] | null = useFunctions();

  return (
    functions === null
      ? <FunctionsListLoader repeat={6}></FunctionsListLoader>
      : <ul> {functions.map(func => <li>{func}</li>)} </ul>
  )
};

export default FunctionsList;
