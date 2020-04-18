import React from 'react';
import { withStyles, createStyles, WithStyles, Typography } from '@material-ui/core';
import { ReactComponent as AzureFunctionIcon } from "../../assets/images/azure-functions-icon.svg";
import { ClosableHeader } from '../../Core/Layouts/ClosableHeader';
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
      <ClosableHeader onClose={() => functionAppsStore.selectFunctionApp("")}>
        <div className={classes.container}>
          <Typography variant="h5" className={classes.title}>{functionName}</Typography>
          <AzureFunctionIcon className={classes.icon} />
        </div>
      </ClosableHeader>
    </div>
  );
}

export const FunctionAppDetailsHeader = withStyles(
  theme => createStyles({
    "container": {
      display: "flex",
      alignItems: "flex-start"
    },
    "icon": {
      minWidth: "24px",
      minHeight: "24px",
      marginRight: "10px"
    },
    "title": {
      flexGrow: 1
    }
  })
)(FunctionAppDetailsHeaderInner);