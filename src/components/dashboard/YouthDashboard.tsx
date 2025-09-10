"use client";

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const YouthDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');

  const dashboardSections = [
    { id: 'overview', label: '🏠 Overview', description: 'Youth hub home' },
    { id: 'voice', label: '💭 Voice Your Ideas', description: 'Submit suggestions' },
    { id: 'opportunities', label: '🎯 Opportunities', description: 'Jobs & skills' },
    { id: 'feedback', label: '⭐ Feedback', description: 'Rate services' },
    { id: 'leadership', label: '👥 Leadership Connect', description: 'CM/DyCM updates' },
    { id: 'community', label: '🤝 Community', description: 'Youth network' },
  ];

  const opportunities = [
    { 
      type: 'Government Job', 
      title: 'Junior Assistant - District Collectorate', 
      deadline: '15 Dec 2024', 
      applicants: '2,340',
      status: 'Open'
    },
    { 
      type: 'Skill Program', 
      title: 'Digital Marketing Certification', 
      deadline: '20 Dec 2024', 
      applicants: '450',
      status: 'Registration Open'
    },
    { 
      type: 'Scholarship', 
      title: 'Merit Scholarship for Engineering Students', 
      deadline: '31 Dec 2024', 
      applicants: '1,200',
      status: 'Open'
    },
    { 
      type: 'Internship', 
      title: 'IT Internship - Government Sector', 
      deadline: '10 Jan 2025', 
      applicants: '890',
      status: 'Soon'
    },
  ];

  const youthIdeas = [
    { 
      id: 'IDEA001', 
      title: 'Digital Library in Villages', 
      status: 'Under Review', 
      votes: 234, 
      comments: 45,
      category: 'Education'
    },
    { 
      id: 'IDEA002', 
      title: 'Mobile Health Clinics', 
      status: 'Approved', 
      votes: 567, 
      comments: 89,
      category: 'Healthcare'
    },
    { 
      id: 'IDEA003', 
      title: 'Youth Entrepreneurship Hub', 
      status: 'In Progress', 
      votes: 389, 
      comments: 67,
      category: 'Business'
    },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
          <div className="text-2xl font-bold text-orange-600 mb-2">47</div>
          <div className="text-gray-700">Ideas Submitted</div>
          <div className="text-sm text-gray-500 mt-1">Your contributions</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600 mb-2">12</div>
          <div className="text-gray-700">Applications</div>
          <div className="text-sm text-gray-500 mt-1">Jobs & opportunities</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600 mb-2">1,247</div>
          <div className="text-gray-700">Community Votes</div>
          <div className="text-sm text-gray-500 mt-1">Ideas you supported</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
          <div className="text-2xl font-bold text-purple-600 mb-2">95%</div>
          <div className="text-gray-700">Satisfaction Score</div>
          <div className="text-sm text-gray-500 mt-1">Service feedback</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Latest Opportunities</h3>
          <div className="space-y-4">
            {opportunities.slice(0, 3).map((opp, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{opp.title}</div>
                  <div className="text-sm text-gray-600">{opp.type}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Deadline: {opp.deadline} • {opp.applicants} applicants
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  opp.status === 'Open' ? 'bg-green-100 text-green-800' :
                  opp.status === 'Soon' ? 'bg-blue-100 text-blue-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {opp.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Trending Youth Ideas</h3>
          <div className="space-y-4">
            {youthIdeas.map((idea) => (
              <div key={idea.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-800">{idea.title}</div>
                <div className="text-sm text-gray-600 mt-1">{idea.category}</div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-gray-500">
                    👍 {idea.votes} votes • 💬 {idea.comments} comments
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    idea.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    idea.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {idea.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership Updates */}
      <div className="bg-gradient-to-r from-orange-50 to-green-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">📢 Latest from Leadership</h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-gradient-to-b from-orange-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                CM
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800">Chief Minister's Youth Initiative</div>
                <div className="text-sm text-gray-600 mt-1">
                  "Exciting news! We're launching a new ₹100 crore fund for youth startups across Andhra Pradesh. 
                  Young entrepreneurs can now access funding up to ₹50 lakhs with minimal documentation."
                </div>
                <div className="text-xs text-gray-500 mt-2">2 hours ago • 1,234 reactions</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-gradient-to-b from-green-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                DyCM
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800">Deputy CM's Education Update</div>
                <div className="text-sm text-gray-600 mt-1">
                  "Proud to announce that 10,000+ youth have completed our skill development programs this quarter. 
                  Next batch registration opens tomorrow!"
                </div>
                <div className="text-xs text-gray-500 mt-2">1 day ago • 567 reactions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVoiceIdeas = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-50 to-green-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">💡 Submit Your Ideas</h3>
        <p className="text-gray-600 mb-6">
          Share your innovative ideas to improve Andhra Pradesh. Your voice matters in shaping our state's future!
        </p>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Idea Title</label>
              <input 
                type="text" 
                placeholder="Enter a catchy title for your idea"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="">Select a category</option>
                <option value="education">Education</option>
                <option value="healthcare">Healthcare</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="environment">Environment</option>
                <option value="technology">Technology</option>
                <option value="employment">Employment</option>
                <option value="agriculture">Agriculture</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea 
                rows={4}
                placeholder="Describe your idea in detail. How will it benefit Andhra Pradesh?"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Impact</label>
              <textarea 
                rows={2}
                placeholder="What positive changes do you expect from this idea?"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              ></textarea>
            </div>
            
            <button className="w-full bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-lg font-semibold transition-all hover:shadow-md">
              Submit Your Idea
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">🔥 Popular Youth Ideas</h3>
        <div className="space-y-4">
          {youthIdeas.map((idea) => (
            <div key={idea.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-gray-800">{idea.title}</h4>
                  <div className="text-sm text-gray-600 mt-1">Category: {idea.category}</div>
                  <div className="text-xs text-gray-500 mt-2">ID: {idea.id}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  idea.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  idea.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {idea.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-orange-600">
                    <span>👍</span>
                    <span>{idea.votes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-green-600">
                    <span>💬</span>
                    <span>{idea.comments}</span>
                  </button>
                </div>
                <button className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOpportunities = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">🎯 Youth Opportunities</h3>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">
              All
            </button>
            <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
              Jobs
            </button>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
              Skills
            </button>
            <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
              Scholarships
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opportunities.map((opp, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="text-sm font-medium text-orange-600 mb-1">{opp.type}</div>
                  <h4 className="font-semibold text-lg text-gray-800">{opp.title}</h4>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  opp.status === 'Open' ? 'bg-green-100 text-green-800' :
                  opp.status === 'Soon' ? 'bg-blue-100 text-blue-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {opp.status}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 mb-4">
                <div>Deadline: <span className="font-medium">{opp.deadline}</span></div>
                <div>Applicants: <span className="font-medium">{opp.applicants}</span></div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-orange-500 to-green-600 text-white py-2 rounded-lg font-medium transition-all hover:shadow-md">
                {opp.status === 'Open' || opp.status === 'Registration Open' ? 'Apply Now' : 'Get Notified'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-b from-orange-500 via-white to-green-600 rounded-full flex items-center justify-center border-2 border-gray-300">
                <span className="text-gray-800 font-bold text-lg">AP</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">AP Youth Connect</h1>
                <div className="text-xs text-gray-600">Youth Leadership Platform</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-800">{user?.name}</div>
                <div className="text-xs text-gray-500">Youth Leader</div>
              </div>
              <button 
                onClick={logout}
                className="text-gray-600 hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
              <div className="space-y-2">
                {dashboardSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-orange-500 to-green-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium">{section.label}</div>
                    <div className={`text-xs ${
                      activeSection === section.id ? 'text-white opacity-90' : 'text-gray-500'
                    }`}>
                      {section.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              {activeSection === 'overview' && renderOverview()}
              {activeSection === 'voice' && renderVoiceIdeas()}
              {activeSection === 'opportunities' && renderOpportunities()}
              {!['overview', 'voice', 'opportunities'].includes(activeSection) && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🚧</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Coming Soon</h3>
                  <p className="text-gray-600">
                    This feature is under development and will be available soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouthDashboard;