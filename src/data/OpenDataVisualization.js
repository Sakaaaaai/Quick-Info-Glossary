import React, { useState } from 'react';
import { ChevronRight, RefreshCw, Globe, Database, Share2, FileText, BarChart2, Search } from 'lucide-react';

const OpenDataVisualization = () => {
  const [step, setStep] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const openDataPrinciples = [
    {
      title: "完全性",
      description: "すべての公共データが利用可能",
      icon: <Database className="w-5 h-5 sm:w-6 sm:h-6" />,
      example: "個人情報を除く、すべての公共データ"
    },
    {
      title: "一次情報",
      description: "データは収集元から直接提供",
      icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6" />,
      example: "加工されていない原データ"
    },
    {
      title: "適時性",
      description: "できるだけ早く公開",
      icon: <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />,
      example: "リアルタイムデータの提供"
    }
  ];

  const dataCategories = [
    {
      id: "government",
      title: "行政データ",
      examples: ["人口統計", "予算データ", "公共施設情報"],
      icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
    },
    {
      id: "environment",
      title: "環境データ",
      examples: ["気象データ", "大気質データ", "生物多様性データ"],
      icon: <BarChart2 className="w-5 h-5 sm:w-6 sm:h-6" />
    },
    {
      id: "transportation",
      title: "交通データ",
      examples: ["公共交通機関の運行情報", "交通量データ", "道路工事情報"],
      icon: <Search className="w-5 h-5 sm:w-6 sm:h-6" />
    }
  ];

  const steps = [
    {
      title: "従来のデータ公開",
      description: "データは限定的で、特定の目的のみに使用されていました。",
      details: {
        characteristics: ["紙ベースの記録", "限定的なアクセス", "固定的な利用目的"],
        challenges: ["データの再利用が困難", "更新頻度が低い", "形式が統一されていない"],
        benefits: ["管理が比較的容易", "セキュリティ管理が明確", "利用者が限定的"]
      }
    },
    {
      title: "デジタル化とウェブ公開",
      description: "インターネットの普及により、デジタル形式でのデータ公開が始まりました。",
      details: {
        characteristics: ["PDFやエクセル形式での公開", "ウェブサイトでの閲覧", "ダウンロード可能"],
        challenges: ["データ形式の標準化", "更新の手間", "システム構築コスト"],
        benefits: ["より広い利用者層", "検索可能性の向上", "保存と共有が容易"]
      }
    },
    {
      title: "オープンデータ",
      description: "誰でも自由に利用・再配布できる形式でデータを公開しています。",
      details: {
        characteristics: ["機械判読可能な形式", "APIでのアクセス", "標準化されたフォーマット"],
        challenges: ["品質管理", "プライバシー保護", "持続可能な運用"],
        benefits: ["イノベーションの促進", "透明性の向上", "社会課題の解決"]
      }
    }
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
    }
  };

  const resetVisualization = () => {
    setStep(0);
    setShowIntro(true);
    setSelectedCategory(null);
  };

  if (showIntro) {
    return (
      <div className="p-3 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-indigo-700">
          オープンデータとは？
        </h2>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4 sm:mb-6">
          <p className="text-base sm:text-lg mb-4 sm:mb-6">
            オープンデータとは、誰でも自由に利用、再利用、再配布できるデータのことです。
            特に行政機関や研究機関が保有するデータを公開することで、透明性の向上や新たな価値の創造を目指しています。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {openDataPrinciples.map((principle, index) => (
              <div key={index} className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="bg-indigo-100 p-2 rounded-full mr-2">
                    {principle.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-indigo-600">{principle.title}</h3>
                </div>
                <p className="mb-2 text-sm sm:text-base">{principle.description}</p>
                <p className="text-xs sm:text-sm text-gray-600">{principle.example}</p>
              </div>
            ))}
          </div>

          <div className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-indigo-600 mb-3 sm:mb-4">主なデータカテゴリー</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {dataCategories.map((category) => (
                <div
                  key={category.id}
                  className={`p-3 sm:p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-indigo-100 transform scale-105'
                      : 'bg-gray-50 hover:bg-indigo-50'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="flex items-center mb-2">
                    <div className="bg-white p-2 rounded-full mr-2">
                      {category.icon}
                    </div>
                    <h4 className="font-bold text-sm sm:text-base">{category.title}</h4>
                  </div>
                  {selectedCategory === category.id && (
                    <ul className="list-disc list-inside text-xs sm:text-sm">
                      {category.examples.map((example, index) => (
                        <li key={index}>{example}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
            <h4 className="text-base sm:text-lg font-bold mb-2">オープンデータの活用例：</h4>
            <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>防災：ハザードマップの作成、避難経路の最適化</li>
              <li>観光：観光スポット情報の統合、来訪者分析</li>
              <li>都市計画：人口動態分析、施設配置の最適化</li>
              <li>ビジネス：市場分析、新規サービスの開発</li>
            </ul>
          </div>

          <button
            onClick={() => setShowIntro(false)}
            className="w-full px-3 sm:px-4 py-2 bg-indigo-500 text-white rounded-full font-semibold hover:bg-indigo-600 transition-colors duration-300 flex items-center justify-center text-sm sm:text-base"
          >
            オープンデータの進化を見る
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-indigo-700">
        オープンデータの進化
      </h2>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4 sm:mb-6">
        <div className="flex items-center mb-3 sm:mb-4">
          <div className="bg-indigo-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
            <Database className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-indigo-600">
            {steps[step].title}
          </h3>
        </div>
        
        <p className="text-base sm:text-lg mb-4 sm:mb-6">
          {steps[step].description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-sm sm:text-base">特徴</h4>
            <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
              {steps[step].details.characteristics.map((char, index) => (
                <li key={index}>• {char}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-sm sm:text-base">課題</h4>
            <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
              {steps[step].details.challenges.map((challenge, index) => (
                <li key={index}>• {challenge}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-sm sm:text-base">メリット</h4>
            <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
              {steps[step].details.benefits.map((benefit, index) => (
                <li key={index}>• {benefit}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <div className="text-xs sm:text-sm text-gray-500">
            ステップ {step + 1} / {steps.length}
          </div>
          <div className="flex gap-2 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={resetVisualization}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gray-500 text-white rounded-full font-semibold hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center text-sm sm:text-base"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              最初から
            </button>
            <button
              onClick={nextStep}
              disabled={step === steps.length - 1}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-indigo-500 text-white rounded-full font-semibold hover:bg-indigo-600 disabled:bg-gray-400 transition-colors duration-300 flex items-center justify-center text-sm sm:text-base"
            >
              次のステップ
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenDataVisualization;