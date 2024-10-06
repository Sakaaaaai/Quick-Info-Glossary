import React, { useState } from 'react';
import { Star } from 'lucide-react';

const TermList = ({ terms, setSelectedTerm, toggleFavorite, favorites, termOrder }) => {
  const [showFavorites, setShowFavorites] = useState(false);

  const favoriteTerms = terms.filter(term => favorites.includes(term.id));

  // termOrderを使用して、選択された用語を新しい順に並べる
  const sortedTerms = termOrder.map(id => terms.find(term => term.id === id)).filter(Boolean);

  const renderTermList = (termList) => (
    <ul className="space-y-2">
      {termList.map(term => (
        <li
          key={term.id}
          className="flex items-center justify-between p-2 border rounded-md cursor-pointer transition-colors duration-200 hover:bg-gray-200" // hoverで背景色を変更
          onClick={() => setSelectedTerm(term)}
        >
          <span>{term.name}</span>
          <button
            onClick={(e) => {
              e.stopPropagation(); // お気に入りのトグル時に用語が選択されないようにする
              toggleFavorite(term.id);
            }}
          >
            <Star className={`w-5 h-5 ${favorites.includes(term.id) ? 'text-yellow-400' : 'text-gray-400'}`} />
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <aside className="w-1/4 p-4 bg-gray-100 border-r overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">用語一覧</h2>
        <button className="text-blue-500" onClick={() => setShowFavorites(!showFavorites)}>
          {showFavorites ? 'すべて表示' : 'お気に入りを表示'}
        </button>
      </div>
      {showFavorites ? renderTermList(favoriteTerms) : renderTermList(sortedTerms)}
    </aside>
  );
};

export default TermList;
