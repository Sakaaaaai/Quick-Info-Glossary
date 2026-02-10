import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const BinaryVisualization = () => {
  const generateRandomNumber = () => Math.floor(Math.random() * 254) + 1;
  const [decimalNumber, setDecimalNumber] = useState(generateRandomNumber());
  const [step, setStep] = useState(0);
  const [workingNumber, setWorkingNumber] = useState(decimalNumber);
  const [divisions, setDivisions] = useState([]);
  const [explanation, setExplanation] = useState('「次のステップ」ボタンを押して、10進数から2進数への変換過程を見てみましょう。');

  const resetConversion = () => {
    const newNumber = generateRandomNumber();
    setDecimalNumber(newNumber);
    setWorkingNumber(newNumber);
    setStep(0);
    setDivisions([]);
    setExplanation('「次のステップ」ボタンを押して、10進数から2進数への変換過程を見てみましょう。');
  };

  const nextStep = () => {
    if (workingNumber === 0 && divisions.length > 0) {
      const binaryResult = divisions.map(d => d.toString()).reverse().join('');
      setExplanation(`変換完了！${decimalNumber}の2進数表現は ${binaryResult} です。`);
      return;
    }

    const remainder = workingNumber % 2;
    const quotient = Math.floor(workingNumber / 2);
    
    setDivisions([...divisions, remainder]);
    setWorkingNumber(quotient);
    setStep(step + 1);
    setExplanation(`${workingNumber} ÷ 2 = ${quotient} 余り ${remainder}`);
  };

  const getCurrentBinary = () => {
    return divisions.map(d => d.toString()).reverse().join('');
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-purple-700">2進数</h2>
      
      {/* Introduction Section */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-purple-600">2進数とは？</h3>
        <div className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="mb-2">2進数は<span className="font-semibold">コンピュータの基本となる数体系</span>です。</p>
            <p className="mb-2">私たちが普段使う10進数が0から9までの10個の数字を使うのに対し、2進数では<span className="font-semibold">0と1の2つの数字だけ</span>を使用します。</p>
            <div className="mt-4">
              <p className="font-semibold mb-2">2進数の特徴：</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>各桁の値は2の累乗（1, 2, 4, 8, 16, ...）を表す</li>
                <li>コンピュータ内部では全てのデータが2進数で処理される</li>
                <li>電気回路のON/OFFの状態を表現するのに適している</li>
              </ul>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">2進数の例</h4>
            <div className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg">
                  <p className="font-semibold mb-2">10進数の5は2進数で：</p>
                  <p>0b101 (4 + 0 + 1)</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="font-semibold mb-2">10進数の9は2進数で：</p>
                  <p>0b1001 (8 + 0 + 0 + 1)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">2進数の表記</h4>
            <p>2進数を表す時は先頭に「0b」をつけて表記します：</p>
            <div className="mt-2 space-y-2">
              <p>0b1010 = 10（10進数）</p>
              <p>0b1100 = 12（10進数）</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section Title */}
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center text-purple-600">10進数から2進数への変換</h3>
        <p className="text-base sm:text-lg text-center mb-4">
          2進数への変換は、数を2で割り続け、その余りを逆順に並べることで行います。
          以下で実際に変換過程を見てみましょう。
        </p>
      </div>

      {/* Conversion Section */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <p className="text-lg sm:text-xl mb-4 text-center font-semibold">
          変換する数: <span className="text-xl text-red-500">{decimalNumber}</span>
        </p>

        <div className="flex flex-col items-center gap-4">
          <div className="text-xl font-mono bg-purple-50 px-4 py-2 rounded-lg">
            商: {workingNumber}
          </div>
          
          {divisions.length > 0 && (
            <div className="flex flex-col items-center w-full">
              <p className="font-semibold mb-4">2進数の各桁（左から右へ）:</p>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {[...divisions].reverse().map((d, i) => (
                  <div key={i} className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-purple-200 rounded-lg font-mono text-lg sm:text-xl">
                    {d}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <p className="text-lg sm:text-xl font-bold">
                  現在の2進数: {getCurrentBinary()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Explanation Section */}
      <div className="bg-yellow-100 p-4 rounded-lg shadow mb-6">
        <h4 className="text-lg font-semibold mb-2">説明：</h4>
        <p className="text-base sm:text-lg">{explanation}</p>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={nextStep}
          disabled={workingNumber === 0 && divisions.length > 0}
          className="px-6 py-3 bg-purple-500 text-white rounded-full text-lg font-semibold hover:bg-purple-600 disabled:bg-gray-400 transition-colors duration-300"
        >
          次のステップ
        </button>
        <button
          onClick={resetConversion}
          className="px-6 py-3 bg-blue-500 text-white rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
        >
          <RefreshCw className="mr-2" />
          新しい数字
        </button>
      </div>
    </div>
  );
};

export default BinaryVisualization;