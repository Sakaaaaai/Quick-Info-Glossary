const terms = [
    {
      id: 1,
      name: 'CPU',
      description: 'Central Processing Unit（中央処理装置）',
      content: () => (
        <div className="space-y-4">
          <p>CPUは、コンピュータの中枢として働く重要な部品です。主な役割は以下の通りです：</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>命令の読み取りと解釈</li>
            <li>データの処理と計算</li>
            <li>メモリとのデータのやり取り</li>
            <li>他のハードウェア部品の制御</li>
          </ul>
        </div>
      ),
      quiz: [
        {
          question: 'CPUの主な役割は何ですか？',
          options: ['データの永久保存', '画面表示', 'データの処理と計算', 'ネットワーク通信'],
          correctAnswer: 'データの処理と計算'
        },
        {
          question: 'CPUの基本構造に含まれないものは？',
          options: ['制御装置', '演算装置', 'レジスタ', 'ハードディスク'],
          correctAnswer: 'ハードディスク'
        }
      ]
    },
    // 他の用語をここに追加
  ];
  
  export default terms;
  