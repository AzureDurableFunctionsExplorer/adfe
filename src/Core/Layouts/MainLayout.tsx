import React, { useRef, useState, useEffect } from "react";
import { TopBar } from "../../Features/TopBar/TopBar";
import { withStyles, createStyles, WithStyles, Paper, Slide } from "@material-ui/core";
import { FunctionsList } from "../../Features/FunctionsList/FunctionsList";
import { FunctionAppDetails } from "../../Features/FunctionAppDetails/FunctionAppDetails";
import { useStore } from "../../Stores/Core";
import { useObserver } from "mobx-react-lite";
import { ExecutionDetailsHeader } from "../../Features/ExecutionDetails/ExecutionDetailsHeader";
import { ExecutionPartsList } from "../../Features/ExecutionDetails/ExecutionPartsList";
import { ExecutionPartDetails } from "../../Features/ExecutionDetails/ExecutionPartDetails";
import AzureAD from "react-aad-msal";
import { authProvider } from "../Auth/AuthProvider";

type MainLayoutClassKeys = "root" | "body" | "functionsList" | "functionPanel" | "executionPanel" | "executionTitle" | "executionDetails" | "executionPart";

const MainLayoutInner = ({ classes }: WithStyles<MainLayoutClassKeys>) => {

  const [topBarHeight, setTopBarHeight] = useState(0);
  const topBarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (topBarRef.current !== null) {
      setTopBarHeight(topBarRef.current.clientHeight);
    }
  }, []);

  const functionAppsStore = useStore("functionApps");
  const functionExecutionsStore = useStore("executions");
  const executionPartsStore = useStore("executionParts");

  return useObserver(() => (
    <div className={classes.root}>
      <TopBar ref={topBarRef} />
      <AzureAD provider={authProvider}>
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
            <Slide in={executionPartsStore.selectedPartId !== ""} direction="right">
              <Paper elevation={5} square className={classes.executionPart}>
                <ExecutionPartDetails />
              </Paper>
            </Slide>
          </div>
        </div>
      </AzureAD>
    </div >
  ))
}

export const MainLayout = withStyles(
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
        gridTemplateRows: "min-content auto",
        gridTemplateAreas: `
          "title title"
          "execution-details execution-part-details"
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
      },
      "executionPart": {
        gridArea: "execution-part-details",
        zIndex: 36
      }
    })
)(MainLayoutInner);