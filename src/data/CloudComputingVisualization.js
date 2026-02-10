import React, { useState, useEffect } from 'react';
import { Cloud, Server, Laptop, Phone, Database, RefreshCw, ArrowRight } from 'lucide-react';

const CloudComputingVisualization = () => {
  const [step, setStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [detailText, setDetailText] = useState('');
  const [activeDevices, setActiveDevices] = useState([]);
  const [dataTransfer, setDataTransfer] = useState(false);

  useEffect(() => {
    resetDemo();
  }, []);

  const resetDemo = () => {
    setStep(0);
    setIsProcessing(false);
    setActiveDevices([]);
    setDataTransfer(false);
    setExplanation('クラウドコンピューティングの仕組みを見ていきましょう。「次のステップ」を押して開始します。');
    setDetailText('クラウドコンピューティングとは、インターネットを介して、必要なときに必要なだけITリソース（コンピュータの計算能力、データストレージ、ネットワークなど）を利用できる仕組みです。これにより、企業や個人は高価な設備を持たなくても、リソースをオンデマンドで利用し、コストを削減することができます。');
  };

  const nextStep = () => {
    setStep(prevStep => {
      const newStep = prevStep + 1;
      
      switch(newStep) {
        case 1:
          setActiveDevices(['device1']);
          setDataTransfer(true);
          setExplanation('ステップ1：デバイスからクラウドへのアクセス');
          setDetailText('ユーザーは様々なデバイス（PC、スマートフォン、タブレットなど）からインターネットを通じてクラウドサービスにアクセスできます。場所や時間を問わず、必要な時にサービスを利用できます。');
          break;
        case 2:
          setActiveDevices(['device1', 'device2', 'device3']);
          setDataTransfer(true);
          setExplanation('ステップ2：複数デバイスからの同時アクセス');
          setDetailText('多数のユーザーが同時にクラウドサービスを利用できます。各ユーザーは独立して作業でき、他のユーザーの影響を受けることなくリソースを使用できます。');
          break;
        case 3:
          setIsProcessing(true);
          setActiveDevices(['device1', 'device2', 'device3', 'server1']);
          setExplanation('ステップ3：クラウド上でのデータ処理');
          setDetailText('データの処理はクラウド上のサーバーで行われます。ユーザーのデバイスの性能に関係なく、高度な計算や処理が可能です。また、データは安全に保存され、必要な時にアクセスできます。');
          break;
        case 4:
          setActiveDevices(['device1', 'device2', 'device3', 'server1', 'server2']);
          setExplanation('ステップ4：自動スケーリング');
          setDetailText('アクセス数や処理量が増加すると、自動的にサーバーリソースが追加されます。これにより、サービスの品質を維持したまま、多くのリクエストを処理できます。ユーザーは追加リソースの準備を意識する必要がありません。');
          break;
        case 5:
          setIsProcessing(false);
          setActiveDevices(['device1', 'device2', 'device3']);
          setExplanation('ステップ5：効率的なリソース管理');
          setDetailText('使用していないリソースは自動的に解放され、必要な分だけ課金されます。これにより、コストを最適化でき、必要な時だけリソースを確保することができます。従来のオンプレミス環境と比べて、大幅なコスト削減が可能です。');
          break;
        default:
          return prevStep;
      }
      return newStep;
    });
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">クラウドコンピューティングの仕組み</h2>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">主な特徴</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <h4 className="font-bold text-blue-700">柔軟なリソース提供</h4>
            <p className="text-sm">必要な時に必要な分だけITリソースを利用可能</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <h4 className="font-bold text-purple-700">場所を問わないアクセス</h4>
            <p className="text-sm">インターネット経由で世界中どこからでもアクセス可能</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <h4 className="font-bold text-green-700">自動スケーリング</h4>
            <p className="text-sm">負荷に応じて自動的にリソースを増減</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg">
            <h4 className="font-bold text-yellow-700">従量課金制</h4>
            <p className="text-sm">使用した分だけの料金を支払う</p>
          </div>
        </div>
      </div>

      <div className="relative h-80 bg-gradient-to-b from-sky-100 to-white rounded-lg p-4 mb-6">
        {/* Cloud Platform */}
        <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 
          ${isProcessing ? 'animate-pulse text-blue-500' : 'text-gray-400'}`}>
          <Cloud size={80} />
        </div>

        {/* Data Transfer Animations */}
        {dataTransfer && activeDevices.map(device => (
          <div key={`transfer-${device}`} className="absolute inset-0">
            <div className="w-1 h-1 bg-blue-500 animate-ping" 
                 style={{
                   left: device === 'device1' ? '20%' : device === 'device2' ? '50%' : '80%',
                   top: '70%'
                 }} />
          </div>
        ))}

        {/* Servers */}
        <div className="absolute top-28 left-1/2 transform -translate-x-1/2 flex gap-8">
          <div className={`transition-all duration-300 ${
            activeDevices.includes('server1') ? 'text-green-500 animate-pulse' : 'text-gray-300'
          }`}>
            <Server size={40} />
            <p className="text-xs text-center mt-1">サーバー1</p>
          </div>
          <div className={`transition-all duration-300 ${
            activeDevices.includes('server2') ? 'text-green-500 animate-pulse' : 'text-gray-300'
          }`}>
            <Server size={40} />
            <p className="text-xs text-center mt-1">サーバー2</p>
          </div>
        </div>

        {/* Database */}
        <div className={`absolute bottom-16 left-1/2 transform -translate-x-1/2 
          ${isProcessing ? 'text-blue-500' : 'text-gray-400'}`}>
          <Database size={40} />
          <p className="text-xs text-center mt-1">データベース</p>
        </div>

        {/* Devices */}
        <div className="absolute bottom-4 w-full flex justify-between px-12">
          <div className={`text-center transition-all duration-300 ${
            activeDevices.includes('device1') ? 'text-blue-500 transform scale-110' : 'text-gray-300'
          }`}>
            <Laptop size={32} />
            <p className="text-xs">PC</p>
          </div>
          <div className={`text-center transition-all duration-300 ${
            activeDevices.includes('device2') ? 'text-blue-500 transform scale-110' : 'text-gray-300'
          }`}>
            <Phone size={32} />
            <p className="text-xs">スマートフォン</p>
          </div>
          <div className={`text-center transition-all duration-300 ${
            activeDevices.includes('device3') ? 'text-blue-500 transform scale-110' : 'text-gray-300'
          }`}>
            <Laptop size={32} />
            <p className="text-xs">タブレット</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h4 className="text-lg font-bold text-indigo-600 mb-2">{explanation}</h4>
        <p className="text-gray-700">{detailText}</p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg shadow mb-6">
        <p className="text-sm text-gray-600">ステップ: {step} / 5</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(step / 5) * 100}%` }}></div>
        </div>
      </div>

      <div className="flex justify-center gap-2 sm:gap-4">
        <button
          onClick={nextStep}
          disabled={step >= 5}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-blue-600 disabled:bg-gray-400 transition-colors duration-300 flex items-center"
        >
          次のステップ
          <ArrowRight className="ml-2" size={20} />
        </button>
        <button
          onClick={resetDemo}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center"
        >
          <RefreshCw className="mr-2" />
          最初から
        </button>
      </div>
    </div>
  );
};

export default CloudComputingVisualization;
