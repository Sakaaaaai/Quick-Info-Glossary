import React, { useState } from 'react';
import TermDetails from './TermDetails';
import Quiz from './Quiz';

const MainComponents = ({ 
  categories,
  allTerms,
  setSelectedTerm,
  favorites,
  toggleFavorite,
  startQuiz,
  quizMode,
  quizQuestion,
  quizResult,
  answerQuiz,
  nextQuestion,
  endQuiz,
  updateTermOrder
}) => {
  // 各カテゴリーに対応するサブカテゴリーを定義
  const subCategories = {
    '情報技術の基礎': ['プログラミング', 'データベース', 'ネットワーク'],
    'データサイエンス': ['データの扱い', '統計手法', '機械学習'],
    '情報社会とセキュリティ': ['情報社会', '情報セキュリティ', '情報モラル'],
    'コンテンツとコミュニケーション': ['情報デザイン', 'コンテンツ制作'],
    '問題解決とシステム': ['システム設計', 'プロジェクト管理'],
  };

  const images = {
    '情報技術の基礎': '/images/情報技術の基礎.png',
    'データサイエンス': '/images/データサイエンス.png',
    '情報社会とセキュリティ': '/images/情報社会とセキュリティ.png',
    'コンテンツとコミュニケーション': '/images/コンテンツとコミュニケーション.png',
    '問題解決とシステム': '/images/問題解決とシステム.png',
    'プログラミング': '/images/プログラミング.png',
    'データベース': '/images/データベース.png',
    'ネットワーク': '/images/ネットワーク.png',
    'データの扱い': '/images/データの扱い.png',
    '統計手法': '/images/統計手法.png',
    '機械学習': '/images/機械学習.png',
    '情報社会': '/images/情報社会.png',
    '情報セキュリティ': '/images/情報セキュリティ.png',
    '情報モラル': '/images/情報モラル.png',
    '情報デザイン': '/images/情報デザイン.png',
    'コンテンツ制作': '/images/コンテンツ制作.png',
    'システム設計': '/images/システム設計.png',
    'プロジェクト管理': '/images/プロジェクト管理.png',
  };

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [localSelectedTerm, setLocalSelectedTerm] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    setLocalSelectedTerm(null);
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setLocalSelectedTerm(null);
  };

  const handleTermClick = (term) => {
    setLocalSelectedTerm(term);
    setSelectedTerm(term);
    updateTermOrder(term.id);  
  };

  const filteredTerms = allTerms.filter(term => term.subcategory === selectedSubcategory);

  const Breadcrumbs = () => (
    <div className="text-lg text-blue-600 mb-4">
      {selectedSubcategory ? (
        <>
          <span className="cursor-pointer hover:underline" onClick={() => {
            setSelectedSubcategory(null);
            setLocalSelectedTerm(null);
          }}>
            {selectedCategory}
          </span>
          {' > '}
          <span className="font-bold">{selectedSubcategory}</span>
        </>
      ) : (
        <>
          <span className="cursor-pointer hover:underline" onClick={() => {
            setSelectedCategory(null);
            setSelectedSubcategory(null);
            setLocalSelectedTerm(null);
          }}>
            メインカテゴリー
          </span>
          {selectedCategory && (
            <>
              {' > '}
              <span className="font-bold">{selectedCategory}</span>
            </>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="w-full max-w-4xl h-full overflow-y-auto">
        <Breadcrumbs />
        {localSelectedTerm ? (
          quizMode ? (
            <Quiz 
              quizQuestion={quizQuestion} 
              quizResult={quizResult} 
              answerQuiz={answerQuiz} 
              nextQuestion={nextQuestion} 
              endQuiz={endQuiz}
            />
          ) : (
            <TermDetails
              selectedTerm={localSelectedTerm}
              startQuiz={startQuiz}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          )
        ) : selectedSubcategory ? (
          <div>
            <h2 className="text-xl font-bold mb-4">{selectedSubcategory}</h2>
            <div className="grid grid-cols-3 gap-4">
              {filteredTerms.length > 0 ? (
                filteredTerms.map((term) => (
                  <div
                    key={term.id}
                    className="p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 hover:border-blue-500 transition-colors"
                    onClick={() => handleTermClick(term)}
                  >
                    <p className="text-blue-600 font-medium text-lg text-center">{term.name}</p>
                  </div>
                ))
              ) : (
                <p>このサブカテゴリーには単語がありません。</p>
              )}
            </div>
          </div>
        ) : selectedCategory ? (
          <div className="grid grid-cols-3 gap-6 pb-6">
            {subCategories[selectedCategory].map((subcategory, index) => (
              <div 
                key={index}
                className="aspect-square bg-blue-100 text-blue-800 rounded-lg shadow-md hover:bg-blue-200 transition-colors duration-200 flex flex-col items-center justify-center text-xl font-semibold p-4"
                onClick={() => handleSubcategoryClick(subcategory)}
              >
                <img
                  src={images[subcategory]}
                  alt={subcategory}
                  className="w-40 h-40 mb-4"
                />
                {subcategory}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6 pb-6">
            {Object.keys(subCategories).map((category, index) => (
              <div 
                key={index}
                className="aspect-square bg-blue-100 text-blue-800 rounded-lg shadow-md hover:bg-blue-200 transition-colors duration-200 flex flex-col items-center justify-center text-xl font-semibold p-4"
                onClick={() => handleCategoryClick(category)}
              >
                <img
                  src={images[category]}
                  alt={category}
                  className="w-40 h-40 mb-4"
                />
                {category}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainComponents;