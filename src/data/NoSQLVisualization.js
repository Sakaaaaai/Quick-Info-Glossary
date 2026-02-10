import React, { useState } from 'react'
import { Database, FileJson, Table2, ChevronRight, RefreshCw } from 'lucide-react'

export default function NoSQLVisualization() {
  const [activeType, setActiveType] = useState('document')
  const [currentStep, setCurrentStep] = useState(0)

  const documentExample = {
    user: {
      id: "user123",
      name: "田中太郎",
      age: 28,
      orders: [
        {
          orderId: "ord456",
          items: ["本", "ペン"],
          total: 2500
        },
        {
          orderId: "ord789",
          items: ["ノート"],
          total: 500
        }
      ],
      address: {
        city: "東京",
        street: "渋谷区"
      }
    }
  }

  const keyValueExample = {
    "user:123:name": "田中太郎",
    "user:123:age": "28",
    "user:123:orders": "2",
    "user:123:lastLogin": "2024-04-01"
  }

  const columnExample = {
    rowKey: "user123",
    columns: {
      profile: {
        name: "田中太郎",
        age: "28",
        email: "tanaka@example.com"
      },
      activity: {
        lastLogin: "2024-04-01",
        loginCount: "42",
        status: "active"
      }
    }
  }

  const examples = {
    document: {
      title: "ドキュメント指向型",
      description: "JSONライクな形式でデータを柔軟に保存できます。MongoDB等が代表例です。",
      data: documentExample,
      features: [
        "階層構造のデータを自然に表現できる",
        "スキーマが柔軟で変更が容易",
        "データの完全性を1つのドキュメントで保持"
      ]
    },
    keyValue: {
      title: "キーバリュー型",
      description: "シンプルなキーと値のペアでデータを保存します。Redis等が代表例です。",
      data: keyValueExample,
      features: [
        "シンプルで高速なデータアクセス",
        "スケーラビリティが高い",
        "キャッシュシステムに適している"
      ]
    },
    column: {
      title: "カラムファミリー型",
      description: "列指向でデータを保存します。Cassandra等が代表例です。",
      data: columnExample,
      features: [
        "列単位でのデータ管理が可能",
        "大量データの分析に適している",
        "スケーラビリティが高い"
      ]
    }
  }

  const handleNext = () => {
    if (currentStep < Object.keys(examples).length - 1) {
      setCurrentStep(currentStep + 1)
      setActiveType(Object.keys(examples)[currentStep + 1])
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setActiveType('document')
  }

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-green-700">
        NoSQLデータベース
      </h2>

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-6">
        <h3 className="text-lg sm:text-xl font-bold mb-3 text-green-600">NoSQLデータベースとは？</h3>
        <p className="mb-4 text-sm sm:text-base text-gray-700">
          NoSQLは「Not Only SQL」の略で、従来のリレーショナルデータベース（RDB）とは異なるアプローチでデータを管理するデータベースシステムです。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-bold mb-2 text-green-700">主な特徴</h4>
            <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-gray-700">
              <li>柔軟なデータ構造</li>
              <li>高いスケーラビリティ</li>
              <li>大量データの処理に適している</li>
              <li>スキーマレス設計が可能</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold mb-2 text-blue-700">使用ケース</h4>
            <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-gray-700">
              <li>大規模Webアプリケーション</li>
              <li>リアルタイムデータ分析</li>
              <li>IoTデータの収集</li>
              <li>ソーシャルメディアプラットフォーム</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
        {Object.entries(examples).map(([type, { title }]) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 ${
              activeType === type
                ? 'bg-green-500 text-white transform scale-105'
                : 'bg-white text-gray-600 hover:bg-green-100'
            }`}
          >
            {title}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            {activeType === 'document' && <FileJson className="text-green-500" size={24} />}
            {activeType === 'keyValue' && <Database className="text-blue-500" size={24} />}
            {activeType === 'column' && <Table2 className="text-purple-500" size={24} />}
            <h3 className="text-lg sm:text-xl font-bold">{examples[activeType].title}</h3>
          </div>
          
          <p className="mb-4 text-sm sm:text-base text-gray-700">{examples[activeType].description}</p>
          
          <div className="mb-6">
            <h4 className="font-bold mb-2">主な特徴：</h4>
            <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-gray-700">
              {examples[activeType].features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold mb-2">データ構造の例：</h4>
            <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-xs sm:text-sm">
              {JSON.stringify(examples[activeType].data, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={handleNext}
          disabled={currentStep >= Object.keys(examples).length - 1}
          className="px-6 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 disabled:bg-gray-400 transition-colors duration-300 flex items-center justify-center"
        >
          次のタイプ
          <ChevronRight className="ml-2" />
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
        >
          <RefreshCw className="mr-2" />
          最初から
        </button>
      </div>
    </div>
  )
}