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
import { PurposeGrid } from './PurposeGrid'
import { DecisionTriage } from './DecisionTriage'
import { EARScriptBuilder } from './EARScriptBuilder'
import { IfThenPlanner } from './IfThenPlanner'
import { FlexibilityInventory } from './FlexibilityInventory'
import { FlexibilitySprint } from './FlexibilitySprint'
import { SnapshotTable, BaselineComparison, FlexibilityOSBuilder, SprintPlanner } from './IntegrationTools'
import { IntegrationReflection } from './IntegrationReflection'
import { ChallengeTracker } from './ChallengeTracker'
import { ChallengeReflection } from './ChallengeReflection'
import { ChallengeStory } from './ChallengeStory'
import { RedLineReflection } from './RedLineReflection'
import { RedLineChallenge } from './RedLineChallenge'
import { BaselineAssessment } from './BaselineAssessment'
import { EmotionGranularity } from './EmotionGranularity'
import { ValuesMap } from './ValuesMap'
import { EICompass } from './EICompass'
import { TriggerMap } from './TriggerMap'
import { InteroceptionScanner } from './InteroceptionScanner'
import { StoryRewriter } from './StoryRewriter'

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
      
      // Lesson 4: The Red Line Meeting - ID 20
      if (lessonId === 20) {
        if (type === 'story') {
          const sections: any[] = []
          const lines = text.split('\n')
          let currentText = ''
          let inEQSection = false
          let inBreathingSection = false
          let inIfThenSection = false
          
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            
            // Detect EQ Assessment section
            if (line.includes('## 📊 Interactive EQ Assessment')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'eq-assessment' })
              inEQSection = true
              continue
            }
            
            // Skip the EQ template content
            if (inEQSection && line.includes('### 📈 Your Assessment Results')) {
              inEQSection = false
              continue
            }
            
            if (inEQSection) continue
            
            // Detect Breathing Exercise section
            if (line.includes('## 🫁 The Breathing Reset')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'breathing-exercise' })
              inBreathingSection = true
              continue
            }
            
            // Skip the breathing template content
            if (inBreathingSection && line.includes('### 🎯 Practice Now')) {
              inBreathingSection = false
              continue
            }
            
            if (inBreathingSection) continue
            
            // Detect If-Then Planner section
            if (line.includes('## 🎯 If-Then Planning')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'if-then-planner' })
              inIfThenSection = true
              continue
            }
            
            // Skip the if-then template content
            if (inIfThenSection && line.includes('## 🔄 The Red Line Loop')) {
              inIfThenSection = false
            }
            
            if (inIfThenSection) continue
            
            currentText += line + '\n'
          }
          
          if (currentText.trim()) {
            sections.push({ type: 'text', content: currentText })
          }
          
          return sections
        }
        
        if (type === 'reflection') {
          // Use the custom interactive reflection component for lesson 20
          return [{ type: 'redline-reflection', content: '' }]
        }
        
        if (type === 'challenge') {
          // Use the custom interactive challenge component for lesson 20
          return [{ type: 'redline-challenge', content: '' }]
        }
        
        sections.push({ type: 'text', content: text })
        return sections
      }
      
      // Lesson 5: EI Foundations & Baseline - ID 21
      if (lessonId === 21) {
        if (type === 'story') {
          // Story tab shows the theory and framework
          sections.push({ type: 'text', content: text })
        } else if (type === 'reflection') {
          // Reflection tab has the baseline assessment and exercises
          const lines = text.split('\n')
          let currentText = ''
          
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            
            if (line.includes('<baseline-assessment>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'baseline-assessment' })
              continue
            }
            
            if (line.includes('<emotion-granularity>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'emotion-granularity' })
              continue
            }
            
            if (line.includes('<values-map>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'values-map' })
              continue
            }
            
            currentText += line + '\n'
          }
          
          if (currentText.trim()) {
            sections.push({ type: 'text', content: currentText })
          }
        } else if (type === 'challenge') {
          // Challenge tab has the EI Compass and drills
          const lines = text.split('\n')
          let currentText = ''
          let inDrillSection = false
          
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            
            // Check if we're entering a drill section
            if (line.includes('Practice Drills: Choose Your Training') ||
                line.includes('Select TWO drills based on')) {
              inDrillSection = true
              // Add the section header but skip the drill details
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              currentText = '## Practice Drills: Choose Your Training\n\n*Select TWO drills based on your lowest pillars from your baseline assessment.*\n\n'
              continue
            }
            
            // Check if we're exiting drill section
            if (inDrillSection && (
                line.includes('Your 7-Day Practice Plan') ||
                line.includes('Daily Minimums') ||
                line.includes('The Accountability Framework'))) {
              inDrillSection = false
            }
            
            // Skip drill details
            if (inDrillSection && (
                line.includes('Drill 1:') || 
                line.includes('Drill 2:') || 
                line.includes('Drill 3:') ||
                line.includes('If these are your weak points') ||
                line.includes('Pre-load your responses') ||
                line.includes('Practice the Listen-Reflect-Label'))) {
              continue
            }
            
            if (line.includes('<ei-compass>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'ei-compass' })
              continue
            }
            
            // Skip placeholder tags
            if (line.includes('</ei-compass>') ||
                line.includes('<body-scan-drill>') || 
                line.includes('</body-scan-drill>') ||
                line.includes('<if-then-builder>') || 
                line.includes('</if-then-builder>') ||
                line.includes('<lrl-practice>') || 
                line.includes('</lrl-practice>')) {
              continue
            }
            
            currentText += line + '\n'
          }
          
          if (currentText.trim()) {
            sections.push({ type: 'text', content: currentText })
          }
        }
        return sections
      }
      
      // Lesson 3: Self-Awareness - ID 22  
      if (lessonId === 22) {
        if (type === 'reflection') {
          // Parse for trigger map, interoception scanner, and story rewriter
          const lines = text.split('\n')
          let currentText = ''
          
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            
            if (line.includes('<trigger-map>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'trigger-map' })
              continue
            }
            
            if (line.includes('<interoception-scanner>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'interoception-scanner' })
              continue
            }
            
            if (line.includes('<story-rewriter>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'story-rewriter' })
              continue
            }
            
            currentText += line + '\n'
          }
          
          if (currentText.trim()) {
            sections.push({ type: 'text', content: currentText })
          }
          
          return sections
        }
        
        // For story and challenge tabs, just render as text
        sections.push({ type: 'text', content: text })
        return sections
      }
      
      // Lesson 6: Self-Regulation - ID 23 (was 22, now moved)
      if (lessonId === 23) {
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
      
      // Lesson 5: Flexibility in Action - ID 41
      if (lessonId === 41) {
        // For reflection tab, use the interactive inventory
        if (type === 'reflection') {
          return [{ type: 'flexibility-inventory', content: '' }]
        }
        
        // For challenge tab, use the interactive sprint component
        if (type === 'challenge') {
          return [{ type: 'flexibility-sprint', content: '' }]
        }
        
        // For story tab, inject interactive components
        const sections: any[] = []
        const lines = text.split('\n')
        let currentText = ''
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i]
          
          if (type === 'story') {
            // Inject Purpose Grid after the template section
            if (line.includes('PURPOSE GRID')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'purpose-grid', content: '' })
              // Skip the template text
              while (i < lines.length && !lines[i].includes('Why This Works')) {
                i++
              }
              i-- // Back up one to process "Why This Works"
              continue
            }
            
            // Inject Decision Triage after the protocol header
            if (line.includes('DECISION TRIAGE TIMER')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'decision-triage', content: '' })
              // Skip the triage steps
              while (i < lines.length && !lines[i].includes('Real-World Examples')) {
                i++
              }
              i-- // Back up one
              continue
            }
            
            // Inject EAR Script Builder after the EAR section
            if (line.includes('The EAR Script — Conflict to Collaboration')) {
              currentText += line + '\n'
              // Add the explanation first
              while (i + 1 < lines.length && !lines[i + 1].includes('Team Scenario Examples')) {
                i++
                currentText += lines[i] + '\n'
              }
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'ear-script', content: '' })
              continue
            }
            
            // Inject If-Then Planner after the micro-playbook
            if (line.includes('The If-Then Micro-Playbook')) {
              currentText += line + '\n'
              // Include the format and table
              while (i + 1 < lines.length && !lines[i + 1].includes('Personal Examples That Actually Work')) {
                i++
                currentText += lines[i] + '\n'
              }
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'if-then-planner', content: '' })
              continue
            }
          }
          
          currentText += line + '\n'
        }
        
        if (currentText.trim()) {
          sections.push({ type: 'text', content: currentText })
        }
        
        return sections
      }
      
      // Lesson 7: The 7-Day Reframe Challenge - ID 43
      if (lessonId === 43) {
        // For story tab, show both content and interactive setup
        if (type === 'story') {
          const sections = []
          
          // Split the content into sections around the pre-challenge setup
          const setupIndex = text.indexOf('## 📋 Pre-Challenge Setup')
          const missionIndex = text.indexOf('## Your Mission:')
          
          if (setupIndex !== -1) {
            // Add content before the setup section
            sections.push({ 
              type: 'text', 
              content: text.substring(0, setupIndex) 
            })
            
            // Add interactive setup component
            sections.push({ type: 'challenge-story', content: '' })
            
            // Add content after the mission section if it exists
            if (missionIndex !== -1 && missionIndex > setupIndex) {
              sections.push({ 
                type: 'text', 
                content: text.substring(missionIndex) 
              })
            }
          } else {
            // Fallback: show interactive component at the end
            sections.push({ type: 'text', content: text })
            sections.push({ type: 'challenge-story', content: '' })
          }
          
          return sections
        }
        
        // For the capstone challenge, use the interactive tracker
        if (type === 'challenge') {
          return [{ type: 'challenge-tracker', content: '' }]
        }
        
        // For reflection tab, use the interactive reflection component
        if (type === 'reflection') {
          return [{ type: 'challenge-reflection', content: '' }]
        }
        
        // For other tabs, return normal text content
        return [{ type: 'text', content: text }]
      }
      
      // Lesson 6: Reflection & Integration - ID 42
      if (lessonId === 42) {
        if (type === 'story') {
          // Add interactive components at key points
          const sections: any[] = []
          // Use partial matches since headers have additional text
          const snapshotIndex = text.indexOf('📊 Results Review')
          const baselineIndex = text.indexOf('📈 Re-Run Your Baseline')
          const osBuilderIndex = text.indexOf('🖥️ Your Flexibility OS')
          
          if (snapshotIndex > 0) {
            sections.push({
              type: 'text',
              content: text.substring(0, snapshotIndex)
            })
            sections.push({ type: 'snapshot-table', content: '' })
            
            const nextSection = baselineIndex > 0 ? baselineIndex : text.length
            sections.push({
              type: 'text',
              content: text.substring(snapshotIndex, nextSection)
            })
          }
          
          if (baselineIndex > 0) {
            sections.push({ type: 'baseline-comparison', content: '' })
            
            const nextSection = osBuilderIndex > 0 ? osBuilderIndex : text.length
            sections.push({
              type: 'text',
              content: text.substring(baselineIndex, nextSection)
            })
          }
          
          if (osBuilderIndex > 0) {
            sections.push({ type: 'flexibility-os', content: '' })
            sections.push({
              type: 'text',
              content: text.substring(osBuilderIndex)
            })
          }
          
          if (sections.length === 0) {
            sections.push({ type: 'text', content: text })
          }
          
          return sections
        } else if (type === 'challenge') {
          // Use the sprint planner for the challenge tab
          return [{ type: 'sprint-planner', content: '' }]
        } else if (type === 'reflection') {
          // Use the interactive reflection component
          return [{ type: 'integration-reflection', content: '' }]
        }
        
        // Default fallback (shouldn't reach here)
        return [{ type: 'text', content: text }]
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
      
      case 'purpose-grid':
        return (
          <div key={index} className="my-8">
            <PurposeGrid lessonId={lessonId} />
          </div>
        )
      
      case 'decision-triage':
        return (
          <div key={index} className="my-8">
            <DecisionTriage lessonId={lessonId} />
          </div>
        )
      
      case 'ear-script':
        return (
          <div key={index} className="my-8">
            <EARScriptBuilder lessonId={lessonId} />
          </div>
        )
      
      case 'if-then-planner':
        return (
          <div key={index} className="my-8">
            <IfThenPlanner lessonId={lessonId} />
          </div>
        )
      
      case 'flexibility-inventory':
        return (
          <div key={index} className="my-8">
            <FlexibilityInventory lessonId={lessonId} />
          </div>
        )
      
      case 'flexibility-sprint':
        return (
          <div key={index} className="my-8">
            <FlexibilitySprint lessonId={lessonId} />
          </div>
        )
      
      case 'snapshot-table':
        return (
          <div key={index} className="my-8">
            <SnapshotTable lessonId={lessonId} />
          </div>
        )
      
      case 'baseline-comparison':
        return (
          <div key={index} className="my-8">
            <BaselineComparison lessonId={lessonId} />
          </div>
        )
      
      case 'flexibility-os':
        return (
          <div key={index} className="my-8">
            <FlexibilityOSBuilder lessonId={lessonId} />
          </div>
        )
      
      case 'sprint-planner':
        return (
          <div key={index} className="my-8">
            <SprintPlanner lessonId={lessonId} />
          </div>
        )
      
      case 'integration-reflection':
        return (
          <div key={index} className="my-8">
            <IntegrationReflection lessonId={lessonId} />
          </div>
        )
      
      case 'redline-reflection':
        return (
          <div key={index} className="my-8">
            <RedLineReflection />
          </div>
        )
      
      case 'redline-challenge':
        return (
          <div key={index} className="my-8">
            <RedLineChallenge />
          </div>
        )
      
      case 'baseline-assessment':
        return (
          <div key={index} className="my-8">
            <BaselineAssessment />
          </div>
        )
      
      case 'emotion-granularity':
        return (
          <div key={index} className="my-8">
            <EmotionGranularity />
          </div>
        )
      
      case 'values-map':
        return (
          <div key={index} className="my-8">
            <ValuesMap />
          </div>
        )
      
      case 'ei-compass':
        return (
          <div key={index} className="my-8">
            <EICompass />
          </div>
        )
      
      case 'trigger-map':
        return (
          <div key={index} className="my-8">
            <TriggerMap />
          </div>
        )
      
      case 'interoception-scanner':
        return (
          <div key={index} className="my-8">
            <InteroceptionScanner />
          </div>
        )
      
      case 'story-rewriter':
        return (
          <div key={index} className="my-8">
            <StoryRewriter />
          </div>
        )
      
      case 'challenge-tracker':
        return (
          <div key={index} className="my-8">
            <ChallengeTracker lessonId={lessonId} />
          </div>
        )
      
      case 'challenge-reflection':
        return (
          <div key={index} className="my-8">
            <ChallengeReflection lessonId={lessonId} />
          </div>
        )
      
      case 'challenge-story':
        return (
          <div key={index} className="my-8">
            <ChallengeStory lessonId={lessonId} />
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
      
      {/* Reflection editor - only at the end (skip for lessons with their own reflection editors) */}
      {type === 'reflection' && 
       lessonId !== 20 && // Lesson 20: Has RedLineReflection with its own interactive components
       lessonId !== 42 && // Lesson 6: Has IntegrationReflection with its own ReflectionEditor
       lessonId !== 43 && // Lesson 7: Has ChallengeReflection with its own ReflectionEditor
       (
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
      {type === 'challenge' && 
       lessonId !== 20 && // Lesson 20: Has RedLineChallenge with its own tracking system
       (
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
