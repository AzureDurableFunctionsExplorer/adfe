import React, { useState } from 'react'
import { WithStyles, Typography, TextField, Button, withStyles, createStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

type NewConnectionClassKeys = 'root' | 'title' | 'inputField' | 'inputFieldColor' | 'addButton'

const NewConnectionInner = ({ classes }: WithStyles<NewConnectionClassKeys>) => {
  const [displayName, setDisplayName] = useState("");
  const [sasConnectionString, setSasConnectionString] = useState("");

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h5">New Storage Connection</Typography>
      <TextField className={classes.inputField} label="Display Name" onChange={(e) => setDisplayName(e.target.value)} inputProps={{ className: classes.inputFieldColor }} />
      <TextField className={classes.inputField} label="SAS Connection String" onChange={(e) => setSasConnectionString(e.target.value)} />
      <Button className={classes.addButton} endIcon={<AddIcon></AddIcon>}>ADD</Button>
    </div>
  )
}

export const NewConnection = withStyles(
  theme => createStyles({
    root: {
      padding: theme.spacing(1.25),
      display: "flex",
      flexDirection: "column"
    },
    title: {
      marginBottom: theme.spacing(1.25)
    },
    inputField: {
      marginTop: theme.spacing(0.625),
      color: theme.palette.primary.main
    },
    inputFieldColor: {
      color: theme.palette.primary.dark
    },

    addButton: {
      alignSelf: "flex-end",
      fontWeight: "bold",
      color: theme.palette.secondary.dark,
      marginTop: theme.spacing(1.25)
    }
  })
)(NewConnectionInner);