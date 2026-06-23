import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#e65100',
        },
        secondary: {
            main: '#ffa726',
        },
    },

    shape: {
        borderRadius: 12,
    },

    typography: {
        fontFamily:
            '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
});

export default theme;
