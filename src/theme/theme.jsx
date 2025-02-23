import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#79a249', 
    },
    secondary: {
      main: '#f50057', 
    },
    background: {
      default: '#d6e3c8', 
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif', // Fuente de Google Fonts
  },
});

export default theme;
