'use client'

import React, { useState } from 'react'
import { Globe } from 'lucide-react'

export default function Component() {
  const [highlightedPart, setHighlightedPart] = useState(null)

  const domainParts = [
    { name: 'サブドメイン', value: 'www', description: 'オプションの追加的な区分けです。', class: 'text-gray-400' },
    { name: 'セカンドレベルドメイン', value: 'example', description: 'ウェブサイトやオーガニゼーションの名前です。', class: 'text-blue-500' },
    { name: 'トップレベルドメイン', value: '.com', description: 'ドメインの種類を示します（.com, .org, .netなど）。', class: 'text-red-500' },
  ]

  const highlightPart = (index) => {
    setHighlightedPart(index)
  }

  const resetHighlight = () => {
    setHighlightedPart(null)
  }

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-indigo-700">ドメインの構造</h2>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-2xl font-bold mb-4 text-indigo-600">ドメインの基本</h3>
        <p className="mb-4">
          ドメインは、インターネット上のウェブサイトやコンピューターの住所のようなものです。例えば、
          <code className="bg-gray-200 px-2 py-1 rounded">www.example.com</code> というドメインがあります。
        </p>
        <p className="mb-4">ドメインは右から左へ読みます：</p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <code className="bg-gray-200 px-2 py-1 rounded">.com</code>：トップレベルドメイン（TLD）
          </li>
          <li>
            <code className="bg-gray-200 px-2 py-1 rounded">example</code>：セカンドレベルドメイン
          </li>
          <li>
            <code className="bg-gray-200 px-2 py-1 rounded">www</code>：サブドメイン
          </li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-2xl font-bold mb-4 text-indigo-600">ドメインの構造</h3>
        <div className="flex items-center justify-center mb-4 text-lg sm:text-xl font-mono">
          <Globe className="mr-2 text-blue-500" />
          {domainParts.map((part, index) => (
            <span
              key={index}
              className={`${part.class} ${highlightedPart === index ? 'bg-yellow-300' : ''}`}
            >
              {part.value}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {domainParts.map((part, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg cursor-pointer transition-colors duration-300 ${
                highlightedPart === index ? 'bg-yellow-100' : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onMouseEnter={() => highlightPart(index)}
              onMouseLeave={resetHighlight}
            >
              <h4 className="font-bold text-lg mb-1">{part.name}</h4>
              <p className="text-sm mb-1">{part.value}</p>
              <p className="text-xs">{part.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-2xl font-bold mb-4 text-indigo-600">ドメインの役割</h3>
        <p className="mb-4">ドメインには主に2つの重要な役割があります：</p>
        <ol className="list-decimal list-inside mb-4">
          <li className="mb-2">
            <span className="font-semibold">人間にわかりやすい住所：</span>{' '}
            IPアドレス（例：192.168.1.1）の代わりに、覚えやすい名前を使用できます。
          </li>
          <li className="mb-2">
            <span className="font-semibold">ウェブサイトの管理：</span>{' '}
            ドメインを所有することで、そのドメイン下のウェブサイトやメールアドレスを管理できます。
          </li>
        </ol>
        <p>これらの仕組みにより、インターネットをより使いやすく、管理しやすいものにしています。</p>
      </div>
    </div>
  )
}