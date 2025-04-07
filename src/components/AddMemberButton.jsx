import * as React from "react";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

export default function IconButtonSizes({ onClick, ...props }) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <IconButton
        aria-label="add"
        size="small"
        onClick={onClick}
        sx={{ color: "white" }}
        {...props}
      >
        ＋
      </IconButton>
    </Stack>
  );
}
