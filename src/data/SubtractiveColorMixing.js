import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const SubtractiveColorMixing = () => {
  const [cyan, setCyan] = useState(0);
  const [magenta, setMagenta] = useState(0);
  const [yellow, setYellow] = useState(0);

  // 減法混色の計算（値が大きいほど白を引いていく）
  const getMixedColor = (c, m, y) => {
    const r = Math.round(255 * (1 - c/100));
    const g = Math.round(255 * (1 - m/100));
    const b = Math.round(255 * (1 - y/100));
    return `rgb(${r}, ${g}, ${b})`;
  };

  const resetColors = () => {
    setCyan(0);
    setMagenta(0);
    setYellow(0);
  };

  const ColorCircle = ({ color, value, setValue, label, baseColor }) => (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <div
          className="w-16 h-16 sm:w-24 sm:h-24 rounded-full shadow-lg transition-all duration-300"
          style={{ backgroundColor: baseColor }}
        />
        <div className="absolute top-0 text-xs bg-white/80 px-2 py-1 rounded-full translate-x-1/2 right-0">
          {value}%
        </div>
      </div>
      <label className="font-semibold text-lg">{label}</label>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-32"
        style={{
          accentColor: baseColor
        }}
      />
    </div>
  );

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">色の三原色（減法混色）</h2>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">減法混色とは？</h3>
        <p className="mb-2">減法混色は、<span className="font-semibold">光を吸収</span>することで色を作り出す方法です。</p>
        <p className="mb-2">絵の具やインク、印刷で使われる<span className="font-semibold">色の混ぜ方</span>です。</p>
        <p className="mb-4">以下が三原色です：</p>
        <ol className="list-decimal list-inside mb-4">
          <li className="mb-1">シアン (C): 青緑色</li>
          <li className="mb-1">マゼンタ (M): 赤紫色</li>
          <li className="mb-1">イエロー (Y): 黄色</li>
        </ol>
        <p>これらを混ぜることで、さまざまな色を作ることができます。</p>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center text-indigo-600">色を混ぜてみよう</h3>
      
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-6">
        <ColorCircle 
          color="cyan" 
          value={cyan} 
          setValue={setCyan} 
          label="シアン (C)" 
          baseColor="#00ffff"
        />
        <ColorCircle 
          color="magenta" 
          value={magenta} 
          setValue={setMagenta} 
          label="マゼンタ (M)" 
          baseColor="#ff00ff"
        />
        <ColorCircle 
          color="yellow" 
          value={yellow} 
          setValue={setYellow} 
          label="イエロー (Y)" 
          baseColor="#ffff00"
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <p className="text-lg font-semibold mb-2">混ざった色：</p>
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 sm:w-24 sm:h-24 rounded-lg shadow-lg"
            style={{ backgroundColor: getMixedColor(cyan, magenta, yellow) }}
          />
          <div>
            <p>シアン: {cyan}%</p>
            <p>マゼンタ: {magenta}%</p>
            <p>イエロー: {yellow}%</p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg shadow mb-6">
        <p className="text-lg font-semibold mb-2">混色例：</p>
        <ul className="space-y-1">
          <li>• C + M = 青</li>
          <li>• M + Y = 赤</li>
          <li>• Y + C = 緑</li>
          <li>• C + M + Y = 黒</li>
        </ul>
      </div>

      <div className="flex justify-center gap-2 sm:gap-4">
        <button
          onClick={resetColors}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center"
        >
          <RefreshCw className="mr-2" />
          リセット
        </button>
      </div>
    </div>
  );
};

export default SubtractiveColorMixing;