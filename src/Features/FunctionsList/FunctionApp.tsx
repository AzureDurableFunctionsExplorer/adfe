import React from "react";
import { FunctionAppModel } from "../../Models";
import { ReactComponent as AzureFunctionIcon } from "../../assets/images/azure-functions-icon.svg";
import { Typography, withStyles, createStyles, WithStyles } from "@material-ui/core";

interface FunctionAppProps {
  functionApp: FunctionAppModel,
  isSelected: boolean,
  functionSelected: (functionApp: FunctionAppModel) => void;
}

type FunctionAppClassKeys = 'root' | 'icon' | 'title' | 'selected';

const FunctionAppInner = ({ functionApp, isSelected, functionSelected, classes }: FunctionAppProps & WithStyles<FunctionAppClassKeys>) => {
  return (
    <div className={`${classes.root} ${isSelected ? classes.selected : ""}`} onClick={(e) => functionSelected(functionApp)}>
      <AzureFunctionIcon className={classes.icon} />
      <Typography className={classes.title} variant="body1">{functionApp?.name}</Typography>
    </div>
  );
}

export const FunctionApp = withStyles(theme =>
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
        "& $title": {
          color: theme.palette.secondary.main
        }
      },
      "&$selected": {
        backgroundColor: theme.palette.primary.dark,
        "& $title": {
          color: theme.palette.secondary.dark
        }
      }
    },
    "selected": {},
    "icon": {
      height: "calc(100% - 10px)"
    },
    "title": {
      margin: "5px"
    }
  })
)(FunctionAppInner);