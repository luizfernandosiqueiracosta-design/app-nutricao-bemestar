'use client';

import { useState, useEffect } from 'react';
import { QuizAnswers, UserProfile } from '@/lib/types';
import { createUserProfile, saveUserProfile, getUserProfile, isOnboardingComplete } from '@/lib/storage';
import Quiz from '@/components/quiz/Quiz';
import WelcomeScreen from '@/components/welcome/WelcomeScreen';
import Dashboard from '@/components/dashboard/Dashboard';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<'loading' | 'quiz' | 'welcome' | 'app'>('loading');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Verificar se o usuário já completou o onboarding
    const profile = getUserProfile();
    const onboardingDone = isOnboardingComplete();

    if (onboardingDone && profile) {
      setUserProfile(profile);
      setCurrentStep('app');
    } else {
      setCurrentStep('quiz');
    }
  }, []);

  const handleQuizComplete = (answers: QuizAnswers) => {
    const profile = createUserProfile(answers);
    saveUserProfile(profile);
    setUserProfile(profile);
    setCurrentStep('welcome');
  };

  const handleWelcomeContinue = () => {
    setCurrentStep('app');
  };

  if (currentStep === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (currentStep === 'quiz') {
    return <Quiz onComplete={handleQuizComplete} />;
  }

  if (currentStep === 'welcome' && userProfile) {
    return <WelcomeScreen profile={userProfile} onContinue={handleWelcomeContinue} />;
  }

  if (currentStep === 'app' && userProfile) {
    return <Dashboard profile={userProfile} />;
  }

  return null;
}
