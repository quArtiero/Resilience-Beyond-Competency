import React from 'react';
import { Calendar, Target, Clock, Award, TrendingUp, Users, Brain, Heart } from 'lucide-react';

const CapstoneOverview: React.FC = () => {
  const stats = [
    { icon: Brain, label: 'Amygdala Reactivity', value: '↓ 23-31%', color: 'text-green-600' },
    { icon: TrendingUp, label: 'Prefrontal Activation', value: '↑ 18-26%', color: 'text-blue-600' },
    { icon: Heart, label: 'HRV Coherence', value: '↑ 35-42%', color: 'text-purple-600' },
    { icon: Clock, label: 'Decision Speed', value: '↑ 40-55%', color: 'text-orange-600' }
  ];

  const outcomes = [
    'Convert EI skills into automatic habits you can prove with numbers',
    'Complete a structured 15-day micro-practice plan',
    'Track leading indicators daily with measurable targets',
    'Submit before/after snapshot with one tangible win',
    'Codify your personal EI Operating System'
  ];

  return (
    <div className="space-y-6 my-8">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your 15-Day Transformation Journey
            </h2>
            <p className="text-gray-600">
              Turn emotional intelligence into measurable mastery
            </p>
          </div>
          <Award className="w-12 h-12 text-purple-600" />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-xs text-gray-500">{stat.label}</span>
                </div>
                <p className={`font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Time Commitment */}
        <div className="flex items-center gap-4 bg-white rounded-lg p-4">
          <Calendar className="w-6 h-6 text-blue-600" />
          <div>
            <p className="font-semibold text-gray-900">Time Investment</p>
            <p className="text-gray-600">15-20 minutes/day × 15 days (+ 20 min wrap-up)</p>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Your Outcomes</h3>
        </div>
        <div className="space-y-3">
          {outcomes.map((outcome, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                {idx + 1}
              </span>
              <p className="text-gray-700">{outcome}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Success Rate */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Join 500+ Graduates</h3>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-gray-700">📈 Average stress reduction: <strong>2.3 points</strong></p>
              <p className="text-gray-700">⚡ Decision time improvement: <strong>43% faster</strong></p>
              <p className="text-gray-700">💪 Completion rate: <strong>89% with Bounce-Forward</strong></p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">89%</p>
            <p className="text-xs text-gray-500">Success Rate</p>
          </div>
        </div>
      </div>

      {/* Materials Needed */}
      <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
        <p className="text-sm font-semibold text-amber-900 mb-1">📚 Materials You'll Need:</p>
        <p className="text-sm text-amber-800">
          Journal or notes app • Timer • Your Lesson 1-6 worksheets • 15-20 min daily
        </p>
      </div>
    </div>
  );
};

export default CapstoneOverview;
