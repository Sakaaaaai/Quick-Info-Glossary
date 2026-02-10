'use client'

import React, { useState } from 'react'
import { Play, RefreshCw } from 'lucide-react'

export default function InterpreterVisualization() {
  const [sourceCode] = useState('x = 5\ny = 3\nprint(x + y)')
  const [currentStep, setCurrentStep] = useState(0)
  const [output, setOutput] = useState('')
  const [memory, setMemory] = useState({})

  const steps = sourceCode.split('\n')

  const executeStep = () => {
    if (currentStep >= steps.length) return

    const line = steps[currentStep].trim()
    let newOutput = output
    let newMemory = { ...memory }

    if (line.startsWith('print')) {
      const expression = line.slice(6, -1)
      const result = evaluateExpression(expression, newMemory)
      newOutput += result + '\n'
    } else if (line.includes('=')) {
      const [variable, value] = line.split('=').map(part => part.trim())
      newMemory[variable] = evaluateExpression(value, newMemory)
    }

    setOutput(newOutput)
    setMemory(newMemory)
    setCurrentStep(prevStep => prevStep + 1)
  }

  const evaluateExpression = (expression, mem) => {
    const tokens = expression.split(/([+\-*/])/)
    let result = 0
    let operator = '+'

    for (let token of tokens) {
      token = token.trim()
      if (['+', '-', '*', '/'].includes(token)) {
        operator = token
      } else {
        const value = mem[token] !== undefined ? mem[token] : Number(token)
        switch (operator) {
          case '+': result += value; break
          case '-': result -= value; break
          case '*': result *= value; break
          case '/': result /= value; break
          default: break
        }
      }
    }

    return result
  }

  const reset = () => {
    setCurrentStep(0)
    setOutput('')
    setMemory({})
  }

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-green-700">インタプリタの動作</h2>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-green-600">インタプリタとは？</h3>
        <p className="mb-2 text-sm sm:text-base">インタプリタは、プログラミング言語で書かれたソースコードを直接実行するプログラムです。</p>
        <p className="mb-2 text-sm sm:text-base">コンパイラとの主な違いは以下の通りです：</p>
        <ul className="list-disc list-inside mb-4 text-sm sm:text-base">
          <li className="mb-1">ソースコードを一行ずつ解析し、即座に実行します</li>
          <li className="mb-1">機械語に変換せず、直接実行するため、実行が速く始まります</li>
          <li className="mb-1">実行時エラーをその場で検出できます</li>
          <li className="mb-1">一般的に、コンパイル言語よりも実行速度は遅くなります</li>
        </ul>
        <p className="text-sm sm:text-base">以下の例で、簡略化したインタプリタの動作を見てみましょう。</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-base sm:text-lg font-bold mb-2 text-green-600">ソースコード</h3>
          <pre className="bg-gray-100 p-2 rounded text-xs sm:text-sm">{sourceCode}</pre>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-base sm:text-lg font-bold mb-2 text-green-600">メモリ状態</h3>
          <pre className="bg-gray-100 p-2 rounded text-xs sm:text-sm">
            {Object.entries(memory).map(([key, value]) => `${key}: ${value}`).join('\n')}
          </pre>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg sm:text-xl font-bold mb-4 text-green-600">実行過程</h3>
        <div className="bg-gray-100 p-3 sm:p-4 rounded-lg mb-4 h-24 sm:h-32 overflow-y-auto">
          <p className="font-semibold mb-2 text-sm sm:text-base">出力:</p>
          <pre className="text-xs sm:text-sm">{output}</pre>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={executeStep}
            disabled={currentStep >= steps.length}
            className="px-4 py-2 sm:px-6 sm:py-3 bg-green-500 text-white rounded-full text-sm sm:text-base font-semibold hover:bg-green-600 disabled:bg-gray-400 transition-colors duration-300 flex items-center justify-center"
          >
            <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            次の行を実行
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white rounded-full text-sm sm:text-base font-semibold hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
          >
            <RefreshCw className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            リセット
          </button>
        </div>
      </div>

      <div className="bg-yellow-100 p-3 sm:p-4 rounded-lg shadow">
        <p className="text-base sm:text-lg font-semibold mb-2">注意：</p>
        <p className="text-sm sm:text-base">この例は非常に簡略化されています。実際のインタプリタはもっと複雑で、多くの機能や最適化を行います。</p>
      </div>
    </div>
  )
}