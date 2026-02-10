import React, { useState } from 'react';
import { RefreshCw, BookOpen, Building2, Lock, Lightbulb, Book, Paintbrush, Copyright, Newspaper, Music, Film, Code, Dna, Heart } from 'lucide-react';

const IPVisualization = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [showExplanation, setShowExplanation] = useState(true);

  const categories = {
    copyright: {
      title: "著作権",
      icon: BookOpen,
      color: "from-green-100 to-blue-100",
      description: "文化的な創作物を保護",
      rights: {
        literature: {
          title: "言語の著作物",
          icon: Newspaper,
          examples: ["小説", "論文", "脚本", "コンピュータプログラム"],
          period: "著作者の死後70年",
          requirements: ["創作性があること", "思想・感情の表現であること"]
        },
        music: {
          title: "音楽の著作物",
          icon: Music,
          examples: ["作詞", "作曲", "編曲"],
          period: "著作者の死後70年",
          requirements: ["創作性があること", "音楽的な表現であること"]
        },
        visual: {
          title: "映像の著作物",
          icon: Film,
          examples: ["映画", "アニメーション", "ゲーム"],
          period: "公表後70年",
          requirements: ["創作性があること", "映像表現であること"]
        },
        program: {
          title: "プログラムの著作物",
          icon: Code,
          examples: ["ソースコード", "オブジェクトコード"],
          period: "著作者の死後70年",
          requirements: ["創作性があること", "プログラム表現であること"]
        }
      }
    },
    industrial: {
      title: "産業財産権",
      icon: Building2,
      color: "from-blue-100 to-purple-100",
      description: "産業上の創作を保護",
      rights: {
        patent: {
          title: "特許権",
          icon: Lightbulb,
          examples: ["発明", "新技術", "化学物質"],
          period: "出願から20年",
          requirements: ["産業上利用可能性", "新規性", "進歩性"]
        },
        utility: {
          title: "実用新案権",
          icon: Book,
          examples: ["考案", "装置の改良", "構造の工夫"],
          period: "出願から10年",
          requirements: ["産業上利用可能性", "新規性", "進歩性（特許より緩やか）"]
        },
        design: {
          title: "意匠権",
          icon: Paintbrush,
          examples: ["デザイン", "形状", "模様"],
          period: "登録から25年",
          requirements: ["工業上利用可能性", "新規性", "創作性"]
        },
        trademark: {
          title: "商標権",
          icon: Copyright,
          examples: ["商標", "ブランド名", "ロゴ"],
          period: "10年（更新可能）",
          requirements: ["識別力", "不登録事由非該当", "先願"]
        }
      }
    },
    other: {
      title: "その他の権利",
      icon: Lock,
      color: "from-purple-100 to-pink-100",
      description: "その他の知的財産を保護",
      rights: {
        breed: {
          title: "育成者権",
          icon: Heart,
          examples: ["新品種の植物", "栽培方法"],
          period: "登録から25年（樹木は30年）",
          requirements: ["区別性", "均一性", "安定性"]
        },
        circuit: {
          title: "回路配置利用権",
          icon: Dna,
          examples: ["半導体集積回路の配置設計"],
          period: "登録から10年",
          requirements: ["創作性"]
        }
      }
    }
  };

  const resetSelection = () => {
    setSelectedCategory(null);
    setSelectedRight(null);
    setShowExplanation(true);
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">知的財産権</h2>
      
      {showExplanation && (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
          <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">知的財産権とは？</h3>
          <p className="mb-2">知的財産権は、<span className="font-semibold">人間の知的創造活動によって生み出されたもの</span>を
            保護するための権利です。</p>
          <p className="mb-2">アイデアや発明、創作物、デザイン、ブランドなどの知的財産を守り、
            創作者の権利を保護します。</p>
          <p className="mb-4">知的財産権は大きく以下の3つに分類されます：</p>
          <ol className="list-decimal list-inside mb-4">
            <li className="mb-1">著作権：文化的な創作物を保護する権利</li>
            <li className="mb-1">産業財産権：産業上の創作を保護する権利</li>
            <li className="mb-1">その他の権利：新品種や回路配置などを保護する権利</li>
          </ol>
          <p>以下で各権利の詳細を確認できます。</p>
        </div>
      )}

      {/* カテゴリー選択 */}
      {!selectedCategory && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {Object.entries(categories).map(([key, category]) => {
            const IconComponent = category.icon;
            return (
              <div
                key={key}
                onClick={() => {
                  setSelectedCategory(key);
                  setShowExplanation(false);
                }}
                className="bg-white p-4 rounded-lg shadow cursor-pointer transition-all duration-300 hover:bg-blue-50"
              >
                <IconComponent className="mx-auto mb-2 h-8 w-8 text-indigo-600" />
                <div className="text-center">
                  <div className="font-semibold text-indigo-700">{category.title}</div>
                  <div className="text-sm text-gray-600">{category.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 権利選択 */}
      {selectedCategory && !selectedRight && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {Object.entries(categories[selectedCategory].rights).map(([key, right]) => {
            const IconComponent = right.icon;
            return (
              <div
                key={key}
                onClick={() => setSelectedRight(key)}
                className={`bg-white p-4 rounded-lg shadow cursor-pointer transition-all duration-300 hover:bg-blue-50`}
              >
                <IconComponent className="mx-auto mb-2 h-8 w-8 text-indigo-600" />
                <div className="text-center">
                  <div className="font-semibold text-indigo-700">{right.title}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 権利の詳細表示 */}
      {selectedCategory && selectedRight && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <p className="text-lg font-semibold mb-2 text-indigo-700">
            {categories[selectedCategory].rights[selectedRight].title}の詳細
          </p>
          <p className="mb-2">保護期間: {categories[selectedCategory].rights[selectedRight].period}</p>
          <div className="mb-4">
            <p className="font-semibold mb-1">保護対象の例：</p>
            <ul className="list-disc list-inside">
              {categories[selectedCategory].rights[selectedRight].examples.map((example, index) => (
                <li key={index} className="text-gray-700">{example}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-1">権利取得の要件：</p>
            <ul className="list-disc list-inside">
              {categories[selectedCategory].rights[selectedRight].requirements.map((req, index) => (
                <li key={index} className="text-gray-700">{req}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ナビゲーションボタン */}
      <div className="flex justify-center gap-4">
        {selectedRight && (
          <button
            onClick={() => setSelectedRight(null)}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
          >
            戻る
          </button>
        )}
        {(selectedCategory || selectedRight) && (
          <button
            onClick={resetSelection}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center"
          >
            <RefreshCw className="mr-2" />
            最初に戻る
          </button>
        )}
      </div>
    </div>
  );
};

export default IPVisualization;