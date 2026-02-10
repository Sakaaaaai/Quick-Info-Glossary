import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const RGBColorVisualization = () => {
  const [red, setRed] = useState(false);
  const [green, setGreen] = useState(false);
  const [blue, setBlue] = useState(false);

  const getMixedColor = () => {
    const r = red ? 255 : 0;
    const g = green ? 255 : 0;
    const b = blue ? 255 : 0;
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  const getExplanation = () => {
    const activeColors = [];
    if (red) activeColors.push('赤');
    if (green) activeColors.push('緑');
    if (blue) activeColors.push('青');

    if (activeColors.length === 0) return '色を選択してください。';
    if (activeColors.length === 1) return `${activeColors[0]}色を表示しています。`;
    if (activeColors.length === 2) {
      if (red && green) return '赤と緑を混ぜると黄色になります。';
      if (red && blue) return '赤と青を混ぜるとマゼンタ(赤紫)になります。';
      if (green && blue) return '緑と青を混ぜるとシアン(青緑)になります。';
    }
    return '三原色をすべて混ぜると白色になります。';
  };

  const resetColors = () => {
    setRed(false);
    setGreen(false);
    setBlue(false);
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">光の三原色</h2>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">光の三原色とは？</h3>
        <p className="mb-2">光の三原色は<span className="font-semibold">赤(Red)・緑(Green)・青(Blue)</span>です。</p>
        <p className="mb-2">これらの光を組み合わせることで、さまざまな色を作ることができます。</p>
        <p className="mb-2">例えば：</p>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-1">赤 + 緑 = 黄色</li>
          <li className="mb-1">赤 + 青 = マゼンタ(赤紫)</li>
          <li className="mb-1">緑 + 青 = シアン(青緑)</li>
          <li className="mb-1">赤 + 緑 + 青 = 白</li>
        </ul>
        <p className="text-sm text-gray-600">※ディスプレイの設定によって、実際の色の見え方が異なる場合があります。</p>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className="w-48 h-48 sm:w-64 sm:h-64 border-4 border-gray-300 rounded-lg overflow-hidden bg-black mb-4">
          <div 
            className="w-full h-full transition-colors duration-300"
            style={{ backgroundColor: getMixedColor() }}
          />
        </div>

        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setRed(!red)}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
              red 
                ? 'bg-red-600 text-white ring-4 ring-red-200' 
                : 'bg-white text-red-600 border-2 border-red-600 hover:bg-red-50'
            }`}
          >
            赤
          </button>
          <button
            onClick={() => setGreen(!green)}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
              green 
                ? 'bg-green-600 text-white ring-4 ring-green-200' 
                : 'bg-white text-green-600 border-2 border-green-600 hover:bg-green-50'
            }`}
          >
            緑
          </button>
          <button
            onClick={() => setBlue(!blue)}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
              blue 
                ? 'bg-blue-600 text-white ring-4 ring-blue-200' 
                : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
            }`}
          >
            青
          </button>
        </div>

        <button
          onClick={resetColors}
          className="px-6 py-3 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition-all duration-300 flex items-center"
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          リセット
        </button>
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg shadow">
        <p className="text-lg font-semibold">説明：</p>
        <p>{getExplanation()}</p>
      </div>
    </div>
  );
};

export default RGBColorVisualization;