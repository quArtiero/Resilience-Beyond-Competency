import { InteractiveRatingSet } from './InteractiveRatingScale'
import { FrameSpottingDrill, AlphabetNumberSwitch, FiveUsesChallenge } from './InteractiveExercise'

export function TestInteractiveLesson() {
  const ratingQuestions = [
    { id: 'q1', text: 'When a plan fails, I can quickly think of at least two alternatives.' },
    { id: 'q2', text: 'I can hold two different explanations for the same event without getting upset.' },
    { id: 'q3', text: 'I change my approach when new information appears.' },
    { id: 'q4', text: 'In conflict, I can restate the other person\'s viewpoint.' },
    { id: 'q5', text: 'I look for what\'s available now instead of fixating on what\'s missing.' },
    { id: 'q6', text: 'I can pivot from "Who\'s at fault?" to "What\'s the next best move?"' },
    { id: 'q7', text: 'I regularly ask, "What else could this mean?" before reacting.' }
  ]

  const frameExercises = [
    { 
      id: 1,
      statement: "We have to meet in person to make this decision.",
      exampleMethod: "in-person meeting",
      examplePurpose: "high-quality decision with shared context",
      exampleAlternatives: ["async memo + annotated comments", "20-min video huddle"]
    },
    { id: 2, statement: "The launch must be on Friday or it's a failure." },
    { id: 3, statement: "If we can't afford a full data platform, we can't personalize." },
    { id: 4, statement: "I need absolute quiet to study effectively." },
    { id: 5, statement: "Without that teammate, this project can't move." }
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Interactive Lesson Components Test</h1>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">1. Cognitive Flexibility Self-Assessment</h2>
        <InteractiveRatingSet
          title="Rate Your Current Flexibility"
          questions={ratingQuestions}
          onComplete={(scores) => console.log('Scores:', scores)}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">2. Frame-Spotting Exercise</h2>
        <FrameSpottingDrill
          exercises={frameExercises}
          onComplete={(responses) => console.log('Responses:', responses)}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">3. Alphabet-Number Switch</h2>
        <AlphabetNumberSwitch />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">4. Creative Uses Challenge</h2>
        <FiveUsesChallenge />
      </div>
    </div>
  )
}
