import React, { useState } from 'react'
import { withStyles, createStyles, WithStyles, Typography } from '@material-ui/core';
import { FunctionExecutionModel } from '../../Models/FunctionExecution.model';
import { ExecutionStatusIcon } from '../../Core/Components/ExecutionStatusIcon';

interface FunctionAppExecutionProps {
  execution: FunctionExecutionModel,
  isSelected: boolean,
  executionSelected: (execution: FunctionExecutionModel) => void
}

type FunctionAppExecutionClasses = 'root' | 'selected' | 'mainArea' | 'indicator' | 'title' | 'startTime';

const FunctionAppExecutionInner = ({ execution, isSelected, executionSelected, classes }: FunctionAppExecutionProps & WithStyles<FunctionAppExecutionClasses>) => {
  const [isPointerOver, setIsPointerOver] = useState(false);

  return (
    <div
      className={`${classes.root} ${isSelected ? classes.selected : ""}`}
      onClick={(e) => executionSelected(execution)}
      onPointerOver={() => setIsPointerOver(true)}
      onPointerLeave={() => setIsPointerOver(false)}>
      <div className={classes.indicator} />
      <div className={classes.mainArea}>
        <Typography variant="body1" className={classes.title} >{execution.functionName}</Typography>
        <Typography variant="body2" className={classes.startTime} >{execution.startTime}</Typography>
      </div>
      <ExecutionStatusIcon active={execution.isRunning} selected={isSelected} highlighted={isPointerOver} />
    </div>
  )
}

export const FunctionAppExecution = withStyles(
  theme => createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      padding: "7px 15px",
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
    }
  })
)(FunctionAppExecutionInner);