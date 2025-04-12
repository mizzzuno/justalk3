import React from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Typography
} from '@mui/material';

// Define a dark theme for text and the error box background
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    // background.paper は Paper を使わないので不要になったが、
    // 他で使う可能性を考慮して残しても良い
    // background: {
    //   paper: '#37474f',
    // },
    text: {
      primary: '#ffffff', // White text for title
      secondary: '#b0bec5', // Lighter grey text for error message
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h6: {
        fontWeight: 600,
    }
  },
  // Paper を使わないので MuiPaper の styleOverrides は不要
  // components: {
  //   MuiPaper: {
  //     styleOverrides: {
  //       root: {
  //         backgroundImage: 'none',
  //       },
  //     },
  //   },
  // },
});

function TranscriptionErrorUI() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          //minHeight: 'calc(100vh - 200px)',
        }}
      >
        <Box
          sx={{
            width: '100%',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            align="center"
            sx={{ mb: 2, color: 'text.primary' }}
          >
            会話の文字起こし表示
          </Typography>

          <Box
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              p: 2,
              textAlign: 'center',
              width: '100%',
            }}
          >
            <Typography variant="body1" component="p" color="text.secondary">
              エラー: データ取得に失敗しました。
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default TranscriptionErrorUI;

// To use this component in your App.js or similar:
// import React from 'react';
// import TranscriptionErrorUI from './TranscriptionErrorUI'; // Adjust path if needed
//
// function App() {
//   return (
//     <TranscriptionErrorUI />
//   );
// }
//
// export default App;