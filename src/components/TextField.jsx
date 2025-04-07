import * as React from "react";
import TextField from "@mui/material/TextField";

export default function BasicTextFields(props) {
  return (
    <TextField
      {...props}
      id="standard-basic"
      label="名前を入力して"
      variant="standard"
      InputProps={{
        sx: {
          color: "white", // 入力文字の色
          "&:before": {
            borderBottom: "1px solid white", // 通常時の下線
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottom: "2px solid white", // ホバー時の下線
          },
          "&:after": {
            borderBottom: "2px solid white", // フォーカス時の下線
          },
        },
      }}
      InputLabelProps={{
        sx: {
          color: "white",
          "&.Mui-focused": {
            color: "white",
          },
        },
      }}
    />
  );
}
