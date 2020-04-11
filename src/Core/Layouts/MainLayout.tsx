import React, { useRef, useState, useEffect } from "react";
import TopBar from "../Components/TopBar";
import { withStyles, createStyles, WithStyles, Paper, Slide } from "@material-ui/core";
import FunctionsList from "../../Features/FunctionsList/FunctionsList";
import FunctionAppDetails from "../../Features/FunctionAppDetails/FunctionAppDetails";
import { useStore } from "../../Stores/Core";
import { useObserver } from "mobx-react-lite";

type MainLayoutClassKeys = "root" | "body" | "functionsList" | "functionDetails";

const MainLayout = ({ classes }: WithStyles<MainLayoutClassKeys>) => {

  const [topBarHeight, setTopBarHeight] = useState(0);
  const topBarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (topBarRef.current !== null) {
      setTopBarHeight(topBarRef.current.clientHeight);
    }
  }, []);

  const functionAppsStore = useStore("functionApps");

  return useObserver(() => (
    <div className={classes.root}>
      <TopBar ref={topBarRef}></TopBar>
      <div className={classes.body} style={{
        height: `calc(100vh - ${topBarHeight}px)`,
        marginTop: `${topBarHeight}px`
      }}>
        <Paper elevation={5} square className={classes.functionsList} >
          <FunctionsList></FunctionsList>
        </Paper>
        <Slide in={functionAppsStore.selectedFunctionApp !== null} direction="right">
          <Paper elevation={5} square className={classes.functionDetails}>
            <FunctionAppDetails></FunctionAppDetails>
          </Paper>
        </Slide>
      </div>
    </div >
  ))
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
        width: "20%",
        paddingTop: "10px",
        zIndex: 5
      },
      "functionDetails": {
        overflowY: "auto",
        width: "20%",
      }
    })
)(MainLayout);