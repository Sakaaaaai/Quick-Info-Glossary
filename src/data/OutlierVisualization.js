import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ReferenceLine, Tooltip, ResponsiveContainer } from 'recharts';

const OutlierVisualization = () => {
  const [data, setData] = useState([]);
  const [statistics, setStatistics] = useState({
    q1: 0,
    median: 0,
    q3: 0,
    iqr: 0,
    lowerBound: 0,
    upperBound: 0
  });
  const [explanation, setExplanation] = useState('');

  const generateData = () => {
    const normalData = Array.from({ length: 20 }, () => ({
      value: Math.round(((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) * 10 + 50),
      isOutlier: false
    }));
    
    const outliers = [
      {
        value: Math.round(Math.random() * 20 + 90),
        isOutlier: true
      },
      {
        value: Math.round(Math.random() * 20 + 5),
        isOutlier: true
      }
    ];
    
    const allData = [...normalData, ...outliers]
      .sort(() => Math.random() - 0.5);
    
    const values = allData.map(d => d.value).sort((a, b) => a - b);
    const n = values.length;
    const q1Index = Math.floor(n / 4);
    const q3Index = Math.floor(3 * n / 4);
    
    const stats = {
      q1: values[q1Index],
      median: n % 2 === 0 ? (values[n/2 - 1] + values[n/2]) / 2 : values[Math.floor(n/2)],
      q3: values[q3Index],
    };
    
    stats.iqr = stats.q3 - stats.q1;
    stats.lowerBound = stats.q1 - (1.5 * stats.iqr);
    stats.upperBound = stats.q3 + (1.5 * stats.iqr);
    
    const formattedData = allData.map((item, index) => ({
      index: index,
      value: item.value,
      isOutlier: item.value < stats.lowerBound || item.value > stats.upperBound
    }));
    
    setData(formattedData);
    setStatistics(stats);
    setExplanation('データの分布を確認してみましょう。赤い点は外れ値を示しています。');
  };

  useEffect(() => {
    generateData();
  }, []);

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">外れ値</h2>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">外れ値とは？</h3>
        <p className="mb-2">外れ値は、データの一般的な分布から大きく離れた値のことを指します。</p>
        <p className="mb-2">一般的に、以下の基準で外れ値を判定します：</p>
        <ul className="list-disc list-inside mb-4 ml-4">
          <li className="mb-1">第1四分位数(Q1)から第3四分位数(Q3)までの範囲を四分位範囲(IQR)と呼びます</li>
          <li className="mb-1">下限: Q1 - 1.5 × IQR より小さい値</li>
          <li className="mb-1">上限: Q3 + 1.5 × IQR より大きい値</li>
        </ul>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="w-full h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
              <XAxis dataKey="index" />
              <YAxis width={30} />
              <Tooltip />
              <ReferenceLine 
                y={statistics.upperBound} 
                stroke="red" 
                strokeDasharray="3 3" 
                label={{ 
                  value: '上限', 
                  position: 'insideRight',
                  fill: 'red',
                  fontSize: 12
                }} 
              />
              <ReferenceLine 
                y={statistics.lowerBound} 
                stroke="red" 
                strokeDasharray="3 3" 
                label={{ 
                  value: '下限', 
                  position: 'insideRight',
                  fill: 'red',
                  fontSize: 12
                }} 
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={payload.isOutlier ? 6 : 4}
                      fill={payload.isOutlier ? "#ff0000" : "#8884d8"}
                    />
                  );
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <p className="text-lg font-semibold mb-2">統計情報：</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p>第1四分位数 (Q1): {statistics.q1.toFixed(1)}</p>
          <p>第3四分位数 (Q3): {statistics.q3.toFixed(1)}</p>
          <p>中央値: {statistics.median.toFixed(1)}</p>
          <p>四分位範囲 (IQR): {statistics.iqr.toFixed(1)}</p>
          <p>下限: {statistics.lowerBound.toFixed(1)}</p>
          <p>上限: {statistics.upperBound.toFixed(1)}</p>
        </div>
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg shadow mb-6">
        <p className="text-lg font-semibold">説明：</p>
        <p>{explanation}</p>
        <p className="mt-2">赤い点で示された外れ値は、赤い点線で示された上限・下限の範囲を超えたデータポイントです。</p>
      </div>

      <div className="flex justify-center">
        <button onClick={generateData} className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center">
          <RefreshCw className="mr-2" />
          新しいデータを生成
        </button>
      </div>
    </div>
  );
};

export default OutlierVisualization;