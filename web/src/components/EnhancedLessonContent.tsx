import { useState } from 'react'
import { MarkdownRenderer } from './MarkdownRenderer'
import { InteractiveRatingSet } from './InteractiveRatingScale'
import { FrameSpottingDrill, AlphabetNumberSwitch, FiveUsesChallenge } from './InteractiveExercise'
import { ReflectionEditor } from './ReflectionEditor'
import { BreathingExercise } from './BreathingExercise'
import { BiasInterrupter } from './BiasInterrupter'
import { LabelLoosenLadder } from './LabelLoosenLadder'
import { SteelmanSwap } from './SteelmanSwap'
import { MiniCaseStudy } from './MiniCaseStudy'
import { EarlyWarningSystem } from './EarlyWarningSystem'
import { EQAssessment } from './EQAssessment'
import { EmotionWheel } from './EmotionWheel'
import { ConflictSimulator } from './ConflictSimulator'
import { SMARTGoalsBuilder } from './SMARTGoalsBuilder'
import { ReframingSprintTimer, ReframingToolsExplorer, OptionsLadderBuilder } from './ReframingTools'
import { ReframingSprintWorksheet, PersonalReframeWorksheet } from './InteractiveWorksheet'
import { ProgressTracker } from './ProgressTracker'

interface EnhancedLessonContentProps {
  lessonId: number
  lessonTitle: string
  content: string
  type: 'story' | 'reflection' | 'challenge'
}

