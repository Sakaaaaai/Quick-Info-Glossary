import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

const SamplingVisualization = () => {
  const [samplingRate, setSamplingRate] = useState(10);
  const [amplitude, setAmplitude] = useState(50);
  const [frequency, setFrequency] = useState(1);
  const [points, setPoints] = useState([]);
  const [sampledPoints, setSampledPoints] = useState([]);
  const [,] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState(0);

  // 波形生成
  useEffect(() => {
    const generatePoints = () => {
      const newPoints = [];
      for (let x = 0; x < 360; x++) {
        const y = amplitude * Math.sin(((x + phase) * frequency * Math.PI) / 180);
        newPoints.push({ x, y });
      }
      setPoints(newPoints);

      const sampled = [];
      for (let x = 0; x < 360; x += 360 / samplingRate) {
        const y = amplitude * Math.sin(((x + phase) * frequency * Math.PI) / 180);
        sampled.push({ x, y });
      }
      setSampledPoints(sampled);
    };

    generatePoints();
  }, [amplitude, frequency, samplingRate, phase]);

  // アニメーション
  useEffect(() => {
    let animationFrame;
    const animate = () => {
      if (isPlaying) {
        setPhase((prev) => (prev + 2) % 360);
        animationFrame = requestAnimationFrame(animate);
      }
    };
    if (isPlaying) {
      animationFrame = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying]);

  const padding = 40;
  const scaleX = (x, width) => (x / 360) * (width - 2 * padding) + padding;
  const scaleY = (y, height) => height / 2 - y * 0.8;

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg mx-auto max-w-screen-lg md:max-w-screen-md sm:max-w-sm">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        標本化
      </h2>

      <div className="mb-6 p-4 bg-white shadow rounded-lg">
        <h3 className="text-xl font-bold mb-2">標本化とは？</h3>
        <p>
          標本化は、連続的なアナログ信号をデジタルデータに変換する重要な過程です。
          一定の時間間隔で信号の値を測定（サンプリング）することで、
          連続的な波形を離散的なデータ点の集合として表現します。
        </p>
      </div>

      <div className="mb-6 p-4 bg-white shadow rounded-lg">
        <h4 className="font-bold mb-2">波形のパラメータ</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              サンプリング回数: {samplingRate}回/周期
            </label>
            <input
              type="range"
              min="4"
              max="30"
              value={samplingRate}
              onChange={(e) => setSamplingRate(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">振幅: {amplitude}</label>
            <input
              type="range"
              min="10"
              max="100"
              value={amplitude}
              onChange={(e) => setAmplitude(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">周波数: {frequency}Hz</label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={frequency}
              onChange={(e) => setFrequency(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="relative mb-6 p-4 bg-white shadow rounded-lg">
        <svg
          className="w-full h-auto"
          viewBox="0 0 800 400"
          preserveAspectRatio="xMidYMid meet"
        >
          {[...Array(9)].map((_, i) => (
            <line
              key={`grid-${i}`}
              x1={padding}
              y1={200 - (360 - 2 * padding) / 8 * i}
              x2={800 - padding}
              y2={200 - (360 - 2 * padding) / 8 * i}
              stroke="#f0f0f0"
              strokeWidth="1"
            />
          ))}

          <line x1={padding} y1={200} x2={800 - padding} y2={200} stroke="gray" strokeWidth="1" />
          <line x1={padding} y1={padding} x2={padding} y2={400 - padding} stroke="gray" strokeWidth="1" />

          <path d={`M ${points.map((p) => `${scaleX(p.x, 800)},${scaleY(p.y, 400)}`).join(' L ')}`} fill="none" stroke="blue" strokeWidth="2" />
          {sampledPoints.map((p, i) => (
            <g key={i}>
              <line x1={scaleX(p.x, 800)} y1={200} x2={scaleX(p.x, 800)} y2={scaleY(p.y, 400)} stroke="red" strokeWidth="1" strokeDasharray="4" />
              <circle cx={scaleX(p.x, 800)} cy={scaleY(p.y, 400)} r="4" fill="red" />
            </g>
          ))}
        </svg>

        <div className="absolute top-2 right-2 space-x-2">
          <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
            <RefreshCw className={`w-5 h-5 ${isPlaying ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="p-4 bg-white shadow rounded-lg">
        <h4 className="font-bold mb-2">標本化の視覚的説明</h4>
        <p>
          このグラフでは、青い線が連続的な波形を表し、赤い点が標本化されたデータポイントを示しています。標本化は、連続的な波形を一定間隔で離散的な点として取り出すプロセスです。サンプリングレートが高いほど、赤い点が青い線に近づき、波形の形をより正確に再現できます。
        </p>
      </div>
    </div>
  );
};

export default SamplingVisualization;
