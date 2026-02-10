import React, { useState } from 'react';
import { Lock, ShieldCheck, Clock, RefreshCw, Info } from 'lucide-react';

const SecurityTriadVisualization = () => {
  const [activeElement, setActiveElement] = useState(null);

  const elements = [
    {
      id: 'confidentiality',
      title: '機密性',
      subtitle: 'Confidentiality',
      icon: Lock,
      color: 'text-blue-600',
      bgColor: 'from-blue-100 to-blue-200',
      description: '情報へのアクセスが認められた人だけが情報を見ることができる性質',
      examples: ['パスワードによる保護', 'データの暗号化', 'アクセス制御の実装'],
      details: '機密性は、情報が権限のない人に見られないようにする性質です。例えば、個人情報や企業の機密情報を守るために必要です。'
    },
    {
      id: 'integrity',
      title: '完全性',
      subtitle: 'Integrity',
      icon: ShieldCheck,
      color: 'text-green-600',
      bgColor: 'from-green-100 to-green-200',
      description: '情報が改ざんされていない、正確な状態を保っている性質',
      examples: ['デジタル署名', 'チェックサム検証', 'バージョン管理'],
      details: '完全性は、情報が意図しない形で変更されていないことを保証する性質です。データの正確性と信頼性を確保します。'
    },
    {
      id: 'availability',
      title: '可用性',
      subtitle: 'Availability',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'from-orange-100 to-orange-200',
      description: '必要な時に情報にアクセスできる性質',
      examples: ['システムの冗長化', 'バックアップの実施', '定期的なメンテナンス'],
      details: '可用性は、必要なときに情報やシステムを利用できる状態を維持する性質です。システムのダウンタイムを最小限に抑えることが重要です。'
    }
  ];

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-orange-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-indigo-700">情報セキュリティの三要素</h2>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-indigo-600">情報セキュリティの三要素とは？</h3>
        <p className="text-lg mb-4">情報セキュリティを確保するためには、以下の3つの要素のバランスを保つことが重要です。</p>
        <p className="text-lg mb-2">これらは「CIAトライアド」とも呼ばれ、情報セキュリティの基本となる考え方です。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {elements.map((element) => (
          <div
            key={element.id}
            className={`bg-gradient-to-br ${element.bgColor} rounded-xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 ${
              activeElement === element.id ? 'ring-4 ring-indigo-500' : ''
            }`}
            onClick={() => setActiveElement(activeElement === element.id ? null : element.id)}
          >
            <div className="flex items-center justify-center mb-6">
              <element.icon className={`w-16 h-16 ${element.color}`} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-2">{element.title}</h3>
            <p className="text-lg text-center text-gray-700 mb-4">{element.subtitle}</p>
            <p className="text-lg mb-4 text-gray-800">{element.description}</p>
            
            {activeElement === element.id && (
              <div className="mt-6 space-y-4 animate-fadeIn">
                <div>
                  <h4 className="text-xl font-semibold mb-3">具体例：</h4>
                  <ul className="list-disc list-inside space-y-2 text-lg">
                    {element.examples.map((example, index) => (
                      <li key={index} className="text-gray-800">{example}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-lg text-gray-800 mt-4">{element.details}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Replace Alert component with a div */}
      <div className="bg-yellow-100 border border-yellow-200 p-4 mb-6 rounded-lg flex items-center">
        <Info className="w-5 h-5 text-yellow-600" />
        <p className="text-lg text-yellow-800 ml-4">
          各要素をクリックすると、詳細な説明と具体例を確認できます。
          これらの要素は相互に関連しており、バランスの取れた実装が重要です。
        </p>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => setActiveElement(null)}
          className="px-6 py-3 bg-indigo-500 text-white rounded-full text-lg font-semibold hover:bg-indigo-600 transition-colors duration-300 flex items-center mx-auto"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          リセット
        </button>
      </div>
    </div>
  );
};

export default SecurityTriadVisualization;
