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
          fontWeight: 900,
          fontSize: "4.2rem",
          color: arcOrange,
          lineHeight: 1.5
        },
        h2: {
          fontFamily: "Raleway",
          fontWeight: 700,
          fontSize: "3rem",
          color: arcOrange,
          lineHeight: 1
        },
        h3: {
          fontFamily: "Raleway",
          fontSize: "2.5rem",
          color: arcOrange
        },
        h4: {
          fontFamily: "Raleway",
          fontSize: "1.75rem",
          color: arcBlue,
          fontWeight: 700
        },
        h5: {
          fontWeight: 600,
          fontFamily: "Raleway",
          color: 'white',
        },
        h6: {
          fontWeight: 700,
          fontFamily: "Raleway",
          color: arcBlue,
        },
        subtitle1: {
          fontSize: "1.05rem",
          fontWeight: 900,
          color: 'black'
        },
        subtitle2: {
          fontFamily: "Raleway",
          color: "black",
          fontWeight: 500,
          fontSize: "0.90rem"
        },
        body1: {
          fontFamily: "Raleway",
          fontSize: "1.25rem",
          color: arcOrange,
          fontWeight: 900
        },
        body2: {
          fontFamily: "Raleway",
          fontSize: "1rem",
          color: 'white',
          fontWeight: 700
        },
        caption: {
          fontFamily: "Raleway",
          fontSize: "1rem",
          fontWeight: 900,
          color: 'black'
        },
      },
      overrides: {
        MuiButton: {
          root : {
            '&.Mui-disabled' : {
              color : '#AAD1D6'
            }
          }
        },
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
            },
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
            color: 'white',
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
        },
        MuiTab: {
          root :{
            '&.Mui-selected' : {
              color: arcOrange
            }
          },
        },
      }
})