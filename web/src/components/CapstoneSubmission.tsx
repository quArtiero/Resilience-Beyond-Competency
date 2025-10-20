import React, { useState, useEffect } from 'react';
import { Award, TrendingUp, Target, FileText, Download, CheckCircle, Upload } from 'lucide-react';

interface SubmissionData {
  beforeAfter: {
    domain: string;
    leadMetric: string;
    target: string;
    beforeValue: string;
    beforeDate: string;
    afterValue: string;
    afterDate: string;
    percentChange: number;
  };
  tangibleWin: string;
  eiOS: {
    triggers: string;
    reset: string;
    firstLineTool: string;
    goToScript: string;
    weeklyTargets: string;
  };
  exitReflection: {
    reliableTool: string;
    metricToKeep: string;
    updateDate: string;
  };
  submitted: boolean;
  submissionDate: string;
}

const CapstoneSubmission: React.FC = () => {
  const [data, setData] = useState<SubmissionData>({
    beforeAfter: {
      domain: '',
      leadMetric: '',
      target: '',
      beforeValue: '',
      beforeDate: '',
      afterValue: '',
      afterDate: '',
      percentChange: 0
    },
    tangibleWin: '',
    eiOS: {
      triggers: '',
      reset: '',
      firstLineTool: '',
      goToScript: '',
      weeklyTargets: ''
    },
    exitReflection: {
      reliableTool: '',
      metricToKeep: '',
      updateDate: ''
    },
    submitted: false,
    submissionDate: ''
  });

  const [showCertificate, setShowCertificate] = useState(false);

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem('capstone-submission');
    const setup = localStorage.getItem('capstone-setup');
    const tracker = localStorage.getItem('capstone-tracker');

    if (saved) {
      setData(JSON.parse(saved));
    } else if (setup && tracker) {
      // Pre-populate from setup and tracker
      const setupData = JSON.parse(setup);
      const trackerData = JSON.parse(tracker);
      
      setData(prev => ({
        ...prev,
        beforeAfter: {
          ...prev.beforeAfter,
          domain: setupData.domain || '',
          leadMetric: setupData.metrics?.[0] || '',
          target: setupData.targets?.[setupData.metrics?.[0]] || '',
          beforeDate: trackerData.startDate || '',
          afterDate: new Date().toISOString().split('T')[0]
        }
      }));
    }
  }, []);

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('capstone-submission', JSON.stringify(data));
    }, 1000);
    return () => clearTimeout(timer);
  }, [data]);

  // Calculate percent change
  useEffect(() => {
    const before = parseFloat(data.beforeAfter.beforeValue);
    const after = parseFloat(data.beforeAfter.afterValue);
    if (before && after) {
      const change = ((after - before) / before) * 100;
      setData(prev => ({
        ...prev,
        beforeAfter: {
          ...prev.beforeAfter,
          percentChange: change
        }
      }));
    }
  }, [data.beforeAfter.beforeValue, data.beforeAfter.afterValue]);

  const submitCapstone = () => {
    setData(prev => ({
      ...prev,
      submitted: true,
      submissionDate: new Date().toISOString()
    }));
    setShowCertificate(true);
  };

  const exportSubmission = () => {
    const text = `🎯 15-DAY CAPSTONE SUBMISSION
Date: ${new Date().toLocaleDateString()}

BEFORE/AFTER SNAPSHOT
Domain: ${data.beforeAfter.domain}
Lead Metric: ${data.beforeAfter.leadMetric}
Target: ${data.beforeAfter.target}
Before: ${data.beforeAfter.beforeValue} (${data.beforeAfter.beforeDate})
After: ${data.beforeAfter.afterValue} (${data.beforeAfter.afterDate})
Change: ${data.beforeAfter.percentChange.toFixed(1)}%

TANGIBLE WIN
${data.tangibleWin}

EI OPERATING SYSTEM v1.1
• Triggers to watch: ${data.eiOS.triggers}
• Reset: ${data.eiOS.reset}
• First-line tool: ${data.eiOS.firstLineTool}
• Go-to script: ${data.eiOS.goToScript}
• Weekly targets: ${data.eiOS.weeklyTargets}

EXIT REFLECTION
• Most reliable tool: ${data.exitReflection.reliableTool}
• Metric to keep: ${data.exitReflection.metricToKeep}
• Next review date: ${data.exitReflection.updateDate}`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `capstone-submission-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
  };

  const isComplete = 
    data.beforeAfter.beforeValue && 
    data.beforeAfter.afterValue && 
    data.tangibleWin && 
    data.eiOS.triggers && 
    data.eiOS.firstLineTool;

  return (
    <div className="space-y-6 my-8">
      {data.submitted && (
        <div className="bg-green-50 rounded-lg p-4 border border-green-300">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div className="text-sm text-green-900">
              <p className="font-semibold mb-1">Capstone Submitted!</p>
              <p>Submitted on {new Date(data.submissionDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* Before/After Snapshot */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Before/After Snapshot</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Domain
            </label>
            <select
              value={data.beforeAfter.domain}
              onChange={(e) => setData(prev => ({
                ...prev,
                beforeAfter: { ...prev.beforeAfter, domain: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select...</option>
              <option value="work">Work/School</option>
              <option value="relationship">Team/Relationship</option>
              <option value="personal">Personal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lead Metric
            </label>
            <input
              type="text"
              value={data.beforeAfter.leadMetric}
              onChange={(e) => setData(prev => ({
                ...prev,
                beforeAfter: { ...prev.beforeAfter, leadMetric: e.target.value }
              }))}
              placeholder="e.g., Stress Drop, Decision Latency"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="text-sm font-medium text-red-700 mb-2">Before</p>
            <input
              type="text"
              value={data.beforeAfter.beforeValue}
              onChange={(e) => setData(prev => ({
                ...prev,
                beforeAfter: { ...prev.beforeAfter, beforeValue: e.target.value }
              }))}
              placeholder="Value (e.g., 8, 4 hours)"
              className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={data.beforeAfter.beforeDate}
              onChange={(e) => setData(prev => ({
                ...prev,
                beforeAfter: { ...prev.beforeAfter, beforeDate: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm font-medium text-green-700 mb-2">After</p>
            <input
              type="text"
              value={data.beforeAfter.afterValue}
              onChange={(e) => setData(prev => ({
                ...prev,
                beforeAfter: { ...prev.beforeAfter, afterValue: e.target.value }
              }))}
              placeholder="Value (e.g., 5, 1.5 hours)"
              className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={data.beforeAfter.afterDate}
              onChange={(e) => setData(prev => ({
                ...prev,
                beforeAfter: { ...prev.beforeAfter, afterDate: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        {data.beforeAfter.percentChange !== 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
            <p className="text-2xl font-bold text-blue-600">
              {data.beforeAfter.percentChange > 0 ? '↑' : '↓'} {Math.abs(data.beforeAfter.percentChange).toFixed(1)}%
            </p>
            <p className="text-sm text-gray-600">Change</p>
          </div>
        )}
      </div>

      {/* Tangible Win */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Tangible Win (3-5 sentences)</h3>
        </div>
        <textarea
          value={data.tangibleWin}
          onChange={(e) => setData(prev => ({ ...prev, tangibleWin: e.target.value }))}
          placeholder="What changed in the real world? Be specific about the outcome, impact, or feedback you received."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* EI Operating System */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">EI Operating System v1.1</h3>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Triggers to watch
            </label>
            <input
              type="text"
              value={data.eiOS.triggers}
              onChange={(e) => setData(prev => ({
                ...prev,
                eiOS: { ...prev.eiOS, triggers: e.target.value }
              }))}
              placeholder="e.g., Email tone, deadline pressure, interruptions"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reset method
            </label>
            <input
              type="text"
              value={data.eiOS.reset}
              onChange={(e) => setData(prev => ({
                ...prev,
                eiOS: { ...prev.eiOS, reset: e.target.value }
              }))}
              placeholder="e.g., 90-second breath, 5-4-3-2-1 grounding"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First-line tool
            </label>
            <input
              type="text"
              value={data.eiOS.firstLineTool}
              onChange={(e) => setData(prev => ({
                ...prev,
                eiOS: { ...prev.eiOS, firstLineTool: e.target.value }
              }))}
              placeholder="e.g., STOP, If-Then, Reappraisal"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Go-to script
            </label>
            <input
              type="text"
              value={data.eiOS.goToScript}
              onChange={(e) => setData(prev => ({
                ...prev,
                eiOS: { ...prev.eiOS, goToScript: e.target.value }
              }))}
              placeholder="e.g., LRL opener, SBI request, No+Option"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weekly metric targets
            </label>
            <input
              type="text"
              value={data.eiOS.weeklyTargets}
              onChange={(e) => setData(prev => ({
                ...prev,
                eiOS: { ...prev.eiOS, weeklyTargets: e.target.value }
              }))}
              placeholder="e.g., 5 LRL uses, 2 repairs, stress drop ≥2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Exit Reflection */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-900">Exit Reflection</h3>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              My most reliable first tool is ___ because it consistently changes ___
            </label>
            <input
              type="text"
              value={data.exitReflection.reliableTool}
              onChange={(e) => setData(prev => ({
                ...prev,
                exitReflection: { ...prev.exitReflection, reliableTool: e.target.value }
              }))}
              placeholder="e.g., STOP because it consistently changes my response time from instant to thoughtful"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              The metric I'll keep for the next 30 days is ___ (target __)
            </label>
            <input
              type="text"
              value={data.exitReflection.metricToKeep}
              onChange={(e) => setData(prev => ({
                ...prev,
                exitReflection: { ...prev.exitReflection, metricToKeep: e.target.value }
              }))}
              placeholder="e.g., Daily stress drop (target ≥2 points)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              I'll update my EI OS on ___ (date) after a 10-minute review
            </label>
            <input
              type="date"
              value={data.exitReflection.updateDate}
              onChange={(e) => setData(prev => ({
                ...prev,
                exitReflection: { ...prev.exitReflection, updateDate: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={submitCapstone}
          disabled={!isComplete || data.submitted}
          className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
            isComplete && !data.submitted
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Upload className="w-5 h-5" />
          {data.submitted ? 'Already Submitted' : 'Submit Final Package'}
        </button>
        
        <button
          onClick={exportSubmission}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Export Submission
        </button>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-8">
            <div className="text-center">
              <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Congratulations! 🎉
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                You've completed the 15-Day EI Mastery Capstone
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-purple-300 mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  This certifies that you completed fifteen consecutive days of EI practice,
                  tracked leading indicators, and demonstrated measurable improvement in
                  self-regulation, empathy, and social communication under pressure.
                </p>
                <div className="mt-4 pt-4 border-t border-purple-200">
                  <p className="text-sm text-gray-600">
                    <strong>Core tools mastered:</strong> STOP, 90-second reset, If-Then, 
                    Reappraisal, LRL, SBI, No+Option, EAR
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Evidence:</strong> Daily logs + Before/After snapshot + Tangible win
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowCertificate(false)}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CapstoneSubmission;
