import React, { useState } from 'react';
import { RefreshCw, Server, Globe, Database, ArrowRight, Search, Clock, Wifi } from 'lucide-react';

export default function EnhancedDNSVisualization() {
  const [step, setStep] = useState(0);
  const [domain] = useState('www.example.com');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTooltip, setShowTooltip] = useState(null);

  const steps = [
    {
      title: 'ステップ 1: ブラウザでURLを入力',
      description: 'ブラウザで www.example.com と入力すると、まずコンピュータは入力されたドメイン名をIPアドレスに変換する必要があることを認識します。',
      ipResult: null
    },
    {
      title: 'ステップ 2: ローカルDNSキャッシュの確認',
      description: '最初に、コンピュータは自身のDNSキャッシュ（一時的な記憶）を確認します。',
      ipResult: null
    },
    {
      title: 'ステップ 3: DNSリゾルバへの問い合わせ',
      description: 'キャッシュに情報がない場合、コンピュータはDNSリゾルバに問い合わせを行います。',
      ipResult: null
    },
    {
      title: 'ステップ 4: ルートDNSサーバーへの問い合わせ',
      description: 'DNSリゾルバは、ルートDNSサーバーに問い合わせます。',
      ipResult: null
    },
    {
      title: 'ステップ 5: TLDサーバーへの問い合わせ',
      description: 'ルートDNSサーバーから得た情報を基に、TLDを管理するサーバーに問い合わせます。',
      ipResult: null
    },
    {
      title: 'ステップ 6: 権威DNSサーバーへの問い合わせ',
      description: '最後に、対象ドメインの権威DNSサーバーに問い合わせ、実際のIPアドレスを取得します。',
      ipResult: '93.184.216.34'
    }
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setIsAnimating(true);
      setStep(prev => prev + 1);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  const resetVisualization = () => {
    setStep(0);
    setIsAnimating(false);
    setShowTooltip(null);
  };

  const ServerIcon = ({ icon: Icon, label, active, onClick }) => (
    <div 
      className={`flex flex-col items-center cursor-pointer transition-all duration-300 transform
        ${active ? 'text-blue-600 scale-110' : 'text-gray-400'}`}
      onClick={onClick}
    >
      <div className="relative">
        <Icon size={40} className="transition-all duration-300" />
      </div>
      <span className="text-xs sm:text-sm mt-2 text-center">{label}</span>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-indigo-700">DNS</h2>

      {/* 導入部分 */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-indigo-600">DNSとは？</h3>
        <p className="mb-3 sm:mb-4 text-sm sm:text-base">
          Domain Name System (DNS) は、インターネットの「電話帳」のような役割を果たすシステムです。
          人間が覚えやすいドメイン名（例：www.example.com）を、コンピュータが理解できるIPアドレス（例：93.184.216.34）に変換します。
        </p>
        <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
          <h4 className="font-bold mb-2 text-sm sm:text-base">なぜDNSが必要？</h4>
          <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <li>人間は数字の羅列（IPアドレス）より文字列（ドメイン名）を覚えやすい</li>
            <li>サーバーのIPアドレスが変更されても、ドメイン名は変更不要</li>
            <li>1つのIPアドレスで複数のドメインを運用可能</li>
          </ul>
        </div>
      </div>

      {/* メインの可視化部分 */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-4 sm:mb-6">
        <p className="text-base sm:text-lg mb-3 sm:mb-4 text-center font-semibold">
          ドメイン名: <span className="text-blue-600">{domain}</span>
          {steps[step].ipResult && 
            <span className="block sm:inline sm:ml-4">
              → IPアドレス: <span className="text-green-600">{steps[step].ipResult}</span>
            </span>
          }
        </p>

        <div className="flex flex-wrap justify-center sm:justify-between items-center mb-6 sm:mb-8 gap-4">
          {/* ブラウザ */}
          <ServerIcon 
            icon={Globe} 
            label="ブラウザ" 
            active={step >= 0} 
            onClick={() => setShowTooltip('browser')}
          />
          <ArrowRight className={`hidden sm:block ${isAnimating && step === 1 ? 'animate-pulse text-blue-500' : 'text-gray-400'}`} />
          
          {/* ローカルキャッシュ */}
          <ServerIcon 
            icon={Clock} 
            label="DNSキャッシュ" 
            active={step >= 1} 
            onClick={() => setShowTooltip('cache')}
          />
          <ArrowRight className={`hidden sm:block ${isAnimating && step === 2 ? 'animate-pulse text-blue-500' : 'text-gray-400'}`} />
          
          {/* DNSリゾルバ */}
          <ServerIcon 
            icon={Wifi} 
            label="DNSリゾルバ" 
            active={step >= 2} 
            onClick={() => setShowTooltip('resolver')}
          />
          <ArrowRight className={`hidden sm:block ${isAnimating && step === 3 ? 'animate-pulse text-blue-500' : 'text-gray-400'}`} />
          
          {/* ルートDNS */}
          <ServerIcon 
            icon={Database} 
            label="ルートDNS" 
            active={step >= 3} 
            onClick={() => setShowTooltip('root')}
          />
          <ArrowRight className={`hidden sm:block ${isAnimating && step === 4 ? 'animate-pulse text-blue-500' : 'text-gray-400'}`} />
          
          {/* TLDサーバー */}
          <ServerIcon 
            icon={Server} 
            label="TLDサーバー" 
            active={step >= 4} 
            onClick={() => setShowTooltip('tld')}
          />
          <ArrowRight className={`hidden sm:block ${isAnimating && step === 5 ? 'animate-pulse text-blue-500' : 'text-gray-400'}`} />
          
          {/* 権威DNS */}
          <ServerIcon 
            icon={Search} 
            label="権威DNS" 
            active={step >= 5} 
            onClick={() => setShowTooltip('auth')}
          />
        </div>
      </div>

      {/* 説明部分 */}
      <div className="bg-yellow-50 p-4 sm:p-6 rounded-lg shadow mb-4 sm:mb-6">
        <h4 className="text-lg sm:text-xl font-bold mb-2 text-indigo-600">{steps[step].title}</h4>
        <p className="mb-3 sm:mb-4 text-sm sm:text-base">{steps[step].description}</p>
      </div>

      {/* ツールチップの表示 */}
      {showTooltip && (
        <div className="tooltip bg-white p-2 sm:p-3 rounded shadow-md text-sm sm:text-base">
          {`現在のツールチップ: ${showTooltip}`}
        </div>
      )}

      {/* コントロールボタン */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
        <button
          onClick={nextStep}
          disabled={step >= steps.length - 1}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 disabled:bg-gray-400 transition-colors duration-300 text-sm sm:text-base"
        >
          次のステップ
        </button>
        <button
          onClick={resetVisualization}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center justify-center text-sm sm:text-base"
        >
          <RefreshCw className="mr-2" size={16} />
          最初から
        </button>
      </div>
    </div>
  );
}