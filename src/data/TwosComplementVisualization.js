import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const TwosComplementVisualization = () => {
  const [number, setNumber] = useState(5);
  const [step, setStep] = useState(0);
  const [binaryRepresentation, setBinaryRepresentation] = useState('');
  const [invertedBinary, setInvertedBinary] = useState('');
  const [twosComplement, setTwosComplement] = useState('');

  const resetVisualization = () => {
    const newNumber = Math.floor(Math.random() * 128) - 64; // -64 to 63
    setNumber(newNumber);
    setStep(0);
    setBinaryRepresentation('');
    setInvertedBinary('');
    setTwosComplement('');
  };

  const nextStep = () => {
    switch (step) {
      case 0:
        setBinaryRepresentation(number.toString(2).padStart(8, '0'));
        setStep(1);
        break;
      case 1:
        setInvertedBinary(binaryRepresentation.split('').map(bit => bit === '0' ? '1' : '0').join(''));
        setStep(2);
        break;
      case 2:
        const twosComp = (parseInt(invertedBinary, 2) + 1).toString(2).padStart(8, '0');
        setTwosComplement(twosComp);
        setStep(3);
        break;
      default:
        break;
    }
  };

  const getExplanation = () => {
    switch (step) {
      case 0:
        return '次のステップで、この数値を8ビットの2進数に変換します。';
      case 1:
        return '2進数表現が得られました。次に、各ビットを反転（0を1に、1を0に）します。';
      case 2:
        return 'ビットを反転しました。最後に、この反転したビット列に1を加えます。';
      case 3:
        return `これが${number}の2の補数表現です。2の補数を使うと、コンピュータは負の数を簡単に扱えます。`;
      default:
        return '';
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-green-700">2の補数表現</h2>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-green-600">2の補数表現とは？</h3>
        <p className="mb-2">2の補数表現は、コンピュータが負の数を表現するために使用する方法です。</p>
        <p className="mb-2">この方法では、正の数と負の数を同じように扱うことができ、計算が簡単になります。</p>
        <p className="mb-4">2の補数を求める手順は以下の通りです：</p>
        <ol className="list-decimal list-inside mb-4">
          <li className="mb-1">数値を2進数で表現する</li>
          <li className="mb-1">全てのビットを反転する（0を1に、1を0に）</li>
          <li className="mb-1">反転したビット列に1を加える</li>
        </ol>
        <p>この方法により、負の数を効率的に表現し、計算することができます。</p>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center text-green-600">2の補数表現を見てみる</h3>
        <p className="text-lg sm:text-xl mb-4 text-center font-semibold">対象の数: <span className="text-xl text-red-500">{number}</span></p>
        
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="flex gap-2">
            <span className="font-semibold">2進数表現:</span>
            <span className="font-mono">{binaryRepresentation}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">反転後:</span>
            <span className="font-mono">{invertedBinary}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">2の補数:</span>
            <span className="font-mono">{twosComplement}</span>
          </div>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg shadow mb-6">
          <p className="text-lg font-semibold">説明：</p>
          <p>{getExplanation()}</p>
        </div>

        <div className="flex justify-center gap-2 sm:gap-4">
          <button
            onClick={nextStep}
            disabled={step >= 3}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-green-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-green-600 disabled:bg-gray-400 transition-colors duration-300"
          >
            次のステップ
          </button>
          <button
            onClick={resetVisualization}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-blue-600 transition-colors duration-300 flex items-center"
          >
            <RefreshCw className="mr-2" />
            リセット
          </button>
        </div>
      </div>
    </div>
  );
};

export default TwosComplementVisualization;