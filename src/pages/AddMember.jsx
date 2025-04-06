import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import RecordingButton from "../components/RecordingButton";
import FormPropsTextFields from "../components/TextField";

const AddMember = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([{ name: "" }]);

  const handleAddMember = () => {
    setMembers([...members, { name: "" }]); // 空のメンバー追加
  };

  const handleMemberNameChange = (index, value) => {
    const updatedMembers = [...members];
    updatedMembers[index].name = value;
    setMembers(updatedMembers);
  };

  const handleShowSelection = () => {
    navigate("/member-select");
  };

  const handleRecordClick = (memberName) => {
    console.log(`録音ボタンがクリックされました: ${memberName}`);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 5,
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 追加されたメンバーを表示するエリア */}
      <Box sx={{ width: "100%", mb: 3 }}>
        <Stack spacing={1}>
          {members.length === 0 ? (
            <Typography
              variant="body2"
              textAlign="center"
              sx={{ color: "grey.500" }}
            >
              メンバーが追加されていません
            </Typography>
          ) : (
            members.map((member, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  bgcolor: "#2a3441",
                  borderRadius: "4px",
                }}
              >
                <FormPropsTextFields
                  value={member.name}
                  onChange={(e) =>
                    handleMemberNameChange(index, e.target.value)
                  }
                />
                <Box sx={{ transform: "scale(0.6)" }}>
                  <RecordingButton
                    onClick={() => handleRecordClick(member.name)}
                  />
                </Box>
              </Box>
            ))
          )}
        </Stack>
      </Box>

      {/* 操作ボタン */}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={handleAddMember}
          fullWidth
          sx={{
            bgcolor: "#4caf50",
            color: "white",
            "&:hover": {
              bgcolor: "#45a049",
            },
            py: 1.5,
            fontSize: "1rem",
            textTransform: "none",
          }}
        >
          メンバーを追加
        </Button>

        <Button
          variant="contained"
          startIcon={<GroupsIcon />}
          onClick={handleShowSelection}
          fullWidth
          sx={{
            bgcolor: "#607d8b",
            color: "white",
            "&:hover": {
              bgcolor: "#546e7a",
            },
            py: 1.5,
            fontSize: "1rem",
            textTransform: "none",
          }}
        >
          メンバー選択画面を表示
        </Button>
      </Stack>
    </Box>
  );
};

export default AddMember;
