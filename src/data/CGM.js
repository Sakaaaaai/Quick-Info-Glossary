import React, { useState } from 'react';
import { 
  Users, MessageCircle, Share2, Heart, 
  Globe, Database, Server, Shield,
  Search, Bell, UserPlus, Hash
} from 'lucide-react';

const CGMVisualization = () => {
  const [activeSection, setActiveSection] = useState('basic');
  const [selectedFeature, setSelectedFeature] = useState(null);

  const sections = {
    basic: {
      title: 'CGM/SNSの基本的な仕組み',
      description: 'CGM（Consumer Generated Media）やSNS（Social Networking Service）は、ユーザーが自由にコンテンツを作成・共有できるプラットフォームです。',
      features: [
        {
          icon: Users,
          title: 'ユーザープロフィール',
          description: 'ユーザーの個人情報や興味関心を管理',
          details: `• プロフィール情報の管理
• アバターや背景画像の設定
• プライバシー設定の調整
• フォロワー/フォロー管理
• アカウントの認証状態`
        },
        {
          icon: MessageCircle,
          title: '投稿・コメント',
          description: 'テキスト、画像、動画などの投稿機能',
          details: `• テキスト投稿
• 画像/動画のアップロード
• ハッシュタグの付与
• 位置情報の追加
• 投稿の公開範囲設定`
        },
        {
          icon: Share2,
          title: '共有・拡散',
          description: 'コンテンツの共有や拡散の仕組み',
          details: `• リポスト/リツイート機能
• 外部への共有機能
• 引用付き共有
• DMでの共有
• 埋め込みリンクの生成`
        },
        {
          icon: Heart,
          title: 'エンゲージメント',
          description: 'いいね、リアクション、評価システム',
          details: `• いいね/お気に入り
• リアクション（絵文字等）
• 評価システム
• コメント機能
• 視聴回数のカウント`
        }
      ]
    },
    technical: {
      title: '技術的な仕組み',
      description: 'CGM/SNSを支える技術的な基盤について解説します。',
      features: [
        {
          icon: Database,
          title: 'データベース構造',
          description: 'ユーザーデータや投稿の保存管理',
          details: `• ユーザー情報のDB設計
• 投稿データの保存構造
• リレーショナルDB活用
• NoSQL DBの利用
• キャッシュシステム`
        },
        {
          icon: Server,
          title: 'サーバーアーキテクチャ',
          description: '大規模アクセスを処理するシステム',
          details: `• 負荷分散設計
• マイクロサービス構造
• CDNの活用
• キャッシュ戦略
• スケーリング方式`
        },
        {
          icon: Shield,
          title: 'セキュリティ',
          description: 'ユーザーとデータを守る仕組み',
          details: `• 認証システム
• 暗号化対策
• スパム対策
• アクセス制御
• セキュリティ監視`
        },
        {
          icon: Globe,
          title: 'API・連携',
          description: '外部サービスとの連携機能',
          details: `• REST API設計
• OAuth認証
• Webhooks
• SDKの提供
• API制限管理`
        }
      ]
    },
    social: {
      title: 'ソーシャル機能',
      description: 'ユーザー同士のつながりを促進する機能について解説します。',
      features: [
        {
          icon: UserPlus,
          title: 'フォロー関係',
          description: 'ユーザー間のつながりを管理',
          details: `• フォロー/フォロワー
• 相互フォロー
• フォロー推奨
• ブロック機能
• ミュート機能`
        },
        {
          icon: Hash,
          title: 'トレンド機能',
          description: '話題のコンテンツを表示',
          details: `• トレンドトピック
• 人気の投稿
• 注目のハッシュタグ
• 急上昇ワード
• カスタマイズ表示`
        },
        {
          icon: Bell,
          title: '通知システム',
          description: 'アクティビティの通知管理',
          details: `• プッシュ通知
• メール通知
• アプリ内通知
• 通知設定
• 重要度の判定`
        },
        {
          icon: Search,
          title: '検索・発見',
          description: 'コンテンツの検索と推薦',
          details: `• キーワード検索
• 高度な検索機能
• コンテンツ推薦
• ユーザー推薦
• トレンド表示`
        }
      ]
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        CGM/SNSの仕組み解説
      </h2>

      {/* 導入部分 */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-2xl font-bold mb-4 text-indigo-600">CGM/SNSとは？</h3>
        <p className="mb-4">
          CGM（Consumer Generated Media）やSNS（Social Networking Service）は、
          ユーザーが主体となってコンテンツを生成し、共有するプラットフォームです。
        </p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-bold mb-2">主な特徴：</h4>
          <ul className="list-disc list-inside space-y-2">
            <li>ユーザーが自由にコンテンツを作成・共有可能</li>
            <li>双方向のコミュニケーションが可能</li>
            <li>リアルタイムな情報の発信と受信</li>
            <li>コミュニティの形成とネットワーキング</li>
          </ul>
        </div>
      </div>

      {/* セクション切り替えタブ */}
      <div className="flex mb-6 bg-white rounded-lg p-2 shadow">
        {Object.keys(sections).map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300
              ${activeSection === section 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-blue-100'}`}
          >
            {sections[section].title}
          </button>
        ))}
      </div>

      {/* メインコンテンツ */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold mb-4 text-indigo-600">
          {sections[activeSection].title}
        </h3>
        <p className="mb-6">{sections[activeSection].description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections[activeSection].features.map((feature, index) => (
            <div
              key={index}
              onClick={() => setSelectedFeature(feature)}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-300
                ${selectedFeature === feature 
                  ? 'bg-blue-500 text-white ring-2 ring-blue-300' 
                  : 'bg-gray-50 hover:bg-blue-100'}`}
            >
              <div className="flex items-center mb-2">
                <feature.icon className="mr-2" size={24} />
                <h4 className="font-bold">{feature.title}</h4>
              </div>
              <p className="text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 詳細説明 */}
      {selectedFeature && (
        <div className="bg-yellow-50 p-6 rounded-lg shadow mb-6">
          <h4 className="text-xl font-bold mb-4 flex items-center">
            <selectedFeature.icon className="mr-2" size={24} />
            {selectedFeature.title}の詳細
          </h4>
          <pre className="whitespace-pre-wrap font-mono text-sm bg-white p-4 rounded-lg">
            {selectedFeature.details}
          </pre>
        </div>
      )}

      {/* 補足情報 */}
      <div className="bg-gray-50 p-4 rounded-lg text-sm">
        <p className="font-bold mb-2">💡 補足情報：</p>
        <p>各機能をクリックすると、より詳細な説明が表示されます。</p>
        <p>タブを切り替えることで、異なる観点からCGM/SNSの仕組みを理解できます。</p>
      </div>
    </div>
  );
};

export default CGMVisualization;