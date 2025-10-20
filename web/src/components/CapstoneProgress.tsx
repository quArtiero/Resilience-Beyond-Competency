import React, { useEffect, useState } from 'react';
import { TrendingUp, Activity, Award, Calendar } from 'lucide-react';

const CapstoneProgress: React.FC = () => {
  const [trackerData, setTrackerData] = useState<any>(null);
  const [checkinsData, setCheckinsData] = useState<any>(null);
  const [submissionData, setSubmissionData] = useState<any>(null);

  useEffect(() => {
    const tracker = localStorage.getItem('capstone-tracker');
    const checkins = localStorage.getItem('capstone-checkins');
    const submission = localStorage.getItem('capstone-submission');

    if (tracker) setTrackerData(JSON.parse(tracker));
    if (checkins) setCheckinsData(JSON.parse(checkins));
    if (submission) setSubmissionData(JSON.parse(submission));
  }, []);

  if (!trackerData) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <p className="text-gray-600">Start your 15-day journey to see progress visualization</p>
      </div>
    );
  }

  const completedDays = trackerData.logs.filter((log: any) => log.completed).length;
  const totalDays = 15;
  const progressPercent = (completedDays / totalDays) * 100;

  // Calculate daily stress drops
  const stressData = trackerData.logs
    .filter((log: any) => log.completed && log.stressPre && log.stressPost)
    .map((log: any) => ({
      day: log.day,
      drop: log.stressPre - log.stressPost
    }));

  // Calculate metrics trend
  const metricsData = trackerData.logs
    .filter((log: any) => log.completed && log.metricValue)
    .map((log: any) => ({
      day: log.day,
      value: log.metricValue
    }));

  const milestones = [
    { day: 1, label: 'Started Journey', completed: completedDays >= 1 },
    { day: 5, label: 'First Check-in', completed: checkinsData?.day5?.submitted },
    { day: 10, label: 'Second Check-in', completed: checkinsData?.day10?.submitted },
    { day: 15, label: 'Final Submission', completed: submissionData?.submitted },
  ];

  return (
    <div className="space-y-6 my-8">
      {/* Overall Progress */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Overall Progress</h3>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Day {completedDays} of {totalDays}</span>
            <span>{progressPercent.toFixed(0)}% Complete</span>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Milestones */}
        <div className="grid grid-cols-4 gap-2">
          {milestones.map((milestone) => (
            <div
              key={milestone.day}
              className={`text-center p-3 rounded-lg ${
                milestone.completed
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className={`text-lg font-bold ${
                milestone.completed ? 'text-green-600' : 'text-gray-400'
              }`}>
                Day {milestone.day}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {milestone.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stress Drop Trend */}
      {stressData.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">Stress Drop Trend</h3>
          </div>
          
          <div className="flex items-end gap-2 h-32">
            {stressData.map((data: any) => {
              const height = Math.max(10, (data.drop / 5) * 100);
              return (
                <div key={data.day} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-green-500 to-green-300 rounded-t"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-gray-600 mt-1">{data.drop}</span>
                  <span className="text-xs text-gray-400">D{data.day}</span>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-700">
              Average stress drop: <strong>
                {(stressData.reduce((acc: number, d: any) => acc + d.drop, 0) / stressData.length).toFixed(1)} points
              </strong>
            </p>
          </div>
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{completedDays}</p>
          <p className="text-xs text-gray-600">Days Completed</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {stressData.length > 0 
              ? (stressData.reduce((acc: number, d: any) => acc + d.drop, 0) / stressData.length).toFixed(1)
              : '0'}
          </p>
          <p className="text-xs text-gray-600">Avg Stress Drop</p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {checkinsData ? 
              [checkinsData.day5?.submitted, checkinsData.day10?.submitted].filter(Boolean).length 
              : 0}/2
          </p>
          <p className="text-xs text-gray-600">Check-ins Done</p>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {submissionData?.submitted ? '✓' : '—'}
          </p>
          <p className="text-xs text-gray-600">Final Submitted</p>
        </div>
      </div>

      {/* Recent Activity */}
      {metricsData.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Recent Activity</h4>
          <div className="space-y-2">
            {metricsData.slice(-3).reverse().map((data: any) => (
              <div key={data.day} className="flex justify-between text-sm">
                <span className="text-gray-600">Day {data.day}</span>
                <span className="text-gray-900 font-medium">{data.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CapstoneProgress;
