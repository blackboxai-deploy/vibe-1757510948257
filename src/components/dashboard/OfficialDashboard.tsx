"use client";

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const OfficialDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');

  const dashboardSections = [
    { id: 'overview', label: '📊 Overview', description: 'Dashboard metrics' },
    { id: 'requests', label: '📋 Citizen Requests', description: 'Pending applications' },
    { id: 'approvals', label: '✅ Approvals', description: 'Review & approve' },
    { id: 'grievances', label: '📝 Grievances', description: 'Resolve complaints' },
    { id: 'analytics', label: '📈 Analytics', description: 'Performance data' },
    { id: 'crisis', label: '🚨 Crisis Management', description: 'Emergency coordination' },
  ];

  const pendingRequests = [
    { id: 'REQ001', citizen: 'Ravi Kumar', type: 'Rythu Bharosa', amount: '₹13,500', days: 2, priority: 'high' },
    { id: 'REQ002', citizen: 'Lakshmi Devi', type: 'Amma Vodi', amount: '₹15,000', days: 5, priority: 'medium' },
    { id: 'REQ003', citizen: 'Suresh Babu', type: 'Pension', amount: '₹3,000', days: 1, priority: 'high' },
    { id: 'REQ004', citizen: 'Priya Sharma', type: 'YSR Cheyutha', amount: '₹18,750', days: 8, priority: 'low' },
  ];

  const grievances = [
    { id: 'GRV001', citizen: 'Mohan Reddy', issue: 'Electricity Bill Dispute', status: 'pending', days: 3 },
    { id: 'GRV002', citizen: 'Sita Rama', issue: 'Water Connection Issue', status: 'in-progress', days: 7 },
    { id: 'GRV003', citizen: 'Vijay Kumar', issue: 'Document Verification', status: 'resolved', days: 1 },
    { id: 'GRV004', citizen: 'Anitha Devi', issue: 'Scheme Payment Delay', status: 'pending', days: 12 },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
          <div className="text-2xl font-bold text-orange-600 mb-2">247</div>
          <div className="text-gray-700">Pending Requests</div>
          <div className="text-sm text-gray-500 mt-1">Awaiting approval</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600 mb-2">1,453</div>
          <div className="text-gray-700">Approved Today</div>
          <div className="text-sm text-gray-500 mt-1">Applications processed</div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border border-red-200">
          <div className="text-2xl font-bold text-red-600 mb-2">89</div>
          <div className="text-gray-700">Active Grievances</div>
          <div className="text-sm text-gray-500 mt-1">Need attention</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600 mb-2">96.8%</div>
          <div className="text-gray-700">Success Rate</div>
          <div className="text-sm text-gray-500 mt-1">This month</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Priority Requests</h3>
          <div className="space-y-4">
            {pendingRequests.filter(req => req.priority === 'high').map((request) => (
              <div key={request.id} className="flex items-center justify-between p-3 border border-red-200 bg-red-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{request.citizen}</div>
                  <div className="text-sm text-gray-600">{request.type} - {request.amount}</div>
                  <div className="text-xs text-red-600 mt-1">Pending for {request.days} days</div>
                </div>
                <button className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Approvals</h3>
          <div className="space-y-4">
            {[
              { citizen: 'Krishna Murthy', type: 'Pension Approval', amount: '₹3,000', time: '2 hours ago' },
              { citizen: 'Radha Kumari', type: 'Amma Vodi', amount: '₹15,000', time: '4 hours ago' },
              { citizen: 'Ramesh Babu', type: 'Rythu Bharosa', amount: '₹13,500', time: '6 hours ago' },
            ].map((approval, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{approval.citizen}</div>
                  <div className="text-sm text-gray-600">{approval.type} - {approval.amount}</div>
                  <div className="text-xs text-green-600 mt-1">Approved {approval.time}</div>
                </div>
                <div className="text-green-600 font-medium">✓</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderRequests = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Citizen Requests</h3>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">
              All (247)
            </button>
            <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
              High Priority (15)
            </button>
            <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">
              Due Today (42)
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Request ID</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Citizen Name</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Scheme Type</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Amount</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Days Pending</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Priority</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.map((request) => (
                <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-2 font-mono text-sm">{request.id}</td>
                  <td className="py-3 px-2">{request.citizen}</td>
                  <td className="py-3 px-2">{request.type}</td>
                  <td className="py-3 px-2 font-semibold text-green-600">{request.amount}</td>
                  <td className="py-3 px-2">
                    <span className={`${request.days > 7 ? 'text-red-600' : request.days > 3 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {request.days} days
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      request.priority === 'high' ? 'bg-red-100 text-red-800' :
                      request.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {request.priority}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex space-x-2">
                      <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                        Approve
                      </button>
                      <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                        Review
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderGrievances = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Citizen Grievances</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="text-2xl font-bold text-red-600">34</div>
            <div className="text-sm text-gray-700">Pending</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="text-2xl font-bold text-yellow-600">42</div>
            <div className="text-sm text-gray-700">In Progress</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">156</div>
            <div className="text-sm text-gray-700">Resolved</div>
          </div>
        </div>

        <div className="space-y-4">
          {grievances.map((grievance) => (
            <div key={grievance.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-semibold text-gray-800">{grievance.citizen}</div>
                  <div className="text-sm text-gray-600 mt-1">{grievance.issue}</div>
                  <div className="text-xs text-gray-500 mt-2">ID: {grievance.id} • {grievance.days} days ago</div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    grievance.status === 'resolved' ? 'bg-green-100 text-green-800' :
                    grievance.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {grievance.status}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                  View Details
                </button>
                {grievance.status !== 'resolved' && (
                  <button className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700">
                    Mark Resolved
                  </button>
                )}
                <button className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">
                  Contact Citizen
                </button>
              </div>
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
                <div className="text-xs text-gray-600">Government Official Portal</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-800">{user?.name}</div>
                <div className="text-xs text-gray-500">District Officer</div>
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
              {activeSection === 'requests' && renderRequests()}
              {activeSection === 'grievances' && renderGrievances()}
              {!['overview', 'requests', 'grievances'].includes(activeSection) && (
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

export default OfficialDashboard;