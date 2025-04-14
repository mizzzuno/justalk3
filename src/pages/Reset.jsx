

import React, { useState, useEffect } from 'react';
// import IconMenu from '../components/IconMenu'; // 実装不明のためコメントアウト

// APIのベースURL
const API_BASE_URL = "https://Justtalk-JusTalk.hf.space";

const Reset = () => {
  const [members, setMembers] = useState([]); // APIから取得したメンバー名リスト
  const [selectedMembers, setSelectedMembers] = useState([]); // 削除対象として選択されたメンバー名リスト
  const [isLoading, setIsLoading] = useState(true); // メンバーリスト取得中のローディング
  const [isDeleting, setIsDeleting] = useState(false); // 削除処理中のローディング
  const [error, setError] = useState(null); // APIエラー
  const [successMessage, setSuccessMessage] = useState(null); // 削除成功メッセージ
  // const [isMenuOpen, setIsMenuOpen] = useState(false); // IconMenu 未実装のためコメントアウト

  // メンバーリストを取得する関数
  const fetchMembers = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null); // メッセージをクリア
    try {
      const response = await fetch(`${API_BASE_URL}/list_base_audio`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "エラーレスポンスの解析に失敗しました" }));
        throw new Error(`メンバーリストの取得に失敗しました: ${response.status} ${response.statusText}. ${errorData?.details || errorData?.error || ''}`);
      }
      const data = await response.json();
      if (data.status === "success" && Array.isArray(data.id)) {
        setMembers(data.id);
      } else {
        throw new Error(data.details || data.error || "メンバーリストの形式が無効です");
      }
    } catch (err) {
      console.error("Error fetching members:", err);
      setError(err.message);
      setMembers([]); // エラー時はリストを空にする
    } finally {
      setIsLoading(false);
    }
  };

  // コンポーネントマウント時にメンバーリストを取得
  useEffect(() => {
    fetchMembers();
  }, []);

  // チェックボックスの状態変更ハンドラ
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setError(null); // エラー表示をクリア
    setSuccessMessage(null); // 成功メッセージをクリア
    setSelectedMembers(prevSelected => {
      if (checked) {
        return [...prevSelected, value]; // 選択リストに追加
      } else {
        return prevSelected.filter(name => name !== value); // 選択リストから削除
      }
    });
  };

  // 全選択ハンドラ
  const handleSelectAll = () => {
    if (selectedMembers.length === members.length) {
      setSelectedMembers([]); // 全て選択されている場合は全解除
    } else {
      setSelectedMembers(members); // 全て選択
    }
    setError(null);
    setSuccessMessage(null);
  };

  // 削除実行ハンドラ
  const handleDeleteSelected = async () => {
    if (selectedMembers.length === 0) {
      setError("削除するメンバーを選択してください。");
      return;
    }

    // 確認ダイアログ (任意)
    if (!window.confirm(`${selectedMembers.join(', ')} を削除してもよろしいですか？\nこの操作は取り消せません。`)) {
       return;
    }

    setIsDeleting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`${API_BASE_URL}/reset_member`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ names: selectedMembers }), // APIは 'names' キーを期待
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "エラーレスポンスの解析に失敗しました" }));
        throw new Error(`メンバーの削除に失敗しました: ${response.status} ${response.statusText}. ${errorData?.message || errorData?.details || errorData?.error || ''}`);
      }

      const result = await response.json();
      if (result.status === 'success') {
        setSuccessMessage(`${selectedMembers.length}人のメンバーを削除しました。`);
        setSelectedMembers([]); // 選択状態をリセット
        // メンバーリストを再取得して表示を更新
        await fetchMembers();
      } else {
        throw new Error(result.message || result.details || result.error || "サーバーでの削除処理に失敗しました。");
      }
    } catch (err) {
      console.error("Error deleting members:", err);
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  // const toggleMenu = () => { // IconMenu 未実装のためコメントアウト
  //   setIsMenuOpen(!isMenuOpen);
  // };

  return (
    // `main-content relative` クラスを適用する親要素がここにあるか確認
    <div className="p-6 bg-gray-900 dark:bg-gray-800 shadow-lg rounded-2xl text-white min-h-screen"> {/* 背景色とテキスト色を設定 */}
      <h2 className="text-2xl font-semibold mb-6 text-center">
        メンバー削除
      </h2>

      {/* IconMenu 未実装のためコメントアウト */}
      {/* <button
        className="absolute top-4 left-4 text-white text-2xl focus:outline-none"
        onClick={toggleMenu}
      >
        <i className="fas fa-bars"></i>
      </button>
      {isMenuOpen && <IconMenu onClose={toggleMenu} />} */}

      {/* メッセージ表示エリア */}
      {error && <div className="mb-4 p-3 bg-red-500 text-white rounded text-center">{error}</div>}
      {successMessage && <div className="mb-4 p-3 bg-green-500 text-white rounded text-center">{successMessage}</div>}

      {isLoading ? (
        <div className="text-center py-10">
          <p>メンバーリストを読み込み中...</p>
          {/* ここにスピナーを追加しても良い */}
        </div>
      ) : members.length === 0 && !error ? (
         <div className="text-center py-10 text-gray-400">登録されているメンバーはいません。</div>
      ) : (
        <>
          <div className="mb-4 text-center">
            <button
              onClick={handleSelectAll}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm disabled:opacity-50"
              disabled={members.length === 0 || isLoading || isDeleting}
            >
              {selectedMembers.length === members.length ? '全解除' : '全選択'}
            </button>
          </div>

          <div id="memberCheckboxes" className="space-y-2 max-w-md mx-auto mb-8">
            {members.map((name) => (
              <div key={name} className="flex items-center bg-gray-700 p-3 rounded hover:bg-gray-600">
                <input
                  type="checkbox"
                  id={`member-${name}`}
                  value={name}
                  checked={selectedMembers.includes(name)}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  disabled={isDeleting} // 削除中は無効化
                />
                <label htmlFor={`member-${name}`} className="ml-3 text-sm font-medium text-gray-100 dark:text-gray-300">
                  {name}
                </label>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              id="reset_btn" // 元のIDを維持
              className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded disabled:opacity-50 disabled:cursor-not-allowed" // 少し大きく
              onClick={handleDeleteSelected}
              disabled={selectedMembers.length === 0 || isLoading || isDeleting} // 選択されていない、ロード中、削除中は無効
            >
              {isDeleting ? '削除中...' : `${selectedMembers.length}人 選択して削除`}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Reset;
