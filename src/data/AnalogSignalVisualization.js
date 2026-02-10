import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

const AnalogSignalVisualization = () => {
  const [frequency, setFrequency] = useState(1);
  const [amplitude, setAmplitude] = useState(1);
  const [phase, setPhase] = useState(0);
  const [time, setTime] = useState(0);
  const [points, setPoints] = useState([]);

  // 波形の生成
  useEffect(() => {
    const generatePoints = () => {
      const newPoints = [];
      for (let x = 0; x < 400; x++) {
        const t = x / 50;
        const y = amplitude * Math.sin(2 * Math.PI * frequency * t + phase + time);
        newPoints.push({ x, y });
      }
      return newPoints;
    };

    setPoints(generatePoints());
  }, [frequency, amplitude, phase, time]);

  // アニメーション
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.1);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">アナログ信号</h2>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold mb-4 text-indigo-600">アナログ信号とは？</h3>
        <p className="mb-4">アナログ信号は、時間とともに連続的に変化する信号です。</p>
        <p className="mb-4">代表的な例として、音声信号や電圧の変化などがあります。</p>
        <p>以下の要素を調整して、アナログ信号の性質を理解しましょう：</p>
        <ul className="list-disc list-inside mb-4">
          <li>周波数：1秒間に波が繰り返される回数</li>
          <li>振幅：波の高さ（強さ）</li>
          <li>位相：波の開始位置のずれ</li>
        </ul>
      </div>

      {/* 波形表示エリア */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 h-64 relative">
        <div className="absolute left-0 right-0 top-1/2 border-t border-gray-300" />
        <svg width="100%" height="100%" viewBox="0 0 400 200">
          <path
            d={`M ${points.map(p => `${p.x} ${100 + p.y * 50}`).join(' L ')}`}
            fill="none"
            stroke="blue"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* コントロールパネル */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            周波数: {frequency.toFixed(1)} Hz
          </label>
          <input
            type="range"
            value={frequency}
            onChange={(e) => setFrequency(parseFloat(e.target.value))}
            min={0.1}
            max={5}
            step={0.1}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            振幅: {amplitude.toFixed(1)}
          </label>
          <input
            type="range"
            value={amplitude}
            onChange={(e) => setAmplitude(parseFloat(e.target.value))}
            min={0.1}
            max={2}
            step={0.1}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            位相: {(phase * 180 / Math.PI).toFixed(0)}°
          </label>
          <input
            type="range"
            value={phase}
            onChange={(e) => setPhase(parseFloat(e.target.value))}
            min={0}
            max={2 * Math.PI}
            step={0.1}
            className="w-full"
          />
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => {
            setFrequency(1);
            setAmplitude(1);
            setPhase(0);
          }}
          className="px-6 py-3 bg-purple-500 text-white rounded-full text-lg font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center mx-auto"
        >
          <RefreshCw className="mr-2" />
          リセット
        </button>
      </div>
    </div>
  );
};

export default AnalogSignalVisualization;
