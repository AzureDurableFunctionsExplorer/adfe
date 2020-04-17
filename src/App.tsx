import React from 'react';
import './App.css';
import { MainLayout } from './Core/Layouts/MainLayout';
import { withStyles, Theme } from '@material-ui/core';
import { RootStore } from './Stores/RootStore';
import { StoreProvider } from './Stores/Core';

const rootStore: RootStore = new RootStore();

const AppInner = () => (
  <StoreProvider rootStore={rootStore}>
    <MainLayout></MainLayout>
  </StoreProvider>
);

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

export const App = withStyles(styles)(AppInner);