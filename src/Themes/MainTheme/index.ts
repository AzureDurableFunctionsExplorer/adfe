import { palette } from './palette';
import { typography } from './typography';
import { Theme, createMuiTheme } from "@material-ui/core";

export const AdfeTheme: Theme = createMuiTheme({
  palette,
  typography
});