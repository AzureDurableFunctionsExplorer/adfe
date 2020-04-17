import React from 'react';
import { withStyles, createStyles, WithStyles, Typography } from '@material-ui/core';
import { ReactComponent as AzureFunctionIcon } from "../../assets/images/azure-functions-icon.svg";
import { Closable } from '../../Core/Layouts/Closable';
import { useObserver } from 'mobx-react-lite';
import { useStore } from '../../Stores/Core';

interface FunctionAppDetailsHeaderProps {
  functionName: string
}

type FunctionAppDetailsHeaderClasses = 'container' | 'icon' | 'title';

const FunctionAppDetailsHeaderInner = ({ functionName, classes }: FunctionAppDetailsHeaderProps & WithStyles<FunctionAppDetailsHeaderClasses>) => {
  const functionAppsStore = useStore("functionApps");

  return useObserver(() =>
    <div>
      <Closable onClose={() => functionAppsStore.selectFunctionApp("")}>
        <div className={classes.container}>
          <AzureFunctionIcon className={classes.icon} />
          <Typography variant="h5" className={classes.title}>{functionName}</Typography>
        </div>
      </Closable>
    </div>
  );
}

export const FunctionAppDetailsHeader = withStyles(
  theme => createStyles({
    "container": {
      display: "flex",
      alignItems: "center",
      padding: "20px 5px 10px 20px",
      borderBottom: `1px solid ${theme.palette.primary.main}`
    },
    "icon": {
      minWidth: "50px",
      minHeight: "50px",
      marginRight: "10px"
    },
    "title": {

    }
  })
)(FunctionAppDetailsHeaderInner);