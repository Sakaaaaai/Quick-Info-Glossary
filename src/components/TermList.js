import React, { useState } from 'react';
import { Star } from 'lucide-react';

const TermList = ({ terms, setSelectedTerm, toggleFavorite, favorites }) => {
  const [showFavorites, setShowFavorites] = useState(false);

  const favoriteTerms = terms.filter(term => favorites.includes(term.id));

  const renderTermList = (termList) => (
    <ul className="space-y-2">
      {termList.map(term => (
        <li key={term.id} className="cursor-pointer hover:bg-gray-200 p-2 rounded flex items-center" onClick={() => setSelectedTerm(term)}>
          <Star
            className={`mr-2 cursor-pointer ${favorites.includes(term.id) ? 'text-yellow-500' : 'text-gray-400'}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(term.id);
            }}
            size={16}
          />
          {term.name}
        </li>
      ))}
    </ul>
  );

  return (
    <nav className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">用語一覧</h2>
        <button
          className={`flex items-center ${showFavorites ? 'text-yellow-500' : 'text-gray-500'}`}
          onClick={() => setShowFavorites(!showFavorites)}
        >
          <Star size={20} className="mr-1" />
          お気に入り
        </button>
      </div>
      {showFavorites ? (
        favoriteTerms.length > 0 ? (
          renderTermList(favoriteTerms)
        ) : (
          <p className="text-gray-500">お気に入りはまだありません。</p>
        )
      ) : (
        renderTermList(terms)
      )}
    </nav>
  );
};

export default TermList;