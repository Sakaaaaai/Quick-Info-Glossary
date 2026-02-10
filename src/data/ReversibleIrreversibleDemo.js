import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';

const ReversibleIrreversibleDemo = () => {
  const [reversibleExample, setReversibleExample] = useState('こんにちは');
  const [irreversibleExample, setIrreversibleExample] = useState('Hello, World!');
  const [reversibleStep, setReversibleStep] = useState(0);
  const [irreversibleStep, setIrreversibleStep] = useState(0);

  const reverseString = (str) => str.split('').reverse().join('');
  const countCharacters = (str) => str.length.toString();

  const changeExample = () => {
    const reversibleExamples = ['おはよう', 'がんばろう', 'ありがとう'];
    const irreversibleExamples = ['Python', 'JavaScript', 'React'];
    
    setReversibleExample(reversibleExamples[Math.floor(Math.random() * reversibleExamples.length)]);
    setIrreversibleExample(irreversibleExamples[Math.floor(Math.random() * irreversibleExamples.length)]);
    setReversibleStep(0);
    setIrreversibleStep(0);
  };

  const nextReversibleStep = () => {
    setReversibleStep((prev) => (prev + 1) % 3);
  };

  const nextIrreversibleStep = () => {
    setIrreversibleStep((prev) => (prev + 1) % 3);
  };

  const ReversibleStepContent = () => {
    switch (reversibleStep) {
      case 0:
        return (
          <>
            <div className="w-full p-2 bg-blue-100 rounded text-center font-bold">{reversibleExample}</div>
            <p className="text-sm text-gray-600 mt-2">
              これが元のデータです。次のステップで変換を行います。
            </p>
          </>
        );
      case 1:
        return (
          <>
            <div className="w-full p-2 bg-blue-100 rounded text-center">{reversibleExample}</div>
            <ArrowRight className="text-indigo-500 my-2" />
            <div className="w-full p-2 bg-green-100 rounded text-center font-bold">{reverseString(reversibleExample)}</div>
            <p className="text-sm text-gray-600 mt-2">
              文字列を逆順にする変換を行いました。この状態からでも元のデータを復元できます。
            </p>
          </>
        );
      case 2:
        return (
          <>
            <div className="w-full p-2 bg-gray-100 rounded text-center">{reversibleExample}</div>
            <ArrowRight className="text-indigo-500 my-2" />
            <div className="w-full p-2 bg-gray-100 rounded text-center">{reverseString(reversibleExample)}</div>
            <ArrowLeft className="text-indigo-500 my-2" />
            <div className="w-full p-2 bg-blue-100 rounded text-center font-bold">{reversibleExample}</div>
            <p className="text-sm text-gray-600 mt-2">
              変換を逆に適用することで、元のデータに戻すことができました。これが可逆形式の特徴です。
            </p>
          </>
        );
      default:
        return null; // default caseを追加
    }
  };

  const IrreversibleStepContent = () => {
    switch (irreversibleStep) {
      case 0:
        return (
          <>
            <div className="w-full p-2 bg-blue-100 rounded text-center font-bold">{irreversibleExample}</div>
            <p className="text-sm text-gray-600 mt-2">
              これが元のデータです。次のステップで変換を行います。
            </p>
          </>
        );
      case 1:
        return (
          <>
            <div className="w-full p-2 bg-blue-100 rounded text-center">{irreversibleExample}</div>
            <ArrowRight className="text-indigo-500 my-2" />
            <div className="w-full p-2 bg-green-100 rounded text-center font-bold">{countCharacters(irreversibleExample)}</div>
            <p className="text-sm text-gray-600 mt-2">
              文字数をカウントする変換を行いました。この状態からは元のデータを復元できません。
            </p>
          </>
        );
      case 2:
        return (
          <>
            <div className="w-full p-2 bg-gray-100 rounded text-center">{irreversibleExample}</div>
            <ArrowRight className="text-indigo-500 my-2" />
            <div className="w-full p-2 bg-gray-100 rounded text-center">{countCharacters(irreversibleExample)}</div>
            <ArrowLeft className="text-red-500 my-2" />
            <div className="w-full p-2 bg-red-100 rounded text-center font-bold">???</div>
            <p className="text-sm text-gray-600 mt-2">
              文字数だけでは元のデータを復元できません。これが非可逆形式の特徴です。
            </p>
          </>
        );
      default:
        return null; // default caseを追加
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">可逆形式と非可逆形式</h2>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-2xl font-bold mb-4 text-indigo-600">概要説明</h3>
        <p className="mb-4">
          <strong>可逆形式</strong>と<strong>非可逆形式</strong>は、データ変換の二つの重要な概念です。
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li><strong>可逆形式：</strong> 変換後のデータから元のデータを復元できる形式。例：暗号化、データ圧縮</li>
          <li><strong>非可逆形式：</strong> 変換後のデータから元のデータを復元できない形式。例：ハッシュ関数、文字数カウント</li>
        </ul>
        <p>
          以下のデモでは、簡単な例を用いてそれぞれの特徴を段階的に示します。
          「次のステップ」ボタンをクリックして、変換の過程を確認してください。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* 可逆形式のデモ */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-2xl font-bold mb-4 text-indigo-600">可逆形式</h3>
          <p className="mb-4">例：文字列の逆順（元に戻せる）</p>
          <div className="flex flex-col items-center space-y-4 mb-4">
            <ReversibleStepContent />
          </div>
          <button
            onClick={nextReversibleStep}
            className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-full text-sm font-semibold hover:bg-indigo-600 transition-colors duration-300"
          >
            次のステップ
          </button>
        </div>

        {/* 非可逆形式のデモ */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-2xl font-bold mb-4 text-indigo-600">非可逆形式</h3>
          <p className="mb-4">例：文字数のカウント（元に戻せない）</p>
          <div className="flex flex-col items-center space-y-4 mb-4">
            <IrreversibleStepContent />
          </div>
          <button
            onClick={nextIrreversibleStep}
            className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-full text-sm font-semibold hover:bg-indigo-600 transition-colors duration-300"
          >
            次のステップ
          </button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={changeExample}
          className="px-6 py-3 bg-indigo-500 text-white rounded-full text-lg font-semibold hover:bg-indigo-600 transition-colors duration-300 flex items-center mx-auto"
        >
          <RefreshCw className="mr-2" />
          例を変更
        </button>
      </div>

      <div className="mt-8 bg-yellow-100 p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4 text-indigo-600">実践演習</h3>
        <p>このデモを使って、データ変換に関する理解を深めましょう！</p>
      </div>
    </div>
  );
};

export default ReversibleIrreversibleDemo;
