import { Mail, MessageSquare, TrendingUp, Clock, Check, Play, Pause } from 'lucide-react';
import { useState } from 'react';

function ConversionEngine() {
  const [activeSequences, setActiveSequences] = useState([
    { id: 1, name: 'Welcome Email Series', type: 'email', status: 'active', sent: 1243, opened: 876, converted: 234, rate: 18.8 },
    { id: 2, name: 'Abandoned Cart Recovery', type: 'email', status: 'active', sent: 456, opened: 298, converted: 87, rate: 19.1 },
    { id: 3, name: 'Re-engagement Campaign', type: 'sms', status: 'paused', sent: 789, opened: 645, converted: 156, rate: 19.8 },
  ]);

  const sequences = [
    {
      id: 1,
      name: 'Welcome Email Series',
      steps: [
        { day: 0, type: 'email', subject: 'Welcome! Heres what to expect', status: 'sent' },
        { day: 2, type: 'email', subject: 'Your exclusive welcome offer', status: 'scheduled' },
        { day: 5, type: 'email', subject: 'Success stories from customers like you', status: 'scheduled' },
        { day: 7, type: 'email', subject: 'Special discount ending soon!', status: 'scheduled' },
      ]
    }
  ];

  const toggleSequenceStatus = (id) => {
    setActiveSequences(prev =>
      prev.map(seq =>
        seq.id === id
          ? { ...seq, status: seq.status === 'active' ? 'paused' : 'active' }
          : seq
      )
    );
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Conversion Engine</h1>
        <p className="text-gray-600">Automate your lead nurturing and conversion process</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm">Total Sequences</p>
            <Mail className="text-primary-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900">{activeSequences.length}</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm">Messages Sent</p>
            <MessageSquare className="text-blue-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {activeSequences.reduce((acc, seq) => acc + seq.sent, 0).toLocaleString()}
          </p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm">Total Conversions</p>
            <TrendingUp className="text-green-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {activeSequences.reduce((acc, seq) => acc + seq.converted, 0)}
          </p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm">Avg. Conversion Rate</p>
            <Check className="text-purple-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {(activeSequences.reduce((acc, seq) => acc + seq.rate, 0) / activeSequences.length).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Active Sequences */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Active Sequences</h2>
          <button className="btn-primary">
            Create New Sequence
          </button>
        </div>

        <div className="space-y-4">
          {activeSequences.map((sequence) => (
            <div key={sequence.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    sequence.type === 'email' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    {sequence.type === 'email' ? (
                      <Mail className={sequence.type === 'email' ? 'text-blue-600' : 'text-purple-600'} size={20} />
                    ) : (
                      <MessageSquare className="text-purple-600" size={20} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{sequence.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">{sequence.type} Automation</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    sequence.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {sequence.status.toUpperCase()}
                  </span>
                  <button
                    onClick={() => toggleSequenceStatus(sequence.id)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {sequence.status === 'active' ? (
                      <Pause size={18} className="text-gray-600" />
                    ) : (
                      <Play size={18} className="text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Sent</p>
                  <p className="text-lg font-semibold text-gray-900">{sequence.sent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Opened</p>
                  <p className="text-lg font-semibold text-gray-900">{sequence.opened.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Converted</p>
                  <p className="text-lg font-semibold text-green-600">{sequence.converted}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Conv. Rate</p>
                  <p className="text-lg font-semibold text-gray-900">{sequence.rate}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sequence Builder Example */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Sequence Timeline: {sequences[0].name}</h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          <div className="space-y-6">
            {sequences[0].steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4 relative">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                  step.status === 'sent'
                    ? 'bg-green-100 border-4 border-white shadow-md'
                    : 'bg-gray-100 border-4 border-white shadow-md'
                }`}>
                  {step.status === 'sent' ? (
                    <Check className="text-green-600" size={20} />
                  ) : (
                    <Clock className="text-gray-600" size={20} />
                  )}
                </div>
                <div className="flex-1 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">Day {step.day}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      step.status === 'sent'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {step.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1 capitalize">{step.type} Message</p>
                  <p className="text-gray-900">{step.subject}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversionEngine;






