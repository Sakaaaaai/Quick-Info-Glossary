import React, { useState } from 'react'
import { 
  Search, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  Book,
  Scale,
  Settings,
  Package,
  Cog
} from 'lucide-react'

export default function UtilityModelVisualization() {
  const [activeTab, setActiveTab] = useState('overview')
  const [currentExample, setCurrentExample] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [explanation, setExplanation] = useState('具体例を見て、実用新案権の保護対象について理解しましょう。')

  const utilityModelOverview = {
    purpose: '実用新案権は、物品の形状、構造、組合せに関する考案を保護し、産業の発達に寄与することを目的とする工業所有権です。特許権に比べて権利取得が容易で、早期保護が可能な制度です。',
    keyPoints: [
      {
        title: '保護対象',
        items: [
          '物品の形状に関する考案',
          '物品の構造に関する考案',
          '物品の組合せに関する考案',
          '技術的思想を伴う実用的な考案'
        ]
      },
      {
        title: '登録要件',
        items: [
          '産業上利用可能性があること',
          '新規性があること',
          '進歩性があること（特許より低い水準）',
          '先願主義に基づくこと'
        ]
      },
      {
        title: '権利の効力',
        items: [
          '業としての実施の独占権',
          '存続期間は出願から10年',
          '技術評価書による権利行使',
          '特許への変更出願が可能'
        ]
      }
    ]
  }

  const examples = [
    {
      title: '工具の改良考案',
      target: ['形状', '構造', '組合せ', '機能性'],
      icon: <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />,
      protected: [
        'グリップの人間工学的形状',
        '部品の新規な組立構造',
        '工具の連結機構',
        '使いやすさを向上させる形状変更'
      ],
      unprotected: [
        '材料の単なる変更',
        '大きさの単なる変更',
        '公知の形状の単なる寄せ集め',
        'デザインのみの変更'
      ],
      explanation: '工具の形状や構造に関する技術的な考案は、使用性や機能性を向上させる場合に実用新案として保護されます。'
    },
    {
      title: '収納用品の考案',
      target: ['構造', '折畳機構', '連結方法', '収納効率'],
      icon: <Package className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />,
      protected: [
        '新規な折畳み機構',
        '効率的な収納構造',
        '組立式の接合構造',
        'スペース活用の工夫'
      ],
      unprotected: [
        '単なる形状変更',
        '周知の折畳み方式',
        '機能を伴わない装飾',
        '材質の単なる変更'
      ],
      explanation: '収納用品の構造や組立方法に関する考案は、利便性や効率性を高める技術的特徴があれば保護対象となります。'
    },
    {
      title: '機械部品の考案',
      target: ['接合構造', '動作機構', '組立方法', '効率性'],
      icon: <Cog className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />,
      protected: [
        '新規な接合機構',
        '効率的な動力伝達構造',
        '部品の簡易組立構造',
        'メンテナンス性向上の工夫'
      ],
      unprotected: [
        '公知の機構の単なる転用',
        '素材の単なる変更',
        '形状の単なる変更',
        '数値の最適化のみ'
      ],
      explanation: '機械部品の構造や組合せに関する考案は、技術的な改良を含む場合に実用新案として保護されます。'
    }
  ]

  const resetExample = () => {
    setShowResult(false)
    setCurrentExample((prev) => (prev + 1) % examples.length)
    setExplanation('新しい例が設定されました。確認ボタンを押して詳細を見てみましょう。')
  }

  const checkDetails = () => {
    setShowResult(true)
    setExplanation(examples[currentExample].explanation)
  }

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-blue-800 flex items-center justify-center gap-2">
        実用新案権
      </h2>

      <div className="flex gap-2 mb-4 sm:mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 px-4 rounded-t-lg font-semibold text-sm sm:text-base ${
            activeTab === 'overview'
              ? 'bg-white text-blue-700 shadow-lg'
              : 'bg-blue-200 text-blue-900'
          }`}
        >
          制度の概要
        </button>
        <button
          onClick={() => setActiveTab('examples')}
          className={`flex-1 py-2 px-4 rounded-t-lg font-semibold text-sm sm:text-base ${
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
                <Book className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                実用新案権とは
              </h3>
            </div>
            <p className="text-sm sm:text-base mb-4 bg-blue-50 p-3 sm:p-4 rounded-lg">
              {utilityModelOverview.purpose}
            </p>
          </div>

          {utilityModelOverview.keyPoints.map((point, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-blue-800 flex items-center gap-2 mb-3">
                  {index === 0 ? (
                    <Settings className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                  ) : index === 1 ? (
                    <Search className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <Scale className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                  {point.title}
                </h3>
                <ul className="space-y-2">
                  {point.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="text-blue-600 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
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
                <h4 className="text-base sm:text-lg font-bold mb-2">考案の要素：</h4>
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
                    <h4 className="text-base sm:text-lg font-bold mb-2 text-green-700">実用新案として保護される例：</h4>
                    <ul className="space-y-2">
                      {examples[currentExample].protected.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-green-800"
                        >
                          <CheckCircle className="text-green-600 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                          <span className="text-sm sm:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold mb-2 text-red-700">実用新案として保護されない例：</h4>
                    <ul className="space-y-2">
                      {examples[currentExample].unprotected.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-red-800"
                        >
                          <AlertCircle className="text-red-600 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
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
            <p className="text-base sm:text-lg font-semibold text-blue-800 mb-2">説明：</p>
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
              className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-full text-sm sm:text-lg font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
              次の例
            </button>
          </div>
        </>
      )}
    </div>
  )
}