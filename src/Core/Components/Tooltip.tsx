import React from 'react'
import { withStyles, createStyles, Tooltip as MuiTooltip } from '@material-ui/core'

export const Tooltip = withStyles(
  theme => createStyles({
    tooltip: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      fontSize: "14px",
      fontWeight: "bold"
    },
    arrow: {
      color: theme.palette.primary.main
    }
  })
)(MuiTooltip)