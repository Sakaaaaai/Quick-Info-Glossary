import React, { useState } from 'react';
import { RefreshCw, File, Archive } from 'lucide-react';

const ZipVisualization = () => {
  const [step, setStep] = useState(0);
  const [files] = useState([
    { name: 'text.txt', content: 'Hello World!', size: '12 bytes' },
    { name: 'data.json', content: '{"key": "value"}', size: '16 bytes' },
    { name: 'note.md', content: '# Notes', size: '7 bytes' }
  ]);
  const [compressed, setCompressed] = useState(false);
  const [explanation, setExplanation] = useState('ZIPアーカイブの作成プロセスを見てみましょう。「次のステップ」を押して進めてください。');

  const getStepExplanation = (currentStep) => {
    const explanations = [
      'まず、圧縮したいファイルを選択します。',
      'ファイルの内容を読み取り、圧縮の準備をします。',
      'ファイルを一つずつ圧縮していきます。',
      'すべてのファイルを一つのアーカイブにまとめます。',
      '圧縮完了！元のサイズから約40%削減されました。'
    ];
    return explanations[currentStep];
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
      setExplanation(getStepExplanation(step + 1));
      if (step === 3) {
        setCompressed(true);
      }
    }
  };

  const resetDemo = () => {
    setStep(0);
    setCompressed(false);
    setExplanation(getStepExplanation(0));
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-green-700">ZIP</h2>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-green-600">ZIPとは？</h3>
        <p className="mb-2">ZIPは複数のファイルを1つにまとめて圧縮する形式です。</p>
        <p className="mb-2">圧縮することで、ファイルサイズを小さくできます。</p>
        <p className="mb-4">以下が圧縮の基本的な手順です：</p>
        <ol className="list-decimal list-inside mb-4">
          <li className="mb-1">ファイルの選択</li>
          <li className="mb-1">各ファイルの内容を読み取り</li>
          <li className="mb-1">データの圧縮処理</li>
          <li className="mb-1">アーカイブの作成</li>
        </ol>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mb-6">
        {files.map((file, index) => (
          <div
            key={index}
            className={`transition-all duration-500 ${
              step > 0 ? 'transform hover:scale-105' : ''
            }`}
          >
            <div className={`p-4 rounded-lg shadow-md ${
              compressed ? 'bg-green-100' : 'bg-white'
            }`}>
              <div className="flex items-center mb-2">
                <File className="w-6 h-6 mr-2 text-blue-500" />
                <span className="font-semibold">{file.name}</span>
              </div>
              <div className="text-sm text-gray-600">
                <p>サイズ: {compressed ? `${Math.floor(parseInt(file.size) * 0.6)} bytes` : file.size}</p>
                <p className="font-mono bg-gray-100 p-1 rounded mt-1">
                  {file.content.substring(0, 15)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {step >= 3 && (
        <div className="flex justify-center mb-6">
          <div className={`p-4 rounded-lg shadow-md bg-blue-100 transform ${
            compressed ? 'scale-110' : ''
          } transition-all duration-500`}>
            <div className="flex items-center mb-2">
              <Archive className="w-6 h-6 mr-2 text-blue-500" />
              <span className="font-semibold">archive.zip</span>
            </div>
            <p className="text-sm text-gray-600">
              圧縮後サイズ: {compressed ? '21 bytes' : '35 bytes'}
            </p>
          </div>
        </div>
      )}

      <div className="bg-yellow-100 p-4 rounded-lg shadow mb-6">
        <p className="text-lg font-semibold">現在の状態：</p>
        <p>{explanation}</p>
        <p className="mt-2">ステップ: {step + 1}/5</p>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={nextStep}
          disabled={step >= 4}
          className="px-6 py-3 bg-green-500 text-white rounded-full text-lg font-semibold hover:bg-green-600 disabled:bg-gray-400 transition-colors duration-300"
        >
          次のステップ
        </button>
        <button
          onClick={resetDemo}
          className="px-6 py-3 bg-blue-500 text-white rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors duration-300 flex items-center"
        >
          <RefreshCw className="mr-2" />
          リセット
        </button>
      </div>
    </div>
  );
};

export default ZipVisualization;