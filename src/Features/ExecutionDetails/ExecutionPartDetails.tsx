import React from 'react'
import { Typography, withStyles, createStyles, WithStyles, Paper } from '@material-ui/core'
import { useStore } from '../../Stores/Core'
import { ClosableHeader } from '../../Core/Layouts/ClosableHeader';
import { useObserver } from 'mobx-react-lite';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import { Tooltip } from '../../Core/Components/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { ExecutionPartSmallField } from './ExecutionPartSmallField';
import { ExecutionPartLargeField } from './ExecutionPartLargeField';

type ExecutionPartDetailsClasses = "root" | "title" | "detailsContainer" | "emptyRow";

const ExecutionPartDetailsInner = ({ classes }: WithStyles<ExecutionPartDetailsClasses>) => {
  const executionPartsStore = useStore("executionParts");

  const part = executionPartsStore.selectedPart;

  const endTimeString = part?.endTime
    ? `${part?.endTime?.toDateString()} ${part?.endTime?.toLocaleTimeString()}`
    : undefined;

  return useObserver(() =>
    <div className={classes.root}>
      <ClosableHeader onClose={() => executionPartsStore.selectPart("")} borderless>
        <Typography className={classes.title} variant="h5">{executionPartsStore.selectedPart?.title}</Typography>
      </ClosableHeader>
      <div className={classes.detailsContainer}>

        <ExecutionPartSmallField title="Execution Start" value={`${part?.startTime?.toDateString()} ${part?.startTime?.toLocaleTimeString()}`} />
        <ExecutionPartSmallField title="Execution End" value={endTimeString} />

        <div className={classes.emptyRow} />
        <div className={classes.emptyRow} />

        <ExecutionPartLargeField title="Input" value={JSON.stringify(part?.input, null, 4)} />
        <div className={classes.emptyRow} />
        <ExecutionPartLargeField title="Output" value={JSON.stringify(part?.output, null, 4)} />

      </div>
    </div>
  )
}

export const ExecutionPartDetails = withStyles(
  theme => createStyles({
    root: {
      display: "flex",
      flexDirection: "column"
    },
    title: {},
    detailsContainer: {
      padding: "15px",
      display: "grid",
      gridTemplateColumns: "30% auto",
      gridTemplateRows: "auto",
      gridGap: "10px"
    },
    emptyRow: {
      height: "16px",
      gridColumn: "1 / span 2"
    }
  })
)(ExecutionPartDetailsInner);