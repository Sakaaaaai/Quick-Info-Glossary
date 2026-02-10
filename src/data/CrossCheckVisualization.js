import React, { useState } from 'react';
import { CheckCircle2, RefreshCw, AlertTriangle, FileCheck, User, Users } from 'lucide-react';

const CrossCheckVisualization = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [, setCheckStatus] = useState({
    person1: null,
    person2: null
  });

  const steps = [
    {
      title: "手順1: データの確認",
      description: "最初の担当者がデータを入力し、内容を確認します",
      icon: User,
      color: "text-blue-600"
    },
    {
      title: "手順2: 別担当者による確認",
      description: "別の担当者が同じデータを独立して確認します",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "手順3: 結果の照合",
      description: "2名の確認結果を照合し、違いがないか確認します",
      icon: FileCheck,
      color: "text-purple-600"
    }
  ];

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % steps.length);
    setCheckStatus({ person1: null, person2: null });
  };

  const resetDemo = () => {
    setActiveStep(0);
    setCheckStatus({ person1: null, person2: null });
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">
        クロスチェックの仕組み
      </h2>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-indigo-600">クロスチェックとは？</h3>
        <p className="mb-4">
          複数の担当者が独立して同じ内容を確認し、ミスを防ぐ確認手法です。重要な書類やデータの正確性を高めるために広く使用されています。
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-6">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className={`flex flex-col items-center ${index === activeStep ? 'transform scale-110' : 'opacity-50'}`}>
                <step.icon size={40} className={step.color} />
                <p className="text-sm mt-2 font-semibold text-center">{step.title}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block w-8 h-0.5 bg-gray-300" />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="text-center mb-6">
          <h4 className="text-xl font-bold mb-2">{steps[activeStep].title}</h4>
          <p>{steps[activeStep].description}</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <button
            onClick={nextStep}
            className="flex justify-center items-center px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300 w-full md:w-auto"
          >
            次のステップ
          </button>
          <div className="flex-grow" />
          <button
            onClick={resetDemo}
            className="flex justify-center items-center px-6 py-3 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition-colors duration-300 w-full md:w-auto"
          >
            <RefreshCw className="mr-2" />
            最初から
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h4 className="text-lg font-bold mb-3 text-indigo-600">クロスチェックが重要な場面</h4>
          <ul className="space-y-2">
            <li className="flex items-center">
              <CheckCircle2 className="text-green-500 mr-2" size={20} />
              財務データの確認
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="text-green-500 mr-2" size={20} />
              契約書の内容確認
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="text-green-500 mr-2" size={20} />
              システム設定の変更
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="text-green-500 mr-2" size={20} />
              重要な文書の作成
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h4 className="text-lg font-bold mb-3 text-indigo-600">確認のポイント</h4>
          <ul className="space-y-2">
            <li className="flex items-center">
              <AlertTriangle className="text-yellow-500 mr-2" size={20} />
              独立して確認を行う
            </li>
            <li className="flex items-center">
              <AlertTriangle className="text-yellow-500 mr-2" size={20} />
              確認結果を記録する
            </li>
            <li className="flex items-center">
              <AlertTriangle className="text-yellow-500 mr-2" size={20} />
              確認後に内容を共有する
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CrossCheckVisualization;
