import React from "react";
import { Box } from "@mui/material";

const BorderContainer = ({ children }) => {
  return (
    <Box
      sx={{
        border: "2px solid grey",
        borderRadius: "8px",
        padding: "16px",
        margin: "16px",
      }}
    >
      {children}
    </Box>
  );
};

export default BorderContainer;
