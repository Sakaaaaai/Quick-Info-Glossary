import React from 'react';

const OverviewOfMachineLearning = () => {
  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">機械学習</h2>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">機械学習とは</h3>
        <p className="mb-4">
          機械学習は、プログラムやアルゴリズムを使って、データから自動的に学習し、新しいデータに対して予測や意思決定を行う技術です。従来のプログラミングとは異なり、機械学習では人間が明示的にルールを定義する代わりに、コンピューターが自律的に学習します。
        </p>
        <p className="mb-4">
          機械学習は、パターン認識、分類、予測、最適化などの様々な問題に適用されており、音声認識、画像認識、自然言語処理、推薦システムなど、多くのアプリケーションに活用されています。
        </p>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">機械学習のアプローチ</h3>
        <p className="mb-4">
          機械学習には主に3つのアプローチがあります:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <span className="font-semibold">教師あり学習:</span> 入力データと正解ラベルの組が用意された状態で、モデルを学習させる手法。分類や回帰などに適しています。
          </li>
          <li>
            <span className="font-semibold">教師なし学習:</span> 入力データにのみ基づいて、潜在的な構造やパターンを探索する手法。クラスタリングなどに用いられます。
          </li>
          <li>
            <span className="font-semibold">強化学習:</span> 行動と報酬の関係を学習し、最適な行動を見つける手法。ゲームや自律制御システムなどに適しています。
          </li>
        </ul>
        <p className="mb-4">
          これらのアプローチはそれぞれ特徴があり、問題に応じて使い分けられます。また、深層学習などの手法も機械学習の一分野として注目されています。
        </p>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">機械学習の応用例</h3>
        <p className="mb-4">
          機械学習は様々な分野で活用されており、代表的な応用例には以下のようなものがあります:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>画像認識: 写真や動画からオブジェクトを検出・分類</li>
          <li>音声認識: 音声を文字に変換</li>
          <li>自然言語処理: テキストの分類、要約、翻訳など</li>
          <li>医療診断支援: 医療画像の異常検出、病気予測</li>
          <li>金融: 株価予測、不正取引検知</li>
          <li>自動運転: 道路状況の認識、経路計画</li>
          <li>推薦システム: 個人に合わせた商品やコンテンツの提案</li>
        </ul>
        <p>
          このように機械学習は、様々な分野で人間の能力を超える精度や効率を実現するツールとなっています。
        </p>
      </div>
    </div>
  );
};

export default OverviewOfMachineLearning;