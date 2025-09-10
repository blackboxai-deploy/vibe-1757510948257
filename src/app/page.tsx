"use client";

import { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import LoginModal from '@/components/auth/LoginModal';
import CitizenDashboard from '@/components/dashboard/CitizenDashboard';
import OfficialDashboard from '@/components/dashboard/OfficialDashboard';
import YouthDashboard from '@/components/dashboard/YouthDashboard';

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // If user is authenticated, show appropriate dashboard
  if (isAuthenticated && user) {
    switch (user.role) {
      case UserRole.CITIZEN:
        return <CitizenDashboard />;
      case UserRole.GOVERNMENT_OFFICIAL:
        return <OfficialDashboard />;
      case UserRole.YOUTH:
        return <YouthDashboard />;
      default:
        return <CitizenDashboard />;
    }
  }

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Indian Flag Header Strip */}
      <div className="fixed w-full top-0 h-1 z-50 bg-gradient-to-r from-orange-500 via-white to-green-600"></div>
      
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full top-1 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-b from-orange-500 via-white to-green-600 rounded-full flex items-center justify-center border-2 border-gray-300">
                <span className="text-gray-800 font-bold text-lg">AP</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800">AP Youth Connect</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-orange-600 transition-colors">Home</a>
              <a href="#services" className="text-gray-700 hover:text-green-600 transition-colors">Services</a>
              <a href="#about" className="text-gray-700 hover:text-orange-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-green-600 transition-colors">Contact</a>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              <div className="w-6 h-0.5 bg-gray-700 mb-1"></div>
              <div className="w-6 h-0.5 bg-gray-700 mb-1"></div>
              <div className="w-6 h-0.5 bg-gray-700"></div>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t">
              <a href="#home" className="block py-2 text-gray-700 hover:text-blue-600">Home</a>
              <a href="#services" className="block py-2 text-gray-700 hover:text-blue-600">Services</a>
              <a href="#about" className="block py-2 text-gray-700 hover:text-blue-600">About</a>
              <a href="#contact" className="block py-2 text-gray-700 hover:text-blue-600">Contact</a>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-17 bg-gradient-to-br from-orange-50 via-white to-green-50 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
                One App, One Platform, 
                <span className="bg-gradient-to-r from-orange-500 via-white via-green-500 bg-clip-text text-transparent"> One Future</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Empowering the youth of Andhra Pradesh through unified access to government services, 
                opportunities, and development programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold border-2 border-orange-500 transition-all duration-300 focus:ring-4 focus:ring-orange-200"
                >
                  Login / Register
                </button>
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="bg-transparent text-green-600 px-8 py-3 rounded-lg font-semibold border-2 border-green-600 transition-all duration-300 focus:ring-4 focus:ring-green-200"
                >
                  Quick Access
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/75051ce9-ad4f-40a1-9d58-5247f1b7488f.png"
                alt="Modern government digital platform interface with youth engaging in various government services"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive government services designed to support youth development and opportunities across Andhra Pradesh
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Employment Services",
                description: "Job opportunities, skill matching, and career guidance for youth across various sectors",
                image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9c4f1462-63a7-4682-9c3f-14f71c8aeb73.png"
              },
              {
                title: "Education Support",
                description: "Scholarships, educational resources, and academic guidance for continuous learning",
                image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3227eb9d-77f2-4924-8178-dbd779f4384a.png"
              },
              {
                title: "Skill Development",
                description: "Training programs, certification courses, and skill enhancement opportunities",
                image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9c82fedd-e0b5-4d0d-a049-0a08d3bfa66b.png"
              },
              {
                title: "Entrepreneurship",
                description: "Start-up support, business loans, and mentorship programs for young entrepreneurs",
                image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8797e395-e123-49cd-b347-bf6e13c315da.png"
              },
              {
                title: "Health & Wellness",
                description: "Healthcare services, wellness programs, and mental health support for youth",
                image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5db8706b-3114-44f8-8534-a700542ee456.png"
              },
              {
                title: "Digital Services",
                description: "Online government services, digital literacy programs, and technology access",
                image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b5d50129-26ed-4000-ae0e-c222e2628f38.png"
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fac11ba3-116b-4587-bce8-0ea81180adb2.png"
                alt="Government of Andhra Pradesh building and officials working for youth development"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">About AP Youth Connect</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                AP Youth Connect is a revolutionary initiative by the Government of Andhra Pradesh, 
                designed to create a unified digital ecosystem for the youth of our state. Our platform 
                serves as a single point of access to all government services, opportunities, and 
                development programs.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Through innovative technology and citizen-centric design, we aim to bridge the gap 
                between government services and young citizens, ensuring equal opportunities and 
                seamless access to resources that can shape their future.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">500K+</div>
                  <div className="text-gray-600">Youth Registered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                  <div className="text-gray-600">Government Services</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose AP Youth Connect?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers unique advantages that make government services accessible, efficient, and youth-friendly
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Unified Access",
                description: "Single platform for all government services and opportunities"
              },
              {
                title: "Real-time Updates",
                description: "Instant notifications about new opportunities and program updates"
              },
              {
                title: "Personalized Experience",
                description: "Customized content based on individual interests and qualifications"
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock assistance and guidance for all queries"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-gray-50">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 via-white to-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-gray-200">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-green-600 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 border-t-4 border-gradient-to-r from-orange-500 via-white to-green-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-orange-400">AP Youth Connect</h3>
              <p className="text-gray-400">One app, one platform, one future for Andhra Pradesh</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-orange-400">Connect With Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Facebook</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Instagram</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">YouTube</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Contact</h3>
              <address className="not-italic text-gray-400">
                <p>Government of Andhra Pradesh</p>
                <p>Velagapudi, Amaravati</p>
                <p>Andhra Pradesh 522237</p>
                <p className="mt-2">contact@apyouthconnect.in</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <div className="h-1 w-32 mx-auto mb-4 bg-gradient-to-r from-orange-500 via-white to-green-600 rounded"></div>
            <p className="text-gray-400">© 2024 AP Youth Connect. A vision by Ajitesh Nova.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}