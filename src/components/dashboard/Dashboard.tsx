'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Home, 
  Utensils, 
  Droplet, 
  Target, 
  Lightbulb, 
  CreditCard,
  Bell,
  TrendingUp,
  Calendar
} from 'lucide-react';
import CalorieTracker from './CalorieTracker';
import HydrationTracker from './HydrationTracker';
import GoalsTracker from './GoalsTracker';
import WellnessTips from './WellnessTips';
import SubscriptionPlans from './SubscriptionPlans';
import DashboardHome from './DashboardHome';

interface DashboardProps {
  profile: UserProfile;
}

export default function Dashboard({ profile }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white border-b border-green-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">LifeWave</h1>
                <p className="text-sm text-gray-600">Olá, {profile.name}!</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="gap-2"
            >
              <Bell className="w-4 h-4" />
              Notificações
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs */}
          <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2 bg-white p-2 rounded-xl shadow-sm h-auto">
            <TabsTrigger 
              value="home" 
              className="flex flex-col gap-1 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white"
            >
              <Home className="w-5 h-5" />
              <span className="text-xs">Início</span>
            </TabsTrigger>
            <TabsTrigger 
              value="calories" 
              className="flex flex-col gap-1 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white"
            >
              <Utensils className="w-5 h-5" />
              <span className="text-xs">Calorias</span>
            </TabsTrigger>
            <TabsTrigger 
              value="hydration" 
              className="flex flex-col gap-1 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white"
            >
              <Droplet className="w-5 h-5" />
              <span className="text-xs">Hidratação</span>
            </TabsTrigger>
            <TabsTrigger 
              value="goals" 
              className="flex flex-col gap-1 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white"
            >
              <Target className="w-5 h-5" />
              <span className="text-xs">Metas</span>
            </TabsTrigger>
            <TabsTrigger 
              value="tips" 
              className="flex flex-col gap-1 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-amber-600 data-[state=active]:text-white"
            >
              <Lightbulb className="w-5 h-5" />
              <span className="text-xs">Dicas</span>
            </TabsTrigger>
            <TabsTrigger 
              value="subscription" 
              className="flex flex-col gap-1 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              <CreditCard className="w-5 h-5" />
              <span className="text-xs">Planos</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="home" className="space-y-6">
            <DashboardHome profile={profile} />
          </TabsContent>

          <TabsContent value="calories" className="space-y-6">
            <CalorieTracker profile={profile} />
          </TabsContent>

          <TabsContent value="hydration" className="space-y-6">
            <HydrationTracker profile={profile} />
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <GoalsTracker profile={profile} />
          </TabsContent>

          <TabsContent value="tips" className="space-y-6">
            <WellnessTips profile={profile} />
          </TabsContent>

          <TabsContent value="subscription" className="space-y-6">
            <SubscriptionPlans />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