export function EnhancedLessonContent({ lessonId, lessonTitle, content, type }: EnhancedLessonContentProps) {
  const [reflectionSaved, setReflectionSaved] = useState(false)

  // Parse content to identify interactive sections
  const parseContent = (text: string) => {
    try {
      const sections: any[] = []
      
      // MODULE 1: Introduction to Resilience
      
      // Lesson 1: Overview of Resilience - ID 35
      if (lessonId === 35) {
        if (type === 'story') {
          sections.push({
            type: 'text',
            content: text.substring(0, Math.min(500, text.length))
          })
          sections.push({ type: 'eq-assessment' })
          sections.push({
            type: 'text',
            content: text.substring(500)
          })
        } else {
          sections.push({ type: 'text', content: text })
        }
        return sections
      }
      
      // Lesson 2: Goals of the Course - ID 36
      if (lessonId === 36) {
        if (type === 'story') {
          sections.push({
            type: 'text',
            content: text.substring(0, Math.min(600, text.length))
          })
          sections.push({ type: 'smart-goals' })
          sections.push({
            type: 'text',
            content: text.substring(600)
          })
        } else {
          sections.push({ type: 'text', content: text })
        }
        return sections
      }
      
      // MODULE 2: Emotional Intelligence
      
      // Lesson 3: Welcome to EI Module - ID 26
      if (lessonId === 26) {
        if (type === 'story') {
          sections.push({
            type: 'text',
            content: text.substring(0, Math.min(400, text.length))
          })
          sections.push({ type: 'emotion-wheel' })
          sections.push({
            type: 'text',
            content: text.substring(400)
          })
        } else {
          sections.push({ type: 'text', content: text })
        }
        return sections
      }
      
      // Lesson 4: Importance of EI - ID 20
      if (lessonId === 20) {
        if (type === 'story') {
          sections.push({
            type: 'text',
            content: text.substring(0, Math.min(800, text.length))
          })
          sections.push({ type: 'eq-assessment' })
          sections.push({
            type: 'text',
            content: text.substring(800)
          })
        } else {
          sections.push({ type: 'text', content: text })
        }
        return sections
      }
      
      // Lesson 5: Self-Awareness - ID 21
      if (lessonId === 21) {
        if (type === 'reflection') {
          sections.push({ type: 'emotion-wheel' })
          sections.push({ type: 'text', content: text })
        } else {
          sections.push({ type: 'text', content: text })
        }
        return sections
      }
      
      // Lesson 6: Self-Regulation - ID 22
      if (lessonId === 22) {
        if (type === 'story') {
          sections.push({
            type: 'text',
            content: text.substring(0, Math.min(700, text.length))
          })
          sections.push({ type: 'breathing-exercise' })
          sections.push({
            type: 'text',
            content: text.substring(700)
          })
        } else {
          sections.push({ type: 'text', content: text })
        }
        return sections
      }
      
      // Lesson 9: Conflict Resolution - ID 27 (the one with 12KB content!)
      if (lessonId === 27) {
        if (type === 'challenge') {
          sections.push({
            type: 'text',
            content: text.substring(0, Math.min(300, text.length))
          })
          sections.push({ type: 'conflict-simulator' })
          sections.push({
            type: 'text',
            content: text.substring(300)
          })
        } else {
          sections.push({ type: 'text', content: text })
        }
        return sections
      }
      
      // Lesson 10: Final Project - ID 28
      if (lessonId === 28) {
        if (type === 'challenge') {
          sections.push({ type: 'smart-goals' })
          sections.push({ type: 'text', content: text })
        } else {
          sections.push({ type: 'text', content: text })
        }
        return sections
      }
      
      // Lesson 4: Tools for Reframing - ID 40
      if (lessonId === 40) {
        if (type === 'story') {
          // Add tools explorer after the toolkit section
          const toolkitIndex = text.indexOf('## 🧰 Your Reframing Toolkit')
          if (toolkitIndex > 0) {
            sections.push({
              type: 'text',
              content: text.substring(0, toolkitIndex)
            })
            sections.push({ type: 'reframing-tools-explorer' })
            sections.push({
              type: 'text',
              content: text.substring(toolkitIndex)
            })
          } else {
            sections.push({ type: 'text', content: text })
          }
        } else if (type === 'reflection') {
          // Add interactive components instead of static text
          sections.push({ type: 'reframing-sprint-timer' })
          sections.push({ type: 'reframing-sprint-worksheet' })
          sections.push({ type: 'options-ladder-builder' })
          
          // Add personal reframe worksheet
          const personalIndex = text.indexOf('## 📝 Your Personal Go-To Reframe')
          if (personalIndex > 0) {
            sections.push({ type: 'personal-reframe-worksheet' })
          }
        } else if (type === 'challenge') {
          // Add progress tracker for challenge tab
          const trackerIndex = text.indexOf('### Reframing Tracker')
          if (trackerIndex > 0) {
            sections.push({
              type: 'text',
              content: text.substring(0, trackerIndex)
            })
            sections.push({ type: 'progress-tracker', lessonId: lessonId })
            // Skip the table part and continue with the rest
            const reflectionIndex = text.indexOf('### Reflection Prompts:')
            if (reflectionIndex > trackerIndex) {
              sections.push({
                type: 'text',
                content: text.substring(reflectionIndex)
              })
            }
          } else {
            sections.push({ type: 'text', content: text })
          }
        } else {
          sections.push({ type: 'text', content: text })
        }
        return sections
      }
      
      // For lesson 3 (Barriers & Biases) - ID 39
      if (lessonId === 39) {
        if (type === 'story') {
          // Check for breathing tip section
          if (text.includes('Breathing Tip')) {
            const breathingStart = text.indexOf('### 🫁 Breathing Tip')
            
            // Add content before breathing
            if (breathingStart > 0) {
              sections.push({
                type: 'text',
                content: text.substring(0, breathingStart)
              })
            }
            
            // Add breathing exercise
            sections.push({ type: 'breathing-exercise' })
            
            // Add bias interrupter table
            sections.push({ type: 'bias-interrupter' })
            
            return sections
          }
        } else if (type === 'reflection') {
          // Add intro text if any
          const drill1Start = text.indexOf('## Drill 1:')
          if (drill1Start > 0) {
            sections.push({
              type: 'text',
              content: text.substring(0, drill1Start)
            })
          }
          
          // Add Label → Loosen → Ladder drill
          sections.push({ type: 'label-loosen-ladder' })
          
          // Add Steelman & Swap drill
          sections.push({ type: 'steelman-swap' })
          
          // Add remaining text
          const personalReflectionStart = text.indexOf('## Personal Reflection')
          if (personalReflectionStart > 0) {
            sections.push({
              type: 'text',
              content: text.substring(personalReflectionStart)
            })
          }
          
          return sections
        } else if (type === 'challenge') {
          // For Lesson 3's challenge section
          const miniCasesStart = text.indexOf('## Choose One Mini Case')
          const exitTicketStart = text.indexOf('## Exit Ticket')
          
          // Add intro text if any
          if (miniCasesStart > 0) {
            sections.push({
              type: 'text',
              content: text.substring(0, miniCasesStart)
            })
          }
          
          // Add Mini Case Study component
          sections.push({ type: 'mini-case-study' })
          
          // Add Early Warning System builder
          sections.push({ type: 'early-warning-system' })
          
          // Add Exit Ticket and Homework sections
          if (exitTicketStart > 0) {
            sections.push({
              type: 'text',
              content: text.substring(exitTicketStart)
            })
          }
          
          return sections
        }
      }
      
      // For lesson 12's reflection content specifically, add interactive exercises
      if (type === 'reflection' && lessonId === 38) {
        // Extract only the intro text before the drills
        const drill1Start = text.indexOf('## Drill 1:')
        const miniCasesStart = text.indexOf('## Mini Cases:')
        
        // Add header/intro text only
        if (drill1Start > 0) {
          sections.push({
            type: 'text',
            content: text.substring(0, drill1Start)
          })
        }
        
        // Add Frame-Spotting exercise (replacing Drill 1 text)
        sections.push({
          type: 'frame-spotting',
          exercises: [
            { 
              statement: "We have to meet in person to make this decision.",
              exampleMethod: "in-person meeting",
              examplePurpose: "high-quality decision with shared context",
              exampleAlternatives: ["async memo + annotated comments", "20-min video huddle with decision brief"]
            },
            { statement: "The launch must be on Friday or it's a failure." },
            { statement: "If we can't afford a full data platform, we can't personalize." },
            { statement: "I need absolute quiet to study effectively." },
            { statement: "Without that teammate, this project can't move." }
          ]
        })
        
        // Add Alphabet-Number Switch (replacing Drill 2 text)
        sections.push({ type: 'alphabet-number' })
        
        // Add 5 Uses Challenge
        sections.push({ type: 'five-uses' })
        
        // Add only the Mini Cases section and beyond if it exists
        if (miniCasesStart > 0) {
          sections.push({
            type: 'text',
            content: text.substring(miniCasesStart)
          })
        }
        
        return sections
      }
      
      // For lesson 11's reflection (or any other lesson with rating scale)
      if (type === 'reflection' && text.includes('Rate yourself')) {
        // Find where the rating scale starts
        const ratingStart = text.indexOf('Rate yourself')
        
        // Add text before rating
        if (ratingStart > 0) {
          sections.push({
            type: 'text',
            content: text.substring(0, ratingStart)
          })
        }
        
        // Add rating scale with questions
        const questions = [
          { id: 'q1', text: 'When a plan fails, I can quickly think of at least two alternatives.' },
          { id: 'q2', text: 'I can hold two different explanations for the same event without getting upset.' },
          { id: 'q3', text: 'I change my approach when new information appears, even if it contradicts my initial plan.' },
          { id: 'q4', text: 'In conflict, I can restate the other person\'s viewpoint better than they can.' },
          { id: 'q5', text: 'I look for what\'s available now instead of fixating on what\'s missing.' },
          { id: 'q6', text: 'I can pivot from "Who\'s at fault?" to "What\'s the next best move?"' },
          { id: 'q7', text: 'I regularly ask, "What else could this mean?" before reacting.' }
        ]
        
        sections.push({
          type: 'rating-scale',
          title: 'Cognitive Flexibility Baseline',
          questions
        })
        
        // Add text after rating
        const afterRatingText = text.substring(text.indexOf('### Scoring') || text.length)
        if (afterRatingText) {
          sections.push({
            type: 'text',
            content: afterRatingText
          })
        }
        
        return sections
      }
      
      // Default: just return the content as text
      sections.push({
        type: 'text',
        content: text
      })
      
      return sections
    } catch (error) {
      console.error('Error parsing content:', error)
      // Fallback: return content as plain text
      return [{ type: 'text', content: text }]
    }
  }

  const sections = parseContent(content)

  const renderSection = (section: any, index: number) => {
    switch (section.type) {
      case 'rating-scale':
        return (
          <div key={index} className="my-8">
            <InteractiveRatingSet
              title={section.title}
              questions={section.questions}
              onComplete={(scores) => {
                const total = Object.values(scores).reduce((sum: number, val: any) => sum + val, 0)
                console.log('Rating scores:', scores, 'Total:', total)
              }}
            />
          </div>
        )
      
      case 'frame-spotting':
        return (
          <div key={index} className="my-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Drill 1: Frame-Spotting (7–10 minutes)</h3>
            <p className="text-gray-600 mb-4">
              <strong>Goal:</strong> Train Frame Awareness by separating method (bridge) from purpose (reconnect).
            </p>
            <FrameSpottingDrill
              exercises={section.exercises.map((ex: any, i: number) => ({
                id: i,
                statement: ex.statement,
                exampleMethod: ex.exampleMethod,
                examplePurpose: ex.examplePurpose,
                exampleAlternatives: ex.exampleAlternatives
              }))}
              onComplete={(responses: any[]) => console.log(`Frame-Spotting Completed`, responses)}
            />
          </div>
        )
      
      case 'alphabet-number':
        return (
          <div key={index} className="my-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Drill 2: Alphabet-Number Switch (2–3 minutes)</h3>
            <p className="text-gray-600 mb-4">
              Write: A-1-B-2-C-3 … up to M-13 (or as far as you can in 2 minutes) without errors.
            </p>
            <AlphabetNumberSwitch />
          </div>
        )
      
      case 'five-uses':
        return (
          <div key={index} className="my-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Constraint Creativity — 5 Uses (3–5 minutes)</h3>
            <p className="text-gray-600 mb-4">
              Choose an everyday object. In 3 minutes, list 5 uses beyond the obvious.
            </p>
            <FiveUsesChallenge />
          </div>
        )
      
      case 'breathing-exercise':
        return (
          <div key={index} className="my-8">
            <BreathingExercise />
          </div>
        )
      
      case 'bias-interrupter':
        return (
          <div key={index} className="my-8">
            <BiasInterrupter />
          </div>
        )
      
      case 'label-loosen-ladder':
        return (
          <div key={index} className="my-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Drill 1: Label → Loosen → Ladder
            </h3>
            <LabelLoosenLadder />
          </div>
        )
      
      case 'steelman-swap':
        return (
          <div key={index} className="my-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Drill 2: Steelman & Swap
            </h3>
            <SteelmanSwap />
          </div>
        )
      
      case 'mini-case-study':
        return (
          <div key={index} className="my-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              📚 Mini Case Studies
            </h3>
            <MiniCaseStudy />
          </div>
        )
      
      case 'early-warning-system':
        return (
          <div key={index} className="my-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              🚨 Build Your Early Warning System
            </h3>
            <EarlyWarningSystem />
          </div>
        )
      
      case 'text':
        // Skip empty sections or sections with only whitespace
        if (!section.content.trim()) return null
        
        // Just render the markdown content
        return (
          <div key={index}>
            <MarkdownRenderer content={section.content} />
          </div>
        )
      
      case 'eq-assessment':
        return (
          <div key={index} className="my-8">
            <EQAssessment />
          </div>
        )
      
      case 'emotion-wheel':
        return (
          <div key={index} className="my-8">
            <EmotionWheel />
          </div>
        )
      
      case 'conflict-simulator':
        return (
          <div key={index} className="my-8">
            <ConflictSimulator />
          </div>
        )
      
      case 'smart-goals':
        return (
          <div key={index} className="my-8">
            <SMARTGoalsBuilder />
          </div>
        )
      
      case 'reframing-tools-explorer':
        return (
          <div key={index} className="my-8">
            <ReframingToolsExplorer />
          </div>
        )
      
      case 'reframing-sprint-timer':
        return (
          <div key={index} className="my-8">
            <ReframingSprintTimer />
          </div>
        )
      
      case 'options-ladder-builder':
        return (
          <div key={index} className="my-8">
            <OptionsLadderBuilder />
          </div>
        )
      
      case 'reframing-sprint-worksheet':
        return (
          <div key={index} className="my-8">
            <ReframingSprintWorksheet />
          </div>
        )
      
      case 'personal-reframe-worksheet':
        return (
          <div key={index} className="my-8">
            <PersonalReframeWorksheet />
          </div>
        )
      
      case 'progress-tracker':
        return (
          <div key={index} className="my-8">
            <ProgressTracker lessonId={section.lessonId} />
          </div>
        )
      
      default:
        return null
    }
  }

  // Show what we're about to render
  if (!content) {
    return <div>No content available</div>
  }

  // Check if this lesson has interactive reflection exercises
  const hasReflectionExercises = type === 'reflection' && (
    lessonId === 37 || // Lesson 11: The Bridge in the Storm
    lessonId === 38 || // Lesson 12: What Is Cognitive Flexibility?
    lessonId === 39    // Lesson 13: Barriers & Biases
  )
  
  return (
    <div className="space-y-6">
      {/* Progress indicator for exercises - only for lessons that actually have them */}
      {hasReflectionExercises && lessonId === 38 && (
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Interactive Exercises Available</span>
          <div className="flex space-x-2">
            <span className="px-2 py-1 bg-white rounded text-xs font-medium text-gray-600">
              Frame-Spotting
            </span>
            <span className="px-2 py-1 bg-white rounded text-xs font-medium text-gray-600">
              Alphabet-Number Switch
            </span>
            <span className="px-2 py-1 bg-white rounded text-xs font-medium text-gray-600">
              5 Uses Challenge
            </span>
          </div>
        </div>
      )}
      {hasReflectionExercises && lessonId === 37 && (
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Interactive Exercise Available</span>
          <div className="flex space-x-2">
            <span className="px-2 py-1 bg-white rounded text-xs font-medium text-gray-600">
              Rating Scale
            </span>
          </div>
        </div>
      )}
      {hasReflectionExercises && lessonId === 39 && (
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Interactive Exercises Available</span>
          <div className="flex space-x-2">
            <span className="px-2 py-1 bg-white rounded text-xs font-medium text-gray-600">
              Label → Loosen → Ladder
            </span>
            <span className="px-2 py-1 bg-white rounded text-xs font-medium text-gray-600">
              Steelman & Swap
            </span>
          </div>
        </div>
      )}
      
      {/* Render all sections with proper separation */}
      {sections.length > 0 ? sections.map((section, index) => (
        <div key={index}>
          {renderSection(section, index)}
        </div>
      )) : <div>No sections to display</div>}
      
      {/* Reflection editor - only at the end */}
      {type === 'reflection' && (
        <div className="mt-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            ✏️ Your Personal Reflection Space
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Capture your thoughts, insights, and learnings from this lesson. Your reflections are automatically saved locally.
          </p>
          <ReflectionEditor
            lessonId={lessonId}
            lessonTitle={`${lessonTitle} - Reflection`}
            reflectionPrompt="Complete your exit ticket and journal any additional insights from this lesson."
            onSave={(content) => {
              setReflectionSaved(true)
              console.log('Reflection saved:', content)
            }}
          />
          {reflectionSaved && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
              ✅ Your reflection has been saved locally and will persist across sessions
            </div>
          )}
        </div>
      )}
      
      {/* Challenge completion tracker */}
      {type === 'challenge' && (
        <div className="mt-8 p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🎯 Track Your Progress</h3>
          <ReflectionEditor
            lessonId={lessonId}
            lessonTitle={`${lessonTitle} - Challenge Log`}
            reflectionPrompt="Document your daily practice: What did you try? What worked? What surprised you?"
            onSave={(content) => {
              console.log('Challenge log saved:', content)
            }}
          />
        </div>
      )}
    </div>
  )
}
