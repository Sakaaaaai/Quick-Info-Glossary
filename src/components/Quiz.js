import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const Quiz = ({ quizQuestion, quizResult, answerQuiz, nextQuestion, endQuiz }) => {
  return (
    <div className="bg-blue-100 p-4 rounded">
      <h3 className="text-lg font-semibold mb-2">{quizQuestion.question}</h3>
      {quizResult === null ? (
        <ul className="space-y-2">
          {quizQuestion.options.map((option, index) => (
            <li key={index}>
              <button className="bg-white px-4 py-2 rounded w-full text-left hover:bg-blue-200" onClick={() => answerQuiz(option)}>
                {option}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4">
          {quizResult.isCorrect ? (
            <div className="flex items-center text-green-600">
              <CheckCircle className="mr-2" />
              <span>正解です！</span>
            </div>
          ) : (
            <div>
              <div className="flex items-center text-red-600 mb-2">
                <XCircle className="mr-2" />
                <span>不正解です。</span>
              </div>
              <p>正解: {quizResult.correctAnswer}</p>
              <p>あなたの回答: {quizResult.userAnswer}</p>
            </div>
          )}
          <div className="mt-4 space-x-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={nextQuestion}>
              次の問題
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={endQuiz}>
              クイズを終了
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
