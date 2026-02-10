import React, { useState, useEffect, useCallback } from 'react'
import { RefreshCw, Play, Pause } from 'lucide-react'

export default function MultiprocessorVisualization() {
  const [processes, setProcesses] = useState([])
  const [processors, setProcessors] = useState([])
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(0)
  const [explanation, setExplanation] = useState('')

  const generateProcesses = useCallback(() => {
    return Array.from({ length: 6 }, (_, index) => ({
      id: index + 1,
      burstTime: Math.floor(Math.random() * 8) + 2,
      priority: Math.floor(Math.random() * 3),
      remainingTime: null,
      status: 'waiting',
      processor: null,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`
    }))
  }, [])

  const initializeProcessors = useCallback(() => {
    return Array.from({ length: 3 }, (_, index) => ({
      id: index + 1,
      currentProcess: null,
      isActive: false
    }))
  }, [])

  const resetSimulation = useCallback(() => {
    const newProcesses = generateProcesses()
    newProcesses.forEach(process => {
      process.remainingTime = process.burstTime
    })
    setProcesses(newProcesses)
    setProcessors(initializeProcessors())
    setTime(0)
    setIsRunning(false)
    setExplanation('プロセスが待機状態です。再生ボタンを押して実行を開始してください。')
  }, [generateProcesses, initializeProcessors])

  const executeStep = useCallback(() => {
    setProcesses(prevProcesses => {
      const newProcesses = [...prevProcesses]

      newProcesses.forEach(process => {
        if (process.status === 'running') {
          process.remainingTime--
          if (process.remainingTime <= 0) {
            process.status = 'completed'
            process.processor = null
          }
        }
      })

      processors.forEach(processor => {
        if (!processor.currentProcess) {
          const availableProcess = newProcesses
            .filter(p => p.status === 'waiting' && !p.processor)
            .sort((a, b) => b.priority - a.priority)[0]
            
          if (availableProcess) {
            availableProcess.status = 'running'
            availableProcess.processor = processor.id
          }
        }
      })

      return newProcesses
    })

    setTime(prevTime => prevTime + 1)

    const runningCount = processes.filter(p => p.status === 'running').length
    const completedCount = processes.filter(p => p.status === 'completed').length
    const waitingCount = processes.filter(p => p.status === 'waiting').length
    
    setExplanation(
      `実行中のプロセス: ${runningCount}個, 完了したプロセス: ${completedCount}個, 待機中のプロセス: ${waitingCount}個`
    )
  }, [processors, processes])

  useEffect(() => {
    resetSimulation()
  }, [resetSimulation])

  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        if (processes.every(p => p.status === 'completed')) {
          setIsRunning(false)
          setExplanation('全てのプロセスが完了しました！リセットボタンで新しいプロセスを生成できます。')
        } else {
          executeStep()
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, processes, executeStep])

  const getProcessStatusClass = (status) => {
    switch (status) {
      case 'running':
        return 'bg-green-100'
      case 'completed':
        return 'bg-gray-100'
      default:
        return 'bg-white'
    }
  }

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">
        マルチプロセッサ
      </h2>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">
          マルチプロセッサとは？
        </h3>
        <p className="mb-2 text-sm sm:text-base">
          マルチプロセッサシステムとは、1台のコンピュータ内に複数のプロセッサ（CPU）を搭載し、
          それらが協調して動作するシステムです。各プロセッサは独立して異なるプロセスを
          同時に実行することができます。
        </p>
        <p className="mb-2 text-sm sm:text-base">
          このシステムには以下のような特徴と利点があります：
        </p>
        <ul className="list-disc list-inside mb-4 text-sm sm:text-base">
          <li className="mb-2">
            <span className="font-semibold">並列処理能力：</span>
            複数のプロセスを本当の意味で同時に実行できるため、
            シングルプロセッサシステムと比べて処理速度が大幅に向上します。
          </li>
          <li className="mb-2">
            <span className="font-semibold">負荷分散：</span>
            システムの負荷を複数のプロセッサに分散させることで、
            各プロセッサの負担を軽減し、システム全体の効率を高めることができます。
          </li>
          <li className="mb-2">
            <span className="font-semibold">信頼性：</span>
            1つのプロセッサが故障しても、他のプロセッサが処理を継続できるため、
            システムの信頼性が向上します。
          </li>
          <li className="mb-2">
            <span className="font-semibold">応答性：</span>
            複数のユーザーからの要求や複数のアプリケーションの実行に対して、
            より高い応答性を提供できます。
          </li>
        </ul>
        <p className="mb-2 text-sm sm:text-base">
          このシミュレーションでは、以下の要素を可視化しています：
        </p>
        <ul className="list-disc list-inside mb-4 text-sm sm:text-base">
          <li className="mb-1">各プロセスの実行状態（待機中/実行中/完了）</li>
          <li className="mb-1">プロセスの優先度と残り実行時間</li>
          <li className="mb-1">プロセッサの割り当て状況</li>
          <li className="mb-1">全体の進行状況とタイムライン</li>
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-center text-indigo-700">プロセッサの状態</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {processors.map(processor => (
            <div key={processor.id} 
              className="w-24 sm:w-32 h-24 sm:h-32 bg-white rounded-lg shadow-lg p-2 sm:p-4 flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-base sm:text-lg font-bold mb-2">CPU {processor.id}</div>
              {processes.find(p => p.processor === processor.id) ? (
                <div
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300"
                  style={{
                    backgroundColor: processes.find(p => p.processor === processor.id).color
                  }}
                >
                  P{processes.find(p => p.processor === processor.id).id}
                </div>
              ) : (
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm sm:text-base">
                  待機中
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-center text-indigo-700">プロセス一覧</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {processes.map(process => (
            <div
              key={process.id}
              className={`rounded-lg shadow p-3 sm:p-4 transition-all duration-300 hover:shadow-lg ${getProcessStatusClass(process.status)}`}
              style={{
                borderLeft: `4px solid ${process.color}`
              }}
            >
              <div className="font-bold mb-2">プロセス {process.id}</div>
              <div className="text-xs sm:text-sm space-y-1">
                <div>実行時間: {process.burstTime}秒</div>
                <div>残り時間: {process.remainingTime}秒</div>
                <div>優先度: {process.priority}</div>
                <div>状態: {
                  process.status === 'waiting' ? '待機中' :
                  process.status === 'running' ? '実行中' : '完了'
                }</div>
                {process.processor && 
                  <div>割当CPU: {process.processor}</div>
                }
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg shadow mb-6">
        <p className="text-base sm:text-lg font-semibold">実行状況：</p>
        <p className="text-sm sm:text-base">経過時間: {time}秒</p>
        <p className="text-sm sm:text-base">{explanation}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-full text-sm sm:text-lg font-semibold hover:bg-blue-600 transition-colors duration-300 flex items-center"
        >
          {isRunning ? <Pause className="mr-2 w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />}
          {isRunning ? '一時停止' : '開始'}
        </button>
        <button
          onClick={resetSimulation}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-500 text-white rounded-full text-sm sm:text-lg font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center"
        >
          <RefreshCw className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
          リセット
        </button>
      </div>
    </div>
  )
}