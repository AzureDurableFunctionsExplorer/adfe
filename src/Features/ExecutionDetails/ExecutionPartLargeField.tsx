import React, { useState } from 'react'
import { withStyles, createStyles, WithStyles, Zoom, Typography, Paper } from '@material-ui/core';
import { Tooltip } from '../../Core/Components/Tooltip';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import DoneIcon from '@material-ui/icons/Done';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

export interface ExecutionPartLargeFieldProps {
  title: string,
  value: string
}

type ExecutionPartLargeFieldClasses = "titleContainer" | "titleText" | "copyIcon" | "fieldContainer";

const ExecutionPartLargeFieldInner = ({ title, value, classes }: ExecutionPartLargeFieldProps & WithStyles<ExecutionPartLargeFieldClasses>) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyValue = () => {
    navigator.clipboard.writeText(value);
    setIsCopied(true);

    interval(2000).pipe(take(1)).subscribe(_ => setIsCopied(false));
  }

  return (
    <>
      <div className={classes.titleContainer}>
        <Typography variant="h6" className={classes.titleText}>{title}</Typography>
        <Tooltip title={`${isCopied ? "Copied!" : "Copy"}`} arrow placement="left" TransitionComponent={Zoom}>
          <div>
            {
              isCopied
                ? <DoneIcon className={classes.copyIcon}></DoneIcon>
                : <FilterNoneIcon className={classes.copyIcon} onClick={(e) => copyValue()}></FilterNoneIcon>
            }
          </div>
        </Tooltip>
      </div>
      <Paper className={classes.fieldContainer} square>
        <pre style={{ overflowX: "hidden" }}>{value}</pre>
      </Paper>
    </>
  )
}

export const ExecutionPartLargeField = withStyles(
  theme => createStyles({
    titleContainer: {
      display: "flex",
      alignItems: "flex-start",
      fontWeight: "bold",
      padding: "1em 0",
      "& $titleText": {
        marginTop: "5px"
      }
    },
    titleText: {
      fontWeight: "bold",
      flexGrow: 1,
      marginTop: "5px"
    },
    copyIcon: {
      color: theme.palette.primary.dark,
      cursor: "pointer",
      "&:hover": {
        color: theme.palette.primary.main
      }
    },
    fieldContainer: {
      minHeight: "200px",
      maxHeight: "200px",
      padding: "0 10px",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      overflowY: "auto"
    }
  })
)(ExecutionPartLargeFieldInner)