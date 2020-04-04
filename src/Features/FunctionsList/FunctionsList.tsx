import React from "react";
import { Paper } from "@material-ui/core";

const FunctionsList = () => {
  const elements: JSX.Element[] = [];
  for (let index = 0; index < 300; index++) {
    elements.push(<li key={index}>{"Number is " + index}</li>);
  }

  return (
    <ul>
      {elements}
    </ul>
  )
};

export default FunctionsList;
