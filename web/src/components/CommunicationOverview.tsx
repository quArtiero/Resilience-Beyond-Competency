import { useState } from 'react'
import { Target, Clock, Trophy, ChevronRight, CheckCircle } from 'lucide-react'

export function CommunicationOverview() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const toggleItem = (item: string) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(item)) {
      newChecked.delete(item)
    } else {
      newChecked.add(item)
    }
    setCheckedItems(newChecked)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-4">Welcome to Clear Communication</h2>
        <p className="text-xl mb-6">
          Transform understanding into action through clear, kind, and direct communication.
        </p>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/20 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold mb-1">60-90</div>
            <div className="text-sm">minutes</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold mb-1">6</div>
            <div className="text-sm">Core Tools</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold mb-1">40%</div>
            <div className="text-sm">More Promotions</div>
          </div>
        </div>
      </div>

      {/* What You'll Learn */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-blue-600" />
          What You'll Master Today
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checkedItems.has('sbi')}
                onChange={() => toggleItem('sbi')}
                className="mt-1 rounded"
              />
              <div>
                <div className="font-medium text-gray-800">SBI + Request</div>
                <div className="text-sm text-gray-600">Transform feedback into action</div>
              </div>
            </label>
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checkedItems.has('nvc')}
                onChange={() => toggleItem('nvc')}
                className="mt-1 rounded"
              />
              <div>
                <div className="font-medium text-gray-800">NVC-Lite (≤25 words)</div>
                <div className="text-sm text-gray-600">Express needs without blame</div>
              </div>
            </label>
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checkedItems.has('ear')}
                onChange={() => toggleItem('ear')}
                className="mt-1 rounded"
              />
              <div>
                <div className="font-medium text-gray-800">EAR → Micro-Test</div>
                <div className="text-sm text-gray-600">Turn conflicts into experiments</div>
              </div>
            </label>
          </div>
          
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checkedItems.has('no-option')}
                onChange={() => toggleItem('no-option')}
                className="mt-1 rounded"
              />
              <div>
                <div className="font-medium text-gray-800">No + Option</div>
                <div className="text-sm text-gray-600">Set boundaries with grace</div>
              </div>
            </label>
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checkedItems.has('recap')}
                onChange={() => toggleItem('recap')}
                className="mt-1 rounded"
              />
              <div>
                <div className="font-medium text-gray-800">Decision Recap</div>
                <div className="text-sm text-gray-600">Lock decisions in writing</div>
              </div>
            </label>
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checkedItems.has('repair')}
                onChange={() => toggleItem('repair')}
                className="mt-1 rounded"
              />
              <div>
                <div className="font-medium text-gray-800">Clear Repair</div>
                <div className="text-sm text-gray-600">Restore trust after conflict</div>
              </div>
            </label>
          </div>
        </div>
        
        {checkedItems.size === 6 && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-green-700 font-medium flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Great! You're ready to dive into the material.
            </p>
          </div>
        )}
      </div>

      {/* How to Approach This Lesson */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Clock className="w-6 h-6 text-purple-600" />
          How to Use This Lesson
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <div className="font-medium text-gray-800">Read the Theory (20 min)</div>
              <div className="text-sm text-gray-600">
                Use the expandable cards below to explore concepts at your own pace
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <div className="font-medium text-gray-800">Practice the Tools (30 min)</div>
              <div className="text-sm text-gray-600">
                Switch to Reflection tab for hands-on practice with each communication tool
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <div className="font-medium text-gray-800">Apply to Real Scenarios (20 min)</div>
              <div className="text-sm text-gray-600">
                Challenge tab has cases and protocol building
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
              4
            </div>
            <div>
              <div className="font-medium text-gray-800">Track Your Progress (5 min/day)</div>
              <div className="text-sm text-gray-600">
                Use the 7-day tracker to measure improvement
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Big Picture */}
      <div className="bg-yellow-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-600" />
          Why This Matters
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <strong>At Work:</strong> Clear communicators are promoted 40% more often and resolve conflicts 3x faster
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <strong>In Relationships:</strong> Direct communication reduces misunderstandings by 60%
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <strong>For You:</strong> Saves 5 hours/week from reduced back-and-forth
            </div>
          </div>
        </div>
      </div>

      {/* Ready to Start */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 text-center">
        <p className="text-xl font-bold text-purple-800 mb-2">
          Ready? Let's Begin!
        </p>
        <p className="text-purple-600 mb-4">
          Start with the expandable theory sections below, or jump to any tool that interests you.
        </p>
        <p className="text-sm text-purple-500">
          💡 Tip: The cards are interactive - click to expand the topics you want to explore
        </p>
      </div>
    </div>
  )
}
