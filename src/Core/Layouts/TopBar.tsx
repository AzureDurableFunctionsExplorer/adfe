import { AppBar, Typography, withStyles, createStyles, WithStyles } from "@material-ui/core"
import React, { Props } from "react"

type TopBarClassKeys = "root" | "text";

const TopBar = ({ classes }: WithStyles<TopBarClassKeys>) => {
  return (
    <AppBar className={classes.root}>
      <Typography className={classes.text} variant="h4">ADFE</Typography>
      <Typography className={classes.text} variant="subtitle1">Azure Durable Functions Explorer</Typography>
    </AppBar>
  )
}

export default withStyles(
  () =>
    createStyles({
      "root": {
        flexDirection: "row",
        padding: "10px"
      },
      "text": {
        marginLeft: "10px",
        alignSelf: "flex-end"
      }
    })
)(TopBar);