import React, { useState } from 'react';
import { 
  Lock,
  Key,
  FileText,
  ShieldCheck,
  Hash,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  UserCheck,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';

const DigitalSignatureVisualization = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedProcess, setSelectedProcess] = useState('creation');
  const [,] = useState(false);

  const steps = [
    {
      title: "文書の準備",
      icon: FileText,
      color: "bg-blue-200",
      description: "署名対象の文書を用意",
      details: [
        "電子文書の作成",
        "文書のフォーマット確認",
        "署名箇所の特定"
      ]
    },
    {
      title: "ハッシュ値の生成",
      icon: Hash,
      color: "bg-green-200",
      description: "文書のハッシュ値を計算",
      details: [
        "SHA-256などのハッシュ関数使用",
        "文書の一意性を確保",
        "改ざん検知の基準となる値を生成"
      ]
    },
    {
      title: "秘密鍵による暗号化",
      icon: Key,
      color: "bg-purple-200",
      description: "ハッシュ値を秘密鍵で暗号化",
      details: [
        "署名者の秘密鍵を使用",
        "RSA暗号化などの利用",
        "デジタル署名の生成"
      ]
    },
    {
      title: "署名の添付",
      icon: ShieldCheck,
      color: "bg-orange-200",
      description: "署名を文書に添付",
      details: [
        "署名と文書の結合",
        "メタデータの付加",
        "タイムスタンプの付与"
      ]
    }
  ];

  const processes = {
    creation: {
      title: "署名生成プロセス",
      steps: [
        "1. 文書作成",
        "2. ハッシュ値計算",
        "3. 秘密鍵による暗号化",
        "4. 署名の添付"
      ],
      illustration: (
        <div className="flex items-center justify-center space-x-4">
          <FileText className="w-12 h-12 text-blue-600" />
          <ArrowRight />
          <Hash className="w-12 h-12 text-green-600" />
          <ArrowRight />
          <Key className="w-12 h-12 text-purple-600" />
          <ArrowRight />
          <ShieldCheck className="w-12 h-12 text-orange-600" />
        </div>
      )
    },
    verification: {
      title: "署名検証プロセス",
      steps: [
        "1. 署名の分離",
        "2. 公開鍵による復号",
        "3. 文書のハッシュ値計算",
        "4. ハッシュ値の比較"
      ],
      illustration: (
        <div className="flex items-center justify-center space-x-4">
          <ShieldCheck className="w-12 h-12 text-orange-600" />
          <ArrowRight />
          <Lock className="w-12 h-12 text-purple-600" />
          <ArrowRight />
          <Hash className="w-12 h-12 text-green-600" />
          <ArrowRight />
          <CheckCircle2 className="w-12 h-12 text-blue-600" />
        </div>
      )
    }
  };

  const useCases = [
    {
      title: "電子契約",
      icon: UserCheck,
      description: "契約書への電子署名",
      examples: [
        "ビジネス契約",
        "雇用契約",
        "取引契約"
      ]
    },
    {
      title: "公文書",
      icon: FileText,
      description: "公的文書の電子認証",
      examples: [
        "行政文書",
        "許認可証",
        "証明書"
      ]
    },
    {
      title: "ソフトウェア配布",
      icon: ShieldCheck,
      description: "ソフトウェアの真正性証明",
      examples: [
        "アプリケーション配布",
        "システムアップデート",
        "ドライバー配布"
      ]
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const resetStep = () => {
    setCurrentStep(0);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        デジタル署名とは
      </h2>

      {/* 概要説明セクション */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex items-center gap-4 mb-4">
          <ShieldCheck className="w-10 h-10 text-indigo-600" />
          <h3 className="text-2xl font-bold text-indigo-600">基本概念</h3>
        </div>
        <div className="space-y-4">
          <p className="text-lg">
            デジタル署名は、電子文書の認証と完全性を保証する技術です。
            暗号技術を用いて、文書の作成者の身元確認、改ざん検知、否認防止を実現します。
          </p>
          
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="font-bold text-lg mb-2">主な特徴</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>文書の作成者の身元を証明</li>
              <li>文書の完全性を保証</li>
              <li>改ざんを検知可能</li>
              <li>署名の否認を防止</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 署名プロセスフロー */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-bold text-indigo-600 mb-4">署名生成プロセス</h3>
        
        <div className="flex items-center justify-center space-x-4 mb-6">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <div key={index} className="flex items-center">
                <div className={`
                  w-24 h-24 p-2 rounded-lg flex flex-col items-center justify-center text-center
                  ${index === currentStep ? 'ring-4 ring-indigo-500 transform scale-110' : ''}
                  ${index <= currentStep ? step.color : 'bg-gray-100'}
                  transition-all duration-300
                `}>
                  <StepIcon className="w-8 h-8 mb-2" />
                  <span className="text-sm font-semibold">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-6 h-6 text-indigo-500" />
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-bold mb-2">{steps[currentStep].title}の詳細:</h4>
          <ul className="list-disc list-inside">
            {steps[currentStep].details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="px-6 py-3 bg-indigo-500 text-white rounded-full font-semibold hover:bg-indigo-600 disabled:bg-gray-400 transition-colors duration-300 flex items-center"
          >
            次のステップへ
            <ArrowRight className="ml-2" />
          </button>
          <button
            onClick={resetStep}
            className="px-6 py-3 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center"
          >
            <RefreshCw className="mr-2" />
            最初から
          </button>
        </div>
      </div>

      {/* 署名検証プロセス */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-bold text-indigo-600 mb-4">署名生成と検証</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {Object.entries(processes).map(([key, process]) => (
            <div
              key={key}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                selectedProcess === key ? 'bg-indigo-100 transform scale-105' : 'bg-gray-50'
              }`}
              onClick={() => setSelectedProcess(key)}
            >
              <h4 className="font-bold mb-4">{process.title}</h4>
              <div className="mb-4">{process.illustration}</div>
              <ul className="list-none space-y-2">
                {process.steps.map((step, index) => (
                  <li key={index} className="text-sm">{step}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 用途セクション */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-bold text-indigo-600 mb-4">主な用途</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {useCases.map((useCase, index) => {
            const UseCaseIcon = useCase.icon;
            return (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <UseCaseIcon className="w-6 h-6 text-indigo-600" />
                  <h4 className="font-bold">{useCase.title}</h4>
                </div>
                <p className="text-sm mb-2">{useCase.description}</p>
                <ul className="text-sm list-disc list-inside">
                  {useCase.examples.map((example, i) => (
                    <li key={i}>{example}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* セキュリティ注意点 */}
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-bold text-lg mb-2 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-yellow-600" />
          セキュリティ上の注意点
        </h4>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>秘密鍵の厳重な管理</li>
          <li>信頼できる認証局の利用</li>
          <li>適切な暗号アルゴリズムの選択</li>
          <li>証明書の有効期限管理</li>
        </ul>
      </div>
    </div>
  );
};

export default DigitalSignatureVisualization;