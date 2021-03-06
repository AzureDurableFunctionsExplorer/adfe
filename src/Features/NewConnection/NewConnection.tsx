import React, { useState } from 'react'
import { WithStyles, Typography, TextField, Button, withStyles, createStyles, Select, InputLabel, MenuItem, FormControl } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { SectionContainer } from '../../Core/Layouts/SectionContainer';
import { SectionHeader } from '../../Core/Layouts/SectionHeader';
import { useStore } from '../../Stores/Core';

type NewConnectionClassKeys = 'content' | 'message' | 'textInputField' | 'selectInputField' | 'addButton'

const NewConnectionInner = ({ classes }: WithStyles<NewConnectionClassKeys>) => {
  const [displayName, setDisplayName] = useState("");
  const [sasConnectionString, setSasConnectionString] = useState("");
  const [taskHubName, setTaskHubName] = useState("");

  const functionsStore = useStore("functionApps");

  return (
    <>
      <SectionHeader onClose={() => functionsStore.selectFunctionApp("")}>
        <Typography variant="h5">New Storage Connection</Typography>
      </SectionHeader>
      <SectionContainer>
        <div className={classes.content}>

          <TextField className={classes.textInputField} label="SAS Connection String" onChange={(e) => setSasConnectionString(e.target.value)} />
          <TextField className={classes.textInputField} label="Display Name" onChange={(e) => setDisplayName(e.target.value)} />

          <FormControl className={classes.selectInputField}>
            <InputLabel id="asd">Task Hub Name</InputLabel>
            <Select id="asd" value={taskHubName} onChange={(e) => setTaskHubName(e.target.value as string)}>
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
            </Select>
          </FormControl>

          <Button className={classes.addButton} startIcon={<AddIcon></AddIcon>}>ADD CONNECTION</Button>
        </div>
      </SectionContainer>
    </>
  )
}

export const NewConnection = withStyles(
  theme => createStyles({
    content: {
      padding: theme.spacing(0, 1.25),
      display: "flex",
      flexDirection: "column"
    },
    message: {
      padding: theme.spacing(0.625),
      fontWeight: "bold",
      marginBottom: theme.spacing(1.25),
      textAlign: "justify"
    },
    textInputField: {
      marginBottom: theme.spacing(2.5)
    },
    selectInputField: {
      marginTop: theme.spacing(5)
    },
    addButton: {
      alignSelf: "flex-end",
      fontWeight: "bold",
      color: theme.palette.secondary.dark,
      marginTop: theme.spacing(1.25)
    }
  })
)(NewConnectionInner);