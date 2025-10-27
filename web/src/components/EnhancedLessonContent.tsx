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
import { SimpleInteractiveContent } from './SimpleInteractiveContent'
import { EnhancedInteractiveContent } from './EnhancedInteractiveContent'
import { RedLineReflection } from './RedLineReflection'
import { RedLineChallenge } from './RedLineChallenge'
import { BaselineAssessment } from './BaselineAssessment'
import { EmotionGranularity } from './EmotionGranularity'
import { ValuesMap } from './ValuesMap'
import { EICompass } from './EICompass'
import { TriggerMap } from './TriggerMap'
import { InteroceptionScanner } from './InteroceptionScanner'
import { StoryRewriter } from './StoryRewriter'
import { SelfAwarenessChallenge } from './SelfAwarenessChallenge'
import { RegulationResetTimer } from './RegulationResetTimer'
import { GroundingExercise } from './GroundingExercise'
import { ReappraisalBuilder } from './ReappraisalBuilder'
import { RegulationSimulator } from './RegulationSimulator'
import { RegulationIntegrationCheck } from './RegulationIntegrationCheck'
import { ProtocolCardBuilder } from './ProtocolCardBuilder'
import { StateSwitchTracker } from './StateSwitchTracker'
import { RegulationExitReflection } from './RegulationExitReflection'
import { LRLDrill } from './LRLDrill'
import { ThreeHatsDrill } from './ThreeHatsDrill'
import { AsyncEmpathyDrill } from './AsyncEmpathyDrill'
import { EARPractice } from './EARPractice'
import { EmpathyCaseSimulator } from './EmpathyCaseSimulator'
import { EmpathyProtocolBuilder } from './EmpathyProtocolBuilder'
import { EmpathyTracker } from './EmpathyTracker'
import { SBIRewriter } from './SBIRewriter'
import { RequestBuilder } from './RequestBuilder'
import { NoOptionPractice } from './NoOptionPractice'
import { ClearRepairWorkshop } from './ClearRepairWorkshop'
import { AsyncTemplates } from './AsyncTemplates'
import { CommunicationCaseSimulator } from './CommunicationCaseSimulator'
import { CommunicationProtocolBuilder } from './CommunicationProtocolBuilder'
import { CommunicationTracker } from './CommunicationTracker'
import { CommunicationCommitment } from './CommunicationCommitment'
import { CommunicationExitCommitment } from './CommunicationExitCommitment'
import { CommunicationStoryCards } from './CommunicationStoryCards'
import { CommunicationOverview } from './CommunicationOverview'
import CapstoneOverview from './CapstoneOverview'
import CapstoneSetup from './CapstoneSetup'
import CapstoneCheckins from './CapstoneCheckins'
import CapstonePatterns from './CapstonePatterns'
import CapstoneIterations from './CapstoneIterations'
import CapstoneInsights from './CapstoneInsights'
import CapstoneTracker from './CapstoneTracker'
import CapstoneProgress from './CapstoneProgress'
import CapstoneSubmission from './CapstoneSubmission'

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
      
      // MODULE 3: Cognitive Flexibility (Lessons 37-43)
      
      // Handle all Module 3 lessons
      if (lessonId >= 37 && lessonId <= 43) {
        // Use EnhancedInteractiveContent for Lesson 38's reflection and challenge tabs
        if (lessonId === 38 && (type === 'reflection' || type === 'challenge')) {
          return [{
            type: 'enhanced-interactive',
            content: text,
            lessonId: lessonId,
            tabType: type
          }]
        }
        // Use SimpleInteractiveContent for other lessons' reflection and challenge tabs
        if (type === 'reflection' || type === 'challenge') {
          return [{
            type: 'simple-interactive',
            content: text,
            lessonId: lessonId,
            tabType: type
          }]
        }
        // For story tab, only use SimpleInteractiveContent if it has underscores
        if (type === 'story' && text.includes('_____')) {
          return [{
            type: 'simple-interactive',
            content: text,
            lessonId: lessonId,
            tabType: type
          }]
        }
        
        // Special handling for Lesson 37 story tab with rating scale
        if (lessonId === 37 && type === 'story' && text.includes('Rate yourself on how often you demonstrate')) {
          const sections: any[] = []
          const ratingIndex = text.indexOf('Rate yourself on how often you demonstrate')
          
          // Add text before rating
          if (ratingIndex > 0) {
            sections.push({ type: 'text', content: text.substring(0, ratingIndex) })
          }
          
          // Add the rating scale
          const questions = [
            { id: 'q1', text: 'I catch myself in rigid thinking patterns' },
            { id: 'q2', text: 'I can find multiple interpretations of events' },
            { id: 'q3', text: 'I shift strategies when the first isn\'t working' },
            { id: 'q4', text: 'I update my views with new information' },
            { id: 'q5', text: 'I see obstacles as puzzles, not walls' }
          ]
          
          sections.push({
            type: 'rating-scale',
            title: 'Cognitive Flexibility Self-Assessment',
            questions
          })
          
          // Find where the rating section ends
          const afterRatingMarkers = ['---', '## ', '### ']
          let endIndex = text.length
          for (const marker of afterRatingMarkers) {
            const markerIndex = text.indexOf(marker, ratingIndex + 100)
            if (markerIndex > 0 && markerIndex < endIndex) {
              endIndex = markerIndex
            }
          }
          
          // Add text after rating
          if (endIndex < text.length) {
            sections.push({ type: 'text', content: text.substring(endIndex) })
          }
          
          return sections
        }
      }
      
      // MODULE 2: Emotional Intelligence
      
      // OLD HANDLER FOR LESSON 26 - COMMENTED OUT (now handled by EI Mastery Capstone below)
      // if (lessonId === 26) {
      //   if (type === 'story') {
      //     sections.push({
      //       type: 'text',
      //       content: text.substring(0, Math.min(400, text.length))
      //     })
      //     sections.push({ type: 'emotion-wheel' })
      //     sections.push({
      //       type: 'text',
      //       content: text.substring(400)
      //     })
      //   } else {
      //     sections.push({ type: 'text', content: text })
      //   }
      //   return sections
      // }
      
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
        if (type === 'challenge') {
          // Return the interactive challenge component
          return [{ type: 'self-awareness-challenge' }]
        }
        
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
        
        // For story tab, just render as text
        sections.push({ type: 'text', content: text })
        return sections
      }
      
      // Lesson 5: Empathy - ID 24 (Emotional Intelligence Module)
      if (lessonId === 24) {
        if (type === 'reflection') {
          // Parse for empathy drills
          const lines = text.split('\n')
          const sections = []
          let currentText = ''
          
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            
            if (line.includes('<lrl-drill>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'lrl-drill' })
              continue
            }
            
            if (line.includes('<three-hats-drill>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'three-hats-drill' })
              continue
            }
            
            if (line.includes('<async-empathy-drill>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'async-empathy-drill' })
              continue
            }
            
            if (line.includes('<ear-practice>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'ear-practice' })
              continue
            }
            
            currentText += line + '\n'
          }
          
          if (currentText.trim()) {
            sections.push({ type: 'text', content: currentText })
          }
          
          return sections
        }
        
        if (type === 'challenge') {
          // Parse for challenge components
          const lines = text.split('\n')
          const sections = []
          let currentText = ''
          
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            
            if (line.includes('<empathy-case-simulator>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'empathy-case-simulator' })
              continue
            }
            
            if (line.includes('<empathy-protocol-builder>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'empathy-protocol-builder' })
              continue
            }
            
            if (line.includes('<empathy-tracker>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'empathy-tracker' })
              continue
            }
            
            currentText += line + '\n'
          }
          
          if (currentText.trim()) {
            sections.push({ type: 'text', content: currentText })
          }
          
          return sections
        }
      }
      
      // Lesson 6: Social Skills - ID 25 (Emotional Intelligence Module)
      if (lessonId === 25) {
        if (type === 'story') {
          // Return the overview and custom story cards components
          return [
            { type: 'communication-overview' },
            { type: 'communication-story-cards' }
          ]
        }
        
        if (type === 'reflection') {
          // Parse for social skills drills
          const lines = text.split('\n')
          const sections = []
          let currentText = ''
          
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            
            if (line.includes('<sbi-rewriter>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'sbi-rewriter' })
              continue
            }
            
            if (line.includes('<request-builder>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'request-builder' })
              continue
            }
            
            if (line.includes('<no-option-practice>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'no-option-practice' })
              continue
            }
            
            if (line.includes('<clear-repair-workshop>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'clear-repair-workshop' })
              continue
            }
            
            if (line.includes('<async-templates>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'async-templates' })
              continue
            }
            
            if (line.includes('<communication-commitment>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'communication-commitment' })
              continue
            }
            
            currentText += line + '\n'
          }
          
          if (currentText.trim()) {
            sections.push({ type: 'text', content: currentText })
          }
          
          return sections
        }
        
        if (type === 'challenge') {
          // Parse for challenge components
          const lines = text.split('\n')
          const sections = []
          let currentText = ''
          
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            
            if (line.includes('<communication-case-simulator>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'communication-case-simulator' })
              continue
            }
            
            if (line.includes('<communication-protocol-builder>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'communication-protocol-builder' })
              continue
            }
            
            if (line.includes('<communication-tracker>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'communication-tracker' })
              continue
            }
            
            if (line.includes('<communication-exit-commitment>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'communication-exit-commitment' })
              continue
            }
            
            currentText += line + '\n'
          }
          
          if (currentText.trim()) {
            sections.push({ type: 'text', content: currentText })
          }
          
          return sections
        }
      }
      
      // Lesson 7: EI Mastery Capstone - ID 26 (Emotional Intelligence Module)
      // Check for both string and number types
      if (lessonId === 26 || Number(lessonId) === 26) {
        
        if (type === 'story') {
          // Parse for capstone components
          const sections: any[] = []
          
          // Replace all component tags with markers and track their positions
          let processedText = text
          const components: any[] = []
          
          // Find and replace overview
          const overviewRegex = /<capstone-overview><\/capstone-overview>/g
          processedText = processedText.replace(overviewRegex, () => {
            const marker = `__COMPONENT_${components.length}__`
            components.push({ type: 'capstone-overview', marker })
            return marker
          })
          
          // Find and replace setup
          const setupRegex = /<capstone-setup><\/capstone-setup>/g
          processedText = processedText.replace(setupRegex, () => {
            const marker = `__COMPONENT_${components.length}__`
            components.push({ type: 'capstone-setup', marker })
            return marker
          })
          
          // Now split by component markers and rebuild sections
          const parts = processedText.split(/__COMPONENT_\d+__/)
          
          parts.forEach((part, index) => {
            if (part.trim()) {
              sections.push({ type: 'text', content: part })
            }
            if (index < components.length) {
              sections.push({ type: components[index].type })
            }
          })
          
          return sections
        }
        
        if (type === 'reflection') {
          // Parse for reflection components
          const sections: any[] = []
          
          // Replace all component tags with markers and track their positions
          let processedText = text
          const components: any[] = []
          
          
          // Find and replace checkins
          processedText = processedText.replace(/<capstone-checkins><\/capstone-checkins>/g, () => {
            const marker = `__COMPONENT_${components.length}__`
            components.push({ type: 'capstone-checkins', marker })
            return marker
          })
          
          // Find and replace patterns
          processedText = processedText.replace(/<capstone-patterns><\/capstone-patterns>/g, () => {
            const marker = `__COMPONENT_${components.length}__`
            components.push({ type: 'capstone-patterns', marker })
            return marker
          })
          
          // Find and replace iterations
          processedText = processedText.replace(/<capstone-iterations><\/capstone-iterations>/g, () => {
            const marker = `__COMPONENT_${components.length}__`
            components.push({ type: 'capstone-iterations', marker })
            return marker
          })
          
          // Find and replace insights
          processedText = processedText.replace(/<capstone-insights><\/capstone-insights>/g, () => {
            const marker = `__COMPONENT_${components.length}__`
            components.push({ type: 'capstone-insights', marker })
            return marker
          })
          
          // Now split by component markers and rebuild sections
          const parts = processedText.split(/__COMPONENT_\d+__/)
          
          parts.forEach((part, index) => {
            if (part.trim()) {
              sections.push({ type: 'text', content: part })
            }
            if (index < components.length) {
              sections.push({ type: components[index].type })
            }
          })
          
          return sections
        }
        
        if (type === 'challenge') {
          // Parse for challenge components
          const sections: any[] = []
          
          // Replace all component tags with markers and track their positions
          let processedText = text
          const components: any[] = []
          
          // Find and replace tracker
          processedText = processedText.replace(/<capstone-tracker><\/capstone-tracker>/g, () => {
            const marker = `__COMPONENT_${components.length}__`
            components.push({ type: 'capstone-tracker', marker })
            return marker
          })
          
          // Find and replace progress
          processedText = processedText.replace(/<capstone-progress><\/capstone-progress>/g, () => {
            const marker = `__COMPONENT_${components.length}__`
            components.push({ type: 'capstone-progress', marker })
            return marker
          })
          
          // Find and replace submission
          processedText = processedText.replace(/<capstone-submission><\/capstone-submission>/g, () => {
            const marker = `__COMPONENT_${components.length}__`
            components.push({ type: 'capstone-submission', marker })
            return marker
          })
          
          // Now split by component markers and rebuild sections
          const parts = processedText.split(/__COMPONENT_\d+__/)
          
          parts.forEach((part, index) => {
            if (part.trim()) {
              sections.push({ type: 'text', content: part })
            }
            if (index < components.length) {
              sections.push({ type: components[index].type })
            }
          })
          
          return sections
        }
        
        // Fallback for any other type in Lesson 26
        console.log('LESSON 26 - Fallback for type:', type)
        return [{ type: 'text', content: text }]
      }
      
      // Lesson 4: Self-Regulation - ID 23 (Emotional Intelligence Module)
      if (lessonId === 23) {
        if (type === 'reflection') {
          // Parse for regulation drills
          const lines = text.split('\n')
          let currentText = ''
          
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            
            if (line.includes('<regulation-reset-timer>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'regulation-reset-timer' })
              continue
            }
            
            if (line.includes('<grounding-exercise>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'grounding-exercise' })
              continue
            }
            
            if (line.includes('<reappraisal-builder>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'reappraisal-builder' })
              continue
            }
            
            // Check for Integration Check section
            if (line.includes('### Integration Check')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'regulation-integration-check' })
              // Skip the rest of the integration check content
              while (i < lines.length - 1 && !lines[i + 1].includes('### ')) {
                i++
              }
              continue
            }
            
            currentText += line + '\n'
          }
          
          if (currentText.trim()) {
            sections.push({ type: 'text', content: currentText })
          }
          
          return sections
        }
        
        if (type === 'challenge') {
          // Parse for challenge components
          const lines = text.split('\n')
          let currentText = ''
          
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            
            if (line.includes('<if-then-planner>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'if-then-planner' })
              continue
            }
            
            if (line.includes('<regulation-simulator>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'regulation-simulator' })
              continue
            }
            
            if (line.includes('<protocol-card-builder>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'protocol-card-builder' })
              continue
            }
            
            if (line.includes('<state-switch-tracker>')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'state-switch-tracker' })
              continue
            }
            
            // Check for Exit Reflection section
            if (line.includes('### Exit Reflection')) {
              if (currentText.trim()) {
                sections.push({ type: 'text', content: currentText })
                currentText = ''
              }
              sections.push({ type: 'regulation-exit-reflection' })
              // Skip the rest of the exit reflection content
              while (i < lines.length - 1 && !lines[i + 1].includes('### ')) {
                i++
              }
              continue
            }
            
            currentText += line + '\n'
          }
          
          if (currentText.trim()) {
            sections.push({ type: 'text', content: currentText })
          }
          
          return sections
        }
        
        // For story tab, just render as text
        sections.push({ type: 'text', content: text })
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
      
      // Removed special handling for Lesson 38 reflection - let it use the Module 3 handler
      
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
    // Debug logging for capstone components
    if (section.type && section.type.includes('capstone')) {
      console.log('RENDERING CAPSTONE COMPONENT:', section.type)
    }
    
    switch (section.type) {
      case 'simple-interactive':
        return (
          <div key={index} className="my-4">
            <SimpleInteractiveContent
              content={section.content}
              lessonId={section.lessonId}
              tabType={section.tabType}
              className=""
            />
          </div>
        )
      case 'enhanced-interactive':
        return (
          <div key={index} className="my-4">
            <EnhancedInteractiveContent
              content={section.content}
              lessonId={section.lessonId}
              tabType={section.tabType}
              className=""
            />
          </div>
        )
      
      case 'input-field':
        return (
          <div key={index} className="inline-block mx-1">
            <input
              type="text"
              className="w-64 px-3 py-1 border-b-2 border-gray-300 focus:border-primary focus:outline-none transition-colors"
              placeholder={section.placeholder || 'Type here...'}
              onChange={(e) => {
                // Store in local state or localStorage if needed
                const fieldId = `lesson-${lessonId}-${type}-field-${index}`
                localStorage.setItem(fieldId, e.target.value)
              }}
              defaultValue={
                // Retrieve saved value if exists
                typeof window !== 'undefined' 
                  ? localStorage.getItem(`lesson-${lessonId}-${type}-field-${index}`) || ''
                  : ''
              }
            />
          </div>
        )
        
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
      
      case 'self-awareness-challenge':
        return (
          <div key={index} className="my-8">
            <SelfAwarenessChallenge />
          </div>
        )
      
      case 'regulation-reset-timer':
        return (
          <div key={index} className="my-8">
            <RegulationResetTimer />
          </div>
        )
      
      case 'grounding-exercise':
        return (
          <div key={index} className="my-8">
            <GroundingExercise />
          </div>
        )
      
      case 'reappraisal-builder':
        return (
          <div key={index} className="my-8">
            <ReappraisalBuilder />
          </div>
        )
      
      case 'regulation-simulator':
        return (
          <div key={index} className="my-8">
            <RegulationSimulator />
          </div>
        )
      
      case 'regulation-integration-check':
        return (
          <div key={index} className="my-8">
            <RegulationIntegrationCheck />
          </div>
        )
      
      case 'protocol-card-builder':
        return (
          <div key={index} className="my-8">
            <ProtocolCardBuilder />
          </div>
        )
      
      case 'state-switch-tracker':
        return (
          <div key={index} className="my-8">
            <StateSwitchTracker />
          </div>
        )
      
      case 'regulation-exit-reflection':
        return (
          <div key={index} className="my-8">
            <RegulationExitReflection />
          </div>
        )
      
      // Lesson 5 (Empathy) Components
      case 'lrl-drill':
        return (
          <div key={index} className="my-8">
            <LRLDrill />
          </div>
        )
      
      case 'three-hats-drill':
        return (
          <div key={index} className="my-8">
            <ThreeHatsDrill />
          </div>
        )
      
      case 'async-empathy-drill':
        return (
          <div key={index} className="my-8">
            <AsyncEmpathyDrill />
          </div>
        )
      
      case 'ear-practice':
        return (
          <div key={index} className="my-8">
            <EARPractice />
          </div>
        )
      
      case 'empathy-case-simulator':
        return (
          <div key={index} className="my-8">
            <EmpathyCaseSimulator />
          </div>
        )
      
      case 'empathy-protocol-builder':
        return (
          <div key={index} className="my-8">
            <EmpathyProtocolBuilder />
          </div>
        )
      
      case 'empathy-tracker':
        return (
          <div key={index} className="my-8">
            <EmpathyTracker />
          </div>
        )
      
      // Lesson 6: Social Skills Components
      case 'sbi-rewriter':
        return (
          <div key={index} className="my-8">
            <SBIRewriter />
          </div>
        )
      
      case 'request-builder':
        return (
          <div key={index} className="my-8">
            <RequestBuilder />
          </div>
        )
      
      case 'no-option-practice':
        return (
          <div key={index} className="my-8">
            <NoOptionPractice />
          </div>
        )
      
      case 'clear-repair-workshop':
        return (
          <div key={index} className="my-8">
            <ClearRepairWorkshop />
          </div>
        )
      
      case 'async-templates':
        return (
          <div key={index} className="my-8">
            <AsyncTemplates />
          </div>
        )
      
      case 'communication-case-simulator':
        return (
          <div key={index} className="my-8">
            <CommunicationCaseSimulator />
          </div>
        )
      
      case 'communication-protocol-builder':
        return (
          <div key={index} className="my-8">
            <CommunicationProtocolBuilder />
          </div>
        )
      
      case 'communication-tracker':
        return (
          <div key={index} className="my-8">
            <CommunicationTracker />
          </div>
        )
      
      case 'communication-overview':
        return (
          <div key={index} className="my-8">
            <CommunicationOverview />
          </div>
        )
      
      case 'communication-story-cards':
        return (
          <div key={index} className="my-8">
            <CommunicationStoryCards />
          </div>
        )
      
      case 'communication-commitment':
        return (
          <div key={index} className="my-8">
            <CommunicationCommitment />
          </div>
        )
      
      case 'communication-exit-commitment':
        return (
          <div key={index} className="my-8">
            <CommunicationExitCommitment />
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
      
      // Capstone components
      case 'capstone-overview':
        return (
          <div key={index} className="my-8">
            <CapstoneOverview />
          </div>
        )
      
      case 'capstone-setup':
        return (
          <div key={index} className="my-8">
            <CapstoneSetup />
          </div>
        )
      
      case 'capstone-checkins':
        return (
          <div key={index} className="my-8">
            <CapstoneCheckins />
          </div>
        )
      
      case 'capstone-patterns':
        return (
          <div key={index} className="my-8">
            <CapstonePatterns />
          </div>
        )
      
      case 'capstone-iterations':
        return (
          <div key={index} className="my-8">
            <CapstoneIterations />
          </div>
        )
      
      case 'capstone-insights':
        return (
          <div key={index} className="my-8">
            <CapstoneInsights />
          </div>
        )
      
      case 'capstone-tracker':
        return (
          <div key={index} className="my-8">
            <CapstoneTracker />
          </div>
        )
      
      case 'capstone-progress':
        return (
          <div key={index} className="my-8">
            <CapstoneProgress />
          </div>
        )
      
      case 'capstone-submission':
        return (
          <div key={index} className="my-8">
            <CapstoneSubmission />
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
       lessonId !== 26 && // Lesson 26: Has capstone components with their own tracking
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
       lessonId !== 22 && // Lesson 22: Has SelfAwarenessChallenge with its own tracking system
       lessonId !== 26 && // Lesson 26: Has capstone components with their own tracking
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
