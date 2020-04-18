import React from 'react'
import { WithStyles, withStyles, createStyles, Typography } from '@material-ui/core';

export interface ExecutionPartSmallFieldProps {
  title: string,
  value?: string
}

type ExecutionPartSmallFieldClasses = "emptyRow" | "fieldTitle";

const ExecutionPartSmallFieldInner = ({ title, value, classes }: ExecutionPartSmallFieldProps & WithStyles<ExecutionPartSmallFieldClasses>) => {
  return (
    !value
      ? <div className={classes.emptyRow} />
      :
      <>
        <Typography className={classes.fieldTitle} variant="h6">{title}</Typography>
        <Typography variant="h6">{value}</Typography>
      </>
  );
}

export const ExecutionPartSmallField = withStyles(
  theme => createStyles({
    fieldTitle: {
      fontWeight: "bold",
      flexGrow: 1
    },
    emptyRow: {
      height: "16px",
      gridColumn: "1 / span 2"
    }
  })
)(ExecutionPartSmallFieldInner)