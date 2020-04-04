import React from 'react';
import './App.css';
import MainLayout from './Core/Layouts/MainLayout';
import { withStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme) => ({
  '@global': {
    '::-webkit-scrollbar': {
      width: '1.2em',
    },
    '::-webkit-scrollbar-track': {
      backgroundColor: theme.palette.primary.main,
      border: '0.5em solid white',
      borderRadius: "1em"
    },
    '::-webkit-scrollbar-thumb': {
      "&:hover": {
        backgroundColor: theme.palette.secondary.dark
      },
      backgroundColor: theme.palette.secondary.main,
      border: '0.4em solid transparent',
      borderRadius: "5em",
      backgroundClip: "padding-box"
    }
  }
});

const App = () => (
  <MainLayout></MainLayout>
);

export default withStyles(styles)(App);