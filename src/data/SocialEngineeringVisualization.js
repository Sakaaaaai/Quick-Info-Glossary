import React, { useState } from 'react';
import { Shield, Users, AlertTriangle, Brain, Eye, MessageSquare, Mail, Gift, User } from 'lucide-react';

const SocialEngineeringVisualization = () => {
  const [activeExample, setActiveExample] = useState(null);

  const categories = [
    {
      id: 'overview',
      title: 'ソーシャルエンジニアリングとは',
      icon: Brain,
      color: 'bg-blue-500',
      description: `人間の心理的な隙や行動の特徴を利用して、情報を不正に入手したり、特定の行動を誘導したりする手法です。

技術的な対策をすり抜けて、人間の心理的な弱点を突く攻撃手法として知られています。`,
      points: [
        '技術ではなく「人」を標的にする',
        '心理的な操作を用いる',
        '信頼関係を悪用する',
        '緊急性や恐怖を煽る'
      ]
    }
  ];

  const attackTypes = [
    {
      id: 'pretexting',
      title: '詐称（プリテキスティング）',
      icon: User,
      color: 'border-red-500',
      description: '攻撃者が架空の身分や立場を装って信頼を得る手法',
      examples: [
        '上司や取引先になりすましてメールを送る',
        'カスタマーサポートを装って電話をかける',
        '配送業者を装って訪問する'
      ]
    },
    {
      id: 'phishing',
      title: 'フィッシング',
      icon: Mail,
      color: 'border-yellow-500',
      description: '偽のメールやウェブサイトを使って個人情報を盗む手法',
      examples: [
        '銀行からの緊急連絡を装ったメール',
        'オンラインショップの偽サイト',
        'SNSの偽ログイン画面'
      ]
    },
    {
      id: 'baiting',
      title: 'ベイティング',
      icon: Gift,
      color: 'border-green-500',
      description: '魅力的な餌を使って悪意のある行動を誘導する手法',
      examples: [
        'マルウェア入りUSBメモリの配布',
        '無料プレゼントを装った詐欺',
        '偽の求人募集'
      ]
    },
    {
      id: 'tailgating',
      title: 'テールゲーティング',
      icon: Users,
      color: 'border-purple-500',
      description: '正規のアクセス権を持つ人に付いて回って立入制限区域に侵入する手法',
      examples: [
        '社員に紛れてオフィスに侵入',
        '配達員を装って立入禁止エリアに侵入',
        'セキュリティドアの通過時に便乗'
      ]
    }
  ];

  const preventionMethods = [
    {
      id: 'awareness',
      title: '意識向上と教育',
      icon: Eye,
      color: 'bg-indigo-500',
      points: [
        '定期的なセキュリティ研修の実施',
        '最新の手口の共有と注意喚起',
        'インシデント事例の学習',
        'セキュリティポリシーの周知'
      ]
    },
    {
      id: 'verification',
      title: '検証プロセスの確立',
      icon: Shield,
      color: 'bg-cyan-500',
      points: [
        '本人確認手順の整備',
        '複数の確認方法の組み合わせ',
        '不審な要求のエスカレーション手順',
        '定期的な手順の見直し'
      ]
    },
    {
      id: 'communication',
      title: 'コミュニケーション管理',
      icon: MessageSquare,
      color: 'bg-pink-500',
      points: [
        '情報共有ルールの明確化',
        '社内外との連絡手段の統一',
        '緊急時の連絡フローの整備',
        '不審な連絡の報告体制'
      ]
    }
  ];

  return (
    <div className="p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">ソーシャルエンジニアリング</h2>

      {/* 概要セクション */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        {categories.map(category => (
          <div key={category.id} className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <category.icon className="w-8 h-8 text-blue-500" />
              <h3 className="text-2xl font-bold text-indigo-600">{category.title}</h3>
            </div>
            <p className="text-gray-700 mb-4 whitespace-pre-line">{category.description}</p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-indigo-600 mb-2">主な特徴：</h4>
              <ul className="list-disc list-inside space-y-2">
                {category.points.map((point, index) => (
                  <li key={index} className="text-gray-700">{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* 攻撃手法セクション */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-8 h-8 text-red-500" />
          <h3 className="text-2xl font-bold text-indigo-600">代表的な攻撃手法</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {attackTypes.map(type => (
            <div 
              key={type.id}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                activeExample === type.id ? type.color : 'border-gray-200'
              }`}
              onClick={() => setActiveExample(activeExample === type.id ? null : type.id)}
            >
              <div className="flex items-center gap-3 mb-3">
                <type.icon className={`w-6 h-6 ${type.color.replace('border-', 'text-')}`} />
                <h4 className="font-bold text-lg">{type.title}</h4>
              </div>
              <p className="text-gray-700 mb-3">{type.description}</p>
              {activeExample === type.id && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h5 className="font-bold text-sm mb-2">具体例：</h5>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    {type.examples.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 対策セクション */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-green-500" />
          <h3 className="text-2xl font-bold text-indigo-600">主な対策方法</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {preventionMethods.map(method => (
            <div
              key={method.id}
              className="p-4 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <method.icon className={`w-6 h-6 ${method.color.replace('bg-', 'text-')}`} />
                <h4 className="font-bold">{method.title}</h4>
              </div>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                {method.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialEngineeringVisualization;
