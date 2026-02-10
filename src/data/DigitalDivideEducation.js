import React, { useState } from 'react';
import { Wifi, Smartphone, Laptop, School, Building2, Brain, Globe, Database, BookOpen, Users } from 'lucide-react';

const DigitalDivideEducation = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [,] = useState('access');

  const sections = {
    intro: {
      title: "デジタルデバイドとは？",
      content: [
        {
          heading: "デジタルデバイドの基本概念",
          text: "デジタルデバイド（情報格差）とは、ICT（情報通信技術）を利用できる人と利用できない人の間に生じる格差のことです。この格差は、社会的・経済的な不平等につながる重要な課題となっています。",
          icon: Globe
        },
        {
          heading: "なぜ問題なのか？",
          text: "現代社会では、デジタル技術は教育、仕事、行政サービスなど、生活の多くの場面で必要不可欠となっています。この格差は、社会参加の機会や生活の質に大きな影響を与えます。",
          icon: Users
        },
        {
          heading: "デジタル社会での影響",
          text: "オンライン教育や在宅勤務が一般化する中、デジタルデバイドは教育機会や就労機会の格差を生み出し、社会的な分断をさらに深める可能性があります。",
          icon: Database
        }
      ]
    },
    types: {
      title: "デジタルデバイドの種類",
      content: [
        {
          heading: "アクセス格差",
          text: "インターネットや機器への物理的なアクセスの違い。都市部と地方、または経済状況による格差。高速通信網の整備状況や経済的な理由による機器所有の差などが含まれます。",
          icon: Wifi
        },
        {
          heading: "スキル格差",
          text: "デジタル機器やサービスを使いこなす能力の違い。年齢や教育環境による差。基本的な操作から、情報セキュリティ、プライバシー保護まで、様々なレベルのスキルが関係します。",
          icon: Brain
        },
        {
          heading: "利用格差",
          text: "デジタル技術を効果的に活用できる度合いの違い。情報リテラシーの差。同じようにアクセスがあっても、その活用方法や得られる便益に大きな差が生じています。",
          icon: Laptop
        }
      ]
    },
    impacts: {
      title: "社会への影響",
      content: [
        {
          heading: "教育面での影響",
          text: "オンライン学習へのアクセスや教育リソースの利用に差が生じ、学習機会の不平等につながります。特にコロナ禍では、この格差が学力差として顕著に表れました。",
          icon: School
        },
        {
          heading: "経済面での影響",
          text: "テレワークやデジタルスキルを必要とする職種への就業機会に影響し、収入格差を広げる可能性があります。デジタル化が進む産業界での就労機会にも影響を与えています。",
          icon: Building2
        },
        {
          heading: "社会参加への影響",
          text: "行政サービスのデジタル化が進む中、必要な情報やサービスへのアクセスが制限され、社会参加の機会が失われる可能性があります。",
          icon: Users
        }
      ]
    }
  };

  const stats = {
    access: {
      title: 'インターネットアクセス格差',
      highTitle: '都市部のアクセス率',
      lowTitle: '地方部のアクセス率',
      highStats: '98%',
      lowStats: '72%',
      icon: Wifi,
      explanation: '地域によるインターネットインフラの整備状況や通信速度には大きな差があり、特に地方部での高速通信環境の整備が課題となっています。この格差は、教育や就労機会に直接的な影響を与えています。'
    },
    devices: {
      title: 'デジタルデバイス所有格差',
      highTitle: '高所得層の平均所有デバイス数',
      lowTitle: '低所得層の平均所有デバイス数',
      highStats: '4.5台',
      lowStats: '1.2台',
      icon: Smartphone,
      explanation: '世帯収入によってデジタルデバイスの所有数や種類に大きな差があり、特に教育や在宅勤務における機会の差につながっています。複数のデバイスを使い分けることで、より効果的な活用が可能になります。'
    },
    skills: {
      title: 'デジタルスキル格差',
      highTitle: '若年層のデジタルスキル習熟度',
      lowTitle: '高齢者層のデジタルスキル習熟度',
      highStats: '89%',
      lowStats: '34%',
      icon: Brain,
      explanation: '年齢層によるデジタルスキルの差は特に顕著で、行政サービスのデジタル化が進む中で社会参加への障壁となっています。継続的な学習支援と使いやすいインターフェースの提供が求められています。'
    }
  };

  const solutions = [
    {
      icon: BookOpen,
      title: "デジタル教育の推進",
      description: "学校教育でのプログラミング必修化や、高齢者向けのデジタル活用講座の開催、継続的な学習支援体制の構築"
    },
    {
      icon: Globe,
      title: "インフラ整備",
      description: "地方部での高速通信網の整備や、公共Wi-Fiスポットの拡充、5G網の全国展開の促進"
    },
    {
      icon: Smartphone,
      title: "機器の支援",
      description: "低所得世帯への情報機器の貸与や購入支援制度の実施、公共施設でのデバイス利用環境の整備"
    },
    {
      icon: Users,
      title: "サポート体制の構築",
      description: "地域のデジタル支援員の配置や、相談窓口の設置、コミュニティベースの相互支援の促進"
    }
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        デジタルデバイド
      </h1>

      {/* セクション切り替えタブ */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {Object.entries(sections).map(([key, section]) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className={`px-6 py-3 rounded-lg transition-all ${
              activeSection === key
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                : 'bg-white/80 text-slate-600 hover:bg-blue-50'
            }`}
          >
            {section.title}
          </button>
        ))}
      </div>

      {/* セクションコンテンツ */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-800">
          {sections[activeSection].title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections[activeSection].content.map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-slate-50 to-blue-50/50 p-6 rounded-xl hover:shadow-md transition-all border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <item.icon className="text-blue-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-blue-900">{item.heading}</h3>
              </div>
              <p className="text-slate-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 統計データの可視化 */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-blue-100">
        <h2 className="text-2xl font-bold mb-6 text-blue-800">データで見るデジタルデバイド</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(stats).map(([key, stat]) => (
            <div key={key} className="bg-gradient-to-br from-slate-50 to-blue-50/50 p-6 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <stat.icon className="text-blue-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-blue-900">{stat.title}</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-700">{stat.highTitle}</p>
                  <p className="text-2xl font-bold text-blue-600">{stat.highStats}</p>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-1000" 
                      style={{ width: stat.highStats }}
                    ></div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-700">{stat.lowTitle}</p>
                  <p className="text-2xl font-bold text-purple-600">{stat.lowStats}</p>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-1000" 
                      style={{ width: stat.lowStats }}
                    ></div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600">{stat.explanation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 解決に向けた取り組み */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">解決に向けた取り組み</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-blue-100">
              <div className="flex items-start gap-3">
                <solution.icon className="text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900">{solution.title}</h3>
                  <p className="text-slate-700">{solution.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DigitalDivideEducation;