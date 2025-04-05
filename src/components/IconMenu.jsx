import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChatIcon from '@mui/icons-material/Chat';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";


export default function IconMenu() {
  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }} >
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>ホーム画面</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <PersonAddIcon  fontSize="small" />
          </ListItemIcon>
          <ListItemText>メンバーを追加</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <BarChartIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>フィードバック</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ChatIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>文字起こし</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <RestartAltIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>リセット</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <CloseIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>閉じる</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
