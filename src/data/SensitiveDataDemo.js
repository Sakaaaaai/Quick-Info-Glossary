import React, { useState } from 'react'
import { CheckCircle2, XCircle, ChevronRight, RefreshCw, Play } from 'lucide-react'

export default function Component() {
  const [showDemo, setShowDemo] = useState(false)
  const [currentScenario, setCurrentScenario] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedChoice, setSelectedChoice] = useState(null)
  
  const sensitiveDataTypes = [
    {
      title: '病歴',
      icon: '🏥',
      description: '身体や精神の病気、けがの履歴など',
      examples: ['がんの治療歴', '精神疾患の診断', '特定の薬物アレルギー'],
    },
    {
      title: '犯罪歴',
      icon: '⚖️',
      description: '有罪判決を受けた犯罪の履歴など',
      examples: ['前科', '逮捕歴', '犯罪被害の記録'],
    },
    {
      title: '人種',
      icon: '🌏',
      description: '人種、民族的背景に関する情報',
      examples: ['人種情報', '民族的背景', '出身国籍'],
    },
    {
      title: '信条',
      icon: '🕊️',
      description: '思想・信仰に関する情報',
      examples: ['宗教団体所属', '政治的信条', '思想信条'],
    },
    {
      title: '社会的身分',
      icon: '👥',
      description: '社会的な立場や地位に関する情報',
      examples: ['労働組合加入', '門地', '身分'],
    },
    {
      title: '健康診断結果',
      icon: '📋',
      description: '医療検査、健康診断の結果など',
      examples: ['健康診断結果', 'ゲノム検査結果', '感染症検査結果'],
    }
  ]

  const scenarios = [
    {
      id: 1,
      title: '医療情報システムでの患者データ管理',
      situation: '病院の受付で新規患者の登録を行っています。患者の病歴情報をシステムに入力する必要があります。',
      sensitiveData: '統合失調症の治療歴',
      choices: [
        {
          id: 'a',
          text: '誰でも確認できるように、患者リストに病名を表示する',
          isCorrect: false,
          explanation: '要配慮個人情報は必要最小限の関係者のみがアクセスできるようにすべきです。'
        },
        {
          id: 'b',
          text: '医療関係者のみがアクセスできる別システムで管理し、アクセスログを記録する',
          isCorrect: true,
          explanation: '適切なアクセス制御と監査証跡の記録により、情報を保護しています。'
        }
      ]
    },
    {
      id: 2,
      title: '採用面接での質問',
      situation: '企業の採用面接で、応募者の適性を確認しています。',
      sensitiveData: '宗教・信仰に関する情報',
      choices: [
        {
          id: 'a',
          text: '応募者の信仰について質問し、会社の文化との適合性を確認する',
          isCorrect: false,
          explanation: '宗教に関する情報は採用判断の基準とすべきではありません。'
        },
        {
          id: 'b',
          text: '業務に直接関係する能力や経験についてのみ質問する',
          isCorrect: true,
          explanation: '採用選考では、職務に直接関係する情報のみを収集すべきです。'
        }
      ]
    },
    {
      id: 3,
      title: '人事システムでの従業員情報管理',
      situation: '従業員の労働組合加入状況を記録する必要があります。',
      sensitiveData: '労働組合加入情報',
      choices: [
        {
          id: 'a',
          text: '一般の人事情報と一緒に保管し、部署異動の参考にする',
          isCorrect: false,
          explanation: '労働組合情報を人事評価に利用することは違法です。'
        },
        {
          id: 'b',
          text: '特別なアクセス制限を設け、給与控除等の必要な用途でのみ使用する',
          isCorrect: true,
          explanation: '必要最小限の利用目的に限定し、適切なアクセス制御を行っています。'
        }
      ]
    }
  ]

  const handleChoiceSelect = (choiceId) => {
    setSelectedChoice(choiceId)
    setShowResult(true)
  }

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1)
      setShowResult(false)
      setSelectedChoice(null)
    }
  }

  const resetDemo = () => {
    setCurrentScenario(0)
    setShowResult(false)
    setSelectedChoice(null)
  }

  const scenario = scenarios[currentScenario]

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg max-w-4xl mx-auto">
      <div className="flex items-center justify-center mb-6 space-x-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600">要配慮個人情報</h2>
      </div>

      {!showDemo && (
        <>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">要配慮個人情報とは</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  要配慮個人情報は、個人情報保護法で特別な取り扱いが求められる機微な個人情報です。
                  これらの情報は、差別や偏見につながる可能性があるため、原則として取得を避け、
                  取得する場合も本人の同意を得るなど、特別な配慮が必要とされます。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {sensitiveDataTypes.map((type) => (
                <div key={type.title} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl">{type.icon}</span>
                    <h4 className="text-lg font-bold text-gray-800">{type.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                  <ul className="text-sm text-gray-500 list-disc list-inside">
                    {type.examples.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-bold text-indigo-700 mb-2">取り扱い時の注意点</h4>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-700">
                <li>原則として取得を避ける</li>
                <li>取得する場合は本人の同意を得る</li>
                <li>利用目的を明確かつ具体的に特定する</li>
                <li>必要最小限の範囲でのみ取り扱う</li>
                <li>特別な安全管理措置を講じる</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setShowDemo(true)}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-indigo-500 text-white rounded-full font-semibold hover:bg-indigo-600 transition-colors duration-300 flex items-center text-sm sm:text-base"
            >
              <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              実践デモを始める
            </button>
          </div>
        </>
      )}

      {showDemo && (
        <>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-indigo-600 mb-2 sm:mb-0">
                シナリオ {currentScenario + 1}: {scenario.title}
              </h3>
              <span className="text-sm text-gray-500">
                {currentScenario + 1} / {scenarios.length}
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-base sm:text-lg mb-2"><span className="font-bold">状況：</span> {scenario.situation}</p>
                <p className="text-base sm:text-lg">
                  <span className="font-bold">取り扱う要配慮個人情報：</span>
                  <span className="text-red-600 font-bold"> {scenario.sensitiveData}</span>
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-base sm:text-lg text-gray-700">どのように対応すべきでしょうか？</h4>
                {scenario.choices.map((choice) => (
                  <div
                    key={choice.id}
                    onClick={() => !showResult && handleChoiceSelect(choice.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                      !showResult 
                        ? 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                        : choice.isCorrect
                          ? 'border-green-500 bg-green-50'
                          : selectedChoice === choice.id
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 opacity-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {showResult && (
                        choice.isCorrect 
                          ? <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0" />
                          : <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0" />
                      )}
                      <div>
                        <p className="text-base sm:text-lg">{choice.text}</p>
                        {showResult && (
                          <p className={`mt-2 text-sm ${
                            choice.isCorrect ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {choice.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            {showResult && currentScenario < scenarios.length - 1 && (
              <button
                onClick={nextScenario}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-indigo-500 text-white rounded-full font-semibold hover:bg-indigo-600 transition-colors duration-300 flex items-center text-sm sm:text-base"
              >
                次のシナリオへ
                <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
            {(showResult && currentScenario === scenarios.length - 1) && (
              <button
                onClick={() => {
                  resetDemo()
                  setShowDemo(false)
                }}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center text-sm sm:text-base"
              >
                説明に戻る
                <RefreshCw className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}