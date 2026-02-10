import React, { useState, useEffect } from 'react';
import { Lock, Smartphone, Check} from 'lucide-react';

const TwoFactorAuthDemo = () => {
  const [step, setStep] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [explanation, setExplanation] = useState('「開始」ボタンを押して、二段階認証のデモを開始してください。');

  const stepDelay = 2000; // 各ステップの遅延時間（ミリ秒）

  const startDemo = () => {
    setStep(1);
  };

  useEffect(() => {
    let timer;
    switch(step) {
      case 1:
        setExplanation('ステップ1: ユーザー名とパスワードを入力中...');
        timer = setTimeout(() => setStep(2), stepDelay);
        break;
      case 2:
        setExplanation('ユーザー名とパスワードが確認されました。次に、スマートフォンに送信された6桁の認証コードを確認します。');
        timer = setTimeout(() => setStep(3), stepDelay);
        break;
      case 3:
        setExplanation('ステップ2: 6桁の認証コードを入力中...');
        timer = setTimeout(() => setStep(4), stepDelay);
        break;
      case 4:
        setIsAuthenticated(true);
        setExplanation('二段階認証が完了しました。ログインに成功しました！');
        break;
    　default:
    }
    return () => clearTimeout(timer);
  }, [step]);

  const resetDemo = () => {
    setStep(0);
    setIsAuthenticated(false);
    setExplanation('「開始」ボタンを押して、二段階認証のデモを開始してください。');
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">二段階認証デモ</h2>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">二段階認証とは？</h3>
        <p className="mb-2">二段階認証（2FA）は、ユーザーの身元を確認するために2つの異なる要素を使用する認証方法です。</p>
        <p className="mb-2">通常、以下の要素の組み合わせが使用されます：</p>
        <ul className="list-disc list-inside mb-2">
          <li>知識要素（パスワードなど）</li>
          <li>所有要素（スマートフォンなど）</li>
          <li>生体要素（指紋や顔認証など）</li>
        </ul>
        <p>この方法により、パスワードが漏洩しても、第三者がアカウントにアクセスすることが困難になります。</p>
      </div>

      <div className="flex justify-center items-center mb-6 space-x-4">
        <div className={`flex flex-col items-center ${step >= 1 ? 'text-blue-500' : 'text-gray-400'}`}>
          <Lock size={40} />
          <p className="mt-2">ステップ1:<br />パスワード</p>
        </div>
        <div className="flex-1 h-1 bg-gray-200">
          <div className={`h-full ${step >= 2 ? 'bg-green-500' : 'bg-gray-200'}`} style={{ width: '100%' }}></div>
        </div>
        <div className={`flex flex-col items-center ${step >= 3 ? 'text-blue-500' : 'text-gray-400'}`}>
          <Smartphone size={40} />
          <p className="mt-2">ステップ2:<br />2FAコード</p>
        </div>
        <div className="flex-1 h-1 bg-gray-200">
          <div className={`h-full ${isAuthenticated ? 'bg-green-500' : 'bg-gray-200'}`} style={{ width: '100%' }}></div>
        </div>
        <div className={`flex flex-col items-center ${isAuthenticated ? 'text-green-500' : 'text-gray-400'}`}>
          <Check size={40} />
          <p className="mt-2">認証完了</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h4 className="font-bold text-lg mb-2">認証プロセス</h4>
        <div className="space-y-2">
          <p className={step >= 1 ? 'text-black' : 'text-gray-400'}>
            1. ユーザー名とパスワードを入力 {step >= 2 && <Check className="inline text-green-500" />}
          </p>
          <p className={step >= 2 ? 'text-black' : 'text-gray-400'}>
            2. パスワードの検証 {step >= 3 && <Check className="inline text-green-500" />}
          </p>
          <p className={step >= 3 ? 'text-black' : 'text-gray-400'}>
            3. スマートフォンに2FAコードを送信 {step >= 4 && <Check className="inline text-green-500" />}
          </p>
          <p className={step >= 4 ? 'text-black' : 'text-gray-400'}>
            4. 2FAコードの検証 {isAuthenticated && <Check className="inline text-green-500" />}
          </p>
        </div>
      </div>

      {isAuthenticated && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
          <p className="font-bold">認証成功！</p>
          <p>二段階認証が完了し、アカウントにログインしました。</p>
        </div>
      )}

      <div className="bg-yellow-100 p-4 rounded-lg shadow mb-6">
        <p className="text-lg font-semibold">説明：</p>
        <p>{explanation}</p>
      </div>

      {step === 0 ? (
        <button
          onClick={startDemo}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          デモを開始
        </button>
      ) : (
        <button
          onClick={resetDemo}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          デモをリセット
        </button>
      )}
    </div>
  );
};

export default TwoFactorAuthDemo;