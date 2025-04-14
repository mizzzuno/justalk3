

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import GroupsIcon from "@mui/icons-material/Groups"; // 未使用のためコメントアウト
// import RecordingButton from "../components/RecordingButton"; // 未実装のためコメントアウト
import BasicTextFields from "../components/TextField";
import IconButtonSizes from "../components/AddMemberButton";

// APIのベースURL（必要に応じて設定）
// const API_BASE_URL = "https://Justtalk-JusTalk.hf.space";

const AddMember = () => {
  const navigate = useNavigate();
  // 初期状態でメンバー入力欄を1つ表示
  const [members, setMembers] = useState([{ name: "" }]);
  // let add_count = 0; // 未使用のためコメントアウト

  const handleAddMember = () => {
    // 新しい空のメンバー入力欄を追加
    setMembers([...members, { name: "" }]);
  };

  const handleMemberNameChange = (index, value) => {
    const updatedMembers = [...members];
    updatedMembers[index].name = value;
    setMembers(updatedMembers);
  };

  const handleShowSelection = () => {
    // 入力された名前のリスト（空の名前は除く）
    const memberNames = members
      .map(member => member.name.trim())
      .filter(name => name !== "");

    // 入力されたメンバー名を state として MemberSelect に渡す
    // MemberSelect側でこの `newlyAddedMembers` を受け取って処理する必要がある
    navigate("/member-select", { state: { newlyAddedMembers: memberNames } });
  };

  /*
  // RecordingButton が未実装のためコメントアウト
  const handleRecordClick = (memberName) => {
    console.log(`録音ボタンがクリックされました: ${memberName}`);
    // TODO: ここで録音開始・停止、音声データを取得し、
    // API_BASE_URL + '/upload_base_audio' へPOSTする処理が必要
  };
  */

  return (
    <Box
      sx={{
        width: "75%",
        margin: "auto",
        mt: 3,
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white", // 全体のテキストカラーを白に設定
      }}
    >
      <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
        メンバー名を入力
      </Typography>

      {/* メンバー入力エリア */}
      <Box sx={{ width: "100%", mb: 3 }}>
        <Stack spacing={1}> {/* spacingを少し空ける */}
          {members.map((member, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 1, // padding を少しつける
                m: 0,
                bgcolor: "#2a2a2a",
                borderRadius: "4px",
              }}
            >
              {/* TextFieldと追加ボタンをグループ化 */}
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, mr: 1 }}>
                <BasicTextFields
                  label={`メンバー ${index + 1} の名前`} // Labelを追加
                  value={member.name}
                  onChange={(e) =>
                    handleMemberNameChange(index, e.target.value)
                  }
                  sx={{
                    color: "white",
                    flexGrow: 1, // TextFieldが幅を取るように
                    mr: 1, // ボタンとの間にマージン
                    '& .MuiInputBase-input': { // 入力テキストの色
                      color: 'white',
                    },
                    '& label.Mui-focused': { // フォーカス時のラベル色
                      color: 'white',
                    },
                    '& .MuiOutlinedInput-root': { // アウトライン
                      '& fieldset': {
                        borderColor: '#888', // 通常時のボーダー色
                      },
                      '&:hover fieldset': {
                        borderColor: 'white', // ホバー時のボーダー色
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'white', // フォーカス時のボーダー色
                      },
                    },
                    '& .MuiInputLabel-root': { // 通常時のラベル色
                       color: '#aaa',
                    },
                  }}
                  variant="outlined" // Outlined variant を使う
                  size="small" // 少し小さくする
                />
                {/* 最後の入力欄の横にのみ追加ボタンを表示 */}
                {index === members.length - 1 && (
                  <IconButtonSizes onClick={handleAddMember} />
                )}
              </Box>

              {/*
              // RecordingButton が未実装のためコメントアウト
              <Box sx={{ transform: "scale(0.6)", color: "white" }}>
                <RecordingButton
                  onClick={() => handleRecordClick(member.name)}
                  disabled={!member.name.trim()} // 名前が入力されていないと押せないようにする
                />
              </Box>
              */}
            </Box>
          ))}
          {members.length === 0 && ( // membersが空の場合の表示（初期状態では表示されないはず）
             <Typography
               variant="body2"
               textAlign="center"
               sx={{ color: "white", mt: 2 }}
             >
               メンバーを追加してください
             </Typography>
           )}
        </Stack>
      </Box>

      {/* 操作ボタン */}
      <Stack
        spacing={2}
        sx={{ width: "90%", maxWidth: 400, alignSelf: "center" }} // 中央揃えに変更
      >
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={handleShowSelection}
          fullWidth
          disabled={members.every(m => !m.name.trim())} // 全ての名前が空なら非活性
          sx={{
            bgcolor: "#4caf50",
            color: "white",
            "&:hover": {
              bgcolor: "#45a049",
            },
            "&:disabled": { // 非活性時のスタイル
              bgcolor: "#666",
              color: "#aaa",
            },
            py: 1.5,
            fontSize: "1rem",
            textTransform: "none",
          }}
        >
          入力完了（選択画面へ）
        </Button>
      </Stack>
    </Box>
  );
};

export default AddMember;
