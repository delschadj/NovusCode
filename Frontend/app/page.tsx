"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/page-container';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const router = useRouter();

  const handleStartDemoClick = () => {
    router.push('/start');
  };


  return (
    <PageContainer scrollable={true}>
      <div className="min-h-screen bg-background text-foreground px-4 md:px-8 lg:px-12"> {/* Add padding here */}
        <header className="py-6 px-8 flex justify-between items-center bg-background z-50 fixed top-0 left-0 right-0">
          <div className="relative z-20 flex items-center text-2xl font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            NovusCode
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#features" className="hover:text-primary">Features</a></li>
              <li><a href="#about" className="hover:text-primary">About</a></li>
              <li><a href="#contact" className="hover:text-primary">Contact</a></li>
            </ul>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-24 mt-[40px]">

          <div className="flex flex-row items-center justify-between mb-24 gap-12">
            <div className="md:w-1/2">
              <h1 className="text-5xl font-bold mb-8">AI-powered Developer Onboarding</h1>
              <p className="text-xl mb-10">Get new developers up to speed faster with AI. Our tool helps them understand code, projects, and docs quickly, so they can start contributing right away.</p>
              <Button variant="default" size="lg" onClick={handleStartDemoClick}>
                START DEMO
              </Button>
            </div>
            <div className="md:w-1/2 flex items-center justify-center h-[300px] md:h-[400px]">
              <div className="relative w-[100%] h-[100%]">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                  title="NovusCode Introduction" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="absolute top-0 left-0 rounded-lg shadow-lg"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-muted my-24"></div>

          <section id="features" className="mb-24 px-4">
            <h2 className="text-3xl font-semibold mb-10 text-center">Explore Our Features</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <FeatureCard 
                title="AI-Powered Learning"
                description="Personalized learning paths tailored to your needs"
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
              />
              <FeatureCard 
                title="Project Management"
                description="Efficiently manage your projects and tasks"
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}
              />
              <FeatureCard 
                title="Document Collaboration"
                description="Seamlessly work together on documents"
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
              />
            </div>
          </section>

          <div className="border-t-2 border-muted my-24"></div>

          <section id="about" className="mb-24 px-4">
            <h2 className="text-3xl font-semibold mb-10 text-center">About NovusCode</h2>
            <p className="text-lg text-center max-w-3xl mx-auto">
              NovusCode is revolutionizing the way new developers onboard to projects. 
              Our AI-powered platform provides personalized learning experiences, 
              streamlined project management, and collaborative tools to help you 
              succeed in your software development journey.
            </p>
          </section>

          <div className="border-t-2 border-muted my-24"></div>

          <section id="contact" className="text-center px-4">
            <h2 className="text-3xl font-semibold mb-10">Get in Touch</h2>
            <p className="mb-10">Have questions? We're here to help!</p>
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
          </section>
        </main>

        <footer className="bg-muted py-6 text-center">
          <p>&copy; 2024 NovusCode. All rights reserved.</p>
        </footer>
      </div>
    </PageContainer>
  );
};

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="bg-card p-8 rounded-lg shadow-md">
      <div className="flex justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default LandingPage;
