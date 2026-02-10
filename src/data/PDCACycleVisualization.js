import React, { useState } from 'react';
import { RefreshCw, ClipboardList, Play, BarChart2, Settings } from 'lucide-react';

const PDCACycleVisualization = () => {
  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([0]); // 初期状態でPを緑にする

  const resetVisualization = () => {
    setStep(0);
    setCompletedSteps([0]); // リセット時もPを緑にする
  };

  const nextStep = () => {
    if (step < 3) { // 最後のステップまで進む
      setStep(step + 1);
      setCompletedSteps((prev) => [...prev, step + 1]); // 次のステップを追加
    } else {
      resetVisualization(); // 最後のステップの後はリセット
    }
  };

  const getStepInfo = () => {
    switch (step) {
      case 0:
        return {
          title: 'Plan（計画）',
          description: '目標を設定し、それを達成するための計画を立てます。',
          icon: <ClipboardList className="w-12 h-12 text-blue-500" />,
          color: 'bg-blue-100'
        };
      case 1:
        return {
          title: 'Do（実行）',
          description: '計画に基づいて実際に行動します。',
          icon: <Play className="w-12 h-12 text-green-500" />,
          color: 'bg-green-100'
        };
      case 2:
        return {
          title: 'Check（評価）',
          description: '実行した結果を評価し、計画との差異を確認します。',
          icon: <BarChart2 className="w-12 h-12 text-yellow-500" />,
          color: 'bg-yellow-100'
        };
      case 3:
        return {
          title: 'Act（改善）',
          description: '評価結果に基づいて、改善策を検討し実施します。',
          icon: <Settings className="w-12 h-12 text-red-500" />,
          color: 'bg-red-100'
        };
      default:
        return null; // ここでは何も返さない
    }
  };

  const { title, description, icon, color } = getStepInfo();

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-blue-700">PDCAサイクル</h2>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-blue-600">PDCAサイクルとは？</h3>
        <p className="mb-2">PDCAサイクルは、業務改善や問題解決のための循環的なアプローチです。</p>
        <p className="mb-2">Plan（計画）、Do（実行）、Check（評価）、Act（改善）の4つのステップを繰り返すことで、継続的な改善を図ります。</p>
        <p className="mb-4">各ステップの概要：</p>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-1">Plan: 目標設定と計画立案</li>
          <li className="mb-1">Do: 計画の実行</li>
          <li className="mb-1">Check: 結果の評価</li>
          <li className="mb-1">Act: 改善策の実施</li>
        </ul>
        <p>このサイクルを繰り返すことで、プロセスや成果の継続的な向上が期待できます。</p>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center text-blue-600">PDCAサイクルを見てみる</h3>
        
        <div className="flex justify-center mb-6">
          <div className={`w-48 h-48 rounded-full ${color} flex items-center justify-center`}>
            {icon}
          </div>
        </div>

        <h4 className="text-lg sm:text-xl mb-2 text-center font-semibold">{title}</h4>
        {description && <p className="text-center mb-4">{description}</p>} {/* descriptionが存在する場合のみ表示 */}

        <div className="flex justify-center gap-2 mb-6">
          {['P', 'D', 'C', 'A'].map((letter, index) => (
            <div
              key={letter}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                completedSteps.includes(index) ? 'bg-green-500 text-white' : 'bg-gray-200'
              }`}
            >
              {letter}
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={nextStep}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-blue-600 transition-colors duration-300 flex items-center"
          >
            {step < 3 ? '次のステップ' : 'リセット'}
            <RefreshCw className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDCACycleVisualization;
