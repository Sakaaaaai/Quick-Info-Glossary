import React, { useState } from 'react';
import { RefreshCw, Eye } from 'lucide-react';

export default function Component() {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [mode, setMode] = useState('normal');
  const [explanation, setExplanation] = useState('VRの基本的な仕組みを体験してみましょう。視点を動かすと、3D空間がどのように見えるか確認できます。');

  const handleRotation = (x, y) => {
    setRotationX(Math.min(45, Math.max(-45, x)));
    setRotationY(Math.min(45, Math.max(-45, y)));
  };

  const resetView = () => {
    setRotationX(0);
    setRotationY(0);
    setMode('normal');
    setExplanation('VRの基本的な仕組みを体験してみましょう。視点を動かすと、3D空間がどのように見えるか確認できます。');
  };

  const toggleMode = () => {
    const newMode = mode === 'normal' ? 'vr' : 'normal';
    setMode(newMode);
    setExplanation(newMode === 'vr' 
      ? 'VRモードでは、左右の目にそれぞれ少し異なる映像が映し出され、立体的に見えます。'
      : '通常モードでは、単一の視点から空間を見ています。');
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">VR</h2>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">VRとは？</h3>
        <p className="mb-2 text-sm sm:text-base">VR（Virtual Reality：仮想現実）は、コンピュータが作り出した3D空間を体験する技術です。</p>
        <p className="mb-2 text-sm sm:text-base">主な特徴：</p>
        <ul className="list-disc list-inside mb-4 text-sm sm:text-base">
          <li className="mb-1">両眼視差（左右の目に少し異なる映像を表示）</li>
          <li className="mb-1">頭の動きに連動した視点の変更</li>
          <li className="mb-1">360度の視野</li>
          <li className="mb-1">3D空間での没入感</li>
        </ul>
      </div>

      <div className="relative h-64 sm:h-96 mb-6 bg-gray-900 rounded-lg overflow-hidden">
        <div 
          className="w-full h-full transition-transform duration-300 perspective-1000"
          style={{
            transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`
          }}
        >
          {mode === 'normal' ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-blue-500 opacity-75 transform-gpu rotate-45" />
              <div className="absolute w-24 h-24 sm:w-32 sm:h-32 bg-red-500 opacity-75 transform-gpu -rotate-45" />
              <div className="absolute w-24 h-24 sm:w-32 sm:h-32 bg-green-500 opacity-75" />
            </div>
          ) : (
            <div className="flex">
              <div className="w-1/2 border-r border-white">
                <div className="absolute left-1/4 transform -translate-x-1/2 inset-y-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 bg-blue-500 opacity-75 transform-gpu rotate-45" />
                  <div className="absolute w-16 h-16 sm:w-24 sm:h-24 bg-red-500 opacity-75 transform-gpu -rotate-45" />
                  <div className="absolute w-16 h-16 sm:w-24 sm:h-24 bg-green-500 opacity-75" />
                </div>
              </div>
              <div className="w-1/2">
                <div className="absolute left-3/4 transform -translate-x-1/2 inset-y-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 bg-blue-500 opacity-75 transform-gpu rotate-45" />
                  <div className="absolute w-16 h-16 sm:w-24 sm:h-24 bg-red-500 opacity-75 transform-gpu -rotate-45" />
                  <div className="absolute w-16 h-16 sm:w-24 sm:h-24 bg-green-500 opacity-75" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg shadow mb-6">
        <p className="text-base sm:text-lg font-semibold">説明：</p>
        <p className="text-sm sm:text-base">{explanation}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div 
          className="bg-gray-100 p-4 rounded-lg cursor-pointer"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientY - rect.top) / rect.height - 0.5) * 90;
            const y = ((e.clientX - rect.left) / rect.width - 0.5) * 90;
            handleRotation(x, y);
          }}
        >
          <p className="text-center mb-2 text-sm sm:text-base">ここにマウスを動かして視点を変更</p>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={resetView}
              className="w-full sm:w-auto px-4 py-2 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center justify-center"
            >
              <RefreshCw className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              リセット
            </button>
            <button
              onClick={toggleMode}
              className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
            >
              <Eye className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              モード切替
            </button>
          </div>
        </div>
      </div>

      <div className="bg-indigo-100 p-4 rounded-lg shadow">
        <h4 className="text-base sm:text-lg font-bold mb-2">操作方法：</h4>
        <ol className="list-decimal list-inside text-sm sm:text-base">
          <li className="mb-1">左のグレーのエリアでマウスを動かして視点を変更</li>
          <li className="mb-1">「モード切替」ボタンでVR表示と通常表示を切り替え</li>
          <li className="mb-1">「リセット」ボタンで初期状態に戻す</li>
        </ol>
      </div>
    </div>
  );
}