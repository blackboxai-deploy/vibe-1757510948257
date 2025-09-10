"use client";

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const CitizenDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');

  const dashboardSections = [
    { id: 'overview', label: '🏠 Overview', description: 'Dashboard home' },
    { id: 'schemes', label: '📋 Government Schemes', description: 'Apply for schemes' },
    { id: 'documents', label: '📄 Digital Locker', description: 'Your documents' },
    { id: 'bills', label: '💰 Bills & Payments', description: 'Pay utilities' },
    { id: 'grievances', label: '📝 Grievances', description: 'File complaints' },
    { id: 'safety', label: '🚨 Safety', description: 'Emergency features' },
    { id: 'updates', label: '📢 Updates', description: 'Latest news' },
  ];

  const governmentSchemes = [
    { name: 'Rythu Bharosa', status: 'Applied', amount: '₹13,500', description: 'Agricultural investment support' },
    { name: 'Amma Vodi', status: 'Approved', amount: '₹15,000', description: 'Educational support for mothers' },
    { name: 'Pension Scheme', status: 'Eligible', amount: '₹3,000', description: 'Monthly pension support' },
    { name: 'YSR Cheyutha', status: 'Pending', amount: '₹18,750', description: 'Women empowerment scheme' },
  ];

  const recentActivities = [
    { action: 'Electricity Bill Paid', amount: '₹2,450', date: '2 days ago', status: 'success' },
    { action: 'Grievance Filed', reference: '#GRV2024001', date: '5 days ago', status: 'pending' },
    { action: 'Document Uploaded', document: 'Income Certificate', date: '1 week ago', status: 'success' },
    { action: 'Scheme Applied', scheme: 'Rythu Bharosa', date: '2 weeks ago', status: 'processing' },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
          <div className="text-2xl font-bold text-orange-600 mb-2">₹47,250</div>
          <div className="text-gray-700">Total Benefits</div>
          <div className="text-sm text-gray-500 mt-1">From government schemes</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600 mb-2">4</div>
          <div className="text-gray-700">Active Schemes</div>
          <div className="text-sm text-gray-500 mt-1">Currently enrolled</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600 mb-2">12</div>
          <div className="text-gray-700">Documents</div>
          <div className="text-sm text-gray-500 mt-1">In digital locker</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
          <div className="text-2xl font-bold text-purple-600 mb-2">1</div>
          <div className="text-gray-700">Pending Issues</div>
          <div className="text-sm text-gray-500 mt-1">Grievances in progress</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{activity.action}</div>
                  <div className="text-sm text-gray-600">
                    {activity.amount && `Amount: ${activity.amount}`}
                    {activity.reference && `Reference: ${activity.reference}`}
                    {activity.document && `Document: ${activity.document}`}
                    {activity.scheme && `Scheme: ${activity.scheme}`}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{activity.date}</div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  activity.status === 'success' ? 'bg-green-100 text-green-800' :
                  activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {activity.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Government Schemes Status</h3>
          <div className="space-y-4">
            {governmentSchemes.map((scheme, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{scheme.name}</div>
                  <div className="text-sm text-gray-600">{scheme.description}</div>
                  <div className="text-sm font-semibold text-green-600 mt-1">{scheme.amount}</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  scheme.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  scheme.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
                  scheme.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {scheme.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSchemes = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Available Government Schemes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { 
              name: 'Rythu Bharosa', 
              amount: '₹13,500/year', 
              eligibility: 'Farmers with land records',
              description: 'Investment support for agricultural activities',
              status: 'Applied'
            },
            { 
              name: 'Amma Vodi', 
              amount: '₹15,000/year', 
              eligibility: 'Mothers with school-going children',
              description: 'Educational support to encourage schooling',
              status: 'Approved'
            },
            { 
              name: 'YSR Pension', 
              amount: '₹3,000/month', 
              eligibility: 'Senior citizens, widows, disabled',
              description: 'Monthly pension for vulnerable groups',
              status: 'Eligible'
            },
            { 
              name: 'YSR Cheyutha', 
              amount: '₹18,750/year', 
              eligibility: 'Women aged 45-60 years',
              description: 'Financial assistance for women empowerment',
              status: 'Not Applied'
            }
          ].map((scheme, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-lg text-gray-800">{scheme.name}</h4>
                <span className="text-lg font-bold text-green-600">{scheme.amount}</span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{scheme.description}</p>
              <div className="text-xs text-gray-500 mb-4">
                <strong>Eligibility:</strong> {scheme.eligibility}
              </div>
              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  scheme.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  scheme.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
                  scheme.status === 'Eligible' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {scheme.status}
                </span>
                <button className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-md">
                  {scheme.status === 'Not Applied' ? 'Apply Now' : 'View Details'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSafetyFeatures = () => (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-red-800 mb-4">Emergency Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-red-600 text-white p-6 rounded-lg text-center hover:bg-red-700 transition-colors">
            <div className="text-3xl mb-2">🚨</div>
            <div className="font-bold text-lg">SOS Alert</div>
            <div className="text-sm opacity-90">Emergency help</div>
          </button>
          <button className="bg-orange-600 text-white p-6 rounded-lg text-center hover:bg-orange-700 transition-colors">
            <div className="text-3xl mb-2">👮</div>
            <div className="font-bold text-lg">Police</div>
            <div className="text-sm opacity-90">Call 100</div>
          </button>
          <button className="bg-blue-600 text-white p-6 rounded-lg text-center hover:bg-blue-700 transition-colors">
            <div className="text-3xl mb-2">🏥</div>
            <div className="font-bold text-lg">Medical</div>
            <div className="text-sm opacity-90">Call 108</div>
          </button>
        </div>
        <div className="mt-4 p-4 bg-white border border-red-200 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">Emergency Contacts</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div>Police: 100 | Medical: 108 | Fire: 101</div>
            <div>Women Helpline: 181 | Child Helpline: 1098</div>
            <div>Disaster Management: 1077</div>
          </div>
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
              <h1 className="text-xl font-bold text-gray-800">AP Youth Connect</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-800">{user?.name}</div>
                <div className="text-xs text-gray-500">{user?.role}</div>
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
              {activeSection === 'schemes' && renderSchemes()}
              {activeSection === 'safety' && renderSafetyFeatures()}
              {activeSection !== 'overview' && activeSection !== 'schemes' && activeSection !== 'safety' && (
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

export default CitizenDashboard;