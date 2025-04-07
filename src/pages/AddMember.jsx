import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import RecordingButton from "../components/RecordingButton";
import BasicTextFields from "../components/TextField";
import IconButtonSizes from "../components/AddMemberButton";

const AddMember = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([{ name: "" }]);
  let add_count = 0;

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
        mt: 3,
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 追加されたメンバーを表示するエリア */}
      <Box sx={{ width: "100%", mb: 3 }}>
        <Stack spacing={0}>
          {members.length === 0 ? (
            <Typography
              variant="body2"
              textAlign="center"
              sx={{ color: "white" }}
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
                  p: 0, // padding 0
                  m: 0, // margin 0
                  bgcolor: "#2a2a2a",
                  color: "white",
                  borderRadius: "4px",
                }}
              >
                <Box>
                  <BasicTextFields
                    value={member.name}
                    onChange={(e) =>
                      handleMemberNameChange(index, e.target.value)
                    }
                    sx={{ color: "white" }}
                  />

                  {index === members.length - 1 && (
                    <IconButtonSizes onClick={handleAddMember} />
                  )}
                </Box>

                <Box sx={{ transform: "scale(0.6)", color: "white" }}>
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
          onClick={handleShowSelection}
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
          追加して選択画面へ
        </Button>
      </Stack>
    </Box>
  );
};

export default AddMember;
