import React from 'react'
import { withStyles, createStyles, WithStyles, Typography } from '@material-ui/core';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import CheckIcon from '@material-ui/icons/Check';
import { FunctionExecutionModel } from '../../Models/FunctionExecution.model';

interface FunctionAppExecutionProps {
  execution: FunctionExecutionModel,
  isSelected: boolean,
  executionSelected: (execution: FunctionExecutionModel) => void
}

type FunctionAppExecutionClasses = 'root' | 'selected' | 'mainArea' | 'indicator' | 'title' | 'startTime' | 'status' | 'inProgress';

const FunctionAppExecution = ({ execution, isSelected, executionSelected, classes }: FunctionAppExecutionProps & WithStyles<FunctionAppExecutionClasses>) => (
  <div className={`${classes.root} ${isSelected ? classes.selected : ""}`} onClick={(e) => executionSelected(execution)}>
    <div className={classes.indicator} />
    <div className={classes.mainArea}>
      <Typography variant="body1" className={classes.title} >{execution.functionName}</Typography>
      <Typography variant="body2" className={classes.startTime} >{execution.startTime}</Typography>
    </div>
    {
      execution.isRunning
        ? <CheckIcon className={classes.status} />
        : <AutorenewIcon className={`${classes.status} ${classes.inProgress}`} />
    }
  </div>
)

export default withStyles(
  theme => createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      padding: "2px 15px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.secondary.main,
        "& $title": {
          color: theme.palette.secondary.main
        },
        "& $startTime": {
          color: theme.palette.secondary.main
        },
        "& $indicator": {
          backgroundColor: theme.palette.secondary.main
        },
        "& $status": {
          color: theme.palette.secondary.main
        }
      },
      "&$selected": {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.secondary.dark,
        "& $title": {
          color: theme.palette.secondary.dark
        },
        "& $startTime": {
          color: theme.palette.secondary.dark
        },
        "& $indicator": {
          backgroundColor: theme.palette.secondary.dark
        },
        "& $status": {
          color: theme.palette.secondary.dark
        }
      }
    },
    selected: {},
    mainArea: {
      flexGrow: 1,
      margin: "0 15px",
      display: "flex",
      flexDirection: "column"
    },
    indicator: {
      width: "20px",
      height: "20px",
      backgroundColor: theme.palette.primary.main,
      borderRadius: "50%"
    },
    title: {},
    startTime: {},
    status: {
      maxWidth: "20px",
      maxHeight: "20px",
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
    },
    /* Safari */
    "@-webkit-keyframes spin": {
      "0%": {
        "-webkit-transform": "rotate(0deg)"
      },
      "100%": {
        "-webkit-transform": "rotate(360deg)"
      }
    }
  })
)(FunctionAppExecution);