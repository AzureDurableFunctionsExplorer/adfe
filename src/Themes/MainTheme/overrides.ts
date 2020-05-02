import { Overrides } from "@material-ui/core/styles/overrides";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import { SimplePaletteColorOptions } from "@material-ui/core";

export function createOverrides(palette: PaletteOptions): Overrides {

  const muiInputOverride: Overrides["MuiInput"] = {}

  if (palette.primary && "dark" in palette.primary) {
    muiInputOverride.underline = {
      "&:before": {
        borderBottomColor: palette.primary.dark
      },
      "&:hover": {
        borderBottom: palette.primary.dark,
        "&:not(.Mui-disabled):before": {
          borderBottomColor: palette.primary.dark,
        }
      }
    }
  }

  return {
    MuiInput: muiInputOverride
  }
}