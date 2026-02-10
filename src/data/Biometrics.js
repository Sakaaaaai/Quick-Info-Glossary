import React, { useState, useEffect } from 'react'
import { Fingerprint, Lock, CheckCircle, XCircle, RefreshCw, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const FingerprintScanner = ({ status }) => {
  return (
    <motion.div
      className={`w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center ${
        status === 'scanning' ? 'bg-blue-200' : 
        status === 'success' ? 'bg-green-200' :
        status === 'error' ? 'bg-red-200' : 'bg-gray-200'
      }`}
      animate={status === 'scanning' ? { scale: [1, 1.1, 1] } : {}}
      transition={{ repeat: Infinity, duration: 1 }}
    >
      <Fingerprint size={32} className={`sm:w-12 sm:h-12 ${
        status === 'success' ? 'text-green-600' :
        status === 'error' ? 'text-red-600' : 'text-gray-600'
      }`} />
    </motion.div>
  )
}

const BiometricsDemo = () => {
  const [step, setStep] = useState(0)
  const [scannerStatus, setScannerStatus] = useState('idle')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const steps = [
    { title: "認証開始", description: "指紋センサーに触れてください" },
    { title: "スキャン中", description: "指紋をスキャンしています..." },
    { title: "照合中", description: "指紋データを照合しています..." },
    { title: "認証完了", description: "認証が完了しました" },
  ]

  useEffect(() => {
    if (step === 1) {
      setScannerStatus('scanning')
      const timer = setTimeout(() => setStep(2), 2000)
      return () => clearTimeout(timer)
    }
    if (step === 2) {
      const timer = setTimeout(() => {
        const success = Math.random() > 0.3
        setStep(3)
        setScannerStatus(success ? 'success' : 'error')
        setIsAuthenticated(success)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [step])

  const startScan = () => {
    setStep(1)
    setScannerStatus('idle')
    setIsAuthenticated(false)
  }

  const reset = () => {
    setStep(0)
    setScannerStatus('idle')
    setIsAuthenticated(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 sm:p-6 shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-indigo-700 mb-4">
          バイオメトリクス認証
        </h2>
        
        <div className="bg-white rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <p className="mb-4 text-sm sm:text-base">
            バイオメトリクス認証は、あなたの体の特徴を使って本人確認を行う技術です。
            例えば：
          </p>
          <ul className="list-disc list-inside space-y-1 sm:space-y-2 mb-4 text-sm sm:text-base">
            <li>指紋認証（スマートフォンのロック解除）</li>
            <li>顔認証（Face ID）</li>
            <li>虹彩認証（目の模様）</li>
            <li>声紋認証（声の特徴）</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-indigo-600 mb-4">
            指紋認証を体験してみよう！
          </h3>
          
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <FingerprintScanner status={scannerStatus} />
            <div className="mt-4 text-center">
              <h4 className="text-base sm:text-lg font-semibold text-indigo-600">{steps[step].title}</h4>
              <p className="text-sm sm:text-base text-gray-600">{steps[step].description}</p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4">
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center ${isAuthenticated ? 'text-green-600' : 'text-red-600'}`}
              >
                {isAuthenticated ? (
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-semibold text-sm sm:text-base">認証成功！</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <XCircle className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-semibold text-sm sm:text-base">認証失敗</span>
                  </div>
                )}
              </motion.div>
            )}
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={startScan}
                disabled={step !== 0 && step !== 3}
                className="px-4 sm:px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-400 transition-colors duration-300 flex items-center justify-center text-sm sm:text-base"
              >
                {step === 0 ? <Lock className="mr-2 w-4 h-4 sm:w-5 sm:h-5" /> : <ArrowRight className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />}
                {step === 0 ? '認証開始' : '次へ'}
              </button>
              <button
                onClick={reset}
                className="px-4 sm:px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors duration-300 flex items-center justify-center text-sm sm:text-base"
              >
                <RefreshCw className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                リセット
              </button>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-indigo-600 mb-4">
            バイオメトリクス認証のメリット
          </h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li className="flex items-center">
              <CheckCircle className="text-green-500 mr-2 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>パスワードを覚える必要がない</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="text-green-500 mr-2 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>なりすましが難しい</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="text-green-500 mr-2 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>素早く認証できる</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="text-green-500 mr-2 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>パスワードの漏洩の心配がない</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BiometricsDemo