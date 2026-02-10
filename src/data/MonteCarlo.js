import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';

const MonteCarloVisualization = () => {
  const [points, setPoints] = useState([]);
  const [insideCircle, setInsideCircle] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [piEstimate, setPiEstimate] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  const canvasSize = 300;
  const radius = canvasSize / 2;

  const addPoints = useCallback((numPoints) => {
    let newPoints = [];
    let newInsideCircle = 0;

    for (let i = 0; i < numPoints; i++) {
      const x = Math.random() * canvasSize;
      const y = Math.random() * canvasSize;
      const distanceFromCenter = Math.sqrt(Math.pow(x - radius, 2) + Math.pow(y - radius, 2));
      const isInside = distanceFromCenter <= radius;

      newPoints.push({ x, y, isInside });
      newInsideCircle += isInside ? 1 : 0;
    }

    setPoints(prevPoints => [...prevPoints, ...newPoints]);
    setTotalPoints(prev => prev + numPoints);
    setInsideCircle(prev => prev + newInsideCircle);
    setPiEstimate((insideCircle + newInsideCircle) / (totalPoints + numPoints) * 4);
  }, [canvasSize, radius, insideCircle, totalPoints]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        addPoints(100); // 一度に追加する点の数を100に設定
      }, 100); // インターバルを100msに設定
      return () => clearInterval(interval);
    }
  }, [isRunning, addPoints]);

  const resetSimulation = () => {
    setPoints([]);
    setInsideCircle(0);
    setTotalPoints(0);
    setPiEstimate(0);
    setIsRunning(false);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-indigo-700">モンテカルロ法</h2>
      
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold mb-2 text-indigo-600">モンテカルロ法とは？</h3>
        <p className="mb-2">モンテカルロ法は、乱数を使用して数値計算や確率の問題を解く方法です。</p>
        <p className="mb-2">この例では、正方形の中に描かれた円の面積比から円周率（π）を推定します。</p>
        <p className="mb-4">以下がその方法です：</p>
        <ol className="list-decimal list-inside mb-4">
          <li className="mb-1">正方形の中にランダムな点を打ちます</li>
          <li className="mb-1">点が円の内側に入る確率は、(円の面積)/(正方形の面積)になります</li>
          <li className="mb-1">この確率は π/4 に等しくなります</li>
          <li className="mb-1">多くの点を打つことで、確率を推定し、πを計算します</li>
        </ol>
        <p>点の数が増えるほど、推定値は実際の円周率に近づきます。</p>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-4" style={{ width: canvasSize, height: canvasSize, backgroundColor: 'white' }}>
          <div className="absolute inset-0 border-4 border-blue-500 rounded-full"></div>
          {points.map((point, index) => (
            <div
              key={index}
              className={`absolute w-1 h-1 rounded-full ${point.isInside ? 'bg-green-500' : 'bg-red-500'}`}
              style={{ left: point.x, top: point.y }}
            ></div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold">
            推定された π の値: {piEstimate.toFixed(6)}
          </p>
          <p>実際の π の値: 3.141592...</p>
          <p>総点数: {totalPoints}</p>
          <p>円内の点数: {insideCircle}</p>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-6 py-3 text-white rounded-full text-lg font-semibold transition-colors duration-300 ${
            isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isRunning ? '停止' : '開始'}
        </button>
        <button
          onClick={resetSimulation}
          className="px-6 py-3 bg-purple-500 text-white rounded-full text-lg font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center"
        >
          <RefreshCw className="mr-2" />
          リセット
        </button>
      </div>
    </div>
  );
};

export default MonteCarloVisualization;
