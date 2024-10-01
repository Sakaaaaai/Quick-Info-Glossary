import React, { useState } from 'react';
import { signInWithGoogle } from '../firebase'; // FirebaseからGoogle認証関数をインポート

const Header = ({ user, setUser, handleLogout, onSearch, searchResults, setSelectedTerm, onHomeClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // 検索ワードが変わるたびに検索を実行
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);      // 入力された文字を保持
    onSearch(term);           // 入力時にリアルタイムで検索
  };

  const handleResultClick = (term) => {
    setSelectedTerm(term);    // 選択した単語をセット
    setSearchTerm('');        // 検索バーをクリア
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithGoogle();
      console.log('Googleでログイン成功:', userCredential);
      setUser(userCredential.user);  // ユーザー情報をセット
    } catch (error) {
      console.error('Googleアカウントでのログインに失敗しました:', error);
    }
  };

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <h1 
          className="text-2xl font-bold mb-2 sm:mb-0 cursor-pointer hover:text-blue-200 transition-colors duration-200"
          onClick={onHomeClick}  // クリックイベントを追加
        >
          見る単語帳：情報
        </h1>

        <div className="w-full sm:w-auto mb-2 sm:mb-0 relative">
          <div className="flex">
            <input
              type="text"
              placeholder="検索..."
              value={searchTerm}
              onChange={handleSearchChange}  
              className="py-1 px-2 rounded text-black w-full sm:w-64 text-sm h-8"
            />
          </div>
          
          {searchTerm && (
            <div className="absolute bg-white text-black p-2 rounded mt-1 w-full sm:w-64 shadow-md z-10">
              {searchResults && searchResults.length > 0 ? (
                <ul>
                  {searchResults.map((result, index) => (
                    <li
                      key={index}
                      className="cursor-pointer hover:bg-gray-200 p-1 rounded text-sm"
                      onClick={() => handleResultClick(result)}
                    >
                      {result.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm">検索結果がありません。</p>
              )}
            </div>
          )}
        </div>

        <nav>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm">ようこそ、{user.displayName}さん</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                ログアウト
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <button
                onClick={handleGoogleLogin}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                ログイン
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
