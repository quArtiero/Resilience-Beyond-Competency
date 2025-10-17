import { useState } from 'react'

export interface QuizQuestion {
  id?: number
  question?: string  // Made optional to support both fields
  text?: string  // Alternative field name used in some lessons
  type?: 'multiple_choice' | 'true_false' | 'multiple_select'  // Made optional for backward compatibility
  options?: string[]
  correct?: number | boolean  // Changed from correct_answer
  correct_answer?: number | boolean  // Keep for backward compatibility
  correct_answers?: number[]
  feedback?: string  // Changed from explanation
  explanation?: string  // Keep for backward compatibility
}

export interface QuizData {
  questions: QuizQuestion[]
  note?: string
}

interface InteractiveQuizProps {
  quizData: QuizData
  onComplete?: (score: number, totalQuestions: number) => void
}

export function InteractiveQuiz({ quizData, onComplete }: InteractiveQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)

  const question = quizData.questions[currentQuestion]
  const questionId = question.id ?? currentQuestion  // Use index if no id
  const isLastQuestion = currentQuestion === quizData.questions.length - 1
  const hasAnswer = answers[questionId] !== undefined

  const handleAnswer = (answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
    setShowExplanation(true) // Show explanation immediately after answering
  }

  const handleMultipleSelect = (optionIndex: number) => {
    const currentAnswers = answers[questionId] || []
    const newAnswers = currentAnswers.includes(optionIndex)
      ? currentAnswers.filter((idx: number) => idx !== optionIndex)
      : [...currentAnswers, optionIndex]
    
    setAnswers(prev => ({ ...prev, [questionId]: newAnswers }))
  }

  const checkAnswer = (questionItem: QuizQuestion, userAnswer: any): boolean => {
    // Default to multiple_choice if no type is specified but has options
    if (questionItem.type === 'multiple_choice' || (!questionItem.type && questionItem.options)) {
      const correctAnswer = questionItem.correct ?? questionItem.correct_answer
      return userAnswer === correctAnswer
    } else if (questionItem.type === 'true_false') {
      const correctAnswer = questionItem.correct ?? questionItem.correct_answer
      return userAnswer === correctAnswer
    } else if (questionItem.type === 'multiple_select') {
      const correctAnswers = questionItem.correct_answers || []
      const userAnswers = userAnswer || []
      return correctAnswers.length === userAnswers.length && 
             correctAnswers.every((ans: number) => userAnswers.includes(ans))
    }
    return false
  }

  const calculateScore = () => {
    let correct = 0
    quizData.questions.forEach((q, index) => {
      const qId = q.id ?? index
      if (checkAnswer(q, answers[qId])) {
        correct++
      }
    })
    return correct
  }

  const nextQuestion = () => {
    if (isLastQuestion) {
      const finalScore = calculateScore()
      setScore(finalScore)
      setShowResults(true)
      onComplete?.(finalScore, quizData.questions.length)
    } else {
      setCurrentQuestion(prev => prev + 1)
      setShowExplanation(false)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
      setShowExplanation(false)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setScore(0)
    setShowExplanation(false)
  }

  const renderQuestion = () => {
    // Default to multiple_choice if no type is specified
    if (question.type === 'multiple_choice' || (!question.type && question.options)) {
      return (
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <label key={index} className={`flex items-center space-x-3 ${
              hasAnswer ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}>
              <input
                type="radio"
                name={`question-${questionId}`}
                checked={answers[questionId] === index}
                onChange={() => !hasAnswer && handleAnswer(index)}
                disabled={hasAnswer}
                className="w-4 h-4 text-primary border-gray-300 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <span className={`${hasAnswer ? 'text-gray-500' : 'text-gray-700'} ${
                answers[questionId] === index ? 'font-semibold text-primary-700' : ''
              }`}>
                {option}
                {answers[questionId] === index && (
                  <span className="ml-2 text-primary-600">✓ Selected</span>
                )}
              </span>
            </label>
          ))}
        </div>
      )
    } else if (question.type === 'true_false') {
      return (
        <div className="space-y-3">
          <label className={`flex items-center space-x-3 ${
            hasAnswer ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}>
            <input
              type="radio"
              name={`question-${questionId}`}
              checked={answers[questionId] === true}
              onChange={() => !hasAnswer && handleAnswer(true)}
              disabled={hasAnswer}
              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span className={`${hasAnswer ? 'text-gray-500' : 'text-gray-700'} ${
              answers[questionId] === true ? 'font-semibold text-primary-700' : ''
            }`}>
              True
              {answers[questionId] === true && (
                <span className="ml-2 text-primary-600">✓ Selected</span>
              )}
            </span>
          </label>
          <label className={`flex items-center space-x-3 ${
            hasAnswer ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}>
            <input
              type="radio"
              name={`question-${questionId}`}
              checked={answers[questionId] === false}
              onChange={() => !hasAnswer && handleAnswer(false)}
              disabled={hasAnswer}
              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span className={`${hasAnswer ? 'text-gray-500' : 'text-gray-700'} ${
              answers[questionId] === false ? 'font-semibold text-primary-700' : ''
            }`}>
              False
              {answers[questionId] === false && (
                <span className="ml-2 text-primary-600">✓ Selected</span>
              )}
            </span>
          </label>
        </div>
      )
    } else if (question.type === 'multiple_select') {
      const userAnswers = answers[questionId] || []
      const hasAnyAnswer = userAnswers.length > 0
      
      return (
        <div className="space-y-3">
          <div className="text-sm text-gray-600 mb-3 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            💡 <strong>Note:</strong> Select all that apply. Once you make your selections, they will be locked.
          </div>
          {question.options?.map((option, index) => (
            <label key={index} className={`flex items-center space-x-3 ${
              hasAnyAnswer ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}>
              <input
                type="checkbox"
                checked={userAnswers.includes(index)}
                onChange={() => !hasAnyAnswer && handleMultipleSelect(index)}
                disabled={hasAnyAnswer}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <span className={`${hasAnyAnswer ? 'text-gray-500' : 'text-gray-700'} ${
                userAnswers.includes(index) ? 'font-semibold text-primary-700' : ''
              }`}>
                {option}
                {userAnswers.includes(index) && (
                  <span className="ml-2 text-primary-600">✓ Selected</span>
                )}
              </span>
            </label>
          ))}
          {hasAnyAnswer && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                ✅ <strong>Selections locked!</strong> You selected {userAnswers.length} option(s). 
                Click "Show Explanation" to see the correct answer.
              </p>
            </div>
          )}
        </div>
      )
    }
  }

  if (showResults) {
    const percentage = Math.round((score / quizData.questions.length) * 100)
    const passedQuiz = percentage >= 70
    
    return (
      <div className="space-y-6">
        {/* Overall Results */}
        <div className={`p-8 rounded-2xl shadow-lg ${
          passedQuiz 
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200' 
            : 'bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200'
        }`}>
          <div className="text-center">
            <div className={`text-6xl mb-4 ${passedQuiz ? 'text-green-600' : 'text-red-600'}`}>
              {passedQuiz ? '🎉' : '💪'}
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              {passedQuiz ? 'Excellent Work!' : 'Keep Learning!'}
            </h3>
            <div className={`text-6xl font-bold mb-3 ${passedQuiz ? 'text-green-600' : 'text-red-600'}`}>
              {percentage}%
            </div>
            <p className="text-xl text-gray-700 mb-4">
              You scored {score} out of {quizData.questions.length} questions correctly
            </p>
            <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold ${
              passedQuiz 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {passedQuiz ? '✅ Quiz Passed!' : '❌ Need 70% to Pass'}
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Detailed Results
          </h4>
          <div className="space-y-4">
            {quizData.questions.map((q, index) => {
              const qId = q.id ?? index
              const isCorrect = checkAnswer(q, answers[qId])
              const userAnswer = answers[qId]
              
              return (
                <div key={qId} className={`p-4 rounded-lg border-2 ${
                  isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900 mb-2">
                        Question {index + 1}: {q.question}
                      </h5>
                      <div className="text-sm text-gray-600 mb-2">
                        <strong>Your Answer:</strong> {
                          (q.type === 'multiple_choice' || (!q.type && q.options)) ? q.options?.[userAnswer] :
                          q.type === 'true_false' ? (userAnswer ? 'True' : 'False') :
                          q.type === 'multiple_select' ? userAnswer?.map((i: number) => q.options?.[i]).join(', ') :
                          'No answer'
                        }
                      </div>
                      {!isCorrect && (
                        <div className="text-sm text-gray-600 mb-2">
                          <strong>Correct Answer:</strong> {
                            (q.type === 'multiple_choice' || (!q.type && q.options)) ? q.options?.[(q.correct ?? q.correct_answer) as number] :
                            q.type === 'true_false' ? ((q.correct ?? q.correct_answer) ? 'True' : 'False') :
                            q.type === 'multiple_select' ? q.correct_answers?.map(i => q.options?.[i]).join(', ') :
                            'N/A'
                          }
                        </div>
                      )}
                      <div className="text-sm text-blue-700 bg-blue-100 p-3 rounded-md">
                        <strong>Explanation:</strong> {q.feedback || q.explanation || 'No explanation available'}
                      </div>
                    </div>
                    <div className={`ml-4 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                      {isCorrect ? '✓' : '✗'}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Performance Summary
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-red-600">{quizData.questions.length - score}</div>
              <div className="text-sm text-gray-600">Incorrect Answers</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className={`text-2xl font-bold ${passedQuiz ? 'text-green-600' : 'text-red-600'}`}>
                {passedQuiz ? 'PASS' : 'RETRY'}
              </div>
              <div className="text-sm text-gray-600">Result</div>
            </div>
          </div>
          
          {!passedQuiz && (
            <div className="mt-4 p-4 bg-yellow-100 rounded-lg border border-yellow-300">
              <h5 className="font-semibold text-yellow-800 mb-2">💡 Study Recommendations:</h5>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Review the lesson content in the Story and Reflection tabs</li>
                <li>• Focus on the areas where you got questions wrong</li>
                <li>• Take your time to understand the explanations provided</li>
                <li>• You need 70% or higher to pass and unlock the next lesson</li>
              </ul>
            </div>
          )}
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={restartQuiz}
            className="btn-secondary flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retake Quiz
          </button>
          <button
            onClick={() => onComplete?.(score, quizData.questions.length)}
            className="btn-primary flex items-center"
          >
            {passedQuiz ? (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Complete Lesson
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Continue Learning
              </>
            )}
          </button>
        </div>

        {quizData.note && (
          <div className="p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">{quizData.note}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Question {currentQuestion + 1} of {quizData.questions.length}</span>
        <span>{Math.round(((currentQuestion + 1) / quizData.questions.length) * 100)}% Complete</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="p-6 border border-gray-200 rounded-lg">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          {question.question || question.text}
        </h4>
        
        {renderQuestion()}

        {/* Show Explanation Button */}
        {hasAnswer && (
          <div className="mt-4">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="text-sm text-primary hover:text-primary-600 font-medium"
            >
              {showExplanation ? 'Hide' : 'Show'} Explanation
            </button>
          </div>
        )}

        {/* Explanation */}
        {showExplanation && (
          <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 shadow-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  checkAnswer(question, answers[questionId]) 
                    ? 'bg-green-500 text-white' 
                    : 'bg-red-500 text-white'
                }`}>
                  {checkAnswer(question, answers[questionId]) ? '✓' : '✗'}
                </div>
              </div>
              <div className="flex-1">
                <h5 className="font-bold text-gray-900 mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {checkAnswer(question, answers[questionId]) ? 'Correct!' : 'Learning Opportunity'}
                </h5>
                <p className="text-blue-800 leading-relaxed">
                  {question.feedback || question.explanation || 'No explanation available'}
                </p>
                {!checkAnswer(question, answers[questionId]) && (
                  <div className="mt-3 p-3 bg-yellow-100 rounded-lg border border-yellow-300">
                    <p className="text-sm text-yellow-800">
                      <strong>💡 Tip:</strong> Review this concept in the lesson content to better understand the material.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className={`btn-secondary ${currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>
        
        <button
          onClick={nextQuestion}
          disabled={!hasAnswer}
          className={`btn-primary ${!hasAnswer ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next'}
        </button>
      </div>
    </div>
  )
}
