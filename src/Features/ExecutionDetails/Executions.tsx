import React from 'react'
import { withStyles, createStyles, WithStyles, Slide, Paper } from '@material-ui/core'
import { ExecutionDetailsHeader } from './ExecutionDetailsHeader';
import { ExecutionPartsList } from './ExecutionPartsList';
import { ExecutionPartDetails } from './ExecutionPartDetails';
import { useStore } from '../../Stores/Core';
import { useObserver } from 'mobx-react-lite';

type ExecutionsClasses = 'root' | 'executionTitle' | 'executionDetails' | 'executionPart';

const ExecutionsInner = ({ classes }: WithStyles<ExecutionsClasses>) => {

  const functionExecutionsStore = useStore("executions");
  const executionPartsStore = useStore("executionParts");

  return useObserver(() =>
    <div className={classes.root}>
      <Slide in={functionExecutionsStore.selectedExecutionId !== ""} direction="down">
        <div className={classes.executionTitle}>
          <ExecutionDetailsHeader></ExecutionDetailsHeader>
        </div>
      </Slide>
      <Slide in={functionExecutionsStore.selectedExecutionId !== ""} direction="right">
        <Paper elevation={5} square className={classes.executionDetails}>
          <ExecutionPartsList></ExecutionPartsList>
        </Paper>
      </Slide>
      <Slide in={executionPartsStore.selectedPartId !== ""} direction="right">
        <Paper elevation={5} square className={classes.executionPart}>
          <ExecutionPartDetails />
        </Paper>
      </Slide>
    </div>
  )
}

export const Executions = withStyles(
  theme => createStyles({
    root: {
      height: "100%",
      display: "grid",
      gridTemplateColumns: "40% auto",
      gridTemplateRows: "min-content auto",
      gridTemplateAreas: `
        "title title"
        "execution-details execution-part-details"
        `
    },
    executionTitle: {
      gridArea: "title",
      zIndex: 38
    },
    executionDetails: {
      gridArea: "execution-details",
      zIndex: 37
    },
    executionPart: {
      gridArea: "execution-part-details",
      zIndex: 36
    }
  })
)(ExecutionsInner);