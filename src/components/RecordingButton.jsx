import React, { useState } from "react";
import { IconButton } from "@mui/material";
import './../stylesheet/Body.css';

const RecordingButton = ({ onClick }) => {
  const [isRecording, setIsRecording] = useState(false);

  const handleClick = () => {
    setIsRecording((prev) => !prev); // 自分の録音状態もトグル
    if (onClick) {
      onClick(); // 親の関数も呼び出す
    }
  };

  return (
    <IconButton
      onClick={handleClick}
      sx={{
        width: 100,
        height: 100,
        borderRadius: "50%",
        border: "3px solid white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "transparent",
        '&:hover': {
          bgcolor: 'rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <div
        style={{
          width: isRecording ? "30px" : "70px",
          height: isRecording ? "30px" : "70px",
          backgroundColor: "#ff4444",
          borderRadius: isRecording ? "5px" : "50%",
          transition: "all 0.3s ease-in-out",
        }}
      />
    </IconButton>
  );
};

export default RecordingButton;