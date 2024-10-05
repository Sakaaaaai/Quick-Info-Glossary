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
    setExplanation('真ん中の数から探し始めるよ。「次のステップ」ボタンをクリックして、探索を始めよう！');
  };

  const nextStep = () => {
    if (found || left > right) return;

    if (array[mid] === target) {
      setFound(true);
      setExplanation(`やったね！${target}が見つかったよ。${step + 1}回目で正解！`);
    } else if (array[mid] < target) {
      setLeft(mid + 1);
      const newMid = Math.floor((mid + 1 + right) / 2);
      setMid(newMid);
      setExplanation(`${array[mid]}は${target}より小さいから、右半分を探すよ。`);
    } else {
      setRight(mid - 1);
      const newMid = Math.floor((left + mid - 1) / 2);
      setMid(newMid);
      setExplanation(`${array[mid]}は${target}より大きいから、左半分を探すよ。`);
    }

    setStep(step + 1);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-indigo-700">二分法探索を学ぼう！</h2>
      
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold mb-2 text-indigo-600">二分法探索って何？</h3>
        <p className="mb-2">二分法探索は、<span className="font-semibold">整列された</span>データの中から特定の値を素早く見つけ出す方法だよ。</p>
        <p className="mb-2">例えば、1から100までの数が書かれた100枚のカードが<span className="font-semibold">順番に並んでいる</span>とき、</p>
        <p className="mb-2">特定の数字を見つけるのに使えるんだ。</p>
        <p className="mb-4">やり方は簡単！</p>
        <ol className="list-decimal list-inside mb-4">
          <li className="mb-1">真ん中のカードを見る</li>
          <li className="mb-1">探している数字より大きければ、左半分を探す</li>
          <li className="mb-1">小さければ、右半分を探す</li>
          <li className="mb-1">見つかるまで、1~3を繰り返す</li>
        </ol>
        <p>この方法を使うと、最悪でも7回で必ず目的の数字が見つかるんだ！</p>
      </div>

      <h3 className="text-2xl font-bold mb-4 text-center text-indigo-600">二分法探索を見てみよう！</h3>
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
          <span>今見てる数</span>
        </div>
        <div className="flex items-center">
          <Check className="text-green-500 mr-2" />
          <span>見つかった！</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <p className="text-lg font-semibold mb-2">探索の状況：</p>
        <p>ステップ数: {step}</p>
        <p>左端: {left}, 右端: {right}, 真ん中: {mid}</p>
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