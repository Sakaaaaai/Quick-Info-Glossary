import React, { useState } from 'react'
import { RefreshCw } from 'lucide-react'

export default function Component() {
  const [number1, setNumber1] = useState(1.0)
  const [number2, setNumber2] = useState(1.0e-8)
  
  const normalCalculation = () => {
    return (number1 + number2) - number1
  }

  const accurateCalculation = () => {
    return number2
  }

  const calculateError = () => {
    const normal = normalCalculation()
    const accurate = accurateCalculation()
    return Math.abs(normal - accurate)
  }

  const toScientific = (num) => {
    return num.toExponential(8)
  }

  const visualizeDigits = (num) => {
    const digits = num.toExponential(8).split('e')[0].replace('.', '').split('')
    return digits.map((digit, index) => {
      const isSignificant = index < 8
      return (
        <div
          key={index}
          className={`w-6 h-8 sm:w-8 sm:h-12 flex items-center justify-center border rounded-lg m-0.5 sm:m-1 text-xs sm:text-base
            ${isSignificant ? 'bg-blue-100 border-blue-500' : 'bg-gray-100 border-gray-300'}`}
        >
          {digit}
        </div>
      )
    })
  }

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-indigo-700">桁落ち誤差</h2>

      <div className="p-4 sm:p-6 mb-4 sm:mb-6 bg-white rounded-lg shadow-md">
        <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-indigo-600">桁落ち誤差とは？</h3>
        <p className="mb-2 sm:mb-4 text-sm sm:text-base">
          桁落ち誤差は、近い値の大きな数値同士の引き算で発生する数値計算上の誤差です。
          有効桁数が失われることで、計算結果の精度が低下する現象です。
        </p>
        <p className="mb-2 sm:mb-4 text-sm sm:text-base">
          例：(1.0 + 1.0e-8) - 1.0 の計算では、本来は 1.0e-8 になるはずですが、
          浮動小数点数の精度限界により、正確な結果が得られないことがあります。
        </p>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">数値の視覚化</h3>
        
        <div className="mb-4 sm:mb-6">
          <p className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">数値1 (a): {toScientific(number1)}</p>
          <div className="flex flex-wrap">{visualizeDigits(number1)}</div>
        </div>

        <div className="mb-4 sm:mb-6">
          <p className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">数値2 (b): {toScientific(number2)}</p>
          <div className="flex flex-wrap">{visualizeDigits(number2)}</div>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">計算結果</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
            <p className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">通常の計算: (a + b) - a</p>
            <p className="text-base sm:text-lg">{toScientific(normalCalculation())}</p>
          </div>
          
          <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
            <p className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">正確な値: b</p>
            <p className="text-base sm:text-lg">{toScientific(accurateCalculation())}</p>
          </div>
        </div>

        <div className="mt-4 p-3 sm:p-4 bg-yellow-50 rounded-lg">
          <p className="font-semibold text-sm sm:text-base">絶対誤差:</p>
          <p className="text-base sm:text-lg">{calculateError().toExponential(8)}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={() => {
            setNumber1(1.0)
            setNumber2(1.0e-8)
          }}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center justify-center"
        >
          <RefreshCw className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
          リセット
        </button>
        <button
          onClick={() => {
            setNumber2(number2 * 0.1)
          }}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
        >
          数値2を10分の1に
        </button>
      </div>
    </div>
  )
}
