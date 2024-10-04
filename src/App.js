import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import TermList from './components/TermList';
import TermDetails from './components/TermDetails';
import Quiz from './components/Quiz';
import Footer from './components/Footer';
import LoginDialog from './components/LoginDialog';
import MainComponents from './components/MainComponents';
import { fetchTerms } from './components/termsService';
import { signInWithGoogle } from './firebase';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

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
  const [searchResults, setSearchResults] = useState([]);
  const [allTerms, setAllTerms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [termOrder, setTermOrder] = useState([]); // 用語の表示順を管理するための状態

  // カテゴリーリストを生成
  const categories = useMemo(() => {
    const categorySet = new Set(allTerms.map(term => term.category));
    return Array.from(categorySet);
  }, [allTerms]);

  // Firestoreにお気に入りを保存する関数
  const saveFavoritesToFirestore = async (userId, favorites) => {
    try {
      const userDoc = doc(db, 'users', userId);
      await setDoc(userDoc, { favorites }, { merge: true });
    } catch (error) {
      console.error('Error saving favorites:', error);
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
      console.error('Error getting favorites:', error);
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
        uid: userData.uid,
      });
      setIsRegisterOpen(false);
    } catch (error) {
      console.error('Error during Google registration:', error);
    }
  };

  // Firestoreからお気に入りを取得
  useEffect(() => {
    if (user) {
      const loadFavorites = async () => {
        const storedFavorites = await getFavoritesFromFirestore(user.uid);
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
        setAllTerms(termsData);
        setSearchResults(termsData);
        setTermOrder(termsData.map(term => term.id)); // 初期状態で全用語のIDを設定
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

  const handleLogout = () => {
    setUser(null);
    setFavorites([]);
  };

  // 検索処理：用語一覧の内容は変えないが、検索結果に基づいてselectedTermを設定する
  const handleSearch = (term) => {
    setSearchTerm(term);

    if (term === '') {
      setSearchResults(allTerms); // 検索バーがクリアされたら全用語を表示
    } else {
      const filteredResults = allTerms.filter(current => 
        current.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  };

  // ホームに戻る処理
  const handleHomeClick = () => {
    setSelectedTerm(null);
    setSearchResults(allTerms);
    setSearchTerm('');
  };

  // 用語が選択されたときに順序を更新する関数
  const handleSelectTerm = (term) => {
    setSelectedTerm(term);
    setSearchTerm(''); // 検索バーをクリア
    setTermOrder(prevOrder => {
      const newOrder = prevOrder.filter(id => id !== term.id); // 既存のIDを削除
      return [term.id, ...newOrder]; // 新しく選択された用語のIDを先頭に追加
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <Header 
        user={user}
        setUser={setUser}
        handleLogout={handleLogout}
        onSearch={handleSearch} 
        searchResults={searchResults}
        setSelectedTerm={handleSelectTerm} // 検索結果から用語が選択された場合にも呼ばれる
        onHomeClick={handleHomeClick}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <main className="flex-grow flex">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p>データを読み込んでいます...</p>
          </div>
        ) : (
          <>
            <TermList 
              terms={allTerms} // 用語一覧には常に全用語を表示
              setSelectedTerm={handleSelectTerm}
              toggleFavorite={toggleFavorite} 
              favorites={favorites}
              termOrder={termOrder} // 用語の順序を渡す
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
                <MainComponents categories={categories} />
              )}
            </section>
          </>
        )}
      </main>
      <Footer />
      <LoginDialog 
        isLoginOpen={isLoginOpen} 
        setIsLoginOpen={setIsLoginOpen} 
      />
    </div>
  );
};

export default VisualTextbook;
