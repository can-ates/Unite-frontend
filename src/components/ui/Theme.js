import { createMuiTheme } from "@material-ui/core/styles";

const arcBlue = "#0B72B9";
const arcOrange = "#FFBA60";
const arcGrey = "#868686";

export default createMuiTheme({
    palette: {
        common: {
          blue: arcBlue,
          orange: arcOrange,
          white: '#ffffff',
          grey: arcGrey
        },
        primary: {
          main: arcOrange
        },
        secondary: {
          main: arcBlue
        }
      },
      typography: {
        tab: {
          fontFamily: "Raleway",
          textTransform: "none",
          fontWeight: 700,
          color: "white",
          fontSize: "1rem"
        },
        estimate: {
          fontFamily: "Pacifico",
          fontSize: "1rem",
          textTransform: "none",
          color: "white"
        },
        h1: {
          fontFamily: "Raleway",
          fontWeight: 700,
          fontSize: "4.2rem",
          color: 'white',
          lineHeight: 1.5
        },
        h2: {
          fontFamily: "Raleway",
          fontWeight: 700,
          fontSize: "2.5rem",
          color: 'white',
          lineHeight: 1.5
        },
        h3: {
          fontFamily: "Pacifico",
          fontSize: "2.5rem",
          color: arcBlue
        },
        h4: {
          fontFamily: "Raleway",
          fontSize: "1.75rem",
          color: arcBlue,
          fontWeight: 700
        },
        h6: {
          fontWeight: 700,
          fontFamily: "Raleway",
          color: arcBlue
        },
        subtitle1: {
          fontSize: "1.25rem",
          fontWeight: 900,
          color: arcGrey
        },
        subtitle2: {
          fontFamily: "Raleway",
          color: "white",
          fontWeight: 300,
          fontSize: "1.25rem"
        },
        body1: {
          fontFamily: "Raleway",
          fontSize: "1.25rem",
          color: arcGrey,
          fontWeight: 300
        },
        body2: {
          fontFamily: "Raleway",
          fontSize: "1rem",
          color: 'white',
          fontWeight: 700
        },
        caption: {
          fontSize: "1rem",
          fontWeight: 300,
          color: arcGrey
        },
      },
      overrides: {
        MuiInputLabel: {
          root: {
            color: 'white',
            fontSize: "1rem",
            fontFamily: "Raleway",
            fontWeight: 400
          }
        },
        MuiInput: {
          root: {
            color: arcOrange,
            fontFamily: "Raleway",
            fontSize: '1rem',
            fontWeight: 600,
            '&.Mui-error': {
              borderBottom: `1px solid red`
            }
          },
          underline: {
            "&:not($error):before": {
              borderBottom: `2px solid white`,
              fontFamily: "Raleway",
            },
            "&:hover:not($disabled):not($focused):not($error):before": {
              borderBottom: `2px solid ${arcOrange}`,
              fontFamily: "Raleway",
            },
          
          }
        },
        MuiFormHelperText: {
          root: {
            color: '#000',
            '&.Mui-error': {
              color: '#ff7777',
              fontWeight: 600
            }
          },
          
        },
        MuiSnackbar : {
          root: {
            fontFamily: 'Raleway',
            fontSize: '0.5rem',
          }
        }
      }
})