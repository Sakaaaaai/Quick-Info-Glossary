'use client'

import React, { useState, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'

export default function RunLengthEncodingVisualization() {
  const [input, setInput] = useState('')
  const [encoded, setEncoded] = useState('')
  const [explanation, setExplanation] = useState('')
  const [step, setStep] = useState(0)

  useEffect(() => {
    generateRandomInput()
  }, [])

  const generateRandomInput = () => {
    const characters = 'ABCDEF'
    let result = ''
    const length = Math.floor(Math.random() * 6) + 5 // 5から10文字のランダムな長さ
    for (let i = 0; i < length; i++) {
      const randomChar = characters.charAt(Math.floor(Math.random() * characters.length))
      const repeatCount = Math.floor(Math.random() * 3) + 1 // 1から3回繰り返す
      result += randomChar.repeat(repeatCount)
    }
    setInput(result)
    setEncoded('')
    setStep(0)
    setExplanation('「次のステップ」ボタンを押して、ランレングス法の処理を見てみましょう。')
  }

  const nextStep = () => {
    if (step >= input.length) return

    let currentChar = input[step]
    let count = 1
    let i = step + 1

    while (i < input.length && input[i] === currentChar) {
      count++
      i++
    }

    setEncoded(prev => prev + count + currentChar)
    setExplanation(`${currentChar}が${count}回連続しています。${count}${currentChar}と記録します。`)
    setStep(i)
  }

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-green-700">ランレングス法</h2>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-green-600">ランレングス法とは？</h3>
        <p className="mb-2 text-sm sm:text-base">ランレングス法（Run Length Encoding）は、データ圧縮の一種です。</p>
        <p className="mb-2 text-sm sm:text-base">同じ文字が連続して出現する場合に、その<span className="font-semibold">文字と出現回数</span>で置き換えます。</p>
        <p className="mb-2 text-sm sm:text-base">例えば、<span className="font-semibold">「AAABBBCCC」</span>は<span className="font-semibold">「3A3B3C」</span>と圧縮できます。</p>
        <p className="mb-4 text-sm sm:text-base">この方法は、同じデータが連続するパターンが多い場合に効果的です。</p>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center text-green-600">ランレングス法を体験する</h3>
      
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <p className="text-base sm:text-lg font-semibold mb-2">入力文字列：</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {input.split('').map((char, index) => (
            <span 
              key={index} 
              className={`inline-block w-6 h-6 sm:w-8 sm:h-8 text-center leading-6 sm:leading-8 text-sm sm:text-base rounded ${
                index < step ? 'bg-green-200' : 'bg-blue-100'
              }`}
            >
              {char}
            </span>
          ))}
        </div>
        <p className="text-base sm:text-lg font-semibold mb-2">圧縮結果：</p>
        <p className="text-lg sm:text-xl">{encoded}</p>
      </div>

      <div className="bg-yellow-100 p-3 sm:p-4 rounded-lg shadow mb-6">
        <p className="text-base sm:text-lg font-semibold">説明：</p>
        <p className="text-sm sm:text-base">{explanation}</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={nextStep}
          disabled={step >= input.length}
          className="px-4 py-2 sm:px-6 sm:py-3 bg-green-500 text-white rounded-full text-sm sm:text-lg font-semibold hover:bg-green-600 disabled:bg-gray-400 transition-colors duration-300"
        >
          次のステップ
        </button>
        <button
          onClick={generateRandomInput}
          className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white rounded-full text-sm sm:text-lg font-semibold hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
        >
          <RefreshCw className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
          新しい文字列
        </button>
      </div>
    </div>
  )
}