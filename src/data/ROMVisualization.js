import React, { useState } from 'react';
import { RefreshCw, Book } from 'lucide-react';

const ROMVisualization = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [step, setStep] = useState(0);
  const [explanation, setExplanation] = useState('ROMのアドレスを選択して、データの読み出し過程を見てみましょう。');

  // ROMのデータを模擬的に作成
  const romData = [
    { address: '0000', data: '10110011', description: 'プログラム開始命令' },
    { address: '0001', data: '11100101', description: 'データロード命令' },
    { address: '0010', data: '00110111', description: '算術演算命令' },
    { address: '0011', data: '10001100', description: 'メモリ参照命令' },
    { address: '0100', data: '01110010', description: '条件分岐命令' },
    { address: '0101', data: '11011001', description: 'サブルーチン呼び出し' },
    { address: '0110', data: '00001111', description: '入出力制御命令' },
    { address: '0111', data: '10100101', description: 'プログラム終了命令' },
  ];

  const selectAddress = (address) => {
    setSelectedAddress(address);
    setStep(1);
    setExplanation('アドレスが選択されました。データを読み出しています...');
    
    setTimeout(() => {
      setStep(2);
      setExplanation('データの読み出しが完了しました！このデータは読み出し専用で、書き換えることはできません。');
    }, 1000);
  };

  const resetVisualization = () => {
    setSelectedAddress(null);
    setStep(0);
    setExplanation('ROMのアドレスを選択して、データの読み出し過程を見てみましょう。');
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-amber-50 to-orange-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-orange-700">
        ROM
      </h2>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-orange-600 flex items-center">
          <Book className="mr-2" />
          ROMとは？
        </h3>
        <p className="mb-2">ROMは「Read-Only Memory（読み出し専用メモリ）」の略称です。</p>
        <p className="mb-2">主な特徴：</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>データの読み出しのみが可能</li>
          <li>電源を切ってもデータが消えない（不揮発性）</li>
          <li>製造時にデータが書き込まれ、後から変更できない</li>
          <li>主にファームウェアや基本プログラムの格納に使用</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-lg font-bold mb-2 text-orange-600">アドレス空間</h4>
          <div className="grid grid-cols-2 gap-2">
            {romData.map((item) => (
              <button
                key={item.address}
                onClick={() => selectAddress(item.address)}
                className={`p-2 rounded-lg text-sm transition-all duration-300 ${
                  selectedAddress === item.address
                    ? 'bg-orange-500 text-white transform scale-105'
                    : 'bg-orange-100 hover:bg-orange-200'
                }`}
              >
                アドレス: {item.address}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-lg font-bold mb-2 text-orange-600">データ表示</h4>
          {selectedAddress && (
            <div className="space-y-2">
              <p className="font-mono">
                アドレス: <span className="text-orange-600">{selectedAddress}</span>
              </p>
              <p className="font-mono">
                データ: <span className="text-green-600">
                  {romData.find(item => item.address === selectedAddress)?.data}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                {romData.find(item => item.address === selectedAddress)?.description}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg shadow mb-6">
        <p className="text-lg font-semibold mb-2">動作説明：</p>
        <p>{explanation}</p>
        <div className="mt-2 h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-orange-500 rounded-full transition-all duration-500"
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={resetVisualization}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-orange-600 transition-colors duration-300 flex items-center"
        >
          <RefreshCw className="mr-2" />
          リセット
        </button>
      </div>
    </div>
  );
};

export default ROMVisualization;