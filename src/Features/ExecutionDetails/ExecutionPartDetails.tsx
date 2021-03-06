import React from 'react'
import { Typography, withStyles, createStyles, WithStyles } from '@material-ui/core'
import { useStore } from '../../Stores/Core'
import { SectionHeader } from '../../Core/Layouts/SectionHeader';
import { useObserver } from 'mobx-react-lite';
import { ExecutionPartSmallField } from './ExecutionPartSmallField';
import { ExecutionPartLargeField } from './ExecutionPartLargeField';
import { SectionContainer } from '../../Core/Layouts/SectionContainer';

type ExecutionPartDetailsClasses = "root" | "title" | "detailsContainer" | "emptyRow";

const ExecutionPartDetailsInner = ({ classes }: WithStyles<ExecutionPartDetailsClasses>) => {
  const executionPartsStore = useStore("executionParts");

  const part = executionPartsStore.selectedPart;

  const endTimeString = part?.endTime
    ? `${part?.endTime?.toDateString()} ${part?.endTime?.toLocaleTimeString()}`
    : undefined;

  return useObserver(() =>
    <div className={classes.root}>
      <SectionHeader onClose={() => executionPartsStore.selectPart("")} borderless>
        <Typography className={classes.title} variant="h5">{executionPartsStore.selectedPart?.title}</Typography>
      </SectionHeader>
      <SectionContainer>
        <div className={classes.detailsContainer}>

          <ExecutionPartSmallField title="Execution Start" value={`${part?.startTime?.toDateString()} ${part?.startTime?.toLocaleTimeString()}`} />
          <ExecutionPartSmallField title="Execution End" value={endTimeString} />

          <div className={classes.emptyRow} />
          <div className={classes.emptyRow} />

          <ExecutionPartLargeField title="Input" value={JSON.stringify(part?.input, null, 4)} />
          <div className={classes.emptyRow} />
          <ExecutionPartLargeField title="Output" value={JSON.stringify(part?.output, null, 4)} />

        </div>
      </SectionContainer>
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
      padding: "0 15px",
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