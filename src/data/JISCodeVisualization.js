import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const JISCodeVisualization = () => {
  const jisMap = {
    'あ': { ku: 4, ten: 1, jis: '0x2422' },
    'い': { ku: 4, ten: 2, jis: '0x2424' },
    'う': { ku: 4, ten: 3, jis: '0x2426' },
    'え': { ku: 4, ten: 4, jis: '0x2428' },
    'お': { ku: 4, ten: 5, jis: '0x242A' },
    'か': { ku: 4, ten: 6, jis: '0x242B' },
    'き': { ku: 4, ten: 7, jis: '0x242C' },
    'く': { ku: 4, ten: 8, jis: '0x242D' },
    'け': { ku: 4, ten: 9, jis: '0x242E' },
    'こ': { ku: 4, ten: 10, jis: '0x242F' },
  };

  const [inputChar, setInputChar] = useState('あ');
  const [step, setStep] = useState(0);
  const [explanation, setExplanation] = useState('「次へ」ボタンを押して、JISコードへの変換過程を見てみましょう。');

  const getJISDetails = (char) => {
    return jisMap[char] || { ku: 0, ten: 0, jis: '0x0000' };
  };

  const getRandomChar = () => {
    const chars = Object.keys(jisMap);
    return chars[Math.floor(Math.random() * chars.length)];
  };

  const nextStep = () => {
    if (step >= 2) {
      setStep(0);
      return;
    }
    setStep(step + 1);
    updateExplanation(step + 1);
  };

  const updateExplanation = (currentStep) => {
    const details = getJISDetails(inputChar);
    const explanations = [
      `${inputChar}の区点コードは${details.ku}区${details.ten}点です。`,
      `区点コードから計算すると、JISコードは${details.jis}になります。`,
      '変換が完了しました。リセットボタンを押して、別の文字で試してみましょう。'
    ];
    setExplanation(explanations[currentStep]);
  };

  const handleCharChange = (event) => {
    const newChar = event.target.value.charAt(0);
    if (newChar && jisMap[newChar]) {
      setInputChar(newChar);
      setStep(0);
      setExplanation('新しい文字が入力されました。「次へ」を押して変換過程を見てみましょう。');
    }
  };

  const reset = () => {
    const newChar = getRandomChar();
    setInputChar(newChar);
    setStep(0);
    setExplanation('新しい文字が選ばれました。「次へ」を押して変換過程を見てみましょう。');
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center text-indigo-700">JISコード</h2>
      
      <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-indigo-600">JISコードとは？</h3>
        <p className="text-sm sm:text-base mb-2">JISコードは日本の文字コード規格で、漢字やかなを数値で表現します。</p>
        <p className="text-sm sm:text-base mb-2">文字は「区」と「点」という2つの数値で指定されます。</p>
        <p className="text-sm sm:text-base mb-4">例えば、「あ」は4区1点として表現され、これをJISコードに変換します。</p>
        <ol className="list-decimal list-inside mb-4 text-sm sm:text-base">
          <li className="mb-1">文字を区点コードに変換</li>
          <li className="mb-1">区点コードからJISコードを計算</li>
        </ol>
      </div>

      <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-8">
          {/* 入力文字セクション */}
          <div className="relative flex flex-col items-center w-full sm:w-auto mb-8 sm:mb-0">
            <div className="bg-indigo-600 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold shadow absolute -top-6 sm:-top-8">
              入力文字
            </div>
            <input
              type="text"
              value={inputChar}
              onChange={handleCharChange}
              maxLength={1}
              className="w-24 sm:w-28 h-16 sm:h-20 text-3xl sm:text-4xl font-bold text-center border-3 border-indigo-500 rounded-lg shadow-md"
            />
          </div>

          <div className="hidden sm:block text-2xl sm:text-3xl font-bold text-indigo-500 transform rotate-90 sm:rotate-0">→</div>

          {/* 区点コードセクション */}
          <div className="relative flex flex-col items-center w-full sm:w-auto mb-8 sm:mb-0">
            <div className="bg-blue-600 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold shadow absolute -top-6 sm:-top-8">
              区点コード
            </div>
            <div className="w-28 sm:w-32 h-16 sm:h-20 flex items-center justify-center text-xl sm:text-2xl font-bold bg-blue-100 rounded-lg shadow-md border-2 border-blue-300">
              {step >= 1 ? `${getJISDetails(inputChar).ku}区${getJISDetails(inputChar).ten}点` : '??'}
            </div>
          </div>

          <div className="hidden sm:block text-2xl sm:text-3xl font-bold text-indigo-500 transform rotate-90 sm:rotate-0">→</div>

          {/* JISコードセクション */}
          <div className="relative flex flex-col items-center w-full sm:w-auto">
            <div className="bg-green-600 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold shadow absolute -top-6 sm:-top-8">
              JISコード
            </div>
            <div className="w-28 sm:w-32 h-16 sm:h-20 flex items-center justify-center text-xl sm:text-2xl font-bold bg-green-100 rounded-lg shadow-md border-2 border-green-300">
              {step >= 2 ? getJISDetails(inputChar).jis : '??'}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-100 p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6">
        <p className="text-base sm:text-lg font-semibold">説明：</p>
        <p className="text-sm sm:text-base">{explanation}</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
        <button
          onClick={nextStep}
          className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-blue-600 transition-colors duration-300 shadow-md"
        >
          次へ
        </button>
        <button
          onClick={reset}
          className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-purple-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center justify-center shadow-md"
        >
          <RefreshCw className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
          リセット
        </button>
      </div>
    </div>
  );
};

export default JISCodeVisualization;