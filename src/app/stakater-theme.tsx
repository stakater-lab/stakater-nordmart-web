import { createMuiTheme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import React, { PropsWithChildren } from "react";
import { ThemeProvider } from "@material-ui/core/styles";

const Raleway = {
  fontFamily: "Raleway",
  fontStyle: "normal",
  fontWeight: 400,
  src: `local(''),
    url(${require("../assets/fonts/raleway-v18-latin/raleway-v18-latin-regular.woff2").default}) format('woff2'),
    url(${require("../assets/fonts/raleway-v18-latin/raleway-v18-latin-regular.woff").default}) format('woff');`,
};

const Montserrat = [400, 500, 600, 700].map(size => ({
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontWeight: size,
  src: `local(''),
    url(${require(`../assets/fonts/montserrat-v15-latin/montserrat-v15-latin-${size}.woff2`).default}) format('woff2'),
    url(${require(`../assets/fonts/montserrat-v15-latin/montserrat-v15-latin-${size}.woff`).default}) format('woff')`,
}))

export const MuiOverride = createMuiTheme({
  palette: {
    primary: {
      main: "#3E0054",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#FF7500",
      contrastText: "#ffffff",
    },
    success: {
      main: "#01ac51",
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    htmlFontSize: 14,
    fontSize: 12,
    button: {
      textTransform: "capitalize",
      whiteSpace: "nowrap",
      fontFamily: "Raleway, sans-serif",
    },
    fontWeightRegular: 400,
    fontWeightBold: 700,
    fontWeightMedium: 500,
    h1: {
      textTransform: "uppercase",
    },
    h2: {
      textTransform: "uppercase",
    },
    h3: {
      textTransform: "uppercase",
    },
    h4: {
      textTransform: "uppercase",
      fontWeight: "bold"
    },
    h5: {
      // textTransform: "uppercase",
    },
    h6: {
      textTransform: "uppercase",
    },
    subtitle1: {},
    subtitle2: {},
    body1: {},
    body2: {},
    caption: {},
    overline: {},
  },
  props: {
    MuiAppBar: {
      elevation: 0,
      color: "default",
      position: "sticky"
    },
    MuiToolbar: {
      disableGutters: true,
    },
    MuiTable: {
      size: "medium",
      stickyHeader: true,
    },
    MuiCard: {
      elevation: 0,
    },
    MuiPaper: {
      square: true,
      elevation: 0,
    },
    MuiPopover: {
      marginThreshold: 0,
      elevation: 1,
      disableRestoreFocus: true,
    },
    MuiButton: {
      disableElevation: true,
      color: "primary",
    },
    MuiTooltip: {
      placement: "top-start",
      PopperProps: {
        modifiers: {
          preventOverflow: {
            enabled: true,
            padding: 0,
            scrollParent: "window",
          },
        },
      },
    },
    MuiOutlinedInput: {
      margin: "dense",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [Raleway, ...Montserrat],
      },
    },

    MuiAppBar: {
      colorDefault: {
        background: "linear-gradient(220.21deg, #3e0054 15%, #fd7401 75.99%, #f89a02)",
        color: "white",
      },
    },

    MuiDrawer: {
      paperAnchorDockedLeft: {
        borderRight: "none",
        minWidth: 250,
      },
      docked: {
        minWidth: 0,
      },
    },
    MuiTableCell: {
      root: {
        padding: 12,
      },
      head: {
        fontWeight: "bold",
        backgroundColor: "#E5E5E5",
      },
      stickyHeader: {
        fontWeight: "bold",
        backgroundColor: "#E5E5E5",
      },
    },
    MuiButton: {
      root: {
        borderRadius: 0,
      },
      label: {
        "& svg": {
          marginRight: "0.25rem",
        },
      }
    },
    MuiTouchRipple: {
      root: {
        borderRadius: 0,
      },
    },
    MuiTooltip: {
      tooltip: {
        padding: 10,
        borderRadius: 0,
        margin: 0,
        fontSize: 14,
      },
    },
    MuiFormLabel: {
      root: {
        display: "flex",
        alignItems: "center",
      },
    },
    MuiCircularProgress: {
      colorPrimary: {
        color: "inherit",
      },
    },
    MuiLinearProgress: {
      barColorPrimary: {
        backgroundColor: "inherit",
      },
      colorPrimary: {
        color: "inherit",
        backgroundColor: "inherit",
      },
    },
    MuiLink: {
      root: {
        textDecoration: "none"
      }
    }
  },
  shape: {
    borderRadius: 0
  },
  mixins: {
    toolbar: {
      minHeight: 65
    }
  },
});

export const GlobalStyle = ({ children }: PropsWithChildren<any>) => {
  return (
    <ThemeProvider theme={MuiOverride}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
