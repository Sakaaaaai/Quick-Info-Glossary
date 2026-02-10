import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const FloatingPointVisualization = () => {
  const number1 = 0.1;
  const number2 = 0.2;
  const [operations, setOperations] = useState(1);

  // 浮動小数点の計算を実行
  const calculateFloatingPoint = () => {
    let result = 0;
    let expected = 0;
    
    // 実際の計算（浮動小数点による計算）
    for (let i = 0; i < operations; i++) {
      result += number1 + number2;
    }
    
    // 期待される計算（理論値）
    expected = (number1 + number2) * operations;
    
    return {
      actual: result,
      expected: expected,
      difference: Math.abs(result - expected)
    };
  };

  const results = calculateFloatingPoint();

  // 2進数に変換する関数
  const toBinary = (num) => {
    const binary = num.toString(2);
    if (binary.includes('.')) {
      const [whole, fraction] = binary.split('.');
      return `${whole}.${fraction.slice(0, 20)}...`;
    }
    return binary;
  };

  // 数値のビジュアライゼーション用のバーを生成
  const generateBar = (value, max) => {
    const width = (value / max) * 100;
    return `${width}%`;
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">浮動小数点数の丸め誤差</h2>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">丸め誤差とは？</h3>
        <p className="mb-2">コンピュータは2進数で計算を行うため、10進数の小数を正確に表現できない場合があります。</p>
        <p className="mb-2">例えば、0.1 + 0.2 は私たちには 0.3 という単純な計算ですが、</p>
        <p className="mb-2">コンピュータの世界では、微小な誤差が生じてしまいます。</p>
        <p className="mb-4">この誤差は計算を繰り返すことで徐々に大きくなっていきます。</p>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4 text-center">
          <div className="bg-blue-100 p-4 rounded">
            <p className="text-lg font-bold">数値1</p>
            <p className="text-2xl">{number1}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded">
            <p className="text-lg font-bold">数値2</p>
            <p className="text-2xl">{number2}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h4 className="text-lg font-bold mb-2">2進数での表現:</h4>
        <div className="bg-gray-100 p-4 rounded mb-4 font-mono text-sm">
          <p className="mb-2">0.1 (2進数) = {toBinary(number1)}</p>
          <p>0.2 (2進数) = {toBinary(number2)}</p>
        </div>
        <p className="text-sm text-gray-600">
          ※ 末尾の「...」は、この数が無限に続く循環小数であることを示しています。
          コンピュータはこれを有限の桁数で打ち切って計算するため、誤差が生じます。
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h4 className="text-lg font-bold mb-4">計算結果の比較:</h4>
        
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <label className="block text-lg font-bold text-gray-700 mb-2">
            計算の繰り返し回数: {operations}回
          </label>
          <div className="flex items-center gap-4">
            <span className="text-sm">1</span>
            <input
              type="range"
              min="1"
              max="1000"
              value={operations}
              onChange={(e) => setOperations(parseInt(e.target.value))}
              className="flex-grow"
            />
            <span className="text-sm">1000</span>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-1">
              <p className="font-semibold">理論値:</p>
              <p>{results.expected}</p>
            </div>
            <div className="w-full bg-gray-200 rounded h-6">
              <div
                className="bg-blue-500 rounded h-6 transition-all duration-300"
                style={{ width: generateBar(results.expected, results.expected + results.difference) }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <p className="font-semibold">実際の計算結果:</p>
              <p>{results.actual}</p>
            </div>
            <div className="w-full bg-gray-200 rounded h-6">
              <div
                className="bg-green-500 rounded h-6 transition-all duration-300"
                style={{ width: generateBar(results.actual, results.expected + results.difference) }}
              ></div>
            </div>
          </div>

          <div className="bg-yellow-100 p-4 rounded text-center">
            <p className="font-bold mb-1">誤差</p>
            <p className="font-mono">{results.difference.toExponential(10)}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setOperations(1)}
          className="px-6 py-3 bg-purple-500 text-white rounded-full text-lg font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center"
        >
          <RefreshCw className="mr-2" />
          リセット
        </button>
      </div>
    </div>
  );
};

export default FloatingPointVisualization;