import React, { useState } from 'react';

const Header = ({ user, setIsLoginOpen, setIsRegisterOpen, handleLogout, onSearch, searchResults, setSelectedTerm }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleResultClick = (term) => {
    setSelectedTerm(term);
    setSearchTerm(''); // 検索バーをクリアする
  };

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">見る単語帳：情報</h1>
        <form onSubmit={handleSearch} className="w-full sm:w-auto mb-2 sm:mb-0">
          <div className="flex">
            <input
              type="text"
              placeholder="検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 rounded-l text-black w-full sm:w-auto"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r"
            >
              検索
            </button>
          </div>
        </form>

        <nav>
          {user ? (
            <div className="flex items-center space-x-4">
              <span>ようこそ、{user.username}さん</span>
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
                onClick={() => setIsLoginOpen(true)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                ログイン
              </button>
              <button
                onClick={() => setIsRegisterOpen(true)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              >
                新規登録
              </button>
            </div>
          )}
        </nav>
      </div>

      {/* 検索結果の表示 */}
      {searchTerm && (
        <div className="bg-white text-black p-2 rounded mt-2 w-full sm:w-auto max-w-sm mx-auto">
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((term) => (
                <li
                  key={term.id}
                  className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                  onClick={() => handleResultClick(term)}
                >
                  {term.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>検索結果がありません。</p>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
