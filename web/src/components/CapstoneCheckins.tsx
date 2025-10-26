import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, CheckCircle, Calendar, TrendingUp } from 'lucide-react';

interface CheckinData {
  day5: {
    purpose: string;
    toolsUsed: string;
    metrics: string;
    win: string;
    obstacle: string;
    adjustment: string;
    submitted: boolean;
    date: string;
  };
  day10: {
    bestLine: string;
    acceptanceRate: string;
    simplification: string;
    submitted: boolean;
    date: string;
  };
}

const CapstoneCheckins: React.FC = () => {
  const [data, setData] = useState<CheckinData>({
    day5: {
      purpose: '',
      toolsUsed: '',
      metrics: '',
      win: '',
      obstacle: '',
      adjustment: '',
      submitted: false,
      date: ''
    },
    day10: {
      bestLine: '',
      acceptanceRate: '',
      simplification: '',
      submitted: false,
      date: ''
    }
  });

  const [activeCheckin, setActiveCheckin] = useState<'day5' | 'day10' | null>(null);

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem('capstone-checkins');
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('capstone-checkins', JSON.stringify(data));
    }, 1000);
    return () => clearTimeout(timer);
  }, [data]);

  const submitDay5 = () => {
    setData(prev => ({
      ...prev,
      day5: {
        ...prev.day5,
        submitted: true,
        date: new Date().toISOString()
      }
    }));
    setActiveCheckin(null);
  };

  const submitDay10 = () => {
    setData(prev => ({
      ...prev,
      day10: {
        ...prev.day10,
        submitted: true,
        date: new Date().toISOString()
      }
    }));
    setActiveCheckin(null);
  };

  const exportCheckin = (day: 'day5' | 'day10') => {
    const checkinData = data[day];
    let text: string;
    
    if (day === 'day5') {
      const day5Data = checkinData as CheckinData['day5'];
      text = `DAY 5 CHECK-IN
Date: ${new Date(day5Data.date).toLocaleDateString()}

Purpose this week: ${day5Data.purpose}
Tools actually used: ${day5Data.toolsUsed}
Metric(s) so far: ${day5Data.metrics}
1 win: ${day5Data.win}
1 obstacle: ${day5Data.obstacle}
Tiny adjustment for Days 6-9: ${day5Data.adjustment}`;
    } else {
      const day10Data = checkinData as CheckinData['day10'];
      text = `DAY 10 CHECK-IN
Date: ${new Date(day10Data.date).toLocaleDateString()}

Best EAR or SBI line that worked: ${day10Data.bestLine}
Acceptance rate / understanding score: ${day10Data.acceptanceRate}
One thing I'll simplify for the final sprint: ${day10Data.simplification}`;
    }

    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6 my-8">
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Mid-Journey Check-ins</p>
            <p>Brief reflections on Day 5 and Day 10 to calibrate your practice</p>
          </div>
        </div>
      </div>

      {/* Day 5 Check-in */}
      <div className={`bg-white rounded-xl border-2 ${data.day5.submitted ? 'border-green-300' : 'border-gray-200'}`}>
        <div 
          onClick={() => setActiveCheckin(activeCheckin === 'day5' ? null : 'day5')}
          className="p-6 cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                data.day5.submitted ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {data.day5.submitted ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <span className="font-bold text-gray-600">5</span>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Day 5 Check-in</h3>
                <p className="text-sm text-gray-600">
                  {data.day5.submitted 
                    ? `Submitted ${new Date(data.day5.date).toLocaleDateString()}`
                    : 'Reflection on awareness & regulation blocks'}
                </p>
              </div>
            </div>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {activeCheckin === 'day5' && (
          <div className="px-6 pb-6 space-y-4 border-t border-gray-200 pt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purpose this week
              </label>
              <input
                type="text"
                value={data.day5.purpose}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  day5: { ...prev.day5, purpose: e.target.value }
                }))}
                placeholder="What's driving your practice?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tools actually used
              </label>
              <input
                type="text"
                value={data.day5.toolsUsed}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  day5: { ...prev.day5, toolsUsed: e.target.value }
                }))}
                placeholder="Which tools from your stack did you use most?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Metric(s) so far
              </label>
              <input
                type="text"
                value={data.day5.metrics}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  day5: { ...prev.day5, metrics: e.target.value }
                }))}
                placeholder="e.g., Avg stress drop: 2.1, Decision time: -35%"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  1 Win
                </label>
                <textarea
                  value={data.day5.win}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    day5: { ...prev.day5, win: e.target.value }
                  }))}
                  placeholder="What worked well?"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  1 Obstacle
                </label>
                <textarea
                  value={data.day5.obstacle}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    day5: { ...prev.day5, obstacle: e.target.value }
                  }))}
                  placeholder="What was challenging?"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiny adjustment for Days 6-9
              </label>
              <input
                type="text"
                value={data.day5.adjustment}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  day5: { ...prev.day5, adjustment: e.target.value }
                }))}
                placeholder="One small thing you'll change"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end gap-3">
              {data.day5.submitted && (
                <button
                  onClick={() => exportCheckin('day5')}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Copy Text
                </button>
              )}
              <button
                onClick={submitDay5}
                disabled={!data.day5.purpose || !data.day5.metrics}
                className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
                  data.day5.purpose && data.day5.metrics
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
                Submit Day 5 Check-in
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Day 10 Check-in */}
      <div className={`bg-white rounded-xl border-2 ${data.day10.submitted ? 'border-green-300' : 'border-gray-200'}`}>
        <div 
          onClick={() => setActiveCheckin(activeCheckin === 'day10' ? null : 'day10')}
          className="p-6 cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                data.day10.submitted ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {data.day10.submitted ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <span className="font-bold text-gray-600">10</span>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Day 10 Check-in</h3>
                <p className="text-sm text-gray-600">
                  {data.day10.submitted 
                    ? `Submitted ${new Date(data.day10.date).toLocaleDateString()}`
                    : 'Reflection on empathy & social skills blocks'}
                </p>
              </div>
            </div>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {activeCheckin === 'day10' && (
          <div className="px-6 pb-6 space-y-4 border-t border-gray-200 pt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Best EAR or SBI line that worked
              </label>
              <textarea
                value={data.day10.bestLine}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  day10: { ...prev.day10, bestLine: e.target.value }
                }))}
                placeholder="Copy the exact words that created movement"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Acceptance rate / understanding score
              </label>
              <input
                type="text"
                value={data.day10.acceptanceRate}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  day10: { ...prev.day10, acceptanceRate: e.target.value }
                }))}
                placeholder="e.g., 75% yes rate, avg 8/10 understanding"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                One thing I'll simplify for the final sprint
              </label>
              <input
                type="text"
                value={data.day10.simplification}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  day10: { ...prev.day10, simplification: e.target.value }
                }))}
                placeholder="What will you streamline for Days 11-15?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end gap-3">
              {data.day10.submitted && (
                <button
                  onClick={() => exportCheckin('day10')}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Copy Text
                </button>
              )}
              <button
                onClick={submitDay10}
                disabled={!data.day10.bestLine || !data.day10.acceptanceRate}
                className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
                  data.day10.bestLine && data.day10.acceptanceRate
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
                Submit Day 10 Check-in
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="bg-gray-100 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Check-in Progress</span>
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              data.day5.submitted ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
            }`}>
              Day 5 {data.day5.submitted ? '✓' : '○'}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              data.day10.submitted ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
            }`}>
              Day 10 {data.day10.submitted ? '✓' : '○'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapstoneCheckins;
