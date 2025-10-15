import { useState, useEffect } from 'react'

export function SteelmanSwap() {
  const [yourStance, setYourStance] = useState('')
  const [steelmanCase, setSteelmanCase] = useState('')
  const [swapMode, setSwapMode] = useState(false)
  const [swapTimer, setSwapTimer] = useState(60)
  const [isSwapping, setIsSwapping] = useState(false)
  const [insight, setInsight] = useState('')
  const [adjustment, setAdjustment] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isSwapping && swapTimer > 0) {
      interval = setInterval(() => {
        setSwapTimer((prev) => prev - 1)
      }, 1000)
    } else if (swapTimer === 0 && isSwapping) {
      setIsSwapping(false)
      setSwapMode(false)
    }
    return () => clearInterval(interval)
  }, [isSwapping, swapTimer])

  const startSwap = () => {
    if (yourStance && steelmanCase) {
      setSwapMode(true)
      setIsSwapping(true)
      setSwapTimer(60)
    }
  }

  const stopSwap = () => {
    setIsSwapping(false)
    setSwapMode(false)
  }

  const completeExercise = () => {
    if (yourStance && steelmanCase && insight && adjustment) {
      setIsComplete(true)
    }
  }

  const resetExercise = () => {
    setYourStance('')
    setSteelmanCase('')
    setSwapMode(false)
    setSwapTimer(60)
    setIsSwapping(false)
    setInsight('')
    setAdjustment('')
    setIsComplete(false)
  }

  const getProgress = () => {
    let steps = 0
    if (yourStance) steps++
    if (steelmanCase) steps++
    if (swapTimer < 60) steps++ // Swap attempted
    if (insight) steps++
    if (adjustment) steps++
    return (steps / 5) * 100
  }

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">Exercise Progress</span>
          <span className="text-sm text-gray-600">{Math.round(getProgress())}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgress()}%` }}
          />
        </div>
      </div>

      {!isComplete ? (
        <>
          {/* Step 1: Your Stance */}
          <div className={`rounded-xl p-6 shadow-lg transition-all duration-300 ${
            swapMode ? 'opacity-50 pointer-events-none' : 'bg-gradient-to-br from-blue-50 to-indigo-50'
          }`}>
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">1</span>
              Your Current Stance
            </h3>
            <p className="text-gray-600 mb-3 text-sm">
              Write your position clearly in 2-3 sentences. What do you believe and why?
            </p>
            <textarea
              value={yourStance}
              onChange={(e) => setYourStance(e.target.value)}
              placeholder="I believe that... because..."
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none resize-none"
              rows={3}
              disabled={swapMode}
            />
          </div>

          {/* Step 2: Steelman */}
          <div className={`rounded-xl p-6 shadow-lg transition-all duration-300 ${
            swapMode ? 'opacity-50 pointer-events-none' : 'bg-gradient-to-br from-purple-50 to-pink-50'
          }`}>
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">2</span>
              Steelman the Opposing View
            </h3>
            <p className="text-gray-600 mb-3 text-sm">
              Present the STRONGEST possible case against your position. Be fair and evidence-based. Make it compelling!
            </p>
            <textarea
              value={steelmanCase}
              onChange={(e) => setSteelmanCase(e.target.value)}
              placeholder="The strongest argument against my position is... The evidence shows..."
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:outline-none resize-none"
              rows={5}
              disabled={swapMode}
            />
          </div>

          {/* Step 3: Swap Mode */}
          {yourStance && steelmanCase && (
            <div className={`rounded-xl p-6 shadow-xl ${
              swapMode 
                ? 'bg-gradient-to-br from-orange-100 to-red-100 border-2 border-orange-400' 
                : 'bg-gradient-to-br from-orange-50 to-yellow-50'
            }`}>
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <span className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                Swap Mode Challenge
              </h3>
              
              {!swapMode ? (
                <>
                  <p className="text-gray-700 mb-4">
                    For 60 seconds, pretend you MUST present the opposing case to win a prize. 
                    Argue it with conviction!
                  </p>
                  <button
                    onClick={startSwap}
                    className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    🔄 Start 60-Second Swap
                  </button>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-orange-600 mb-2">
                      {swapTimer}s
                    </div>
                    <div className="text-lg font-semibold text-gray-700 mb-4">
                      You are now arguing FOR the opposing view!
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border-2 border-orange-400">
                    <h4 className="font-bold text-gray-800 mb-2">Your Task:</h4>
                    <p className="text-gray-700">
                      Speak out loud or write below. Argue the steelman case as if your reputation depends on it!
                    </p>
                    <textarea
                      placeholder="I strongly believe the opposing view because..."
                      className="w-full mt-3 p-3 border-2 border-gray-200 rounded-lg focus:border-orange-400 focus:outline-none resize-none"
                      rows={4}
                    />
                  </div>
                  
                  <button
                    onClick={stopSwap}
                    className="w-full py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                  >
                    Stop Early
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Extract Insight */}
          {swapTimer < 60 && !swapMode && (
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">4</span>
                Extract Your Insight
              </h3>
              <p className="text-gray-600 mb-3 text-sm">
                What did the other side reveal that your frame hid? What valid concern or risk did you miss?
              </p>
              <textarea
                value={insight}
                onChange={(e) => setInsight(e.target.value)}
                placeholder="I realized that... I hadn't considered..."
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-400 focus:outline-none resize-none"
                rows={3}
              />
            </div>
          )}

          {/* Step 5: Adjustment */}
          {insight && (
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">5</span>
                Your 5-10% Adjustment
              </h3>
              <p className="text-gray-600 mb-3 text-sm">
                What small adjustment to your original stance improves the outcome with minimal cost?
              </p>
              <textarea
                value={adjustment}
                onChange={(e) => setAdjustment(e.target.value)}
                placeholder="I will adjust my approach by... This addresses the concern while..."
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none resize-none"
                rows={3}
              />
            </div>
          )}

          {/* Complete Button */}
          {adjustment && (
            <button
              onClick={completeExercise}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              🎉 Complete Steelman & Swap
            </button>
          )}
        </>
      ) : (
        /* Completion Summary */
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
            🏆 Perspective Expanded!
          </h2>
          
          <div className="bg-white rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-2">Your Original Stance</h4>
                <p className="text-gray-700">{yourStance}</p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-bold text-purple-800 mb-2">The Steelman Case</h4>
                <p className="text-gray-700">{steelmanCase}</p>
              </div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-bold text-green-800 mb-2">Key Insight Gained</h4>
              <p className="text-gray-700">{insight}</p>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border-2 border-blue-300">
              <h4 className="font-bold text-blue-800 mb-2">Your Refined Position</h4>
              <p className="text-gray-700 font-medium">{adjustment}</p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">
              By steelmanning, you've reduced ego defensiveness and found a more nuanced position!
            </p>
            <button
              onClick={resetExercise}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Try Another Topic
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
