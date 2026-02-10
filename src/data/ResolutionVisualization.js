import React, { useState } from 'react';
import { Minus, Plus, RefreshCw } from 'lucide-react';

const ResolutionVisualization = () => {
  const [resolution, setResolution] = useState(16);
  const [showGrid, setShowGrid] = useState(true);
  
  const increaseResolution = () => {
    if (resolution < 128) setResolution(prev => prev * 2);
  };
  
  const decreaseResolution = () => {
    if (resolution > 8) setResolution(prev => prev / 2);
  };
  
  const resetDemo = () => {
    setResolution(16);
    setShowGrid(true);
  };

  const generateLetterPattern = (size) => {
    const pattern = [];
    const padding = 0.15;
    
    for (let y = 0; y < size; y++) {
      const row = [];
      for (let x = 0; x < size; x++) {
        const nx = x / size;
        const ny = (y / size - padding) / (1 - 2 * padding);
        
        if (ny < 0 || ny > 1) {
          row.push(0);
          continue;
        }

        const stemWidth = 0.15;
        const crossbarY = 0.6;
        const topX = 0.5;
        const bottomWidth = 0.8;
        
        const leftStem = Math.abs(nx - (topX - (bottomWidth/2) * ny)) < stemWidth/2;
        const rightStem = Math.abs(nx - (topX + (bottomWidth/2) * ny)) < stemWidth/2;
        const crossbar = ny > crossbarY - stemWidth/2 && 
                        ny < crossbarY + stemWidth/2 && 
                        nx > 0.3 && nx < 0.7;
        
        row.push(leftStem || rightStem || crossbar ? 1 : 0);
      }
      pattern.push(row);
    }
    return pattern;
  };

  const pixelPattern = generateLetterPattern(resolution);

  const getGridGap = () => {
    if (resolution >= 64) return '0.25px';
    if (resolution >= 32) return '0.5px';
    return '1px';
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-indigo-700">解像度</h2>
      
      {/* Introduction Section */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-indigo-600">解像度とは</h3>
        <div className="space-y-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">基本的な概念</h4>
            <p className="mb-2">解像度は、デジタル画像の精細さを表す指標です。</p>
            <p className="mb-2">単位面積あたりのピクセル（画素）数で表現され、高いほど細部まで表現できます。</p>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">解像度の重要性</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>画質や文字の鮮明さに直接影響</li>
              <li>高解像度：より滑らかで細かい表現が可能</li>
              <li>低解像度：ギザギザやモザイク状の表示</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Resolution Control Section */}
      <div className="text-center mb-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <p className="text-lg sm:text-xl font-bold mb-2">現在の解像度: {resolution}×{resolution}</p>
          <p className="text-sm text-gray-600 mb-4">総ピクセル数: {resolution * resolution}</p>
          <div className="flex justify-center items-center gap-4 mb-4">
            <button
              onClick={decreaseResolution}
              disabled={resolution <= 8}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
            >
              <Minus size={24} />
            </button>
            <button
              onClick={increaseResolution}
              disabled={resolution >= 128}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Visualization Section */}
      <div className="flex justify-center mb-6">
        <div 
          className="border-4 border-indigo-500 p-1 bg-white w-full max-w-md aspect-square"
        >
          <div className="relative w-full h-full">
            <div 
              className="grid w-full h-full"
              style={{
                gridTemplateColumns: `repeat(${resolution}, 1fr)`,
                gap: showGrid ? getGridGap() : '0',
              }}
            >
              {pixelPattern.map((row, y) => 
                row.map((value, x) => (
                  <div
                    key={`${x}-${y}`}
                    className={`${value ? 'bg-black' : 'bg-white'} ${
                      showGrid ? 'border border-gray-100' : ''
                    }`}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
        <button
          onClick={() => setShowGrid(!showGrid)}
          className="px-4 sm:px-6 py-3 bg-purple-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-purple-600 transition-colors"
        >
          {showGrid ? 'グリッド非表示' : 'グリッド表示'}
        </button>
        <button
          onClick={resetDemo}
          className="px-4 sm:px-6 py-3 bg-blue-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center"
        >
          <RefreshCw className="mr-2" />
          リセット
        </button>
      </div>

      {/* Resolution Explanation */}
      <div className="bg-yellow-100 p-4 rounded-lg shadow">
        <h4 className="text-lg font-bold mb-3">解像度ごとの特徴：</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="bg-white bg-opacity-50 p-3 rounded">
              <p className="font-semibold">低解像度 (8×8 - 16×16)</p>
              <p className="text-sm">基本的な形状の判別が可能</p>
            </div>
            <div className="bg-white bg-opacity-50 p-3 rounded">
              <p className="font-semibold">中解像度 (32×32)</p>
              <p className="text-sm">エッジのギザギザが確認可能</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="bg-white bg-opacity-50 p-3 rounded">
              <p className="font-semibold">高解像度 (64×64)</p>
              <p className="text-sm">滑らかな表現が実現</p>
            </div>
            <div className="bg-white bg-opacity-50 p-3 rounded">
              <p className="font-semibold">超高解像度 (128×128)</p>
              <p className="text-sm">より精細な表示が可能</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResolutionVisualization;