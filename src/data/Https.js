import React, { useState } from 'react';
import { Server, Smartphone, Lock, Key, Shield, RefreshCw } from 'lucide-react';

const HttpsVisualization = () => {
  const [step, setStep] = useState(0);
  const [animationState, setAnimationState] = useState('');
  const [serverPublicKey, setServerPublicKey] = useState(null);
  const [sessionKey, setSessionKey] = useState(null);
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');

  const resetSimulation = () => {
    setStep(0);
    setAnimationState('');
    setServerPublicKey(null);
    setSessionKey(null);
    setMessage('');
    setEncryptedMessage('');
  };

  const startHandshake = () => {
    setStep(1);
    setAnimationState('clientHello');

    setTimeout(() => {
      setStep(2);
      setAnimationState('serverHello');
      setServerPublicKey('SERVER_PUBLIC_KEY_123');

      setTimeout(() => {
        setStep(3);
        setAnimationState('keyExchange');
        setSessionKey('SESSION_KEY_456');

        setTimeout(() => {
          setStep(4);
          setAnimationState('handshakeComplete');
        }, 2000);
      }, 2000);
    }, 2000);
  };

  const sendSecureMessage = () => {
    if (!message) return;

    setStep(5);
    setAnimationState('encrypting');
    setEncryptedMessage(message.split('').map(c => '*').join(''));

    setTimeout(() => {
      setStep(6);
      setAnimationState('sending');

      setTimeout(() => {
        setStep(7);
        setAnimationState('complete');
      }, 2000);
    }, 2000);
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl shadow-lg max-w-full md:max-w-2xl lg:max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-green-700">HTTPS</h2>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-green-600">HTTPSとは？</h3>
        <p className="mb-2 text-sm sm:text-base">HTTPS（HTTP Secure）は、通信を暗号化してセキュアにデータをやり取りするためのプロトコルです。</p>
        <div className="mb-4">
          <h4 className="font-bold mb-2 text-sm sm:text-base">HTTPSの主な特徴：</h4>
          <ul className="list-disc list-inside ml-4 text-sm sm:text-base">
            <li>SSL/TLS暗号化による通信の保護</li>
            <li>データの改ざん防止</li>
            <li>なりすまし防止のための証明書利用</li>
            <li>個人情報やパスワードの安全な送信</li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row justify-center gap-8 items-center mb-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <Smartphone size={48} className="text-green-600" />
              {sessionKey && <Lock size={20} className="absolute -top-2 -right-2 text-green-500" />}
            </div>
            <p className="mt-2 text-sm sm:text-base">クライアント</p>
          </div>

          <div className="flex-1 relative min-h-[100px] flex items-center justify-center">
            {animationState === 'clientHello' && (
              <div className="absolute top-0 w-full flex justify-center">
                <div className="bg-yellow-100 p-2 rounded-lg text-xs sm:text-sm animate-bounce min-w-[150px] max-w-[300px] text-center">
                  Client Hello
                </div>
              </div>
            )}
            {animationState === 'serverHello' && (
              <div className="absolute top-0 w-full flex justify-center">
                <div className="bg-green-100 p-2 rounded-lg text-xs sm:text-sm animate-bounce min-w-[150px] max-w-[300px] text-center">
                  Server Hello + 証明書
                  <Shield size={16} className="inline ml-1 text-green-600" />
                </div>
              </div>
            )}
            {animationState === 'keyExchange' && (
              <div className="absolute top-0 w-full flex justify-center">
                <div className="bg-blue-100 p-2 rounded-lg text-xs sm:text-sm animate-bounce min-w-[150px] max-w-[300px] text-center">
                  セッション鍵の交換
                  <Key size={16} className="inline ml-1 text-blue-600" />
                </div>
              </div>
            )}
            {animationState === 'encrypting' && encryptedMessage && (
              <div className="absolute top-0 w-full flex justify-center">
                <div className="bg-purple-100 p-2 rounded-lg text-xs sm:text-sm animate-bounce min-w-[150px] max-w-[300px] text-center">
                  暗号化メッセージ: {encryptedMessage}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center">
            <div className="relative">
              <Server size={48} className="text-blue-600" />
              {sessionKey && <Lock size={20} className="absolute -top-2 -right-2 text-green-500" />}
            </div>
            <p className="mt-2 text-sm sm:text-base">サーバー</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          {step === 0 && (
            <button
              onClick={startHandshake}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 w-fit mx-auto text-sm sm:text-base"
            >
              SSL/TLSハンドシェイク開始
            </button>
          )}

          {step === 4 && (
            <div className="flex gap-4 justify-center flex-col sm:flex-row">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="送信するメッセージを入力"
                className="px-4 py-2 border rounded-lg flex-1 max-w-md text-sm sm:text-base"
              />
              <button
                onClick={sendSecureMessage}
                disabled={!message}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 text-sm sm:text-base"
              >
                暗号化して送信
              </button>
            </div>
          )}

          <button
            onClick={resetSimulation}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2 w-fit mx-auto text-sm sm:text-base"
          >
            <RefreshCw size={20} />
            リセット
          </button>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-bold mb-2 text-sm sm:text-base">現在の状態：</h4>
          {step === 0 && (
            <p className="text-sm sm:text-base">SSLハンドシェイクの準備ができました。「SSL/TLSハンドシェイク開始」を押して開始してください。</p>
          )}
          {step === 1 && (
            <>
              <p className="text-sm sm:text-base">Client Hello: クライアントがサーバーに接続を要求しています...</p>
              <p className="text-xs sm:text-sm text-gray-600">対応している暗号化方式のリストを送信</p>
            </>
          )}
          {step === 2 && (
            <>
              <p className="text-sm sm:text-base">Server Hello: サーバーが証明書と公開鍵を送信しています...</p>
              <p className="text-xs sm:text-sm text-gray-600">サーバーの公開鍵: {serverPublicKey}</p>
            </>
          )}
          {step === 3 && (
            <>
              <p className="text-sm sm:text-base">セッション鍵の交換中...</p>
              <p className="text-xs sm:text-sm text-gray-600">共通のセッション鍵: {sessionKey}</p>
            </>
          )}
          {step === 4 && <p className="text-sm sm:text-base">SSL/TLSハンドシェイクが完了しました！暗号化されたメッセージを送信できます。</p>}
          {step === 5 && (
            <>
              <p className="text-sm sm:text-base">メッセージを暗号化しています...</p>
              <p className="text-xs sm:text-sm text-gray-600">メッセージ: {message}</p>
              <p className="text-xs sm:text-sm text-gray-600">暗号化メッセージ: {encryptedMessage}</p>
            </>
          )}
          {step === 6 && <p className="text-sm sm:text-base">暗号化メッセージをサーバーに送信中...</p>}
          {step === 7 && <p className="text-sm sm:text-base">メッセージが安全にサーバーに送信されました！</p>}
        </div>
      </div>
    </div>
  );
};

export default HttpsVisualization;
