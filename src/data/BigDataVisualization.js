import React, { useState } from 'react';
import { ChevronRight, Database, RefreshCw, Server, Cloud } from 'lucide-react';

const BigDataVisualization = () => {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const bigDataCharacteristics = [
    {
      title: "Volume（量）",
      description: "膨大なデータ量",
      icon: <Database className="w-5 h-5 sm:w-6 sm:h-6" />,
      example: "例：SNSの投稿、IoTセンサーデータ、取引記録など"
    },
    {
      title: "Velocity（速度）",
      description: "高速なデータ生成と処理",
      icon: <Server className="w-5 h-5 sm:w-6 sm:h-6" />,
      example: "例：リアルタイムの取引データ、センサー readings、ログデータ"
    },
    {
      title: "Variety（多様性）",
      description: "様々な種類のデータ",
      icon: <Cloud className="w-5 h-5 sm:w-6 sm:h-6" />,
      example: "例：テキスト、画像、動画、音声、センサーデータなど"
    }
  ];

  const steps = [
    {
      title: "従来のデータ処理",
      description: "従来のデータ処理では、構造化されたデータを定期的に処理する形が一般的でした。",
      dataPoints: 10,
      color: "bg-blue-400",
      details: {
        scale: "〜数GB",
        tools: "RDBMSやExcel",
        challenges: "データの正確性と一貫性の維持",
        examples: ["顧客データベース", "在庫管理", "会計データ"]
      }
    },
    {
      title: "大規模データ処理",
      description: "データ量の増加に伴い、分散処理や並列処理が必要になってきました。",
      dataPoints: 50,
      color: "bg-green-400",
      details: {
        scale: "〜数TB",
        tools: "分散データベース、データウェアハウス",
        challenges: "処理の効率化とスケーラビリティ",
        examples: ["Eコマースの取引データ", "ログ分析", "顧客行動分析"]
      }
    },
    {
      title: "ビッグデータ時代",
      description: "現代では、非構造化データを含む膨大なデータをリアルタイムで処理する必要があります。",
      dataPoints: 200,
      color: "bg-purple-400",
      details: {
        scale: "PB以上",
        tools: "Hadoop, Spark, NoSQL",
        challenges: "リアルタイム処理と意思決定",
        examples: ["SNSデータ分析", "IoTセンサー解析", "AI/ML学習データ"]
      }
    }
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setIsAnimating(true);
      setStep(prev => prev + 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const resetVisualization = () => {
    setStep(0);
    setShowIntro(true);
    setIsAnimating(false);
  };

  const renderDataPoints = (count, color) => {
    return Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${color} transform transition-all duration-300 ${
          isAnimating ? 'scale-110' : 'scale-100'
        }`}
        style={{
          animation: `fadeIn 0.5s ease-out ${index * 0.01}s`,
          opacity: isAnimating ? 0.7 : 1
        }}
      />
    ));
  };

  if (showIntro) {
    return (
      <div className="p-3 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-indigo-700">
          ビッグデータとは？
        </h2>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4 sm:mb-6">
          <p className="text-base sm:text-lg mb-4 sm:mb-6">
            ビッグデータとは、従来のデータ処理アプリケーションでは処理が困難な大量のデータのことを指します。
            単にデータ量が多いだけでなく、以下の「3V」と呼ばれる特徴を持っています：
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {bigDataCharacteristics.map((char, index) => (
              <div key={index} className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="bg-indigo-100 p-2 rounded-full mr-2">
                    {char.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-indigo-600">{char.title}</h3>
                </div>
                <p className="text-sm sm:text-base mb-2">{char.description}</p>
                <p className="text-xs sm:text-sm text-gray-600">{char.example}</p>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
            <h4 className="text-base sm:text-lg font-bold mb-2">ビッグデータの活用例：</h4>
            <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>ビジネス：顧客行動分析、市場予測、リスク管理</li>
              <li>医療：診断支援、治療効果の分析、疫学研究</li>
              <li>交通：渋滞予測、経路最適化、需要予測</li>
              <li>防災：気象予測、災害リスク評価</li>
            </ul>
          </div>

          <button
            onClick={() => setShowIntro(false)}
            className="w-full px-3 sm:px-4 py-2 bg-indigo-500 text-white rounded-full font-semibold hover:bg-indigo-600 transition-colors duration-300 flex items-center justify-center text-sm sm:text-base"
          >
            ビッグデータの進化を見る
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-indigo-700">
        ビッグデータの進化
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-sm sm:text-base">技術的特徴</h4>
            <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>📊 規模: {steps[step].details.scale}</li>
              <li>🛠 主要ツール: {steps[step].details.tools}</li>
              <li>⚠️ 課題: {steps[step].details.challenges}</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-sm sm:text-base">代表的な活用例</h4>
            <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
              {steps[step].details.examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
          <div className="font-semibold mb-2 text-sm sm:text-base">データ量の視覚化：</div>
          <div className="flex flex-wrap gap-0.5 sm:gap-1 transition-all duration-300">
            {renderDataPoints(steps[step].dataPoints, steps[step].color)}
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

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default BigDataVisualization;