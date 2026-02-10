import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

const QuantizationVisualization = () => {
  const [bits, setBits] = useState(3);
  const [amplitude, setAmplitude] = useState(50);
  const [frequency, setFrequency] = useState(1);
  const [points, setPoints] = useState([]);
  const [quantizedPoints, setQuantizedPoints] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState(0);

  // 波形生成と量子化処理
  useEffect(() => {
    const generatePoints = () => {
      const newPoints = [];
      const quantized = [];
      const levels = Math.pow(2, bits); // 量子化レベル数
      const stepSize = (amplitude * 2) / levels; // 量子化ステップサイズ

      for (let x = 0; x < 360; x++) {
        const y = amplitude * Math.sin(((x + phase) * frequency * Math.PI) / 180);
        newPoints.push({ x, y });

        // 量子化処理
        const quantizedY = Math.round(y / stepSize) * stepSize;
        quantized.push({ x, y: quantizedY });
      }
      
      setPoints(newPoints);
      setQuantizedPoints(quantized);
    };

    generatePoints();
  }, [amplitude, frequency, bits, phase]);

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

  // レスポンシブ対応のためにビューのサイズを可変に
  const width = 800;
  const height = 400;
  const padding = 40;
  const scaleX = (x) => (x / 360) * (width - 2 * padding) + padding;
  const scaleY = (y) => height / 2 - y * 0.8;

  // 量子化レベルの線を描画
  const getQuantizationLevels = () => {
    const levels = Math.pow(2, bits);
    const stepSize = (amplitude * 2) / levels;
    const lines = [];
    
    for (let i = -levels/2; i <= levels/2; i++) {
      const y = i * stepSize;
      lines.push(y);
    }
    return lines;
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg max-w-screen-lg mx-auto md:max-w-screen-md sm:max-w-sm">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        量子化
      </h2>

      <div className="mb-6 p-4 bg-white shadow rounded-lg">
        <h3 className="text-xl font-bold mb-2">量子化とは？</h3>
        <p>
          量子化は、信号の振幅を離散的な値に変換する処理です。
          ビット数に応じて決められた数の離散的な値（量子化レベル）のいずれかに
          信号の振幅を割り当てることで、デジタルデータとして扱えるようになります。
        </p>
      </div>

      <div className="mb-6 p-4 bg-white shadow rounded-lg">
        <h4 className="font-bold mb-2">パラメータ設定</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              量子化ビット数: {bits}ビット （{Math.pow(2, bits)}段階）
            </label>
            <input
              type="range"
              min="2"
              max="6"
              value={bits}
              onChange={(e) => setBits(parseInt(e.target.value))}
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
        <svg className="w-full h-auto" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
          {/* 量子化レベルの水平線 */}
          {getQuantizationLevels().map((y, i) => (
            <line
              key={`level-${i}`}
              x1={padding}
              y1={scaleY(y)}
              x2={width - padding}
              y2={scaleY(y)}
              stroke="#e0e0e0"
              strokeWidth="1"
              strokeDasharray="4"
            />
          ))}

          {/* 座標軸 */}
          <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="gray" strokeWidth="1" />
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="gray" strokeWidth="1" />

          {/* 元の波形 */}
          <path
            d={`M ${points.map((p) => `${scaleX(p.x)},${scaleY(p.y)}`).join(' L ')}`}
            fill="none"
            stroke="blue"
            strokeWidth="2"
            opacity="0.5"
          />

          {/* 量子化された波形 */}
          <path
            d={`M ${quantizedPoints.map((p) => `${scaleX(p.x)},${scaleY(p.y)}`).join(' L ')}`}
            fill="none"
            stroke="red"
            strokeWidth="2"
          />
        </svg>

        <div className="absolute top-2 right-2 space-x-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
          >
            <RefreshCw className={`w-5 h-5 ${isPlaying ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="p-4 bg-white shadow rounded-lg">
        <h4 className="font-bold mb-2">量子化の影響</h4>
        <div className="space-y-2">
          <p>
            <span className="text-blue-500">青線</span>は元の波形、
            <span className="text-red-500">赤線</span>は量子化後の波形を表しています。
          </p>
          <p>
            量子化ビット数: {bits}ビット → {Math.pow(2, bits)}段階の値に丸められます
          </p>
          <p>
            量子化誤差の大きさ: 最大±{((amplitude * 2) / Math.pow(2, bits) / 2).toFixed(2)}
          </p>
          {bits < 4 && (
            <div className="p-2 bg-yellow-100 rounded">
              <p>現在のビット数では量子化誤差が大きく、波形が大きく歪んでいます。</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuantizationVisualization;
