"use client";

import React, { useState } from 'react';
import { UserRole } from '@/types/auth';
import { useAuth } from '@/contexts/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [loginMethod, setLoginMethod] = useState<'phone' | 'aadhaar'>('phone');
  const [userRole, setUserRole] = useState<UserRole>(UserRole.CITIZEN);
  const [phone, setPhone] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [error, setError] = useState('');
  
  const { sendOTP, verifyOTP, loginWithAadhaar, isLoading } = useAuth();

  if (!isOpen) return null;

  const handleSendOTP = async () => {
    if (loginMethod === 'phone') {
      if (phone.length !== 10) {
        setError('Please enter a valid 10-digit mobile number');
        return;
      }
      
      const success = await sendOTP(phone);
      if (success) {
        setStep('otp');
        setError('');
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } else {
      if (aadhaar.length !== 12) {
        setError('Please enter a valid 12-digit Aadhaar number');
        return;
      }
      setStep('otp');
      setError('');
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    let success = false;
    
    if (loginMethod === 'phone') {
      success = await verifyOTP(phone, otp, userRole);
    } else {
      success = await loginWithAadhaar(aadhaar, otp);
    }

    if (success) {
      onLoginSuccess();
      onClose();
      resetForm();
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  const resetForm = () => {
    setPhone('');
    setAadhaar('');
    setOtp('');
    setStep('input');
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Welcome to AP Youth Connect</h2>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {/* Indian Flag Accent */}
          <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-white to-green-600 rounded mb-6"></div>

          {step === 'input' && (
            <>
              {/* User Role Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Your Role</label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { role: UserRole.CITIZEN, label: '👥 Citizen', desc: 'Access government services' },
                    { role: UserRole.GOVERNMENT_OFFICIAL, label: '🏛️ Government Official', desc: 'Manage citizen requests' },
                    { role: UserRole.YOUTH, label: '🧑‍🎓 Youth', desc: 'Connect with leadership' },
                  ].map(({ role, label, desc }) => (
                    <button
                      key={role}
                      onClick={() => setUserRole(role)}
                      className={`p-3 text-left rounded-lg border-2 transition-all ${
                        userRole === role
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-green-400'
                      }`}
                    >
                      <div className="font-semibold">{label}</div>
                      <div className="text-sm text-gray-600">{desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Login Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Choose Login Method</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLoginMethod('phone')}
                    className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                      loginMethod === 'phone' 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200 hover:border-green-400'
                    }`}
                  >
                    📱 Mobile OTP
                  </button>
                  <button
                    onClick={() => setLoginMethod('aadhaar')}
                    className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                      loginMethod === 'aadhaar' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-orange-400'
                    }`}
                  >
                    🆔 Aadhaar
                  </button>
                </div>
              </div>

              {/* Phone Number Input */}
              {loginMethod === 'phone' && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="Enter 10-digit mobile number"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      maxLength={10}
                    />
                  </div>
                </div>
              )}

              {/* Aadhaar Input */}
              {loginMethod === 'aadhaar' && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Aadhaar Number
                  </label>
                  <input
                    type="text"
                    value={aadhaar}
                    onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12))}
                    placeholder="Enter 12-digit Aadhaar number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    maxLength={12}
                  />
                </div>
              )}

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleSendOTP}
                disabled={isLoading || (loginMethod === 'phone' ? phone.length !== 10 : aadhaar.length !== 12)}
                className="w-full bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </>
          )}

          {step === 'otp' && (
            <>
              <div className="text-center mb-6">
                <div className="text-lg font-semibold text-gray-800 mb-2">Enter OTP</div>
                <div className="text-sm text-gray-600">
                  OTP sent to {loginMethod === 'phone' ? `+91 ${phone}` : `Aadhaar: ****${aadhaar.slice(-4)}`}
                </div>
                <div className="text-xs text-blue-600 mt-2">Demo OTP: 123456</div>
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-3 py-3 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  maxLength={6}
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={handleVerifyOTP}
                  disabled={isLoading || otp.length !== 6}
                  className="w-full bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>
                
                <button
                  onClick={() => setStep('input')}
                  className="w-full text-gray-600 py-2 text-sm hover:text-gray-800 transition-colors"
                >
                  ← Back to login options
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;