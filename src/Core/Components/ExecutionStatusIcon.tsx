import React from 'react'
import AutorenewIcon from '@material-ui/icons/Autorenew';
import CheckIcon from '@material-ui/icons/Check';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';

export interface ExecutionStatusIconProps {
  active: boolean,
  selected: boolean,
  highlighted: boolean
}

type ExecutionStatusIconClasses = "icon" | "selected" | "highlighted" | "inProgress"

const ExecutionStatusIconInner = ({ active, highlighted, selected, classes }: ExecutionStatusIconProps & WithStyles<ExecutionStatusIconClasses>) => {
  return (
    active
      ? <AutorenewIcon className={`${classes.icon} ${selected ? classes.selected : ""} ${highlighted ? classes.highlighted : ""} ${classes.inProgress}`} />
      : <CheckIcon className={`${classes.icon} ${selected ? classes.selected : ""} ${highlighted ? classes.highlighted : ""}`} />
  )
}

export const ExecutionStatusIcon = withStyles(theme =>
  createStyles({
    icon: {
      maxWidth: "20px",
      maxHeight: "20px",
      color: theme.palette.primary.dark
    },
    selected: {
      color: theme.palette.secondary.dark
    },
    highlighted: {
      color: theme.palette.secondary.main
    },
    inProgress: {
      WebkitAnimation: "$spin 2s linear infinite", /* Safari */
      animation: "$spin 2s linear infinite"
    },
    "@keyframes spin": {
      "0%": {
        transform: "rotate(0deg)"
      },
      "100%": {
        transform: "rotate(360deg)"
      }
    }
  })
)(ExecutionStatusIconInner)