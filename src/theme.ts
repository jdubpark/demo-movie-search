import createTheme from '@mui/material/styles/createTheme'

export default createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '14px',
          backgroundColor: 'rgba(30,30,30,0.8)',
        },
      },
    },
  },
  palette: {
    mode: 'light',
  },
})
