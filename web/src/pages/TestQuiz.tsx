import { InteractiveQuiz, QuizData } from '../components/InteractiveQuiz'

const sampleQuizData: QuizData = {
  questions: [
    {
      id: 1,
      question: "What is the primary goal of cognitive flexibility?",
      type: "multiple_choice",
      options: [
        "To avoid all challenges",
        "To think the same way consistently",
        "To adapt thinking patterns to new situations",
        "To eliminate all emotions"
      ],
      correct: 2,
      feedback: "Cognitive flexibility is about adapting your thinking patterns to effectively handle new and changing situations."
    },
    {
      id: 2,
      question: "The 'Bridge → Purpose → Options' framework helps us:",
      type: "multiple_select",
      options: [
        "Identify when a method isn't working",
        "Stay focused on the outcome we want",
        "Generate multiple alternative approaches",
        "Avoid making any decisions",
        "Stick rigidly to one plan"
      ],
      correct_answers: [0, 1, 2],
      feedback: "This framework helps us recognize when a method (bridge) fails, maintain focus on our purpose, and generate new options."
    },
    {
      id: 3,
      question: "Cognitive rigidity is always harmful and should be completely eliminated.",
      type: "true_false",
      correct: false,
      feedback: "Some structure and consistency can be beneficial. The goal is to recognize when rigidity becomes limiting and develop the ability to flex when needed."
    },
    {
      id: 4,
      question: "Which of these are signs of cognitive rigidity?",
      type: "multiple_select",
      options: [
        "Using phrases like 'This is the only way'",
        "Feeling stuck when plans change",
        "Being open to feedback",
        "Difficulty seeing other perspectives",
        "Adapting quickly to new information"
      ],
      correct_answers: [0, 1, 3],
      feedback: "Signs of cognitive rigidity include absolute thinking, difficulty with change, and trouble seeing alternative perspectives."
    },
    {
      id: 5,
      question: "The best time to practice cognitive flexibility is:",
      type: "multiple_choice",
      options: [
        "Only during major life crises",
        "When everything is going perfectly",
        "In small, everyday situations first",
        "Never - it's an innate trait"
      ],
      correct: 2,
      feedback: "Starting with small, everyday situations helps build the cognitive flexibility 'muscle' for when bigger challenges arise."
    }
  ]
}

export default function TestQuiz() {
  const handleQuizComplete = (score: number, total: number) => {
    console.log(`Quiz completed! Score: ${score}/${total}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🧠 Cognitive Flexibility Quiz Demo
        </h1>
        <p className="text-gray-600 mb-8">
          Test your understanding of cognitive flexibility concepts!
        </p>

        <div className="bg-white rounded-xl shadow-xl p-8">
          <InteractiveQuiz 
            quizData={sampleQuizData} 
            onComplete={handleQuizComplete}
          />
        </div>

        <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="font-semibold text-yellow-900 mb-2">📝 Quiz Features:</h3>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Multiple choice, true/false, and multiple select questions</li>
            <li>• Immediate feedback after each answer</li>
            <li>• Detailed results with explanations</li>
            <li>• 70% required to pass</li>
            <li>• Progress tracking throughout</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
