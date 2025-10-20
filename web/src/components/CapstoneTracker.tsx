import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Circle, Clock, TrendingUp, AlertCircle, Save, Download, Activity } from 'lucide-react';

interface DayLog {
  day: number;
  date: string;
  situation: string;
  toolsUsed: string[];
  purpose: string;
  metricValue: string;
  result: string;
  stressPre: number;
  stressPost: number;
  completed: boolean;
  notes: string;
  bounceForward?: boolean;
}

interface TrackerData {
  startDate: string;
  logs: DayLog[];
  currentDay: number;
  setupData: any;
}

const CapstoneTracker: React.FC = () => {
  const [data, setData] = useState<TrackerData>({
    startDate: '',
    logs: [],
    currentDay: 1,
    setupData: null
  });

  const [activeDay, setActiveDay] = useState(1);
  const [showDailyForm, setShowDailyForm] = useState(false);

  // Initialize logs for 15 days
  useEffect(() => {
    const saved = localStorage.getItem('capstone-tracker');
    const setup = localStorage.getItem('capstone-setup');
    
    if (saved) {
      setData(JSON.parse(saved));
    } else {
      // Initialize with empty logs
      const newLogs: DayLog[] = [];
      for (let i = 1; i <= 15; i++) {
        newLogs.push({
          day: i,
          date: '',
          situation: '',
          toolsUsed: [],
          purpose: '',
          metricValue: '',
          result: '',
          stressPre: 5,
          stressPost: 5,
          completed: false,
          notes: '',
          bounceForward: false
        });
      }
      setData({
        startDate: new Date().toISOString().split('T')[0],
        logs: newLogs,
        currentDay: 1,
        setupData: setup ? JSON.parse(setup) : null
      });
    }
  }, []);

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('capstone-tracker', JSON.stringify(data));
    }, 1000);
    return () => clearTimeout(timer);
  }, [data]);

  const dayBlocks = [
    { days: [1, 2, 3], label: 'Awareness Block', color: 'bg-purple-100 border-purple-300', focus: 'Signals & Stories' },
    { days: [4, 5, 6], label: 'Regulation Block', color: 'bg-blue-100 border-blue-300', focus: 'Switches & Scripts' },
    { days: [7, 8, 9], label: 'Empathy Block', color: 'bg-green-100 border-green-300', focus: 'Understanding → Movement' },
    { days: [10, 11, 12], label: 'Social Skills Block', color: 'bg-yellow-100 border-yellow-300', focus: 'Requests & Repair' },
    { days: [13, 14], label: 'Integration Sprints', color: 'bg-orange-100 border-orange-300', focus: 'Full Stack' },
    { days: [15], label: 'Showcase', color: 'bg-pink-100 border-pink-300', focus: 'Final & Submit' }
  ];

  const getDayBlock = (day: number) => {
    return dayBlocks.find(block => block.days.includes(day));
  };

  const updateDayLog = (day: number, updates: Partial<DayLog>) => {
    setData(prev => ({
      ...prev,
      logs: prev.logs.map(log => 
        log.day === day ? { ...log, ...updates } : log
      )
    }));
  };

  const completedDays = data.logs.filter(log => log.completed).length;
  const currentStreak = data.logs.reduce((streak, log, idx) => {
    if (idx === 0) return log.completed ? 1 : 0;
    if (log.completed && data.logs[idx - 1].completed) return streak + 1;
    return log.completed ? 1 : streak;
  }, 0);

  const avgStressDrop = data.logs
    .filter(log => log.completed && log.stressPre && log.stressPost)
    .reduce((acc, log, idx, arr) => {
      const drop = log.stressPre - log.stressPost;
      return acc + drop / arr.length;
    }, 0);

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `capstone-logs-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const DayCard = ({ log }: { log: DayLog }) => {
    const block = getDayBlock(log.day);
    const isToday = log.day === data.currentDay;
    const isFuture = log.day > data.currentDay;
    
    return (
      <div
        onClick={() => {
          if (!isFuture) {
            setActiveDay(log.day);
            setShowDailyForm(true);
          }
        }}
        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
          log.completed 
            ? 'bg-green-50 border-green-300'
            : isToday
            ? `${block?.color} ring-2 ring-blue-500`
            : isFuture
            ? 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
            : `${block?.color}`
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-gray-900">Day {log.day}</span>
          {log.completed ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : isToday ? (
            <Circle className="w-5 h-5 text-blue-600 animate-pulse" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400" />
          )}
        </div>
        <p className="text-xs text-gray-600 mb-1">{block?.focus}</p>
        {log.completed && (
          <div className="text-xs space-y-1">
            <p className="text-gray-700 truncate">{log.situation || 'No situation logged'}</p>
            {log.stressPre && log.stressPost && (
              <p className={`font-medium ${log.stressPre > log.stressPost ? 'text-green-600' : 'text-gray-600'}`}>
                Stress: {log.stressPre} → {log.stressPost}
              </p>
            )}
          </div>
        )}
        {log.bounceForward && (
          <span className="inline-block mt-2 px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
            Bounce Forward
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 my-8">
      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">Progress</p>
            <p className="text-2xl font-bold text-gray-900">{completedDays}/15</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Current Streak</p>
            <p className="text-2xl font-bold text-blue-600">{currentStreak}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Avg Stress Drop</p>
            <p className="text-2xl font-bold text-green-600">
              {avgStressDrop > 0 ? `↓${avgStressDrop.toFixed(1)}` : '--'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Completion</p>
            <p className="text-2xl font-bold text-purple-600">
              {((completedDays / 15) * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      </div>

      {/* 15-Day Grid */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Your 15-Day Journey</h3>
        
        {/* Block Headers */}
        <div className="grid grid-cols-6 gap-2 mb-4">
          {dayBlocks.map((block, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg text-center ${block.color}`}
              style={{ gridColumn: `span ${block.days.length}` }}
            >
              <p className="text-xs font-semibold text-gray-900">{block.label}</p>
              <p className="text-xs text-gray-600">Days {block.days[0]}-{block.days[block.days.length - 1]}</p>
            </div>
          ))}
        </div>

        {/* Day Cards */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {data.logs.map(log => (
            <DayCard key={log.day} log={log} />
          ))}
        </div>
      </div>

      {/* Daily Log Form */}
      {showDailyForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Day {activeDay} Log
              </h3>
              <button
                onClick={() => setShowDailyForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <DailyLogForm
              log={data.logs[activeDay - 1]}
              setupData={data.setupData}
              onUpdate={(updates) => {
                updateDayLog(activeDay, updates);
                setShowDailyForm(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => {
            setActiveDay(data.currentDay);
            setShowDailyForm(true);
          }}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
        >
          <Activity className="w-5 h-5" />
          Log Today (Day {data.currentDay})
        </button>
        
        <button
          onClick={exportData}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Export All Logs
        </button>
      </div>
    </div>
  );
};

// Daily Log Form Component
const DailyLogForm: React.FC<{
  log: DayLog;
  setupData: any;
  onUpdate: (updates: Partial<DayLog>) => void;
}> = ({ log, setupData, onUpdate }) => {
  const [formData, setFormData] = useState(log);

  const handleSubmit = () => {
    onUpdate({ ...formData, completed: true, date: new Date().toISOString().split('T')[0] });
  };

  const tools = setupData ? [setupData.tool1, setupData.tool2] : ['Tool 1', 'Tool 2'];

  return (
    <div className="space-y-4">
      {/* Situation */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Situation (1 line)
        </label>
        <input
          type="text"
          value={formData.situation}
          onChange={(e) => setFormData(prev => ({ ...prev, situation: e.target.value }))}
          placeholder="Briefly describe the situation you applied your tools to"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Tools Used */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tools Used
        </label>
        <div className="space-y-2">
          {tools.map(tool => (
            <label key={tool} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.toolsUsed.includes(tool)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData(prev => ({ ...prev, toolsUsed: [...prev.toolsUsed, tool] }));
                  } else {
                    setFormData(prev => ({ ...prev, toolsUsed: prev.toolsUsed.filter(t => t !== tool) }));
                  }
                }}
              />
              <span className="text-gray-700">{tool}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Purpose */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Purpose (1 line)
        </label>
        <input
          type="text"
          value={formData.purpose}
          onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
          placeholder="What were you trying to achieve?"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Metric Value */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Metric Value
        </label>
        <input
          type="text"
          value={formData.metricValue}
          onChange={(e) => setFormData(prev => ({ ...prev, metricValue: e.target.value }))}
          placeholder="e.g., 2-point drop, 1 LRL, 30 min to decision"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Result */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Result
        </label>
        <select
          value={formData.result}
          onChange={(e) => setFormData(prev => ({ ...prev, result: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select...</option>
          <option value="success">Success - Achieved intended outcome</option>
          <option value="partial">Partial - Some progress made</option>
          <option value="learning">Learning - Didn't work but learned</option>
          <option value="pending">Pending - Awaiting response/result</option>
        </select>
      </div>

      {/* Stress Levels */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stress Pre (1-10)
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={formData.stressPre}
            onChange={(e) => setFormData(prev => ({ ...prev, stressPre: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stress Post (1-10)
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={formData.stressPost}
            onChange={(e) => setFormData(prev => ({ ...prev, stressPost: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes (Optional)
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Any additional observations or learnings"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Bounce Forward */}
      <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.bounceForward}
            onChange={(e) => setFormData(prev => ({ ...prev, bounceForward: e.target.checked }))}
          />
          <span className="text-sm text-gray-700">
            This is a Bounce Forward (5-minute catch-up from missed day)
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={() => onUpdate(formData)}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
        >
          Save Draft
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          Complete Day {log.day}
        </button>
      </div>
    </div>
  );
};

export default CapstoneTracker;
