import { createMuiTheme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import React, { PropsWithChildren } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import "../styles/app-global.scss";

const Raleway = {
  fontFamily: "Raleway",
  fontStyle: "normal",
  fontWeight: 400,
  src: `local(''),
    url(${require("../assets/fonts/raleway-v18-latin/raleway-v18-latin-regular.woff2").default}) format('woff2'),
    url(${require("../assets/fonts/raleway-v18-latin/raleway-v18-latin-regular.woff").default}) format('woff');`,
};

const MontserratRegular = {
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontWeight: 400,
  src: `local(''),
    url(${require("../assets/fonts/montserrat-v15-latin/montserrat-v15-latin-regular.woff2").default}) format('woff2'),
    url(${require("../assets/fonts/montserrat-v15-latin/montserrat-v15-latin-regular.woff").default}) format('woff')`,
};
const MontserratMedium = {
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontWeight: 500,
  src: `local(''),
    url(${require("../assets/fonts/montserrat-v15-latin/montserrat-v15-latin-500.woff2").default}) format('woff2'),
    url(${require("../assets/fonts/montserrat-v15-latin/montserrat-v15-latin-500.woff").default}) format('woff')`,
};
const MontserratSemiBold = {
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontWeight: 600,
  src: `local(''),
    url(${require("../assets/fonts/montserrat-v15-latin/montserrat-v15-latin-600.woff2").default}) format('woff2'),
    url(${require("../assets/fonts/montserrat-v15-latin/montserrat-v15-latin-600.woff").default}) format('woff')`,
};
const MontserratBold = {
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontWeight: 700,
  src: `local(''),
    url(${require("../assets/fonts/montserrat-v15-latin/montserrat-v15-latin-700.woff2").default}) format('woff2'),
    url(${require("../assets/fonts/montserrat-v15-latin/montserrat-v15-latin-700.woff").default}) format('woff')`,
};

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
    fontSize: 14,
    button: {
      textTransform: "capitalize",
      whiteSpace: "nowrap",
      fontWeight: "bold",
    },
    fontWeightRegular: 400,
    fontWeightBold: 700,
    fontWeightMedium: 500,
    h1: {},
    h2: {},
    h3: {},
    h4: {},
    h5: {},
    h6: {},
    subtitle1: {},
    subtitle2: {},
    body1: {},
    body2: {},
    caption: {},
    overline: {},
  },
  props: {
    MuiAppBar: {
      elevation: 1,
      color: "default",
    },
    MuiToolbar: {
      variant: "dense",
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
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [Raleway, MontserratRegular, MontserratMedium, MontserratSemiBold, MontserratBold],
      },
    },

    MuiAppBar: {
      root: {
        height: 50,
        display: "flex",
        flexDirection: "row",
        zIndex: 1300,
      },
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
