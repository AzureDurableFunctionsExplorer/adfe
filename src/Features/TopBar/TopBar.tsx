import { AppBar, Typography, withStyles, createStyles, WithStyles } from "@material-ui/core"
import React from "react"
import { UserDetails } from "./UserDetails";

type TopBarClassKeys = "root" | "text" | "userDetails";

const TopBarInner = React.forwardRef(({ classes }: WithStyles<TopBarClassKeys>, ref) => {

  return (
    <AppBar className={classes.root} ref={ref}>
      <Typography className={classes.text} variant="h4">ADFE</Typography>
      <Typography className={classes.text} variant="subtitle1">Azure Durable Functions Explorer</Typography>
      <div className={classes.userDetails}>
        <UserDetails />
      </div>
    </AppBar>
  )
})

export const TopBar = withStyles(
  () =>
    createStyles({
      root: {
        flexDirection: "row",
        padding: "10px",
        maxHeight: "60px"
      },
      text: {
        marginLeft: "10px",
        alignSelf: "flex-end"
      },
      userDetails: {
        marginLeft: "auto"
      }
    })
)(TopBarInner);