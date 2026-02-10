import React, { useState } from 'react';
import { 
  Layout, 
  Search, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  Book,
  Scale,
  Store 
} from 'lucide-react';

export default function Component() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentExample, setCurrentExample] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [explanation, setExplanation] = useState('具体例を見て、商標権の保護対象について理解しましょう。');

  const trademarkLawOverview = {
    purpose: '商標権は、商品・サービスの出所を識別する標識を保護し、事業者の信用維持と需要者の利益保護を図ることで、産業の発達に寄与することを目的とする知的財産権です。',
    keyPoints: [
      {
        title: '保護対象',
        items: [
          '文字商標（社名、ブランド名等）',
          '図形商標（ロゴ、マーク等）',
          '結合商標（文字と図形の組み合わせ）',
          '色彩、音、動き、位置、ホログラム商標'
        ]
      },
      {
        title: '登録要件',
        items: [
          '識別力があること',
          '他人の登録商標と類似していないこと',
          '公序良俗に反しないこと',
          '指定商品・役務の明確性'
        ]
      },
      {
        title: '権利の効力',
        items: [
          '指定商品・役務での独占的使用権',
          '類似商品・役務への効力',
          '侵害に対する差止請求権',
          '存続期間は10年（更新可能）'
        ]
      }
    ]
  };

  const examples = [
    {
      title: 'ブランドロゴ',
      target: ['文字デザイン', 'シンボルマーク', 'カラースキーム', 'レイアウト'],
      icon: <Store className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />,
      protected: [
        'デザイン化された文字商標',
        '特徴的なロゴマーク',
        'ブランドカラーの組み合わせ',
        '文字とシンボルの配置関係'
      ],
      unprotected: [
        '一般的な文字の書体',
        'ありふれた図形',
        '機能的な形状',
        '普通に用いられる色彩'
      ],
      explanation: 'ブランドロゴは、文字や図形、色彩等を組み合わせた識別力のある標識として商標保護の対象となります。'
    },
    {
      title: '店舗外観',
      target: ['店舗デザイン', '看板配置', '色彩構成', 'ファサード'],
      icon: <Layout className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />,
      protected: [
        '特徴的な店舗外観デザイン',
        'トレードドレス',
        'ユニークな看板デザイン',
        '識別力のある装飾要素'
      ],
      unprotected: [
        '一般的な建築様式',
        '機能的な構造要素',
        '通常の店舗レイアウト',
        '実用的な設備配置'
      ],
      explanation: '店舗外観は、事業者の出所を示す識別標識として機能する場合、商標として保護されることがあります。'
    },
    {
      title: 'パッケージデザイン',
      target: ['商品容器', 'ラベルデザイン', '立体的形状', '全体的外観'],
      icon: <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />,
      protected: [
        'distinctive な容器形状',
        '特徴的なラベルデザイン',
        'ユニークな包装形態',
        '商品全体の外観デザイン'
      ],
      unprotected: [
        '商品の機能に由来する形状',
        '一般的な容器形状',
        '普通に用いられる包装形態',
        '商品の性質から必然的な形状'
      ],
      explanation: 'パッケージデザインは、商品の出所を識別する機能を持つ場合、立体商標等として保護されます。'
    }
  ];

  const resetExample = () => {
    setShowResult(false);
    setCurrentExample((prev) => (prev + 1) % examples.length);
    setExplanation('新しい例が設定されました。確認ボタンを押して詳細を見てみましょう。');
  };

  const checkDetails = () => {
    setShowResult(true);
    setExplanation(examples[currentExample].explanation);
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-purple-800 flex items-center justify-center gap-2">
        商標権
      </h2>

      <div className="flex gap-2 mb-4 sm:mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 px-2 sm:px-4 rounded-t-lg font-semibold text-sm sm:text-base ${
            activeTab === 'overview'
              ? 'bg-white text-purple-700 shadow-lg'
              : 'bg-purple-200 text-purple-900'
          }`}
        >
          制度の概要
        </button>
        <button
          onClick={() => setActiveTab('examples')}
          className={`flex-1 py-2 px-2 sm:px-4 rounded-t-lg font-semibold text-sm sm:text-base ${
            activeTab === 'examples'
              ? 'bg-white text-purple-700 shadow-lg'
              : 'bg-purple-200 text-purple-900'
          }`}
        >
          具体例で学ぶ
        </button>
      </div>

      {activeTab === 'overview' ? (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <div className="mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-purple-800 flex items-center gap-2 mb-3">
                <Book className="text-purple-600" />
                商標権とは
              </h3>
            </div>
            <p className="text-base sm:text-lg mb-4 bg-purple-50 p-4 rounded-lg">
              {trademarkLawOverview.purpose}
            </p>
          </div>

          {trademarkLawOverview.keyPoints.map((point, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-purple-800 flex items-center gap-2 mb-3">
                  {index === 0 ? (
                    <FileText className="text-purple-600" />
                  ) : index === 1 ? (
                    <Search className="text-purple-600" />
                  ) : (
                    <Scale className="text-purple-600" />
                  )}
                  {point.title}
                </h3>
                <ul className="space-y-2">
                  {point.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="text-purple-600 flex-shrink-0" />
                      <span className="text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-purple-800 flex items-center gap-2 mb-3">
                {examples[currentExample].icon}
                {examples[currentExample].title}
              </h3>

              <div className="mb-4">
                <h4 className="text-base sm:text-lg font-bold mb-2">デザイン要素：</h4>
                <div className="flex flex-wrap gap-2">
                  {examples[currentExample].target.map((item, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-1 bg-purple-200 rounded-full text-purple-800 text-xs sm:text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {showResult && (
                <div className="mt-4 sm:mt-6 space-y-4">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold mb-2 text-green-700">商標保護の対象となるもの：</h4>
                    <ul className="space-y-2">
                      {examples[currentExample].protected.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-green-800"
                        >
                          <CheckCircle className="text-green-600 flex-shrink-0" />
                          <span className="text-sm sm:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold mb-2 text-red-700">商標保護の対象とならないもの：</h4>
                    <ul className="space-y-2">
                      {examples[currentExample].unprotected.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-red-800"
                        >
                          <AlertCircle className="text-red-600 flex-shrink-0" />
                          <span className="text-sm sm:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg mb-4 sm:mb-6">
            <p className="text-base sm:text-lg font-semibold text-purple-800">説明：</p>
            <p className="text-sm sm:text-base">{explanation}</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={checkDetails}
              disabled={showResult}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 text-white rounded-full text-sm sm:text-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 transition-colors duration-300"
            >
              詳細を確認
            </button>
            <button
              onClick={resetExample}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-full text-sm sm:text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
              次の例
            </button>
          </div>
        </>
      )}
    </div>
  );
}