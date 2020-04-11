import { TypographyOptions } from "@material-ui/core/styles/createTypography";
import { Palette } from "@material-ui/core/styles/createPalette";

const typography: (palette: Palette) => TypographyOptions = palette => {
  return {
    h1: {
      color: palette.secondary.main,
      fontWeight: "bolder"
    },
    h2: {
      color: palette.secondary.main,
      fontWeight: "bold"
    },
    h3: {
      color: palette.secondary.main,
      fontWeight: "bold"
    },
    h4: {
      color: palette.secondary.main,
      fontWeight: "bold"
    },
    h5: {
      color: palette.primary.dark,
      fontWeight: "bold"
    },
    subtitle1: {
      color: palette.secondary.dark,
      fontWeight: "bold"
    },
    subtitle2: {
      color: palette.secondary.dark,
      fontWeight: "normal"
    },
    caption: {
      color: palette.secondary.main,
      fontWeight: 'bolder'
    }
  }
}

export default typography;