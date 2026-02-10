import React, { useState } from 'react';
import { Mail, Globe, Lock, AlertTriangle, DollarSign, Shield } from 'lucide-react';

const PhishingEducationSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const introContent = {
    title: "フィッシングとは？",
    description: `フィッシングは、攻撃者が信頼できる組織や企業を装い、
      メールやウェブサイトを通じて個人情報を盗み取ろうとする犯罪手法です。
      「フィッシング（Phishing）」という名称は、魚釣り（Fishing）になぞらえて
      付けられました。攻撃者が偽の餌を使って、個人情報という魚を釣り上げようと
      することから、この名前が付いています。`,
  };

  const steps = [
    {
      title: "1. 偽のメールを送信",
      icon: <Mail className="text-blue-500" />,
      description: "攻撃者は、正規の企業や組織を装った偽のメールを送信します。",
      details: [
        "銀行やクレジットカード会社からの緊急連絡を装う",
        "有名なオンラインサービスからのアカウント確認メールを偽装",
        "懸賞や特別オファーを装った誘い文句を使用"
      ],
      warning: "突然の緊急メールや、知らない送信者からのメールには注意しましょう。"
    },
    {
      title: "2. 偽のウェブサイトへ誘導",
      icon: <Globe className="text-green-500" />,
      description: "メール内のリンクをクリックすると、本物そっくりの偽サイトに誘導されます。",
      details: [
        "URLが本物とわずかに異なる（例：bankofamerica.com → bankofamerica.net）",
        "HTTPSではなくHTTP接続を使用（安全ではない接続）",
        "ロゴや色使いは本物のサイトと酷似している"
      ],
      warning: "URLを常に確認し、不審な点があればサイトを開かないようにしましょう。"
    },
    {
      title: "3. 個人情報の入力を要求",
      icon: <Lock className="text-red-500" />,
      description: "偽サイトは、あなたの個人情報やログイン情報の入力を求めます。",
      details: [
        "アカウントの確認や情報の更新が必要だと主張",
        "セキュリティ上の問題があるという偽の警告を表示",
        "時間制限を設けて、急いで入力するよう促す"
      ],
      warning: "信頼できないサイトでは、絶対に個人情報を入力しないでください。"
    },
    {
      title: "4. 情報の窃取",
      icon: <AlertTriangle className="text-yellow-500" />,
      description: "入力された情報は攻撃者に送信され、悪用されます。",
      details: [
        "銀行口座やクレジットカードへの不正アクセス",
        "個人情報を使った詐欺や乗っ取り",
        "他のサービスでも同じパスワードを使っている場合、そちらも危険に"
      ],
      warning: "一度情報が漏れると、取り返しがつかない被害に遭う可能性があります。"
    },
    {
      title: "5. 二次被害の可能性",
      icon: <DollarSign className="text-purple-500" />,
      description: "窃取された情報は、さらなる犯罪に使われることがあります。",
      details: [
        "身元を偽っての金銭的詐欺",
        "スパムメールの送信元として悪用",
        "ダークウェブでの個人情報の売買"
      ],
      warning: "被害は金銭的なものだけでなく、信用や評判にも関わる可能性があります。"
    }
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-blue-700">フィッシング</h2>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold mb-3">{introContent.title}</h3>
        <p className="text-lg mb-4">{introContent.description}</p>
        <p className="text-lg font-semibold text-red-600">{introContent.impact}</p>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <div className="flex items-center justify-center mb-4">
          {steps[currentStep].icon}
          <h3 className="text-xl font-bold ml-2">{steps[currentStep].title}</h3>
        </div>
        <p className="text-lg mb-4">{steps[currentStep].description}</p>
        <ul className="list-disc list-inside mb-4">
          {steps[currentStep].details.map((detail, index) => (
            <li key={index} className="mb-2">{detail}</li>
          ))}
        </ul>
        <div className="bg-yellow-100 p-3 rounded-lg">
          <p className="flex items-center text-yellow-800">
            <AlertTriangle className="mr-2" />
            {steps[currentStep].warning}
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          前のステップ
        </button>
        <button
          onClick={nextStep}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          次のステップ
        </button>
      </div>

      <div className="mt-6 bg-green-100 p-4 rounded-lg shadow">
        <h4 className="text-lg font-semibold mb-2 flex items-center">
          <Shield className="text-green-600 mr-2" />
          フィッシング詐欺から身を守るには
        </h4>
        <ul className="list-disc list-inside space-y-2">
          <li>不審なメールのリンクをクリックしない</li>
          <li>URLを常に確認し、正規のものか疑う</li>
          <li>個人情報の入力を求められたら、別途公式サイトにアクセスして確認する</li>
          <li>二段階認証を利用し、アカウントのセキュリティを強化する</li>
          <li>定期的にパスワードを変更し、サービスごとに異なるパスワードを使用する</li>
          <li>セキュリティソフトを最新の状態に保つ</li>
        </ul>
      </div>
    </div>
  );
};

export default PhishingEducationSteps;