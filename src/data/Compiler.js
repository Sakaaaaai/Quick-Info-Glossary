'use client'

import React, { useState } from 'react'
import { ChevronRight, RefreshCw } from 'lucide-react'

export default function Component() {
  const [sourceCode] = useState('x = 5 + 3')
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { name: 'ソースコード', content: sourceCode },
    { name: 'トークン化', content: '["x", "=", "5", "+", "3"]' },
    { name: '構文解析', content: '{"type": "Assignment", "left": "x", "right": {"type": "BinaryOp", "operator": "+", "left": "5", "right": "3"}}' },
    { name: '中間表現', content: 'LOAD 5\nLOAD 3\nADD\nSTORE x' },
    { name: '目的コード', content: '010101010101\n101010101010\n111000111000\n000111000111' },
  ]

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const reset = () => {
    setCurrentStep(0)
  }

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">コンパイラの動作</h2>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-indigo-600">コンパイラとは？</h3>
        <p className="mb-2 text-sm sm:text-base">
          コンパイラは、高級プログラミング言語で書かれたソースコードを、コンピュータが直接実行できる機械語（バイナリコード）に変換するプログラムです。これにより、プログラムがより高速に実行されます。
        </p>
        <p className="mb-2 text-sm sm:text-base">
          主な処理段階は以下の通りで、それぞれがプログラムの変換過程に重要な役割を果たしています：
        </p>
        <ol className="list-decimal list-inside mb-4 text-sm sm:text-base">
          <li className="mb-1">
            <strong>字句解析（トークン化）:</strong> ソースコードを構成要素に分割し、トークンと呼ばれる単位に変換します。
          </li>
          <li className="mb-1">
            <strong>構文解析:</strong> トークンの並びが文法的に正しいかをチェックし、構文ツリーを生成します。
          </li>
          <li className="mb-1">
            <strong>意味解析:</strong> 構文ツリーを基に、型チェックや変数のスコープを確認し、正確な意味を解析します。
          </li>
          <li className="mb-1">
            <strong>中間コード生成:</strong> プラットフォームに依存しない中間形式のコードを作成し、効率的な最適化の準備を行います。
          </li>
          <li className="mb-1">
            <strong>最適化:</strong> 実行速度やメモリ使用効率を向上させるために中間コードを最適化します。
          </li>
          <li className="mb-1">
            <strong>目的コード生成:</strong> 最終的に中間コードを機械語に変換し、実行可能なバイナリコードを生成します。
          </li>
        </ol>
        <p className="text-sm sm:text-base">以下の例で、簡略化したコンパイル過程の詳細を見てみましょう。</p>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg sm:text-xl font-bold mb-4 text-indigo-600">コンパイル過程</h3>
        <div className="flex flex-wrap items-center justify-center mb-4 gap-2">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${
                index === currentStep ? 'bg-green-500 text-white' : 'bg-gray-200'
              }`}>
                <span className="text-xs sm:text-sm font-semibold text-center">{step.name}</span>
              </div>
              {index < steps.length - 1 && <ChevronRight className="mx-1 sm:mx-2" />}
            </React.Fragment>
          ))}
        </div>
        <div className="bg-gray-100 p-3 sm:p-4 rounded-lg mb-4">
          <p className="font-semibold mb-2 text-sm sm:text-base">{steps[currentStep].name}:</p>
          <pre className="whitespace-pre-wrap text-xs sm:text-sm">{steps[currentStep].content}</pre>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-full text-sm sm:text-lg font-semibold hover:bg-blue-600 disabled:bg-gray-400 transition-colors duration-300"
          >
            次のステップ
          </button>
          <button
            onClick={reset}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-500 text-white rounded-full text-sm sm:text-lg font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center justify-center"
          >
            <RefreshCw className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            リセット
          </button>
        </div>
      </div>

      <div className="bg-yellow-100 p-3 sm:p-4 rounded-lg shadow">
        <p className="text-base sm:text-lg font-semibold mb-2">注意：</p>
        <p className="text-sm sm:text-base">この例は非常に簡略化されています。実際のコンパイラはもっと複雑で、多くの最適化や詳細な処理を行います。</p>
      </div>
    </div>
  )
}