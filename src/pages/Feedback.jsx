import React from "react";
import { Box, Typography, Paper, Grid, Rating } from "@mui/material";

const Feedback = () => {
  const feedbackItems = [
    { label: "会話レベル", value: 4 },
    { label: "ハラスメントの有無", value: 1 },
    { label: "ハラスメントの種類", value: 2 },
    { label: "繰り返しの程度", value: 3 },
    { label: "会話の心地よさ", value: 4 },
    { label: "ハラスメントの程度", value: 2 },
  ];

  return (
    <Box sx={{ width: "100%", p: 1 }}>
      <Paper
        elevation={3}
        sx={{ p: 1.5, mt: 1.5, bgcolor: "transparent", borderRadius: 2 }}
      >
        <Grid container spacing={1}>
          {feedbackItems.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1,
                  bgcolor: "#2a2a2a",
                  borderRadius: 1,
                  "&:hover": {
                    bgcolor: "#333333",
                    transition: "background-color 0.3s",
                  },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#ffffff",
                    fontSize: {
                      xs: "0.8rem", // スマホ（600px未満）
                      sm: "1rem", // タブレット以上
                    },
                  }}
                >
                  {item.label}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Rating
                    value={item.value}
                    readOnly
                    size="small"
                    sx={{
                      "& .MuiRating-iconFilled": {
                        color: "#ffd700",
                      },
                      "& .MuiRating-iconEmpty": {
                        color: "#666666",
                      },
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#ffffff",
                      fontWeight: "bold",
                      minWidth: "36px",
                    }}
                  >
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
