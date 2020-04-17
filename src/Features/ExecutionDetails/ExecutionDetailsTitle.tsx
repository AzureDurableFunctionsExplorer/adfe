import React from 'react';
import { useStore } from '../../Stores/Core';
import { useObserver } from 'mobx-react-lite';
import { Typography, withStyles, WithStyles, createStyles } from '@material-ui/core';

type ExecutionDetailsTitleClasses = "root" | "title" | "time";

const ExecutionDetailsTitle = ({ classes }: WithStyles<ExecutionDetailsTitleClasses>) => {
  const executionStore = useStore("executions");

  return useObserver(() => (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>{executionStore.selectedExecution?.functionName}</Typography>
      <Typography variant="subtitle2" className={classes.time}>{executionStore.selectedExecution?.startTime}</Typography>
    </div>
  ));
}

export default withStyles(theme =>
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
      margin: "0 5px 1.5px 5px"
    }
  })
)(ExecutionDetailsTitle);