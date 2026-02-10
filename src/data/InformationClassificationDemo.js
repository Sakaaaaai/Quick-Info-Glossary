import React, { useState } from 'react';
import { ArrowLeftCircle, ArrowRightCircle, RefreshCw } from 'lucide-react';

const informationItems = [
  { id: 1, text: '天気予報アプリの気温データ', type: 'primary' },
  { id: 2, text: '気象庁の気候変動レポート', type: 'secondary' },
  { id: 3, text: '顧客アンケートの回答', type: 'primary' },
  { id: 4, text: 'マーケティング戦略提案書', type: 'secondary' },
  { id: 5, text: '実験室での測定結果', type: 'primary' },
  { id: 6, text: '科学論文の結論部分', type: 'secondary' },
  { id: 7, text: 'SNSの投稿データ', type: 'primary' },
  { id: 8, text: 'ソーシャルメディア分析レポート', type: 'secondary' },
  { id: 9, text: '株式市場のリアルタイム価格', type: 'primary' },
  { id: 10, text: '金融アナリストの市場予測', type: 'secondary' },
  { id: 11, text: '衛星写真', type: 'primary' },
  { id: 12, text: '地理学の教科書', type: 'secondary' },
];

export default function InformationClassificationDemo() {
  const [currentItem, setCurrentItem] = useState(0);
  const [primaryBin, setPrimaryBin] = useState([]);
  const [secondaryBin, setSecondaryBin] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [showExplanation, setShowExplanation] = useState(true);

  const classifyItem = (type) => {
    const item = informationItems[currentItem];
    if (type === item.type) {
      setFeedback('正解です！');
      if (type === 'primary') {
        setPrimaryBin([...primaryBin, item]);
      } else {
        setSecondaryBin([...secondaryBin, item]);
      }
    } else {
      setFeedback('不正解です。もう一度考えてみましょう。');
      return;
    }

    if (currentItem < informationItems.length - 1) {
      setCurrentItem(currentItem + 1);
    } else {
      setFeedback('お疲れ様でした！全ての項目を分類しました。');
    }
  };

  const resetDemo = () => {
    setCurrentItem(0);
    setPrimaryBin([]);
    setSecondaryBin([]);
    setFeedback('');
    setShowExplanation(true);
  };

  const startDemo = () => {
    setShowExplanation(false);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">一次情報と二次情報</h2>

      {showExplanation ? (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-2xl font-bold text-indigo-600 mb-4">一次情報と二次情報の説明</h3>
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-2 text-blue-600">一次情報</h4>
            <p className="mb-4">
              一次情報とは、直接的に収集された元データや原資料を指します。以下の特徴があります：
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>直接的な観察や経験から得られる</li>
              <li>オリジナルの情報源</li>
              <li>加工や解釈がされていない生のデータ</li>
              <li>研究や調査の基礎となる</li>
            </ul>
          </div>
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-2 text-purple-600">二次情報</h4>
            <p className="mb-4">
              二次情報とは、一次情報を基に分析、解釈、要約されたものです。以下の特徴があります：
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>一次情報を基に作成される</li>
              <li>解釈や分析が加えられている</li>
              <li>複数の一次情報を統合している場合がある</li>
              <li>より広い文脈や意味を提供する</li>
            </ul>
          </div>
          <button
            onClick={startDemo}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors"
          >
            デモを開始する
          </button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h3 className="text-xl font-bold mb-2 text-indigo-600">デモの説明</h3>
            <p>
              以下の情報を一次情報か二次情報に分類してください。
              一次情報は直接収集されたデータや原資料、二次情報は一次情報を基に分析や解釈されたものです。
            </p>
          </div>

          {currentItem < informationItems.length && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-2xl font-bold text-center mb-4">
                項目 {currentItem + 1} / {informationItems.length}
              </h3>
              <p className="text-xl text-center mb-6">{informationItems[currentItem].text}</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => classifyItem('primary')}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
                >
                  <ArrowLeftCircle className="mr-2" /> 一次情報
                </button>
                <button
                  onClick={() => classifyItem('secondary')}
                  className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors flex items-center"
                >
                  二次情報 <ArrowRightCircle className="ml-2" />
                </button>
              </div>
            </div>
          )}

          {feedback && (
            <div className={`p-4 rounded-lg shadow-md mb-6 ${feedback.includes('正解') ? 'bg-green-100' : 'bg-red-100'}`}>
              <p className="text-lg font-semibold">{feedback}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-xl font-bold text-blue-600 mb-2">一次情報</h3>
              <ul className="list-disc pl-5">
                {primaryBin.map((item) => (
                  <li key={item.id}>{item.text}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-xl font-bold text-purple-600 mb-2">二次情報</h3>
              <ul className="list-disc pl-5">
                {secondaryBin.map((item) => (
                  <li key={item.id}>{item.text}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={resetDemo}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center"
            >
              <RefreshCw className="mr-2" /> デモをリセット
            </button>
          </div>
        </>
      )}
    </div>
  );
}