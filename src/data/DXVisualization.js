import React, { useState } from 'react';
import { ArrowRight, RefreshCw, Building2, Cloud, Settings, Network } from 'lucide-react';

const DXVisualization = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const stages = [
    {
      title: "従来のビジネス",
      description: "紙ベースのプロセスと従来型のビジネスモデル",
      details: [
        "紙の書類や手作業による処理",
        "対面でのコミュニケーション中心",
        "物理的な保管と管理",
        "従来型の営業活動"
      ],
      icon: Building2,
      color: "bg-gray-500"
    },
    {
      title: "デジタイゼーション",
      description: "アナログデータのデジタル化",
      details: [
        "書類のPDF化",
        "データのデジタル入力",
        "基本的なデジタルツールの導入",
        "社内システムの構築"
      ],
      icon: Cloud,
      color: "bg-blue-500"
    },
    {
      title: "デジタライゼーション",
      description: "ビジネスプロセスのデジタル化",
      details: [
        "業務プロセスの自動化",
        "データ分析の活用",
        "クラウドサービスの導入",
        "オンラインコミュニケーション"
      ],
      icon: Settings,
      color: "bg-purple-500"
    },
    {
      title: "デジタルトランスフォーメーション",
      description: "ビジネスモデルの革新",
      details: [
        "データ駆動型の意思決定",
        "新規デジタルサービスの創出",
        "顧客体験の革新",
        "アジャイルな組織文化"
      ],
      icon: Network,
      color: "bg-green-500"
    }
  ];

  const nextStage = () => {
    if (currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1);
      setShowDetails(false);
    }
  };

  const resetStages = () => {
    setCurrentStage(0);
    setShowDetails(false);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        デジタルトランスフォーメーション
      </h2>

      {/* DXの説明セクション */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-bold mb-4 text-indigo-600">
          デジタルトランスフォーメーション（DX）とは
        </h3>
        <div className="space-y-4">
          <p className="text-gray-700">
            デジタルトランスフォーメーション（DX）は、企業がデジタル技術を活用して、
            ビジネスモデルを根本的に変革し、競争力を強化する取り組みです。
          </p>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="font-bold text-lg mb-2 text-indigo-700">DXの主な目的</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>ビジネスプロセスの効率化</li>
              <li>顧客体験の向上</li>
              <li>新しい価値の創造</li>
              <li>競争力の強化</li>
            </ul>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-bold text-lg mb-2 text-purple-700">DX推進のポイント</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>経営戦略との整合性</li>
              <li>組織文化の変革</li>
              <li>デジタル技術の効果的活用</li>
              <li>継続的な改善とイノベーション</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <div
                key={index}
                className={`relative flex-1 ${index !== stages.length - 1 ? 'mr-4' : ''}`}
              >
                <div
                  className={`
                    w-16 h-16 mx-auto rounded-full flex items-center justify-center
                    ${index <= currentStage ? stage.color : 'bg-gray-200'}
                    transition-all duration-500
                    ${index === currentStage ? 'transform scale-125 ring-4 ring-blue-200' : ''}
                  `}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                {index < stages.length - 1 && (
                  <ArrowRight 
                    className={`absolute top-1/2 -translate-y-1/2 right-0 transform translate-x-1/2
                    ${index < currentStage ? 'text-indigo-500' : 'text-gray-300'}`} 
                  />
                )}
                <p className={`text-center mt-2 font-semibold ${
                  index === currentStage ? 'text-indigo-700' : 'text-gray-500'
                }`}>
                  {stage.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-2xl font-bold mb-3 text-indigo-600">
          {stages[currentStage].title}
        </h3>
        <p className="text-lg mb-4">{stages[currentStage].description}</p>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-indigo-600 hover:text-indigo-700 font-semibold mb-4"
        >
          {showDetails ? "詳細を隠す" : "詳細を表示"}
        </button>
        {showDetails && (
          <ul className="list-disc list-inside space-y-2">
            {stages[currentStage].details.map((detail, index) => (
              <li key={index} className="text-gray-700">{detail}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={nextStage}
          disabled={currentStage === stages.length - 1}
          className="px-6 py-3 bg-indigo-500 text-white rounded-full text-lg font-semibold 
                   hover:bg-indigo-600 disabled:bg-gray-400 transition-colors duration-300"
        >
          次の段階へ
        </button>
        <button
          onClick={resetStages}
          className="px-6 py-3 bg-purple-500 text-white rounded-full text-lg font-semibold 
                   hover:bg-purple-600 transition-colors duration-300 flex items-center"
        >
          <RefreshCw className="mr-2" />
          最初から
        </button>
      </div>
    </div>
  );
};

export default DXVisualization;