import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import TermList from './components/TermList';
import TermDetails from './components/TermDetails';
import Quiz from './components/Quiz';
import Footer from './components/Footer';
import LoginDialog from './components/LoginDialog';
import MainComponents from './components/MainComponents';
import { fetchTerms } from './components/termsService';

const VisualTextbook = () => {
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [quizMode, setQuizMode] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [allTerms, setAllTerms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [termOrder, setTermOrder] = useState([]);

  // カテゴリーリストを生成
  const categories = useMemo(() => {
    const categorySet = new Set(allTerms.map(term => term.category));
    return Array.from(categorySet);
  }, [allTerms]);

  // 用語を取得
  useEffect(() => {
    const loadTerms = async () => {
      setLoading(true);
      try {
        const termsData = await fetchTerms();
        setAllTerms(termsData);
        setSearchResults(termsData);
        setTermOrder(termsData.map(term => term.id));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching terms:', error);
        setLoading(false);
      }
    };

    loadTerms();
  }, []);

  // 用語順序の更新関数
  const updateTermOrder = (termId) => {
    setTermOrder(prevOrder => {
      const newOrder = prevOrder.filter(id => id !== termId);
      return [termId, ...newOrder];
    });
  };

  // お気に入りのトグル
  const toggleFavorite = (termId) => {
    if (!user) {
      alert('お気に入りを追加するにはログインが必要です。');
      return;
    }

    setFavorites(prevFavorites => 
      prevFavorites.includes(termId)
        ? prevFavorites.filter(id => id !== termId)
        : [...prevFavorites, termId]
    );
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

  // 検索処理
  const handleSearch = (term) => {
    setSearchTerm(term);

    if (term === '') {
      setSearchResults(allTerms);
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

  // 用語が選択されたときに順序を更新
  const handleSelectTerm = (term) => {
    setSelectedTerm(term);
    setSearchTerm('');
    updateTermOrder(term.id);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header 
        user={user}
        setUser={setUser}
        handleLogout={handleLogout}
        onSearch={handleSearch} 
        searchResults={searchResults}
        setSelectedTerm={handleSelectTerm}
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
              terms={allTerms} 
              setSelectedTerm={handleSelectTerm}
              toggleFavorite={toggleFavorite} 
              favorites={favorites}
              termOrder={termOrder}
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
                <MainComponents 
                  categories={categories}
                  allTerms={allTerms}
                  setSelectedTerm={handleSelectTerm}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  startQuiz={startQuiz}
                  quizMode={quizMode}
                  quizQuestion={quizQuestion}
                  quizResult={quizResult}
                  answerQuiz={answerQuiz}
                  nextQuestion={nextQuestion}
                  endQuiz={endQuiz}
                  updateTermOrder={updateTermOrder}
                />
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