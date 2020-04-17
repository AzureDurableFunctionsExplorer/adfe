import React, { useRef, useState, useEffect } from "react";
import TopBar from "../Components/TopBar";
import { withStyles, createStyles, WithStyles, Paper, Slide } from "@material-ui/core";
import FunctionsList from "../../Features/FunctionsList/FunctionsList";
import FunctionAppDetails from "../../Features/FunctionAppDetails/FunctionAppDetails";
import { useStore } from "../../Stores/Core";
import { useObserver } from "mobx-react-lite";
import { ExecutionDetailsHeader } from "../../Features/ExecutionDetails/ExecutionDetailsHeader";
import ExecutionPartsList from "../../Features/ExecutionDetails/ExecutionPartsList";

type MainLayoutClassKeys = "root" | "body" | "functionsList" | "functionPanel" | "executionPanel" | "executionTitle" | "executionDetails";

const MainLayout = ({ classes }: WithStyles<MainLayoutClassKeys>) => {

  const [topBarHeight, setTopBarHeight] = useState(0);
  const topBarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (topBarRef.current !== null) {
      setTopBarHeight(topBarRef.current.clientHeight);
    }
  }, []);

  const functionAppsStore = useStore("functionApps");
  const functionExecutionsStore = useStore("executions");

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
        <Slide in={functionAppsStore.selectedFunctionAppId !== ""} direction="right">
          <Paper elevation={5} square className={classes.functionPanel}>
            <FunctionAppDetails></FunctionAppDetails>
          </Paper>
        </Slide>
        <div className={classes.executionPanel}>
          <Slide in={functionExecutionsStore.selectedExecutionId !== ""} direction="down">
            <div className={classes.executionTitle}>
              <ExecutionDetailsHeader></ExecutionDetailsHeader>
            </div>
          </Slide>
          <Slide in={functionExecutionsStore.selectedExecutionId !== ""} direction="right">
            <Paper elevation={5} square className={classes.executionDetails}>
              <ExecutionPartsList></ExecutionPartsList>
            </Paper>
          </Slide>
        </div>
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
        zIndex: 59
      },
      "functionPanel": {
        overflowY: "auto",
        width: "20%",
        zIndex: 49
      },
      "executionPanel": {
        display: "grid",
        gridTemplateColumns: "40% auto",
        gridTemplateRows: "6% auto",
        gridTemplateAreas: `
          "title title"
          "execution-details sub-execution-details"
          `,
        flexGrow: 1,
        zIndex: 39
      },
      "executionTitle": {
        gridArea: "title",
        zIndex: 38
      },
      "executionDetails": {
        gridArea: "execution-details",
        zIndex: 37
      }
    })
)(MainLayout);