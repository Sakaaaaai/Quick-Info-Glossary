import React, { useState } from 'react';
import { RefreshCw, Lightbulb, Book, Paintbrush, Copyright } from 'lucide-react';

const IPRightsVisualization = () => {
  const [selectedRight, setSelectedRight] = useState(null);
  const [showExplanation, setShowExplanation] = useState(true);

  const ipRights = {
    patent: {
      title: "特許権",
      icon: Lightbulb,
      description: "発明を保護する権利",
      period: "出願から20年",
      examples: ["新しい技術", "化学物質", "製造方法"],
      requirements: [
        "産業上利用可能性があること",
        "新規性があること",
        "進歩性があること"
      ]
    },
    utility: {
      title: "実用新案権",
      icon: Book,
      description: "物品の形状・構造・組み合わせに関する考案を保護",
      period: "出願から10年",
      examples: ["製品の形状改良", "構造の工夫", "部品の組み合わせ"],
      requirements: [
        "産業上利用可能性があること",
        "新規性があること",
        "進歩性があること（特許より緩やか）"
      ]
    },
    design: {
      title: "意匠権",
      icon: Paintbrush,
      description: "物品のデザインを保護する権利",
      period: "登録から25年",
      examples: ["製品のデザイン", "GUI", "建築物のデザイン"],
      requirements: [
        "工業上利用可能性があること",
        "新規性があること",
        "創作性があること"
      ]
    },
    trademark: {
      title: "商標権",
      icon: Copyright,
      description: "商品・サービスの標識を保護する権利",
      period: "10年（更新可能）",
      examples: ["社名", "ロゴ", "商品名"],
      requirements: [
        "識別力があること",
        "不登録事由に該当しないこと",
        "先願であること"
      ]
    }
  };

  const resetSelection = () => {
    setSelectedRight(null);
    setShowExplanation(true);
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">産業財産権</h2>
      
      {showExplanation && (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
          <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">産業財産権とは？</h3>
          <p className="mb-2">産業財産権は、<span className="font-semibold">知的創造物についての権利</span>や、
            <span className="font-semibold">営業上の標識についての権利</span>を保護する制度です。</p>
          <p className="mb-2">この制度は、新しい技術やデザイン、ブランドを保護することで、
            産業の発展を促進することを目的としています。</p>
          <p className="mb-4">産業財産権は以下の4つの権利で構成されています：</p>
          <ol className="list-decimal list-inside mb-4">
            <li className="mb-1">特許権：発明を保護</li>
            <li className="mb-1">実用新案権：考案を保護</li>
            <li className="mb-1">意匠権：デザインを保護</li>
            <li className="mb-1">商標権：商標を保護</li>
          </ol>
          <p>それぞれの権利について、以下で詳しく見ていきましょう。</p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {Object.entries(ipRights).map(([key, right]) => {
          const IconComponent = right.icon;
          return (
            <div
              key={key}
              onClick={() => {
                setSelectedRight(key);
                setShowExplanation(false);
              }}
              className={`bg-white p-4 rounded-lg shadow cursor-pointer transition-all duration-300
                ${selectedRight === key ? 'ring-4 ring-red-500 transform scale-110' : 'hover:bg-blue-50'}`}
            >
              <IconComponent className="mx-auto mb-2 h-8 w-8 text-indigo-600" />
              <div className="text-center">
                <div className="font-semibold text-indigo-700">{right.title}</div>
                <div className="text-sm text-gray-600">{right.description}</div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedRight && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-lg font-semibold mb-2 text-indigo-700">
              {ipRights[selectedRight].title}の詳細
            </p>
            <p className="mb-2">保護期間: {ipRights[selectedRight].period}</p>
            <div className="mb-4">
              <p className="font-semibold mb-1">保護対象の例：</p>
              <ul className="list-disc list-inside">
                {ipRights[selectedRight].examples.map((example, index) => (
                  <li key={index} className="text-gray-700">{example}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-1">権利取得の要件：</p>
              <ul className="list-disc list-inside">
                {ipRights[selectedRight].requirements.map((req, index) => (
                  <li key={index} className="text-gray-700">{req}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={resetSelection}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center"
        >
          <RefreshCw className="mr-2" />
          最初に戻る
        </button>
      </div>
    </div>
  );
};

export default IPRightsVisualization;