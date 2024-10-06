import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, ArrowRight, Check, RefreshCw } from 'lucide-react';

const BinarySearchVisualization = () => {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState(null);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [mid, setMid] = useState(0);
  const [found, setFound] = useState(false);
  const [step, setStep] = useState(0);
  const [explanation, setExplanation] = useState('');

  useEffect(() => {
    resetSearch();
  }, []);

  const resetSearch = () => {
    const newArray = Array.from({ length: 9 }, () => Math.floor(Math.random() * 100)).sort((a, b) => a - b);
    const newRight = newArray.length - 1;
    const newMid = Math.floor((0 + newRight) / 2);
    setArray(newArray);
    setTarget(newArray[Math.floor(Math.random() * newArray.length)]);
    setLeft(0);
    setRight(newRight);
    setMid(newMid);
    setFound(false);
    setStep(0);
    setExplanation('まず、中央の値から探索を開始します。「次のステップ」ボタンを押して、探索を進めてみましょう。');
  };

  const nextStep = () => {
    if (found || left > right) return;

    if (array[mid] === target) {
      setFound(true);
      setExplanation(`おめでとうございます！${target}が見つかりました。${step + 1}回目のステップで正解です。`);
    } else if (array[mid] < target) {
      setLeft(mid + 1);
      const newMid = Math.floor((mid + 1 + right) / 2);
      setMid(newMid);
      setExplanation(`${array[mid]}は${target}よりも小さいため、右側の部分を探索します。`);
    } else {
      setRight(mid - 1);
      const newMid = Math.floor((left + mid - 1) / 2);
      setMid(newMid);
      setExplanation(`${array[mid]}は${target}よりも大きいため、左側の部分を探索します。`);
    }

    setStep(step + 1);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-indigo-700">二分法探索</h2>
      
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold mb-2 text-indigo-600">二分法探索とは？</h3>
        <p className="mb-2">二分探索法は、<span className="font-semibold">整列された</span>データから特定の値を素早く見つける方法です。</p>
        <p className="mb-2">例えば、1から100までの数字が書かれたカードが<span className="font-semibold">順番に並んでいる</span>とします。</p>
        <p className="mb-2">その中から特定の数字を見つけることができます。</p>
        <p className="mb-4">方法は簡単です！</p>
        <ol className="list-decimal list-inside mb-4">
          <li className="mb-1">中央のカードを確認します</li>
          <li className="mb-1">探している数字よりも大きければ、左側を探索します</li>
          <li className="mb-1">小さければ、右側を探索します</li>
          <li className="mb-1">見つかるまで、手順1から3を繰り返します</li>
        </ol>
        <p>この方法を使うと、最大7回で必ず目的の数字が見つかります。</p>
      </div>

      <h3 className="text-2xl font-bold mb-4 text-center text-indigo-600">二分法探索を見てみる</h3>
      <p className="text-xl mb-4 text-center font-semibold">探したい数: <span className="text-2xl text-red-500">{target}</span></p>
      
      <div className="flex flex-wrap justify-center gap-4 mb-6 transition-all duration-300">
        {array.map((num, index) => (
          <div
            key={index}
            className={`w-14 h-14 flex items-center justify-center rounded-lg text-lg font-bold transition-all duration-300 ${
              index >= left && index <= right
                ? 'bg-blue-300 transform scale-110'
                : 'bg-gray-200'
            } ${index === mid ? 'ring-4 ring-red-500 transform scale-125' : ''} ${
              num === target && found ? 'bg-green-400 animate-bounce' : ''
            }`}
          >
            {num}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="flex items-center">
          <ArrowLeftRight className="text-blue-500 mr-2" />
          <span>探索範囲</span>
        </div>
        <div className="flex items-center">
          <ArrowRight className="text-red-500 mr-2" />
          <span>現在の値</span>
        </div>
        <div className="flex items-center">
          <Check className="text-green-500 mr-2" />
          <span>見つかりました！</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <p className="text-lg font-semibold mb-2">探索の進行状況：</p>
        <p>ステップ数: {step}</p>
        <p>左端: {left}, 右端: {right}, 中央: {mid}</p>
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg shadow mb-6">
        <p className="text-lg font-semibold">説明：</p>
        <p>{explanation}</p>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={nextStep}
          disabled={found || left > right}
          className="px-6 py-3 bg-blue-500 text-white rounded-full text-lg font-semibold hover:bg-blue-600 disabled:bg-gray-400 transition-colors duration-300"
        >
          次のステップ
        </button>
        <button
          onClick={resetSearch}
          className="px-6 py-3 bg-purple-500 text-white rounded-full text-lg font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center"
        >
          <RefreshCw className="mr-2" />
          リセット
        </button>
      </div>
    </div>
  );
};

export default BinarySearchVisualization;
