import React from 'react';
import { Star } from 'lucide-react';
import BinarySearchVisualization from '../data/BinarySearchVisualization';

const TermDetails = ({ selectedTerm, startQuiz, favorites, toggleFavorite }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center">
          <Star
            className={`mr-2 cursor-pointer ${
              favorites.includes(selectedTerm.id) ? 'text-yellow-500' : 'text-gray-400'
            }`}
            onClick={() => toggleFavorite(selectedTerm.id)}
            size={24}
          />
          {selectedTerm.name}
        </h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded transition-colors duration-200 hover:bg-green-600"
          onClick={startQuiz}
        >
          クイズに挑戦
        </button>
      </div>
      <p className="text-lg mb-4">{selectedTerm.description}</p>
      <div dangerouslySetInnerHTML={{ __html: selectedTerm.content }} />
      {selectedTerm.name === "二分法探索" && <BinarySearchVisualization />}
    </div>
  );
};

export default TermDetails;
