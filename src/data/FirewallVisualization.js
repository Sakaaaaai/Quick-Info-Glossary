import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

const FirewallVisualization = () => {
  const [packets, setPackets] = useState([]);
  const [blockedPackets, setBlockedPackets] = useState(0);
  const [passedPackets, setPassedPackets] = useState(0);

  const generatePacket = () => {
    const types = ['安全', '不審', 'マルウェア', '正常'];
    const newPacket = {
      id: Math.random().toString(36).substr(2, 9),
      type: types[Math.floor(Math.random() * types.length)],
      position: -50,
    };
    setPackets(prevPackets => [...prevPackets, newPacket]);
  };

  useEffect(() => {
    const interval = setInterval(generatePacket, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPackets(prevPackets => 
        prevPackets.map(packet => ({
          ...packet,
          position: packet.position + 5,
        })).filter(packet => packet.position < 100)
      );
    }, 50);

    return () => clearInterval(moveInterval);
  }, []);

  useEffect(() => {
    packets.forEach(packet => {
      if (packet.position >= 50) {
        if (packet.type === '安全' || packet.type === '正常') {
          setPassedPackets(prev => prev + 1);
        } else {
          setBlockedPackets(prev => prev + 1);
        }
        setPackets(prevPackets => prevPackets.filter(p => p.id !== packet.id));
      }
    });
  }, [packets]);

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-blue-700">ファイアウォール</h2>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-blue-600">ファイアウォールとは？</h3>
        <p className="mb-2">ファイアウォールは、コンピューターネットワークのセキュリティを守る重要な防御システムです。</p>
        <p className="mb-2">インターネットとあなたのコンピューターの間に立って、通信を監視します。</p>
        <p className="mb-2">安全な通信は通し、危険な通信をブロックする役割があります。</p>
        <p>下の図で、ファイアウォールの動きを確認してみましょう！</p>
      </div>

      <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden mb-4">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-red-500"></div>
        <Shield className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500" size={64} />
        {packets.map(packet => (
          <div
            key={packet.id}
            className={`absolute top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              packet.type === '安全' || packet.type === '正常' ? 'bg-green-400' : 'bg-red-400'
            }`}
            style={{ left: `${packet.position}%` }}
          >
            {packet.type === '安全' || packet.type === '正常' ? '👍' : '🚫'}
          </div>
        ))}
      </div>

      <div className="flex justify-around mb-4">
        <div className="text-center">
          <p className="font-bold">ブロックされたパケット</p>
          <p className="text-xl text-red-500">{blockedPackets}</p>
        </div>
        <div className="text-center">
          <p className="font-bold">通過したパケット</p>
          <p className="text-xl text-green-500">{passedPackets}</p>
        </div>
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg shadow">
        <p className="font-semibold mb-2">説明：</p>
        <p>左から右へ移動するパケットは、インターネットからあなたのコンピューターへの通信を表しています。</p>
        <p>緑色のパケット（👍）は安全な通信、赤色のパケット（🚫）は危険な通信です。</p>
        <p>中央の盾がファイアウォールです。安全な通信は通過させ、危険な通信をブロックします。</p>
      </div>
    </div>
  );
};

export default FirewallVisualization;