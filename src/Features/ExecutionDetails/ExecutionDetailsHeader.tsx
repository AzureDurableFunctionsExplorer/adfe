import React from 'react';
import { useStore } from '../../Stores/Core';
import { useObserver } from 'mobx-react-lite';
import { Typography, withStyles, WithStyles, createStyles } from '@material-ui/core';
import { ClosableHeader } from '../../Core/Layouts/ClosableHeader';

type ExecutionDetailsTitleClasses = "root" | "title" | "time";

const ExecutionDetailsHeaderInner = ({ classes }: WithStyles<ExecutionDetailsTitleClasses>) => {
  const executionStore = useStore("executions");

  return useObserver(() => (
    <ClosableHeader onClose={() => executionStore.selectExecution("")}>
      <div className={classes.root}>
        <Typography variant="h5" className={classes.title}>{executionStore.selectedExecution?.functionName}</Typography>
        <Typography variant="subtitle2" className={classes.time}>{executionStore.selectedExecution?.startTime}</Typography>
      </div>
    </ClosableHeader>
  ));
}

export const ExecutionDetailsHeader = withStyles(theme =>
  createStyles({
    "root": {
      display: "flex",
      alignItems: "flex-end"
    },
    "title": {},
    "time": {
      margin: "0 5px 2px 5px"
    }
  })
)(ExecutionDetailsHeaderInner);