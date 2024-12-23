import React, { useState } from 'react';
import { Globe, Lock, Server } from 'lucide-react';

const URLVisualization = () => {
  const [url] = useState('https://www.example.com:443/path/to/page?name=value&name2=value2#section');
  const [highlightedPart, setHighlightedPart] = useState(null);

  const urlParts = [
    { name: 'プロトコル', value: 'https://', description: 'ウェブサーバーとの通信方法を指定します。httpsは暗号化された安全な接続を意味します。' },
    { name: 'サブドメイン', value: 'www.', description: 'メインドメインの前に付く部分で、ウェブサイトの特定の領域を示すことがあります。' },
    { name: 'ドメイン名', value: 'example.com', description: 'ウェブサイトの一意の名前です。インターネット上の住所のようなものです。' },
    { name: 'ポート番号', value: ':443', description: 'サーバー上の特定の"出入り口"を指定します。443はhttpsの標準ポートです。' },
    { name: 'パス', value: '/path/to/page', description: 'サーバー上の特定のページや資源の場所を示します。' },
    { name: 'クエリパラメータ', value: '?name=value&name2=value2', description: 'ページに追加情報を渡すために使用されます。検索条件やフィルターなどに使われます。' },
    { name: 'フラグメント', value: '#section', description: 'ページ内の特定の部分を指定します。長いページの特定のセクションにジャンプするのに使用されます。' },
  ];

  const highlightPart = (index) => {
    setHighlightedPart(index);
  };

  const resetHighlight = () => {
    setHighlightedPart(null);
  };

  const getHighlightedUrl = () => {
    if (highlightedPart === null) return url;
    
    let result = '';
    let currentIndex = 0;
    
    urlParts.forEach((part, index) => {
      const partStart = url.indexOf(part.value, currentIndex);
      const partEnd = partStart + part.value.length;
      
      if (index === highlightedPart) {
        result += url.substring(currentIndex, partStart);
        result += `<span class="bg-yellow-300">${part.value}</span>`;
      } else {
        result += url.substring(currentIndex, partEnd);
      }
      
      currentIndex = partEnd;
    });
    
    result += url.substring(currentIndex);
    return result;
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">URL</h2>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">URLとは？</h3>
        <p className="mb-2">URL（Uniform Resource Locator）は、インターネット上のリソースの場所を指定するための標準化された方法です。</p>
        <p className="mb-2">ウェブページ、画像、ビデオなど、インターネット上のあらゆるリソースに固有のアドレスを提供します。</p>
        <p>URLを理解することで、ウェブの仕組みをより深く理解できます。</p>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center text-indigo-600">URL構造の例</h3>
        <div className="flex items-center justify-center mb-4 text-lg sm:text-xl font-mono break-all">
          <div dangerouslySetInnerHTML={{ __html: getHighlightedUrl() }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {urlParts.map((part, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg cursor-pointer transition-colors duration-300 ${highlightedPart === index ? 'bg-yellow-100' : 'bg-gray-100 hover:bg-gray-200'}`}
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

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">URLの重要性</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><Lock className="inline mr-2 text-green-500" /> セキュリティ: httpsは安全な接続を示します。</li>
          <li><Server className="inline mr-2 text-blue-500" /> リソースの特定: サーバー上の特定のファイルやページを正確に指定します。</li>
          <li><Globe className="inline mr-2 text-purple-500" /> ナビゲーション: ウェブサイト内の特定のページや場所に直接アクセスできます。</li>
        </ul>
      </div>
    </div>
  );
};

export default URLVisualization;