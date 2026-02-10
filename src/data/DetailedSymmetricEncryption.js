import React, { useState } from 'react';
import { RefreshCw, KeyRound, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function DetailedSymmetricEncryption() {
  const [originalText] = useState('Hello');
  const [key] = useState('KEY123');
  const [encryptedText, setEncryptedText] = useState('Nkrru');
  const [decryptedText, setDecryptedText] = useState('');
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // 簡単な暗号化関数（デモ用）
  const encrypt = (text, key) => {
    return text
      .split('')
      .map(char => String.fromCharCode(char.charCodeAt(0) + key.length))
      .join('');
  };

  // 簡単な復号化関数（デモ用）
  const decrypt = (text, key) => {
    return text
      .split('')
      .map(char => String.fromCharCode(char.charCodeAt(0) - key.length))
      .join('');
  };

  const steps = [
    {
      title: "準備段階",
      description: "送信者と受信者が事前に安全な方法で共通鍵を共有します。この鍵は第三者に知られてはいけません。",
      alert: "重要: 鍵の安全な共有が暗号化システムの安全性を左右します。",
    },
    {
      title: "送信者: 平文の準備",
      description: "送信者が送りたいメッセージ（平文）を用意します。",
      alert: "この時点では、データはまだ保護されていません。",
    },
    {
      title: "送信者: 暗号化アルゴリズムの適用",
      description: "共通鍵を使って、暗号化アルゴリズムにより平文を暗号文に変換します。",
      alert: "暗号化により、第三者はメッセージを読むことができなくなります。",
    },
    {
      title: "暗号文の送信",
      description: "暗号化されたデータ（暗号文）をネットワーク経由で送信します。",
      alert: "暗号文は傍受されても解読できないため、安全に送信できます。",
    },
    {
      title: "受信者: 暗号文の受信",
      description: "受信者が暗号文を受け取ります。",
      alert: "この時点では、データはまだ暗号化された状態です。",
    },
    {
      title: "受信者: 復号化の準備",
      description: "受信者は共有された共通鍵を使用して復号化の準備をします。",
      alert: "正しい鍵を持っていない人は、この先の復号化ができません。",
    },
    {
      title: "受信者: 復号化の実行",
      description: "共通鍵を使って暗号文を元の平文に戻します。",
      alert: "復号化が成功すると、元のメッセージを読むことができます。",
    }
  ];

  const nextStep = () => {
    if (isAnimating || step >= steps.length - 1) return;
    setIsAnimating(true);
    
    setTimeout(() => {
      if (step === 2) {
        setEncryptedText(encrypt(originalText, key));
      } else if (step === 6) {
        setDecryptedText(decrypt(encryptedText, key));
      }
      setStep(prev => prev + 1);
      setIsAnimating(false);
    }, 1000);
  };

  const reset = () => {
    setStep(0);
    setEncryptedText('Nkrru');
    setDecryptedText('');
  };

  const getSenderStyle = () => {
    if (step < 2) return "bg-blue-100";
    if (step === 2) return "bg-yellow-100";
    return "bg-gray-100";
  };

  const getReceiverStyle = () => {
    if (step < 4) return "bg-gray-100";
    if (step > 5) return "bg-blue-100";
    return "bg-yellow-100";
  };

  return (
    <div className="p-4 md:p-6 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center text-blue-800">共通鍵暗号方式</h2>

      {/* 共通鍵暗号方式の概要説明 */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6">
        <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-blue-700">共通鍵暗号方式とは？</h3>
        <div className="space-y-3 md:space-y-4">
          <p className="text-base md:text-lg">
            共通鍵暗号方式は、<span className="font-bold text-blue-600">同じ鍵</span>を使って暗号化と復号化を行う方式です。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="bg-blue-50 p-3 md:p-4 rounded-lg">
              <h4 className="font-bold text-base md:text-lg mb-2">特徴</h4>
              <ul className="list-disc list-inside space-y-1 text-sm md:text-base">
                <li>処理が高速</li>
                <li>実装が比較的簡単</li>
                <li>暗号化・復号化に同じ鍵を使用</li>
                <li>鍵の長さが安全性に直接影響</li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 p-3 md:p-4 rounded-lg">
              <h4 className="font-bold text-base md:text-lg mb-2">注意点</h4>
              <ul className="list-disc list-inside space-y-1 text-sm md:text-base">
                <li>鍵の安全な共有が必要</li>
                <li>通信相手ごとに異なる鍵が必要</li>
                <li>鍵の管理が重要</li>
                <li>定期的な鍵の更新が推奨</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 進行状況インジケーター */}
      <div className="mb-4 md:mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-semibold">進行状況</span>
          <span className="text-sm font-semibold">{step + 1} / {steps.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* メインの可視化エリア */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
        {/* 送信者 */}
        <div className={`p-3 md:p-4 rounded-lg shadow-md transition-all duration-300 ${getSenderStyle()}`}>
          <h3 className="font-bold text-lg md:text-xl mb-2 md:mb-3">送信者</h3>
          <div className="space-y-2">
            <div className="bg-white p-2 rounded">
              <p className="text-sm md:text-base font-semibold">平文</p>
              <p className="font-mono">{originalText}</p>
            </div>
            {encryptedText && step >= 2 && (
              <div className="bg-white p-2 rounded">
                <p className="text-sm md:text-base font-semibold">暗号化済み</p>
                <p className="font-mono">{encryptedText}</p>
              </div>
            )}
          </div>
        </div>

        {/* 中央の鍵表示エリア */}
        <div className="flex flex-col items-center justify-center space-y-3 md:space-y-4 py-3 md:py-4">
          <div className={`transform transition-all duration-500 ${
            step === 0 ? 'scale-125' : 'scale-100'
          }`}>
            <KeyRound className="w-10 md:w-12 h-10 md:h-12 text-yellow-500" />
          </div>
          <div className="text-center">
            <p className="font-semibold">共通鍵</p>
            <p className="font-mono text-sm md:text-base">{key}</p>
          </div>
          {step >= 3 && step <= 4 && (
            <div className="animate-pulse">
              <ArrowRight className="w-6 md:w-8 h-6 md:h-8 text-blue-500" />
            </div>
          )}
        </div>

        {/* 受信者 */}
        <div className={`p-3 md:p-4 rounded-lg shadow-md transition-all duration-300 ${getReceiverStyle()}`}>
          <h3 className="font-bold text-lg md:text-xl mb-2 md:mb-3">受信者</h3>
          {step >= 4 && (
            <div className="space-y-3 md:space-y-4">
              <div className="bg-white p-2 rounded border-l-4 border-red-500">
                <p className="text-sm md:text-base font-semibold text-red-700">受信した暗号文</p>
                <p className="font-mono">{encryptedText}</p>
              </div>
              {step === 6 && (
                <div className="bg-white p-2 rounded border-l-4 border-green-500">
                  <p className="text-sm md:text-base font-semibold text-green-700">復号された平文</p>
                  <p className="font-mono">Hello</p>
                </div>
              )}
              {step >= 6 && decryptedText && (
                <div className="bg-green-50 p-2 rounded-lg">
                  <p className="text-sm md:text-base text-green-800">
                    正しい鍵を使用して復号化が完了しました
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 現在のステップの説明 */}
      <div className="bg-white p-3 md:p-4 rounded-lg shadow-md mb-4 md:mb-6">
        <div className="flex items-start space-x-2">
          <div className="flex-grow">
            <h4 className="font-bold text-base md:text-lg text-blue-800 mb-2">{steps[step].title}</h4>
            <p className="mb-2 text-sm md:text-base">{steps[step].description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-yellow-50 p-2 rounded">
          <AlertTriangle className="w-4 md:w-5 h-4 md:h-5 text-yellow-600" />
          <p className="text-xs md:text-sm text-yellow-800">{steps[step].alert}</p>
        </div>
      </div>

      {/* コントロールボタン */}
      <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-4">
        <button
          onClick={nextStep}
          disabled={step >= steps.length - 1 || isAnimating}
          className="px-4 md:px-6 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 disabled:bg-gray-400 transition-colors duration-300 flex items-center justify-center"
        >
          <ArrowRight className="mr-2 w-4 md:w-5 h-4 md:h-5" />
          次のステップ
        </button>
        <button
          onClick={reset}
          className="px-4 md:px-6 py-2 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center justify-center"
        >
          <RefreshCw className="mr-2 w-4 md:w-5 h-4 md:h-5" />
          最初から
        </button>
      </div>

      {/* セキュリティのポイント */}
      <div className="mt-4 md:mt-6 bg-blue-50 p-3 md:p-4 rounded-lg">
        <h4 className="font-bold text-blue-800 mb-2 flex items-center">
          <ShieldCheck className="w-4 md:w-5 h-4 md:h-5 mr-2" />
          セキュリティのポイント
        </h4>
        <ul className="list-disc list-inside space-y-1 text-xs md:text-sm">
          <li>共通鍵は送信者と受信者のみが知っている必要があります</li>
          <li>鍵の長さが長いほど、総じて安全性が高くなります</li>
          <li>定期的な鍵の更新が推奨されます</li>
          <li>暗号化アルゴリズムの選択も重要です</li>
        </ul>
      </div>
    </div>
  );
}

