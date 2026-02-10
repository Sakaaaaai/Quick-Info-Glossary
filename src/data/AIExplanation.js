import React from 'react';

const AIExplanation = () => {
  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">人工知能 (AI) とは?</h2>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">AIの基本</h3>
        <div className="flex items-center mb-4">
          <span className="bg-indigo-500 p-2 rounded-full text-white mr-4">💻</span>
          <p>AIは、コンピューターが人間のように学習し、問題を解決することができる技術です。</p>
        </div>
        <p className="mb-2">AIには次のような特徴があります:</p>
        <ul className="list-disc list-inside mb-4">
          <li>大量のデータを分析して知識を得る</li>
          <li>経験を積むことで自ら学習し、賢くなっていく</li>
          <li>人間のように論理的に考え、意思決定ができる</li>
        </ul>
        <p>つまり、AIは人間のように「考え」、「学習」し、「問題を解決する」ことができるのです。</p>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">AIの活用例</h3>
        <div className="flex items-center mb-4">
          <span className="bg-indigo-500 p-2 rounded-full text-white mr-4">🤖</span>
          <p>AIは様々な分野で活用されています。代表的な例は以下の通りです:</p>
        </div>
        <ul className="list-disc list-inside mb-4">
          <li>画像認識: 写真の中の物体や人物を識別</li>
          <li>音声認識: 音声を文字に変換</li>
          <li>自然言語処理: 人間の言葉を理解し、対話する</li>
          <li>医療診断: 医療画像の分析や病気の予測</li>
          <li>自動運転: 道路状況の把握と安全運転</li>
          <li>金融取引: 株価予測や不正検知</li>
        </ul>
        <p>このように、AIは私たちの生活にどんどん取り入れられ、様々な場面で活用されています。</p>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">AIの未来</h3>
        <div className="flex items-center mb-4">
          <span className="bg-indigo-500 p-2 rounded-full text-white mr-4">🔮</span>
          <p>AIはますます進化し、私たちの生活をより良いものにしていくでしょう。</p>
        </div>
        <p className="mb-2">AIの未来には以下のような可能性があります:</p>
        <ul className="list-disc list-inside mb-4">
          <li>人間の知的能力を超える「超人工知能」の登場</li>
          <li>医療、科学、教育など、あらゆる分野での大幅な効率化と進歩</li>
          <li>AIアシスタントによる日常生活の自動化</li>
          <li>AIによる新しい発見や創造的な仕事の増加</li>
        </ul>
        <p>AIはこれからも私たちの生活に大きな影響を与え続けていくでしょう。</p>
      </div>
    </div>
  );
};

export default AIExplanation;