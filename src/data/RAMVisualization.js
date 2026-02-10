import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

const RAMVisualization = () => {
  const MEMORY_SIZE = 8; // メモリブロック数を8に減らす
  const PRESET_DATA = ['画像', '音声', 'テキスト', '動画']; // プリセットデータ

  const [memory, setMemory] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [operation, setOperation] = useState(''); // 'read' または 'write'
  const [explanation, setExplanation] = useState('メモリアドレスを選択して、データの読み書きを試してみましょう。');

  // メモリの初期化
  useEffect(() => {
    resetMemory();
  }, []);

  const resetMemory = () => {
    const initialMemory = Array(MEMORY_SIZE).fill(null).map(() => ({
      value: null,
      status: 'empty' // empty, occupied, accessing
    }));
    setMemory(initialMemory);
    setSelectedAddress(null);
    setOperation('');
    setExplanation('メモリアドレスを選択して、データの読み書きを試してみましょう。');
  };

  const handleAddressSelect = (index) => {
    setSelectedAddress(index);
    if (memory[index].value === null) {
      setExplanation(`アドレス${index}は空です。データを書き込むことができます。`);
    } else {
      setExplanation(`アドレス${index}には "${memory[index].value}" が格納されています。`);
    }
  };

  const writeToMemory = (data) => {
    if (selectedAddress === null) return;
    
    setOperation('write');
    const newMemory = [...memory];
    newMemory[selectedAddress] = {
      value: data,
      status: 'accessing'
    };
    setMemory(newMemory);
    setExplanation(`アドレス${selectedAddress}に "${data}" を書き込んでいます...`);

    // アニメーション効果
    setTimeout(() => {
      newMemory[selectedAddress].status = 'occupied';
      setMemory([...newMemory]);
      setExplanation(`アドレス${selectedAddress}に "${data}" を書き込みました。`);
      setOperation('');
    }, 1000);
  };

  const readFromMemory = () => {
    if (selectedAddress === null) return;
    
    setOperation('read');
    const newMemory = [...memory];
    newMemory[selectedAddress].status = 'accessing';
    setMemory(newMemory);
    setExplanation(`アドレス${selectedAddress}からデータを読み込んでいます...`);

    // アニメーション効果
    setTimeout(() => {
      newMemory[selectedAddress].status = 'occupied';
      setMemory([...newMemory]);
      setExplanation(`アドレス${selectedAddress}から "${memory[selectedAddress].value}" を読み込みました。`);
      setOperation('');
    }, 1000);
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">RAM</h2>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">RAMとは？</h3>
        <p className="mb-2">RAM（Random Access Memory）は、コンピュータの主記憶装置です。</p>
        <p className="mb-2">プログラムやデータを一時的に保存する場所で、高速にアクセスできます。</p>
        <p className="mb-2">各データは特定のメモリアドレスに保存され、必要なときにそのアドレスを指定して読み書きします。</p>
        <p>電源を切ると保存されているデータは消えてしまいます。</p>
        
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">デモ</h3>
        <p className="mb-2">このデモでは8つのメモリブロックを表示し、それぞれのアドレスから読み書きを行うことができます。</p>
        <p className="mb-2">メモリブロックをクリックすると、そのアドレスを選択できます。選択したアドレスにプリセットのデータを書き込んだり、読み出したりできます。</p>
        <p className="mb-2">リセットボタンを押すとメモリを初期化できます。</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {memory.map((block, index) => (
          <div
            key={index}
            onClick={() => handleAddressSelect(index)}
            className={`
              aspect-square flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer
              transition-all duration-300 transform
              ${selectedAddress === index ? 'ring-4 ring-blue-500 scale-105' : ''}
              ${block.status === 'empty' ? 'bg-gray-100' : 
                block.status === 'occupied' ? 'bg-green-100' :
                'bg-yellow-100 animate-pulse'}
            `}
          >
            <div className="text-xs text-gray-500 mb-1">アドレス{index}</div>
            <div className="font-mono text-sm truncate w-full text-center">
              {block.value || '-'}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mb-6 items-center justify-center">
        <div className="flex flex-wrap gap-2">
          {PRESET_DATA.map((data, index) => (
            <button
              key={index}
              onClick={() => writeToMemory(data)}
              disabled={selectedAddress === null || operation !== ''}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400 hover:bg-blue-600 transition-colors"
            >
              {data}を書き込む
            </button>
          ))}
          <button
            onClick={readFromMemory}
            disabled={selectedAddress === null || memory[selectedAddress]?.value === null || operation !== ''}
            className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:bg-gray-400 hover:bg-green-600 transition-colors"
          >
            読み込む
          </button>
        </div>
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg shadow mb-6">
        <p className="text-lg font-semibold">説明：</p>
        <p>{explanation}</p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={resetMemory}
          className="px-6 py-3 bg-purple-500 text-white rounded-full text-lg font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center"
        >
          <RefreshCw className="mr-2" />
          リセット
        </button>
      </div>
    </div>
  );
};

export default RAMVisualization;