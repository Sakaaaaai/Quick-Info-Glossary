import React, { useState } from 'react';
import { Smartphone, Laptop, Watch, Home, Car, ShoppingBag, Cloud, ArrowRight } from 'lucide-react';

const UbiquitousComputingVisualization = () => {
  const [activeScenario, setActiveScenario] = useState(0);
  
  const scenarios = [
    {
      title: "朝の準備",
      description: "スマートホームシステムが自動で照明を調整し、天気に応じてエアコンの温度を設定。スマートウォッチが健康データを記録します。",
      icons: [Home, Watch],
      bgColor: "from-blue-100 to-purple-100"
    },
    {
      title: "通勤時",
      description: "スマートカーのナビゲーションが最適なルートを提案。車載システムがスマートフォンと連携して音楽を再生します。",
      icons: [Car, Smartphone],
      bgColor: "from-blue-100 to-purple-100"
    },
    {
      title: "仕事中",
      description: "ノートPCがクラウドと同期してデータを共有。スマートウォッチが座りすぎを通知します。",
      icons: [Laptop, Cloud],
      bgColor: "from-blue-100 to-purple-100"
    },
    {
      title: "買い物",
      description: "スマートフォンが店舗のビーコンと連携してお得な情報を表示。決済もスマートウォッチで完了します。",
      icons: [ShoppingBag, Watch],
      bgColor: "from-blue-100 to-purple-100"
    }
  ];

  const nextScenario = () => {
    setActiveScenario((prev) => (prev + 1) % scenarios.length);
  };

  const DeviceIcon = ({ Icon }) => (
    <div className="bg-white p-4 rounded-full shadow-lg">
      <Icon size={32} className="text-indigo-600" />
    </div>
  );

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">ユビキタスコンピューティング</h2>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">ユビキタスコンピューティングとは？</h3>
        <p className="mb-2">
          「いつでも、どこでも、あらゆるもの」がコンピュータとつながる世界を指します。
          私たちの生活のあらゆる場面でコンピュータが自然に存在し、支援してくれる環境です。
        </p>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center text-indigo-600">ユビキタスコンピューティングを見てみる</h3>

      <div className={`bg-gradient-to-r ${scenarios[activeScenario].bgColor} p-8 rounded-xl shadow-lg mb-6 transition-all duration-500`}>
        <h3 className="text-2xl font-bold mb-4 text-center">
          {scenarios[activeScenario].title}
        </h3>

        <div className="flex justify-center items-center gap-8 mb-6">
          {scenarios[activeScenario].icons.map((Icon, index) => (
            <React.Fragment key={index}>
              <DeviceIcon Icon={Icon} />
              {index < scenarios[activeScenario].icons.length - 1 && (
                <ArrowRight className="text-indigo-600" />
              )}
            </React.Fragment>
          ))}
        </div>

        <p className="text-lg text-center mb-6">
          {scenarios[activeScenario].description}
        </p>

        <div className="flex justify-center">
          <button
            onClick={nextScenario}
            className="px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors duration-300"
          >
            次のシーン
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h4 className="text-lg font-bold mb-3 text-indigo-600">特徴</h4>
          <ul className="list-disc list-inside space-y-2">
            <li>シームレスな連携</li>
            <li>状況に応じた最適化</li>
            <li>自然なインターフェース</li>
            <li>プライバシーの保護</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h4 className="text-lg font-bold mb-3 text-indigo-600">メリット</h4>
          <ul className="list-disc list-inside space-y-2">
            <li>生活の質の向上</li>
            <li>効率的な情報管理</li>
            <li>エネルギーの最適化</li>
            <li>新しいサービスの創出</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UbiquitousComputingVisualization;
