'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Flame, 
  Droplet, 
  Target, 
  TrendingUp,
  Calendar,
  Award,
  Activity
} from 'lucide-react';
import { getTodayCalories, getTodayWater } from '@/lib/storage';

interface DashboardHomeProps {
  profile: UserProfile;
}

export default function DashboardHome({ profile }: DashboardHomeProps) {
  const [todayCalories, setTodayCalories] = useState(0);
  const [todayWater, setTodayWater] = useState(0);

  useEffect(() => {
    setTodayCalories(getTodayCalories());
    setTodayWater(getTodayWater());
  }, []);

  const caloriesProgress = (todayCalories / profile.dailyCalories) * 100;
  const waterProgress = (todayWater / profile.dailyWater) * 100;

  const getMotivationalMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '☀️ Bom dia! Vamos começar o dia com energia!';
    if (hour < 18) return '🌤️ Boa tarde! Continue firme nos seus objetivos!';
    return '🌙 Boa noite! Que tal revisar seu progresso de hoje?';
  };

  return (
    <div className="space-y-6">
      {/* Mensagem Motivacional */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-6">
          <p className="text-lg font-semibold text-gray-900 mb-2">
            {getMotivationalMessage()}
          </p>
          <p className="text-gray-600">
            Você está no caminho certo para alcançar seus objetivos de saúde!
          </p>
        </CardContent>
      </Card>

      {/* Resumo Diário */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calorias de Hoje */}
        <Card className="border-orange-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <Flame className="w-5 h-5" />
              Calorias de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-4xl font-bold text-gray-900">{todayCalories}</p>
                <p className="text-sm text-gray-600">de {profile.dailyCalories} cal</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold text-orange-600">
                  {Math.round(caloriesProgress)}%
                </p>
                <p className="text-xs text-gray-600">concluído</p>
              </div>
            </div>
            <Progress value={caloriesProgress} className="h-3" />
            <p className="text-sm text-gray-600">
              Restam {Math.max(0, profile.dailyCalories - todayCalories)} calorias
            </p>
          </CardContent>
        </Card>

        {/* Hidratação de Hoje */}
        <Card className="border-blue-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <Droplet className="w-5 h-5" />
              Hidratação de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-4xl font-bold text-gray-900">
                  {(todayWater / 1000).toFixed(1)}L
                </p>
                <p className="text-sm text-gray-600">
                  de {(profile.dailyWater / 1000).toFixed(1)}L
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold text-blue-600">
                  {Math.round(waterProgress)}%
                </p>
                <p className="text-xs text-gray-600">concluído</p>
              </div>
            </div>
            <Progress value={waterProgress} className="h-3" />
            <p className="text-sm text-gray-600">
              Faltam {((profile.dailyWater - todayWater) / 1000).toFixed(1)}L
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cards de Informações */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-3 rounded-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Seu Objetivo</p>
                <p className="text-lg font-semibold text-gray-900">
                  {profile.goal === 'lose-weight' && 'Perder Peso'}
                  {profile.goal === 'maintain' && 'Manter Peso'}
                  {profile.goal === 'gain-muscle' && 'Ganhar Massa'}
                  {profile.goal === 'improve-health' && 'Melhorar Saúde'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-purple-400 to-pink-600 p-3 rounded-xl">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Nível de Atividade</p>
                <p className="text-lg font-semibold text-gray-900 capitalize">
                  {profile.activityLevel.replace('-', ' ')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-yellow-400 to-amber-600 p-3 rounded-xl">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Dias Ativos</p>
                <p className="text-lg font-semibold text-gray-900">
                  {Math.floor((Date.now() - new Date(profile.createdAt).getTime()) / (1000 * 60 * 60 * 24)) + 1}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demonstração do App */}
      <Card className="border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-600">
            <TrendingUp className="w-5 h-5" />
            Funcionalidades do LifeWave
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Explore todas as funcionalidades que preparamos para você:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Registro de refeições e calorias</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Monitoramento de hidratação</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Acompanhamento de metas</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Dicas diárias de bem-estar</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Lembretes de hidratação</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span>Planos de assinatura flexíveis</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
