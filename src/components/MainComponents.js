import React, { useState } from 'react';

const MainComponents = () => {
  // 各カテゴリーに対応するサブカテゴリーを定義
  const subCategories = {
    '情報技術の基礎': ['プログラミング', 'データベース', 'ネットワーク'],
    'データサイエンス': ['データの扱い', '統計手法', '機械学習'],
    '情報社会とセキュリティ': ['情報社会', '情報セキュリティ', '情報モラル'],
    'コンテンツとコミュニケーション': ['情報デザイン', 'コンテンツ制作'],
    '問題解決とシステム': ['システム設計', 'プロジェクト管理'],
  };

  // カテゴリーとサブカテゴリーに対応する画像パスを定義（例としてローカル画像パスを使用）
  const images = {
    '情報技術の基礎': '/images/情報技術の基礎.png',
    'データサイエンス': '/images/データサイエンス.png',
    '情報社会とセキュリティ': '/images/情報社会とセキュリティ.png',
    'コンテンツとコミュニケーション': '/images/コンテンツとコミュニケーション.png',
    '問題解決とシステム': '/images/問題解決とシステム.png',
    // サブカテゴリーに対応する画像パスも追加
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

  // カテゴリーと選択されたサブカテゴリーを管理するstate
  const [selectedCategory, setSelectedCategory] = useState(null);

  // カテゴリーがクリックされたときにサブカテゴリーを表示
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // サブカテゴリーがある場合、そのリストを表示
  const displayedCategories = selectedCategory ? subCategories[selectedCategory] : Object.keys(subCategories);

  // パンくずリストの表示
  const Breadcrumbs = () => (
    <div className="text-lg text-blue-600 mb-4"> {/* 文字サイズを大きく */}
      <span 
        className="cursor-pointer hover:underline"
        onClick={() => setSelectedCategory(null)} // メインカテゴリーに戻る
      >
        メインカテゴリー
      </span>
      {selectedCategory && (
        <>
          {' > '}
          <span className="font-bold">{selectedCategory}</span>
        </>
      )}
    </div>
  );

  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="w-full max-w-4xl h-full overflow-y-auto">
        {/* パンくずリストを表示 */}
        <Breadcrumbs />
        <div className="grid grid-cols-3 gap-6 pb-6">
          {displayedCategories.map((category, index) => (
            <div 
              key={index} 
              className="aspect-square bg-blue-100 text-blue-800 rounded-lg shadow-md hover:bg-blue-200 transition-colors duration-200 flex flex-col items-center justify-center text-xl font-semibold p-4"
              onClick={() => !selectedCategory && handleCategoryClick(category)} // カテゴリークリック時のみ反応
            >
              {/* カテゴリーまたはサブカテゴリーに対応する画像を表示 */}
              <img 
                src={images[category]} 
                alt={category} 
                className="w-40 h-40 mb-4" // 画像を大きく表示
              />
              {category}
            </div>
          ))}
        </div>
        {/* 戻るボタンを表示して、メインカテゴリーに戻る */}
        {selectedCategory && (
          <button 
            onClick={() => setSelectedCategory(null)} 
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            戻る
          </button>
        )}
      </div>
    </div>
  );
};

export default MainComponents;
