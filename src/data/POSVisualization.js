import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, CreditCard, Printer, Database, Clock, BarChart } from 'lucide-react';

const POSVisualization = () => {
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState(0);
  const [explanation, setExplanation] = useState('商品をスキャンして取引を開始しましょう。');
  const [receipt, setReceipt] = useState(false);

  const products = [
    { id: 1, name: 'りんご', price: 198, barcode: 'F001' },
    { id: 2, name: 'パン', price: 168, barcode: 'B001' },
    { id: 3, name: '牛乳', price: 238, barcode: 'D001' },
    { id: 4, name: 'お茶', price: 158, barcode: 'D002' }
  ];

  const posFeatures = [
    {
      icon: <ShoppingCart size={24} />,
      title: '販売管理',
      description: '商品のスキャン、価格計算、支払い処理など、販売に関する一連の処理を行います。'
    },
    {
      icon: <Database size={24} />,
      title: '在庫管理',
      description: '商品の入出荷、在庫数の把握、発注のタイミング管理などを自動化します。'
    },
    {
      icon: <BarChart size={24} />,
      title: '売上分析',
      description: '日次・月次の売上レポート、商品別の販売動向、時間帯別の売上分析などを提供します。'
    },
    {
      icon: <Clock size={24} />,
      title: 'リアルタイム処理',
      description: '取引データをリアルタイムで記録・更新し、常に最新の情報を維持します。'
    }
  ];

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setExplanation(`${product.name}をカートに追加しました。`);
  };

  const removeFromCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem.quantity === 1) {
      setCart(cart.filter(item => item.id !== product.id));
    } else {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ));
    }
    setExplanation(`${product.name}の数量を減らしました。`);
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handlePayment = () => {
    setStep(1);
    setExplanation('お支払い処理を行います。');
  };

  const completeTransaction = () => {
    setStep(2);
    setReceipt(true);
    setExplanation('取引が完了しました。レシートを印刷します。');
  };

  const resetTransaction = () => {
    setCart([]);
    setStep(0);
    setReceipt(false);
    setExplanation('商品をスキャンして新しい取引を開始しましょう。');
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-green-700">POSシステム</h2>

      {/* POSシステムの説明セクション */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <p className="text-lg mb-4">
          POSシステム（Point Of Sales System）は、販売時点情報管理システムのことです。
          商品が販売される際にリアルタイムで情報を記録し、販売管理や在庫管理、顧客管理などを効率的に行うためのシステムです。
        </p>
        
        <h3 className="text-xl font-bold mb-4 text-green-700">POSシステムの主な機能</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {posFeatures.map((feature, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="text-green-600">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-bold mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-bold mb-4 text-green-700">POSシステムのメリット</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-bold mb-2">業務効率の向上</h4>
            <ul className="list-disc list-inside text-sm text-gray-600">
              <li>手作業での計算が不要</li>
              <li>レジ締めの時間短縮</li>
              <li>人為的ミスの防止</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-bold mb-2">在庫管理の最適化</h4>
            <ul className="list-disc list-inside text-sm text-gray-600">
              <li>リアルタイムの在庫把握</li>
              <li>適切な発注タイミング</li>
              <li>在庫ロスの削減</li>
            </ul>
          </div>
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-green-700">POSシステムを体験してみよう</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* 商品リスト */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="border-b pb-2 mb-4">
            <h3 className="text-lg font-bold">商品一覧</h3>
          </div>
          <div className="space-y-2">
            {products.map((product) => (
              <div key={product.id} className="flex justify-between items-center p-2 bg-gray-100 rounded">
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-gray-600">バーコード: {product.barcode}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{product.price}円</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={step > 0}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* カート */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="border-b pb-2 mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <ShoppingCart size={20} />
              カート
            </h3>
          </div>
          {cart.length > 0 ? (
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-2 bg-gray-100 rounded">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm">単価: {item.price}円 × {item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{item.price * item.quantity}円</span>
                    <button
                      onClick={() => removeFromCart(item)}
                      className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                      disabled={step > 0}
                    >
                      <Minus size={16} />
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-4 p-2 bg-green-100 rounded">
                <p className="text-xl font-bold">合計: {getTotal()}円</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">カートは空です</p>
          )}
        </div>
      </div>

      {/* 操作パネル */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <p className="text-lg font-semibold mb-2">操作手順：</p>
        <p className="mb-2">{explanation}</p>
        <div className="flex justify-center gap-4 mt-4">
          {step === 0 && cart.length > 0 && (
            <button
              onClick={handlePayment}
              className="px-6 py-3 bg-green-500 text-white rounded-full text-lg font-semibold hover:bg-green-600 flex items-center gap-2"
            >
              <CreditCard size={20} />
              支払い処理へ
            </button>
          )}
          {step === 1 && (
            <button
              onClick={completeTransaction}
              className="px-6 py-3 bg-blue-500 text-white rounded-full text-lg font-semibold hover:bg-blue-600 flex items-center gap-2"
            >
              <Printer size={20} />
              取引完了
            </button>
          )}
          {step === 2 && (
            <button
              onClick={resetTransaction}
              className="px-6 py-3 bg-purple-500 text-white rounded-full text-lg font-semibold hover:bg-purple-600"
            >
              新しい取引を開始
            </button>
          )}
        </div>
      </div>

      {/* レシート */}
      {receipt && (
        <div className="bg-white p-4 rounded-lg shadow max-w-md mx-auto font-mono text-sm">
          <div className="text-center mb-4">
            <p className="font-bold">領収書</p>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
          <div className="border-t border-b border-gray-200 py-2 mb-2">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} × {item.quantity}</span>
                <span>{item.price * item.quantity}円</span>
              </div>
            ))}
          </div>
          <div className="text-right font-bold">
            <p>合計: {getTotal()}円</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default POSVisualization;