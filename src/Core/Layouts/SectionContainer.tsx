import React, { PropsWithChildren } from 'react'
import { withStyles, WithStyles, createStyles } from '@material-ui/core';

type SectionContainerClasses = 'root';

const SectionContainerInner = ({ children, classes }: PropsWithChildren<{}> & WithStyles<SectionContainerClasses>) => (
  <div className={classes.root}>{children}</div>
)

export const SectionContainer = withStyles(
  theme => createStyles({
    root: {
      paddingTop: theme.spacing(1.25)
    }
  })
)(SectionContainerInner);