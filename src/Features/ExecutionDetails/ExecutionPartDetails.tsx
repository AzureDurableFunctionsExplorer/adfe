import React from 'react'
import { Typography, withStyles, createStyles, WithStyles } from '@material-ui/core'
import { useStore } from '../../Stores/Core'
import { ClosableHeader } from '../../Core/Layouts/ClosableHeader';

type ExecutionPartDetailsClasses = "root" | "title";

const ExecutionPartDetailsInner = ({ classes }: WithStyles<ExecutionPartDetailsClasses>) => {
  const executionPartsStore = useStore("executionParts");

  return (
    <div className={classes.root}>
      <ClosableHeader onClose={() => executionPartsStore.selectPart("")}>
        <Typography className={classes.title} variant="h5">{executionPartsStore.selectedPart?.title}</Typography>
      </ClosableHeader>
    </div>
  )
}

export const ExecutionPartDetails = withStyles(
  theme => createStyles({
    root: {},
    title: {}
  })
)(ExecutionPartDetailsInner);