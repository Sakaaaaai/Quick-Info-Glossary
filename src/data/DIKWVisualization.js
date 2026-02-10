import React, { useState } from 'react'
import { Info, Database, Brain, Lightbulb } from 'lucide-react'

export default function DIKWVisualization() {
  const [activeLevel, setActiveLevel] = useState(null)
  const [explanation, setExplanation] = useState('各層をクリックして、DIKWモデルについて学びましょう。')

  const levels = [
    {
      name: 'Wisdom (知恵)',
      icon: Lightbulb,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      description: '知識を活用して、正しい判断や意思決定ができる状態です。例：過去の経験と知識を活かして、新しいビジネス戦略を立てる。',
      example: '天気予報データと農作物の知識を組み合わせて、最適な作付け計画を立てる。'
    },
    {
      name: 'Knowledge (知識)',
      icon: Brain,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      description: '情報同士を関連付けて理解し、活用できる状態です。例：天気と気温の関係性を理解し、天気予報を解釈できる。',
      example: '気圧の変化と雲の形から、明日の天気を予測できる。'
    },
    {
      name: 'Information (情報)',
      icon: Info,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      description: 'データに意味や文脈が付加された状態です。例：「今日の東京の気温は25度で、平年より2度高い」',
      example: '気温データを整理して、月別の平均気温の変化をグラフ化する。'
    },
    {
      name: 'Data (データ)',
      icon: Database,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      description: '生の数値や事実の集まりです。例：「25度」「2023年5月1日」などの単純な数値や文字列',
      example: '気象センサーから得られる温度、湿度、気圧などの数値データ。'
    }
  ]

  const handleClick = (level) => {
    setActiveLevel(level)
    setExplanation(`${level.description}\n\n具体例：${level.example}`)
  }

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-indigo-700">DIKWモデル</h2>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-indigo-600">DIKWモデルとは？</h3>
        <div className="space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base">
            DIKWモデルは、<span className="font-semibold">データ（Data）、情報（Information）、知識（Knowledge）、知恵（Wisdom）</span>
            の関係性を表現した階層モデルです。
          </p>
          
          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
            <h4 className="text-base sm:text-lg font-bold mb-2 text-indigo-600">モデルの特徴</h4>
            <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>下位層から上位層への<span className="font-semibold">価値の変換プロセス</span>を表現</li>
              <li>各層は前の層を基盤として構築される</li>
              <li>上位層ほど抽象度が高く、実践的な価値が増加</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-3 sm:p-4 rounded-lg">
            <h4 className="text-base sm:text-lg font-bold mb-2 text-indigo-600">活用例</h4>
            <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>組織の知識管理システムの設計</li>
              <li>意思決定プロセスの改善</li>
              <li>データ分析プロジェクトの構造化</li>
              <li>学習・教育プログラムの開発</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row mb-6 sm:mb-8">
        <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            {levels.map((level, index) => {
              const Icon = level.icon
              const width = 100 - (index * 20)
              
              return (
                <button
                  key={level.name}
                  onClick={() => handleClick(level)}
                  className={`
                    ${level.color} ${level.hoverColor}
                    text-white p-3 sm:p-4 rounded-lg shadow-lg
                    transform transition-all duration-300
                    flex items-center justify-center gap-2
                    ${activeLevel === level ? 'scale-105 sm:scale-110 ring-4 ring-blue-300' : ''}
                    w-full sm:w-auto
                  `}
                  style={{ maxWidth: `${width}%` }}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="font-bold text-sm sm:text-base">{level.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="w-full sm:w-1/2 p-4 sm:p-6 bg-white rounded-lg shadow-lg sm:ml-6">
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-indigo-600">解説</h3>
          <p className="whitespace-pre-line text-sm sm:text-base">{explanation}</p>
          {!activeLevel && (
            <div className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base">
              <p>各層をクリックすると、詳細な説明が表示されます。</p>
              <p className="mt-2">下から上に向かって：</p>
              <ul className="list-disc list-inside mt-2">
                <li>生のデータが整理されて意味のある情報になり</li>
                <li>情報が体系化されて実用的な知識となり</li>
                <li>知識が実践されて判断力のある知恵となります</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-indigo-600">各層の特徴</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {levels.map((level) => {
            const Icon = level.icon
            return (
              <div key={level.name} className="p-3 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${level.color.replace('bg-', 'text-')}`} />
                  <span className="font-bold text-sm sm:text-base">{level.name}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">{level.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}