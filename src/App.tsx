import React from 'react';
import './App.css';
import { Typography, useTheme } from "@material-ui/core";



const App = () => {
  var theme = useTheme();

  return (
    <Typography variant="h1" component="h1" style={{ color: theme.palette.primary.main }} className="App">Empty App</Typography>
  );
}

export default App;