import React, { useState, useEffect } from 'react';
import { Server, Laptop, AlertTriangle } from 'lucide-react';

const DoSAttackVisualization = () => {
  const [serverLoad, setServerLoad] = useState(0);
  const [attackerCount, setAttackerCount] = useState(0);
  const [isUnderAttack, setIsUnderAttack] = useState(false);
  const [explanation, setExplanation] = useState('サーバーは現在正常に動作しています。攻撃を開始するには「攻撃開始」ボタンを押してください。');

  useEffect(() => {
    const timer = setInterval(() => {
      if (isUnderAttack) {
        setServerLoad(prevLoad => Math.min(prevLoad + 5, 100));
      } else {
        setServerLoad(prevLoad => Math.max(prevLoad - 5, 0));
      }
    }, 500);

    return () => clearInterval(timer);
  }, [isUnderAttack]);

  const startAttack = () => {
    setIsUnderAttack(true);
    setAttackerCount(prevCount => prevCount + 1);
    setExplanation('DoS攻撃が開始されました。攻撃者がサーバーに大量のリクエストを送信しています。サーバーの負荷が増加していきます。');
  };

  const stopAttack = () => {
    setIsUnderAttack(false);
    setAttackerCount(0);
    setExplanation('攻撃が停止しました。サーバーの負荷が徐々に減少していきます。');
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">DoS攻撃</h2>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">DoS攻撃とは？</h3>
        <p className="mb-2">DoS（Denial of Service）攻撃は、サーバーやネットワークに大量のリクエストを送信し、正常なサービスを妨害する攻撃手法です。</p>
        <p className="mb-2">攻撃者は多数の偽のリクエストを送信し、サーバーのリソースを枯渇させます。</p>
        <p className="mb-2">結果として、正規ユーザーがサービスを利用できなくなる可能性があります。</p>
      </div>

      <div className="flex justify-center items-center mb-6 space-x-4">
        <div className="flex flex-col items-center">
          <Laptop size={48} className="text-blue-500" />
          <p className="mt-2">攻撃者: {attackerCount}</p>
        </div>
        <div className="flex-1 h-2 bg-gray-200 rounded-full">
          <div
            className={`h-full rounded-full ${
              serverLoad < 50 ? 'bg-green-500' : serverLoad < 80 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${serverLoad}%` }}
          ></div>
        </div>
        <div className="flex flex-col items-center">
          <Server size={48} className="text-purple-500" />
          <p className="mt-2">サーバー負荷: {serverLoad}%</p>
        </div>
      </div>

      {serverLoad >= 100 && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <div className="flex items-center">
            <AlertTriangle className="mr-2" />
            <p className="font-bold">警告: サーバーがダウンしました！</p>
          </div>
          <p>DoS攻撃によりサーバーが過負荷状態になり、サービスが利用できなくなりました。</p>
        </div>
      )}

      <div className="bg-yellow-100 p-4 rounded-lg shadow mb-6">
        <p className="text-lg font-semibold">説明：</p>
        <p>{explanation}</p>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={startAttack}
          disabled={isUnderAttack}
          className="px-6 py-3 bg-red-500 text-white rounded-full text-lg font-semibold hover:bg-red-600 disabled:bg-gray-400 transition-colors duration-300"
        >
          攻撃開始
        </button>
        <button
          onClick={stopAttack}
          disabled={!isUnderAttack}
          className="px-6 py-3 bg-green-500 text-white rounded-full text-lg font-semibold hover:bg-green-600 disabled:bg-gray-400 transition-colors duration-300"
        >
          攻撃停止
        </button>
      </div>
    </div>
  );
};

export default DoSAttackVisualization;