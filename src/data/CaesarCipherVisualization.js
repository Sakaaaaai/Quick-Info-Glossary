import React, { useState } from 'react';
import { ArrowLeftCircle, ArrowRightCircle, RefreshCw } from 'lucide-react';

const CaesarCipherVisualization = () => {
  const [inputText, setInputText] = useState('HELLO');
  const [shift, setShift] = useState(3);
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  const encrypt = (text) => {
    return text.toUpperCase().split('').map(char => {
      if (!alphabet.includes(char)) return char;
      const currentIndex = alphabet.indexOf(char);
      const newIndex = (currentIndex + shift) % 26;
      return alphabet[newIndex];
    }).join('');
  };

  const getShiftedAlphabet = () => {
    const shiftedPart = alphabet.slice(-shift);
    const remainingPart = alphabet.slice(0, -shift);
    return [...shiftedPart, ...remainingPart];
  };

  const handleIncrement = () => {
    setShift((prev) => (prev + 1) % 26);
  };

  const handleDecrement = () => {
    setShift((prev) => (prev - 1 + 26) % 26);
  };

  const handleReset = () => {
    setInputText('HELLO');
    setShift(3);
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">シーザー暗号</h2>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">シーザー暗号とは？</h3>
        <p className="mb-2">シーザー暗号は、アルファベットを指定した数だけずらして暗号化する方式です。</p>
        <p className="mb-2">例えば、3文字分ずらす場合：</p>
        <p className="mb-2">A → D, B → E, C → F ... となります。</p>
        <p>この暗号は、古代ローマのジュリアス・シーザーが使用したことで知られています。</p>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-bold mb-4">アルファベットの対応表</h3>
        <div className="flex flex-col space-y-2 overflow-x-auto">
          <div className="flex min-w-max">
            <div className="w-8 mr-4">元の文字</div>
            {alphabet.map((char, index) => (
              <div key={`original-${char}`} className="w-8 text-center font-bold">
                {char}
              </div>
            ))}
          </div>
          <div className="flex min-w-max">
            <div className="w-8 mr-4">暗号文字</div>
            {getShiftedAlphabet().map((char, index) => (
              <div key={`shifted-${char}`} className="w-8 text-center font-bold text-blue-600">
                {char}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-bold mb-4">暗号化してみよう</h3>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">文字を入力してください（アルファベット）：</label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full p-2 border rounded"
              maxLength={20}
            />
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={handleDecrement}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeftCircle className="w-6 h-6" />
            </button>
            <div className="text-center">
              <div className="text-lg font-bold">{shift}</div>
              <div className="text-sm">シフト量</div>
            </div>
            <button
              onClick={handleIncrement}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowRightCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-bold mb-4">結果</h3>
        <div className="space-y-4">
          <div>
            <div className="font-medium">元の文字列：</div>
            <div className="text-2xl font-bold">{inputText.toUpperCase()}</div>
          </div>
          <div>
            <div className="font-medium">暗号化された文字列：</div>
            <div className="text-2xl font-bold text-blue-600">{encrypt(inputText)}</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleReset}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center"
        >
          <RefreshCw className="mr-2" />
          リセット
        </button>
      </div>
    </div>
  );
};

export default CaesarCipherVisualization;