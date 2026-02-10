import React, { useState } from 'react';
import { Server, Smartphone, ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';

const HttpVisualization = () => {
  const [step, setStep] = useState(0);
  const [animationState, setAnimationState] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('GET');
  const [selectedResource, setSelectedResource] = useState('/index.html');
  const [response, setResponse] = useState(null);

  const resources = {
    '/index.html': { content: 'ようこそ！Webサイトへ', status: 200 },
    '/about.html': { content: '私たちについて', status: 200 },
    '/notfound': { content: 'ページが見つかりません', status: 404 },
  };

  const resetSimulation = () => {
    setStep(0);
    setAnimationState('');
    setResponse(null);
  };

  const simulateRequest = () => {
    setStep(1);
    setAnimationState('request');
    
    setTimeout(() => {
      setStep(2);
      setAnimationState('response');
      
      const resource = resources[selectedResource];
      setResponse({
        status: resource ? resource.status : 404,
        content: resource ? resource.content : 'Not Found',
        headers: {
          'Content-Type': 'text/html',
          'Date': new Date().toUTCString(),
        }
      });

      setTimeout(() => {
        setStep(3);
        setAnimationState('complete');
      }, 2000);
    }, 2000);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-purple-700">HTTP</h2>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold mb-2 text-purple-600">HTTPとは？</h3>
        <p className="mb-2">HTTP（HyperText Transfer Protocol）は、WebブラウザとWebサーバー間でデータをやり取りするための約束事（プロトコル）です。</p>
        <div className="mb-4">
          <h4 className="font-bold mb-2">主なHTTPメソッド：</h4>
          <ul className="list-disc list-inside ml-4">
            <li>GET: データの取得（Webページの表示など）</li>
            <li>POST: データの送信（フォームの送信など）</li>
            <li>PUT: データの更新</li>
            <li>DELETE: データの削除</li>
          </ul>
        </div>
        <div className="mb-4">
          <h4 className="font-bold mb-2">主なステータスコード：</h4>
          <ul className="list-disc list-inside ml-4">
            <li>200: 成功</li>
            <li>404: ページが見つからない</li>
            <li>500: サーバーエラー</li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex justify-center gap-8 items-center mb-6">
          <div className="flex flex-col items-center">
            <Smartphone size={48} className="text-purple-600" />
            <p className="mt-2">クライアント</p>
          </div>

          <div className="flex-1 relative">
            {animationState === 'request' && (
              <div className="absolute top-0 left-0 w-full flex justify-center">
                <div className="bg-yellow-100 p-2 rounded-lg text-sm animate-bounce">
                  {selectedMethod} {selectedResource} HTTP/1.1
                </div>
              </div>
            )}
            {animationState === 'response' && (
              <div className="absolute bottom-0 left-0 w-full flex justify-center">
                <div className="bg-green-100 p-2 rounded-lg text-sm animate-bounce">
                  HTTP/1.1 {response?.status}
                </div>
              </div>
            )}
            <div className="flex justify-center gap-4">
              <ArrowRight size={24} className={`${animationState === 'request' ? 'text-yellow-500' : 'text-gray-300'}`} />
              <ArrowLeft size={24} className={`${animationState === 'response' ? 'text-green-500' : 'text-gray-300'}`} />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <Server size={48} className="text-blue-600" />
            <p className="mt-2">サーバー</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full sm:w-auto"
            disabled={step > 0}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>

          <select
            value={selectedResource}
            onChange={(e) => setSelectedResource(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full sm:w-auto"
            disabled={step > 0}
          >
            <option value="/index.html">/index.html</option>
            <option value="/about.html">/about.html</option>
            <option value="/notfound">/notfound</option>
          </select>

          <button
            onClick={simulateRequest}
            disabled={step > 0}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-400 w-full sm:w-auto"
          >
            リクエスト送信
          </button>

          <div className="flex justify-center w-full sm:w-auto">
            <button
              onClick={resetSimulation}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2 w-full text-center"
            >
              <RefreshCw size={20} />
              リセット
            </button>
          </div>
        </div>

        {response && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-bold mb-2">レスポンス：</h4>
            <div className="bg-white p-2 rounded border">
              <p>ステータス: {response.status}</p>
              <p>内容: {response.content}</p>
              <div className="mt-2">
                <p className="font-bold">ヘッダー:</p>
                {Object.entries(response.headers).map(([key, value]) => (
                  <p key={key} className="text-sm text-gray-600">
                    {key}: {value}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg shadow">
        <p className="font-bold mb-2">現在の状態：</p>
        {step === 0 && <p>リクエストの準備ができました。メソッドとリソースを選択して「リクエスト送信」を押してください。</p>}
        {step === 1 && <p>クライアントからサーバーにリクエストを送信中...</p>}
        {step === 2 && <p>サーバーからクライアントにレスポンスを送信中...</p>}
        {step === 3 && <p>通信が完了しました。新しいリクエストを送信する場合は「リセット」を押してください。</p>}
      </div>
    </div>
  );
};

export default HttpVisualization;
