import React, { useState } from 'react';
import { RefreshCw, Book, Music, Camera, Code } from 'lucide-react';

const CopyrightBasics = () => {
  const [step, setStep] = useState(0);
  const [selectedWork, setSelectedWork] = useState(null);
  
  const works = [
    {
      type: '文学',
      icon: Book,
      examples: ['小説', '詩', '論文'],
      requirements: ['創作性がある', '表現されている'],
      protection: ['複製権', '上演権', '翻訳権'],
      duration: '著作者の死後70年'
    },
    {
      type: '音楽',
      icon: Music,
      examples: ['作曲', '作詞', '編曲'],
      requirements: ['創作性がある', '表現されている'],
      protection: ['演奏権', '録音権', '配信権'],
      duration: '著作者の死後70年'
    },
    {
      type: '写真',
      icon: Camera,
      examples: ['写真作品', 'イラスト', '絵画'],
      requirements: ['創作性がある', '表現されている'],
      protection: ['展示権', '複製権', '公衆送信権'],
      duration: '撮影後70年'
    },
    {
      type: 'プログラム',
      icon: Code,
      examples: ['ソースコード', 'アプリ', 'ゲーム'],
      requirements: ['創作性がある', '表現されている'],
      protection: ['複製権', '改変権', '公衆送信権'],
      duration: '公表後50年'
    }
  ];

  const explanations = [
    {
      title: '著作権とは？',
      content: '著作権は、創作物を作った人の権利を守る制度です。文章、音楽、写真、プログラムなど、さまざまな創作物が対象となります。'
    },
    {
      title: '著作物の要件',
      content: '著作物として認められるためには、「創作性」があり、何らかの形で「表現」されている必要があります。アイデアや事実そのものは保護されません。'
    },
    {
      title: '著作権の種類',
      content: '著作権には、複製する権利、公開する権利、改変する権利など、様々な権利が含まれています。作品の種類によって保護される権利が異なります。'
    },
    {
      title: '保護期間',
      content: '著作権は、著作者の死後70年間（一部例外あり）保護されます。この期間が過ぎると、誰でも自由に利用できるパブリックドメインとなります。'
    }
  ];

  const nextStep = () => {
    setStep(prev => (prev < explanations.length - 1 ? prev + 1 : prev));
  };

  const resetTutorial = () => {
    setStep(0);
    setSelectedWork(null);
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-green-700">著作権</h2>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-green-600">{explanations[step].title}</h3>
        <p className="mb-4 text-lg">{explanations[step].content}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {works.map((work, index) => (
          <div
            key={index}
            onClick={() => setSelectedWork(work)}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
              selectedWork?.type === work.type
                ? 'bg-green-200 transform scale-105'
                : 'bg-white hover:bg-green-100'
            }`}
          >
            <div className="flex justify-center mb-2">
              <work.icon size={32} className="text-green-600" />
            </div>
            <h4 className="text-center font-bold">{work.type}</h4>
          </div>
        ))}
      </div>

      {selectedWork && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h4 className="text-lg font-bold mb-2">{selectedWork.type}の著作権</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-green-50 p-3 rounded">
              <h5 className="font-bold mb-2">例</h5>
              <ul className="list-disc list-inside">
                {selectedWork.examples.map((example, i) => (
                  <li key={i}>{example}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-blue-50 p-3 rounded">
              <h5 className="font-bold mb-2">保護される権利</h5>
              <ul className="list-disc list-inside">
                {selectedWork.protection.map((right, i) => (
                  <li key={i}>{right}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-purple-50 p-3 rounded">
              <h5 className="font-bold mb-2">保護期間</h5>
              <p>{selectedWork.duration}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-4">
        <button
          onClick={nextStep}
          disabled={step === explanations.length - 1}
          className="px-6 py-3 bg-green-500 text-white rounded-full text-lg font-semibold hover:bg-green-600 disabled:bg-gray-400 transition-colors duration-300"
        >
          次へ
        </button>
        <button
          onClick={resetTutorial}
          className="px-6 py-3 bg-blue-500 text-white rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors duration-300 flex items-center"
        >
          <RefreshCw className="mr-2" />
          最初から
        </button>
      </div>
    </div>
  );
};

export default CopyrightBasics;