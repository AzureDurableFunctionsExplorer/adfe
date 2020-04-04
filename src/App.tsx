import React from 'react';
import './App.css';
import MainLayout from './Core/Layouts/MainLayout';
import { withStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme) => ({
  '@global': {
    '::-webkit-scrollbar': {
      width: '0.5em',
    },
    '::-webkit-scrollbar-track': {
      backgroundColor: theme.palette.primary.main,
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.secondary.main
    }
  }
});

const App = () => (
  <MainLayout></MainLayout>
);

export default withStyles(styles)(App);