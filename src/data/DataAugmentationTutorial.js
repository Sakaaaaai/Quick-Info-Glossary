import React, { useState } from 'react';
import { RefreshCw, FlipHorizontal, FlipVertical, ChevronDown, ChevronUp } from 'lucide-react';

const DataAugmentationTutorial = () => {
  const [rotation, setRotation] = useState(0);
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [noise, setNoise] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [openSection, setOpenSection] = useState('what');

  const resetTransforms = () => {
    setRotation(0);
    setFlipX(false);
    setFlipY(false);
    setBrightness(100);
    setNoise(0);
    setZoom(100);
  };

  const generateNoisePattern = () => {
    const noiseLevel = noise / 100;
    const pattern = [];
    for (let i = 0; i < 1000; i++) {
      pattern.push(
        <circle
          key={i}
          cx={Math.random() * 200}
          cy={Math.random() * 200}
          r={Math.random() * 2}
          fill="black"
          opacity={noiseLevel}
        />
      );
    }
    return pattern;
  };

  const Section = ({ id, title, children }) => (
    <div className="mb-4">
      <button
        onClick={() => setOpenSection(openSection === id ? '' : id)}
        className="w-full flex items-center justify-between p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
      >
        <h3 className="text-lg font-semibold text-indigo-700">{title}</h3>
        {openSection === id ? <ChevronUp /> : <ChevronDown />}
      </button>
      {openSection === id && (
        <div className="p-4 bg-white rounded-b-lg shadow-inner">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">データオーグメンテーション</h2>

      <Section 
        id="what" 
        title="データオーグメンテーションとは？"
      >
        <p className="mb-4">
          データオーグメンテーションは、既存のデータに意図的な変更を加えることで、
          機械学習モデルの学習データを人工的に増やす技術です。
        </p>
        <div className="bg-yellow-50 p-4 rounded-lg mb-4">
          <h4 className="font-bold text-yellow-800 mb-2">なぜ必要？</h4>
          <ul className="list-disc list-inside space-y-2 text-yellow-900">
            <li>学習データが少ない場合でもモデルの性能を向上させる</li>
            <li>過学習（オーバーフィッティング）を防ぐ</li>
            <li>モデルの汎化性能を高める</li>
            <li>実世界でのデータの変動に対する頑健性を向上</li>
          </ul>
        </div>
      </Section>

      <Section 
        id="techniques" 
        title="主な技術と使用場面"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold text-blue-800 mb-2">画像回転</h4>
            <p className="text-blue-900">
              物体の向きが変わっても認識できるようにするため。
              道路標識の認識などで重要です。
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-bold text-green-800 mb-2">反転</h4>
            <p className="text-green-900">
              左右や上下が反転しても認識できるようにするため。
              自然物の認識などで使用されます。
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-bold text-purple-800 mb-2">明るさ調整</h4>
            <p className="text-purple-900">
              異なる照明条件下でも認識できるようにするため。
              屋外での物体検出などで重要です。
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-bold text-red-800 mb-2">ノイズ追加</h4>
            <p className="text-red-900">
              画像の品質が悪い場合でも認識できるようにするため。
              監視カメラの映像分析などで使用されます。
            </p>
          </div>
        </div>
      </Section>

      <Section 
        id="demo" 
        title="インタラクティブデモ"
      >
        <p className="mb-4">
          以下のデモで、各種データオーグメンテーション技術の効果を確認できます。
          スライダーやボタンを操作して、画像がどのように変化するか観察してみましょう。
        </p>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-1">
            <div className="bg-white p-4 rounded-lg shadow relative overflow-hidden">
              <svg 
                width="200" 
                height="200" 
                viewBox="0 0 200 200"
                className="mx-auto"
                style={{
                  transform: `
                    rotate(${rotation}deg)
                    scaleX(${flipX ? -1 : 1})
                    scaleY(${flipY ? -1 : 1})
                    scale(${zoom / 100})
                  `,
                  filter: `brightness(${brightness}%)`,
                  transition: 'all 0.3s ease'
                }}
              >
                {/* 簡単な家の絵 */}
                <rect x="60" y="100" width="80" height="60" fill="#8B4513"/>
                <polygon points="50,100 150,100 100,50" fill="#A52A2A"/>
                <rect x="85" y="120" width="30" height="40" fill="#4169E1"/>
                <circle cx="100" cy="140" r="3" fill="#FFD700"/>
                {noise > 0 && generateNoisePattern()}
              </svg>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="text-lg font-bold mb-4">変形パラメータ</h4>
              
              <div className="mb-4">
                <label className="flex justify-between text-sm font-medium mb-2">
                  <span>回転</span>
                  <span className="text-indigo-600">{rotation}°</span>
                </label>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="mb-4">
                <label className="flex justify-between text-sm font-medium mb-2">
                  <span>明るさ</span>
                  <span className="text-indigo-600">{brightness}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="mb-4">
                <label className="flex justify-between text-sm font-medium mb-2">
                  <span>ノイズ</span>
                  <span className="text-indigo-600">{noise}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={noise}
                  onChange={(e) => setNoise(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="mb-4">
                <label className="flex justify-between text-sm font-medium mb-2">
                  <span>拡大率</span>
                  <span className="text-indigo-600">{zoom}%</span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setFlipX(!flipX)}
                  className={`flex-1 px-3 py-2 rounded-lg font-medium flex items-center justify-center gap-2 ${
                    flipX ? 'bg-blue-500 text-white' : 'bg-gray-100'
                  }`}
                >
                  <FlipHorizontal size={16} />
                  水平反転
                </button>
                <button
                  onClick={() => setFlipY(!flipY)}
                  className={`flex-1 px-3 py-2 rounded-lg font-medium flex items-center justify-center gap-2 ${
                    flipY ? 'bg-blue-500 text-white' : 'bg-gray-100'
                  }`}
                >
                  <FlipVertical size={16} />
                  垂直反転
                </button>
              </div>

              <button
                onClick={resetTransforms}
                className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <RefreshCw size={16} />
                リセット
              </button>
            </div>
          </div>
        </div>
      </Section>

      <Section 
        id="tips" 
        title="実践的なヒント"
      >
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
            <h4 className="font-bold text-green-800 mb-2">適切な使用量</h4>
            <p>データオーグメンテーションは「程よく」行うことが重要です。過度な変形は
              モデルの学習を妨げる可能性があります。</p>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-50 to-red-50 p-4 rounded-lg">
            <h4 className="font-bold text-yellow-800 mb-2">組み合わせ方</h4>
            <p>複数の技術を組み合わせることで、より効果的なデータ拡張が可能です。
              ただし、非現実的な組み合わせは避けましょう。</p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
            <h4 className="font-bold text-purple-800 mb-2">タスクに応じた選択</h4>
            <p>認識タスクの性質に応じて、適切な技術を選択することが重要です。
              例えば、文字認識では過度な回転は避けるべきです。</p>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default DataAugmentationTutorial;