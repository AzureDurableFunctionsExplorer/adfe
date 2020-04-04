import React, { useRef, useState, useEffect } from "react";
import TopBar from "../Components/TopBar";
import { withStyles, createStyles, WithStyles, Paper } from "@material-ui/core";
import FunctionsList from "../../Features/FunctionsList/FunctionsList";

type MainLayoutClassKeys = "root" | "body" | "functionsList";

const MainLayout = ({ classes }: WithStyles<MainLayoutClassKeys>) => {

  const [topBarHeight, setTopBarHeight] = useState(0);
  const topBarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (topBarRef.current !== null) {
      setTopBarHeight(topBarRef.current.clientHeight);
    }
  }, []);

  return (
    <div className={classes.root}>
      <TopBar ref={topBarRef}></TopBar>
      <div className={classes.body} style={{
        height: `calc(100vh - ${topBarHeight}px)`,
        marginTop: `${topBarHeight}px`
      }}>
        <Paper elevation={5} square className={classes.functionsList}>
          <FunctionsList></FunctionsList>
        </Paper>
      </div>
    </div>
  )
}

export default withStyles(
  () =>
    createStyles({
      "root": {
        display: "flex"
      },
      "body": {
        width: "100%",
        display: "flex"
      },
      "functionsList": {
        overflowY: "auto",
        width: "25%"
      }
    })
)(MainLayout);