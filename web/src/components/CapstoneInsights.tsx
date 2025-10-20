import React, { useState, useEffect } from 'react';
import { Lightbulb, Star, Target, Zap, Save } from 'lucide-react';

interface Insight {
  type: 'breakthrough' | 'surprise' | 'learning' | 'warning';
  day: number;
  insight: string;
  impact: string;
  starred: boolean;
}

const CapstoneInsights: React.FC = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [newInsight, setNewInsight] = useState<Insight>({
    type: 'learning',
    day: 1,
    insight: '',
    impact: '',
    starred: false
  });

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem('capstone-insights');
    if (saved) {
      setInsights(JSON.parse(saved));
    }
  }, []);

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('capstone-insights', JSON.stringify(insights));
    }, 1000);
    return () => clearTimeout(timer);
  }, [insights]);

  const addInsight = () => {
    if (newInsight.insight) {
      setInsights(prev => [...prev, { ...newInsight, starred: false }]);
      setNewInsight({
        type: 'learning',
        day: newInsight.day,
        insight: '',
        impact: '',
        starred: false
      });
    }
  };

  const toggleStar = (index: number) => {
    setInsights(prev => prev.map((insight, idx) => 
      idx === index ? { ...insight, starred: !insight.starred } : insight
    ));
  };

  const removeInsight = (index: number) => {
    setInsights(prev => prev.filter((_, idx) => idx !== index));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'breakthrough':
        return <Zap className="w-4 h-4 text-yellow-500" />;
      case 'surprise':
        return <span className="text-purple-500">❗</span>;
      case 'learning':
        return <Lightbulb className="w-4 h-4 text-blue-500" />;
      case 'warning':
        return <span className="text-red-500">⚠️</span>;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'breakthrough':
        return 'bg-yellow-50 border-yellow-300';
      case 'surprise':
        return 'bg-purple-50 border-purple-300';
      case 'learning':
        return 'bg-blue-50 border-blue-300';
      case 'warning':
        return 'bg-red-50 border-red-300';
      default:
        return 'bg-gray-50 border-gray-300';
    }
  };

  const starredInsights = insights.filter(i => i.starred);
  const recentInsights = [...insights].reverse().slice(0, 5);

  return (
    <div className="space-y-6 my-8">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-gray-900">Insights Vault</h3>
        </div>

        {/* Add New Insight */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Capture Insight</h4>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={newInsight.type}
                onChange={(e) => setNewInsight(prev => ({ 
                  ...prev, 
                  type: e.target.value as Insight['type']
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="breakthrough">⚡ Breakthrough</option>
                <option value="surprise">❗ Surprise</option>
                <option value="learning">💡 Learning</option>
                <option value="warning">⚠️ Warning</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Day
              </label>
              <input
                type="number"
                min="1"
                max="15"
                value={newInsight.day}
                onChange={(e) => setNewInsight(prev => ({ 
                  ...prev, 
                  day: parseInt(e.target.value) 
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insight
              </label>
              <textarea
                value={newInsight.insight}
                onChange={(e) => setNewInsight(prev => ({ 
                  ...prev, 
                  insight: e.target.value 
                }))}
                placeholder="What did you discover or realize?"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Impact
              </label>
              <input
                type="text"
                value={newInsight.impact}
                onChange={(e) => setNewInsight(prev => ({ 
                  ...prev, 
                  impact: e.target.value 
                }))}
                placeholder="How will this change your approach?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={addInsight}
            disabled={!newInsight.insight}
            className={`mt-3 px-4 py-2 rounded-lg font-medium ${
              newInsight.insight
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Add Insight
          </button>
        </div>

        {/* Starred Insights */}
        {starredInsights.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              Top Insights
            </h4>
            <div className="space-y-2">
              {starredInsights.map((insight, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border-2 ${getTypeColor(insight.type)}`}
                >
                  <div className="flex items-start gap-2">
                    {getTypeIcon(insight.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{insight.insight}</p>
                      {insight.impact && (
                        <p className="text-xs text-gray-600 mt-1">→ {insight.impact}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Insights */}
        {insights.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">All Insights</h4>
            {insights.map((insight, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border-2 ${getTypeColor(insight.type)}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(insight.type)}
                    <span className="text-sm font-semibold text-gray-700">
                      Day {insight.day}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleStar(idx)}
                      className={`${
                        insight.starred ? 'text-yellow-500' : 'text-gray-400'
                      } hover:text-yellow-600`}
                    >
                      <Star className="w-4 h-4" fill={insight.starred ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      onClick={() => removeInsight(idx)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-800 font-medium">{insight.insight}</p>
                {insight.impact && (
                  <p className="text-xs text-gray-600 mt-2">
                    <Target className="inline w-3 h-3 mr-1" />
                    {insight.impact}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {insights.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-orange-600">
                {insights.filter(i => i.type === 'breakthrough').length}
              </p>
              <p className="text-xs text-gray-600">Breakthroughs</p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-purple-600">
                {starredInsights.length}
              </p>
              <p className="text-xs text-gray-600">Key Insights</p>
            </div>
          </div>
        )}

        {/* Auto-save indicator */}
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <Save className="w-4 h-4 mr-1" />
          Auto-saving insights...
        </div>
      </div>
    </div>
  );
};

export default CapstoneInsights;
