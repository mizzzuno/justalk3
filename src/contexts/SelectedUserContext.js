import React, { createContext, useState, useContext } from 'react';

// Contextオブジェクトを作成
const SelectedUserContext = createContext();

// Context Providerコンポーネントを作成
export const SelectedUserProvider = ({ children }) => {
  const [selectedUsers, setSelectedUsers] = useState([]); // 選択されたユーザー名の配列

  // Contextに渡す値（状態と更新関数）
  const value = {
    selectedUsers,
    setSelectedUsers,
  };

  return (
    <SelectedUserContext.Provider value={value}>
      {children}
    </SelectedUserContext.Provider>
  );
};

// Contextを使用するためのカスタムフック (便利)
export const useSelectedUser = () => {
  const context = useContext(SelectedUserContext);
  if (context === undefined) {
    throw new Error('useSelectedUser must be used within a SelectedUserProvider');
  }
  return context;
};