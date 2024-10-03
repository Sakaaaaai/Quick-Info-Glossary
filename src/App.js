import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import TermList from './components/TermList';
import TermDetails from './components/TermDetails';
import Quiz from './components/Quiz';
import Footer from './components/Footer';
import LoginDialog from './components/LoginDialog';
import RegisterDialog from './components/RegisterDialog';
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
        uid: userData.uid,
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
        setSearchResults([]);
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
      setSearchResults(allTerms);
      return;
    }

    const filteredResults = allTerms.filter(current => 
      current.name.toLowerCase().includes(term.toLowerCase())
    );

    if (filteredResults.length === 0) {
      setSearchResults([]);
    } else {
      setSearchResults(filteredResults);
    }
  };

  // ホームに戻る処理
  const handleHomeClick = () => {
    setSelectedTerm(null);
    setSearchResults(allTerms);
    setSearchTerm('');
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
        onHomeClick={handleHomeClick}
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