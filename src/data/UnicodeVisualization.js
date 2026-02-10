import React, { useState } from 'react';
import { Binary } from 'lucide-react';

const UnicodeVisualization = () => {
  const [character, setCharacter] = useState('漢');
  
  const characters = [
    { char: '漢', name: '漢字', category: 'CJK統合漢字', range: '4E00-9FFF' },
    { char: 'あ', name: 'ひらがな', category: 'ひらがな', range: '3040-309F' },
    { char: 'ア', name: 'カタカナ', category: 'カタカナ', range: '30A0-30FF' },
    { char: 'A', name: 'Latin A', category: 'ラテン文字', range: '0000-007F' },
    { char: '😊', name: 'Smiling Face', category: '絵文字', range: '1F300-1F9FF' }
  ];

  const getCharDetails = (char) => {
    const codePoint = char.codePointAt(0);
    const utf16 = char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0');
    const binary = codePoint.toString(2).padStart(16, '0');
    const utf8 = encodeURIComponent(char).replace(/%/g, '').toUpperCase();
    const blocks = utf8.match(/.{1,2}/g) || [];
    const utf8Binary = blocks.map(hex => parseInt(hex, 16).toString(2).padStart(8, '0'));
    
    return { char, codePoint, utf16, binary, utf8, utf8Binary };
  };

  const details = getCharDetails(character);
  const selectedCharInfo = characters.find(c => c.char === character);

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">ユニコード</h2>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-2xl font-bold mb-4 text-indigo-600 flex items-center gap-2">
          ユニコードとは
        </h3>
        <div className="space-y-4">
          <p className="text-lg">
            ユニコードは、世界中のすべての文字を<span className="font-semibold">統一的に扱う</span>ための文字コード規格です。
            各文字には固有の<span className="font-semibold">コードポイント</span>が割り当てられており、
            これを様々な方式（UTF-8、UTF-16、UTF-32）でエンコードして使用します。
          </p>
          
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="font-bold mb-2">エンコーディング方式：</h4>
            <ul className="space-y-2">
              <li><span className="font-semibold">UTF-8:</span> 可変長エンコーディング（1〜4バイト）</li>
              <li><span className="font-semibold">UTF-16:</span> 16ビット単位のエンコーディング</li>
              <li><span className="font-semibold">UTF-32:</span> 32ビット固定長エンコーディング</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col justify-center">
            <div className="text-center mb-6">
              <div className="text-9xl mb-4">{character}</div>
              <div className="text-xl font-bold text-indigo-600">
                {selectedCharInfo?.name} ({selectedCharInfo?.category})
              </div>
              <div className="text-sm text-gray-600">
                Unicode範囲: {selectedCharInfo?.range}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {characters.map(({ char, name }) => (
                <button
                  key={char}
                  onClick={() => setCharacter(char)}
                  className={`px-6 py-3 rounded-lg text-2xl transition-all duration-300 ${
                    character === char 
                      ? 'bg-indigo-500 text-white' 
                      : 'bg-indigo-50 hover:bg-indigo-100'
                  }`}
                >
                  {char}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-indigo-600 flex items-center gap-2">
                <Binary className="text-indigo-400" />
                エンコーディング情報
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold mb-1">コードポイント</h4>
                  <div className="font-mono bg-white p-2 rounded border">
                    U+{details.utf16}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-1">UTF-16 (16ビット)</h4>
                  <div className="font-mono bg-white p-2 rounded border break-all">
                    {details.binary.match(/.{1,4}/g).join(' ')}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-1">UTF-8</h4>
                  <div className="font-mono bg-white p-2 rounded border">
                    {details.utf8.match(/.{1,2}/g).join(' ')}
                  </div>
                  <div className="font-mono bg-white p-2 rounded border mt-1 break-all">
                    {details.utf8Binary.join(' ')}
                  </div>
                </div>

                <div className="bg-yellow-50 p-2 rounded">
                  <h4 className="font-bold mb-1">メモリ使用量</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div>UTF-8: {details.utf8.length / 2}バイト</div>
                    <div>UTF-16: 2バイト</div>
                    <div>UTF-32: 4バイト</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnicodeVisualization;