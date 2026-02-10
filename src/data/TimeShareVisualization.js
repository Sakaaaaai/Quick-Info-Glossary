import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';

const TimeShareExplanation = () => (
  <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">タイムシェアリングとは？</h3>
    <p className="mb-2">タイムシェアリングは、複数のプロセスがCPUの処理時間を共有する方式です。</p>
    <p className="mb-2">各プロセスは一定時間（タイムクォンタム）ずつCPUを使用し、これにより複数のタスクを同時に実行しているように見せます。</p>
    <p className="mb-4">ラウンドロビンは、最も一般的なスケジューリング方式の一つです：</p>
    <ol className="list-decimal list-inside mb-4">
      <li className="mb-1">各プロセスに順番にCPU時間を割り当てます</li>
      <li className="mb-1">一定時間（タイムクォンタム）が経過したら、次のプロセスに切り替えます</li>
      <li className="mb-1">全てのプロセスを一巡したら、再び最初から割り当てを行います</li>
      <li className="mb-1">これにより、全てのプロセスに公平にCPU時間が配分されます</li>
    </ol>
  </div>
);

const TimeShareVisualization = () => {
  const [processes, setProcesses] = useState([
    { id: 1, name: 'プロセスA', color: 'bg-blue-300', remainingTime: 6, status: 'waiting', priority: 1, waitingTime: 0 },
    { id: 2, name: 'プロセスB', color: 'bg-green-300', remainingTime: 4, status: 'waiting', priority: 2, waitingTime: 0 },
    { id: 3, name: 'プロセスC', color: 'bg-purple-300', remainingTime: 5, status: 'waiting', priority: 3, waitingTime: 0 }
  ]);
  const [currentProcess, setCurrentProcess] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeQuantum] = useState(2);
  const [currentTime, setCurrentTime] = useState(0);
  const [executionLog, setExecutionLog] = useState([]);
  const [schedulingMode] = useState('round-robin');

  const moveToNextProcess = useCallback(() => {
    setCurrentProcess(prev => {
      if (schedulingMode === 'priority') {
        const nextProcess = processes
          .filter(p => p.remainingTime > 0)
          .sort((a, b) => a.priority - b.priority)[0];
        return nextProcess ? processes.indexOf(nextProcess) : prev;
      } else {
        let next = (prev + 1) % processes.length;
        while (next !== prev) {
          if (processes[next].remainingTime > 0) {
            return next;
          }
          next = (next + 1) % processes.length;
        }
        return prev;
      }
    });
  }, [schedulingMode, processes]);

  const updateProcesses = useCallback(() => {
    setProcesses(prevProcesses => {
      const newProcesses = [...prevProcesses];

      newProcesses.forEach((proc, index) => {
        if (index !== currentProcess && proc.status !== 'completed') {
          proc.waitingTime += 1;
        }
      });

      const current = newProcesses[currentProcess];

      if (current && current.remainingTime > 0) {
        current.remainingTime -= 1;
        current.status = 'running';

        if (current.remainingTime === 0) {
          current.status = 'completed';
          setExecutionLog(prev => [
            ...prev,
            `${current.name}が完了しました（待ち時間: ${current.waitingTime}秒）`
          ]);
          moveToNextProcess();
        } else if (timeQuantum && currentTime % timeQuantum === 0) {
          setExecutionLog(prev => [
            ...prev,
            `${current.name}のタイムクォンタム(${timeQuantum}秒)が終了`
          ]);
          moveToNextProcess();
        }
      } else {
        moveToNextProcess();
      }

      return newProcesses;
    });
  }, [currentProcess, timeQuantum, currentTime, moveToNextProcess]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev + 1);
        updateProcesses();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, updateProcesses]);

  const reset = () => {
    setProcesses([
      { id: 1, name: 'プロセスA', color: 'bg-blue-300', remainingTime: 6, status: 'waiting', priority: 1, waitingTime: 0 },
      { id: 2, name: 'プロセスB', color: 'bg-green-300', remainingTime: 4, status: 'waiting', priority: 2, waitingTime: 0 },
      { id: 3, name: 'プロセスC', color: 'bg-purple-300', remainingTime: 5, status: 'waiting', priority: 3, waitingTime: 0 }
    ]);
    setCurrentProcess(0);
    setIsRunning(false);
    setCurrentTime(0);
    setExecutionLog([]);
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">タイムシェアリング</h2>

      <TimeShareExplanation />

      <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center text-indigo-600">プロセスの状態</h3>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 transition-all duration-300">
        {processes.map((process, index) => (
          <div
            key={process.id}
            className={`w-24 h-24 sm:w-32 sm:h-32 flex flex-col items-center justify-center rounded-lg text-sm sm:text-base font-bold transition-all duration-300 ${
              process.color
            } ${
              currentProcess === index ? 'ring-4 ring-yellow-500 transform scale-110' : ''
            } ${
              process.status === 'completed' ? 'bg-gray-300' : ''
            }`}
          >
            <p>{process.name}</p>
            <p>残り: {process.remainingTime}秒</p>
            <p>待ち: {process.waitingTime}秒</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <p className="text-lg font-semibold mb-2">シミュレーション状況：</p>
        <p>経過時間: {currentTime}秒</p>
        <p>現在のプロセス: {processes[currentProcess]?.name || 'なし'}</p>
        <p>スケジューリング: {schedulingMode === 'round-robin' ? 'ラウンドロビン' : '優先度ベース'}</p>
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg shadow mb-6">
        <p className="text-lg font-semibold">実行ログ：</p>
        <ul className="list-disc list-inside">
          {executionLog.slice(-5).map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-4 sm:px-6 py-2 sm:py-3 ${isRunning ? 'bg-red-500' : 'bg-green-500'} text-white rounded-full text-base sm:text-lg font-semibold hover:bg-opacity-80 transition-colors duration-300 flex items-center`}
        >
          {isRunning ? <Pause className="mr-2" /> : <Play className="mr-2" />}
          {isRunning ? '停止' : '開始'}
        </button>
        <button
          onClick={reset}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-blue-600 transition-colors duration-300 flex items-center"
        >
          <RefreshCw className="mr-2" />
          リセット
        </button>
      </div>
    </div>
  );
};

export default TimeShareVisualization;
