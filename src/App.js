import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TermList from './components/TermList';
import TermDetails from './components/TermDetails';
import Quiz from './components/Quiz';
import Footer from './components/Footer';
import LoginDialog from './components/LoginDialog';
import RegisterDialog from './components/RegisterDialog';
import { fetchTerms } from './components/termsService'; // Firestoreからデータを取得する関数をインポート
import { signInWithGoogle } from './firebase'; // Google認証をインポート
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'; // Firestoreのインポート

const db = getFirestore();

const VisualTextbook = () => {
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [quizMode, setQuizMode] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]); // 検索結果のみ
  const [allTerms, setAllTerms] = useState([]); // 取得した全てのtermsを保持
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Firestoreにお気に入りを保存する関数
  const saveFavoritesToFirestore = async (userId, favorites) => {
    try {
      const userDoc = doc(db, 'users', userId);
      await setDoc(userDoc, { favorites }, { merge: true });
      console.log('お気に入りをFirestoreに保存しました。');
    } catch (error) {
      console.error('お気に入りの保存に失敗しました:', error);
    }
  };

  // Firestoreからお気に入りを取得する関数
  const getFavoritesFromFirestore = async (userId) => {
    try {
      const userDoc = doc(db, 'users', userId);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        return docSnap.data().favorites || [];
      } else {
        return [];
      }
    } catch (error) {
      console.error('お気に入りの取得に失敗しました:', error);
      return [];
    }
  };

  // Googleログイン処理
  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithGoogle();
      const userData = result.user;
      setUser({
        username: userData.displayName,
        uid: userData.uid, // UIDを追加
      });
      setIsRegisterOpen(false);
      console.log('Googleログイン成功:', userData);
    } catch (error) {
      console.error('Googleアカウントでの新規登録に失敗しました:', error);
    }
  };

  // Firestoreからお気に入りを取得
  useEffect(() => {
    if (user) {
      const loadFavorites = async () => {
        const storedFavorites = await getFavoritesFromFirestore(user.uid); // Firestoreから取得
        setFavorites(storedFavorites);
      };
      loadFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  // Firestoreからtermsを取得して表示する処理
  useEffect(() => {
    const loadTerms = async () => {
      setLoading(true);
      try {
        const termsData = await fetchTerms();
        setAllTerms(termsData); // すべてのデータを保持
        setSearchResults([]); // 初期状態では何も表示しない
        setLoading(false);
      } catch (error) {
        console.error('Error fetching terms:', error);
        setLoading(false);
      }
    };

    loadTerms();
  }, []);

  // お気に入りのトグル
  const toggleFavorite = (termId) => {
    if (!user) {
      alert('お気に入りを追加するにはログインが必要です。');
      return;
    }

    const newFavorites = favorites.includes(termId)
      ? favorites.filter(id => id !== termId)
      : [...favorites, termId];
    setFavorites(newFavorites);

    // Firestoreにお気に入りを保存
    saveFavoritesToFirestore(user.uid, newFavorites);
  };

  const startQuiz = () => {
    if (selectedTerm && selectedTerm.quiz) {
      setQuizMode(true);
      setQuizQuestion(selectedTerm.quiz[Math.floor(Math.random() * selectedTerm.quiz.length)]);
      setQuizResult(null);
    }
  };

  const answerQuiz = (answer) => {
    const isCorrect = answer === quizQuestion.correctAnswer;
    setQuizResult({
      isCorrect,
      correctAnswer: quizQuestion.correctAnswer,
      userAnswer: answer
    });
  };

  const nextQuestion = () => {
    setQuizResult(null);
    startQuiz();
  };

  const endQuiz = () => {
    setQuizMode(false);
    setQuizQuestion(null);
    setQuizResult(null);
  };

  const handleLogin = (username, password) => {
    setUser({ username });
    setIsLoginOpen(false);
  };

  const handleRegister = (username, password) => {
    setUser({ username });
    setIsRegisterOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setFavorites([]);
  };

  // 検索処理
  const handleSearch = (term) => {
    setSearchTerm(term);

    if (term === '') {
      setSearchResults(allTerms); // 空の場合は全ての用語を表示
      return;
    }

    // 入力された単語に一致する単語をフィルタリング
    const filteredResults = allTerms.filter(current => 
      current.name.toLowerCase().includes(term.toLowerCase())
    );

    if (filteredResults.length === 0) {
      // 結果がない場合
      setSearchResults([]);
    } else {
      // 結果がある場合
      setSearchResults(filteredResults);
    }
  };

  // ホームに戻る処理
  const handleHomeClick = () => {
    setSelectedTerm(null);   // 選択された用語をリセット
    setSearchResults(allTerms); // 全用語を表示
    setSearchTerm('');      // 検索バーをクリア
  };

  return (
    <div className="flex flex-col h-screen">
      <Header 
        user={user}
        setIsLoginOpen={setIsLoginOpen}
        setIsRegisterOpen={setIsRegisterOpen}
        handleLogout={handleLogout}
        onSearch={handleSearch} 
        setUser={setUser}
        searchResults={searchResults}
        setSelectedTerm={setSelectedTerm}
        onGoogleRegister={handleGoogleRegister}
        onHomeClick={handleHomeClick} // ホームに戻るための関数を渡す
      />
      <main className="flex-grow flex">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p>データを読み込んでいます...</p>
          </div>
        ) : (
          <>
            <TermList 
              terms={searchResults}
              setSelectedTerm={setSelectedTerm} 
              toggleFavorite={toggleFavorite} 
              favorites={favorites} 
            />
            <section className="w-3/4 p-4 overflow-y-auto">
              {selectedTerm ? (
                quizMode ? (
                  <Quiz 
                    quizQuestion={quizQuestion} 
                    quizResult={quizResult} 
                    answerQuiz={answerQuiz} 
                    nextQuestion={nextQuestion} 
                    endQuiz={endQuiz}
                  />
                ) : (
                  <TermDetails 
                    selectedTerm={selectedTerm} 
                    startQuiz={startQuiz} 
                    favorites={favorites} 
                    toggleFavorite={toggleFavorite} 
                  />
                )
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>左側のメニューから用語を選択してください</p>
                </div>
              )}
            </section>
          </>
        )}
      </main>
      <Footer />
      <LoginDialog 
        isLoginOpen={isLoginOpen} 
        setIsLoginOpen={setIsLoginOpen} 
        handleLogin={handleLogin} 
      />
      <RegisterDialog 
        isRegisterOpen={isRegisterOpen} 
        setIsRegisterOpen={setIsRegisterOpen} 
        handleRegister={handleRegister} 
        onGoogleRegister={handleGoogleRegister}
      />
    </div>
  );
};

export default VisualTextbook;
