import React from "react";
import { Skeleton } from '@material-ui/lab';
import { FunctionApp } from "./FunctionApp";
import { useStore } from "../../Stores/Core";
import { useObserver } from "mobx-react-lite";
import { SectionHeader } from "../../Core/Layouts/SectionHeader";
import { SectionContainer } from "../../Core/Layouts/SectionContainer";
import { Typography, withStyles, createStyles, WithStyles } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { Consts } from "../../Core/Consts/consts";

const FunctionsListLoader = ({ repeat }: { repeat?: number }) => {
  const dummyArray = Array.from(new Array(repeat || 1).keys());

  return (
    <>
      {
        dummyArray.map(i =>
          <div style={{ display: "flex", padding: "0 10px", alignItems: "center" }} key={i}>
            <Skeleton variant="circle" width={30} height={30} />
            <Skeleton variant="text" height={30} style={{ flexGrow: 1, margin: "5px" }} />
          </div>
        )
      }
    </>
  )
}

type FunctionsListClasses = 'headerRoot' | 'title' | 'addIcon';

const FunctionsListInner = ({ classes }: WithStyles<FunctionsListClasses>) => {
  const functionsStore = useStore("functionApps");

  const setFunctionToNew = () => {
    functionsStore.selectFunctionApp(Consts.newFunctionConnectionConst);
  }

  return useObserver(() => (
    <>
      <SectionHeader>
        <div className={classes.headerRoot}>
          <Typography className={classes.title} variant="h5">Function Connections</Typography>
          <AddIcon className={classes.addIcon} onClick={(e) => setFunctionToNew()}></AddIcon>
        </div>
      </SectionHeader>
      <SectionContainer>
        {
          functionsStore.isLoading
            ? <FunctionsListLoader repeat={6} />
            : <div> {functionsStore.functionApps.map(func =>
              <FunctionApp
                key={func.id}
                functionApp={func}
                isSelected={func.id === functionsStore.selectedFunctionApp?.id}
                functionSelected={(functionApp) => { functionsStore.selectFunctionApp(functionApp.id) }} />
            )}</div>
        }
      </SectionContainer>
    </>
  ))
};

export const FunctionsList = withStyles(
  theme => createStyles({
    headerRoot: {
      display: "flex"
    },
    title: {
      flexGrow: 1
    },
    addIcon: {
      cursor: "pointer"
    }
  })
)(FunctionsListInner);