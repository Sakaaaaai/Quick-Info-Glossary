import React, { useState, useEffect } from 'react'
import { ArrowRight, Lock, Unlock, RefreshCw, ShieldCheck, Key } from 'lucide-react'

const steps = [
  { client: 'クライアントHello', server: '待機中', description: 'クライアントがサーバーに接続を開始し、サポートする暗号化方式のリストを送信します。', icon: <ArrowRight className="text-blue-500" size={24} /> },
  { client: '待機中', server: 'サーバーHello', description: 'サーバーが応答し、使用する暗号化方式を選択します。また、サーバーの証明書を送信します。', icon: <ShieldCheck className="text-green-500" size={24} /> },
  { client: '証明書検証', server: '待機中', description: 'クライアントがサーバーの証明書を検証します。', icon: <ShieldCheck className="text-blue-500" size={24} /> },
  { client: '鍵交換', server: '鍵交換', description: 'クライアントとサーバーが安全に共通の秘密鍵を確立します。', icon: <Key className="text-purple-500" size={24} /> },
  { client: '完了', server: '完了', description: 'ハンドシェイクが完了し、安全な通信が確立されました。', icon: <Lock className="text-green-500" size={24} /> },
]

export default function SSLTLSVisualization() {
  const [step, setStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [packetPosition, setPacketPosition] = useState('client')

  useEffect(() => {
    let timeout
    if (isAnimating) {
      timeout = setTimeout(() => {
        setPacketPosition(packetPosition === 'client' ? 'server' : 'client')
        if (packetPosition === 'server') {
          setIsAnimating(false)
          if (step < steps.length - 1) {
            setStep(step + 1)
          }
        }
      }, 1000)
    }
    return () => clearTimeout(timeout)
  }, [isAnimating, packetPosition, step])

  const nextStep = () => {
    if (step < steps.length - 1) {
      setIsAnimating(true)
      setPacketPosition('client')
    }
  }

  const resetVisualization = () => {
    setStep(0)
    setIsAnimating(false)
    setPacketPosition('client')
  }

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-center text-blue-700">SSL/TLS</h2>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-blue-600">SSL/TLSとは？</h3>
        <p className="mb-3 sm:mb-4 text-sm sm:text-base text-gray-700">SSL (Secure Sockets Layer) とTLS (Transport Layer Security) は、インターネット上で安全な通信を実現するためのプロトコルです。</p>
        <p className="mb-3 sm:mb-4 text-sm sm:text-base text-gray-700">これらのプロトコルは以下の機能を提供します：</p>
        <ul className="list-disc list-inside mb-3 sm:mb-4 text-sm sm:text-base text-gray-700">
          <li className="mb-1 sm:mb-2">データの暗号化（盗聴の防止）</li>
          <li className="mb-1 sm:mb-2">データの完全性の確保（改ざんの検出）</li>
          <li className="mb-1 sm:mb-2">通信相手の認証</li>
        </ul>
        <p className="text-sm sm:text-base text-gray-700">以下の可視化では、SSL/TLSハンドシェイクの基本的な流れをアニメーションで示しています。</p>
      </div>

      <div className="mb-6 sm:mb-8">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm ${
                index <= step ? 'bg-blue-500 text-white' : 'bg-gray-300'
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-300 rounded-full mb-3 sm:mb-4">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className={`w-full sm:w-1/3 p-4 sm:p-6 rounded-lg shadow-md text-center ${packetPosition === 'client' ? 'bg-blue-100' : 'bg-white'}`}>
          <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-blue-700">クライアント</h3>
          <p className="text-base sm:text-lg text-blue-600">{steps[step].client}</p>
        </div>
        <div className="w-full sm:w-1/4 h-16 sm:h-auto relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {steps[step].icon}
          </div>
        </div>
        <div className={`w-full sm:w-1/3 p-4 sm:p-6 rounded-lg shadow-md text-center ${packetPosition === 'server' ? 'bg-green-100' : 'bg-white'}`}>
          <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-green-700">サーバー</h3>
          <p className="text-base sm:text-lg text-green-600">{steps[step].server}</p>
        </div>
      </div>

      <div className="bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8">
        <p className="text-lg sm:text-xl font-semibold mb-2 text-yellow-700">ステップ {step + 1}:</p>
        <p className="text-sm sm:text-base text-gray-700">{steps[step].description}</p>
      </div>

      <div className="flex justify-center items-center mb-6 sm:mb-8">
        {step < steps.length - 1 ? (
          <div className="flex items-center bg-red-100 px-4 sm:px-6 py-2 sm:py-3 rounded-full">
            <Unlock className="text-red-500 mr-2 sm:mr-3" size={20} />
            <p className="text-sm sm:text-base font-semibold text-red-700">接続は暗号化されていません</p>
          </div>
        ) : (
          <div className="flex items-center bg-green-100 px-4 sm:px-6 py-2 sm:py-3 rounded-full">
            <Lock className="text-green-500 mr-2 sm:mr-3" size={20} />
            <p className="text-sm sm:text-base font-semibold text-green-700">安全な接続が確立されました</p>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={nextStep}
          disabled={step === steps.length - 1 || isAnimating}
          className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-blue-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-blue-600 disabled:bg-gray-400 transition-colors duration-300"
        >
          次のステップ
        </button>
        <button
          onClick={resetVisualization}
          className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center"
        >
          <RefreshCw className="mr-2" size={20} />
          最初から
        </button>
      </div>
    </div>
  )
}