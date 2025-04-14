import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Header from "./components/Header"; // パスを確認してください
import BorderContainer from "./components/BorderContainer"; // パスを確認してください
import Typography from "@mui/material/Typography";
import AppRoutes from './routes/AppRoutes'; // パスを確認してください
import { SelectedUserProvider } from './contexts/SelectedUserContext'; // ★ 作成したProviderをインポート
import './stylesheet/Body.css'; // パスを確認してください
import './App.css'; // App.cssも必要ならインポート

const AppContent = () => {
  const location = useLocation();
  // menuOpen の state は Header で管理されているように見えるので、
  // AppContent で持つ必要がないかもしれません。Headerの実装によります。
  // もしHeaderが自身の状態を持つなら、以下の2行は不要かもしれません。
  const [menuOpen, setMenuOpen] = useState(false); // React.useState -> useState に修正

  useEffect(() => {
    // ページ遷移時にメニューを閉じる（もしメニューがHeader管理なら不要かも）
    setMenuOpen(false);
  }, [location]);

  return (
    <div className="main-container"> {/* Body.css のクラスか確認 */}
      <BorderContainer>
        {/* Typographyで全体を囲むのは意図通りか確認 */}
        {/* 本来はコンテンツ部分だけTypographyで囲む方が一般的かもしれません */}
        <Typography variant="h6" component="div" style={{ textAlign: 'center' }}> {/* component="div" を追加 */}
          {/* Headerに menuOpen と setMenuOpen を渡す */}
          <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          {/* コンテンツ部分 */}
          {/* styleの適用は意図通りか確認 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <AppRoutes /> {/* ルーティング定義 */}
          </div>
        </Typography>
      </BorderContainer>
    </div>
  );
};

const App = () => {
  return (
    // 1. Routerで全体を囲む
    <Router>
      {/* 2. SelectedUserProvider を Router のすぐ内側に配置 */}
      <SelectedUserProvider>
        {/* App全体のコンテナ */}
        <div className="app-container"> {/* App.css のクラスか確認 */}
          {/* AppContent をレンダリング */}
          <AppContent />
        </div>
      </SelectedUserProvider>
    </Router>
  );
};

export default App;