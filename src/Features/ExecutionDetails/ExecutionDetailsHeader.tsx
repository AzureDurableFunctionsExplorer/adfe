import React from 'react';
import { useStore } from '../../Stores/Core';
import { useObserver } from 'mobx-react-lite';
import { Typography, withStyles, WithStyles, createStyles } from '@material-ui/core';
import { Closable } from '../../Core/Layouts/Closable';

type ExecutionDetailsTitleClasses = "root" | "title" | "time";

const ExecutionDetailsHeaderInner = ({ classes }: WithStyles<ExecutionDetailsTitleClasses>) => {
  const executionStore = useStore("executions");

  return useObserver(() => (
    <Closable onClose={() => executionStore.selectExecution("")}>
      <div className={classes.root}>
        <Typography variant="h5" className={classes.title}>{executionStore.selectedExecution?.functionName}</Typography>
        <Typography variant="subtitle2" className={classes.time}>{executionStore.selectedExecution?.startTime}</Typography>
      </div>
    </Closable>
  ));
}

export const ExecutionDetailsHeader = withStyles(theme =>
  createStyles({
    "root": {
      display: "flex",
      alignItems: "flex-end",
      height: "calc(100% - 20px)",
      padding: "10px 20px",
      borderBottom: `1px solid ${theme.palette.primary.main}`
    },
    "title": {},
    "time": {
      margin: "0 5px 2px 5px"
    }
  })
)(ExecutionDetailsHeaderInner);