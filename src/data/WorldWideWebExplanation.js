import React, { useState } from 'react';
import { Globe, Server, Laptop, Code, Link, FileText } from 'lucide-react';

const WorldWideWebExplanation = () => {
  const [activeTab, setActiveTab] = useState('what');

  const TabContent = ({ children }) => (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      {children}
    </div>
  );

  const TimelineItem = ({ year, event }) => (
    <div className="flex mb-4">
      <div className="flex-shrink-0 w-24 text-right mr-4 font-bold">{year}</div>
      <div className="flex-grow">{event}</div>
    </div>
  );

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">ワールドワイドウェブ（WWW）とは？</h2>
      
      <div className="flex justify-center space-x-2 mb-6">
        {['what', 'how', 'components', 'importance'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full ${activeTab === tab ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-500'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'what' && 'WWWとは'}
            {tab === 'how' && '仕組み'}
            {tab === 'components' && '構成要素'}
            {tab === 'importance' && '重要性'}
          </button>
        ))}
      </div>

      {activeTab === 'what' && (
        <TabContent>
          <h3 className="text-2xl font-bold mb-4 text-indigo-600">WWWとは</h3>
          <p className="mb-4">ワールドワイドウェブ（WWW）は、インターネット上で情報を共有するための仕組みです。文書やイメージ、動画などのリソースにアクセスし、ハイパーリンクを通じて簡単に他のリソースに移動することができます。</p>
          <div className="flex justify-center mb-4">
            <Globe className="w-24 h-24 text-indigo-500" />
          </div>
          <h4 className="text-xl font-bold mb-2 text-indigo-600">WWWの歴史</h4>
          <TimelineItem year="1989年" event="ティム・バーナーズ＝リーがWWWを考案" />
          <TimelineItem year="1991年" event="世界初のウェブサイトが公開" />
          <TimelineItem year="1993年" event="WWWが一般に無料で公開される" />
          <TimelineItem year="1994年" event="商用利用が始まる" />
          <TimelineItem year="現在" event="数十億のウェブサイトが存在し、日常生活に不可欠" />
        </TabContent>
      )}

      {activeTab === 'how' && (
        <TabContent>
          <h3 className="text-2xl font-bold mb-4 text-indigo-600">WWWの仕組み</h3>
          <p className="mb-4">WWWは主にクライアント-サーバーモデルで動作します：</p>
          <div className="flex justify-center items-center space-x-4 mb-4">
            <Laptop className="w-16 h-16 text-blue-500" />
            <div className="text-2xl font-bold text-indigo-500">↔️</div>
            <Server className="w-16 h-16 text-green-500" />
          </div>
          <ol className="list-decimal list-inside mb-4">
            <li className="mb-2">ユーザーがブラウザ（クライアント）でURLを入力</li>
            <li className="mb-2">ブラウザがウェブサーバーにリクエストを送信</li>
            <li className="mb-2">サーバーがリクエストを処理し、HTMLなどのデータを返送</li>
            <li className="mb-2">ブラウザがデータを解釈し、ウェブページとして表示</li>
          </ol>
          <p>この過程で、HTTP(S)プロトコルが通信に使用されます。</p>
        </TabContent>
      )}

      {activeTab === 'components' && (
        <TabContent>
          <h3 className="text-2xl font-bold mb-4 text-indigo-600">WWWの主要構成要素</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <Code className="w-12 h-12 text-blue-500 mb-2" />
              <h4 className="text-lg font-bold mb-2">HTML</h4>
              <p>ウェブページの構造と内容を定義するマークアップ言語</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <Link className="w-12 h-12 text-green-500 mb-2" />
              <h4 className="text-lg font-bold mb-2">URL</h4>
              <p>ウェブ上のリソースを一意に識別するアドレス</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <FileText className="w-12 h-12 text-yellow-500 mb-2" />
              <h4 className="text-lg font-bold mb-2">HTTP</h4>
              <p>クライアントとサーバー間の通信プロトコル</p>
            </div>
          </div>
        </TabContent>
      )}

      {activeTab === 'importance' && (
        <TabContent>
          <h3 className="text-2xl font-bold mb-4 text-indigo-600">WWWの重要性</h3>
          <p className="mb-4">WWWは現代社会に大きな影響を与えています：</p>
          <ul className="list-disc list-inside mb-4">
            <li className="mb-2">情報へのアクセスが容易に</li>
            <li className="mb-2">グローバルなコミュニケーションの促進</li>
            <li className="mb-2">eコマースの発展</li>
            <li className="mb-2">教育や研究の新しい形態</li>
            <li className="mb-2">エンターテイメントの多様化</li>
          </ul>
          <p>WWWは私たちの生活のあらゆる面に浸透し、情報社会の基盤となっています。</p>
        </TabContent>
      )}

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-2xl font-bold mb-4 text-indigo-600">WWWとインターネットの違い</h3>
        <p className="mb-4">WWWとインターネットは密接に関連していますが、同じものではありません：</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h4 className="text-lg font-bold mb-2">インターネット</h4>
            <p>世界中のコンピューターネットワークを相互接続する巨大なネットワーク</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h4 className="text-lg font-bold mb-2">WWW</h4>
            <p>インターネット上で動作する情報共有システムの一つ</p>
          </div>
        </div>
        <p className="mt-4">つまり、WWWはインターネットを利用したサービスの一つであり、インターネットの一部です。</p>
      </div>
    </div>
  );
};

export default WorldWideWebExplanation;