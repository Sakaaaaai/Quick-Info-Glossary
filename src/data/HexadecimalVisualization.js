import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const HexadecimalVisualization = () => {
  const generateRandomNumber = () => Math.floor(Math.random() * 254) + 1;
  const [decimalNumber, setDecimalNumber] = useState(generateRandomNumber());
  const [step, setStep] = useState(0);
  const [workingNumber, setWorkingNumber] = useState(decimalNumber);
  const [divisions, setDivisions] = useState([]);
  const [explanation, setExplanation] = useState('「次のステップ」ボタンを押して、10進数から16進数への変換過程を見てみましょう。');

  const hexDigits = {
    10: 'A',
    11: 'B',
    12: 'C',
    13: 'D',
    14: 'E',
    15: 'F'
  };

  const resetConversion = () => {
    const newNumber = generateRandomNumber();
    setDecimalNumber(newNumber);
    setWorkingNumber(newNumber);
    setStep(0);
    setDivisions([]);
    setExplanation('「次のステップ」ボタンを押して、10進数から16進数への変換過程を見てみましょう。');
  };

  const getHexDigit = (num) => {
    return num < 10 ? num.toString() : hexDigits[num];
  };

  const nextStep = () => {
    if (workingNumber === 0 && divisions.length > 0) {
      const hexResult = divisions.map(d => getHexDigit(d)).reverse().join('');
      setExplanation(`変換完了！${decimalNumber}の16進数表現は ${hexResult} です。`);
      return;
    }

    const remainder = workingNumber % 16;
    const quotient = Math.floor(workingNumber / 16);
    
    setDivisions([...divisions, remainder]);
    setWorkingNumber(quotient);
    setStep(step + 1);

    const hexDigit = getHexDigit(remainder);
    setExplanation(`${workingNumber} ÷ 16 = ${quotient} 余り ${remainder} (16進数では ${hexDigit})`);
  };

  const getCurrentHex = () => {
    return divisions.map(d => getHexDigit(d)).reverse().join('');
  };

  return (
    <div className="w-full min-h-screen p-2 md:p-4 lg:p-6">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-100 to-blue-100 rounded-xl shadow-lg p-3 md:p-4 lg:p-6">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-center text-green-700">16進数</h2>
        
        <div className="bg-white p-3 md:p-4 lg:p-6 rounded-lg shadow mb-4 md:mb-6">
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 text-green-600">16進数とは</h3>
          <p className="text-sm md:text-base mb-2">16進法は、<span className="font-semibold">16を基数</span>とする記数法です。</p>
          <p className="text-sm md:text-base mb-2">0から15までの数字を、以下のように表現します：</p>
          
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 md:gap-2 mb-4">
            {Array.from({ length: 16 }, (_, i) => (
              <div key={i} className="bg-green-100 p-1 md:p-2 rounded-lg text-center">
                <div className="text-xs md:text-sm font-bold">{i} → {getHexDigit(i)}</div>
              </div>
            ))}
          </div>
          
          <p className="text-sm md:text-base mb-2">16進数を表す時は、先頭に「0x」をつけることが多いです。</p>
          <p className="text-sm md:text-base">例：0x2A = 42（10進数）</p>
        </div>

        <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 text-center text-green-600">
          10進数から16進数への変換
        </h3>
        
        <p className="text-base md:text-lg lg:text-xl mb-3 md:mb-4 text-center font-semibold">
          変換する数: <span className="text-red-500">{decimalNumber}</span>
        </p>
        
        <div className="bg-white p-3 md:p-4 rounded-lg shadow mb-4 md:mb-6">
          <p className="text-base md:text-lg font-semibold mb-3 md:mb-4">現在の状態：</p>
          <div className="flex flex-col items-center gap-3 md:gap-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-base md:text-xl">商: {workingNumber}</span>
            </div>
            
            {divisions.length > 0 && (
              <div className="flex flex-col items-center">
                <p className="font-semibold mb-2">16進数の各桁:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {[...divisions].reverse().map((d, i) => (
                    <div key={i} className="w-8 md:w-12 h-8 md:h-12 flex items-center justify-center bg-green-200 rounded-lg font-mono text-base md:text-xl">
                      {getHexDigit(d)}
                    </div>
                  ))}
                </div>
                <p className="mt-3 md:mt-4 text-base md:text-xl font-bold">
                  現在の16進数: {getCurrentHex()}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-yellow-100 p-3 md:p-4 rounded-lg shadow mb-4 md:mb-6">
          <p className="text-base md:text-lg font-semibold">説明：</p>
          <p className="text-sm md:text-base">{explanation}</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
          <button
            onClick={nextStep}
            disabled={workingNumber === 0 && divisions.length > 0}
            className="px-4 md:px-6 py-2 md:py-3 bg-green-500 text-white rounded-full text-base md:text-lg font-semibold hover:bg-green-600 disabled:bg-gray-400 transition-colors duration-300"
          >
            次のステップ
          </button>
          <button
            onClick={resetConversion}
            className="px-4 md:px-6 py-2 md:py-3 bg-blue-500 text-white rounded-full text-base md:text-lg font-semibold hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
          >
            <RefreshCw className="mr-2 w-4 h-4 md:w-5 md:h-5" />
            新しい数字
          </button>
        </div>
      </div>
    </div>
  );
};

export default HexadecimalVisualization;