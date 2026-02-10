import React, { useState } from 'react';
import { Code, Terminal, Play, Book, Settings, PenTool } from 'lucide-react';

const IDE = () => {
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    { name: 'コードエディタ', icon: Code, description: 'プログラムを記述するための高機能なテキストエディタです。シンタックスハイライトや自動補完機能があり、効率的にコーディングできます。' },
    { name: 'ターミナル', icon: Terminal, description: 'コマンドを入力して、プログラムの実行やファイル操作が行えます。プログラミング作業を支える重要なツールです。' },
    { name: 'コンパイラ/実行環境', icon: Play, description: '記述したコードを機械が理解できる形式に変換し、実行します。ボタン一つで動作を確認できるので便利です。' },
    { name: 'ドキュメント', icon: Book, description: 'プログラミング言語やライブラリの使用方法が詳しく記載されています。困ったときに参照できる情報源です。' },
    { name: '設定とカスタマイズ', icon: Settings, description: 'IDEの見た目や動作をカスタマイズできます。作業環境を自分の好みに合わせることが可能です。' },
    { name: 'デバッガ', icon: PenTool, description: 'プログラムの動作を詳細に確認できるツールで、エラーの原因を特定する際に役立ちます。' },
  ];

  return (
    <div className="p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-indigo-700">統合開発環境（IDE）</h2>
      
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold mb-2 text-indigo-600">IDEとは？</h3>
        <p className="mb-2">統合開発環境（IDE）は、プログラミングを行う際に使用する<span className="font-semibold">オールインワンツール</span>です。</p>
        <p className="mb-2">エディタ、コンパイラ、デバッガなど、開発に必要な機能が1つにまとめられています。</p>
        <p className="mb-4">IDEを活用すると、プログラム開発が効率的になります。</p>
      </div>

      <h3 className="text-2xl font-bold mb-4 text-center text-indigo-600">IDEの主な機能</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow cursor-pointer transition-all duration-300 ${
              activeFeature === index ? 'bg-blue-200 transform scale-105' : 'bg-white hover:bg-blue-100'
            }`}
            onClick={() => setActiveFeature(index)}
          >
            <feature.icon className="w-8 h-8 mb-2 text-indigo-600" />
            <h4 className="font-bold text-lg mb-1">{feature.name}</h4>
          </div>
        ))}
      </div>

      {activeFeature !== null && (
        <div className="bg-yellow-100 p-4 rounded-lg shadow mb-6 transition-all duration-300">
          <h4 className="text-lg font-semibold mb-2">{features[activeFeature].name}の説明：</h4>
          <p>{features[activeFeature].description}</p>
        </div>
      )}

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold mb-2 text-indigo-600">IDEを使う利点</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>コードを書く速度が向上する</li>
          <li>エラーの特定が容易になる</li>
          <li>学習が効率的になる</li>
          <li>大規模なプロジェクトを簡単に管理できる</li>
        </ul>
      </div>
    </div>
  );
};

export default IDE;
