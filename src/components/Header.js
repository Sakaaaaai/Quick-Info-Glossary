import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { signInWithGoogle } from '../firebase';

export default function Header({
  user,
  setUser,
  handleLogout,
  onSearch,
  searchResults,
  setSelectedTerm,
  onHomeClick,
  searchTerm,
  setSearchTerm,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleResultClick = (term) => {
    setSelectedTerm(term);
    setIsSearchOpen(false);
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithGoogle();
      console.log('Googleでログイン成功:', userCredential);
      setUser(userCredential.user);
    } catch (error) {
      console.error('Googleアカウントでのログインに失敗しました:', error);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        document.querySelector('input[type="text"]')?.focus();
      }, 100);
    }
  };

  return (
    <header className="bg-blue-500 text-white p-4 fixed top-0 left-0 right-0 z-[70] shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h1
            className="text-2xl font-bold cursor-pointer hover:text-opacity-80 transition-colors duration-200"
            onClick={onHomeClick}
          >
            Quick Info Glossary
          </h1>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSearch}
              className="md:hidden"
              aria-label="検索"
            >
            </button>

            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="検索..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="py-1 px-2 rounded text-blue-500 bg-white w-64 text-sm h-8"
              />
              {searchTerm && (
                <div className="absolute bg-gray-200 text-gray-800 p-2 rounded mt-1 w-64 shadow-md z-10">
                  {searchResults && searchResults.length > 0 ? (
                    <ul>
                      {searchResults.map((result, index) => (
                        <li
                          key={index}
                          className="cursor-pointer hover:bg-gray-300 p-1 rounded text-sm"
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

            {user ? (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm">ようこそ、{user.displayName}さん</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-sm"
                >
                  ログアウト
                </button>
              </div>
            ) : (
              <button
                onClick={handleGoogleLogin}
                className="hidden md:block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-sm"
              >
                ログイン
              </button>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
              aria-label="メニュー"
            >
              {isMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            {user ? (
              <div className="space-y-2">
                <p className="text-sm text-white">ようこそ、{user.displayName}さん</p>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-sm w-full"
                >
                  ログアウト
                </button>
              </div>
            ) : (
              <button
                onClick={handleGoogleLogin}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-sm w-full"
              >
                ログイン
              </button>
            )}
            <div className="mt-4 relative">
              <input
                type="text"
                placeholder="検索..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="py-1 px-2 rounded text-blue-500 bg-white w-full text-sm h-8"
              />
              {searchTerm && (
                <div className="absolute bg-gray-200 text-gray-800 p-2 rounded mt-1 w-full shadow-md z-10">
                  {searchResults && searchResults.length > 0 ? (
                    <ul>
                      {searchResults.map((result, index) => (
                        <li
                          key={index}
                          className="cursor-pointer hover:bg-gray-300 p-1 rounded text-sm"
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
          </nav>
        )}
      </div>
    </header>
  );
}

