import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate をインポート
import { useSelectedUser } from "../contexts/SelectedUserContext"; // Contextフックをインポート
import "./../stylesheet/MemberSelect.css"; // パスを確認してください

// APIのベースURL
const API_BASE_URL = "https://Justtalk-JusTalk.hf.space";

export default function MemberSelect() {
  const [users, setUsers] = useState([]); // APIから取得した全ユーザーリスト
  const [localSelectedUsers, setLocalSelectedUsers] = useState([]); // この画面での選択状態
  const [isLoading, setIsLoading] = useState(true); // ユーザーリスト取得中のローディング
  const [isProcessing, setIsProcessing] = useState(false); // API操作中のローディング（削除、次へ）
  const [error, setError] = useState(null); // エラーメッセージ
  const [showDeleteModal, setShowDeleteModal] = useState(false); // 削除確認モーダルの表示状態
  const [userToDelete, setUserToDelete] = useState(null); // 削除対象のユーザー情報 { id: string, name: string }

  const navigate = useNavigate();
  const { setSelectedUsers: setGlobalSelectedUsers } = useSelectedUser();

  // --- メンバーリスト取得 ---
  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/list_base_audio`);
      if (!response.ok) {
        // APIからのエラーレスポンスを試みる
        let errorDetails = `HTTPステータス: ${response.status}`;
        try {
          const errorData = await response.json();
          errorDetails = errorData?.details || errorData?.error || errorDetails;
        } catch (jsonError) {
          // JSON解析失敗時はステータスのみ
        }
        throw new Error(`メンバーリストの取得に失敗しました (${errorDetails})`);
      }
      const data = await response.json();
      if (data.status === "success" && Array.isArray(data.id)) {
        const formattedUsers = data.id.map((name) => ({ id: name, name: name }));
        setUsers(formattedUsers);
      } else {
        throw new Error(data.details || data.error || "受信データ形式が無効です");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.message); // ユーザーにエラーを通知
      setUsers([]); // エラー時はリストを空にする
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 初回マウント時に実行

  // --- チェックボックス操作 ---
  const toggleUserSelection = (userId) => {
    // API操作中はチェックボックスを変更できないようにする
    if (isProcessing) return;
    setError(null); // 操作時にエラーをクリア
    setLocalSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const selectAllUsers = () => {
    if (isProcessing) return;
    setError(null);
    setLocalSelectedUsers(users.map((user) => user.id));
  };

  const deselectAllUsers = () => {
    if (isProcessing) return;
    setError(null);
    setLocalSelectedUsers([]);
  };

  // --- 「選択して次へ」処理 ---
  const proceedWithSelectedUsers = async () => {
    if (localSelectedUsers.length === 0 || isProcessing) {
      return; // 選択されていない、または処理中は実行しない
    }
    setIsProcessing(true); // 処理開始
    setError(null);
    console.log("「選択して次へ」処理開始:", localSelectedUsers);

    // (任意) サーバーへの通知
    try {
      const response = await fetch(`${API_BASE_URL}/select_users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ users: localSelectedUsers }),
      });
      if (!response.ok) {
         console.warn("サーバーへの選択情報送信に失敗 (無視して続行)", await response.text());
      } else {
         console.log("サーバーへの選択情報送信成功:", await response.json());
      }
    } catch (apiError) {
       console.error("サーバーへの選択情報送信中にエラー (無視して続行):", apiError);
    }

    // Context更新と画面遷移
    try {
      setGlobalSelectedUsers(localSelectedUsers); // グローバル状態を更新
      console.log("グローバル選択ユーザー更新完了");
      navigate('/'); // ルートパスへ遷移
    } catch (err) {
       console.error("Context更新またはナビゲーションエラー:", err);
       setError("画面遷移中にエラーが発生しました。"); // ユーザーに通知
       setIsProcessing(false); // 処理状態を解除
    }
    // setIsProcessing(false); // 非同期遷移の場合、遷移後に解除が難しいので一旦コメントアウト
  };

  // --- 削除処理 ---
  const handleDeleteClick = (user) => {
    if (isProcessing) return; // 処理中は実行しない
    console.log("削除ボタンクリック:", user);
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete || isProcessing) return; // 対象がない、または処理中は実行しない

    setIsProcessing(true); // 処理開始
    setError(null);
    console.log("削除確認 API呼び出し開始:", userToDelete.name);

    try {
      const response = await fetch(`${API_BASE_URL}/reset_member`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ names: [userToDelete.name] }),
      });

      let result; // APIの結果を格納する変数

      if (!response.ok) {
        // APIエラーの場合
        let errorDetails = `HTTPステータス: ${response.status}`;
        try {
          const errorData = await response.json();
          errorDetails = errorData?.message || errorData?.details || errorData?.error || errorDetails;
        } catch (jsonError) { /* JSON解析失敗 */ }
        throw new Error(`メンバー削除に失敗しました (${errorDetails})`);
      } else {
        // API成功の場合
        result = await response.json();
        console.log("メンバー削除 APIレスポンスデータ:", result);
      }

      // API呼び出し成功後の処理 (resultが存在する場合)
      if (result && result.status === "success") {
        console.log("サーバーでのメンバー削除成功。ローカルstate更新");
        // users ステートから削除
        setUsers(prevUsers => prevUsers.filter((user) => user.id !== userToDelete.id));
        // localSelectedUsers ステートからも削除
        setLocalSelectedUsers(prevSelected => prevSelected.filter((id) => id !== userToDelete.id));
        setShowDeleteModal(false);
        setUserToDelete(null);
      } else if (result) {
        // APIは成功したが、statusがsuccessでない場合
        throw new Error(result.message || result.details || result.error || "サーバーでのメンバー削除に失敗しました");
      }
      // APIエラーの場合は上のthrow new Errorでcatchブロックに飛ぶ

    } catch (err) {
      console.error("confirmDelete 関数内でエラー発生:", err);
      setError(err.message); // ユーザーにエラーを通知
      // モーダルは閉じても良いが、ユーザーにエラーを認識させる
      // setShowDeleteModal(false);
      // setUserToDelete(null);
    } finally {
      setIsProcessing(false); // 処理完了
    }
  };

  // --- JSX ---
  return (
    <div className="container member-select-container">
      <h1>会話分析に使用するメンバーを選択</h1>

      {/* エラーメッセージ表示 */}
      {error && <div className="error-message">{error}</div>}

      {/* ローディング表示 (メンバーリスト取得中) */}
      {isLoading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>メンバーリストを読み込み中...</p>
        </div>
      ) : (
        // メンバーリスト取得後の表示
        <>
          <div className="select-controls">
            <button
              className="select-button"
              onClick={selectAllUsers}
              disabled={isLoading || isProcessing || users.length === 0}
            >
              すべて選択
            </button>
            <button
              className="select-button"
              onClick={deselectAllUsers}
              disabled={isLoading || isProcessing || localSelectedUsers.length === 0}
            >
              選択解除
            </button>
          </div>

          {/* ユーザーリスト表示 */}
          <div className="user-list">
            {users.length === 0 ? (
              <div className="no-users">登録されているメンバーはいません</div>
            ) : (
              users.map((user) => (
                <div key={user.id} className={`user-item ${isProcessing ? 'disabled' : ''}`}> {/* 処理中は見た目を無効化 */}
                  <input
                    type="checkbox"
                    id={`user-${user.id}`}
                    checked={localSelectedUsers.includes(user.id)}
                    onChange={() => toggleUserSelection(user.id)}
                    disabled={isProcessing} // 処理中は無効化
                  />
                  <label htmlFor={`user-${user.id}`}>
                    <div className="user-avatar">{user.name.charAt(0)}</div>
                    {user.name}
                  </label>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteClick(user)}
                    aria-label={`${user.name} を削除`}
                    disabled={isProcessing} // 処理中は無効化
                  >
                    {/* FontAwesomeを使用 */}
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* 選択中人数表示 */}
          <div className="selected-count">選択中: {localSelectedUsers.length}人</div>

          {/* 操作ボタン */}
          <div className="button-container">
            <a href="/userregister" className={`button secondary ${isProcessing ? 'disabled' : ''}`}> {/* 処理中は非推奨の見た目に */}
              新規登録
            </a>
            <button
              onClick={proceedWithSelectedUsers}
              className="button" // 標準ボタンクラス（適宜変更）
              disabled={localSelectedUsers.length === 0 || isLoading || isProcessing}
            >
              {isProcessing ? '処理中...' : '選択して次へ'}
            </button>
          </div>
        </>
      )}

      {/* 削除確認モーダル */}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-title">メンバーの削除</div>
            <div className="modal-text">
              {userToDelete?.name} を削除しますか？<br/>
              <small>（この操作は取り消せません）</small>
            </div>
            <div className="modal-buttons">
              <button
                className="modal-cancel"
                onClick={() => !isProcessing && setShowDeleteModal(false)} // 処理中は閉じさせない
                disabled={isProcessing}
              >
                キャンセル
              </button>
              <button
                className="modal-delete"
                onClick={confirmDelete}
                disabled={isProcessing}
              >
                {isProcessing ? '削除中...' : '削除'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}