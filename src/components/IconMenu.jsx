import * as React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChatIcon from '@mui/icons-material/Chat';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CloseIcon from '@mui/icons-material/Close';
import GroupIcon from '@mui/icons-material/Group';
import { Link } from "react-router-dom";
import './../stylesheet/Menu.css';

export default function IconMenu({ onClose }) {
  return (
    <div className="menu-container">
      <div className="menu-content">
        <Link to="/" className="menu-item" onClick={onClose}>
          <HomeIcon style={{ marginRight: '10px' }} />
          ホーム画面
        </Link>
        <Link to="/add-member" className="menu-item" onClick={onClose}>
          <PersonAddIcon style={{ marginRight: '10px' }} />
          メンバーを追加
        </Link>
        <Link to="/member-select" className="menu-item" onClick={onClose}>
          <GroupIcon style={{ marginRight: '10px' }} />
          メンバーを選択
        </Link>
        <Link to="/feedback" className="menu-item" onClick={onClose}>
          <BarChartIcon style={{ marginRight: '10px' }} />
          フィードバック
        </Link>
        <Link to="/talk-detail" className="menu-item" onClick={onClose}>
          <ChatIcon style={{ marginRight: '10px' }} />
          文字起こし
        </Link>
        <Link to="/reset" className="menu-item" onClick={onClose}>
          <RestartAltIcon style={{ marginRight: '10px' }} />
          リセット
        </Link>
        <div className="menu-item" onClick={onClose} style={{ cursor: 'pointer' }}>
          <CloseIcon style={{ marginRight: '10px' }} />
          閉じる
        </div>
      </div>
    </div>
  );
}
