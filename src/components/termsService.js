import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

// Firestoreからtermsコレクションのデータを取得する関数
export const fetchTerms = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'terms'));
    const terms = [];

    console.log('Firestoreから取得したドキュメントの数:', querySnapshot.size); // ドキュメント数を確認

    // 各ドキュメントをterms配列に追加
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log('取得したデータ:', data); // データ全体を確認

      // term1が配列として格納されている場合、それを展開
      const termDataArray = data.term1 || []; // term1フィールドが存在しない場合は空配列を設定

      termDataArray.forEach((termData) => {
        // データ構造にクイズフィールドを含むかチェックし、正しく処理
        const quiz = termData.quiz?.map((q) => ({
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
        })) || []; // クイズがない場合は空の配列を設定

        terms.push({
          id: termData.id, // termData内のidフィールドを使用
          name: termData.name,
          description: termData.description,
          content: termData.content,
          quiz: quiz, // クイズフィールドを設定
        });
      });
    });

    console.log('最終的に取得したterms:', terms); // 最終的な結果を確認
    return terms;
  } catch (error) {
    console.error('Error fetching terms: ', error);
    throw error;
  }
};
