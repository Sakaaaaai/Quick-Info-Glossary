import React, { useState, useEffect } from 'react'
import { Bluetooth, RefreshCw, Send, Wifi, ArrowRight } from 'lucide-react'

const Button = ({ onClick, disabled, className, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-3 py-2 sm:px-4 sm:py-2 rounded-md font-semibold text-xs sm:text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
      disabled
        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
        : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
    } ${className}`}
  >
    {children}
  </button>
)

export default function BluetoothVisualization() {
  const [devices, setDevices] = useState([])
  const [connectedDevice, setConnectedDevice] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [explanation, setExplanation] = useState('「スキャン開始」ボタンを押して、近くのBluetoothデバイスを探してみましょう。')
  const [step, setStep] = useState(0)

  // 既存のuseEffectとその他の関数は変更なし
  useEffect(() => {
    resetVisualization()
  }, [])

  const resetVisualization = () => {
    setDevices([])
    setConnectedDevice(null)
    setIsScanning(false)
    setIsConnecting(false)
    setIsSending(false)
    setExplanation('「スキャン開始」ボタンを押して、近くのBluetoothデバイスを探してみましょう。')
    setStep(0)
  }

  const startScanning = () => {
    setIsScanning(true)
    setExplanation('Bluetoothデバイスを探しています。これは、近くにある電波を出しているBluetoothデバイスを見つける作業です。スマートフォンで近くのWi-Fiを探すのと似ていますね。')
    setStep(1)
    setTimeout(() => {
      const newDevices = [
        { id: 1, name: 'スマートウォッチA', type: 'ウェアラブル' },
        { id: 2, name: 'ワイヤレスイヤホンB', type: 'オーディオ' },
        { id: 3, name: 'Bluetoothスピーカー', type: 'オーディオ' },
      ]
      setDevices(newDevices)
      setIsScanning(false)
      setExplanation('デバイスが見つかりました！各デバイスには名前とタイプがあります。接続したいデバイスを選んでクリックしてください。')
      setStep(2)
    }, 3000)
  }

  const connectToDevice = (device) => {
    setIsConnecting(true)
    setExplanation(`${device.name}に接続しています。この過程では、デバイス同士が「こんにちは」を言い合い、安全に通信するための暗号を決めています。これをペアリングと呼びます。`)
    setStep(3)
    setTimeout(() => {
      setConnectedDevice(device)
      setIsConnecting(false)
      setExplanation(`${device.name}に接続しました！これで、このデバイスとデータのやり取りができるようになりました。スマートウォッチなら歩数データを送ったり、イヤホンなら音楽データを送ったりできます。`)
      setStep(4)
    }, 2000)
  }

  const sendData = () => {
    if (!connectedDevice) return
    setIsSending(true)
    setExplanation(`${connectedDevice.name}にデータを送信しています。Bluetoothは、電波の混雑を避けるために、とても速く周波数を変えながらデータを送ります。これは、混雑した道路でレーンを頻繁に変更しながら運転するようなものです。`)
    setStep(5)
    setTimeout(() => {
      setIsSending(false)
      setExplanation(`${connectedDevice.name}にデータを送信しました。最新のBluetooth技術では、省電力で通信ができるので、デバイスのバッテリーがより長持ちします。`)
      setStep(6)
    }, 2000)
  }

  return (
    <div className="p-3 sm:p-6 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-indigo-700">Bluetooth</h2>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-indigo-600">Bluetoothって何？</h3>
        <p className="text-sm sm:text-base mb-2">Bluetoothは、近くにある機器同士をつなげる無線技術です。スマートフォンとイヤホンをつなげたり、パソコンとマウスをつなげたりするのに使われます。</p>
        <p className="text-sm sm:text-base mb-2">Bluetoothでの通信は、主に3つの段階で行われます：</p>
        <ol className="list-decimal list-inside mb-4 text-sm sm:text-base">
          <li className="mb-1">デバイスを探す：近くにあるBluetoothデバイスを見つけます（スキャン）</li>
          <li className="mb-1">デバイスとつながる：選んだデバイスと「握手」をします（ペアリング）</li>
          <li className="mb-1">データをやりとりする：つながったデバイスと情報を交換します（データ転送）</li>
        </ol>
        <p className="text-sm sm:text-base mb-2">Bluetoothは、Wi-Fiと同じような電波を使いますが、より近い距離で使うように設計されています。</p>
        <p className="text-sm sm:text-base">最新のBluetooth 5.0は、以前のバージョンよりも速く、遠くまで届き、たくさんの情報を送れるようになりました。</p>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center text-indigo-600">Bluetooth通信の体験</h3>
        
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-blue-200 rounded-full flex items-center justify-center">
            <Bluetooth className={`w-12 h-12 sm:w-16 sm:h-16 text-blue-500 ${isScanning ? 'animate-pulse' : ''}`} />
            {(isConnecting || connectedDevice) && (
              <div className="absolute top-0 left-0 w-full h-full">
                <div className={`w-full h-full rounded-full border-4 border-blue-500 ${isConnecting ? 'animate-ping' : ''}`}></div>
              </div>
            )}
            {isSending && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <Send className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 animate-bounce" />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <Button
            onClick={startScanning}
            disabled={isScanning || connectedDevice}
            className="w-full flex items-center justify-center"
          >
            {isScanning ? <RefreshCw className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" /> : <Wifi className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />}
            {isScanning ? 'デバイスを探しています...' : 'デバイスを探す'}
          </Button>

          {devices.length > 0 && !connectedDevice && (
            <div>
              <h4 className="font-semibold mb-2 text-sm sm:text-base">見つかったデバイス:</h4>
              <ul className="space-y-2">
                {devices.map((device) => (
                  <li key={device.id}>
                    <Button
                      onClick={() => connectToDevice(device)}
                      disabled={isConnecting}
                      className="w-full flex items-center justify-between text-xs sm:text-sm"
                    >
                      <span className="flex items-center">
                        <Bluetooth className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        {device.name}
                      </span>
                      <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                        {device.type}
                      </span>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {connectedDevice && (
            <Button
              onClick={sendData}
              disabled={isSending}
              className="w-full flex items-center justify-center"
            >
              <Send className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              {isSending ? 'データを送っています...' : 'データを送る'}
            </Button>
          )}
        </div>
      </div>

      <div className="bg-yellow-100 p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6">
        <p className="text-base sm:text-lg font-semibold mb-2">説明：</p>
        <p className="text-sm sm:text-base">{explanation}</p>
      </div>

      <div className="bg-indigo-100 p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6 overflow-x-auto">
        <h4 className="font-semibold mb-2 text-sm sm:text-base">進行状況：</h4>
        <div className="flex items-center min-w-max">
          {[...Array(6)].map((_, index) => (
            <React.Fragment key={index}>
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm ${
                index < step ? 'bg-indigo-500 text-white' : 'bg-gray-300'
              }`}>
                {index + 1}
              </div>
              {index < 5 && <ArrowRight className="mx-1 sm:mx-2 text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={resetVisualization} className="bg-indigo-500 hover:bg-indigo-600">
          もう一度
        </Button>
      </div>
    </div>
  )
}