import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TermList from './components/TermList';
import TermDetails from './components/TermDetails';
import Quiz from './components/Quiz';
import Footer from './components/Footer';
import LoginDialog from './components/LoginDialog';
import RegisterDialog from './components/RegisterDialog';
import terms from './data/terms';

const VisualTextbook = () => {
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [quizMode, setQuizMode] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(terms);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user) {
      const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${user.username}`)) || [];
      setFavorites(storedFavorites);
    } else {
      setFavorites([]);
    }
  }, [user]);

  const toggleFavorite = (termId) => {
    if (!user) {
      alert('お気に入りを追加するにはログインが必要です。');
      return;
    }

    const newFavorites = favorites.includes(termId)
      ? favorites.filter(id => id !== termId)
      : [...favorites, termId];
    setFavorites(newFavorites);
    localStorage.setItem(`favorites_${user.username}`, JSON.stringify(newFavorites));
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

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filteredResults = terms.filter((t) =>
      t.name.toLowerCase().includes(term.toLowerCase()) ||
      t.description.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header 
        user={user}
        setIsLoginOpen={setIsLoginOpen}
        setIsRegisterOpen={setIsRegisterOpen}
        handleLogout={handleLogout}
        onSearch={handleSearch} 
        searchResults={searchResults} // 追加
        setSelectedTerm={setSelectedTerm} // 追加
      />
      <main className="flex-grow flex">
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
      />
    </div>
  );
};

export default VisualTextbook;
