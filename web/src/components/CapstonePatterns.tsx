import React, { useState, useEffect } from 'react';
import { TrendingUp, Brain, AlertCircle, Lightbulb, Save } from 'lucide-react';

interface PatternData {
  triggers: string[];
  responses: string[];
  tools: string[];
  timePatterns: string;
  successFactors: string;
  challenges: string;
  insights: string;
}

const CapstonePatterns: React.FC = () => {
  const [data, setData] = useState<PatternData>({
    triggers: [],
    responses: [],
    tools: [],
    timePatterns: '',
    successFactors: '',
    challenges: '',
    insights: ''
  });

  const [newTrigger, setNewTrigger] = useState('');
  const [newResponse, setNewResponse] = useState('');
  const [newTool, setNewTool] = useState('');

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem('capstone-patterns');
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('capstone-patterns', JSON.stringify(data));
    }, 1000);
    return () => clearTimeout(timer);
  }, [data]);

  const addTrigger = () => {
    if (newTrigger.trim()) {
      setData(prev => ({ ...prev, triggers: [...prev.triggers, newTrigger] }));
      setNewTrigger('');
    }
  };

  const addResponse = () => {
    if (newResponse.trim()) {
      setData(prev => ({ ...prev, responses: [...prev.responses, newResponse] }));
      setNewResponse('');
    }
  };

  const addTool = () => {
    if (newTool.trim()) {
      setData(prev => ({ ...prev, tools: [...prev.tools, newTool] }));
      setNewTool('');
    }
  };

  return (
    <div className="space-y-6 my-8">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Pattern Recognition Lab</h3>
        </div>

        {/* Recurring Triggers */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recurring Triggers
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newTrigger}
              onChange={(e) => setNewTrigger(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTrigger()}
              placeholder="Add a trigger you've noticed multiple times"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addTrigger}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.triggers.map((trigger, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
              >
                {trigger}
              </span>
            ))}
          </div>
        </div>

        {/* Effective Responses */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Responses That Worked
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newResponse}
              onChange={(e) => setNewResponse(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addResponse()}
              placeholder="Add a response that created positive change"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addResponse}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.responses.map((response, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
              >
                {response}
              </span>
            ))}
          </div>
        </div>

        {/* Most Used Tools */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Most Reliable Tools
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newTool}
              onChange={(e) => setNewTool(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTool()}
              placeholder="Add a tool you've used successfully multiple times"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addTool}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.tools.map((tool, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Time Patterns */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Patterns
          </label>
          <textarea
            value={data.timePatterns}
            onChange={(e) => setData(prev => ({ ...prev, timePatterns: e.target.value }))}
            placeholder="When are you most successful? Morning? After breaks? What times are challenging?"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Success Factors */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Success Factors
          </label>
          <textarea
            value={data.successFactors}
            onChange={(e) => setData(prev => ({ ...prev, successFactors: e.target.value }))}
            placeholder="What conditions lead to your best results? Environment? Preparation? Support?"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Persistent Challenges */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Persistent Challenges
          </label>
          <textarea
            value={data.challenges}
            onChange={(e) => setData(prev => ({ ...prev, challenges: e.target.value }))}
            placeholder="What patterns keep showing up as difficult? What resistance do you notice?"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Key Insights */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Lightbulb className="inline w-4 h-4 text-yellow-500 mr-1" />
            Key Insights
          </label>
          <textarea
            value={data.insights}
            onChange={(e) => setData(prev => ({ ...prev, insights: e.target.value }))}
            placeholder="What have you learned about yourself? What surprised you?"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Auto-save indicator */}
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <Save className="w-4 h-4 mr-1" />
          Auto-saving patterns...
        </div>
      </div>

      {/* Pattern Summary */}
      {(data.triggers.length > 0 || data.tools.length > 0) && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-start gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-purple-900 mb-1">Pattern Summary</p>
              <p className="text-purple-700">
                You've identified {data.triggers.length} triggers, 
                {' '}{data.responses.length} effective responses, and
                {' '}{data.tools.length} reliable tools.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CapstonePatterns;
