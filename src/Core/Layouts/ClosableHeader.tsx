import React, { PropsWithChildren } from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { WithStyles, withStyles, createStyles } from '@material-ui/core';

export interface ClosableProps {
  onClose: () => void;
  borderless?: boolean;
}

type ClosableHeaderClasses = "root" | "border" | "closeIcon" | "childrenContainer";

const ClosableHeaderInner = ({ classes, children, onClose, borderless }: PropsWithChildren<ClosableProps> & WithStyles<ClosableHeaderClasses>) => {
  return (
    <div className={`${classes.root} ${borderless ? "" : classes.border}`}>
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
      padding: "20px 10px 10px 10px"
    },
    border: {
      borderBottom: "1px solid " + theme.palette.primary.main,
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