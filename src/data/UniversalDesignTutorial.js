import React, { useState } from 'react';
import { 
  Users, 
  Lightbulb,
  Shield,
  Minimize2,
  AlertTriangle,
  Battery,
  LayoutGrid,
  RefreshCw
} from 'lucide-react';

const UniversalDesignTutorial = () => {
  const [selectedPrinciple, setSelectedPrinciple] = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  const principles = [
    {
      id: 1,
      title: "公平な使用",
      icon: <Users className="w-8 h-8 sm:w-12 sm:h-12" />,
      description: "誰もが平等に使えるデザイン",
      examples: [
        "左利き・右利きどちらでも使える製品",
        "多言語対応のウェブサイト",
        "スロープと階段の併設"
      ],
      explanation: "様々な能力を持つ人々に対して同じように使いやすく、差別や不利益が生じないようにするための原則です。",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "使用における柔軟性",
      icon: <Lightbulb className="w-8 h-8 sm:w-12 sm:h-12" />,
      description: "使用方法が選択できるデザイン",
      examples: [
        "文字の大きさを変更できるアプリ",
        "高さ調節可能な机",
        "音声認識と手動入力の両対応"
      ],
      explanation: "利用者の好みや能力に応じて、使用方法を選択・調整できるようにする原則です。",
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "単純で直感的な使用",
      icon: <Minimize2 className="w-8 h-8 sm:w-12 sm:h-12" />,
      description: "使い方が簡単にわかるデザイン",
      examples: [
        "わかりやすいピクトグラム",
        "直感的なナビゲーション",
        "シンプルな操作手順"
      ],
      explanation: "経験や知識、言語能力、集中力に関係なく、使い方が簡単に理解できるようにする原則です。",
      color: "bg-yellow-500"
    },
    {
      id: 4,
      title: "認知できる情報",
      icon: <Shield className="w-8 h-8 sm:w-12 sm:h-12" />,
      description: "必要な情報がすぐにわかるデザイン",
      examples: [
        "色と形で示された非常口",
        "触覚と視覚の両方で確認できるボタン",
        "音と光による警告"
      ],
      explanation: "環境条件や利用者の感覚能力に関係なく、必要な情報が効果的に伝わるようにする原則です。",
      color: "bg-red-500"
    },
    {
      id: 5,
      title: "失敗に対する寛容性",
      icon: <AlertTriangle className="w-8 h-8 sm:w-12 sm:h-12" />,
      description: "間違えても大丈夫なデザイン",
      examples: [
        "やり直しができる機能",
        "確認画面の表示",
        "安全装置の設置"
      ],
      explanation: "うっかりミスや意図しない動作をしても、重大な結果につながらないようにする原則です。",
      color: "bg-purple-500"
    },
    {
      id: 6,
      title: "少ない身体的努力",
      icon: <Battery className="w-8 h-8 sm:w-12 sm:h-12" />,
      description: "楽に使えるデザイン",
      examples: [
        "自動ドア",
        "レバー式のドアノブ",
        "タッチ操作"
      ],
      explanation: "最小限の労力で効率的かつ快適に使用できるようにする原則です。",
      color: "bg-indigo-500"
    },
    {
      id: 7,
      title: "接近や利用のためのサイズと空間",
      icon: <LayoutGrid className="w-8 h-8 sm:w-12 sm:h-12" />,
      description: "適切な大きさと空間があるデザイン",
      examples: [
        "広々とした通路",
        "車いすでも使える空間",
        "届きやすい位置のスイッチ"
      ],
      explanation: "体格や姿勢、移動能力などに関係なく、アクセスしやすく使いやすい大きさと空間を確保する原則です。",
      color: "bg-pink-500"
    }
  ];

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">ユニバーサルデザイン</h2>
      
      {showIntro && (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
          <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">ユニバーサルデザインとは？</h3>
          <p className="mb-2">ユニバーサルデザインとは、<span className="font-semibold">すべての人にとって使いやすい</span>製品やサービス、環境をデザインする考え方です。</p>
          <p className="mb-2">年齢、性別、文化、言語、障がいの有無に関係なく、<span className="font-semibold">誰もが快適に利用できる</span>ことを目指します。</p>
          <p className="mb-4">以下の7つの原則に基づいてデザインされています：</p>
          <ol className="list-decimal list-inside mb-4 space-y-1">
            {principles.map(principle => (
              <li key={principle.id}>{principle.title}</li>
            ))}
          </ol>
          <button 
            onClick={() => setShowIntro(false)}
            className="px-4 py-2 bg-indigo-500 text-white rounded-full text-base font-semibold hover:bg-indigo-600 transition-colors duration-300"
          >
            原則を詳しく見る
          </button>
        </div>
      )}

      {!showIntro && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-6">
            {principles.map((principle, index) => (
              <button
                key={principle.id}
                onClick={() => setSelectedPrinciple(index)}
                className={`${
                  selectedPrinciple === index 
                    ? 'ring-4 ring-blue-400 transform scale-105' 
                    : 'hover:shadow-lg'
                } ${principle.color} text-white p-2 sm:p-4 rounded-lg transition-all duration-300 flex flex-col items-center`}
              >
                {principle.icon}
                <span className="text-xs sm:text-sm font-semibold mt-2 text-center">
                  {principle.title}
                </span>
              </button>
            ))}
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
            <div className="flex items-center mb-4">
              <div className={`${principles[selectedPrinciple].color} p-3 rounded-full text-white mr-4`}>
                {principles[selectedPrinciple].icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                {principles[selectedPrinciple].title}
              </h3>
            </div>

            <p className="text-lg mb-4 text-gray-700">
              {principles[selectedPrinciple].explanation}
            </p>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold mb-2 text-gray-700">この原則が目指すもの：</h4>
              <p className="text-gray-600">{principles[selectedPrinciple].description}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-gray-700">具体例：</h4>
              <ul className="list-disc list-inside space-y-2">
                {principles[selectedPrinciple].examples.map((example, index) => (
                  <li 
                    key={index}
                    className="text-gray-600"
                  >
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowIntro(true)}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center"
            >
              <RefreshCw className="mr-2" />
              最初に戻る
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UniversalDesignTutorial;