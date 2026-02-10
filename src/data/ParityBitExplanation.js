import React, { useState } from 'react';
import { AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

const ParityBitExplanation = () => {
  const [binaryInput, setBinaryInput] = useState('');
  const [parityType, setParityType] = useState('even');
  const [showExplanation, setShowExplanation] = useState(false);
  const [showCheckExplanation, setShowCheckExplanation] = useState(false);

  const calculateParity = (binary, type) => {
    const oneCount = binary.split('').filter(bit => bit === '1').length;
    return type === 'even' ? oneCount % 2 === 0 : oneCount % 2 !== 0;
  };

  const addParityBit = (binary, type) => {
    const parity = calculateParity(binary, type);
    return parity ? binary + '0' : binary + '1';
  };

  const checkParity = (binary, type) => {
    return calculateParity(binary, type);
  };

  const handleInputChange = (e) => {
    const input = e.target.value.replace(/[^01]/g, '');
    setBinaryInput(input);
  };

  const handleParityTypeChange = (e) => {
    setParityType(e.target.value);
  };

  const binaryWithParity = addParityBit(binaryInput, parityType);
  const isParityCorrect = checkParity(binaryWithParity, parityType);

  const renderBinaryWithHighlight = (binary) => {
    return binary.split('').map((bit, index) => (
      <span
        key={index}
        className={index === binary.length - 1 ? "text-red-500 font-bold" : ""}
      >
        {bit}
      </span>
    ));
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-indigo-700">パリティビットについて</h2>
      
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold mb-2 text-indigo-600">パリティビットとは？</h3>
        <p className="mb-2">パリティビットは、データ転送中のエラーを検出するために使用される簡単な方法です。</p>
        <p className="mb-2">バイナリデータの末尾に1ビット追加し、1の数が偶数（偶数パリティ）または奇数（奇数パリティ）になるようにします。</p>
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
        >
          {showExplanation ? '説明を隠す' : 'もっと詳しく'}
        </button>
        {showExplanation && (
          <div className="mt-2 p-4 bg-indigo-50 rounded-lg">
            <p className="mb-2">1. 送信側がデータにパリティビットを追加します。</p>
            <p className="mb-2">2. 受信側がデータを受け取り、パリティをチェックします。</p>
            <p className="mb-2">3. パリティが一致しない場合、データ転送中にエラーが発生した可能性があります。</p>
            <p>注意：パリティビットは単一ビットのエラーのみを検出でき、複数ビットのエラーは検出できない場合があります。</p>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold mb-4 text-indigo-600">パリティビットを体験してみよう</h3>
        <div className="mb-4">
          <label htmlFor="binaryInput" className="block text-sm font-medium text-gray-700 mb-2">
            バイナリデータを入力（0と1のみ）：
          </label>
          <input
            type="text"
            id="binaryInput"
            value={binaryInput}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="例：1011"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            パリティタイプを選択：
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="even"
                checked={parityType === 'even'}
                onChange={handleParityTypeChange}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">偶数パリティ</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="odd"
                checked={parityType === 'odd'}
                onChange={handleParityTypeChange}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">奇数パリティ</span>
            </label>
          </div>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p className="font-semibold">パリティビット付きのデータ：</p>
          <p className="text-2xl font-mono">{binaryWithParity}</p>
          <p className="text-sm text-gray-600 mt-1">
            （末尾の{binaryWithParity.slice(-1)}がパリティビットです）
          </p>
        </div>

        <div className="flex items-center">
          {isParityCorrect ? (
            <CheckCircle className="text-green-500 mr-2" size={24} />
          ) : (
            <AlertCircle className="text-red-500 mr-2" size={24} />
          )}
          <p className={isParityCorrect ? "text-green-700" : "text-red-700"}>
            {isParityCorrect
              ? "パリティチェックOK：エラーは検出されませんでした。"
              : "パリティエラー：データ転送中にエラーが発生した可能性があります。"}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold mb-4 text-indigo-600">パリティチェックの仕組み</h3>
        <button
          onClick={() => setShowCheckExplanation(!showCheckExplanation)}
          className="mb-4 text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
        >
          {showCheckExplanation ? 'パリティチェックの説明を隠す' : 'パリティチェックの説明を表示'}
        </button>
        {showCheckExplanation && (
          <div className="mt-2 p-4 bg-indigo-50 rounded-lg">
            <h4 className="font-bold mb-2">パリティチェックのステップ：</h4>
            <ol className="list-decimal list-inside space-y-2">
              <li>受信したデータ（パリティビット含む）: <span className="font-mono">{binaryWithParity}</span></li>
              <li>1の数をカウント: {binaryWithParity.split('').filter(bit => bit === '1').length}</li>
              <li>
                パリティタイプ（{parityType === 'even' ? '偶数' : '奇数'}）に基づいてチェック:
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li>偶数パリティの場合: 1の総数が偶数になるべき</li>
                  <li>奇数パリティの場合: 1の総数が奇数になるべき</li>
                </ul>
              </li>
              <li>
                結果: {' '}
                {isParityCorrect ? (
                  <span className="text-green-600 font-bold">パリティチェックOK</span>
                ) : (
                  <span className="text-red-600 font-bold">パリティエラー</span>
                )}
              </li>
            </ol>
            <div className="mt-4">
              <p className="font-bold mb-2">計算過程：</p>
              <div className="flex items-center space-x-2">
                <span className="font-mono">{renderBinaryWithHighlight(binaryWithParity)}</span>
                <ArrowRight />
                <span>
                  1の数: {binaryWithParity.split('').filter(bit => bit === '1').length}
                  {parityType === 'even' ? (
                    binaryWithParity.split('').filter(bit => bit === '1').length % 2 === 0 ? (
                      <span className="text-green-600 ml-2">(偶数 ✓)</span>
                    ) : (
                      <span className="text-red-600 ml-2">(奇数 ✗)</span>
                    )
                  ) : (
                    binaryWithParity.split('').filter(bit => bit === '1').length % 2 !== 0 ? (
                      <span className="text-green-600 ml-2">(奇数 ✓)</span>
                    ) : (
                      <span className="text-red-600 ml-2">(偶数 ✗)</span>
                    )
                  )}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-2 text-indigo-600">パリティビットの重要ポイント</h3>
        <ul className="list-disc list-inside pl-4">
          <li className="mb-1">単純なエラー検出方法ですが、100%の検出は保証されません。</li>
          <li className="mb-1">偶数個のビットエラーは検出できない場合があります。</li>
          <li className="mb-1">より高度なエラー検出・訂正方法も存在します（例：ハミング符号、CRC）。</li>
          <li className="mb-1">現代のデータ通信では、より複雑なエラー検出・訂正方法が使用されることが多いです。</li>
        </ul>
      </div>
    </div>
  );
};

export default ParityBitExplanation;