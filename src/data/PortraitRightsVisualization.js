import React, { useState } from 'react';
import { 
  Camera, 
  UserCheck, 
  ShieldCheck, 
  AlertTriangle, 
  RefreshCw, 
  Book,
  Users,
  Building,
  CheckCircle,
  XCircle
} from 'lucide-react';

export default function Component() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentExample, setCurrentExample] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [explanation, setExplanation] = useState('具体例を見て、肖像権の保護について理解しましょう。');

  const portraitRightsOverview = {
    purpose: '肖像権は、個人の容貌・姿態を撮影・使用されない自由を保護する人格権です。個人のプライバシーと人格の尊厳を守るための重要な権利として認められています。',
    keyPoints: [
      {
        title: '保護対象',
        items: [
          '個人の容貌・姿態',
          '写真や動画での撮影・公表',
          'イラストや似顔絵での描写',
          '本人が特定できる映像表現'
        ]
      },
      {
        title: '権利制限',
        items: [
          '公共の利益に関する場合',
          '報道目的での使用',
          '芸術性が認められる場合',
          '本人の同意がある場合'
        ]
      },
      {
        title: '侵害への対応',
        items: [
          '差止請求が可能',
          '損害賠償請求が可能',
          '謝罪広告の請求が可能',
          '削除要請への対応'
        ]
      }
    ]
  };

  const examples = [
    {
      title: '街頭での撮影',
      target: ['一般人', '公共空間', '写真撮影', 'SNS投稿'],
      icon: <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />,
      protected: [
        '個人を特定できる近接撮影',
        '個人を主要な被写体とする撮影',
        '無断でのSNSへの投稿',
        'プライバシーを侵害する撮影'
      ],
      unprotected: [
        '群衆の一部としての撮影',
        '背景として写り込んだ場合',
        '公共の利益に関する報道',
        '本人の同意を得た撮影'
      ],
      explanation: '街頭での撮影では、個人のプライバシーと公共性のバランスを考慮する必要があります。特定の個人を対象とした撮影は原則として同意が必要です。'
    },
    {
      title: '著名人の撮影',
      target: ['芸能人', 'パブリシティ権', '報道', '商業利用'],
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />,
      protected: [
        'プライベート空間での撮影',
        '商業目的での無断利用',
        '私生活への過度な干渉',
        'イメージを損なう使用'
      ],
      unprotected: [
        '公の場での活動撮影',
        '報道目的での使用',
        'パブリシティ権の許諾範囲内',
        '公益性のある報道'
      ],
      explanation: '著名人であっても基本的な肖像権は保護されます。ただし、パブリシティ権や報道の自由との関係で、一般人より制限が緩和される場合があります。'
    },
    {
      title: 'イベント・集会での撮影',
      target: ['参加者', '主催者', '記録', '公開'],
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />,
      protected: [
        '参加者の個別撮影と公開',
        '想定外の用途での使用',
        '商業利用目的の撮影',
        '選択的な拒否権の無視'
      ],
      unprotected: [
        '事前告知された記録撮影',
        '全体風景としての撮影',
        '主催者による記録利用',
        '参加者の同意を得た使用'
      ],
      explanation: 'イベントでの撮影は、事前の告知と参加者の同意が重要です。記録目的の撮影であっても、個人の権利を尊重する必要があります。'
    }
  ];

  const resetExample = () => {
    setShowResult(false);
    setCurrentExample((prev) => (prev + 1) % examples.length);
    setExplanation('新しい例が設定されました。確認ボタンを押して詳細を見てみましょう。');
  };

  const checkDetails = () => {
    setShowResult(true);
    setExplanation(examples[currentExample].explanation);
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-purple-800 flex items-center justify-center gap-2">
        肖像権
      </h2>

      <div className="flex gap-2 mb-4 sm:mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 px-2 sm:px-4 rounded-t-lg font-semibold text-sm sm:text-base ${
            activeTab === 'overview'
              ? 'bg-white text-purple-700 shadow-lg'
              : 'bg-purple-200 text-purple-900'
          }`}
        >
          基本的な考え方
        </button>
        <button
          onClick={() => setActiveTab('examples')}
          className={`flex-1 py-2 px-2 sm:px-4 rounded-t-lg font-semibold text-sm sm:text-base ${
            activeTab === 'examples'
              ? 'bg-white text-purple-700 shadow-lg'
              : 'bg-purple-200 text-purple-900'
          }`}
        >
          具体例で学ぶ
        </button>
      </div>

      {activeTab === 'overview' ? (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <div className="mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-purple-800 flex items-center gap-2 mb-3">
                <Book className="text-purple-600" />
                肖像権とは
              </h3>
            </div>
            <p className="text-base sm:text-lg mb-4 bg-purple-50 p-4 rounded-lg">
              {portraitRightsOverview.purpose}
            </p>
          </div>

          {portraitRightsOverview.keyPoints.map((point, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-purple-800 flex items-center gap-2 mb-3">
                  {index === 0 ? (
                    <UserCheck className="text-purple-600" />
                  ) : index === 1 ? (
                    <ShieldCheck className="text-purple-600" />
                  ) : (
                    <AlertTriangle className="text-purple-600" />
                  )}
                  {point.title}
                </h3>
                <ul className="space-y-2">
                  {point.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="text-purple-600 flex-shrink-0" />
                      <span className="text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-purple-800 flex items-center gap-2 mb-3">
                {examples[currentExample].icon}
                {examples[currentExample].title}
              </h3>

              <div className="mb-4">
                <h4 className="text-base sm:text-lg font-bold mb-2">関連する要素：</h4>
                <div className="flex flex-wrap gap-2">
                  {examples[currentExample].target.map((item, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-1 bg-purple-200 rounded-full text-purple-800 text-xs sm:text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {showResult && (
                <div className="mt-4 sm:mt-6 space-y-4">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold mb-2 text-green-700">肖像権侵害となる例：</h4>
                    <ul className="space-y-2">
                      {examples[currentExample].protected.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-green-800"
                        >
                          <XCircle className="text-red-600 flex-shrink-0" />
                          <span className="text-sm sm:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold mb-2 text-blue-700">肖像権侵害とならない例：</h4>
                    <ul className="space-y-2">
                      {examples[currentExample].unprotected.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-blue-800"
                        >
                          <CheckCircle className="text-blue-600 flex-shrink-0" />
                          <span className="text-sm sm:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg mb-4 sm:mb-6">
            <p className="text-base sm:text-lg font-semibold text-purple-800">解説：</p>
            <p className="text-sm sm:text-base">{explanation}</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={checkDetails}
              disabled={showResult}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 text-white rounded-full text-sm sm:text-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 transition-colors duration-300"
            >
              詳細を確認
            </button>
            <button
              onClick={resetExample}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-full text-sm sm:text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
              次の例
            </button>
          </div>
        </>
      )}
    </div>
  );
}