import React, { useState } from 'react';
import { Eye, Layout, AlertCircle, CheckCircle, RefreshCw, Book, Scale, Smartphone, Watch, Car } from 'lucide-react';

export default function Component() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentExample, setCurrentExample] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [explanation, setExplanation] = useState('具体例を見て、意匠権の保護対象について理解しましょう。');

  const designLawOverview = {
    purpose: '意匠権は、製品の外観デザインを保護する知的財産権です。創作者の権利を守り、産業の発展に寄与することを目的としています。',
    keyPoints: [
      {
        title: '保護対象',
        items: [
          '物品の形状、模様、色彩またはこれらの結合',
          '画像デザイン（GUIなど）',
          '建築物のデザイン',
          'インテリアデザイン'
        ]
      },
      {
        title: '登録要件',
        items: [
          '工業上利用可能性があること',
          '新規性があること',
          '創作性があること',
          '公序良俗に反しないこと'
        ]
      },
      {
        title: '権利の効力',
        items: [
          '独占的に実施できる権利',
          '権利侵害に対する差止請求権',
          '損害賠償請求権',
          '存続期間は設定登録から最長25年'
        ]
      }
    ]
  };

  const examples = [
    {
      title: 'スマートフォンのデザイン',
      target: ['本体の形状', '画面のレイアウト', 'アイコンデザイン', '操作画面の遷移アニメーション'],
      icon: <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />,
      protected: [
        '端末本体の形状や色彩',
        'ユーザーインターフェースのデザイン',
        'アイコンや操作ボタンのデザイン',
        '画面遷移のアニメーション'
      ],
      unprotected: [
        '技術的機能そのもの',
        'OS の機能',
        'プログラムのソースコード',
        '一般的な長方形の形状'
      ],
      explanation: 'スマートフォンの外観デザインやGUIは意匠権で保護可能です。ただし、技術的機能や一般的な形状は保護対象外です。'
    },
    {
      title: '腕時計のデザイン',
      target: ['文字盤のデザイン', 'ベルトの形状', '側面のボタン配置', '全体的なシルエット'],
      icon: <Watch className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />,
      protected: [
        '文字盤のレイアウトや装飾',
        'ベルトの模様や形状',
        'ケースの形状や色彩',
        '特徴的なボタンデザイン'
      ],
      unprotected: [
        '時刻表示の機能',
        '一般的な円形文字盤',
        '技術的機能に基づく構造',
        '材質や性能'
      ],
      explanation: '腕時計の意匠は、装飾的要素と機能的要素が組み合わさっています。装飾的な要素が保護対象となります。'
    },
    {
      title: '自動車のデザイン',
      target: ['ボディ形状', 'ヘッドライトデザイン', 'グリルパターン', 'インテリアレイアウト'],
      icon: <Car className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />,
      protected: [
        'ボディの曲線や特徴的な形状',
        'ライトやグリルのデザイン',
        'インテリアのレイアウト',
        '特徴的な装飾パターン'
      ],
      unprotected: [
        '空力性能に直結する形状',
        'エンジン構造',
        '法規制に基づく必須形状',
        '一般的な機能部品の配置'
      ],
      explanation: '自動車デザインでは、美的要素と技術的要素を区別し、美的要素のみが保護対象となります。'
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
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-blue-800 flex items-center justify-center gap-2">
        意匠権
      </h2>

      <div className="flex gap-2 mb-4 sm:mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 px-2 sm:px-4 rounded-t-lg font-semibold text-sm sm:text-base ${
            activeTab === 'overview'
              ? 'bg-white text-blue-700 shadow-lg'
              : 'bg-blue-200 text-blue-900'
          }`}
        >
          制度の概要
        </button>
        <button
          onClick={() => setActiveTab('examples')}
          className={`flex-1 py-2 px-2 sm:px-4 rounded-t-lg font-semibold text-sm sm:text-base ${
            activeTab === 'examples'
              ? 'bg-white text-blue-700 shadow-lg'
              : 'bg-blue-200 text-blue-900'
          }`}
        >
          具体例で学ぶ
        </button>
      </div>

      {activeTab === 'overview' ? (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <div className="mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-blue-800 flex items-center gap-2 mb-3">
                <Book className="text-blue-600" />
                意匠権とは
              </h3>
            </div>
            <p className="text-base sm:text-lg mb-4 bg-blue-50 p-4 rounded-lg">
              {designLawOverview.purpose}
            </p>
          </div>

          {designLawOverview.keyPoints.map((point, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-blue-800 flex items-center gap-2 mb-3">
                  {index === 0 ? (
                    <Eye className="text-blue-600" />
                  ) : index === 1 ? (
                    <Layout className="text-blue-600" />
                  ) : (
                    <Scale className="text-blue-600" />
                  )}
                  {point.title}
                </h3>
                <ul className="space-y-2">
                  {point.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="text-blue-600 flex-shrink-0" />
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
              <h3 className="text-lg sm:text-xl font-bold text-blue-800 flex items-center gap-2 mb-3">
                {examples[currentExample].icon}
                {examples[currentExample].title}
              </h3>

              <div className="mb-4">
                <h4 className="text-base sm:text-lg font-bold mb-2">デザイン要素：</h4>
                <div className="flex flex-wrap gap-2">
                  {examples[currentExample].target.map((item, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-1 bg-blue-200 rounded-full text-blue-800 text-xs sm:text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {showResult && (
                <div className="mt-4 sm:mt-6 space-y-4">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold mb-2 text-green-700">保護対象となるもの：</h4>
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
                    <h4 className="text-base sm:text-lg font-bold mb-2 text-red-700">保護対象とならないもの：</h4>
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
            <p className="text-base sm:text-lg font-semibold text-blue-800">説明：</p>
            <p className="text-sm sm:text-base">{explanation}</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={checkDetails}
              disabled={showResult}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-full text-sm sm:text-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors duration-300"
            >
              詳細を確認
            </button>
            <button
              onClick={resetExample}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 text-white rounded-full text-sm sm:text-lg font-semibold hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center gap-2"
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