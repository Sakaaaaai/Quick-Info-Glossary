import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

const LinearSearchVisualization = () => {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [found, setFound] = useState(false);
  const [step, setStep] = useState(0);
  const [explanation, setExplanation] = useState('');

  useEffect(() => {
    resetSearch();
  }, []);

  const resetSearch = () => {
    const newArray = Array.from({ length: 6 }, () => Math.floor(Math.random() * 100));
    setArray(newArray);
    setTarget(newArray[Math.floor(Math.random() * newArray.length)]);
    setCurrentIndex(0);
    setFound(false);
    setStep(0);
    setExplanation('最初の要素から順番に探索を開始します。「次のステップ」ボタンを押して、探索を進めてみましょう。');
  };

  const nextStep = () => {
    if (found || currentIndex >= array.length) return;

    if (array[currentIndex] === target) {
      setFound(true);
      setExplanation(`おめでとうございます！${target}が見つかりました。${step + 1}回目のステップで正解です。`);
    } else {
      setCurrentIndex(currentIndex + 1);
      setExplanation(`${array[currentIndex]}は${target}ではありません。次の要素に移動します。`);
    }

    setStep(step + 1);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-green-700">単純前方探索</h2>
      
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold mb-2 text-green-600">単純前方探索とは？</h3>
        <p className="mb-2">単純前方探索は、データの集合から特定の値を見つける最も基本的な方法です。</p>
        <p className="mb-2">この方法では、<span className="font-semibold">先頭から順番に</span>各要素を調べていきます。</p>
        <p className="mb-2">探している値が見つかるまで、または全ての要素を調べ終わるまで続けます。</p>
        <p className="mb-4">以下がその方法です：</p>
        <ol className="list-decimal list-inside mb-4">
          <li className="mb-1">先頭の要素から始めます</li>
          <li className="mb-1">現在の要素が探している値かどうか確認します</li>
          <li className="mb-1">見つかった場合は探索を終了します</li>
          <li className="mb-1">見つからなかった場合は次の要素に移動します</li>
          <li className="mb-1">全ての要素を調べるまで2〜4を繰り返します</li>
        </ol>
        <p>この方法は簡単ですが、大きなデータセットでは時間がかかる場合があります。</p>
      </div>

      <h3 className="text-2xl font-bold mb-4 text-center text-green-600">単純前方探索を見てみる</h3>
      <p className="text-xl mb-4 text-center font-semibold">探したい数: <span className="text-2xl text-red-500">{target}</span></p>
      
      <div className="flex flex-wrap justify-center gap-4 mb-6 transition-all duration-300">
        {array.map((num, index) => (
          <div
            key={index}
            className={`w-14 h-14 flex items-center justify-center rounded-lg text-lg font-bold transition-all duration-300 ${
              index === currentIndex
                ? 'bg-green-300 transform scale-110 ring-4 ring-red-500'
                : index < currentIndex
                ? 'bg-gray-200'
                : 'bg-blue-300'
            } ${num === target && found ? 'bg-green-400 animate-bounce' : ''}`}
          >
            {num}
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <p className="text-lg font-semibold mb-2">探索の進行状況：</p>
        <p>ステップ数: {step}</p>
        <p>現在の位置: {currentIndex}</p>
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg shadow mb-6">
        <p className="text-lg font-semibold">説明：</p>
        <p>{explanation}</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={nextStep}
          disabled={found || currentIndex >= array.length}
          className="px-6 py-3 bg-green-500 text-white rounded-full text-lg font-semibold hover:bg-green-600 disabled:bg-gray-400 transition-colors duration-300"
        >
          次のステップ
        </button>
        <button
          onClick={resetSearch}
          className="flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
        >
          <RefreshCw className="mr-2" />
          <span>リセット</span>
        </button>
      </div>
    </div>
  );
};

export default LinearSearchVisualization;
