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
        width: 80,
        height: 80,
        borderRadius: "50%",
        border: "4px solid white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "transparent",
        boxShadow: 3,
      }}
    >
      <div
        style={{
          width: isRecording ? "24px" : "50px",
          height: isRecording ? "24px" : "50px",
          backgroundColor: "red",
          borderRadius: isRecording ? "5px" : "50%",
          transition: "all 0.3s ease-in-out",
        }}
      />
    </IconButton>
  );
};

export default RecordingButton;