import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import IconMenu from "./../components/IconMenu";
import "./../stylesheet/MemberSelect.css";

export default function MemberSelect() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setIsLoading(false);
    }
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const selectAllUsers = () => {
    setSelectedUsers(users.map((user) => user.id));
  };

  const deselectAllUsers = () => {
    setSelectedUsers([]);
  };

  const proceedWithSelectedUsers = () => {
    if (selectedUsers.length > 0) {
      // 選択されたユーザーIDを次のページに渡す処理を実装
      navigate("/next-page", { state: { selectedUsers } });
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(`/api/users/${userToDelete.id}`, {
        method: "DELETE",
      });
      setUsers(users.filter((user) => user.id !== userToDelete.id));
      setSelectedUsers(selectedUsers.filter((id) => id !== userToDelete.id));
      setShowDeleteModal(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container">
      <button className="menu-button" onClick={() => setShowMenu(!showMenu)}>
        <i className="fas fa-bars"></i>
      </button>

      {showMenu && <IconMenu onClose={() => setShowMenu(false)} />}

      <h1>会話分析に使用するメンバーを選択</h1>

      <div className="select-controls">
        <button className="select-button" onClick={selectAllUsers}>
          すべて選択
        </button>
        <button className="select-button" onClick={deselectAllUsers}>
          選択解除
        </button>
      </div>

      <div className="user-list">
        {isLoading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>メンバーリストを読み込み中...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="no-users">登録されているメンバーはいません</div>
        ) : (
          users.map((user) => (
            <div key={user.id} className="user-item">
              <input
                type="checkbox"
                id={`user-${user.id}`}
                checked={selectedUsers.includes(user.id)}
                onChange={() => toggleUserSelection(user.id)}
              />
              <label htmlFor={`user-${user.id}`}>
                <div className="user-avatar">{user.name.charAt(0)}</div>
                {user.name}
              </label>
              <button
                className="delete-button"
                onClick={() => handleDeleteClick(user)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))
        )}
      </div>

      <div className="selected-count">選択中: {selectedUsers.length}人</div>

      <div className="button-container">
        <Link to="/userregister">
          <button className="secondary">新規登録</button>
        </Link>
        <button
          onClick={proceedWithSelectedUsers}
          disabled={selectedUsers.length === 0}
        >
          選択して次へ
        </button>
      </div>

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-title">メンバーの削除</div>
            <div className="modal-text">
              {userToDelete?.name}を削除しますか？
            </div>
            <div className="modal-buttons">
              <button
                className="modal-cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                キャンセル
              </button>
              <button className="modal-delete" onClick={confirmDelete}>
                削除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
