import React from 'react'
import { Paper, Slide, Typography, withStyles, createStyles, WithStyles } from '@material-ui/core';
import { useStore } from '../../Stores/Core';
import { SectionHeader } from '../../Core/Layouts/SectionHeader';
import { SectionContainer } from '../../Core/Layouts/SectionContainer';
import { useObserver } from 'mobx-react-lite';
import { Consts } from '../../Core/Consts/consts';

type NewConnectionHelpClasses = 'root';

const NewConnectionHelpInner = ({ classes }: WithStyles<NewConnectionHelpClasses>) => {
  const functionAppsStore = useStore("functionApps");

  return useObserver(() =>
    <Slide in={functionAppsStore.selectedFunctionAppId === Consts.newFunctionConnectionConst} direction="right">
      <Paper elevation={5} square className={classes.root}>
        <SectionHeader>
          <Typography variant="h5">New Connection Instructions</Typography>
        </SectionHeader>
        <SectionContainer>
          THIS IS A HELP SECTION: CORS, SAS String and Task Hub Name
        </SectionContainer>
      </Paper>
    </Slide>
  )
}

export const NewConnectionHelp = withStyles(
  theme => createStyles({
    root: {
      height: "100%"
    }
  })
)(NewConnectionHelpInner);