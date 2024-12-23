import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const Quiz = ({ quizQuestion, quizResult, answerQuiz, nextQuestion, endQuiz, currentQuestionIndex }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 pt-16 sm:pt-24 pb-8 sm:pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-6 sm:mb-8">クイズチャレンジ</h1>
        <div className="max-w-2xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-lg">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-blue-700">{quizQuestion.question}</h3>
          {quizResult === null ? (
            <ul className="space-y-3">
              {quizQuestion.options.map((option, index) => (
                <li key={index}>
                  <button
                    className="bg-blue-50 px-4 py-3 rounded-md w-full text-left hover:bg-blue-100 transition-colors duration-200"
                    onClick={() => answerQuiz(option)}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4">
              {quizResult.isCorrect ? (
                <div className="flex items-center text-green-600 bg-green-100 p-3 rounded-md">
                  <CheckCircle className="mr-2" />
                  <span className="font-semibold">正解です！</span>
                </div>
              ) : (
                <div className="bg-red-100 p-3 rounded-md">
                  <div className="flex items-center text-red-600 mb-2">
                    <XCircle className="mr-2" />
                    <span className="font-semibold">不正解です。</span>
                  </div>
                  <p><span className="font-semibold">正解:</span> {quizResult.correctAnswer}</p>
                  <p><span className="font-semibold">あなたの回答:</span> {quizResult.userAnswer}</p>
                </div>
              )}
              <div className="mt-6 flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
                {currentQuestionIndex !== 3 && (
                  <button
                    className="bg-blue-500 text-white px-6 py-2 rounded-md transition-colors duration-200 hover:bg-blue-600 w-full sm:w-auto"
                    onClick={nextQuestion}
                  >
                    次の問題
                  </button>
                )}
                <button
                  className="bg-gray-500 text-white px-6 py-2 rounded-md transition-colors duration-200 hover:bg-gray-600 w-full sm:w-auto"
                  onClick={endQuiz}
                >
                  クイズを終了
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;

