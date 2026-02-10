import React, { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const IPAddressExplanation = () => {
  const [ipv4Input, setIpv4Input] = useState('');
  const [ipv4Valid, setIpv4Valid] = useState(null);
  const [activeTab, setActiveTab] = useState('ipv4');

  const validateIPv4 = (ip) => {
    const pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!pattern.test(ip)) return false;
    return ip.split('.').every(part => parseInt(part) >= 0 && parseInt(part) <= 255);
  };

  const handleIpv4InputChange = (e) => {
    const input = e.target.value;
    setIpv4Input(input);
    setIpv4Valid(validateIPv4(input));
  };

  return (
    <div className="p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-teal-700">IPアドレス</h2>
      
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-2xl font-bold mb-4 text-teal-600">IPアドレスの基本</h3>
        <p className="mb-4">IPアドレス（Internet Protocol address）は、インターネットに接続されたデバイスを識別するための固有の番号です。コンピューターやスマートフォン、ルーターなど、ネットワークに接続するすべてのデバイスにIPアドレスが割り当てられています。</p>
        <p className="mb-4">IPアドレスには主に2つの種類があります：</p>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-2"><span className="font-semibold">IPv4（Internet Protocol version 4）：</span> 現在最も広く使われている形式</li>
          <li className="mb-2"><span className="font-semibold">IPv6（Internet Protocol version 6）：</span> より多くのアドレスを提供する新しい形式</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex border-b mb-4">
          <button
            className={`px-4 py-2 ${activeTab === 'ipv4' ? 'border-b-2 border-teal-500 text-teal-700' : 'text-gray-500'}`}
            onClick={() => setActiveTab('ipv4')}
          >
            IPv4
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'ipv6' ? 'border-b-2 border-teal-500 text-teal-700' : 'text-gray-500'}`}
            onClick={() => setActiveTab('ipv6')}
          >
            IPv6
          </button>
        </div>
        
        {activeTab === 'ipv4' ? (
          <div>
            <h4 className="text-xl font-semibold mb-3 text-teal-600">IPv4アドレス</h4>
            <p className="mb-3">IPv4アドレスは、4つの数字（0～255）をドット（.）で区切った形式で表されます。例：<code className="bg-gray-200 px-2 py-1 rounded">192.168.1.1</code></p>
            <p className="mb-4">各部分は8ビット（1バイト）で表現され、全体で32ビットです。</p>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">IPv4アドレスを入力してみよう：</label>
              <input
                type="text"
                value={ipv4Input}
                onChange={handleIpv4InputChange}
                className="w-full p-2 border rounded"
                placeholder="例：192.168.1.1"
              />
              {ipv4Input && (
                <p className="mt-2 flex items-center">
                  {ipv4Valid ? (
                    <>
                      <CheckCircle className="text-green-500 mr-2" />
                      <span className="text-green-600">有効なIPv4アドレスです！</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="text-red-500 mr-2" />
                      <span className="text-red-600">無効なIPv4アドレスです。形式を確認してください。</span>
                    </>
                  )}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h4 className="text-xl font-semibold mb-3 text-teal-600">IPv6アドレス</h4>
            <p className="mb-3">IPv6アドレスは、8つの16ビットの16進数をコロン（:）で区切った形式で表されます。例：<code className="bg-gray-200 px-2 py-1 rounded whitespace-pre-wrap break-all">2001:0db8:85a3:0000:0000:8a2e:0370:7334</code></p>
            <p className="mb-4">IPv6は128ビットで表現され、IPv4よりもはるかに多くのアドレスを提供できます。</p>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-2xl font-bold mb-4 text-teal-600">IPアドレスの役割</h3>
        <p className="mb-4">IPアドレスには主に以下の役割があります：</p>
        <ol className="list-decimal list-inside mb-4">
          <li className="mb-2"><span className="font-semibold">デバイスの識別：</span> ネットワーク上の各デバイスを一意に識別します。</li>
          <li className="mb-2"><span className="font-semibold">通信の確立：</span> データの送受信先を特定し、適切にルーティングします。</li>
          <li className="mb-2"><span className="font-semibold">ネットワークの構造化：</span> IPアドレスの一部を使ってネットワークを構造化し、効率的な通信を可能にします。</li>
        </ol>
        <p className="mb-4">IPアドレスはインターネットの基盤となる重要な要素で、私たちが日常的に使用するウェブサイトの閲覧、メールの送受信、オンラインゲームなど、あらゆるネットワーク通信を支えています。</p>
      </div>
    </div>
  );
};

export default IPAddressExplanation;
