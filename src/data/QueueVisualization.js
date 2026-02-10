'use client'

import React, { useState } from 'react';
import { RefreshCw, PlusCircle, MinusCircle, User } from 'lucide-react';

const names = [
  '田中', '佐藤', '鈴木', '高橋', '渡辺',
  '伊藤', '山本', '中村', '小林', '加藤',
  '吉田', '山田', '佐々木', '山口', '松本',
  '井上', '木村', '林', '斎藤', '清水'
];

export default function QueueVisualization() {
  const [queue, setQueue] = useState([]);
  const [message, setMessage] = useState('キューは空です。お客様を追加してみましょう！');

  const enqueue = () => {
    if (queue.length >= 8) {
      setMessage('キューがいっぱいです！これ以上お客様を追加できません。');
      return;
    }
    const newCustomer = names[Math.floor(Math.random() * names.length)];
    setQueue([...queue, newCustomer]);
    setMessage(`${newCustomer}さんがレジに並びました。`);
  };

  const dequeue = () => {
    if (queue.length === 0) {
      setMessage('キューが空です！お客様がいません。');
      return;
    }
    const served = queue[0];
    setQueue(queue.slice(1));
    setMessage(`${served}さんの会計が終わりました。`);
  };

  const reset = () => {
    setQueue([]);
    setMessage('全てのお客様の会計が終わりました。');
  };

  return (
    <div className="p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-green-700">待ち行列</h2>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold mb-2 text-green-600">待ち行列（キュー）とは？</h3>
        <p className="mb-2">待ち行列は、<span className="font-semibold">先入れ先出し</span>（FIFO: First In, First Out）の仕組みです。</p>
        <p className="mb-2">コンビニのレジに並ぶ人の列を想像してみましょう：</p>
        <ul className="list-disc list-inside mb-4 ml-4">
          <li className="mb-1">新しく来たお客様は必ず列の最後尾に並びます（エンキュー）</li>
          <li className="mb-1">レジでの会計は、列の先頭から順番に行われます（デキュー）</li>
        </ul>
        <p>このように、人やデータを「順番通りに」処理する必要がある場合によく使われます。</p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
        <button
          onClick={enqueue}
          className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600 w-full sm:w-auto"
          aria-label="お客様を追加"
        >
          <PlusCircle size={20} />
          お客様追加
        </button>
        <button
          onClick={dequeue}
          className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2 hover:bg-red-600 w-full sm:w-auto"
          aria-label="会計完了"
        >
          <MinusCircle size={20} />
          会計完了
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center gap-2 hover:bg-gray-600 w-full sm:w-auto"
          aria-label="リセット"
        >
          <RefreshCw size={20} />
          リセット
        </button>
      </div>

      <div className="relative mb-6">
        <div className="flex justify-center items-center gap-2 h-32">
          {queue.length === 0 ? (
            <div className="text-gray-400 text-lg">お客様がいません</div>
          ) : (
            queue.map((customer, index) => (
              <div
                key={index}
                className={`w-20 h-20 flex flex-col items-center justify-center rounded-lg text-sm font-bold 
                  ${index === 0 ? 'bg-green-300' : index === queue.length - 1 ? 'bg-blue-300' : 'bg-gray-200'}
                  transform transition-all duration-300 hover:scale-110`}
                aria-label={`${customer}さん、${index + 1}番目`}
              >
                <User size={24} />
                <span className="mt-1">{customer}</span>
              </div>
            ))
          )}
        </div>
        {queue.length > 0 && (
          <>
            <div className="absolute left-0 top-0 text-sm font-bold text-green-600">←レジ</div>
            <div className="absolute right-0 top-0 text-sm font-bold text-blue-600">列の最後尾→</div>
          </>
        )}
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg shadow">
        <p className="text-lg">現在の状態：</p>
        <p>待ち人数: {queue.length}人</p>
        <p>{message}</p>
      </div>
    </div>
  );
}
