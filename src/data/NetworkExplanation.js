import React, { useState } from 'react';
import { Laptop, Wifi, Globe, Home, Building, Phone } from 'lucide-react';

const NetworkExplanation = () => {
  const [activeTab, setActiveTab] = useState('lan');

  const NetworkDiagram = ({ type }) => {
    const isLAN = type === 'lan';
    const DeviceIcon = isLAN ? Laptop : Building;
    const ConnectorIcon = isLAN ? Wifi : Globe;

    return (
      <div className={`flex flex-col items-center justify-center ${isLAN ? 'w-full' : 'bg-white'} p-4 rounded-lg mb-4`}>
        <div className="flex items-center justify-center mb-4">
          {[...Array(isLAN ? 3 : 2)].map((_, i) => (
            <React.Fragment key={i}>
              <DeviceIcon className={`w-12 h-12 ${isLAN ? 'text-blue-500' : 'text-green-500'}`} />
              {i < (isLAN ? 2 : 1) && <ConnectorIcon className={`w-8 h-8 mx-2 ${isLAN ? 'text-blue-300' : 'text-green-300'}`} />}
            </React.Fragment>
          ))}
        </div>
        <p className="text-center font-semibold">{isLAN ? 'ローカルエリアネットワーク (LAN)' : 'ワイドエリアネットワーク (WAN)'}</p>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">LANとWAN</h2>
      
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-2xl font-bold mb-4 text-indigo-600">ネットワークの基本</h3>
        <p className="mb-4">コンピューターネットワークは、デバイス同士をつなげて情報をやり取りする仕組みです。規模や用途によって、主にLANとWANの2種類に分けられます。</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex border-b mb-4">
          <button
            className={`px-4 py-2 ${activeTab === 'lan' ? 'border-b-2 border-indigo-500 text-indigo-700' : 'text-gray-500'}`}
            onClick={() => setActiveTab('lan')}
          >
            LAN
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'wan' ? 'border-b-2 border-indigo-500 text-indigo-700' : 'text-gray-500'}`}
            onClick={() => setActiveTab('wan')}
          >
            WAN
          </button>
        </div>
        
        {activeTab === 'lan' ? (
          <div>
            <h4 className="text-xl font-semibold mb-3 text-indigo-600">LAN (Local Area Network)</h4>
            <NetworkDiagram type="lan" />
            <p className="mb-3">LANは、限られた範囲内でデバイスをつなぐネットワークです。主な特徴：</p>
            <ul className="list-disc list-inside mb-4">
              <li className="mb-2">比較的狭い範囲（建物内や同一敷地内）</li>
              <li className="mb-2">高速なデータ転送</li>
              <li className="mb-2">一般的に単一の組織が管理</li>
            </ul>
            <p className="mb-4">身近な例：</p>
            <div className="flex items-center mb-2">
              <Home className="w-6 h-6 mr-2 text-blue-500" />
              <span>家庭内のWi-Fiネットワーク</span>
            </div>
            <div className="flex items-center">
              <Building className="w-6 h-6 mr-2 text-blue-500" />
              <span>学校や会社内のネットワーク</span>
            </div>
          </div>
        ) : (
          <div>
            <h4 className="text-xl font-semibold mb-3 text-indigo-600">WAN (Wide Area Network)</h4>
            <NetworkDiagram type="wan" />
            <p className="mb-3">WANは、広範囲にわたってLANやその他のネットワークを接続するネットワークです。主な特徴：</p>
            <ul className="list-disc list-inside mb-4">
              <li className="mb-2">広い地理的範囲（都市間、国家間、世界規模）</li>
              <li className="mb-2">LANと比べて一般的に速度が遅い</li>
              <li className="mb-2">複数の組織や通信事業者が管理</li>
            </ul>
            <p className="mb-4">身近な例：</p>
            <div className="flex items-center mb-2">
              <Globe className="w-6 h-6 mr-2 text-green-500" />
              <span>インターネット（世界最大のWAN）</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-6 h-6 mr-2 text-green-500" />
              <span>携帯電話ネットワーク</span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-2xl font-bold mb-4 text-indigo-600">LANとWANの比較</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-indigo-100">
              <th className="border p-2">特性</th>
              <th className="border p-2">LAN</th>
              <th className="border p-2">WAN</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 font-semibold">範囲</td>
              <td className="border p-2">狭い（建物内や敷地内）</td>
              <td className="border p-2">広い（都市間、国家間、世界規模）</td>
            </tr>
            <tr>
              <td className="border p-2 font-semibold">速度</td>
              <td className="border p-2">高速</td>
              <td className="border p-2">LANと比べて遅い</td>
            </tr>
            <tr>
              <td className="border p-2 font-semibold">管理</td>
              <td className="border p-2">単一組織</td>
              <td className="border p-2">複数組織、通信事業者</td>
            </tr>
            <tr>
              <td className="border p-2 font-semibold">コスト</td>
              <td className="border p-2">比較的安価</td>
              <td className="border p-2">高価</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NetworkExplanation;
