import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const BitOperationsVisualizer = () => {
  const [number1, setNumber1] = useState(5);
  const [number2, setNumber2] = useState(3);
  const [operation, setOperation] = useState('AND');
  const [isIntroExpanded, setIsIntroExpanded] = useState(true);

  const getBinaryString = (num) => {
    return num.toString(2).padStart(8, '0');
  };

  const performOperation = (a, b, op) => {
    switch (op) {
      case 'AND': return a & b;
      case 'OR': return a | b;
      case 'XOR': return a ^ b;
      case 'NOT': return ~a & 0xFF;
      default: return 0;
    }
  };

  const getExplanation = () => {
    switch (operation) {
      case 'AND': return '両方のビットが1の場合のみ、結果が1になります。プログラミングでは「&」演算子を使用します。';
      case 'OR': return 'どちらかのビットが1の場合、結果が1になります。プログラミングでは「|」演算子を使用します。';
      case 'XOR': return 'ビットが異なる場合のみ、結果が1になります。プログラミングでは「^」演算子を使用します。';
      case 'NOT': return 'ビットを反転させます（0は1に、1は0になります）。プログラミングでは「~」演算子を使用します。';
      default: return '';
    }
  };

  const BitDisplay = ({ value, label, highlight = false }) => (
    <div className="mb-4">
      <p className="text-xs sm:text-sm text-gray-600 mb-1">{label}</p>
      <div className="flex flex-wrap gap-1 items-center">
        <div className="flex gap-0.5 sm:gap-1 overflow-x-auto">
          {getBinaryString(value).split('').map((bit, index) => (
            <div
              key={index}
              className={`w-6 sm:w-8 h-6 sm:h-8 flex items-center justify-center rounded-lg text-base sm:text-lg font-bold
                ${highlight ? 'bg-green-100 border-2 border-green-500' : 'bg-blue-100 border-2 border-blue-300'}
                ${bit === '1' ? 'text-blue-700' : 'text-gray-500'}`}
            >
              {bit}
            </div>
          ))}
        </div>
        <div className="ml-2 sm:ml-4 flex items-center text-sm sm:text-base text-gray-700">
          = {value}<sub>10</sub>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-3 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-3xl font-bold text-indigo-700">ビット</h2>
      </div>

      <div className="bg-white p-3 sm:p-6 rounded-lg shadow-md mb-4 sm:mb-6">
        <div className="flex justify-between items-center cursor-pointer" 
             onClick={() => setIsIntroExpanded(!isIntroExpanded)}>
          <h3 className="text-lg sm:text-xl font-bold text-indigo-600">ビットについての基礎知識</h3>
          {isIntroExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
        
        {isIntroExpanded && (
          <div className="mt-4 space-y-3 sm:space-y-4">
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <h4 className="text-sm sm:text-base font-bold mb-2">ビットとは？</h4>
              <p className="text-xs sm:text-sm">ビット（Bit）は「Binary digit」の略で、コンピュータが扱う最小単位のデータです。
                 1つのビットは「0」か「1」の値を持ちます。</p>
            </div>

            <div className="bg-purple-50 p-3 sm:p-4 rounded-lg">
              <h4 className="text-sm sm:text-base font-bold mb-2">2進数とは？</h4>
              <p className="text-xs sm:text-sm">私たちが普段使用している10進数（0-9の数字）と違い、2進数は0と1だけで数を表現します。
                 例えば：</p>
              <ul className="list-disc list-inside mt-2 text-xs sm:text-sm">
                <li>2進数の「1010」は10進数の「10」</li>
                <li>2進数の「1111」は10進数の「15」</li>
              </ul>
            </div>

            <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
              <h4 className="text-sm sm:text-base font-bold mb-2">ビット位置の重み</h4>
              <p className="text-xs sm:text-sm">8ビットの場合、右から左へ：</p>
              <div className="flex gap-1 mt-2 overflow-x-auto pb-2">
                {[0,1,2,3,4,5,6,7].reverse().map((pos) => (
                  <div key={pos} className="flex flex-col items-center min-w-[2rem] sm:min-w-[3rem]">
                    <div className="text-xs sm:text-sm font-bold">2<sup>{pos}</sup></div>
                    <div className="text-xs mt-1">{Math.pow(2, pos)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg">
              <h4 className="text-sm sm:text-base font-bold mb-2">ビット演算の使用例</h4>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
                <li>フラグの管理（設定のオン/オフ）</li>
                <li>アクセス権限の制御</li>
                <li>データの圧縮</li>
                <li>暗号化処理</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-3 sm:p-6 rounded-lg shadow-md mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold mb-4 text-indigo-600">ビット演算を試してみよう</h3>
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
          {['AND', 'OR', 'XOR', 'NOT'].map((op) => (
            <button
              key={op}
              onClick={() => setOperation(op)}
              className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-base font-semibold transition-colors
                ${operation === op
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {op}
            </button>
          ))}
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              1番目の数値 (0-255):
            </label>
            <input
              type="number"
              min="0"
              max="255"
              value={number1}
              onChange={(e) => setNumber1(Number(e.target.value))}
              className="w-20 sm:w-24 px-2 sm:px-3 py-1 sm:py-2 border rounded-md text-sm sm:text-base"
            />
          </div>
          {operation !== 'NOT' && (
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                2番目の数値 (0-255):
              </label>
              <input
                type="number"
                min="0"
                max="255"
                value={number2}
                onChange={(e) => setNumber2(Number(e.target.value))}
                className="w-20 sm:w-24 px-2 sm:px-3 py-1 sm:py-2 border rounded-md text-sm sm:text-base"
              />
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-3 sm:p-6 rounded-lg shadow-md mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold mb-4 text-indigo-600">演算結果の表示</h3>
        <BitDisplay value={number1} label="1番目の数値" />
        {operation !== 'NOT' && <BitDisplay value={number2} label="2番目の数値" />}
        <div className="border-t border-gray-200 my-4" />
        <BitDisplay
          value={performOperation(number1, number2, operation)}
          label={`${operation}演算の結果`}
          highlight={true}
        />
      </div>

      <div className="bg-yellow-50 p-3 sm:p-6 rounded-lg">
        <h3 className="text-base sm:text-lg font-semibold mb-2">演算の説明</h3>
        <p className="text-xs sm:text-sm mb-3">{getExplanation()}</p>
        <p className="font-mono text-xs sm:text-sm bg-gray-100 p-2 rounded">
          {number1} {operation} {operation !== 'NOT' ? number2 : ''} = {performOperation(number1, number2, operation)}
        </p>
      </div>
    </div>
  );
};

export default BitOperationsVisualizer;