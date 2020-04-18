import React from 'react'
import { withStyles, createStyles, WithStyles, Zoom, Typography, Paper } from '@material-ui/core';
import { Tooltip } from '../../Core/Components/Tooltip';
import FilterNoneIcon from '@material-ui/icons/FilterNone';

export interface ExecutionPartLargeFieldProps {
  title: string,
  value: string
}

type ExecutionPartLargeFieldClasses = "titleContainer" | "titleText" | "copyIcon" | "fieldContainer";

const ExecutionPartLargeFieldInner = ({ title, value, classes }: ExecutionPartLargeFieldProps & WithStyles<ExecutionPartLargeFieldClasses>) => {
  return (
    <>
      <div className={classes.titleContainer}>
        <Typography variant="h6" className={classes.titleText}>{title}</Typography>
        <Tooltip title="Copy" arrow placement="left" TransitionComponent={Zoom}>
          <div>
            <FilterNoneIcon className={classes.copyIcon}></FilterNoneIcon>
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