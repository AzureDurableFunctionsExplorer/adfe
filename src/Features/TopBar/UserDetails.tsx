import React from 'react'
import { useObserver } from 'mobx-react-lite';
import { WithStyles, withStyles, createStyles, Typography, Avatar, Button } from '@material-ui/core';
import { useStore } from '../../Stores/Core';

type UserDetailsClassKeys = 'root' | 'identifiersContainer' | 'name' | 'email' | 'avatar' | 'button';

const UserDetailsInner = ({ classes }: WithStyles<UserDetailsClassKeys>) => {
  const userStore = useStore("user");

  return useObserver(() => {

    const loggedInUser = userStore.loggedInUser;

    const userDetails: JSX.Element = !userStore.isLoggedIn
      ? <></>
      : (
        <>
          <div className={classes.identifiersContainer}>
            <Typography variant="body1" className={classes.name}>{loggedInUser!.displayName}</Typography>
            <Typography variant="h6" className={classes.email}>{loggedInUser!.email}</Typography>
          </div>
          <Avatar className={classes.avatar} src={loggedInUser?.imageUrl}>
            {loggedInUser!.displayName.split(" ").map(part => part[0])}
          </Avatar>
        </>
      )

    return (
      <div className={classes.root}>
        {userStore.isLoggedIn ? userDetails : null}
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={(e) => userStore.isLoggedIn ? userStore.logout() : userStore.login()}>
          {userStore.isLoggedIn ? 'SIGN OUT' : 'SIGN IN'}
        </Button>
      </div>
    )
  })
}

export const UserDetails = withStyles(
  theme => createStyles({
    root: {
      display: "flex",
      maxHeight: "40px"
    },
    identifiersContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end"
    },
    name: {
      color: theme.palette.secondary.main
    },
    email: {
      color: theme.palette.secondary.dark
    },
    avatar: {
      width: "64px",
      height: "64px",
      margin: "0 15px",
      boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
    },
    button: {
      alignSelf: "center",
      color: theme.palette.primary.dark,
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
        fontWeight: "bolder"
      }
    }
  })
)(UserDetailsInner);