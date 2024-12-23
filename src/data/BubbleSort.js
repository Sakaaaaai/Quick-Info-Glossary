import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, Play, Pause, SkipForward } from 'lucide-react';

const BubbleSortVisualization = () => {
  const [array, setArray] = useState([]);
  const [sortingIndex, setSortingIndex] = useState(null);
  const [sorted, setSorted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const sortingRef = useRef(null);
  const pauseRef = useRef(false);

  useEffect(() => {
    resetArray();
    return () => {
      if (sortingRef.current) {
        clearTimeout(sortingRef.current);
      }
    };
  }, []);

  const resetArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setArray(newArray);
    setSortingIndex(null);
    setSorted(false);
    setIsRunning(false);
    setIsPaused(false);
    pauseRef.current = false;
    setComparisons(0);
    setSwaps(0);
    setCurrentStep('');
    if (sortingRef.current) {
      clearTimeout(sortingRef.current);
    }
  };

  const bubbleSort = async () => {
    setIsRunning(true);
    setIsPaused(false);
    pauseRef.current = false;
    let arr = [...array];
    let i = 0;
    let j = 0;

    const sort = async () => {
      if (pauseRef.current) {
        sortingRef.current = setTimeout(sort, 100);
        return;
      }

      if (i < arr.length) {
        if (j < arr.length - i - 1) {
          setSortingIndex(j);
          setCurrentStep(`${arr[j]} と ${arr[j+1]} を比較中`);
          setComparisons(prev => prev + 1);
          if (arr[j] > arr[j + 1]) {
            setCurrentStep(`${arr[j]} > ${arr[j+1]} なので交換します`);
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            setSwaps(prev => prev + 1);
            setArray([...arr]);
          }
          j++;
        } else {
          i++;
          j = 0;
        }
        sortingRef.current = setTimeout(sort, speed);
      } else {
        setSortingIndex(null);
        setSorted(true);
        setIsRunning(false);
        setCurrentStep('ソート完了！');
      }
    };

    sort();
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
    pauseRef.current = !pauseRef.current;
    if (pauseRef.current === false && isRunning) {
      bubbleSort();
    }
  };

  const stepForward = () => {
    if (!isRunning || !isPaused) return;
    pauseRef.current = false;
    setTimeout(() => {
      pauseRef.current = true;
    }, speed);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-indigo-700">バブルソート</h2>
      
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold mb-2 text-indigo-600">バブルソートとは？</h3>
        <p className="mb-2">バブルソートは、隣接する要素を比較し、必要に応じて交換を繰り返すことで、配列を整列するシンプルなアルゴリズムです。</p>
        <p className="mb-2">以下がその手順です：</p>
        <ol className="list-decimal list-inside mb-4">
          <li className="mb-1">配列の先頭から順に隣接する要素を比較します</li>
          <li className="mb-1">左の要素が右の要素より大きい場合、それらを交換します</li>
          <li className="mb-1">配列の最後まで到達したら、再び先頭に戻ります</li>
          <li className="mb-1">一度も交換が発生しなくなるまで、この過程を繰り返します</li>
        </ol>
        <p className="mb-2">この方法は、泡が水中を上昇するように大きな値が徐々に右側に移動することから「バブルソート」と呼ばれています。</p>
        <h4 className="text-lg font-semibold mt-4 mb-2">バブルソートの特徴：</h4>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-1">実装が簡単で理解しやすい</li>
          <li className="mb-1">小さなデータセットには効果的</li>
          <li className="mb-1">大きなデータセットでは非効率（計算量がO(n^2)）</li>
          <li className="mb-1">「安定ソート」である（同じ値の要素の相対的な順序が保たれる）</li>
        </ul>
        <p className="italic text-sm text-gray-600">注: 実際のアプリケーションでは、より効率的なアルゴリズム（クイックソート、マージソートなど）が一般的に使用されます。</p>
      </div>

      <div className="flex justify-center mb-6">
        {array.map((value, index) => (
          <div
            key={index}
            className={`w-12 bg-blue-500 m-1 flex items-end justify-center text-white font-bold transition-all duration-300 ${
              index === sortingIndex || index === sortingIndex + 1 ? 'bg-red-500' : ''
            } ${sorted ? 'bg-green-500' : ''}`}
            style={{ height: `${value * 2 + 20}px` }}
          >
            {value}
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <p className="text-lg font-semibold mb-2">現在の状態：</p>
        <p>{currentStep}</p>
        <p>比較回数: {comparisons}</p>
        <p>交換回数: {swaps}</p>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
        <button
          onClick={resetArray}
          className="w-full md:w-auto px-4 py-2 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center justify-center"
          disabled={isRunning && !isPaused}
        >
          <RefreshCw className="mr-2" size={20} />
          リセット
        </button>
        <button
          onClick={isRunning ? togglePause : bubbleSort}
          className="w-full md:w-auto px-4 py-2 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors duration-300 flex items-center justify-center"
          disabled={sorted}
        >
          {isRunning && !isPaused ? <Pause className="mr-2" size={20} /> : <Play className="mr-2" size={20} />}
          {isRunning && !isPaused ? '一時停止' : '開始/再開'}
        </button>
        <button
          onClick={stepForward}
          className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
          disabled={!isRunning || !isPaused}
        >
          <SkipForward className="mr-2" size={20} />
          次のステップ
        </button>
      </div>

      <div className="flex items-center justify-center gap-4">
        <span className="font-semibold">速度：</span>
        <input
          type="range"
          min="100"
          max="1000"
          step="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-48"
        />
        <span>{speed}ms</span>
      </div>
    </div>
  );
};

export default BubbleSortVisualization;
