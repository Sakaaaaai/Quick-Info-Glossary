import React, { useState, useEffect, useRef } from 'react';
import { PlayCircle, PauseCircle } from 'lucide-react';

const EncodingVisualization = () => {
  const [amplitude, setAmplitude] = useState(50);
  const [bitDepth, setBitDepth] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState(0);
  const [points, setPoints] = useState([]);
  const [encodedValues, setEncodedValues] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const containerRef = useRef(null);

  // レスポンシブ対応のためのリサイズ検知
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = Math.min(800, containerRef.current.offsetWidth - 32);
        const height = width * 0.625;
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Generate sine wave points and their encoded values
  useEffect(() => {
    const generatePoints = () => {
      const newPoints = [];
      const newEncodedValues = [];
      const maxValue = Math.pow(2, bitDepth) - 1;

      for (let x = 0; x < 360; x += 30) {
        const y = amplitude * Math.sin(((x + phase) * Math.PI) / 180);
        newPoints.push({ x, y });

        const normalizedY = (y + amplitude) / (2 * amplitude);
        const encodedValue = Math.round(normalizedY * maxValue);
        const binaryString = encodedValue.toString(2).padStart(bitDepth, '0');
        
        newEncodedValues.push({
          x,
          y,
          decimal: encodedValue,
          binary: binaryString
        });
      }
      
      setPoints(newPoints);
      setEncodedValues(newEncodedValues);
    };

    generatePoints();
  }, [amplitude, bitDepth, phase]);

  // Animation
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

  const padding = Math.max(30, dimensions.width * 0.075);
  const scaleX = (x) => (x / 360) * (dimensions.width - 2 * padding) + padding;
  const scaleY = (y) => dimensions.height / 2 - y * (dimensions.height / 625);

  const getFontSize = (baseSize) => {
    const scale = dimensions.width / 800;
    return Math.max(baseSize * scale, baseSize * 0.75);
  };

  return (
    <div className="p-4 sm:p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg mx-auto" ref={containerRef}>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center text-indigo-700">
        デジタル信号処理の基礎：符号化（エンコーディング）
      </h2>

      <div className="bg-white rounded-lg shadow-sm mb-4 sm:mb-6">
        <div className="p-3 sm:p-4">
          <h3 className="text-lg sm:text-xl font-bold mb-2">符号化とは？</h3>
          <p className="text-sm sm:text-base mb-4">
            符号化は、アナログ信号の振幅値をデジタルの二進数（バイナリ）に変換するプロセスです。
            ビット深度が深いほど、より細かな値の表現が可能になりますが、データサイズは大きくなります。
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm mb-4 sm:mb-6">
        <div className="p-3 sm:p-4">
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                ビット深度: {bitDepth}ビット （{Math.pow(2, bitDepth)}段階）
              </label>
              <input
                type="range"
                min="2"
                max="6"
                value={bitDepth}
                onChange={(e) => setBitDepth(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                振幅: {amplitude}
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={amplitude}
                onChange={(e) => setAmplitude(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm mb-4 sm:mb-6">
        <div className="p-3 sm:p-4 relative">
          <svg width={dimensions.width} height={dimensions.height}>
            {/* Grid lines */}
            {[...Array(Math.pow(2, bitDepth) + 1)].map((_, i) => {
              const y = scaleY(amplitude - (i * (2 * amplitude) / (Math.pow(2, bitDepth) - 1)));
              return (
                <line
                  key={`grid-${i}`}
                  x1={padding}
                  y1={y}
                  x2={dimensions.width - padding}
                  y2={y}
                  stroke="#f0f0f0"
                  strokeWidth="1"
                />
              );
            })}

            {/* Axes */}
            <line 
              x1={padding} 
              y1={dimensions.height/2} 
              x2={dimensions.width-padding} 
              y2={dimensions.height/2} 
              stroke="gray" 
              strokeWidth="1" 
            />
            <line 
              x1={padding} 
              y1={padding} 
              x2={padding} 
              y2={dimensions.height-padding} 
              stroke="gray" 
              strokeWidth="1" 
            />

            {/* Original signal */}
            <path
              d={`M ${points.map(p => `${scaleX(p.x)},${scaleY(p.y)}`).join(' L ')}`}
              fill="none"
              stroke="blue"
              strokeWidth="2"
              opacity="0.5"
            />

            {/* Encoded points and values */}
            {encodedValues.map((point, i) => (
              <g key={i}>
                <line
                  x1={scaleX(point.x)}
                  y1={dimensions.height/2}
                  x2={scaleX(point.x)}
                  y2={scaleY(point.y)}
                  stroke="red"
                  strokeWidth="1"
                  strokeDasharray="4"
                />
                
                <circle
                  cx={scaleX(point.x)}
                  cy={scaleY(point.y)}
                  r={Math.max(3, dimensions.width / 133)}
                  fill="red"
                />

                <rect
                  x={scaleX(point.x) - (dimensions.width * 0.0375)}
                  y={scaleY(point.y) - (dimensions.height * 0.09)}
                  width={dimensions.width * 0.075}
                  height={dimensions.height * 0.05}
                  fill="white"
                  stroke="gray"
                  strokeWidth="1"
                  rx="4"
                />

                <text
                  x={scaleX(point.x)}
                  y={scaleY(point.y) - (dimensions.height * 0.056)}
                  textAnchor="middle"
                  fill="black"
                  style={{ fontSize: `${getFontSize(12)}px` }}
                  className="font-mono font-bold"
                >
                  {point.binary}
                </text>
                
                <text
                  x={scaleX(point.x)}
                  y={scaleY(point.y) + (dimensions.height * 0.05)}
                  textAnchor="middle"
                  fill="gray"
                  style={{ fontSize: `${getFontSize(10)}px` }}
                >
                  ({point.decimal})
                </text>
              </g>
            ))}
          </svg>

          <div className="absolute top-2 right-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
            >
              {isPlaying ? (
                <PauseCircle className="w-4 h-4 sm:w-6 sm:h-6" />
              ) : (
                <PlayCircle className="w-4 h-4 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-3 sm:p-4">
          <h4 className="text-base sm:text-lg font-bold mb-2">解説</h4>
          <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
            <li>青い線は元のアナログ信号を表しています</li>
            <li>赤い点は各サンプリングポイントを表しています</li>
            <li>各点の上の数値は、その振幅値を{bitDepth}ビットのバイナリで表現したものです</li>
            <li>各点の下の括弧内の数値は、バイナリを10進数に変換した値です</li>
            <li>グリッド線は、{bitDepth}ビットで表現できる{Math.pow(2, bitDepth)}段階の量子化レベルを示しています</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EncodingVisualization;