import React, { useState } from 'react'
import { 
  Layout, 
  Search, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  Book,
  Scale,
  Smartphone 
} from 'lucide-react'

export default function PatentRightVisualization() {
  const [activeTab, setActiveTab] = useState('overview')
  const [currentExample, setCurrentExample] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [explanation, setExplanation] = useState('具体例を見て、特許権の保護対象について理解しましょう。')

  const patentLawOverview = {
    purpose: '特許権は、発明を保護し、その利用を図ることにより、発明を奨励し、もって産業の発達に寄与することを目的とする知的財産権です。',
    keyPoints: [
      {
        title: '保護対象',
        items: [
          '自然法則を利用した技術的思想の創作',
          '産業上利用可能な発明',
          'プログラム等の情報処理方法',
          '物の発明、方法の発明、物を生産する方法の発明'
        ]
      },
      {
        title: '特許要件',
        items: [
          '産業上利用可能性があること',
          '新規性があること',
          '進歩性があること',
          '先願主義（最先の出願が権利を取得）'
        ]
      },
      {
        title: '権利の効力',
        items: [
          '業として独占的に実施できる権利',
          '差止請求権・損害賠償請求権',
          'ライセンス供与が可能',
          '存続期間は出願から最長20年'
        ]
      }
    ]
  }

  const examples = [
    {
      title: 'スマートフォンの顔認証技術',
      target: ['センサー技術', '画像処理アルゴリズム', '認証方法', 'セキュリティ機能'],
      icon: <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />,
      protected: [
        '顔認識の具体的な処理方法',
        'センサーと画像処理の組み合わせ手法',
        '認証アルゴリズムの特徴的な処理',
        'セキュリティ強化のための特有の方式'
      ],
      unprotected: [
        '単なるアイデアや着想',
        '数学的な計算式そのもの',
        '人間の精神活動',
        '一般的なカメラ撮影方法'
      ],
      explanation: '顔認証技術は、ハードウェアとソフトウェアを組み合わせた技術的解決手段として特許保護の対象となります。'
    },
    {
      title: 'AI創薬技術',
      target: ['化合物予測アルゴリズム', 'データ解析方法', '薬効評価手法', 'スクリーニング方法'],
      icon: <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />,
      protected: [
        'AIによる候補化合物の予測方法',
        '特徴的なデータ処理アルゴリズム',
        '新規な薬効評価プロセス',
        '効率的なスクリーニング手法'
      ],
      unprotected: [
        '発見された化学法則そのもの',
        '自然界に存在する物質',
        '単なる情報の提示方法',
        '人間の判断プロセス'
      ],
      explanation: 'AI創薬技術では、技術的な処理方法やプロセスが特許保護の対象となります。'
    },
    {
      title: '半導体製造方法',
      target: ['製造プロセス', '材料組成', '回路設計', '検査方法'],
      icon: <Layout className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />,
      protected: [
        '特徴的な製造工程の組み合わせ',
        '新規な材料の製造方法',
        '回路形成の具体的手法',
        '効率的な品質検査プロセス'
      ],
      unprotected: [
        '自然法則そのもの',
        '単なる設計図面',
        '作業手順の単純な組み合わせ',
        '公知の方法の単なる適用'
      ],
      explanation: '半導体製造方法では、具体的な技術的手段として実施可能な方法が保護対象となります。'
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
    <div className="p-4 sm:p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-green-700 flex items-center justify-center gap-2">
        特許権
      </h2>

      <div className="flex gap-2 mb-4 sm:mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 px-4 rounded-t-lg font-semibold text-sm sm:text-base ${
            activeTab === 'overview'
              ? 'bg-white text-green-700 shadow-lg'
              : 'bg-green-200 text-green-900'
          }`}
        >
          制度の概要
        </button>
        <button
          onClick={() => setActiveTab('examples')}
          className={`flex-1 py-2 px-4 rounded-t-lg font-semibold text-sm sm:text-base ${
            activeTab === 'examples'
              ? 'bg-white text-green-700 shadow-lg'
              : 'bg-green-200 text-green-900'
          }`}
        >
          具体例で学ぶ
        </button>
      </div>

      {activeTab === 'overview' ? (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <div className="mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-green-800 flex items-center gap-2 mb-3">
                <Book className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
                特許権とは
              </h3>
            </div>
            <p className="text-sm sm:text-lg mb-4 bg-green-50 p-3 sm:p-4 rounded-lg">
              {patentLawOverview.purpose}
            </p>
          </div>

          {patentLawOverview.keyPoints.map((point, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-green-800 flex items-center gap-2 mb-3">
                  {index === 0 ? (
                    <FileText className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
                  ) : index === 1 ? (
                    <Search className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <Scale className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                  {point.title}
                </h3>
                <ul className="space-y-2">
                  {point.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="text-green-600 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
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
              <h3 className="text-lg sm:text-xl font-bold text-green-800 flex items-center gap-2 mb-3">
                {examples[currentExample].icon}
                {examples[currentExample].title}
              </h3>

              <div className="mb-4">
                <h4 className="text-base sm:text-lg font-bold mb-2">技術要素：</h4>
                <div className="flex flex-wrap gap-2">
                  {examples[currentExample].target.map((item, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-1 bg-green-200 rounded-full text-green-800 text-xs sm:text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {showResult && (
                <div className="mt-4 sm:mt-6 space-y-4">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold mb-2 text-green-700">特許保護の対象となるもの：</h4>
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
                    <h4 className="text-base sm:text-lg font-bold mb-2 text-red-700">特許保護の対象とならないもの：</h4>
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
            <p className="text-base sm:text-lg font-semibold text-green-800 mb-2">説明：</p>
            <p className="text-sm sm:text-base">{explanation}</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={checkDetails}
              disabled={showResult}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-full text-sm sm:text-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 transition-colors duration-300"
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
  )
}