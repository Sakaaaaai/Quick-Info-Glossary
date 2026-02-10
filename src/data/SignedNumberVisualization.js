import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const SignedNumberVisualization = () => {
  const [number, setNumber] = useState(5);
  
  const toBinary = (num) => {
    // 8ビット表現に変換（2の補数形式）
    if (num >= 0) {
      return num.toString(2).padStart(8, '0');
    } else {
      // 負の数の場合は2の補数を計算
      const positiveNum = Math.abs(num);
      const binary = positiveNum.toString(2).padStart(7, '0');
      // 1の補数を取る（ビット反転）
      const onesComplement = binary.split('').map(bit => bit === '0' ? '1' : '0').join('');
      // 2の補数を計算（1の補数 + 1）
      const twosComplement = (parseInt(onesComplement, 2) + 1).toString(2).padStart(8, '1');
      return twosComplement;
    }
  };

  const handleNumberChange = (newNumber) => {
    if (newNumber >= -64 && newNumber <= 63) {
      setNumber(newNumber);
    }
  };

  const binaryDigits = toBinary(number);

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">符号ビット</h2>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">符号ビットとは？</h3>
        <p className="mb-2">符号ビットは、数値の正負を表現するために使用される1ビットの情報です。</p>
        <p className="mb-2">最も左のビット（最上位ビット）が符号ビットとして使用されます：</p>
        <ul className="list-disc list-inside mb-4 ml-4">
          <li className="mb-1">0 → 正の数</li>
          <li className="mb-1">1 → 負の数</li>
        </ul>
        <p className="mb-2">この表現は「2の補数」という方式を使用しています：</p>
        <ul className="list-disc list-inside mb-4 ml-4">
          <li className="mb-1">正の数：そのまま2進数で表現</li>
          <li className="mb-1">負の数：ビット反転して1を足す</li>
        </ul>
      </div>

      <div className="mb-6">
        <div className="flex justify-center items-center gap-4 mb-4">
          <button
            onClick={() => handleNumberChange(number - 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            -1
          </button>
          <span className="text-2xl font-bold">{number}</span>
          <button
            onClick={() => handleNumberChange(number + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            +1
          </button>
        </div>

        <div className="flex justify-center gap-2 mb-2">
          {binaryDigits.split('').map((bit, index) => (
            <div
              key={index}
              className={`w-12 h-12 flex items-center justify-center rounded-lg text-lg font-bold 
                ${index === 0 
                  ? 'bg-red-200 ring-2 ring-red-500' 
                  : 'bg-blue-200'
                } ${bit === '1' ? 'text-red-600' : 'text-blue-600'}`}
            >
              {bit}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 text-xs">
          {['符号', '64', '32', '16', '8', '4', '2', '1'].map((label, index) => (
            <div key={index} className="w-12 text-center font-semibold">
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg shadow mb-6">
        <p className="text-lg font-semibold mb-2">説明：</p>
        <p>
          {number >= 0 
            ? `${number}は正の数なので、符号ビットは0です。残りのビットで${number}を表現します。`
            : `${number}は負の数なので、符号ビットは1です。2の補数形式で表現されています。`
          }
        </p>
        <p className="mt-2">
          {number >= 0 
            ? '各ビットの1が表す値を足し合わせると、この数になります。'
            : '2の補数形式では、最上位ビットが符号を表し、残りのビットと組み合わさって負の値を表現します。'
          }
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setNumber(Math.floor(Math.random() * 127) - 64)}
          className="px-6 py-3 bg-purple-500 text-white rounded-full text-lg font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center"
        >
          <RefreshCw className="mr-2" />
          ランダムな数値
        </button>
      </div>
    </div>
  );
};

export default SignedNumberVisualization;