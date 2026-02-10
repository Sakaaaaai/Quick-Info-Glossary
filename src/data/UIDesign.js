import React, { useState } from 'react';
import { 
  Layers, 
  MousePointer, 
  Eye, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Layout, 
  Type, 
  PanelTop,
  X,
  CheckCircle // CheckCircleをインポート
} from 'lucide-react';

const UIDesignVisualization = () => {
  const [activeSection, setActiveSection] = useState('basics');
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [selectedDevice, setSelectedDevice] = useState('desktop');

  const themes = {
    light: {
      bg: 'bg-white',
      text: 'text-gray-800',
      primary: 'bg-blue-500',
      secondary: 'bg-gray-200',
      border: 'border-gray-200'
    },
    dark: {
      bg: 'bg-gray-900',
      text: 'text-gray-100',
      primary: 'bg-blue-600',
      secondary: 'bg-gray-700',
      border: 'border-gray-700'
    }
  };

  const devices = {
    desktop: { icon: Monitor, width: 'w-full' },
    tablet: { icon: Tablet, width: 'w-4/5' },
    mobile: { icon: Smartphone, width: 'w-1/2' }
  };

  const UIExample = () => (
    <div className={`${themes[selectedTheme].bg} ${themes[selectedTheme].text} p-4 rounded-lg shadow-lg ${devices[selectedDevice].width} mx-auto transition-all duration-300`}>
      <header className="flex justify-between items-center mb-4 border-b pb-2">
        <h3 className="font-bold">アプリケーション</h3>
        <nav className="space-x-4">
          <button className={`px-3 py-1 rounded ${themes[selectedTheme].secondary}`}>ホーム</button>
          <button className={`px-3 py-1 rounded ${themes[selectedTheme].primary} text-white`}>設定</button>
        </nav>
      </header>
      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded ${themes[selectedTheme].secondary}`}>
            コンテンツエリア 1
          </div>
          <div className={`p-4 rounded ${themes[selectedTheme].secondary}`}>
            コンテンツエリア 2
          </div>
        </div>
      </main>
    </div>
  );

  const sections = {
    basics: {
      title: "UIの基本要素",
      icon: Layers,
      content: [
        { title: "レイアウト", icon: Layout, desc: "情報を整理し、視覚的な階層を作る" },
        { title: "タイポグラフィ", icon: Type, desc: "読みやすく、美しいテキストの表現" },
        { title: "ナビゲーション", icon: MousePointer, desc: "ユーザーの行動を導く要素" }
      ]
    },
    principles: {
      title: "UIデザインの原則",
      icon: Eye,
      content: [
        { title: "シンプルさ", desc: "必要最小限の要素で目的を達成" },
        { title: "一貫性", desc: "統一された体験を提供" },
        { title: "フィードバック", desc: "ユーザーの操作に対する反応" }
      ]
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        UIデザインの世界
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-bold mb-4 text-indigo-600">
          UI (User Interface) とは？
        </h3>
        <p className="mb-4">
          UIとは、ユーザーとコンピュータシステムの接点となる部分です。
          効果的なUIは、ユーザーが直感的に操作でき、目的を達成できるように
          設計されています。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg shadow-lg">
          <h4 className="text-lg font-bold mb-4 flex items-center text-indigo-600">
            <PanelTop className="mr-2" />
            インタラクティブデモ
          </h4>
          
          <div className="space-y-4 mb-6">
            <div>
              <p className="mb-2 font-semibold">テーマ選択:</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedTheme('light')}
                  className={`px-4 py-2 rounded ${selectedTheme === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  ライトテーマ
                </button>
                <button
                  onClick={() => setSelectedTheme('dark')}
                  className={`px-4 py-2 rounded ${selectedTheme === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  ダークテーマ
                </button>
              </div>
            </div>

            <div>
              <p className="mb-2 font-semibold">デバイス選択:</p>
              <div className="flex space-x-4">
                {Object.entries(devices).map(([key, { icon: Icon }]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedDevice(key)}
                    className={`p-2 rounded ${selectedDevice === key ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  >
                    <Icon size={24} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* UIExampleの幅を調整 */}
          <div className="border rounded-lg p-4 bg-white w-full">
            <UIExample />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex space-x-4 mb-6">
          {Object.entries(sections).map(([key, { title, icon: Icon }]) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`px-4 py-2 rounded-lg flex items-center ${
                activeSection === key 
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Icon className="mr-2" size={20} />
              {title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections[activeSection].content.map((item, index) => (
            <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center mb-2">
                {item.icon && <item.icon className="text-indigo-600 mr-2" size={20} />}
                <h5 className="font-semibold">{item.title}</h5>
              </div>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg shadow-lg">
        <h4 className="text-lg font-bold mb-4 text-indigo-600">実践的なUIデザインのヒント</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold mb-2">よくある問題点</h5>
            <ul className="space-y-2">
              <li className="flex items-center">
                <X className="text-red-500 mr-2" size={16} />
                情報が多すぎて混乱する
              </li>
              <li className="flex items-center">
                <X className="text-red-500 mr-2" size={16} />
                操作方法がわかりにくい
              </li>
              <li className="flex items-center">
                <X className="text-red-500 mr-2" size={16} />
                デザインが一貫していない
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">解決策</h5>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="text-green-500 mr-2" size={16} />
                シンプルで直感的なデザインを心がける
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-green-500 mr-2" size={16} />
                ユーザーテストを実施しフィードバックを得る
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-green-500 mr-2" size={16} />
                一貫性のあるカラーパレットとフォントを使用する
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIDesignVisualization;
