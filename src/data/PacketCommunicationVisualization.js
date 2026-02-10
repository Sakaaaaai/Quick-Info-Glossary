import React, { useState, useEffect, useMemo } from 'react';
import { RefreshCw, Send, Server, Laptop, Wifi, Package, Router } from 'lucide-react';

const PacketCommunicationVisualization = () => {
  const [step, setStep] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [packetPositions, setPacketPositions] = useState([0, 0, 0]);
  const [showPackets, setShowPackets] = useState(false);

  const steps = useMemo(() => [
    {
      title: 'データの準備',
      description: 'まず、送信するデータを小さな「パケット」に分割します。各パケットには、送信元、宛先、データの一部、そして順序情報が含まれます。',
      action: () => setShowPackets(true)
    },
    {
      title: 'パケットの送信',
      description: '分割されたパケットが、送信元のコンピュータからネットワークに送出されます。パケットは独立して送信されるため、異なる経路を通る可能性があります。',
      action: () => {
        setPacketPositions([20, 10, 0]);
      }
    },
    {
      title: 'ルーターでの処理',
      description: 'パケットはルーターに到達します。ルーターは各パケットの宛先情報を読み取り、最適な経路を選択して次のルーターまたは宛先に転送します。',
      action: () => {
        setPacketPositions([60, 40, 20]);
      }
    },
    {
      title: 'ネットワーク経由の転送',
      description: 'パケットは複数のルーターを経由して転送されます。この過程で、パケットは異なる速度で移動したり、場合によっては順序が入れ替わったりすることがあります。',
      action: () => {
        setPacketPositions([90, 75, 60]);
      }
    },
    {
      title: 'パケットの受信',
      description: '宛先のコンピュータがパケットを受信します。すべてのパケットが到着するまで待機します。',
      action: () => {
        setPacketPositions([100, 100, 100]);
      }
    },
    {
      title: 'データの再構築',
      description: '受信したすべてのパケットを元の順序に並べ替え、元のデータに再構築します。これにより、送信元から送られた完全なデータが復元されます。',
      action: () => {
        setShowPackets(false);
      }
    },
  ], []);

  useEffect(() => {
    setExplanation(steps[step].description);
    steps[step].action();
  }, [step, steps]);

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const resetVisualization = () => {
    setStep(0);
    setPacketPositions([0, 0, 0]);
    setShowPackets(false);
  };

  const Packet = ({ position, color }) => (
    <div 
      className={`absolute h-6 w-6 rounded-full ${color} transition-all duration-1000 ease-in-out flex items-center justify-center`}
      style={{ left: `${position}%`, transform: `translateX(-50%)` }}
    >
      <Package size={16} className="text-white" />
    </div>
  );

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">パケット通信</h2>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">パケット通信とは？</h3>
        <p className="mb-2">パケット通信は、大きなデータを小さな「パケット」と呼ばれる単位に分割して送受信する方法です。</p>
        <p className="mb-2">インターネットやコンピュータネットワークで広く使われている技術です。</p>
        <p>この方法により、効率的で信頼性の高いデータ転送が可能になります。</p>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center text-indigo-600">{steps[step].title}</h3>
        <div className="flex justify-between items-center mb-4 relative h-24">
          <Laptop size={48} className="z-10" />
          <Router size={48} className="absolute left-1/4 transform -translate-x-1/2" />
          <Router size={48} className="absolute left-1/2 transform -translate-x-1/2" />
          <Router size={48} className="absolute left-3/4 transform -translate-x-1/2" />
          <Server size={48} className="z-10" />
          {showPackets && (
            <>
              <Packet position={packetPositions[0]} color="bg-red-500" />
              <Packet position={packetPositions[1]} color="bg-blue-500" />
              <Packet position={packetPositions[2]} color="bg-green-500" />
            </>
          )}
        </div>
        <div className="flex justify-center mb-4">
          <Wifi size={24} className="text-blue-500" />
        </div>
        <p className="text-center mb-4">{explanation}</p>
      </div>

      <div className="flex justify-center gap-2 sm:gap-4">
        <button
          onClick={nextStep}
          disabled={step === steps.length - 1}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-blue-600 disabled:bg-gray-400 transition-colors duration-300 flex items-center"
        >
          <Send className="mr-2" />
          次のステップ
        </button>
        <button
          onClick={resetVisualization}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-green-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-green-600 transition-colors duration-300 flex items-center"
        >
          <RefreshCw className="mr-2" />
          リセット
        </button>
      </div>
    </div>
  );
};

export default PacketCommunicationVisualization;
