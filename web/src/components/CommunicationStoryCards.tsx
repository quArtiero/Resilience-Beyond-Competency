import { useState } from 'react'
import { Brain, Target, MessageSquare, AlertTriangle, CheckCircle, TrendingUp, BookOpen, ChevronDown, ChevronUp } from 'lucide-react'

interface Section {
  id: string
  title: string
  icon: any
  color: string
  content: string[]
  expanded?: boolean
}

const sections: Section[] = [
  {
    id: 'science',
    title: 'The Science of Clear Communication',
    icon: Brain,
    color: 'from-blue-500 to-indigo-600',
    content: [
      '🧠 **Your Brain on Ambiguity**: MIT research shows ambiguous communication activates the anterior cingulate cortex—the same region that processes physical pain. Unclear messages literally hurt.',
      '💭 **Cognitive Load Problem**: Working memory holds 7±2 items. Under stress: 3-4 items. Vague communication uses all slots just parsing meaning. Clear communication leaves room for problem-solving.',
      '📈 **The Clarity Dividend**: Clear communicators are 40% more likely to be promoted (HBR), 2x more likely to have requests accepted (Google), 3x faster at resolving conflicts (MIT Sloan).'
    ]
  },
  {
    id: 'framework',
    title: 'The Trinity Framework: Clear + Kind + Direct',
    icon: Target,
    color: 'from-purple-500 to-pink-600',
    content: [
      '**Clear** = Observable facts + Crisp requests + Single owner + Specific time/metric',
      '**Kind** = Respect the human (tone, brevity, no blame) + Name shared purpose',
      '**Direct** = Say the thing—no hedging, no sarcasm, no "hinting"',
      '❌ **NOT**: Sugarcoating, long speeches, vague asks, or "nice" avoidance',
      '💡 **Your One-Liner**: "Caring is clarity. Confusion is unkind."'
    ]
  },
  {
    id: 'neuroscience',
    title: 'The Neuroscience of Directness',
    icon: Brain,
    color: 'from-green-500 to-teal-600',
    content: [
      '😰 **Why We Hedge**: Fear of rejection → We soften requests → They become unclear',
      '😟 **Fear of conflict** → We hint instead of state → Message gets missed',
      '😳 **Fear of judgment** → We over-explain → Key point gets lost',
      '✨ **The Direct Communication Advantage**: Reduces cortisol in both speaker and listener, activates problem-solving networks faster, builds trust through predictability'
    ]
  },
  {
    id: 'toolkit',
    title: 'Communication Toolkit (6 Power Tools)',
    icon: MessageSquare,
    color: 'from-orange-500 to-red-600',
    content: [
      '**1. SBI + Request**: Situation → Behavior → Impact → Request (specific, dated, metric)',
      '**2. NVC-Lite (≤25 words)**: Observation → Feeling → Need → Request',
      '**3. EAR → Micro-Test**: Empathy → Acknowledge → Reframe + 48h test',
      '**4. No + Option**: "I can\'t X, and I can Y or Z. Which serves the purpose?"',
      '**5. Decision Recap**: "Decided: owner → action → date → metric. Review: __"',
      '**6. Clear Repair**: Impact → Intent → Repair → Request'
    ]
  },
  {
    id: 'matrix',
    title: 'Channel-Message Matrix',
    icon: CheckCircle,
    color: 'from-indigo-500 to-purple-600',
    content: [
      '**Face-to-Face/Video**: Performance feedback, conflict repair, emotional conversations, complex decisions',
      '**Written (Email/Slack)**: Decision recaps, simple requests, praise, process updates',
      '**Never in Writing**: Terminations, major conflicts, emotional processing, criticism without prior discussion'
    ]
  },
  {
    id: 'pitfalls',
    title: 'Common Pitfalls (And How to Avoid)',
    icon: AlertTriangle,
    color: 'from-yellow-500 to-orange-600',
    content: [
      '🥪 **Compliment Sandwich**: People only hear the negative → Separate praise and feedback conversations',
      '💭 **The Hint Drop**: Hoping they\'ll figure it out → State directly what you need',
      '🍝 **The Kitchen Sink**: Bringing up everything at once → One issue per conversation',
      '🔮 **Mind Reader Expectation**: "They should know" → State expectations explicitly',
      '⏰ **Retroactive Standard**: Judging by unstated criteria → Share standards before work begins'
    ]
  },
  {
    id: 'business',
    title: 'The Business Case',
    icon: TrendingUp,
    color: 'from-cyan-500 to-blue-600',
    content: [
      '💰 Unclear communication costs companies $62.4M/year (SIS International)',
      '❌ 70% of errors trace to communication failures (CRICO Strategies)',
      '📈 Clear communicators earn 10% more over careers (LinkedIn data)',
      '🚀 Teams with clear communication protocols are 25% more productive (McKinsey)'
    ]
  }
]

export function CommunicationStoryCards() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['science', 'framework']))

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  const expandAll = () => {
    setExpandedSections(new Set(sections.map(s => s.id)))
  }

  const collapseAll = () => {
    setExpandedSections(new Set())
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-4">Clear, Kind, Direct Communication</h2>
        <p className="text-xl mb-6">
          Transform understanding into movement: feedback, requests, boundaries, decisions, and repair.
        </p>
        <div className="flex flex-wrap gap-3">
          {['40% more promotions', '2x request acceptance', '3x faster conflict resolution'].map(stat => (
            <span key={stat} className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
              {stat}
            </span>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-end gap-2">
        <button
          onClick={expandAll}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          Expand All
        </button>
        <button
          onClick={collapseAll}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          Collapse All
        </button>
      </div>

      {/* Section Cards */}
      <div className="space-y-4">
        {sections.map((section) => {
          const Icon = section.icon
          const isExpanded = expandedSections.has(section.id)
          
          return (
            <div key={section.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${section.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{section.title}</h3>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {/* Section Content */}
              {isExpanded && (
                <div className="px-6 pb-6">
                  <div className="border-t pt-4 space-y-3">
                    {section.content.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 flex-shrink-0" />
                        <div 
                          className="text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: item
                              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-semibold">$1</strong>')
                              .replace(/→/g, '<span class="mx-2 text-gray-400">→</span>')
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Key Quotes */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <BookOpen className="w-6 h-6 text-gray-600 mt-1" />
          <div className="space-y-3">
            <blockquote className="text-gray-700 italic">
              "The single biggest problem in communication is the illusion that it has taken place."
              <span className="block text-sm text-gray-500 mt-1">— George Bernard Shaw</span>
            </blockquote>
            <blockquote className="text-gray-700 italic">
              "Be sincere; be brief; be seated."
              <span className="block text-sm text-gray-500 mt-1">— Franklin D. Roosevelt</span>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 text-center">
        <p className="text-xl font-bold text-purple-800 mb-2">
          Ready to practice? Let's make every word count.
        </p>
        <p className="text-purple-600">
          Continue to the Reflection tab to begin transforming theory into muscle memory.
        </p>
      </div>
    </div>
  )
}
