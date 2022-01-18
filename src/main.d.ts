import { Theme as DefaultTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme extends DefaultTheme {
    colors: {
      blackRussian: string;
      white: string;
      solitude: string;
      solitudeSecondary: string;
      paleSlate: string;
      pattensBlue: string;
      echoBlue: string;
      blueZodiac: string;
      manatee: string;
      mischka: string;
      linkWater: string;
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    colors: {
      blackRussian: string;
      white: string;
      solitude: string;
      solitudeSecondary: string;
      paleSlate: string;
      pattensBlue: string;
      echoBlue: string;
      blueZodiac: string;
      manatee: string;
      mischka: string;
      linkWater: string;
    }
  }
}
