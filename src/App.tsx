import React from 'react';
import './App.css';
import MainLayout from './Core/Layouts/MainLayout';
import { withStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme) => ({
  '@global': {
    '::-webkit-scrollbar': {
      width: '0.4em'
    },
    '::-webkit-scrollbar-track': {
      backgroundColor: theme.palette.primary.main,
      boxShadow: "1px 0px 3px"
    },
    '::-webkit-scrollbar-thumb': {
      "&:hover": {
        backgroundColor: theme.palette.secondary.dark
      },
      backgroundColor: theme.palette.secondary.main
    }
  }
});

const App = () => (
  <MainLayout></MainLayout>
);

export default withStyles(styles)(App);