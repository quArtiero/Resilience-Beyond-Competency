import React, { useState, useEffect } from 'react';
import { Target, Clock, Users, TrendingUp, AlertCircle, Save, Download, RefreshCw } from 'lucide-react';

interface SetupData {
  domain: string;
  stack: string;
  tool1: string;
  tool2: string;
  metrics: string[];
  targets: { [key: string]: string };
  timeWindow: string;
  accountabilityPartner: string;
  checkInDates: { day5: string; day10: string };
  bounceForward: boolean;
  challengeCard: string;
}

const CapstoneSetup: React.FC = () => {
  const [data, setData] = useState<SetupData>({
    domain: '',
    stack: '',
    tool1: '',
    tool2: '',
    metrics: [],
    targets: {},
    timeWindow: '',
    accountabilityPartner: '',
    checkInDates: { day5: '', day10: '' },
    bounceForward: true,
    challengeCard: ''
  });

  const [showCard, setShowCard] = useState(false);

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem('capstone-setup');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading setup data:', e);
      }
    }
  }, []);

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('capstone-setup', JSON.stringify(data));
    }, 1000);
    return () => clearTimeout(timer);
  }, [data]);

  const domains = [
    { value: 'work', label: 'Work/School', description: 'Professional challenges, deadlines, team dynamics' },
    { value: 'relationship', label: 'Team/Relationship', description: 'Family, partners, close friendships' },
    { value: 'personal', label: 'Personal', description: 'Self-improvement, health, personal projects' }
  ];

  const stacks = [
    {
      value: 'A',
      label: 'Stack A: STOP + LRL',
      tools: ['STOP (Reactivity Interrupt)', 'LRL (Empathy Line)'],
      description: 'Best for customer service, team conflicts, family tensions',
      example: 'Interrupt emotional hijacking → Build immediate connection'
    },
    {
      value: 'B',
      label: 'Stack B: If-Then + SBI',
      tools: ['If-Then (Pre-scripted Regulation)', 'SBI (Clear Request)'],
      description: 'Best for recurring triggers, feedback, boundaries',
      example: 'Remove decision fatigue → Deliver clean message'
    },
    {
      value: 'C',
      label: 'Stack C: Reappraisal + EAR',
      tools: ['Reappraisal (Meaning Shift)', 'EAR (48-hour Micro-test)'],
      description: 'Best for stuck problems, resistance, repairs',
      example: 'Change threat assessment → Create safe experiments'
    }
  ];

  const metricOptions = [
    { 
      value: 'stress_drop',
      label: 'Stress Drop Per Day',
      description: 'Pre→Post rating (1-10)',
      target: '≥ 2-point drop'
    },
    {
      value: 'decision_latency',
      label: 'Decision Latency',
      description: 'Hours from awareness to decision',
      target: '↓ 30-50%'
    },
    {
      value: 'lrl_reflections',
      label: 'LRL Reflections',
      description: 'Count per day',
      target: '≥1 per day'
    },
    {
      value: 'acceptance_rate',
      label: 'Acceptance Rate',
      description: '% of requests accepted',
      target: '≥70%'
    },
    {
      value: 'if_then_executions',
      label: 'If-Then Executions',
      description: 'Count per day',
      target: '≥1 per day'
    },
    {
      value: 'repair_attempts',
      label: 'Repair Attempts',
      description: 'Count per week',
      target: '≥2 per week'
    }
  ];

  const handleStackChange = (stackValue: string) => {
    const selected = stacks.find(s => s.value === stackValue);
    if (selected) {
      setData(prev => ({
        ...prev,
        stack: stackValue,
        tool1: selected.tools[0],
        tool2: selected.tools[1]
      }));
    }
  };

  const handleMetricToggle = (metricValue: string) => {
    setData(prev => {
      const newMetrics = prev.metrics.includes(metricValue)
        ? prev.metrics.filter(m => m !== metricValue)
        : [...prev.metrics, metricValue];
      
      // Add/remove target
      const newTargets = { ...prev.targets };
      if (!prev.metrics.includes(metricValue)) {
        const metric = metricOptions.find(m => m.value === metricValue);
        if (metric) {
          newTargets[metricValue] = metric.target;
        }
      } else {
        delete newTargets[metricValue];
      }

      return { ...prev, metrics: newMetrics, targets: newTargets };
    });
  };

  const generateChallengeCard = () => {
    const selectedStack = stacks.find(s => s.value === data.stack);
    const selectedMetrics = metricOptions.filter(m => data.metrics.includes(m.value));
    
    const card = `🎯 MY 15-DAY CHALLENGE CARD

Domain: ${domains.find(d => d.value === data.domain)?.label || '___'}
Two tools (stack): ${data.tool1} + ${data.tool2}
Daily time window: ${data.timeWindow || '___'}

Leading metrics & targets:
${selectedMetrics.map(m => `• ${m.label}: ${data.targets[m.value]}`).join('\n')}

Accountability partner: ${data.accountabilityPartner || '___'}
Check-ins: Day 5, Day 10

✅ Bounce-Forward Rule: If I miss a day, I complete a 5-minute mini-rep within 24 hours and log it.

Start Date: ${new Date().toLocaleDateString()}
Signature: _____________________`;

    setData(prev => ({ ...prev, challengeCard: card }));
    setShowCard(true);
  };

  const copyCard = () => {
    navigator.clipboard.writeText(data.challengeCard);
  };

  const exportSetup = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `capstone-setup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const isComplete = data.domain && data.stack && data.metrics.length > 0 && data.timeWindow && data.accountabilityPartner;

  return (
    <div className="space-y-6 my-8">
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Day 0 Setup (Complete Once)</p>
            <p>This one-time setup takes 10-15 minutes and determines your entire 15-day journey. Choose thoughtfully!</p>
          </div>
        </div>
      </div>

      {/* Step 1: Choose Domain */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
            1
          </span>
          <h3 className="text-lg font-semibold text-gray-900">Choose ONE Domain for 15 Days</h3>
        </div>
        <div className="space-y-3">
          {domains.map(domain => (
            <label key={domain.value} className="block">
              <div className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                data.domain === domain.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    value={domain.value}
                    checked={data.domain === domain.value}
                    onChange={(e) => setData(prev => ({ ...prev, domain: e.target.value }))}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{domain.label}</p>
                    <p className="text-sm text-gray-600 mt-1">{domain.description}</p>
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Step 2: Pick Your Stack */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
            2
          </span>
          <h3 className="text-lg font-semibold text-gray-900">Pick Your 2-Tool Daily Stack</h3>
        </div>
        <div className="space-y-3">
          {stacks.map(stack => (
            <label key={stack.value} className="block">
              <div className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                data.stack === stack.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    value={stack.value}
                    checked={data.stack === stack.value}
                    onChange={(e) => handleStackChange(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{stack.label}</p>
                    <p className="text-sm text-gray-600 mt-1">{stack.description}</p>
                    <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-700">
                      {stack.example}
                    </div>
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Step 3: Define Metrics */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
            3
          </span>
          <h3 className="text-lg font-semibold text-gray-900">Define Your Lead Metrics (Pick 1-2)</h3>
        </div>
        <div className="space-y-3">
          {metricOptions.map(metric => (
            <label key={metric.value} className="block">
              <div className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                data.metrics.includes(metric.value)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={data.metrics.includes(metric.value)}
                    onChange={() => handleMetricToggle(metric.value)}
                    className="mt-1"
                    disabled={data.metrics.length >= 2 && !data.metrics.includes(metric.value)}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{metric.label}</p>
                    <p className="text-sm text-gray-600">{metric.description}</p>
                    <p className="text-sm font-medium text-blue-600 mt-1">Target: {metric.target}</p>
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Step 4: Set Schedule */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
            4
          </span>
          <h3 className="text-lg font-semibold text-gray-900">Set Your Daily Schedule</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Daily Time Window (same time each day)
            </label>
            <input
              type="text"
              value={data.timeWindow}
              onChange={(e) => setData(prev => ({ ...prev, timeWindow: e.target.value }))}
              placeholder="e.g., 08:30-08:50 or Before first meeting"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Accountability Partner
            </label>
            <input
              type="text"
              value={data.accountabilityPartner}
              onChange={(e) => setData(prev => ({ ...prev, accountabilityPartner: e.target.value }))}
              placeholder="Name of person who will check in with you"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={data.bounceForward}
                onChange={(e) => setData(prev => ({ ...prev, bounceForward: e.target.checked }))}
                className="mt-1"
              />
              <div>
                <p className="font-semibold text-gray-900">Accept Bounce-Forward Rule</p>
                <p className="text-sm text-gray-600 mt-1">
                  If I miss a day, I complete a 5-minute mini-rep within 24 hours and log it
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Generate Challenge Card */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={generateChallengeCard}
          disabled={!isComplete}
          className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
            isComplete
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <RefreshCw className="w-5 h-5" />
          Generate Challenge Card
        </button>
        
        <button
          onClick={exportSetup}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Export Setup
        </button>
      </div>

      {/* Challenge Card Display */}
      {showCard && data.challengeCard && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-gray-900">Your Challenge Card</h3>
            <button
              onClick={copyCard}
              className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
            >
              Copy
            </button>
          </div>
          <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700 bg-white p-4 rounded-lg">
            {data.challengeCard}
          </pre>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="bg-gray-100 rounded-lg p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Setup Progress</span>
          <span className="font-semibold text-gray-900">
            {[data.domain, data.stack, data.metrics.length > 0, data.timeWindow, data.accountabilityPartner]
              .filter(Boolean).length} / 5 Complete
          </span>
        </div>
      </div>
    </div>
  );
};

export default CapstoneSetup;
