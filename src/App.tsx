import React, { createContext } from 'react';
import './App.css';
import MainLayout from './Core/Layouts/MainLayout';
import { withStyles, Theme } from '@material-ui/core';
import { RootStore } from './Stores/RootStore';
import { useLocalStore } from "mobx-react-lite";

const StoreContext = createContext<RootStore | null>(null);
const rootStore = new RootStore()

const StoreProvider: React.FC = ({ children }) => {
  const store = useLocalStore(() => ({ ...rootStore }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  )
}

const App = () => (
  <StoreProvider>
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

export default withStyles(styles)(App);