import React, { useState, useEffect } from 'react';
import { RefreshCw, Clock, AlertTriangle, Calculator } from 'lucide-react';

const MTBFVisualization = () => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [failures, setFailures] = useState([]);
  const [running, setRunning] = useState(false);
  const [currentMTBF, setCurrentMTBF] = useState(0);
  const [simulationSpeed, setSimulationSpeed] = useState(1000);
  const [intervals, setIntervals] = useState([]);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTimeElapsed(prev => {
          const newTime = prev + 1;
          // ランダムな故障発生（10%の確率）
          if (Math.random() < 0.1) {
            setFailures(f => [...f, newTime]);
          }
          return newTime;
        });
      }, simulationSpeed);
    }
    return () => clearInterval(interval);
  }, [running, simulationSpeed]);

  useEffect(() => {
    if (failures.length > 1) {
      const newIntervals = failures.slice(1).map((time, index) => time - failures[index]);
      setIntervals(newIntervals);
      const mtbf = newIntervals.reduce((sum, val) => sum + val, 0) / newIntervals.length;
      setCurrentMTBF(mtbf);
    }
  }, [failures]);

  const resetSimulation = () => {
    setTimeElapsed(0);
    setFailures([]);
    setCurrentMTBF(0);
    setIntervals([]);
    setRunning(false);
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">
        MTBF（平均故障間隔）
      </h2>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">MTBFとは？</h3>
        <p className="mb-2">
          MTBFは「Mean Time Between Failures（平均故障間隔）」の略で、
          システムが故障してから次の故障までの平均時間を表します。
        </p>
        <p className="mb-2">
          MTBFが長いほど、システムの信頼性が高いことを示します。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Clock className="mr-2 text-blue-500" />
              <span className="text-lg font-semibold">経過時間:</span>
            </div>
            <span className="text-xl text-blue-600">{timeElapsed}単位時間</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="mr-2 text-red-500" />
              <span className="text-lg font-semibold">故障回数:</span>
            </div>
            <span className="text-xl text-red-600">{failures.length}回</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center mb-2">
            <Calculator className="mr-2 text-green-500" />
            <h4 className="text-lg font-semibold">現在のMTBF</h4>
          </div>
          <p className="text-2xl text-green-600 font-bold">
            {currentMTBF.toFixed(2)}単位時間
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h4 className="text-lg font-semibold mb-4 text-indigo-600">MTBF計算過程</h4>
        
        {intervals.length > 0 ? (
          <>
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="font-semibold mb-2">故障間隔:</p>
              <div className="flex flex-wrap gap-2">
                {intervals.map((interval, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 rounded-full">
                    {interval}単位時間
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="mb-2">
                <span className="font-semibold">計算式：</span>
                <div className="mt-2 p-4 bg-yellow-50 rounded-lg">
                  <p className="font-mono">
                    MTBF = (
                    {intervals.join(' + ')}
                    ) ÷ {intervals.length}
                  </p>
                  <p className="font-mono mt-2">
                    = {intervals.reduce((sum, val) => sum + val, 0)} ÷ {intervals.length}
                  </p>
                  <p className="font-mono mt-2">
                    = {currentMTBF.toFixed(2)}単位時間
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-500 italic">
            シミュレーションを開始して、2回以上の故障が発生すると計算過程が表示されます。
          </p>
        )}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setRunning(!running)}
          className={`px-6 py-3 rounded-full text-white font-semibold transition-colors duration-300 ${
            running ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {running ? '一時停止' : 'スタート'}
        </button>
        <button
          onClick={resetSimulation}
          className="px-6 py-3 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center"
        >
          <RefreshCw className="mr-2" />
          リセット
        </button>
      </div>

      <div className="mt-4 flex justify-center items-center gap-2">
        <span className="text-sm">シミュレーション速度:</span>
        <select
          value={simulationSpeed}
          onChange={(e) => setSimulationSpeed(Number(e.target.value))}
          className="p-2 rounded border"
        >
          <option value={2000}>遅い</option>
          <option value={1000}>普通</option>
          <option value={500}>速い</option>
        </select>
      </div>
    </div>
  );
};

export default MTBFVisualization;