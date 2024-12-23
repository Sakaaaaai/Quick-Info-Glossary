import React, { useState } from 'react';
import { RefreshCw, KeyRound, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function DetailedPublicKeyEncryption() {
  const [originalText, ] = useState('Hello');
  const [publicKey, ] = useState('PUB123');
  const [privateKey, ] = useState('PRIV456');
  const [encryptedText, setEncryptedText] = useState('Nkrru');
  const [decryptedText, setDecryptedText] = useState('Hello');
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
      title: "鍵ペアの生成",
      description: "受信者が公開鍵と秘密鍵のペアを生成します。公開鍵は公開され、秘密鍵は安全に保管されます。",
      alert: "重要: 秘密鍵は絶対に他人に知られてはいけません。",
    },
    {
      title: "公開鍵の共有",
      description: "受信者が公開鍵を送信者に共有します。この鍵は公開されても問題ありません。",
      alert: "公開鍵は誰でも使用できますが、対応する秘密鍵でのみ復号化できます。",
    },
    {
      title: "送信者: 平文の準備",
      description: "送信者が送りたいメッセージ（平文）を用意します。",
      alert: "この時点では、データはまだ保護されていません。",
    },
    {
      title: "送信者: 暗号化",
      description: "送信者は受信者の公開鍵を使用してメッセージを暗号化します。",
      alert: "暗号化されたメッセージは公開鍵の所有者（受信者）のみが復号化できます。",
    },
    {
      title: "暗号文の送信",
      description: "暗号化されたデータ（暗号文）をネットワーク経由で送信します。",
      alert: "暗号文は傍受されても、秘密鍵なしでは解読できません。",
    },
    {
      title: "受信者: 暗号文の受信",
      description: "受信者が暗号文を受け取ります。",
      alert: "この時点では、データはまだ暗号化された状態です。",
    },
    {
      title: "受信者: 復号化",
      description: "受信者は自身の秘密鍵を使用して暗号文を復号化し、元の平文を取得します。",
      alert: "秘密鍵を持つ受信者のみがメッセージを読むことができます。",
    }
  ];

  const nextStep = () => {
    if (isAnimating || step >= steps.length - 1) return;
    setIsAnimating(true);
    
    setTimeout(() => {
      if (step === 3) {
        setEncryptedText(encrypt(originalText, publicKey));
      } else if (step === 6) {
        setDecryptedText(decrypt(encryptedText, privateKey));
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
    if (step < 3) return "bg-blue-100";
    if (step === 3) return "bg-yellow-100";
    return "bg-gray-100";
  };

  const getReceiverStyle = () => {
    if (step < 5) return "bg-gray-100";
    if (step > 5) return "bg-blue-100";
    return "bg-yellow-100";
  };

  return (
    <div className="p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">公開鍵暗号方式</h2>

      {/* 公開鍵暗号方式の概要説明 */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-2xl font-bold mb-4 text-blue-700">公開鍵暗号方式とは？</h3>
        <div className="space-y-4">
          <p className="text-lg">
            公開鍵暗号方式は、<span className="font-bold text-blue-600">公開鍵と秘密鍵のペア</span>を使用して暗号化と復号化を行う方式です。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-lg mb-2">特徴</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>鍵の安全な共有が不要</li>
                <li>デジタル署名が可能</li>
                <li>暗号化と復号化に異なる鍵を使用</li>
                <li>数学的に困難な問題に基づく安全性</li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-bold text-lg mb-2">注意点</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>処理速度が比較的遅い</li>
                <li>鍵のサイズが大きい</li>
                <li>秘密鍵の管理が極めて重要</li>
                <li>量子コンピュータによる攻撃に弱い可能性</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 進行状況インジケーター */}
      <div className="mb-6">
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
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* 送信者 */}
        <div className={`p-4 rounded-lg shadow-md transition-all duration-300 ${getSenderStyle()}`}>
          <h3 className="font-bold text-lg mb-3">送信者</h3>
          <div className="space-y-2">
            <div className="bg-white p-2 rounded">
              <p className="text-sm font-semibold">平文</p>
              <p className="font-mono">{originalText}</p>
            </div>
            {step >= 1 && (
              <div className="bg-white p-2 rounded">
                <p className="text-sm font-semibold">受信者の公開鍵</p>
                <p className="font-mono">{publicKey}</p>
              </div>
            )}
            {encryptedText && step >= 3 && (
              <div className="bg-white p-2 rounded">
                <p className="text-sm font-semibold">暗号化済み</p>
                <p className="font-mono">{encryptedText}</p>
              </div>
            )}
          </div>
        </div>

        {/* 中央の鍵表示エリア */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={`transform transition-all duration-500 ${
            step === 0 ? 'scale-125' : 'scale-100'
          }`}>
            <KeyRound className="w-12 h-12 text-yellow-500" />
          </div>
          <div className="text-center">
            <p className="font-semibold">公開鍵</p>
            <p className="font-mono text-sm">{publicKey}</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">秘密鍵</p>
            <p className="font-mono text-sm">{privateKey}</p>
          </div>
          {step >= 4 && step <= 5 && (
            <div className="animate-pulse">
              <ArrowRight className="w-8 h-8 text-blue-500" />
            </div>
          )}
        </div>

        {/* 受信者 */}
        <div className={`p-4 rounded-lg shadow-md transition-all duration-300 ${getReceiverStyle()}`}>
          <h3 className="font-bold text-lg mb-3">受信者</h3>
          <div className="space-y-2">
            {step >= 0 && (
              <div className="bg-white p-2 rounded">
                <p className="text-sm font-semibold">公開鍵</p>
                <p className="font-mono">{publicKey}</p>
              </div>
            )}
            {step >= 0 && (
              <div className="bg-white p-2 rounded border-l-4 border-red-500">
                <p className="text-sm font-semibold text-red-700">秘密鍵（非公開）</p>
                <p className="font-mono">{privateKey}</p>
              </div>
            )}
            {step >= 5 && (
              <div className="bg-white p-2 rounded">
                <p className="text-sm font-semibold">受信した暗号文</p>
                <p className="font-mono">{encryptedText}</p>
              </div>
            )}
            {step === 6 && (
              <div className="bg-white p-2 rounded border-l-4 border-green-500">
                <p className="text-sm font-semibold text-green-700">復号された平文</p>
                <p className="font-mono">{decryptedText}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 現在のステップの説明 */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex items-start space-x-2">
          <div className="flex-grow">
            <h4 className="font-bold text-lg text-blue-800 mb-2">{steps[step].title}</h4>
            <p className="mb-2">{steps[step].description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-yellow-50 p-2 rounded">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <p className="text-sm text-yellow-800">{steps[step].alert}</p>
        </div>
      </div>

      {/* コントロールボタン */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={nextStep}
          disabled={step >= steps.length - 1 || isAnimating}
          className="px-6 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 disabled:bg-gray-400 transition-colors duration-300 flex items-center"
        >
          <ArrowRight className="mr-2 w-4 h-4" />
          次のステップ
        </button>
        <button
          onClick={reset}
          className="px-6 py-2 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center"
        >
          <RefreshCw className="mr-2 w-4 h-4" />
          最初から
        </button>
      </div>

      {/* セキュリティのポイント */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h4 className="font-bold text-blue-800 mb-2 flex items-center">
          <ShieldCheck className="w-5 h-5 mr-2" />
          セキュリティのポイント
        </h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>秘密鍵は絶対に他人に知られてはいけません</li>
          <li>公開鍵は広く共有しても問題ありません</li>
          <li>鍵のサイズが大きいほど、一般的に安全性が高くなります</li>
          <li>量子コンピュータの発展に備えて、量子耐性のある暗号方式の研究も進んでいます</li>
        </ul>
      </div>
    </div>
  );
}

