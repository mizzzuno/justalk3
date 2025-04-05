import React, { useState } from 'react';
import IconMenu from '../components/IconMenu';

const Reset = () => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSelectAll = () => {
    // 全選択のロジックを実装
  };

  const handleReset = () => {
    // リセット処理を実装
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="main-content relative">
      <div className="p-6 dark:bg-gray-800 shadow-lg rounded-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          メンバーを消去しますか？
        </h2>

        <button
          className="absolute top-4 left-4 text-white text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          <i className="fas fa-bars"></i>
        </button>

        {isMenuOpen && <IconMenu onClose={toggleMenu} />}

        <div id="memberCheckboxes">
          {/* メンバーチェックボックスを表示 */}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            id="reset_btn"
            className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
            onClick={handleReset}
          >
            メンバー削除
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reset;
