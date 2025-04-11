import { createTheme } from '@mui/material/styles';

// export const theme = createTheme({
//   typography: {
//     // fontFamily: ['Montserrat', 'serif'].join(','), Uncomment if you want all the typography to inherit this font.
//     button: {
//       fontFamily: ['Montserrat', 'serif'].join(','),
//       fontSize: 16,
//       fontWeight: 400,
//     },
//   }
// });

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
        },
      },
    },
  },
});
