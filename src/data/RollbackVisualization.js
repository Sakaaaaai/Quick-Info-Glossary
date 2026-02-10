import React, { useState, useEffect } from 'react';
import { RefreshCw, Play, Undo, Check, X } from 'lucide-react';

const RollbackVisualization = () => {
  const [accounts, setAccounts] = useState([]);
  const [transactionLog, setTransactionLog] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [transactionSuccess, setTransactionSuccess] = useState(null);

  useEffect(() => {
    resetSimulation();
  }, []);

  const resetSimulation = () => {
    const newAccounts = [
      { id: 1, name: 'アリス', balance: 1000 },
      { id: 2, name: 'ボブ', balance: 500 },
      { id: 3, name: 'キャロル', balance: 750 },
    ];
    setAccounts(newAccounts);
    setTransactionLog([]);
    setCurrentStep(0);
    setExplanation('トランザクションを開始する準備ができました。「実行」ボタンを押してトランザクションを開始しましょう。');
    setTransactionSuccess(null);
  };

  const executeTransaction = () => {
    const newLog = [
      { action: '転送開始', from: 'アリス', to: 'ボブ', amount: 300 },
      { action: 'アリスから引き落とし', from: 'アリス', amount: 300 },
      { action: 'ボブに入金', to: 'ボブ', amount: 300 },
      { action: '転送開始', from: 'ボブ', to: 'キャロル', amount: 200 },
      { action: 'ボブから引き落とし', from: 'ボブ', amount: 200 },
      { action: 'キャロルに入金', to: 'キャロル', amount: 200 },
    ];
    setTransactionLog(newLog);
    setCurrentStep(0);
    setExplanation('トランザクションが開始されました。「次のステップ」ボタンを押して、各操作を実行しましょう。');
  };

  const nextStep = () => {
    if (currentStep >= transactionLog.length) return;

    const step = transactionLog[currentStep];
    const newAccounts = [...accounts];

    if (step.action.includes('引き落とし')) {
      const account = newAccounts.find(acc => acc.name === step.from);
      if (account.balance < step.amount) {
        setTransactionSuccess(false);
        setExplanation(`エラー: ${step.from}の残高が不足しています。トランザクションをロールバックします。`);
        return;
      }
      account.balance -= step.amount;
    } else if (step.action.includes('入金')) {
      const account = newAccounts.find(acc => acc.name === step.to);
      account.balance += step.amount;
    }

    setAccounts(newAccounts);
    setCurrentStep(currentStep + 1);
    setExplanation(`${step.action}が完了しました。`);

    if (currentStep + 1 === transactionLog.length) {
      setTransactionSuccess(true);
      setExplanation('すべての操作が成功しました。トランザクションがコミットされました。');
    }
  };

  const rollback = () => {
    resetSimulation();
    setExplanation('トランザクションがロールバックされ、すべての変更が取り消されました。');
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-purple-700">データベーストランザクションとロールバック</h2>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-purple-600">トランザクションとロールバックとは？</h3>
        <p className="mb-2">データベーストランザクションは、複数の操作をまとめて実行する一連の処理です。</p>
        <p className="mb-2">トランザクションは<span className="font-semibold">ACID特性</span>（原子性、一貫性、独立性、耐久性）を持ちます。</p>
        <p className="mb-2">ロールバックは、トランザクション中にエラーが発生した場合に、すべての変更を元に戻す処理です。</p>
        <p className="mb-4">以下が一般的なトランザクションの流れです：</p>
        <ol className="list-decimal list-inside mb-4">
          <li className="mb-1">トランザクションを開始</li>
          <li className="mb-1">一連の操作を実行</li>
          <li className="mb-1">すべての操作が成功した場合、変更をコミット（確定）</li>
          <li className="mb-1">エラーが発生した場合、ロールバックして変更を取り消し</li>
        </ol>
        <p>この仕組みにより、データの整合性が保たれます。</p>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center text-purple-600">トランザクションとロールバックを体験する</h3>
      
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h4 className="text-lg font-semibold mb-2">口座残高:</h4>
        {accounts.map(account => (
          <p key={account.id}>
            {account.name}: {account.balance}円
          </p>
        ))}
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow mb-6">
        <h4 className="text-lg font-semibold mb-2">トランザクションログ:</h4>
        {transactionLog.map((log, index) => (
          <p key={index} className={index < currentStep ? 'text-green-600' : 'text-gray-400'}>
            {log.action} {log.from ? `(${log.from}から` : ''}{log.to ? `${log.to}へ` : ''} {log.amount}円)
          </p>
        ))}
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg shadow mb-6">
        <p className="text-lg font-semibold">説明：</p>
        <p>{explanation}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <button
          onClick={executeTransaction}
          disabled={transactionLog.length > 0}
          className="px-4 py-3 bg-purple-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-purple-600 disabled:bg-gray-400 transition-colors duration-300 flex items-center justify-center"
        >
          <Play className="mr-2 w-5 h-5" />
          実行
        </button>
        <button
          onClick={nextStep}
          disabled={currentStep >= transactionLog.length || transactionSuccess !== null}
          className="px-4 py-3 bg-blue-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-blue-600 disabled:bg-gray-400 transition-colors duration-300 flex items-center justify-center"
        >
          次のステップ
        </button>
        <button
          onClick={rollback}
          disabled={transactionLog.length === 0 || (transactionSuccess !== null && transactionSuccess !== false)}
          className="px-4 py-3 bg-red-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-red-600 disabled:bg-gray-400 transition-colors duration-300 flex items-center justify-center"
        >
          <Undo className="mr-2 w-5 h-5" />
          ロールバック
        </button>
        <button
          onClick={resetSimulation}
          className="px-4 py-3 bg-green-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-green-600 transition-colors duration-300 flex items-center justify-center"
        >
          <RefreshCw className="mr-2 w-5 h-5" />
          リセット
        </button>
      </div>

      {transactionSuccess !== null && (
        <div className={`text-center p-4 rounded-lg ${transactionSuccess ? 'bg-green-100' : 'bg-red-100'}`}>
          {transactionSuccess ? (
            <p className="text-green-700 flex items-center justify-center">
              <Check className="mr-2 w-5 h-5" />
              トランザクション成功！すべての変更が保存されました。
            </p>
          ) : (
            <p className="text-red-700 flex items-center justify-center">
              <X className="mr-2 w-5 h-5" />
              トランザクション失敗。すべての変更がロールバックされました。
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default RollbackVisualization;

