import React, { useState } from 'react'
import { User, Building, FileText, CheckCircle, RefreshCw, Book, Scale } from 'lucide-react'

export default function PrivacyLawVisualization() {
  const [activeTab, setActiveTab] = useState('overview')
  const [currentScenario, setCurrentScenario] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [explanation, setExplanation] = useState('個人情報の取り扱いシナリオを選んで、法律の適用を確認してみましょう。')

  const lawOverview = {
    purpose: '個人情報の適切な取扱いに関する規律を定めることにより、個人情報の有用性に配慮しながら、個人の権利利益を保護すること',
    keyPoints: [
      {
        title: '対象となる情報',
        items: [
          '個人情報（氏名、生年月日、住所など）',
          '要配慮個人情報（人種、信条、病歴など）',
          '個人識別符号（指紋データ、旅券番号など）'
        ]
      },
      {
        title: '事業者の義務',
        items: [
          '利用目的の特定と通知・公表',
          '適切な取得・管理・保管',
          '第三者提供の制限',
          '安全管理措置の実施'
        ]
      },
      {
        title: '個人の権利',
        items: [
          '保有個人データの開示請求',
          '訂正・追加・削除の請求',
          '利用停止・消去の請求',
          '第三者提供の停止請求'
        ]
      }
    ]
  }

  const scenarios = [
    {
      title: '顧客データベース',
      data: ['氏名', '住所', '電話番号', 'メールアドレス', '購入履歴'],
      type: '要配慮個人情報ではない個人情報',
      requirements: [
        '本人の同意を得ること',
        '利用目的の特定・通知',
        '適切な安全管理措置',
        '第三者提供の制限'
      ],
      explanation: '基本的な個人情報として、取得時の同意や利用目的の明示が必要です。'
    },
    {
      title: '医療情報',
      data: ['病歴', '健康状態', '治療歴', '服薬情報', '遺伝情報'],
      type: '要配慮個人情報',
      requirements: [
        '原則として本人の事前の同意が必要',
        '特に厳格な安全管理措置',
        '漏えい時の報告義務',
        '取得時の利用目的の明示'
      ],
      explanation: '要配慮個人情報として、特に厳格な取り扱いが求められます。'
    },
    {
      title: '従業員情報',
      data: ['社員番号', '人事評価', '給与情報', '勤怠記録', '資格情報'],
      type: '個人情報',
      requirements: [
        '利用目的の特定',
        '必要最小限の収集',
        '正確性の確保',
        '安全管理措置の実施'
      ],
      explanation: '従業員の権利利益を保護しながら、適切な人事管理のために必要な処理が認められます。'
    }
  ]

  const resetScenario = () => {
    setShowResult(false)
    setCurrentScenario((prev) => (prev + 1) % scenarios.length)
    setExplanation('新しいシナリオが設定されました。確認ボタンを押して詳細を見てみましょう。')
  }

  const checkRequirements = () => {
    setShowResult(true)
    setExplanation(scenarios[currentScenario].explanation)
  }

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-green-800 flex items-center justify-center gap-2">
        個人情報保護法
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
          法律の概要
        </button>
        <button
          onClick={() => setActiveTab('scenarios')}
          className={`flex-1 py-2 px-4 rounded-t-lg font-semibold text-sm sm:text-base ${
            activeTab === 'scenarios'
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
                個人情報保護法とは
              </h3>
            </div>
            <p className="text-sm sm:text-lg mb-4 bg-green-50 p-3 sm:p-4 rounded-lg">
              {lawOverview.purpose}
            </p>
          </div>

          {lawOverview.keyPoints.map((point, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-green-800 flex items-center gap-2 mb-3">
                  {index === 0 ? (
                    <User className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                  ) : index === 1 ? (
                    <Building className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <Scale className="text-purple-600 w-5 h-5 sm:w-6 sm:h-6" />
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
                <FileText className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
                シナリオ: {scenarios[currentScenario].title}
              </h3>
              <div className="mb-4">
                <h4 className="text-base sm:text-lg font-bold mb-2">含まれる情報：</h4>
                <div className="flex flex-wrap gap-2">
                  {scenarios[currentScenario].data.map((item, index) => (
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
                <div className="mt-4">
                  <h4 className="text-base sm:text-lg font-bold mb-2">必要な対応：</h4>
                  <ul className="space-y-2">
                    {scenarios[currentScenario].requirements.map((req, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-green-800 text-sm sm:text-base"
                      >
                        <CheckCircle className="text-green-600 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
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
              onClick={checkRequirements}
              disabled={showResult}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-full text-sm sm:text-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 transition-colors duration-300"
            >
              確認する
            </button>
            <button
              onClick={resetScenario}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-full text-sm sm:text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
              次のシナリオ
            </button>
          </div>
        </>
      )}
    </div>
  )
}