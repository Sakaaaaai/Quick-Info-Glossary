import React, { useState } from 'react';
import { RefreshCw, ArrowRight, Laptop, Lock, Zap } from 'lucide-react';

const VLANVisualization = () => {
  const [selectedPC, setSelectedPC] = useState(null);
  const [targetPC, setTargetPC] = useState(null);
  const [step, setStep] = useState(0);
  const [explanation, setExplanation] = useState('送信元のPCをクリックして、通信を開始してください。');
  const [showIntro, setShowIntro] = useState(true);

  const vlans = [
    { 
      id: 10, 
      name: '営業部VLAN', 
      color: 'bg-blue-100',
      borderColor: 'border-blue-400',
      pcs: ['PC1', 'PC2', 'PC3'] 
    },
    { 
      id: 20, 
      name: '技術部VLAN', 
      color: 'bg-green-100',
      borderColor: 'border-green-400',
      pcs: ['PC4', 'PC5', 'PC6'] 
    },
    { 
      id: 30, 
      name: '経理部VLAN', 
      color: 'bg-yellow-100',
      borderColor: 'border-yellow-400',
      pcs: ['PC7', 'PC8', 'PC9'] 
    }
  ];

  const handlePCClick = (vlanId, pc) => {
    if (!selectedPC) {
      setSelectedPC({ vlanId, pc });
      setStep(1);
      setExplanation('宛先のPCをクリックして、通信を試してみましょう。');
    } else if (step === 1) {
      setTargetPC({ vlanId, pc });
      setStep(2);
      if (selectedPC.vlanId === vlanId) {
        setExplanation(`同じVLAN内（VLAN ${vlanId}）なので、通信が可能です！「次のステップ」を押して通信を開始してください。`);
      } else {
        setExplanation(`異なるVLAN間（VLAN ${selectedPC.vlanId} → VLAN ${vlanId}）は直接通信できません。ルータを経由する必要があります。`);
      }
    }
  };

  const nextStep = () => {
    if (step === 2) {
      setStep(3);
      if (selectedPC.vlanId === targetPC.vlanId) {
        setExplanation('同じVLAN内のため、パケットが正常に届きました！');
      } else {
        setExplanation('異なるVLAN間の通信はブロックされました。セキュリティが保たれています。');
      }
    }
  };

  const resetDemo = () => {
    setSelectedPC(null);
    setTargetPC(null);
    setStep(0);
    setExplanation('送信元のPCをクリックして、通信を開始してください。');
  };

  const backToExplanation = () => {
    setShowIntro(true);
    resetDemo(); // デモを初期化する
  };

  const getComputerStyle = (vlanId, pc) => {
    const isSource = selectedPC?.pc === pc;
    const isTarget = targetPC?.pc === pc;
    const isSuccessful = step === 3 && isTarget && selectedPC.vlanId === vlanId;
    const isBlocked = step === 3 && isTarget && selectedPC.vlanId !== vlanId;

    return `
      w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-lg text-sm sm:text-base font-bold 
      transition-all duration-300 cursor-pointer
      ${isSource ? 'ring-4 ring-blue-500 transform scale-110 bg-blue-200' : ''}
      ${isSuccessful ? 'bg-green-400 animate-pulse' : ''}
      ${isBlocked ? 'bg-red-400' : ''}
      ${!isSource && !isTarget ? 'bg-white hover:bg-gray-100' : ''}
      ${isTarget && step < 3 ? 'ring-4 ring-purple-500' : ''}
    `;
  };

  const getVLANContainerStyle = (vlan) => `
    ${vlan.color} p-3 sm:p-4 rounded-lg border-2 ${vlan.borderColor}
    transition-all duration-300
  `;

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-indigo-700">
        VLAN
      </h2>

      {showIntro ? (
        <>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-indigo-600 flex items-center">
              VLANとは？
            </h3>
            <p className="mb-4 text-base sm:text-lg">
              VLAN（Virtual LAN）は、1つの物理的なネットワークを複数の論理的なネットワークに分割する技術です。
              部門やチームごとに独立したネットワークを作ることができます。
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
                <h4 className="font-bold text-base sm:text-lg mb-2 text-green-700 flex items-center">
                  <Zap className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  VLANのメリット
                </h4>
                <ul className="space-y-2 text-sm sm:text-base">
                  <li>✅ ネットワークの分離による安全性向上</li>
                  <li>✅ ブロードキャストによる負荷軽減</li>
                  <li>✅ 柔軟なネットワーク構成</li>
                  <li>✅ コスト削減効果</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                <h4 className="font-bold text-base sm:text-lg mb-2 text-blue-700 flex items-center">
                  <Laptop className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  VLANの活用例
                </h4>
                <ul className="space-y-2 text-sm sm:text-base">
                  <li>🏢 部門別のネットワーク分離</li>
                  <li>🔒 セキュリティレベル別の分離</li>
                  <li>📱 IoTデバイスの分離</li>
                  <li>🌐 拠点間VLANの統合</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
              <h4 className="font-bold text-base sm:text-lg mb-2 text-yellow-700 flex items-center">
                <Lock className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                VLANによる通信制御
              </h4>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>• 同じVLAN内のPCは直接通信可能</li>
                <li>• 異なるVLAN間はルータを経由する必要あり</li>
                <li>• 通信制御によりセキュリティを確保</li>
              </ul>
            </div>

            <button
              onClick={() => setShowIntro(false)}
              className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-indigo-500 text-white rounded-full text-base sm:text-lg font-semibold 
                hover:bg-indigo-600 transition-colors duration-300"
            >
              デモを開始する
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="mb-4 sm:mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {vlans.map((vlan) => (
                <div key={vlan.id} className={getVLANContainerStyle(vlan)}>
                  <h4 className="font-bold mb-3 sm:mb-4 text-center">
                    {vlan.name}
                    <br />
                    <span className="text-xs sm:text-sm text-gray-600">VLAN {vlan.id}</span>
                  </h4>
                  <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                    {vlan.pcs.map((pc) => (
                      <div
                        key={pc}
                        onClick={() => handlePCClick(vlan.id, pc)}
                        className={getComputerStyle(vlan.id, pc)}
                      >
                        {pc}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6">
            <p className="text-base sm:text-lg font-semibold mb-2">現在の状態：</p>
            <p className="text-sm sm:text-base">
              {selectedPC && `送信元: ${selectedPC.pc} (VLAN ${selectedPC.vlanId})`}
              {targetPC && ` → 宛先: ${targetPC.pc} (VLAN ${targetPC.vlanId})`}
            </p>
            <p className="text-sm sm:text-base">ステップ: {step}/3</p>
          </div>

          <div className="bg-yellow-100 p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6">
            <p className="text-base sm:text-lg font-semibold mb-2">説明：</p>
            <p className="whitespace-pre-line text-sm sm:text-base">{explanation}</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
          <button
              onClick={nextStep}
              disabled={step !== 2}
              className="px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base bg-blue-500 text-white rounded-lg font-semibold 
              hover:bg-blue-600 disabled:bg-gray-400 transition-colors duration-300 flex items-center"
            >
              <span className="mr-2 sm:mr-3">次のステップ</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              onClick={resetDemo}
              className="px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base bg-purple-500 text-white rounded-lg font-semibold 
              hover:bg-purple-600 transition-colors duration-300 flex items-center"
            >
              <RefreshCw className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
              <span>リセット</span>
            </button>
            <button
              onClick={backToExplanation}
              className="px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base bg-yellow-500 text-white rounded-lg font-semibold 
              hover:bg-yellow-600 transition-colors duration-300 flex items-center"
            >
              <span className="mr-2 sm:mr-3">説明に戻る</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VLANVisualization;