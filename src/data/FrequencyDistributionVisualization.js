import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';

const FrequencyDistributionVisualization = () => {
  const [data, setData] = useState([]);
  const [binSize, setBinSize] = useState(10);
  const [frequencies, setFrequencies] = useState([]);

  // Generate random dataset
  const generateData = useCallback(() => {
    // Generate 100 random numbers between 0 and 100
    const newData = Array.from(
      { length: 100 }, 
      () => Math.floor(Math.random() * 101)
    );

    setData(newData);
    setFrequencies(calculateFrequencyDistribution(newData, binSize));
  }, [binSize]); // binSizeが変わるたびにgenerateDataを再生成

  // Generate initial random data
  useEffect(() => {
    generateData();
  }, [generateData]);

  // Calculate frequency distribution
  const calculateFrequencyDistribution = (dataSet, binInterval) => {
    // Find min and max to determine bin ranges
    const min = Math.min(...dataSet);
    const max = Math.max(...dataSet);

    // Create bins
    const bins = [];
    for (let start = Math.floor(min / binInterval) * binInterval; 
         start <= Math.ceil(max / binInterval) * binInterval; 
         start += binInterval) {
      const binEnd = start + binInterval;
      const count = dataSet.filter(
        value => value >= start && value < binEnd
      ).length;

      bins.push({
        range: `${start}-${binEnd}`,
        start,
        end: binEnd,
        count
      });
    }

    return bins;
  };

  // Handle bin size change
  const handleBinSizeChange = (event) => {
    const newBinSize = parseInt(event.target.value);
    setBinSize(newBinSize);
    setFrequencies(calculateFrequencyDistribution(data, newBinSize));
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-teal-100 to-blue-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-teal-700">度数分布表</h2>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-teal-600">度数分布表とは？</h3>
        <p className="mb-2">度数分布表とは、データを特定の範囲（ビン）に分類し、その各範囲にどれだけのデータが含まれているかをまとめた表です。ビンとは、ある範囲のデータのグループのことを指し、例えば0～10、10～20のように、一定の幅を持つ範囲にデータを区切ります。</p>
        <p className="mb-2">この表を作成することで、データがどの範囲に多く存在するのか、どの範囲には少ないのかといった分布の特徴や傾向が一目でわかるようになります。例えば、ある試験の点数データにおいて、どの点数帯に多くの生徒が分布しているかを理解するのに役立ちます。</p>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold">ビンのサイズを選択:</label>
        <select 
          value={binSize} 
          onChange={handleBinSizeChange}
          className="w-full p-2 border rounded bg-white"
        >
          {[5, 10, 20, 25].map(size => (
            <option key={size} value={size}>
              {size}刻み
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="font-bold mb-2">度数分布表</h3>
          <div className="h-[300px] overflow-y-auto border rounded">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-teal-100 sticky top-0">
                  <th className="border p-2">範囲</th>
                  <th className="border p-2">度数</th>
                </tr>
              </thead>
              <tbody>
                {frequencies.map((bin, index) => (
                  <tr key={index} className={bin.count > 0 ? 'bg-teal-50' : ''}>
                    <td className="border p-2">{bin.range}</td>
                    <td className="border p-2 text-right">{bin.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold mb-2">度数分布グラフ</h3>
          <div className="h-[300px] bg-white border rounded p-2 overflow-y-auto">
            {frequencies.map((bin, index) => (
              <div 
                key={index} 
                className="flex items-center mb-1"
                title={`範囲: ${bin.range}, 度数: ${bin.count}`}
              >
                <div className="w-20 mr-2">{bin.range}</div>
                <div 
                  className="bg-teal-500 h-6 rounded" 
                  style={{ 
                    width: `${Math.min(bin.count * 3, 100)}%`,
                    opacity: bin.count > 0 ? 1 : 0.3
                  }}
                />
                <span className="ml-2 text-sm">{bin.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={generateData}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-teal-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-teal-600 transition-colors duration-300 flex items-center"
        >
          <RefreshCw className="mr-2" />
          新しいデータセットを生成
        </button>
      </div>
    </div>
  );
};

export default FrequencyDistributionVisualization;
