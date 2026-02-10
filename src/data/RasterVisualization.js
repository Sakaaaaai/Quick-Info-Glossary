import React, { useState } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

const RasterVisualization = () => {
  const [pixelSize, setPixelSize] = useState(40);
  const [hoveredPixel, setHoveredPixel] = useState(null);
  
  // シンプルな「A」の形をピクセルで表現
  const letterMatrix = [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1]
  ];

  const handleZoomIn = () => {
    if (pixelSize < 60) setPixelSize(pixelSize + 10);
  };

  const handleZoomOut = () => {
    if (pixelSize > 20) setPixelSize(pixelSize - 10);
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">ラスタ形式</h2>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">ラスタ形式とは？</h3>
        <p className="mb-2">ラスタ形式（ビットマップ）は、画像をピクセル（点）の集まりとして表現する方式です。</p>
        <p className="mb-2">各ピクセルには色や明るさの情報が含まれています。</p>
        <p className="mb-2">デジタルカメラで撮影した写真やスキャンした画像は、すべてこの形式で保存されています。</p>
        <p className="mb-4">以下は、文字「A」をピクセルで表現した例です。各マスが1つのピクセルを表しています。</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex justify-center mb-4">
          <div className="border-2 border-gray-300 p-2">
            {letterMatrix.map((row, i) => (
              <div key={i} className="flex">
                {row.map((pixel, j) => (
                  <div
                    key={j}
                    style={{
                      width: pixelSize,
                      height: pixelSize,
                      transition: 'all 0.3s ease'
                    }}
                    className={`
                      ${pixel ? 'bg-blue-500' : 'bg-gray-100'}
                      border border-gray-300
                      hover:ring-2 hover:ring-red-400
                      relative
                    `}
                    onMouseEnter={() => setHoveredPixel({ row: i, col: j, value: pixel })}
                    onMouseLeave={() => setHoveredPixel(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={handleZoomOut}
            className="px-4 py-2 bg-purple-500 text-white rounded-full flex items-center gap-2 hover:bg-purple-600"
          >
            <ZoomOut size={20} />
            縮小
          </button>
          <button
            onClick={handleZoomIn}
            className="px-4 py-2 bg-purple-500 text-white rounded-full flex items-center gap-2 hover:bg-purple-600"
          >
            <ZoomIn size={20} />
            拡大
          </button>
        </div>

        {hoveredPixel && (
          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="font-semibold">ピクセル情報：</p>
            <p>位置: ({hoveredPixel.row + 1}, {hoveredPixel.col + 1})</p>
            <p>値: {hoveredPixel.value ? '1 (colored)' : '0 (blank)'}</p>
          </div>
        )}
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h4 className="text-lg font-bold mb-2">ラスタ形式の特徴：</h4>
        <ul className="list-disc list-inside space-y-2">
          <li>解像度（ピクセル数）が画質を決定</li>
          <li>拡大すると画質が粗くなる（ピクセルが見えてくる）</li>
          <li>写真のような複雑な画像の表現に適している</li>
          <li>データ容量は解像度に比例して大きくなる</li>
        </ul>
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg shadow mb-6">
        <p className="text-lg font-semibold mb-2">使い方：</p>
        <ul className="list-disc list-inside space-y-1">
          <li>各ピクセルにマウスを乗せると、その位置と値が表示されます</li>
          <li>拡大・縮小ボタンで、ピクセルのサイズを変更できます</li>
          <li>実際のラスタ画像では、各ピクセルにRGB値やアルファ値も含まれます</li>
        </ul>
      </div>
    </div>
  );
};

export default RasterVisualization;