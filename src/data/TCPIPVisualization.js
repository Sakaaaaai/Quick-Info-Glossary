import React, { useState } from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';

const TCPIPVisualization = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState('send');

  const layers = [
    { name: 'アプリケーション層', color: 'bg-blue-200', description: 'ユーザーが直接触れるアプリケーションのデータを扱います。' },
    { name: 'トランスポート層', color: 'bg-green-200', description: 'データの分割や再構築、エラー検出を行います。' },
    { name: 'インターネット層', color: 'bg-yellow-200', description: 'パケットの経路選択（ルーティング）を行います。' },
    { name: 'ネットワークインターフェース層', color: 'bg-red-200', description: '物理的なネットワーク接続を管理します。' },
  ];

  const nextStep = () => {
    if (step < layers.length - 1) {
      setStep(step + 1);
    } else if (direction === 'send') {
      setDirection('receive');
      setStep(layers.length - 1);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const reset = () => {
    setStep(0);
    setDirection('send');
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">TCP/IPプロトコル</h2>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">TCP/IPプロトコルとは？</h3>
        <p className="mb-2">TCP/IPプロトコルは、インターネット上でデータを送受信するための規則の集まりです。</p>
        <p className="mb-2">4つの層に分かれており、それぞれの層が特定の役割を果たしています。</p>
        <p>この可視化ツールでは、データがどのように各層を通過するかを見ることができます。</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4 text-center text-indigo-600">
          {direction === 'send' ? 'データ送信プロセス' : 'データ受信プロセス'}
        </h3>
        <div className="flex flex-col items-center">
          {layers.map((layer, index) => (
            <div
              key={layer.name}
              className={`w-full sm:w-3/4 p-4 mb-2 rounded-lg transition-all duration-300 ${layer.color} ${
                (direction === 'send' && index <= step) || (direction === 'receive' && index >= step)
                  ? 'opacity-100 transform scale-105'
                  : 'opacity-50'
              }`}
            >
              <h4 className="font-bold">{layer.name}</h4>
              <p className="text-sm">{layer.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={nextStep}
          className="px-6 py-3 bg-blue-500 text-white rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
        >
          次のステップ
          <ArrowRight className="ml-2" />
        </button>
        <button
          onClick={reset}
          className="px-6 py-3 bg-purple-500 text-white rounded-full text-lg font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center justify-center"
        >
          <RefreshCw className="mr-2" />
          リセット
        </button>
      </div>
    </div>
  );
};

export default TCPIPVisualization;
