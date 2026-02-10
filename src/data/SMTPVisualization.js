'use client'

import React, { useState } from 'react';
import { RefreshCw, Mail, Server, ArrowRight, ArrowLeft, Send, Clock, Shield } from 'lucide-react';

export default function Component() {
  const [step, setStep] = useState(0);
  const [animation, setAnimation] = useState('');

  // SMTPの基本情報
  const smtpBasics = [
    {
      icon: <Mail className="w-6 h-6 md:w-8 md:h-8 text-indigo-500" />,
      title: "SMTPとは？",
      description: "Simple Mail Transfer Protocol（SMTP）は、インターネットで電子メールを送信するための標準的な通信プロトコルです。",
    },
    {
      icon: <Send className="w-6 h-6 md:w-8 md:h-8 text-indigo-500" />,
      title: "主な役割",
      description: "メールサーバー間でメッセージを転送し、送信者から受信者へ確実にメールを届けることです。",
    },
    {
      icon: <Clock className="w-6 h-6 md:w-8 md:h-8 text-indigo-500" />,
      title: "処理の流れ",
      description: "メール送信時に、クライアントとサーバー間で決められた手順に従って通信を行い、メッセージを転送します。",
    },
    {
      icon: <Shield className="w-6 h-6 md:w-8 md:h-8 text-indigo-500" />,
      title: "重要な特徴",
      description: "信頼性の高い配信、エラー通知、スパム対策など、電子メールの安全な転送を実現します。",
    }
  ];

  const steps = [
    {
      title: '1. TCP接続の確立',
      clientMessage: '',
      serverMessage: '220 smtp.example.com ESMTP Postfix',
      explanation: 'メールクライアントがSMTPサーバー（ポート25）へTCP接続を確立します',
      details: [
        'クライアントがサーバーのポート25に接続を要求',
        'サーバーが接続を受け付け、応答コード220を返す',
        'これにより、安全な通信チャネルが確立される'
      ]
    },
    
    {
      title: '2. クライアントの認証 (EHLO)',
      clientMessage: 'EHLO client.example.com',
      serverMessage: '250 Hello client.example.com',
      explanation: 'クライアントが自身を識別し、拡張SMTP(ESMTP)での通信を開始します',
      details: [
        'クライアントが自身のドメイン名を送信',
        'サーバーが応答コード250で承認',
        '利用可能な拡張機能のリストが返される'
      ]
    },
    {
      title: '3. 送信者の設定',
      clientMessage: 'MAIL FROM:<sender@example.com>',
      serverMessage: '250 Ok',
      explanation: '送信者のメールアドレスを指定します',
      details: [
        'メールの送信者アドレスを指定',
        'サーバーが形式を確認して承認',
        'エラーがある場合は拒否される'
      ]
    },
    {
      title: '4. 受信者の設定',
      clientMessage: 'RCPT TO:<recipient@example.com>',
      serverMessage: '250 Ok',
      explanation: '受信者のメールアドレスを指定します',
      details: [
        '配信先のメールアドレスを指定',
        '複数の受信者を指定可能',
        'サーバーがアドレスの有効性を確認'
      ]
    },
    {
      title: '5. メール本文の開始',
      clientMessage: 'DATA',
      serverMessage: '354 メール本文を入力してください',
      explanation: 'メール本文の送信を開始することを通知します',
      details: [
        'DATAコマンドでメール本文の入力開始',
        'サーバーが準備完了を通知',
        '本文入力モードに移行'
      ]
    },
    {
      title: '6. メール本文の送信',
      clientMessage: `Subject: テストメール
From: sender@example.com
To: recipient@example.com

こんにちは！
これはテストメールです。

.`,
      serverMessage: '250 Ok: queued as 12345',
      explanation: 'メール本文を送信し、ピリオドで終了を示します',
      details: [
        'ヘッダー情報（件名など）を送信',
        '本文を送信',
        '単独のピリオドで終了を示す',
        'サーバーが受信確認を返す'
      ]
    },
    {
      title: '7. 切断',
      clientMessage: 'QUIT',
      serverMessage: '221 Bye',
      explanation: '通信を終了し、接続を切断します',
      details: [
        'QUITコマンドで終了を通知',
        'サーバーが切断を承認',
        'TCP接続が切断される'
      ]
    }
  ];

  const resetVisualization = () => {
    setStep(0);
    setAnimation('');
  };

  const nextStep = () => {
    if (step < steps.length - 1) {
      setAnimation('send');
      setTimeout(() => {
        setStep(step + 1);
        setAnimation('');
      }, 1000);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg max-w-5xl mx-auto">
      {/* ヘッダー */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-4">
          SMTP
        </h2>
      </div>

      {/* SMTPの基本説明 */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-8 mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4 sm:mb-6 text-center">
          SMTPの基礎知識
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {smtpBasics.map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                {item.icon}
              </div>
              <h4 className="text-base sm:text-lg font-bold text-indigo-700 mb-2 text-center">
                {item.title}
              </h4>
              <p className="text-sm sm:text-base text-gray-600 text-center">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* メール送信の流れ */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-8 mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4 sm:mb-6 text-center">
          メール送信の7ステップ
        </h3>
        {/* プログレスバー */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${
                  index === step
                    ? 'bg-indigo-600 text-white'
                    : index < step
                    ? 'bg-indigo-200 text-indigo-700'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* メインビジュアル */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 sm:mb-8">
          {/* クライアント側 */}
          <div className="w-full sm:w-5/12">
            <div className="bg-blue-100 rounded-lg p-4 sm:p-6 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-full flex items-center justify-center text-white mx-auto mb-3 sm:mb-4">
                <Mail size={24} />
              </div>
              <h3 className="font-bold text-blue-700 mb-2">メールクライアント</h3>
              {steps[step].clientMessage && (
                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-white rounded shadow-sm text-left font-mono text-xs sm:text-sm">
                  {steps[step].clientMessage.split('\n').map((line, i) => (
                    <div key={i} className="mb-1">{line}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 矢印 */}
          <div className={`flex sm:flex-col gap-2 sm:gap-4 ${animation === 'send' ? 'animate-pulse' : ''}`}>
            <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-500" />
            <ArrowLeft className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-500" />
          </div>

          {/* サーバー側 */}
          <div className="w-full sm:w-5/12">
            <div className="bg-indigo-100 rounded-lg p-4 sm:p-6 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white mx-auto mb-3 sm:mb-4">
                <Server size={24} />
              </div>
              <h3 className="font-bold text-indigo-700 mb-2">SMTPサーバー</h3>
              {steps[step].serverMessage && (
                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-white rounded shadow-sm text-left font-mono text-xs sm:text-sm">
                  {steps[step].serverMessage}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 説明部分 */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-indigo-700 mb-3 sm:mb-4">
            {steps[step].title}
          </h3>
          <p className="text-base sm:text-lg mb-3 sm:mb-4">{steps[step].explanation}</p>
          <ul className="list-disc list-inside space-y-1 sm:space-y-2">
            {steps[step].details.map((detail, index) => (
              <li key={index} className="text-sm sm:text-base text-gray-700">{detail}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* コントロールボタン */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        <button
          onClick={prevStep}
          disabled={step === 0}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-500 text-white rounded-full text-sm sm:text-lg font-semibold hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300"
        >
          前へ
        </button>
        <button
          onClick={nextStep}
          disabled={step === steps.length - 1}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-indigo-500 text-white rounded-full text-sm sm:text-lg font-semibold hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300"
        >
          次へ
        </button>
        <button
          onClick={resetVisualization}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-500 text-white rounded-full text-sm sm:text-lg font-semibold hover:bg-purple-600 transition-colors duration-300 flex items-center"
        >
          <RefreshCw className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
          最初から
        </button>
      </div>
    </div>
  
  );
}