'use client';

import { UserProfile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Target, Droplet, Flame, TrendingUp } from 'lucide-react';

interface WelcomeScreenProps {
  profile: UserProfile;
  onContinue: () => void;
}

export default function WelcomeScreen({ profile, onContinue }: WelcomeScreenProps) {
  const getGoalText = (goal: string) => {
    switch (goal) {
      case 'lose-weight':
        return 'Perder Peso';
      case 'maintain':
        return 'Manter Peso';
      case 'gain-muscle':
        return 'Ganhar Massa Muscular';
      case 'improve-health':
        return 'Melhorar Saúde';
      default:
        return goal;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-6 animate-in fade-in duration-700">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full shadow-lg">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Bem-vindo ao LifeWave!</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Olá, <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{profile.name}</span>! 👋
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estamos animados em ajudá-lo a alcançar seus objetivos de saúde e bem-estar!
          </p>
        </div>

        {/* Cards de Informações Personalizadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Meta Diária de Calorias */}
          <Card className="border-green-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-orange-400 to-red-500 p-3 rounded-2xl">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Meta Diária de Calorias</h3>
                  <p className="text-3xl font-bold text-orange-600">{profile.dailyCalories}</p>
                  <p className="text-sm text-gray-600 mt-1">calorias por dia</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meta de Hidratação */}
          <Card className="border-green-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-blue-400 to-cyan-500 p-3 rounded-2xl">
                  <Droplet className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Meta de Hidratação</h3>
                  <p className="text-3xl font-bold text-blue-600">{(profile.dailyWater / 1000).toFixed(1)}L</p>
                  <p className="text-sm text-gray-600 mt-1">de água por dia</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Objetivo Principal */}
          <Card className="border-green-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-3 rounded-2xl">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Seu Objetivo</h3>
                  <p className="text-2xl font-bold text-green-600">{getGoalText(profile.goal)}</p>
                  <p className="text-sm text-gray-600 mt-1">Vamos conquistar juntos!</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nível de Atividade */}
          <Card className="border-green-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-purple-400 to-pink-500 p-3 rounded-2xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Nível de Atividade</h3>
                  <p className="text-xl font-bold text-purple-600 capitalize">
                    {profile.activityLevel.replace('-', ' ')}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Continue se movimentando!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mensagem Motivacional */}
        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg">
          <CardContent className="p-6 text-center">
            <p className="text-lg text-gray-700 mb-4">
              🌟 <strong>Sua jornada começa agora!</strong> 🌟
            </p>
            <p className="text-gray-600 mb-6">
              Preparamos um plano personalizado baseado nas suas respostas. 
              Vamos explorar todas as funcionalidades que vão te ajudar a alcançar seus objetivos!
            </p>
            <Button
              onClick={onContinue}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Começar Minha Jornada
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
