import React from 'react'
import AutorenewIcon from '@material-ui/icons/Autorenew';
import CheckIcon from '@material-ui/icons/Check';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';

export type ExecutionStatus = "active" | "done" | "waiting";

export interface ExecutionStatusIconProps {
  status: ExecutionStatus,
  selected: boolean,
  highlighted: boolean
}

type ExecutionStatusIconClasses = "icon" | "selected" | "highlighted" | "inProgress"

const ExecutionStatusIconInner = ({ status, highlighted, selected, classes }: ExecutionStatusIconProps & WithStyles<ExecutionStatusIconClasses>) => {
  switch (status) {
    case 'active':
      return <AutorenewIcon className={`${classes.icon} ${selected ? classes.selected : ""} ${highlighted ? classes.highlighted : ""} ${classes.inProgress}`} />
    case 'done':
      return <CheckIcon className={`${classes.icon} ${selected ? classes.selected : ""} ${highlighted ? classes.highlighted : ""}`} />
    case 'waiting':
      return <HourglassFullIcon className={classes.icon} />
    default:
      return null;
  }
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