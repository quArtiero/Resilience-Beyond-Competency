import React, { useState, useEffect } from 'react';
import { RefreshCw, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface Iteration {
  day: number;
  original: string;
  change: string;
  result: string;
  keepOrDiscard: 'keep' | 'discard' | 'modify';
}

const CapstoneIterations: React.FC = () => {
  const [iterations, setIterations] = useState<Iteration[]>([]);
  const [newIteration, setNewIteration] = useState<Iteration>({
    day: 1,
    original: '',
    change: '',
    result: '',
    keepOrDiscard: 'keep'
  });

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem('capstone-iterations');
    if (saved) {
      setIterations(JSON.parse(saved));
    }
  }, []);

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('capstone-iterations', JSON.stringify(iterations));
    }, 1000);
    return () => clearTimeout(timer);
  }, [iterations]);

  const addIteration = () => {
    if (newIteration.original && newIteration.change) {
      setIterations(prev => [...prev, newIteration]);
      setNewIteration({
        day: newIteration.day + 1,
        original: '',
        change: '',
        result: '',
        keepOrDiscard: 'keep'
      });
    }
  };

  const removeIteration = (index: number) => {
    setIterations(prev => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className="space-y-6 my-8">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <RefreshCw className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Iteration & Refinement</h3>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Track how you've adapted your approach throughout the 15 days
        </p>

        {/* Add New Iteration */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Add Iteration</h4>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Day
              </label>
              <input
                type="number"
                min="1"
                max="15"
                value={newIteration.day}
                onChange={(e) => setNewIteration(prev => ({ 
                  ...prev, 
                  day: parseInt(e.target.value) 
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Decision
              </label>
              <select
                value={newIteration.keepOrDiscard}
                onChange={(e) => setNewIteration(prev => ({ 
                  ...prev, 
                  keepOrDiscard: e.target.value as 'keep' | 'discard' | 'modify'
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="keep">✅ Keep</option>
                <option value="modify">🔄 Modify</option>
                <option value="discard">❌ Discard</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What I was doing
              </label>
              <input
                type="text"
                value={newIteration.original}
                onChange={(e) => setNewIteration(prev => ({ 
                  ...prev, 
                  original: e.target.value 
                }))}
                placeholder="e.g., Using STOP for every trigger"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What I changed to
              </label>
              <input
                type="text"
                value={newIteration.change}
                onChange={(e) => setNewIteration(prev => ({ 
                  ...prev, 
                  change: e.target.value 
                }))}
                placeholder="e.g., Using STOP only for hot triggers, If-Then for predictable ones"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Result
              </label>
              <input
                type="text"
                value={newIteration.result}
                onChange={(e) => setNewIteration(prev => ({ 
                  ...prev, 
                  result: e.target.value 
                }))}
                placeholder="e.g., Saved 5 minutes per day, less decision fatigue"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={addIteration}
            disabled={!newIteration.original || !newIteration.change}
            className={`mt-3 px-4 py-2 rounded-lg font-medium ${
              newIteration.original && newIteration.change
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Add Iteration
          </button>
        </div>

        {/* Iterations List */}
        {iterations.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Your Iterations</h4>
            {iterations.map((iteration, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border-2 ${
                  iteration.keepOrDiscard === 'keep' 
                    ? 'bg-green-50 border-green-200'
                    : iteration.keepOrDiscard === 'modify'
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">
                      Day {iteration.day}
                    </span>
                    {iteration.keepOrDiscard === 'keep' && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                    {iteration.keepOrDiscard === 'modify' && (
                      <RefreshCw className="w-4 h-4 text-yellow-600" />
                    )}
                    {iteration.keepOrDiscard === 'discard' && (
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <button
                    onClick={() => removeIteration(idx)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">From:</span>
                    <p className="text-gray-800">{iteration.original}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">To:</span>
                    <p className="text-gray-800">{iteration.change}</p>
                  </div>
                  {iteration.result && (
                    <div>
                      <span className="font-medium text-gray-600">Result:</span>
                      <p className="text-gray-800">{iteration.result}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {iterations.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <p className="font-medium text-blue-900">Iteration Summary</p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {iterations.filter(i => i.keepOrDiscard === 'keep').length}
                </p>
                <p className="text-xs text-gray-600">Kept</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">
                  {iterations.filter(i => i.keepOrDiscard === 'modify').length}
                </p>
                <p className="text-xs text-gray-600">Modified</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">
                  {iterations.filter(i => i.keepOrDiscard === 'discard').length}
                </p>
                <p className="text-xs text-gray-600">Discarded</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CapstoneIterations;
