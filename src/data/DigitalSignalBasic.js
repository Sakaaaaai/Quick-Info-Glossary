import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const DigitalSignalBasic = () => {
  // 学習ステップの管理
  const [learningStep, setLearningStep] = useState(1);
  
  // 基本的なデジタルデータ
  const [bits, setBits] = useState([1, 0, 1, 0]);
  // 実信号の表示切り替え
  const [showTransition, setShowTransition] = useState(false);

  // 波形生成のための関数
  const generatePoints = () => {
    const points = [];
    const pointsPerBit = 50;
    
    bits.forEach((bit, index) => {
      for (let i = 0; i < pointsPerBit; i++) {
        const x = index * pointsPerBit + i;
        let y = bit;
        
        // なめらかな遷移を表現（オプション）
        if (showTransition && i < 5) {
          const prevBit = index > 0 ? bits[index - 1] : bit;
          y = prevBit + (bit - prevBit) * (i / 5);
        }
        
        points.push({ x, y });
      }
    });
    return points;
  };

  const points = generatePoints();

  // ステップ1: デジタル信号の基本概念
  const renderStep1 = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h3 className="text-xl font-bold text-blue-700 mb-4">ステップ1: デジタル信号の基本</h3>
      <div className="space-y-4">
        <p>デジタル信号は<span className="font-bold text-blue-600">2つの状態（0と1）</span>だけで情報を表現します。</p>
        <div className="flex gap-8 justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-500 rounded-lg flex items-center justify-center text-white text-3xl font-bold mb-2">1</div>
            <p className="text-lg">High (5V)</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-500 rounded-lg flex items-center justify-center text-white text-3xl font-bold mb-2">0</div>
            <p className="text-lg">Low (0V)</p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="font-bold text-blue-800">👉 ポイント</p>
          <ul className="list-disc list-inside text-blue-800 mt-2">
            <li>コンピュータは全ての情報をこの2つの状態で処理します</li>
            <li>電圧の高低で0と1を表現します</li>
            <li>明確な2つの状態なので、ノイズに強いのが特徴です</li>
          </ul>
        </div>
        <button 
          onClick={() => setLearningStep(2)}
          className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 w-full text-lg"
        >
          次へ：ビット列を見てみよう →
        </button>
      </div>
    </div>
  );

  // ステップ2: ビット列の理解
  const renderStep2 = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h3 className="text-xl font-bold text-blue-700 mb-4">ステップ2: ビット列</h3>
      <p className="mb-4">複数のビットを並べることで、様々な情報を表現できます。</p>
      <div className="flex justify-center gap-4 mb-6">
        {bits.map((bit, index) => (
          <button
            key={index}
            onClick={() => {
              const newBits = [...bits];
              newBits[index] = bit === 1 ? 0 : 1;
              setBits(newBits);
            }}
            className={`w-20 h-20 rounded-lg font-bold text-white text-2xl
              ${bit === 1 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}
              transition-all duration-300 transform hover:scale-105`}
          >
            {bit}
          </button>
        ))}
      </div>
      <div className="p-4 bg-yellow-50 rounded-lg mb-6">
        <p className="font-bold text-yellow-800">💡 やってみよう！</p>
        <p className="text-yellow-800">上のビットをクリックして、値を変更してみましょう。</p>
      </div>
      <div className="flex justify-between">
        <button 
          onClick={() => setLearningStep(1)}
          className="px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600"
        >
          ← 戻る
        </button>
        <button 
          onClick={() => setLearningStep(3)}
          className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          次へ：波形を見る →
        </button>
      </div>
    </div>
  );

  // ステップ3: デジタル波形の表示
  const renderStep3 = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h3 className="text-xl font-bold text-blue-700 mb-4">ステップ3: デジタル波形</h3>
      <div className="h-64 border border-gray-200 rounded-lg p-4 mb-4 relative bg-white">
        <div className="absolute left-0 right-0 top-1/2 border-t-2 border-gray-300" />
        <div className="absolute left-4 top-4 text-sm text-gray-500">5V</div>
        <div className="absolute left-4 bottom-4 text-sm text-gray-500">0V</div>
        <svg width="100%" height="100%" viewBox="0 0 200 100">
          <path
            d={`M ${points.map(p => `${p.x} ${50 - p.y * 40}`).join(' L ')}`}
            fill="none"
            stroke="blue"
            strokeWidth="3"
          />
        </svg>
      </div>
      <div className="p-4 bg-blue-50 rounded-lg mb-6">
        <p className="font-bold text-blue-800">📊 波形の見方</p>
        <ul className="list-disc list-inside text-blue-800 mt-2">
          <li>高い位置（上）が1（5V）を表します</li>
          <li>低い位置（下）が0（0V）を表します</li>
          <li>左から右へ時間が進みます</li>
        </ul>
      </div>
      <div className="flex justify-between">
        <button 
          onClick={() => setLearningStep(2)}
          className="px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600"
        >
          ← 戻る
        </button>
        <button 
          onClick={() => setLearningStep(4)}
          className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          次へ：信号を見る →
        </button>
      </div>
    </div>
  );

  // ステップ4: 実際の信号との比較
  const renderStep4 = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h3 className="text-xl font-bold text-blue-700 mb-4">ステップ4: 理想と現実の信号</h3>
      <div className="h-64 border border-gray-200 rounded-lg p-4 relative bg-white mb-4">
        <div className="absolute left-0 right-0 top-1/2 border-t-2 border-gray-300" />
        <div className="absolute left-4 top-4 text-sm text-gray-500">5V</div>
        <div className="absolute left-4 bottom-4 text-sm text-gray-500">0V</div>
        <svg width="100%" height="100%" viewBox="0 0 200 100">
          {/* 理想的な波形 */}
          <path
            d={`M ${points.map(p => `${p.x} ${50 - p.y * 40}`).join(' L ')}`}
            fill="none"
            stroke="blue"
            strokeWidth="3"
          />
          {/* 実際の信号 */}
          {showTransition && (
            <path
              d={`M ${points.map(p => `${p.x} ${50 - p.y * 40}`).join(' L ')}`}
              fill="none"
              stroke="red"
              strokeWidth="2"
              strokeDasharray="4"
            />
          )}
        </svg>
      </div>
      
      <div className="flex items-center justify-center gap-2 mb-6">
        <label className="flex items-center gap-2 text-lg">
          <input
            type="checkbox"
            checked={showTransition}
            onChange={e => setShowTransition(e.target.checked)}
            className="w-5 h-5"
          />
          実際の信号を表示
        </label>
      </div>

      <div className="p-4 bg-yellow-50 rounded-lg mb-6">
        <p className="font-bold text-yellow-800">💡 重要ポイント</p>
        <ul className="list-disc list-inside text-yellow-800 mt-2">
          <li>理想的な信号は瞬時に切り替わります（青線）</li>
          <li>実際の信号はなめらかに変化します（赤線）</li>
          <li>ただし、0か1かを判断するのに問題ありません</li>
        </ul>
      </div>

      <div className="flex justify-between">
        <button 
          onClick={() => setLearningStep(3)}
          className="px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600"
        >
          ← 戻る
        </button>
        <button 
          onClick={() => {
            setLearningStep(1);
            setBits([1, 0, 1, 0]);
            setShowTransition(false);
          }}
          className="px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 flex items-center"
        >
          <RefreshCw className="mr-2" />
          最初から
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        デジタル信号を理解しよう
      </h2>

      {/* 進行状況のインジケーター */}
      <div className="flex justify-center mb-8">
        {[1, 2, 3, 4].map(step => (
          <div
            key={step}
            onClick={() => setLearningStep(step)}
            className={`flex flex-col items-center mx-4 cursor-pointer
              ${step === learningStep ? 'opacity-100' : 'opacity-50'}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2
              ${step === learningStep ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {step}
            </div>
            <div className="text-sm text-gray-600 text-center">
              {step === 1 && "基本"}
              {step === 2 && "ビット列"}
              {step === 3 && "波形"}
              {step === 4 && "実信号"}
            </div>
          </div>
        ))}
      </div>

      {/* 各ステップの内容 */}
      {learningStep === 1 && renderStep1()}
      {learningStep === 2 && renderStep2()}
      {learningStep === 3 && renderStep3()}
      {learningStep === 4 && renderStep4()}
    </div>
  );
};

export default DigitalSignalBasic;