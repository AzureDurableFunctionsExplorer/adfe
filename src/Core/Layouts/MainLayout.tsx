import React, { useRef, useState, useEffect } from "react";
import { TopBar } from "../../Features/TopBar/TopBar";
import { withStyles, createStyles, WithStyles, Paper, Slide } from "@material-ui/core";
import { FunctionsList } from "../../Features/FunctionsList/FunctionsList";
import { FunctionAppDetails } from "../../Features/FunctionAppDetails/FunctionAppDetails";
import { useStore } from "../../Stores/Core";
import { useObserver } from "mobx-react-lite";
import AzureAD from "react-aad-msal";
import { authProvider } from "../Auth/AuthProvider";
import { Consts } from "../Consts/consts";
import { NewConnection } from "../../Features/FunctionsList/NewConnection";
import { Executions } from "../../Features/ExecutionDetails/Executions";

type MainLayoutClassKeys = "root" | "body" | "firstLevelContainer" | "secondLevelContainer" | "thirdLevelContainer";

const MainLayoutInner = ({ classes }: WithStyles<MainLayoutClassKeys>) => {

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
      <TopBar ref={topBarRef} />
      <AzureAD provider={authProvider}>
        <div className={classes.body} style={{
          height: `calc(100vh - ${topBarHeight}px)`,
          marginTop: `${topBarHeight}px`
        }}>
          <Paper elevation={5} square className={classes.firstLevelContainer} >
            <FunctionsList></FunctionsList>
          </Paper>
          <Slide in={functionAppsStore.selectedFunctionAppId !== ""} direction="right">
            <Paper elevation={5} square className={classes.secondLevelContainer}>
              {
                functionAppsStore.selectedFunctionAppId !== Consts.newFunctionConnectionConst
                  ? <FunctionAppDetails></FunctionAppDetails>
                  : <NewConnection></NewConnection>
              }
            </Paper>
          </Slide>
          <div className={classes.thirdLevelContainer}>
            <Executions />
          </div>
        </div>
      </AzureAD>
    </div >
  ))
}

export const MainLayout = withStyles(
  () =>
    createStyles({
      root: {
        display: "flex"
      },
      body: {
        width: "100%",
        display: "flex"
      },
      firstLevelContainer: {
        overflowY: "auto",
        width: "20%",
        zIndex: 59
      },
      secondLevelContainer: {
        overflowY: "auto",
        width: "20%",
        zIndex: 49
      },
      thirdLevelContainer: {
        flexGrow: 1,
        zIndex: 39
      }
    })
)(MainLayoutInner);