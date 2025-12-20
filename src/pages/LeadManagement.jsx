import { Search, Filter, Mail, Phone, Star, TrendingUp } from 'lucide-react';
import { useState } from 'react';

function LeadManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const leads = [
    { id: 1, name: 'John Smith', email: 'john@example.com', phone: '+1 555-0123', score: 92, status: 'hot', source: 'Facebook Ads', campaign: 'Summer Sale' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1 555-0124', score: 78, status: 'warm', source: 'Google Ads', campaign: 'Real Estate' },
    { id: 3, name: 'Mike Davis', email: 'mike@example.com', phone: '+1 555-0125', score: 45, status: 'cold', source: 'LinkedIn', campaign: 'B2B Services' },
    { id: 4, name: 'Emma Wilson', email: 'emma@example.com', phone: '+1 555-0126', score: 88, status: 'hot', source: 'Facebook Ads', campaign: 'Fitness Program' },
    { id: 5, name: 'David Brown', email: 'david@example.com', phone: '+1 555-0127', score: 65, status: 'warm', source: 'Instagram', campaign: 'E-commerce' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'hot': return 'bg-red-100 text-red-700';
      case 'warm': return 'bg-orange-100 text-orange-700';
      case 'cold': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-gray-600';
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || lead.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lead Management</h1>
        <p className="text-gray-600">Track and manage your leads effectively</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <p className="text-gray-500 text-sm mb-1">Total Leads</p>
          <p className="text-3xl font-bold text-gray-900">{leads.length}</p>
        </div>
        <div className="card">
          <p className="text-gray-500 text-sm mb-1">Hot Leads</p>
          <p className="text-3xl font-bold text-red-600">{leads.filter(l => l.status === 'hot').length}</p>
        </div>
        <div className="card">
          <p className="text-gray-500 text-sm mb-1">Warm Leads</p>
          <p className="text-3xl font-bold text-orange-600">{leads.filter(l => l.status === 'warm').length}</p>
        </div>
        <div className="card">
          <p className="text-gray-500 text-sm mb-1">Avg. Score</p>
          <p className="text-3xl font-bold text-gray-900">
            {Math.round(leads.reduce((acc, l) => acc + l.score, 0) / leads.length)}
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search leads by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'hot', 'warm', 'cold'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFilter === filter
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white shadow-lg divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{lead.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={14} />
                        {lead.email}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone size={14} />
                        {lead.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Star className={getScoreColor(lead.score)} size={16} fill="currentColor" />
                      <span className={`font-semibold ${getScoreColor(lead.score)}`}>{lead.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                      {lead.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.source}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.campaign}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-primary-600 hover:text-primary-700 font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LeadManagement;



