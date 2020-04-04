import palette from './palette';
import typography from './typography';
import { Theme, createMuiTheme } from "@material-ui/core";

const AdfeTheme: Theme = createMuiTheme({
  palette,
  typography
});

export default AdfeTheme;