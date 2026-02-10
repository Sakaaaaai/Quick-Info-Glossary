'use client'

import React, { useState, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'

export default function EntropyEncodingVisualization() {
  const [input, setInput] = useState('')
  const [frequencies, setFrequencies] = useState({})
  const [huffmanCodes, setHuffmanCodes] = useState({})
  const [encodedMessage, setEncodedMessage] = useState('')
  const [step, setStep] = useState(0)
  const [explanation, setExplanation] = useState('')

  useEffect(() => {
    generateRandomInput()
  }, [])

  const generateRandomInput = () => {
    const characters = 'ABCDEF'
    let result = ''
    const length = Math.floor(Math.random() * 6) + 10 // 10から15文字のランダムな長さ
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    setInput(result)
    setFrequencies({})
    setHuffmanCodes({})
    setEncodedMessage('')
    setStep(0)
    setExplanation('「次のステップ」ボタンを押して、エントロピー符号化（ハフマン符号化）の処理を見てみましょう。')
  }

  const calculateFrequencies = () => {
    const freq = {}
    for (let char of input) {
      freq[char] = (freq[char] || 0) + 1
    }
    setFrequencies(freq)
    setExplanation('各文字の出現頻度を計算しました。')
    setStep(1)
  }

  const generateHuffmanCodes = () => {
    const sortedChars = Object.keys(frequencies).sort((a, b) => frequencies[b] - frequencies[a])
    const codes = {}
    sortedChars.forEach((char, index) => {
      codes[char] = index.toString(2).padStart(Math.ceil(Math.log2(sortedChars.length)), '0')
    })
    setHuffmanCodes(codes)
    setExplanation('出現頻度に基づいてハフマン符号を生成しました。頻度が高い文字ほど短いコードが割り当てられます。')
    setStep(2)
  }

  const encodeMessage = () => {
    let encoded = ''
    for (let char of input) {
      encoded += huffmanCodes[char]
    }
    setEncodedMessage(encoded)
    setExplanation(`メッセージを符号化しました。元の${input.length * 8}ビットから${encoded.length}ビットに圧縮されました。`)
    setStep(3)
  }

  const nextStep = () => {
    switch (step) {
      case 0:
        calculateFrequencies()
        break
      case 1:
        generateHuffmanCodes()
        break
      case 2:
        encodeMessage()
        break
      default:
        break
    }
  }

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-purple-700">エントロピー符号化</h2>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-purple-600">エントロピー符号化とは？</h3>
        <p className="mb-2 text-sm sm:text-base">エントロピー符号化は、データの出現頻度に基づいて効率的に圧縮する方法です。</p>
        <p className="mb-2 text-sm sm:text-base">ハフマン符号化は、エントロピー符号化の一種で、<span className="font-semibold">出現頻度の高い文字には短いコード、低い文字には長いコード</span>を割り当てます。</p>
        <p className="mb-2 text-sm sm:text-base">これにより、データ全体のビット数を削減し、効率的な圧縮を実現します。</p>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center text-purple-600">ハフマン符号化を体験する</h3>
      
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <p className="text-base sm:text-lg font-semibold mb-2">入力文字列：</p>
        <p className="text-lg sm:text-xl mb-4">{input}</p>

        {step >= 1 && (
          <>
            <p className="text-base sm:text-lg font-semibold mb-2">文字の出現頻度：</p>
            <ul className="mb-4 text-sm sm:text-base">
              {Object.entries(frequencies).map(([char, freq]) => (
                <li key={char}>{char}: {freq}</li>
              ))}
            </ul>
          </>
        )}

        {step >= 2 && (
          <>
            <p className="text-base sm:text-lg font-semibold mb-2">ハフマン符号：</p>
            <ul className="mb-4 text-sm sm:text-base">
              {Object.entries(huffmanCodes).map(([char, code]) => (
                <li key={char}>{char}: {code}</li>
              ))}
            </ul>
          </>
        )}

        {step >= 3 && (
          <>
            <p className="text-base sm:text-lg font-semibold mb-2">符号化されたメッセージ：</p>
            <p className="text-lg sm:text-xl break-all">{encodedMessage}</p>
          </>
        )}
      </div>

      <div className="bg-yellow-100 p-3 sm:p-4 rounded-lg shadow mb-6">
        <p className="text-base sm:text-lg font-semibold">説明：</p>
        <p className="text-sm sm:text-base">{explanation}</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={nextStep}
          disabled={step >= 3}
          className="px-4 py-2 sm:px-6 sm:py-3 bg-purple-500 text-white rounded-full text-sm sm:text-lg font-semibold hover:bg-purple-600 disabled:bg-gray-400 transition-colors duration-300"
        >
          次のステップ
        </button>
        <button
          onClick={generateRandomInput}
          className="px-4 py-2 sm:px-6 sm:py-3 bg-pink-500 text-white rounded-full text-sm sm:text-lg font-semibold hover:bg-pink-600 transition-colors duration-300 flex items-center justify-center"
        >
          <RefreshCw className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
          新しい文字列
        </button>
      </div>
    </div>
  )
}