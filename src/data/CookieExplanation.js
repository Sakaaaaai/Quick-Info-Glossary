import React, { useState } from 'react';
import { Cookie, Trash2, LogIn, LogOut } from 'lucide-react';

const CookieExplanation = () => {
  const [username, setUsername] = useState('');
  const [savedUsername, setSavedUsername] = useState('');
  const [showSavedUsername, setShowSavedUsername] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSaveCookie = () => {
    setSavedUsername(username);
    setShowSavedUsername(true);
  };

  const handleDeleteCookie = () => {
    setSavedUsername('');
    setShowSavedUsername(false);
  };

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-orange-700">クッキー</h2>
      
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold mb-2 text-orange-600">クッキーとは？</h3>
        <p className="mb-2">クッキーは、Webサイトがあなたのブラウザに保存する小さなデータの塊です。</p>
        <p className="mb-2">主に以下のような目的で使用されます：</p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li className="mb-1">ユーザーのログイン情報の記憶</li>
          <li className="mb-1">ショッピングカートの内容の保持</li>
          <li className="mb-1">ユーザーの好みや設定の保存</li>
          <li className="mb-1">Webサイトの利用状況の分析</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold mb-4 text-orange-600">クッキーの動作を体験してみよう</h3>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2">例1: ユーザー名の保存</h4>
          <p className="mb-2">多くのWebサイトは、ユーザー名をクッキーに保存して、次回のログインを簡単にします。</p>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              ユーザー名を入力：
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="例：TaroYamada"
            />
          </div>

          <div className="flex space-x-4 mb-4">
            <button
              onClick={handleSaveCookie}
              className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-300"
            >
              <Cookie className="mr-2" size={20} />
              クッキーに保存
            </button>
            <button
              onClick={handleDeleteCookie}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
            >
              <Trash2 className="mr-2" size={20} />
              クッキーを削除
            </button>
          </div>

          {showSavedUsername && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
              <p className="font-bold">クッキーに保存されたユーザー名：</p>
              <p>{savedUsername}</p>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2">例2: ショッピングカート</h4>
          <p className="mb-2">オンラインショップでは、クッキーを使ってカートの内容を保存します。これにより、ブラウザを閉じても商品が失われません。</p>
          <div className="flex space-x-2 mb-2">
            <button
              onClick={() => handleAddToCart('本')}
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              本を追加
            </button>
            <button
              onClick={() => handleAddToCart('ペン')}
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              ペンを追加
            </button>
            <button
              onClick={handleClearCart}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
            >
              カートを空に
            </button>
          </div>
          <div className="bg-gray-100 p-2 rounded-md">
            <p className="font-semibold">カートの中身：</p>
            {cartItems.length > 0 ? (
              <ul className="list-disc list-inside">
                {cartItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>カートは空です</p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2">例3: ログイン状態の管理</h4>
          <p className="mb-2">クッキーはユーザーのログイン状態を保持するのにも使用されます。これにより、ページを移動してもログイン状態が維持されます。</p>
          <div className="flex space-x-2 mb-2">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
              >
                <LogOut className="mr-2" size={20} />
                ログアウト
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
              >
                <LogIn className="mr-2" size={20} />
                ログイン
              </button>
            )}
          </div>
          <div className="bg-gray-100 p-2 rounded-md">
            <p>現在の状態: {isLoggedIn ? 'ログイン中' : 'ログアウト'}</p>
          </div>
        </div>

        <p className="text-sm text-gray-600">
          注意：この例では実際にクッキーは使用していませんが、クッキーの基本的な動作を模しています。
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-2 text-orange-600">クッキーの重要ポイント</h3>
        <ul className="list-disc list-inside pl-4">
          <li className="mb-1">クッキーはユーザーの便利さを向上させますが、プライバシーの懸念もあります。</li>
          <li className="mb-1">多くのWebサイトでは、クッキーの使用に関する同意を求められます。</li>
          <li className="mb-1">ブラウザの設定でクッキーを管理したり、削除したりすることができます。</li>
          <li className="mb-1">セキュリティの観点から、信頼できないサイトのクッキーには注意が必要です。</li>
        </ul>
      </div>
    </div>
  );
};

export default CookieExplanation;