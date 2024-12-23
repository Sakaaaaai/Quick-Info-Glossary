import React, { useState } from 'react';
import { Star, X } from 'lucide-react';

export default function TermList({
  terms = [],
  setSelectedTerm = () => {},
  toggleFavorite = () => {},
  termOrder = []
}) {
  const [showFavorites, setShowFavorites] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 初期状態をローカルストレージから取得
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const favoriteTerms = terms ? terms.filter(term => favorites.includes(term.id)) : [];

  const sortedTerms = terms
    ? termOrder
        .map(id => terms.find(term => term.id === id))
        .filter(Boolean)
        .slice(0, 10)
    : [];

  // お気に入りの更新とローカルストレージへの保存
  const handleToggleFavorite = (id) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter(favId => favId !== id) // 削除
      : [...favorites, id]; // 追加

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const renderTermList = (termList) => (
    <ul className="space-y-2">
      {termList.map(term => (
        <li
          key={term.id}
          className="flex items-center justify-between p-2 border rounded-md cursor-pointer transition-colors duration-200 hover:bg-gray-200"
          onClick={() => {
            setSelectedTerm(term);
            setIsDrawerOpen(false);
          }}
        >
          <span>{term.name}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFavorite(term.id); // ローカルストレージ対応版
            }}
            aria-label={favorites.includes(term.id) ? "お気に入りから削除" : "お気に入りに追加"}
          >
            <Star className={`w-5 h-5 ${favorites.includes(term.id) ? 'text-yellow-400' : 'text-gray-400'}`} />
          </button>
        </li>
      ))}
    </ul>
  );

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <>
      {/* モバイル用トグルボタン */}
      <button
        className="fixed bottom-4 right-4 z-50 md:hidden bg-blue-500 text-white px-4 py-2 rounded-full shadow-md"
        onClick={toggleDrawer}
        aria-label="用語一覧を開く"
      >
        用語一覧
      </button>

      {/* モバイル用背景のオーバーレイ */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleDrawer}
        ></div>
      )}

      {/* 用語一覧（サイドバー/ドロワー） */}
      <aside
        className={`fixed top-[4rem] left-0 h-[calc(100%-4rem)] w-64 bg-gray-100 p-4 overflow-y-auto transition-transform duration-300 ease-in-out z-[60]
          ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:w-1/4 md:border-r`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">用語一覧</h2>
          <button
            className="text-blue-500 md:hidden"
            onClick={toggleDrawer}
            aria-label="用語一覧メニューを閉じる"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <button
          className="text-blue-500 mb-4"
          onClick={() => setShowFavorites(!showFavorites)}
        >
          {showFavorites ? 'すべて表示' : 'お気に入りを表示'}
        </button>
        {terms && (showFavorites ? renderTermList(favoriteTerms) : renderTermList(sortedTerms))}
      </aside>
    </>
  );
}
