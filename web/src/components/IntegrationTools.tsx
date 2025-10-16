import React, { useState, useEffect } from 'react';
import { AlertCircle, TrendingUp, Target, Clock, Activity, CheckCircle, Download, Save, RefreshCw, Calendar } from 'lucide-react';

// ==================== Snapshot Table Component ====================
export const SnapshotTable: React.FC<{ lessonId: number }> = ({ lessonId }) => {
  const [snapshot, setSnapshot] = useState(() => {
    const saved = localStorage.getItem(`lesson-${lessonId}-snapshot`);
    return saved ? JSON.parse(saved) : {
      arena: '',
      purpose: '',
      optionChosen: '',
      toolsUsed: '',
      metricTarget: '',
      result: '',
      timeToDecision: '',
      stressBefore: 5,
      stressAfter: 5,
      riskAvoided: '',
      differenceMaker: ''
    };
  });

  const [debriefAnswers, setDebriefAnswers] = useState(() => {
    const saved = localStorage.getItem(`lesson-${lessonId}-debrief`);
    return saved ? JSON.parse(saved) : {
      simple: '',
      complexity: '',
      change: '',
      phrase: ''
    };
  });

  useEffect(() => {
    localStorage.setItem(`lesson-${lessonId}-snapshot`, JSON.stringify(snapshot));
  }, [snapshot, lessonId]);

  useEffect(() => {
    localStorage.setItem(`lesson-${lessonId}-debrief`, JSON.stringify(debriefAnswers));
  }, [debriefAnswers, lessonId]);

  const stressReduction = snapshot.stressBefore - snapshot.stressAfter;
  const stressReductionPercent = snapshot.stressBefore > 0 
    ? Math.round((stressReduction / snapshot.stressBefore) * 100)
    : 0;

  const handleExport = () => {
    const data = {
      snapshot,
      debriefAnswers,
      analysis: {
        stressReduction,
        stressReductionPercent
      }
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flexibility-snapshot-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Activity className="w-6 h-6 text-blue-600" />
          Results Review: Your Metric Snapshot
        </h3>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export Data
        </button>
      </div>

      {/* Main Snapshot Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-700">Experiment Metrics</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Arena (Work/Team/Personal)</label>
            <select
              value={snapshot.arena}
              onChange={(e) => setSnapshot({...snapshot, arena: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select...</option>
              <option value="work">Work/School</option>
              <option value="team">Team/Relationships</option>
              <option value="personal">Personal Systems</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Purpose (exact words)</label>
            <input
              type="text"
              value={snapshot.purpose}
              onChange={(e) => setSnapshot({...snapshot, purpose: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Deliver compelling demo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Option Chosen</label>
            <input
              type="text"
              value={snapshot.optionChosen}
              onChange={(e) => setSnapshot({...snapshot, optionChosen: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Tools Used (max 3)</label>
            <input
              type="text"
              value={snapshot.toolsUsed}
              onChange={(e) => setSnapshot({...snapshot, toolsUsed: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Constraint Box, 3 Hats"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Leading Metric & Target</label>
            <input
              type="text"
              value={snapshot.metricTarget}
              onChange={(e) => setSnapshot({...snapshot, metricTarget: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Decision time <2 hours"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Result (actual number)</label>
            <input
              type="text"
              value={snapshot.result}
              onChange={(e) => setSnapshot({...snapshot, result: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 1.5 hours"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Time to Decision (hours)</label>
            <input
              type="number"
              step="0.5"
              value={snapshot.timeToDecision}
              onChange={(e) => setSnapshot({...snapshot, timeToDecision: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Stress Level (1-10)</label>
            <div className="flex gap-4">
              <div className="flex-1">
                <span className="text-xs text-gray-500">Before</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={snapshot.stressBefore}
                  onChange={(e) => setSnapshot({...snapshot, stressBefore: Number(e.target.value)})}
                  className="w-full"
                />
                <span className="text-center block text-lg font-bold text-gray-700">{snapshot.stressBefore}</span>
              </div>
              <div className="flex-1">
                <span className="text-xs text-gray-500">After</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={snapshot.stressAfter}
                  onChange={(e) => setSnapshot({...snapshot, stressAfter: Number(e.target.value)})}
                  className="w-full"
                />
                <span className="text-center block text-lg font-bold text-gray-700">{snapshot.stressAfter}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">Biggest Risk Avoided</label>
            <input
              type="text"
              value={snapshot.riskAvoided}
              onChange={(e) => setSnapshot({...snapshot, riskAvoided: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="One sentence description"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">The Difference-Maker (tool/phrase)</label>
            <input
              type="text"
              value={snapshot.differenceMaker}
              onChange={(e) => setSnapshot({...snapshot, differenceMaker: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="What unlocked movement?"
            />
          </div>
        </div>

        {/* Stress Reduction Analysis */}
        {stressReduction > 0 && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <span className="text-green-800 font-semibold">Stress Reduction</span>
              <span className="text-2xl font-bold text-green-600">
                -{stressReduction} points ({stressReductionPercent}%)
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Debrief Questions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-700">Debrief Analysis</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              What worked because it was simple?
            </label>
            <textarea
              value={debriefAnswers.simple}
              onChange={(e) => setDebriefAnswers({...debriefAnswers, simple: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={2}
              placeholder="List what was effortlessly effective..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              What was unnecessary complexity?
            </label>
            <textarea
              value={debriefAnswers.complexity}
              onChange={(e) => setDebriefAnswers({...debriefAnswers, complexity: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={2}
              placeholder="What added friction without value..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              If you ran this again tomorrow, what's the first thing you'd change?
            </label>
            <textarea
              value={debriefAnswers.change}
              onChange={(e) => setDebriefAnswers({...debriefAnswers, change: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Which specific phrase unlocked movement?
            </label>
            <input
              type="text"
              value={debriefAnswers.phrase}
              onChange={(e) => setDebriefAnswers({...debriefAnswers, phrase: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="The exact words that shifted your thinking..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== Baseline Comparison Component ====================
export const BaselineComparison: React.FC<{ lessonId: number }> = ({ lessonId }) => {
  const assessmentItems = [
    'Generate two alternatives quickly when plans fail',
    'Hold two competing explanations without reacting',
    'Update approach when new information appears',
    'Restate the other view fairly (steelmanning)',
    'Look for what\'s available now vs. what\'s missing',
    'Pivot from blame to next move in <5 minutes',
    'Ask "What else?" before committing to action'
  ];

  const [baseline, setBaseline] = useState(() => {
    const saved = localStorage.getItem(`lesson-${lessonId}-baseline`);
    return saved ? JSON.parse(saved) : {
      before: Array(7).fill(3),
      after: Array(7).fill(3)
    };
  });

  useEffect(() => {
    localStorage.setItem(`lesson-${lessonId}-baseline`, JSON.stringify(baseline));
  }, [baseline, lessonId]);

  const handleBeforeChange = (index: number, value: number) => {
    const newBefore = [...baseline.before];
    newBefore[index] = value;
    setBaseline({...baseline, before: newBefore});
  };

  const handleAfterChange = (index: number, value: number) => {
    const newAfter = [...baseline.after];
    newAfter[index] = value;
    setBaseline({...baseline, after: newAfter});
  };

  const changes = baseline.after.map((after: number, i: number) => after - baseline.before[i]);
  const totalBefore = baseline.before.reduce((a: number, b: number) => a + b, 0);
  const totalAfter = baseline.after.reduce((a: number, b: number) => a + b, 0);
  const totalChange = totalAfter - totalBefore;

  const topGains = changes
    .map((change: number, index: number) => ({ change, index }))
    .sort((a, b) => b.change - a.change)
    .slice(0, 2);

  const needsWork = changes
    .map((change: number, index: number) => ({ change, index }))
    .filter(item => item.change <= 0);

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-green-600" />
          Baseline Comparison: Track Your Growth
        </h3>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700">Item</th>
                <th className="text-center py-2 px-2 text-sm font-semibold text-gray-700">Before (L1)</th>
                <th className="text-center py-2 px-2 text-sm font-semibold text-gray-700">After (Now)</th>
                <th className="text-center py-2 px-2 text-sm font-semibold text-gray-700">Change</th>
              </tr>
            </thead>
            <tbody>
              {assessmentItems.map((item, index) => {
                const change = changes[index];
                const isTopGain = topGains.some(g => g.index === index);
                const needsImprovement = change <= 0;

                return (
                  <tr key={index} className={`border-b ${isTopGain ? 'bg-green-50' : needsImprovement ? 'bg-red-50' : ''}`}>
                    <td className="py-3 px-2 text-sm text-gray-700">
                      {index + 1}. {item}
                      {isTopGain && <span className="ml-2 text-green-600 font-bold">⭐</span>}
                      {needsImprovement && <span className="ml-2 text-red-600">⚠️</span>}
                    </td>
                    <td className="py-3 px-2">
                      <select
                        value={baseline.before[index]}
                        onChange={(e) => handleBeforeChange(index, Number(e.target.value))}
                        className="w-16 mx-auto block px-2 py-1 border border-gray-300 rounded text-center"
                      >
                        {[1,2,3,4,5].map(val => (
                          <option key={val} value={val}>{val}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-2">
                      <select
                        value={baseline.after[index]}
                        onChange={(e) => handleAfterChange(index, Number(e.target.value))}
                        className="w-16 mx-auto block px-2 py-1 border border-gray-300 rounded text-center"
                      >
                        {[1,2,3,4,5].map(val => (
                          <option key={val} value={val}>{val}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span className={`font-bold text-lg ${change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                        {change > 0 ? '+' : ''}{change}
                      </span>
                    </td>
                  </tr>
                );
              })}
              <tr className="font-bold bg-gray-100">
                <td className="py-3 px-2">TOTAL</td>
                <td className="py-3 px-2 text-center text-lg">{totalBefore}</td>
                <td className="py-3 px-2 text-center text-lg">{totalAfter}</td>
                <td className="py-3 px-2 text-center text-lg">
                  <span className={`${totalChange > 0 ? 'text-green-600' : totalChange < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                    {totalChange > 0 ? '+' : ''}{totalChange}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Analysis */}
        <div className="mt-6 space-y-4">
          {topGains.length > 0 && (
            <div className="p-4 bg-green-100 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">🌟 Your Signature Strengths (Top 2 Gains)</h4>
              <ul className="space-y-1">
                {topGains.map(gain => (
                  <li key={gain.index} className="text-green-700">
                    • {assessmentItems[gain.index]} (+{gain.change})
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-green-600">Build your Flexibility OS around these strengths!</p>
            </div>
          )}

          {needsWork.length > 0 && (
            <div className="p-4 bg-amber-100 rounded-lg">
              <h4 className="font-semibold text-amber-800 mb-2">🎯 Your Development Edge</h4>
              <ul className="space-y-1">
                {needsWork.map(item => (
                  <li key={item.index} className="text-amber-700">
                    • {assessmentItems[item.index]} ({item.change <= 0 ? 'No change' : item.change})
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-amber-600">Pick ONE tool to practice daily in these areas.</p>
            </div>
          )}

          <div className="p-4 bg-blue-100 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">📊 Overall Progress Assessment</h4>
            <p className="text-blue-700">
              {totalChange >= 13 ? 'Transformation in progress! Your flexibility has dramatically improved.' :
               totalChange >= 8 ? 'Significant flexibility gain! You\'ve made substantial progress.' :
               totalChange >= 5 ? 'Solid foundation built. Keep practicing to amplify results.' :
               'Early stage growth. Focus on daily practice with your chosen tools.'}
            </p>
            <p className="mt-2 text-sm text-blue-600">
              Total improvement: <span className="font-bold text-lg">+{totalChange} points</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== Flexibility OS Builder Component ====================
export const FlexibilityOSBuilder: React.FC<{ lessonId: number }> = ({ lessonId }) => {
  const [os, setOS] = useState(() => {
    const saved = localStorage.getItem(`lesson-${lessonId}-flexibility-os`);
    return saved ? JSON.parse(saved) : {
      triggers: ['have to/can\'t language', 'tunnel vision'],
      resetSteps: ['Breathe 5x (4s in, 2s hold, 4s out)', 'Name purpose out loud'],
      reframes: ['If the purpose is __, what else could work?'],
      tools: [
        { name: 'Constraint Box', when: 'Overthinking', script: 'Solve with $0, <2h, current resources' }
      ],
      metrics: [
        { name: '48-hour tests/week', target: '2', current: '' }
      ],
      ifThens: [
        { if: 'overwhelmed by choices', then: 'Constraint Box: pick cheapest/fastest' }
      ]
    };
  });

  useEffect(() => {
    localStorage.setItem(`lesson-${lessonId}-flexibility-os`, JSON.stringify(os));
  }, [os, lessonId]);

  const addTrigger = () => {
    setOS({...os, triggers: [...os.triggers, '']});
  };

  const updateTrigger = (index: number, value: string) => {
    const newTriggers = [...os.triggers];
    newTriggers[index] = value;
    setOS({...os, triggers: newTriggers});
  };

  const removeTrigger = (index: number) => {
    setOS({...os, triggers: os.triggers.filter((_: any, i: number) => i !== index)});
  };

  const addTool = () => {
    setOS({...os, tools: [...os.tools, { name: '', when: '', script: '' }]});
  };

  const updateTool = (index: number, field: string, value: string) => {
    const newTools = [...os.tools];
    newTools[index] = {...newTools[index], [field]: value};
    setOS({...os, tools: newTools});
  };

  const removeTool = (index: number) => {
    setOS({...os, tools: os.tools.filter((_: any, i: number) => i !== index)});
  };

  const addMetric = () => {
    setOS({...os, metrics: [...os.metrics, { name: '', target: '', current: '' }]});
  };

  const updateMetric = (index: number, field: string, value: string) => {
    const newMetrics = [...os.metrics];
    newMetrics[index] = {...newMetrics[index], [field]: value};
    setOS({...os, metrics: newMetrics});
  };

  const addIfThen = () => {
    setOS({...os, ifThens: [...os.ifThens, { if: '', then: '' }]});
  };

  const updateIfThen = (index: number, field: string, value: string) => {
    const newIfThens = [...os.ifThens];
    newIfThens[index] = {...newIfThens[index], [field]: value};
    setOS({...os, ifThens: newIfThens});
  };

  const exportOS = () => {
    const osText = `
MY FLEXIBILITY OPERATING SYSTEM v1.0
=====================================

1️⃣ TRIGGERS I WATCH FOR:
${os.triggers.map((t: string) => `□ ${t}`).join('\n')}

2️⃣ RESET PROTOCOL (90 seconds):
${os.resetSteps.map((s: string, i: number) => `${i + 1}. ${s}`).join('\n')}

3️⃣ FIRST-LINE REFRAMES:
${os.reframes.map((r: string) => `• "${r}"`).join('\n')}

4️⃣ GO-TO TOOLS:
${os.tools.map((t: any) => `
${t.name}:
  When: ${t.when}
  Script: "${t.script}"`).join('\n')}

5️⃣ MY METRICS:
${os.metrics.map((m: any) => `• ${m.name}: Target ${m.target} | Current ${m.current}`).join('\n')}

6️⃣ IF-THEN PROTOCOLS:
${os.ifThens.map((it: any) => `IF ${it.if} → THEN ${it.then}`).join('\n')}

Generated: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([osText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flexibility-os.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Target className="w-6 h-6 text-purple-600" />
          Build Your Flexibility OS
        </h3>
        <button
          onClick={exportOS}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export OS
        </button>
      </div>

      {/* Section 1: Triggers */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-700">1️⃣ Triggers I Watch For</h4>
        {os.triggers.map((trigger: string, index: number) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={trigger}
              onChange={(e) => updateTrigger(index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., jaw tension, 'have to' language"
            />
            <button
              onClick={() => removeTrigger(index)}
              className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          onClick={addTrigger}
          className="mt-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
        >
          + Add Trigger
        </button>
      </div>

      {/* Section 2: Reset Protocol */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-700">2️⃣ Reset Protocol (90 seconds)</h4>
        {os.resetSteps.map((step: string, index: number) => (
          <div key={index} className="flex gap-2 mb-2">
            <span className="px-3 py-2 bg-gray-100 rounded-lg font-mono">{index + 1}.</span>
            <input
              type="text"
              value={step}
              onChange={(e) => {
                const newSteps = [...os.resetSteps];
                newSteps[index] = e.target.value;
                setOS({...os, resetSteps: newSteps});
              }}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        ))}
      </div>

      {/* Section 3: Go-To Tools */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-700">4️⃣ Go-To Tools (max 3)</h4>
        {os.tools.map((tool: any, index: number) => (
          <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <input
                type="text"
                value={tool.name}
                onChange={(e) => updateTool(index, 'name', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Tool name"
              />
              <input
                type="text"
                value={tool.when}
                onChange={(e) => updateTool(index, 'when', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="When to use"
              />
              <input
                type="text"
                value={tool.script}
                onChange={(e) => updateTool(index, 'script', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Script (10-15 words)"
              />
            </div>
            <button
              onClick={() => removeTool(index)}
              className="mt-2 text-sm text-red-600 hover:text-red-800"
            >
              Remove Tool
            </button>
          </div>
        ))}
        {os.tools.length < 3 && (
          <button
            onClick={addTool}
            className="mt-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
          >
            + Add Tool
          </button>
        )}
      </div>

      {/* Section 4: Metrics */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-700">6️⃣ My Metrics (Leading Indicators)</h4>
        <div className="space-y-2">
          {os.metrics.map((metric: any, index: number) => (
            <div key={index} className="grid grid-cols-3 gap-2">
              <input
                type="text"
                value={metric.name}
                onChange={(e) => updateMetric(index, 'name', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Metric name"
              />
              <input
                type="text"
                value={metric.target}
                onChange={(e) => updateMetric(index, 'target', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Target"
              />
              <input
                type="text"
                value={metric.current}
                onChange={(e) => updateMetric(index, 'current', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Current"
              />
            </div>
          ))}
        </div>
        <button
          onClick={addMetric}
          className="mt-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
        >
          + Add Metric
        </button>
      </div>

      {/* Section 5: If-Then Protocols */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-700">7️⃣ If-Then Emergency Protocols</h4>
        {os.ifThens.map((protocol: any, index: number) => (
          <div key={index} className="mb-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-purple-600">IF</span>
              <input
                type="text"
                value={protocol.if}
                onChange={(e) => updateIfThen(index, 'if', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Situation"
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-bold text-green-600">THEN</span>
              <input
                type="text"
                value={protocol.then}
                onChange={(e) => updateIfThen(index, 'then', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Action"
              />
            </div>
          </div>
        ))}
        <button
          onClick={addIfThen}
          className="mt-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
        >
          + Add Protocol
        </button>
      </div>

      {/* Success Message */}
      <div className="p-4 bg-green-100 rounded-lg border border-green-300">
        <p className="text-green-800 font-semibold flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Your Flexibility OS is ready! Export it and keep it visible for daily use.
        </p>
      </div>
    </div>
  );
};

// ==================== Sprint Planner Component ====================
export const SprintPlanner: React.FC<{ lessonId: number }> = ({ lessonId }) => {
  const [sprint, setSprint] = useState(() => {
    const saved = localStorage.getItem(`lesson-${lessonId}-sprint`);
    return saved ? JSON.parse(saved) : {
      arena: '',
      baseline: {
        currentReaction: '',
        typicalStress: 5,
        storyITell: ''
      },
      parameters: {
        primaryTool: '',
        backupTool: '',
        dailyTime: '',
        duration: '15',
        location: '',
        metric: ''
      },
      accountability: {
        partnerName: '',
        contactMethod: '',
        checkIn1: '',
        checkIn2: ''
      },
      commitment: {
        name: '',
        date: new Date().toISOString().split('T')[0],
        startDate: ''
      }
    };
  });

  const [dailyLogs, setDailyLogs] = useState(() => {
    const saved = localStorage.getItem(`lesson-${lessonId}-sprint-logs`);
    return saved ? JSON.parse(saved) : Array(7).fill(null).map(() => ({
      completed: false,
      toolUsed: '',
      timeToDecision: '',
      stressDelta: '',
      optionsGenerated: '',
      bonusChallenge: false
    }));
  });

  useEffect(() => {
    localStorage.setItem(`lesson-${lessonId}-sprint`, JSON.stringify(sprint));
  }, [sprint, lessonId]);

  useEffect(() => {
    localStorage.setItem(`lesson-${lessonId}-sprint-logs`, JSON.stringify(dailyLogs));
  }, [dailyLogs, lessonId]);

  const updateDayLog = (day: number, field: string, value: any) => {
    const newLogs = [...dailyLogs];
    newLogs[day] = {...newLogs[day], [field]: value};
    setDailyLogs(newLogs);
  };

  const bonusChallenges = [
    'Use primary tool within 1 hour of waking',
    'Generate 5 options (not 3) for one decision',
    'Teach your tool to someone else',
    'Apply tool to someone else\'s problem',
    'Combine two tools on same challenge',
    'Reduce decision time by 50%',
    'Use tool in unexpected arena'
  ];

  const completedDays = dailyLogs.filter((log: any) => log.completed).length;
  const completionRate = Math.round((completedDays / 7) * 100);

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-indigo-600" />
          7-Day Flexibility Sprint Planner
        </h3>
        <div className="text-lg font-semibold text-indigo-600">
          {completedDays}/7 Days ({completionRate}%)
        </div>
      </div>

      {/* Pre-Sprint Setup */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-700">Pre-Sprint Setup</h4>
        
        {/* Arena Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">Choose Your Arena</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Work/School', 'Team/Relationship', 'Personal Systems'].map((arena) => (
              <button
                key={arena}
                onClick={() => setSprint({...sprint, arena})}
                className={`p-4 rounded-lg border-2 transition-all ${
                  sprint.arena === arena 
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
              >
                <div className="font-semibold">{arena}</div>
                <div className="text-sm mt-1 text-gray-600">
                  {arena === 'Work/School' && 'Deadlines, conflicts, resources'}
                  {arena === 'Team/Relationship' && 'Communication, coordination'}
                  {arena === 'Personal Systems' && 'Habits, routines, self-care'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Baseline */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              How I Currently React When Plans Break
            </label>
            <textarea
              value={sprint.baseline.currentReaction}
              onChange={(e) => setSprint({
                ...sprint,
                baseline: {...sprint.baseline, currentReaction: e.target.value}
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows={2}
              placeholder="Describe your typical response..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Typical Stress Level (1-10)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={sprint.baseline.typicalStress}
              onChange={(e) => setSprint({
                ...sprint,
                baseline: {...sprint.baseline, typicalStress: Number(e.target.value)}
              })}
              className="w-full"
            />
            <div className="text-center text-lg font-bold text-gray-700">
              {sprint.baseline.typicalStress}
            </div>
          </div>
        </div>
      </div>

      {/* Sprint Parameters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-700">Sprint Parameters</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Primary Tool</label>
            <select
              value={sprint.parameters.primaryTool}
              onChange={(e) => setSprint({
                ...sprint,
                parameters: {...sprint.parameters, primaryTool: e.target.value}
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select...</option>
              <option value="What Else Rule">What Else Rule</option>
              <option value="Constraint Box">Constraint Box</option>
              <option value="3 Hats">3 Hats/Perspective</option>
              <option value="Decision Triage">Decision Triage</option>
              <option value="Reverse + Guardrail">Reverse + Guardrail</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Backup Tool</label>
            <select
              value={sprint.parameters.backupTool}
              onChange={(e) => setSprint({
                ...sprint,
                parameters: {...sprint.parameters, backupTool: e.target.value}
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select...</option>
              <option value="What Else Rule">What Else Rule</option>
              <option value="Constraint Box">Constraint Box</option>
              <option value="3 Hats">3 Hats/Perspective</option>
              <option value="Decision Triage">Decision Triage</option>
              <option value="Reverse + Guardrail">Reverse + Guardrail</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Daily Practice Time</label>
            <input
              type="time"
              value={sprint.parameters.dailyTime}
              onChange={(e) => setSprint({
                ...sprint,
                parameters: {...sprint.parameters, dailyTime: e.target.value}
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Leading Metric</label>
            <select
              value={sprint.parameters.metric}
              onChange={(e) => setSprint({
                ...sprint,
                parameters: {...sprint.parameters, metric: e.target.value}
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select...</option>
              <option value="Time to decision">Time to decision (&lt;2 hours)</option>
              <option value="Options generated">Options generated (3+)</option>
              <option value="Stress reduction">Stress reduction (-2 points)</option>
              <option value="Tests run">Tests run (1/day)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Daily Sprint Tracker */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-700">Daily Sprint Tracker</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-2 text-sm font-semibold">Day</th>
                <th className="text-center py-2 px-2 text-sm font-semibold">✓</th>
                <th className="text-center py-2 px-2 text-sm font-semibold">Tool Used</th>
                <th className="text-center py-2 px-2 text-sm font-semibold">Time (min)</th>
                <th className="text-center py-2 px-2 text-sm font-semibold">Stress Δ</th>
                <th className="text-center py-2 px-2 text-sm font-semibold">Options</th>
                <th className="text-center py-2 px-2 text-sm font-semibold">Bonus</th>
              </tr>
            </thead>
            <tbody>
              {dailyLogs.map((log: any, index: number) => (
                <tr key={index} className={`border-b ${log.completed ? 'bg-green-50' : ''}`}>
                  <td className="py-2 px-2 font-semibold">Day {index + 1}</td>
                  <td className="py-2 px-2 text-center">
                    <input
                      type="checkbox"
                      checked={log.completed}
                      onChange={(e) => updateDayLog(index, 'completed', e.target.checked)}
                      className="w-4 h-4"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <select
                      value={log.toolUsed}
                      onChange={(e) => updateDayLog(index, 'toolUsed', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      disabled={!log.completed}
                    >
                      <option value="">-</option>
                      <option value="Primary">Primary</option>
                      <option value="Backup">Backup</option>
                      <option value="Both">Both</option>
                    </select>
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="number"
                      value={log.timeToDecision}
                      onChange={(e) => updateDayLog(index, 'timeToDecision', e.target.value)}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-center"
                      placeholder="0"
                      disabled={!log.completed}
                    />
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="text"
                      value={log.stressDelta}
                      onChange={(e) => updateDayLog(index, 'stressDelta', e.target.value)}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-sm text-center"
                      placeholder="-2"
                      disabled={!log.completed}
                    />
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="number"
                      value={log.optionsGenerated}
                      onChange={(e) => updateDayLog(index, 'optionsGenerated', e.target.value)}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-sm text-center"
                      placeholder="3"
                      disabled={!log.completed}
                    />
                  </td>
                  <td className="py-2 px-2 text-center">
                    <input
                      type="checkbox"
                      checked={log.bonusChallenge}
                      onChange={(e) => updateDayLog(index, 'bonusChallenge', e.target.checked)}
                      className="w-4 h-4"
                      disabled={!log.completed}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bonus Challenges List */}
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
          <h5 className="font-semibold text-yellow-800 mb-2">Daily Bonus Challenges</h5>
          <ol className="text-sm text-yellow-700 space-y-1">
            {bonusChallenges.map((challenge, index) => (
              <li key={index}>Day {index + 1}: {challenge}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* Commitment */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-700">Sprint Commitment</h4>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Your Name</label>
              <input
                type="text"
                value={sprint.commitment.name}
                onChange={(e) => setSprint({
                  ...sprint,
                  commitment: {...sprint.commitment, name: e.target.value}
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Sprint Start Date</label>
              <input
                type="date"
                value={sprint.commitment.startDate}
                onChange={(e) => setSprint({
                  ...sprint,
                  commitment: {...sprint.commitment, startDate: e.target.value}
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="p-4 bg-indigo-100 rounded-lg">
            <p className="text-indigo-800 font-semibold">
              I, {sprint.commitment.name || '[Your Name]'}, commit to running my Flexibility OS for 7 consecutive days 
              in the {sprint.arena || '[chosen arena]'} arena, tracking {sprint.parameters.metric || '[my metric]'}, 
              starting on {sprint.commitment.startDate || '[start date]'}.
            </p>
          </div>

          {completedDays === 7 && (
            <div className="p-4 bg-green-100 rounded-lg border border-green-300">
              <p className="text-green-800 font-bold text-center text-lg">
                🎉 Congratulations! You've completed your 7-Day Sprint! 🎉
              </p>
              <p className="text-green-700 text-center mt-2">
                Time to review your results and plan Sprint 2.0!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
