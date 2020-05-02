import { palette } from './palette';
import { typography } from './typography';
import { createOverrides } from './overrides';
import { Theme, createMuiTheme } from "@material-ui/core";

export const AdfeTheme: Theme = createMuiTheme({
  palette,
  typography,
  overrides: createOverrides(palette)
});