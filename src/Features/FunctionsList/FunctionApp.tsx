import React from "react";
import { FunctionAppModel } from "../../Models";
import { ReactComponent as AzureFunctionIcon } from "../../assets/images/azure-functions-icon.svg";
import { Typography, withStyles, createStyles, WithStyles } from "@material-ui/core";

interface FunctionAppProps {
  functionApp: FunctionAppModel,
  functionSelected: (functionApp: FunctionAppModel) => void;
}

type FunctionAppClassKeys = 'root' | 'icon' | 'title';

const FunctionApp = ({ functionApp, functionSelected, classes }: FunctionAppProps & WithStyles<FunctionAppClassKeys>) => {
  return (
    <div className={classes.root} onClick={(e) => functionSelected(functionApp)}>
      <AzureFunctionIcon className={classes.icon} />
      <Typography className={classes.title} variant="body1">{functionApp?.name}</Typography>
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