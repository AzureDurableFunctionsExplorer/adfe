import React from "react";
import { FunctionAppModel } from "../../Models";
import { ReactComponent as AzureFunctionIcon } from "../../assets/images/azure-functions-icon.svg";
import { Typography, withStyles, createStyles, WithStyles } from "@material-ui/core";

interface FunctionAppProps {
  functionApp: FunctionAppModel
}

type FunctionAppClassKeys = 'root' | 'icon' | 'title';

const FunctionApp = (props: FunctionAppProps & WithStyles<FunctionAppClassKeys>) => {
  return (
    <div className={props.classes.root}>
      <AzureFunctionIcon className={props.classes.icon} />
      <Typography className={props.classes.title} variant="body1">{props.functionApp?.name}</Typography>
    </div>
  );
}

export default withStyles(theme =>
  createStyles({
    "root": {
      height: "40px",
      padding: "0 10px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
      "&:hover $title": {
        color: theme.palette.secondary.main
      }
    },
    "icon": {
      height: "calc(100% - 10px)"
    },
    "title": {
      color: theme.palette.primary.main,
      fontWeight: "bold",
      margin: "5px"
    }
  })
)(FunctionApp);