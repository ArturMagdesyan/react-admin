import { createTheme } from '@mui/material/styles';
import {
  BASE_FONT_FAMILY,
  ERROR,
  INFO,
  PRIMARY,
  PRIMARY_DARK,
  PRIMARY_LIGHT,
  SECONDARY,
  SUCCESS,
  WARNING,
  WHITE,
  BLACK_RUSSIAN,
  MANATEE,
  BLUE_ZODIAC,
} from '../../common/constants/global-styles-variables.constant';

const defaultTheme = createTheme({
  colors: {
    blackRussian: BLACK_RUSSIAN,
    white: WHITE,
    solitude: '#F0F1F4',
    solitudeSecondary: '#E6E8EF',
    paleSlate: '#C5BAB5',
    pattensBlue: '#CBEAFF',
    echoBlue: '#B5B8C5',
    blueZodiac: BLUE_ZODIAC,
    manatee: MANATEE,
    mischka: '#9C9FAB',
    linkWater: '#C7CAD7',
  },
  palette: {
    mode: 'light',
    primary: {
      main: PRIMARY,
      light: PRIMARY_LIGHT,
      dark: PRIMARY_DARK,
      contrastText: WHITE,
    },
    secondary: {
      main: SECONDARY,
      light: PRIMARY_LIGHT,
    },
    error: {
      main: ERROR,
      light: PRIMARY_LIGHT,
    },
    warning: {
      main: WARNING,
      light: PRIMARY_LIGHT,
      contrastText: BLACK_RUSSIAN,
    },
    info: {
      main: INFO,
      light: PRIMARY_LIGHT,
    },
    success: {
      main: SUCCESS,
      light: PRIMARY_LIGHT,
      contrastText: WHITE,
    },
  },
  shadows: [
    'none', // 0
    '5px 5px 10px #1515161A', // 1 BLACK
    '0px 3px 6px #1515161A', // 2
    '3px 3px 10px #15151629', // 3
    '0px 0px 0px #1515161A', // 4
    '0px 3px 6px #29AAFF4D', // 5 PRIMARY
    '0px 3px 6px #29AAFF1A', // 6
    '5px 5px 10px #29AAFF1A', // 7
    '0px 3px 6px #A85AFF4D', // 8 SECONDARY
    '0px 3px 6px #A85AFF1A', // 9
    '5px 5px 10px #A85AFF40', // 10
    '5px 5px 10px #5F647740', // 11 INFO
    '0px 3px 6px #5F647740', // 12
    '5px 5px 10px #2ECC7140', // 13 SUCCESS
    '0px 3px 6px #2ECC7140', // 14
    '0px 3px 6px #FFC52940', // 15 WARNING
    '5px 5px 10px #FFC5291A', // 16
    '5px 5px 10px #FFC52940', // 17
    '0px 3px 6px #FF294940', // 18 ERROR
    '5px 5px 10px #FF294940', // 19
    '5px 5px 10px #FF29491A', // 20
    '0px 3px 6px #1BD3EB4D', // 21 - PRIMARY LIGHT
    '0px 1px 0px #E6E8EF', // 22
    '0px 0px 10px #00000026', // 23
    '0px 3px 6px #C7CAD74D', // 24
  ],
  typography: {
    fontFamily: BASE_FONT_FAMILY,
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.625rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 'normal',
    },
    body1: {
      lineHeight: 'normal',
    },
    body2: {
      fontSize: '0.813rem',
      letterSpacing: 0,
      lineHeight: 'normal',
    },
    button: {
      fontSize: '0.875rem',
      lineHeight: 'normal',
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 'normal',
      color: INFO,
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableTouchRipple: true,
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: '164px',
          minHeight: '38px',
          borderRadius: '10px',
          fontWeight: 'normal',
          fontSize: '14px',
          letterSpacing: 'normal',
          textTransform: 'none',
          transition: 'padding 250ms',
          '&:hover': {
            padding: '6px 8px 6px 10px',
          },
          '&:disabled': {
            background: '#E6E8EF',
            color: MANATEE,
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          height: '44px',
          maxHeight: '44px',
          borderBottom: 0,
          color: BLUE_ZODIAC,
        },
        head: {
          padding: '0 4px',
          color: MANATEE,
        },
        body: {
          padding: '6px',
          maxHeight: '40px',
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& tr:nth-of-type(odd)': {
            background: '#F0F1F4',
          },
        },
      },
    },
  },
});

export default defaultTheme;
