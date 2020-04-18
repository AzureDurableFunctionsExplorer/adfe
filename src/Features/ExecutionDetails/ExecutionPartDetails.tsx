import React from 'react'
import { Typography, withStyles, createStyles, WithStyles } from '@material-ui/core'
import { useStore } from '../../Stores/Core'
import { ClosableHeader } from '../../Core/Layouts/ClosableHeader';
import { useObserver } from 'mobx-react-lite';

type ExecutionPartDetailsClasses = "root" | "title" | "detailsContainer" | "fieldTitle" | "fieldContainer";

const ExecutionPartDetailsInner = ({ classes }: WithStyles<ExecutionPartDetailsClasses>) => {
  const executionPartsStore = useStore("executionParts");

  const part = executionPartsStore.selectedPart;

  return useObserver(() =>
    <div className={classes.root}>
      <ClosableHeader onClose={() => executionPartsStore.selectPart("")} borderless>
        <Typography className={classes.title} variant="h5">{executionPartsStore.selectedPart?.title}</Typography>
      </ClosableHeader>
      <div className={classes.detailsContainer}>
        <Typography className={classes.fieldTitle} variant="h6">Execution Start</Typography>
        <Typography variant="h6">{`${part?.startTime?.toDateString()} ${part?.startTime?.toLocaleTimeString()}`}</Typography>
        {
          !part?.endTime
            ? null
            :
            <>
              <Typography className={classes.fieldTitle} variant="h6">Execution End</Typography>
              <Typography variant="h6">{`${part?.endTime?.toDateString()} ${part?.endTime?.toLocaleTimeString()}`}</Typography>
            </>
        }
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
      gridGap: "5px"
    },
    fieldTitle: {
      fontWeight: "bold"
    },
    fieldContainer: {}
  })
)(ExecutionPartDetailsInner);