'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { RefreshCw, Clock, ArrowRight, AlertTriangle, CheckCircle, Timer } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts'

export default function MTTRVisualization() {
  const [incidents, setIncidents] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [mttr, setMttr] = useState(0)
  const [explanation, setExplanation] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)

  const generateNewIncident = () => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      startTime: Math.floor(Math.random() * 60),
      duration: Math.floor(Math.random() * 120) + 30, 
      isResolved: false
    }
  }

  const resetVisualization = useCallback(() => {
    const newIncidents = Array.from({ length: 5 }, () => generateNewIncident())
      .sort((a, b) => a.startTime - b.startTime)
    
    setIncidents(newIncidents)
    setCurrentStep(0)
    setMttr(0)
    setExplanation('インシデントが発生しました。MTTRを計算するために、各インシデントの解決時間を見ていきましょう。')
    setIsPlaying(false)
  }, [])

  useEffect(() => {
    resetVisualization()
  }, [resetVisualization])

  const calculateMTTR = (resolvedIncidents) => {
    if (resolvedIncidents.length === 0) return 0
    const totalTime = resolvedIncidents.reduce((sum, incident) => sum + incident.duration, 0)
    return Math.round(totalTime / resolvedIncidents.length)
  }

  const nextStep = useCallback(() => {
    if (currentStep >= incidents.length) return

    const updatedIncidents = [...incidents]
    updatedIncidents[currentStep].isResolved = true
    setIncidents(updatedIncidents)

    const currentMTTR = calculateMTTR(updatedIncidents.filter(i => i.isResolved))
    setMttr(currentMTTR)

    const incidentDuration = updatedIncidents[currentStep].duration
    setExplanation(
      `インシデント${currentStep + 1}の修復時間: ${incidentDuration}分\n` +
      `現在のMTTR: ${currentMTTR}分\n` +
      (currentStep === incidents.length - 1 
        ? '全てのインシデントが解決されました。'
        : '次のインシデントに進みましょう。')
    )

    setCurrentStep(prev => prev + 1)
  }, [currentStep, incidents])

  const getChartData = () => {
    return incidents.map((incident, index) => ({
      name: `インシデント${index + 1}`,
      duration: incident.isResolved ? incident.duration : 0,
      average: mttr
    }))
  }

  useEffect(() => {
    let timer
    if (isPlaying && currentStep < incidents.length) {
      timer = setInterval(nextStep, 2000)
    }
    return () => clearInterval(timer)
  }, [isPlaying, currentStep, incidents.length, nextStep])

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">
        MTTR
      </h2>

      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 space-y-4">
        <h3 className="text-xl font-bold text-indigo-600">MTTRとは？</h3>
        
        <div className="space-y-3">
          <p className="text-sm sm:text-base text-gray-700">
            MTTR（Mean Time To Recovery）は、システム障害やサービス停止が発生してから完全に復旧するまでの平均時間を測定する重要な指標です。この指標は、システムの信頼性とチームの対応能力を評価する上で重要な役割を果たします。
          </p>
          
          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="text-blue-500 w-5 h-5" />
              <p className="font-semibold text-sm sm:text-base">計算式</p>
            </div>
            <p className="ml-7 sm:ml-8 text-sm sm:text-base">MTTR = 全インシデントの修復時間の合計 ÷ インシデント数</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <h4 className="font-semibold flex items-center gap-2 mb-2 text-sm sm:text-base">
                <Timer className="text-gray-600 w-5 h-5" />
                測定する時間の範囲
              </h4>
              <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-700">
                <li>障害の検知から開始</li>
                <li>問題の特定と分析</li>
                <li>修復作業の実施</li>
                <li>サービスの完全復旧まで</li>
                <li>復旧後の確認と検証</li>
                <li>再発防止策の検討</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <h4 className="font-semibold flex items-center gap-2 mb-2 text-sm sm:text-base">
                <CheckCircle className="text-gray-600 w-5 h-5" />
                MTTRの重要性
              </h4>
              <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-700">
                <li>サービス品質の指標</li>
                <li>運用チームの対応力評価</li>
                <li>ビジネスへの影響度測定</li>
                <li>改善目標の設定</li>
                <li>SLA達成度の評価</li>
                <li>運用プロセスの最適化</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="text-yellow-500 w-5 h-5" />
              <p className="font-semibold text-sm sm:text-base">改善のポイント</p>
            </div>
            <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-700">
              <li>モニタリングの強化による早期発見</li>
              <li>インシデント対応手順の標準化</li>
              <li>自動復旧の仕組み導入</li>
              <li>チーム間の連携強化</li>
              <li>定期的な訓練と改善活動</li>
              <li>ナレッジベースの整備と活用</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
        <div className="mb-4">
          <h4 className="text-lg font-bold text-indigo-600 mb-2">現在の状況</h4>
          <p className="text-sm sm:text-base">解決済みインシデント: {incidents.filter(i => i.isResolved).length} / {incidents.length}</p>
          <p className="text-xl font-bold text-indigo-700">現在のMTTR: {mttr}分</p>
        </div>

        <div className="w-full h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={getChartData()}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: '修復時間（分）', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Line type="monotone" dataKey="duration" stroke="#4F46E5" name="修復時間" />
              <ReferenceLine y={mttr} stroke="#EF4444" strokeDasharray="3 3" label="MTTR" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg shadow mb-6">
        <p className="text-base sm:text-lg font-semibold mb-2">説明：</p>
        <p className="whitespace-pre-line text-sm sm:text-base">{explanation}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          disabled={currentStep >= incidents.length}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-green-500 text-white rounded-full text-sm sm:text-base font-semibold hover:bg-green-600 disabled:bg-gray-400 transition-colors duration-300 flex items-center"
        >
          {isPlaying ? '一時停止' : '自動再生'}
        </button>
        <button
          onClick={nextStep}
          disabled={currentStep >= incidents.length || isPlaying}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-full text-sm sm:text-base font-semibold hover:bg-blue-600 disabled:bg-gray-400 transition-colors duration-300 flex items-center"
        >
          <ArrowRight className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
          次のステップ
        </button>
        <button
          onClick={resetVisualization}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-500 text-white rounded-full text-sm sm:text-base font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center"
        >
          <RefreshCw className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
          リセット
        </button>
      </div>
    </div>
  )
}