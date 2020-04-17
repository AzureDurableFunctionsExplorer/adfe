import React, { PropsWithChildren } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { WithStyles, withStyles, createStyles } from '@material-ui/core';

export interface ClosableProps {
  onClose: () => void;
}

type ClosableClasses = "root" | "closeIcon";

const ClosableInner = ({ classes, children, onClose }: PropsWithChildren<ClosableProps> & WithStyles<ClosableClasses>) => {
  return (
    <div className={classes.root}>
      {children}
      <CloseIcon className={classes.closeIcon} onClick={() => onClose()}></CloseIcon>
    </div>
  );
}

export const Closable = withStyles(() =>
  createStyles({
    "root": {
      position: "relative"
    },
    "closeIcon": {
      position: "absolute",
      top: "5px",
      right: "5px",
      cursor: "pointer",
      "&:hover": {
        color: "red"
      }
    }
  })
)(ClosableInner);