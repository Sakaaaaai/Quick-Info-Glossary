import React, { useState, useEffect } from 'react'
import { RefreshCw, FastForward } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, ReferenceLine, Tooltip, ResponsiveContainer } from 'recharts'

export default function PCMVisualization() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState([])
  const [sampledPoints, setSampledPoints] = useState([])
  const [quantizedPoints, setQuantizedPoints] = useState([])
  const [binaryData, setBinaryData] = useState([])

  useEffect(() => {
    resetPCM();
  }, [])

  const resetPCM = () => {
    const points = []
    for (let x = 0; x < 100; x++) {
      points.push({
        x: x,
        y: Math.sin(x * 0.2) * 0.8
      })
    }

    const newData = points
    setData(newData)

    const samples = newData.filter((_, index) => index % 10 === 0)
    setSampledPoints(samples)

    const quantized = samples.map(point => ({
      ...point,
      y: Math.round(point.y * 5) / 5
    }))
    setQuantizedPoints(quantized)

    const binary = quantized.map(point => {
      const level = Math.round((point.y + 0.8) * 5)
      return {
        ...point,
        binary: level.toString(2).padStart(3, '0')
      }
    })
    setBinaryData(binary)
    setStep(0)
  }

  const nextStep = () => {
    setStep((prev) => (prev < 3 ? prev + 1 : prev))
  }

  const explanations = [
    "アナログ信号を観察してみましょう。これは時間とともに連続的に変化する波形です。",
    "サンプリング：一定の時間間隔で信号を測定します。この例では10ポイントごとにサンプリングしています。",
    "量子化：測定された値を決められた段階（この例では8段階）に丸めます。",
    "符号化：量子化された値をデジタルデータ（この例では3ビット）に変換します。"
  ]

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-indigo-700">PCM (Pulse Code Modulation)</h2>
      
      {/* PCM方式の説明セクション */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-4">PCM方式の概要</h3>
        <p className="text-gray-700 mb-4">
          PCM（パルス符号変調）は、アナログ信号をデジタル信号に変換する方式です。このプロセスでは、アナログ信号をサンプリングして、量子化し、その後にデジタル符号化を行います。これにより、デジタルデバイスでアナログ信号を保存・伝送できるようになります。
        </p>
        <p className="text-gray-700 mb-4">
          本ビジュアライゼーションでは、PCMの各ステップ（アナログ信号の観察、サンプリング、量子化、符号化）を順に体験できます。次のステップを進めて、信号がどのように処理されるかを見てみましょう。
        </p>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-4">{`ステップ ${step + 1}: ${['アナログ信号', 'サンプリング', '量子化', '符号化'][step]}`}</h3>
        <p className="text-gray-700 mb-4">{explanations[step]}</p>
        
        <ResponsiveContainer 
          width="100%" 
          height={step >= 3 ? 250 : 200}  // ステップに応じて高さを調整
          className="sm:height-[300px] md:height-[400px] lg:height-[500px]" // 画面サイズに応じた高さ調整
        >
          <LineChart
            margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
          >
            <XAxis 
              dataKey="x" 
              type="number"
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              label={{ value: '時間', position: 'bottom', offset: 0 }}
            />
            <YAxis 
              hide={window.innerWidth < 640} // スマホ画面ではY軸を非表示に
              domain={[-1, 1]} 
              ticks={[-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1]}
              label={{ value: '振幅', angle: -90, position: 'insideLeft', offset: -20 }}
            />
            <Tooltip 
              formatter={(value) => value.toFixed(3)}
              labelFormatter={(value) => `時間: ${value}`}
            />
            <Line
              data={data}
              type="monotone"
              dataKey="y"
              stroke="#8884d8"
              dot={false}
              strokeWidth={2}
              name="アナログ信号"
            />
            {step >= 1 && (
              <Line
                data={sampledPoints}
                type="monotone"
                dataKey="y"
                stroke="#82ca9d"
                strokeWidth={0}
                dot={{ r: 4, fill: "#82ca9d" }}
                name="サンプリングポイント"
              />
            )}
            {step >= 2 && (
              <>
                {[-0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8].map((level) => (
                  <ReferenceLine
                    key={level}
                    y={level}
                    stroke="#ddd"
                    strokeDasharray="3 3"
                  />
                ))}
                <Line
                  data={quantizedPoints}
                  type="stepAfter"
                  dataKey="y"
                  stroke="#ff7300"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#ff7300" }}
                  name="量子化信号"
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {step === 3 && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="font-bold mb-2">デジタルデータ（3ビット）:</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-2">
            {binaryData.map((point, index) => (
              <div key={index} className="text-center">
                <div className="font-mono bg-white p-2 rounded shadow-sm border">
                  {point.binary}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={nextStep}
          disabled={step >= 3}
          className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 disabled:bg-gray-400 flex items-center shadow-md"
        >
          <FastForward className="mr-2" />
          次へ
        </button>
        <button
          onClick={resetPCM}
          className="px-6 py-3 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 flex items-center shadow-md"
        >
          <RefreshCw className="mr-2" />
          リセット
        </button>
      </div>
    </div>
  )
}
