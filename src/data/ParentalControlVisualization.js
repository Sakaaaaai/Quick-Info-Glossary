import React, { useState } from 'react'
import { Lock, Unlock, AlertTriangle, Check, X } from 'lucide-react'

export default function ParentalControlVisualization() {
  const [contentRating, setContentRating] = useState('全年齢')
  const [isBlocked, setIsBlocked] = useState(false)
  const [selectedContent, setSelectedContent] = useState(null)

  const contents = [
    { id: 1, title: '教育アプリ', rating: '全年齢', type: '学習' },
    { id: 2, title: 'パズルゲーム', rating: '全年齢', type: 'ゲーム' },
    { id: 3, title: 'スポーツアクション', rating: '12歳以上', type: 'ゲーム' },
    { id: 4, title: 'オンラインバトル', rating: '15歳以上', type: 'ゲーム' }
  ]

  const ratingLevels = ['全年齢', '12歳以上', '15歳以上']

  const checkAccess = (content) => {
    setSelectedContent(content)
    const ratingIndex = ratingLevels.indexOf(content.rating)
    const allowedIndex = ratingLevels.indexOf(contentRating)
    setIsBlocked(ratingIndex > allowedIndex)
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-lg">
      <div className="flex items-center justify-center mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-700">
          ペアレンタルコントロール
        </h2>
      </div>

      {/* 説明セクション */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-green-700">ペアレンタルコントロールとは？</h3>
        <div className="space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base text-gray-700">
            ペアレンタルコントロールは、お子様のデジタル機器やコンテンツの利用を管理・制限するための機能です。
            主に以下のような制限が可能です：
          </p>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <h4 className="font-bold text-blue-700 mb-2">コンテンツの制限機能</h4>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1 sm:space-y-2">
                <li>年齢に応じたコンテンツフィルタリング</li>
                <li>不適切なコンテンツのブロック</li>
                <li>アプリやゲームの利用制限</li>
                <li>ウェブサイトフィルタリング</li>
                <li>課金の制限</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
              <h4 className="font-bold text-green-700 mb-2">主な利点</h4>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1 sm:space-y-2">
                <li>お子様の安全なネット利用</li>
                <li>年齢に適したコンテンツの提供</li>
                <li>有害コンテンツからの保護</li>
                <li>デジタル利用の管理支援</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* コンテンツ制限設定 */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
          <div className="flex items-center mb-3 sm:mb-4">
            <AlertTriangle className="mr-2 text-orange-600 w-5 h-5 sm:w-6 sm:h-6" />
            <h3 className="text-lg sm:text-xl font-bold text-orange-600">コンテンツ制限の設定</h3>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <label className="block mb-2 text-sm sm:text-base">年齢制限レベル:</label>
            <select
              value={contentRating}
              onChange={(e) => setContentRating(e.target.value)}
              className="w-full p-2 border rounded text-sm sm:text-base"
            >
              {ratingLevels.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              選択した年齢制限以下のコンテンツのみが利用可能になります。
            </p>
          </div>
        </div>

        {/* 制限レベルの説明 */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-blue-600">制限レベルの説明</h3>
          <div className="space-y-2 sm:space-y-3">
            <div className="p-2 bg-green-50 rounded">
              <p className="font-bold text-sm sm:text-base">全年齢</p>
              <p className="text-xs sm:text-sm text-gray-600">教育コンテンツや子供向けゲームなど</p>
            </div>
            <div className="p-2 bg-yellow-50 rounded">
              <p className="font-bold text-sm sm:text-base">12歳以上</p>
              <p className="text-xs sm:text-sm text-gray-600">軽度のアクションゲームなど</p>
            </div>
            <div className="p-2 bg-orange-50 rounded">
              <p className="font-bold text-sm sm:text-base">15歳以上</p>
              <p className="text-xs sm:text-sm text-gray-600">オンライン対戦ゲームなど</p>
            </div>
          </div>
        </div>
      </div>

      {/* コンテンツ一覧 */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-purple-600">利用可能なコンテンツ例</h3>
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          {contents.map((content) => (
            <div
              key={content.id}
              className="border p-3 sm:p-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              onClick={() => checkAccess(content)}
            >
              <h4 className="font-bold text-sm sm:text-base">{content.title}</h4>
              <p className="text-xs sm:text-sm text-gray-600">
                種類: {content.type} | 対象年齢: {content.rating}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* アクセス結果表示 */}
      {selectedContent && (
        <div className={`p-4 sm:p-6 rounded-xl shadow-lg text-center ${
          isBlocked ? 'bg-red-100' : 'bg-green-100'
        }`}>
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            {isBlocked ? (
              <>
                <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 mr-2" />
                <X className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
              </>
            ) : (
              <>
                <Unlock className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 mr-2" />
                <Check className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
              </>
            )}
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-2">
            {selectedContent.title}
          </h3>
          <p className="text-sm sm:text-base">
            {isBlocked
              ? '利用制限により、このコンテンツは現在利用できません'
              : 'このコンテンツは利用可能です'}
          </p>
        </div>
      )}
    </div>
  )
}