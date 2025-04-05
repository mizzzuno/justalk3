import React from 'react';
import { Box, Typography, Paper, Grid, Rating } from '@mui/material';

const Feedback = () => {
  const feedbackItems = [
    { label: '会話レベル', value: 4 },
    { label: 'ハラスメントの有無', value: 1 },
    { label: 'ハラスメントの種類', value: 2 },
    { label: '繰り返しの程度', value: 3 },
    { label: '会話の心地よさ', value: 4 },
    { label: '非難またはハラスメントの程度', value: 2 },
  ];

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
      <Paper elevation={3} sx={{ p: 4, mt: 3, bgcolor: '#1a1a1a', borderRadius: 2 }}>
        
        
        <Grid container spacing={4}>
          {feedbackItems.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                p: 2,
                bgcolor: '#2a2a2a',
                borderRadius: 1,
                '&:hover': {
                  bgcolor: '#333333',
                  transition: 'background-color 0.3s'
                }
              }}>
                <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 'medium' }}>
                  {item.label}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Rating 
                    value={item.value} 
                    readOnly 
                    sx={{ 
                      '& .MuiRating-iconFilled': {
                        color: '#ffd700'
                      },
                      '& .MuiRating-iconEmpty': {
                        color: '#666666'
                      }
                    }} 
                  />
                  <Typography variant="body1" sx={{ color: '#ffffff', fontWeight: 'bold', minWidth: '40px' }}>
                    {item.value}/5
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Feedback;
