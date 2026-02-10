import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle } from 'lucide-react';

const MorphologicalAnalysis = () => {
  const [selectedText, setSelectedText] = useState('');
  const [tokens, setTokens] = useState([]);
  const [posFrequency, setPosFrequency] = useState([]);

  const sampleTexts = {
    text1: '私は東京で働いています。',
    text2: '桜の花が満開です。',
    text3: 'AI技術は急速に進歩しています。'
  };

  const analysisResults = {
    text1: [
      { surface: '私', pos: '代名詞' },
      { surface: 'は', pos: '助詞' },
      { surface: '東京', pos: '名詞' },
      { surface: 'で', pos: '助詞' },
      { surface: '働い', pos: '動詞' },
      { surface: 'て', pos: '助動詞' },
      { surface: 'い', pos: '助動詞' },
      { surface: 'ます', pos: '助動詞' },
      { surface: '。', pos: '記号' }
    ],
    text2: [
      { surface: '桜', pos: '名詞' },
      { surface: 'の', pos: '助詞' },
      { surface: '花', pos: '名詞' },
      { surface: 'が', pos: '助詞' },
      { surface: '満開', pos: '名詞' },
      { surface: 'です', pos: '助動詞' },
      { surface: '。', pos: '記号' }
    ],
    text3: [
      { surface: 'AI', pos: '名詞' },
      { surface: '技術', pos: '名詞' },
      { surface: 'は', pos: '助詞' },
      { surface: '急速', pos: '形容動詞' },
      { surface: 'に', pos: '助詞' },
      { surface: '進歩', pos: '名詞' },
      { surface: 'し', pos: '動詞' },
      { surface: 'て', pos: '助詞' },
      { surface: 'い', pos: '助動詞' },
      { surface: 'ます', pos: '助動詞' },
      { surface: '。', pos: '記号' }
    ]
  };

  const analyzeText = (text) => {
    const result = analysisResults[text];
    setTokens(result);

    const posCount = {};
    result.forEach(token => {
      posCount[token.pos] = (posCount[token.pos] || 0) + 1;
    });

    const sortedPosFrequency = Object.entries(posCount)
      .sort((a, b) => b[1] - a[1])
      .map(([pos, count]) => ({ pos, count }));

    setPosFrequency(sortedPosFrequency);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-indigo-700">形態素解析</h2>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold mb-2 text-indigo-600">形態素解析とは？</h3>
        <p className="mb-2">形態素解析は、文章を意味を持つ最小単位（形態素）に分割し、それぞれの品詞を判別する処理です。</p>
        <p className="mb-2">日本語の自然言語処理において、形態素解析は非常に重要な役割を果たします。</p>
        <p className="mb-4">主な用途：</p>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-1">検索エンジンのインデックス作成</li>
          <li className="mb-1">文章要約</li>
          <li className="mb-1">感情分析</li>
          <li className="mb-1">機械翻訳の前処理</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-2xl font-bold mb-4 text-center text-indigo-600">形態素解析を試してみよう</h3>
        
        <div className="mb-4">
          <p className="mb-2">分析したい文を選んでください：</p>
          <div className="flex flex-col space-y-2">
            {Object.entries(sampleTexts).map(([key, text]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedText(key);
                  analyzeText(key);
                }}
                className={`px-4 py-2 rounded-full text-left ${
                  selectedText === key ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'
                }`}
              >
                {text}
              </button>
            ))}
          </div>
        </div>

        {tokens.length > 0 && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">解析結果：</h4>
            <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">単語</th>
                    <th className="px-4 py-2 text-left">品詞</th>
                  </tr>
                </thead>
                <tbody>
                  {tokens.map((token, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="px-4 py-2">{token.surface}</td>
                      <td className="px-4 py-2">{token.pos}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {posFrequency.length > 0 && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">品詞の頻度：</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={posFrequency}>
                  <XAxis dataKey="pos" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#818CF8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg shadow mb-6 flex items-start">
        <AlertCircle className="text-yellow-600 mr-2 flex-shrink-0" />
        <p>
          <span className="font-semibold">注意：</span>
          このデモでは事前に定義された結果を使用しています。実際の形態素解析では、より複雑なアルゴリズムと辞書を使用して精密な解析を行います。
        </p>
      </div>
    </div>
  );
};

export default MorphologicalAnalysis;