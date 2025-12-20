import { Users, Target, TrendingUp, DollarSign, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Active Campaigns', value: '12', icon: Target, color: 'text-purple-600 font-bold', bgColor: 'bg-blue-50' },
    { label: 'Total Leads', value: '2,847', icon: Users, color: 'text-emerald-600 font-bold', bgColor: 'bg-green-50' },
    { label: 'Conversion Rate', value: '34.2%', icon: TrendingUp, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { label: 'Revenue Generated', value: '$127,394', icon: DollarSign, color: 'text-orange-600', bgColor: 'bg-orange-50' },
  ];

  const recentCampaigns = [
    { name: 'Summer Sale - E-commerce', status: 'active', leads: 423, conversions: 142 },
    { name: 'Real Estate Luxury Homes', status: 'active', leads: 187, conversions: 67 },
    { name: 'Fitness Program Launch', status: 'paused', leads: 312, conversions: 98 },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-bold mb-2">Welcome Back! </h1>
        <p className="text-gray-700 font-medium">Your campaigns are performing excellently. Keep up the great work!</p>
      </div>

      {/* Quick Start Button */}
      <div className="mb-8 card bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Ready to Generate More Leads?</h2>
            <p className="text-white opacity-95">Create a new AI-powered campaign in under 3 minutes</p>
          </div>
          <button
            onClick={() => navigate('/campaign-creator')}
            className="flex items-center gap-2 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 text-purple-700 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            <Sparkles size={20} />
            <span>Create Campaign</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 font-bold">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={stat.color} size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Campaigns */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 font-bold">Recent Campaigns</h2>
          <button className="text-primary-600 hover:text-primary-700 font-semibold">View All</button>
        </div>
        <div className="space-y-4">
          {recentCampaigns.map((campaign, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 font-bold mb-1">{campaign.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-700 font-medium">
                  <span>{campaign.leads} leads</span>
                  <span></span>
                  <span>{campaign.conversions} conversions</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                campaign.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
              }`}>
                {campaign.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;




