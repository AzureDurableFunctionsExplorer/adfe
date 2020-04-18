import React, { PropsWithChildren } from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { WithStyles, withStyles, createStyles } from '@material-ui/core';

export interface ClosableProps {
  onClose: () => void;
}

type ClosableHeaderClasses = "root" | "closeIcon" | "childrenContainer";

const ClosableHeaderInner = ({ classes, children, onClose }: PropsWithChildren<ClosableProps> & WithStyles<ClosableHeaderClasses>) => {
  return (
    <div className={classes.root}>
      <ArrowBackIcon className={classes.closeIcon} onClick={() => onClose()}></ArrowBackIcon>
      <div className={classes.childrenContainer}>
        {children}
      </div>
    </div>
  );
}

export const ClosableHeader = withStyles(
  theme => createStyles({
    root: {
      display: "flex",
      borderBottom: "1px solid " + theme.palette.primary.main,
      padding: "20px 10px 10px 10px"
    },
    closeIcon: {
      color: theme.palette.primary.main,
      cursor: "pointer",
      marginRight: "20px"
    },
    childrenContainer: {
      flexGrow: 1
    }
  })
)(ClosableHeaderInner);