import React, { useState } from 'react';
import { Copy, DollarSign, PenTool, Share2 } from 'lucide-react';

const CreativeCommonsVisualizer = () => {
  const [selectedRights, setSelectedRights] = useState({
    attribution: true,
    commercial: true,
    derivative: true,
    sharealike: false
  });

  const [explanation, setExplanation] = useState(
    'クリエイティブ・コモンズのライセンスを選択して、各権利の組み合わせを確認してみましょう。'
  );

  const getLicenseType = () => {
    if (!selectedRights.attribution) return 'CC0';

    let license = 'CC BY';
    if (!selectedRights.commercial) license += '-NC';
    if (!selectedRights.derivative) license += '-ND';
    else if (selectedRights.sharealike) license += '-SA';

    return license;
  };

  const getExplanation = (license) => {
    const explanations = {
      'CC0': '著作権を放棄し、パブリックドメインとして公開します。',
      'CC BY': '作品のクレジットを表示すれば、自由に利用できます。',
      'CC BY-NC': '非営利目的でのみ、作品のクレジットを表示して利用できます。',
      'CC BY-ND': '改変せずに、作品のクレジットを表示して利用できます。',
      'CC BY-SA': '作品のクレジットを表示し、改変した場合は同じライセンスで公開する必要があります。',
      'CC BY-NC-SA': '非営利目的でのみ利用でき、改変した場合は同じライセンスで公開する必要があります。',
      'CC BY-NC-ND': '非営利目的でのみ、改変せずにクレジットを表示して利用できます。'
    };

    return explanations[license] || '選択した条件に基づくライセンスです。';
  };

  const toggleRight = (right) => {
    if (right === 'attribution' && selectedRights.attribution) {
      setSelectedRights({
        attribution: false,
        commercial: false,
        derivative: false,
        sharealike: false
      });
    } else if (right === 'derivative' && !selectedRights.derivative) {
      setSelectedRights({
        ...selectedRights,
        derivative: true,
        sharealike: false
      });
    } else {
      setSelectedRights(prev => ({
        ...prev,
        [right]: !prev[right]
      }));
    }

    const newLicense = getLicenseType();
    setExplanation(getExplanation(newLicense));
  };

  const getRightColor = (right) => {
    return selectedRights[right] ? 'bg-green-500' : 'bg-gray-300';
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">
        クリエイティブ・コモンズ
      </h2>

      <div className="mb-6 p-4 bg-white rounded-lg shadow-lg">
        <div className="mb-2">
          <h3 className="text-xl sm:text-2xl text-indigo-600 font-semibold">
            ライセンスの基本
          </h3>
        </div>
        <p className="mb-4">
          クリエイティブ・コモンズ・ライセンスは、作品の利用条件を簡単に示すための仕組みです。
          以下の4つの権利の組み合わせによって、様々なライセンスを作ることができます。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <h4 className="font-bold flex items-center gap-2">
              <Copy size={20} /> 表示 (Attribution)
            </h4>
            <p className="text-sm mt-2">作品のクレジットを表示する必要があります。</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h4 className="font-bold flex items-center gap-2">
              <DollarSign size={20} /> 非営利 (NonCommercial)
            </h4>
            <p className="text-sm mt-2">営利目的での利用が制限されます。</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h4 className="font-bold flex items-center gap-2">
              <PenTool size={20} /> 改変禁止 (NoDerivatives)
            </h4>
            <p className="text-sm mt-2">作品の改変が制限されます。</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h4 className="font-bold flex items-center gap-2">
              <Share2 size={20} /> 継承 (ShareAlike)
            </h4>
            <p className="text-sm mt-2">改変した場合、同じライセンスで公開する必要があります。</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-bold mb-4 text-center">
          ライセンスをカスタマイズ
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <button
            onClick={() => toggleRight('attribution')}
            className={`p-4 rounded-lg text-white text-center transition-colors ${getRightColor('attribution')}`}
          >
            <Copy className="mx-auto mb-2" />
            表示
          </button>
          <button
            onClick={() => toggleRight('commercial')}
            className={`p-4 rounded-lg text-white text-center transition-colors ${
              !selectedRights.attribution ? 'bg-gray-300 cursor-not-allowed' :
              selectedRights.commercial ? 'bg-green-500' : 'bg-gray-300'
            }`}
            disabled={!selectedRights.attribution}
          >
            <DollarSign className="mx-auto mb-2" />
            営利利用
          </button>
          <button
            onClick={() => toggleRight('derivative')}
            className={`p-4 rounded-lg text-white text-center transition-colors ${
              !selectedRights.attribution ? 'bg-gray-300 cursor-not-allowed' :
              selectedRights.derivative ? 'bg-green-500' : 'bg-gray-300'
            }`}
            disabled={!selectedRights.attribution}
          >
            <PenTool className="mx-auto mb-2" />
            改変
          </button>
          <button
            onClick={() => toggleRight('sharealike')}
            className={`p-4 rounded-lg text-white text-center transition-colors ${
              !selectedRights.attribution || !selectedRights.derivative ? 'bg-gray-300 cursor-not-allowed' :
              selectedRights.sharealike ? 'bg-green-500' : 'bg-gray-300'
            }`}
            disabled={!selectedRights.attribution || !selectedRights.derivative}
          >
            <Share2 className="mx-auto mb-2" />
            継承
          </button>
        </div>

        <div className="bg-indigo-100 p-4 rounded-lg mb-4">
          <p className="text-xl font-bold text-center mb-2">
            選択されたライセンス: {getLicenseType()}
          </p>
          <p className="text-center">{explanation}</p>
        </div>
      </div>
    </div>
  );
};

export default CreativeCommonsVisualizer;
