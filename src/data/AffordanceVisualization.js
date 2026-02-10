import React, { useState, useCallback } from 'react';
import {Lightbulb, RefreshCw, DoorOpen, DoorClosed } from 'lucide-react';

const AffordanceVisualization = () => {
  const [activeDoor, setActiveDoor] = useState(false);
  const [activeButton, setActiveButton] = useState(false);
  const [, setActiveSlider] = useState(50);
  const [dragStart, setDragStart] = useState(null);
  const [showTooltip, setShowTooltip] = useState('');

  const handleDoorClick = () => {
    setActiveDoor(!activeDoor);
  };

  const handleButtonMouseDown = () => {
    setActiveButton(true);
  };

  const handleButtonMouseUp = () => {
    setActiveButton(false);
  };

  const handleSliderMouseMove = useCallback((e) => {
    if (dragStart) {
      const diff = e.clientX - dragStart.x;
      const newValue = Math.max(0, Math.min(100, dragStart.value + diff / 2));
      setActiveSlider(newValue);
    }
  }, [dragStart]);

  const handleSliderMouseUp = () => {
    setDragStart(null);
  };

  React.useEffect(() => {
    if (dragStart) {
      window.addEventListener('mousemove', handleSliderMouseMove);
      window.addEventListener('mouseup', handleSliderMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleSliderMouseMove);
        window.removeEventListener('mouseup', handleSliderMouseUp);
      };
    }
  }, [dragStart, handleSliderMouseMove]);

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-indigo-700">アフォーダンス</h2>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold mb-2 text-indigo-600">アフォーダンスとは？</h3>
        <p className="mb-4">アフォーダンスとは、モノの形や状態が「どのような操作ができるか」を直感的に伝える性質のことです。良いデザインは、ユーザーに適切な使い方を自然に伝えることができます。</p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-bold mb-2 flex items-center gap-2">
            <Lightbulb className="text-yellow-500" />
            アフォーダンスの例
          </h4>
          <ul className="list-disc list-inside space-y-2">
            <li>ドアのハンドル → 引く/押すという動作を示唆</li>
            <li>ボタンの立体的なデザイン → 押せることを示唆</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* ドアの例 */}
        <div 
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all"
          onMouseEnter={() => setShowTooltip('door')}
          onMouseLeave={() => setShowTooltip('')}
        >
          <h4 className="text-lg font-bold mb-4 text-center">ドアのアフォーダンス</h4>
          <div className="flex justify-center mb-4">
            <button
              onClick={handleDoorClick}
              className="text-gray-700 hover:text-indigo-600 transition-all transform hover:scale-105"
            >
              {activeDoor ? (
                <DoorOpen size={64} />
              ) : (
                <DoorClosed size={64} />
              )}
            </button>
          </div>
          {showTooltip === 'door' && (
            <p className="text-sm text-gray-600 text-center">
              ドアのアイコンをクリックすると開閉します
            </p>
          )}
        </div>

        {/* ボタンの例 */}
        <div 
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all"
          onMouseEnter={() => setShowTooltip('button')}
          onMouseLeave={() => setShowTooltip('')}
        >
          <h4 className="text-lg font-bold mb-4 text-center">ボタンのアフォーダンス</h4>
          <div className="flex justify-center mb-4">
            <button
              onMouseDown={handleButtonMouseDown}
              onMouseUp={handleButtonMouseUp}
              onMouseLeave={handleButtonMouseUp}
              className={`px-6 py-3 rounded-lg text-white font-bold transition-all transform
                ${activeButton 
                  ? 'bg-indigo-700 scale-95 shadow-inner' 
                  : 'bg-indigo-500 hover:bg-indigo-600 shadow-lg hover:scale-105'
                }`}
            >
              クリックしてください
            </button>
          </div>
          {showTooltip === 'button' && (
            <p className="text-sm text-gray-600 text-center">
              ボタンを押すと凹む効果で押下感を表現
            </p>
          )}
        </div>
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg shadow">
        <h4 className="font-bold mb-2">良いアフォーダンスの特徴：</h4>
        <ul className="list-disc list-inside space-y-2">
          <li>直感的に操作方法が理解できる</li>
          <li>視覚的なフィードバックがある</li>
          <li>操作の結果が予測できる</li>
          <li>誤操作を防ぐ工夫がある</li>
        </ul>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => {
            setActiveDoor(false);
            setActiveButton(false);
            setActiveSlider(50);
          }}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2"
        >
          <RefreshCw size={20} />
          リセット
        </button>
      </div>
    </div>
  );
};

export default AffordanceVisualization;
