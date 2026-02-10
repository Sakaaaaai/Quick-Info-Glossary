import React, { useState } from 'react';
import { 
  Search, 
  FileText, 
  BarChart2, 
  MessageCircle,
  Filter,
  Sigma,
  BrainCircuit,
  ArrowRight,
  RefreshCw,
  ChevronRight
} from 'lucide-react';

const TextMiningVisualization = () => {
  const [currentProcess, setCurrentProcess] = useState(0);
  const [selectedTechnique, setSelectedTechnique] = useState('morphological');

  const processes = [
    {
      title: "データ収集",
      icon: FileText,
      color: "bg-blue-200",
      description: "様々なソースからテキストデータを収集",
      details: [
        "Webスクレイピング",
        "文書データベース",
        "SNSデータ",
        "アンケート回答",
        "メールやチャットログ"
      ]
    },
    {
      title: "前処理",
      icon: Filter,
      color: "bg-green-200",
      description: "テキストデータの整形と正規化",
      details: [
        "ノイズ除去",
        "文字コード統一",
        "改行・空白の調整",
        "特殊文字の処理",
        "大文字小文字の統一"
      ]
    },
    {
      title: "テキスト解析",
      icon: Search,
      color: "bg-purple-200",
      description: "テキストの構造化と特徴抽出",
      details: [
        "形態素解析",
        "構文解析",
        "固有表現抽出",
        "感情分析",
        "トピック抽出"
      ]
    },
    {
      title: "分析と可視化",
      icon: BarChart2,
      color: "bg-orange-200",
      description: "結果の分析とインサイト導出",
      details: [
        "統計分析",
        "クラスタリング",
        "パターン発見",
        "トレンド分析",
        "相関分析"
      ]
    }
  ];

  const techniques = {
    morphological: {
      title: "形態素解析",
      description: "テキストを最小の意味単位（形態素）に分割し、品詞や活用形を特定する技術",
      example: {
        input: "私は今日公園に行きました",
        output: "私（代名詞） | は（助詞） | 今日（名詞） | 公園（名詞） | に（助詞） | 行き（動詞） | ました（助動詞）"
      }
    },
    sentiment: {
      title: "感情分析",
      description: "テキストから書き手の感情や意見を抽出し、ポジティブ・ネガティブなどを判定する技術",
      example: {
        input: "この商品は使いやすくて、とても満足しています！",
        output: "感情: ポジティブ（スコア: 0.8）\n根拠語: 使いやすい、満足"
      }
    },
    topic: {
      title: "トピック分析",
      description: "大量のテキストから主要なテーマやトピックを自動的に抽出する技術",
      example: {
        input: "複数の文書データ（ニュース記事、SNSの投稿など）",
        output: "トピック1: [経済, 株価, 投資]\nトピック2: [環境, 気候, エコ]\nトピック3: [技術, AI, デジタル]"
      }
    }
  };

  const applications = [
    {
      title: "マーケティング分析",
      icon: MessageCircle,
      description: "顧客の声や市場トレンドの分析",
      examples: [
        "商品レビュー分析",
        "SNSの評判分析",
        "顧客フィードバック分析"
      ]
    },
    {
      title: "学術研究",
      icon: BrainCircuit,
      description: "研究論文や文献の分析",
      examples: [
        "研究トレンド分析",
        "引用関係の分析",
        "研究テーマの類似性分析"
      ]
    },
    {
      title: "ビジネスインテリジェンス",
      icon: Sigma,
      description: "ビジネスデータからの知見抽出",
      examples: [
        "競合分析",
        "市場動向分析",
        "リスク分析"
      ]
    }
  ];

  const nextProcess = () => {
    if (currentProcess < processes.length - 1) {
      setCurrentProcess(currentProcess + 1);
    }
  };

  const resetProcess = () => {
    setCurrentProcess(0);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        テキストマイニングとは
      </h2>

      {/* 概要説明セクション */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Search className="w-10 h-10 text-indigo-600" />
          <h3 className="text-2xl font-bold text-indigo-600">基本概念</h3>
        </div>
        <div className="space-y-4">
          <p className="text-lg">
            テキストマイニングは、大量のテキストデータから有用な情報やパターンを抽出し、
            分析する技術です。自然言語処理とデータマイニングの技術を組み合わせて、
            テキストから意味のある知見を導き出します。
          </p>
          
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="font-bold text-lg mb-2">主な特徴</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>非構造化データの構造化と分析</li>
              <li>自然言語処理技術の活用</li>
              <li>統計的手法による分析</li>
              <li>パターンやトレンドの発見</li>
            </ul>
          </div>
        </div>
      </div>

      {/* プロセスフロー */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-bold text-indigo-600 mb-4">テキストマイニングのプロセス</h3>
        
        <div className="flex items-center justify-center space-x-4 mb-6">
          {processes.map((process, index) => {
            const ProcessIcon = process.icon;
            return (
              <div key={index} className="flex items-center">
                <div className={`
                  w-24 h-24 p-2 rounded-lg flex flex-col items-center justify-center text-center
                  ${index === currentProcess ? 'ring-4 ring-indigo-500 transform scale-110' : ''}
                  ${index <= currentProcess ? process.color : 'bg-gray-100'}
                  transition-all duration-300
                `}>
                  <ProcessIcon className="w-8 h-8 mb-2" />
                  <span className="text-sm font-semibold">{process.title}</span>
                </div>
                {index < processes.length - 1 && (
                  <ChevronRight className="w-6 h-6 text-indigo-500" />
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-bold mb-2">{processes[currentProcess].title}の詳細:</h4>
          <ul className="list-disc list-inside">
            {processes[currentProcess].details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={nextProcess}
            disabled={currentProcess === processes.length - 1}
            className="px-6 py-3 bg-indigo-500 text-white rounded-full font-semibold hover:bg-indigo-600 disabled:bg-gray-400 transition-colors duration-300 flex items-center"
          >
            次のステップへ
            <ArrowRight className="ml-2" />
          </button>
          <button
            onClick={resetProcess}
            className="px-6 py-3 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center"
          >
            <RefreshCw className="mr-2" />
            最初から
          </button>
        </div>
      </div>

      {/* 解析手法セクション */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-bold text-indigo-600 mb-4">主な解析手法</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {Object.entries(techniques).map(([key, technique]) => (
            <div
              key={key}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                selectedTechnique === key ? 'bg-indigo-100 transform scale-105' : 'bg-gray-50'
              }`}
              onClick={() => setSelectedTechnique(key)}
            >
              <h4 className="font-bold mb-2">{technique.title}</h4>
              <p className="text-sm">{technique.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-bold mb-2">解析例:</h4>
          <div className="space-y-2">
            <p className="font-semibold">入力テキスト:</p>
            <p className="bg-white p-2 rounded">{techniques[selectedTechnique].example.input}</p>
            <p className="font-semibold">解析結果:</p>
            <p className="bg-white p-2 rounded">{techniques[selectedTechnique].example.output}</p>
          </div>
        </div>
      </div>

      {/* 応用分野セクション */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-bold text-indigo-600 mb-4">応用分野</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {applications.map((app, index) => {
            const AppIcon = app.icon;
            return (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AppIcon className="w-6 h-6 text-indigo-600" />
                  <h4 className="font-bold">{app.title}</h4>
                </div>
                <p className="text-sm mb-2">{app.description}</p>
                <ul className="text-sm list-disc list-inside">
                  {app.examples.map((example, i) => (
                    <li key={i}>{example}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* 注意点セクション */}
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-bold text-lg mb-2">分析時の注意点</h4>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>言語や文脈の特性を考慮した適切な前処理</li>
          <li>データの品質と量の確保</li>
          <li>プライバシーとデータ保護への配慮</li>
          <li>分析結果の適切な解釈と検証</li>
        </ul>
      </div>
    </div>
  );
};

export default TextMiningVisualization;