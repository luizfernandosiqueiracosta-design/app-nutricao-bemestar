'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, RefreshCw, Heart, Dumbbell, Apple, Brain, Moon } from 'lucide-react';
import { wellnessTips } from '@/lib/wellness-tips';

interface WellnessTipsProps {
  profile: UserProfile;
}

export default function WellnessTips({ profile }: WellnessTipsProps) {
  const [currentTip, setCurrentTip] = useState<any>(null);
  const [category, setCategory] = useState<string>('all');

  useEffect(() => {
    loadRandomTip();
  }, [category]);

  const loadRandomTip = () => {
    let tips = wellnessTips;
    
    if (category !== 'all') {
      tips = wellnessTips.filter(tip => tip.category === category);
    }

    const randomIndex = Math.floor(Math.random() * tips.length);
    setCurrentTip(tips[randomIndex]);
  };

  const categories = [
    { id: 'all', name: 'Todas', icon: Lightbulb, color: 'yellow' },
    { id: 'nutrition', name: 'Nutrição', icon: Apple, color: 'green' },
    { id: 'exercise', name: 'Exercícios', icon: Dumbbell, color: 'orange' },
    { id: 'mental', name: 'Mental', icon: Brain, color: 'purple' },
    { id: 'sleep', name: 'Sono', icon: Moon, color: 'blue' },
    { id: 'hydration', name: 'Hidratação', icon: Heart, color: 'cyan' }
  ];

  const getCategoryColor = (cat: string) => {
    const categoryObj = categories.find(c => c.id === cat);
    return categoryObj?.color || 'gray';
  };

  const getCategoryIcon = (cat: string) => {
    const categoryObj = categories.find(c => c.id === cat);
    const Icon = categoryObj?.icon || Lightbulb;
    return <Icon className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Dicas de Bem-Estar
              </h2>
              <p className="text-gray-600">
                Aprenda algo novo todos os dias sobre saúde e bem-estar
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-400 to-amber-600 p-4 rounded-2xl">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtros de Categoria */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = category === cat.id;
          
          return (
            <Button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              variant={isActive ? 'default' : 'outline'}
              className={`h-auto py-4 flex flex-col gap-2 ${
                isActive
                  ? `bg-gradient-to-br from-${cat.color}-400 to-${cat.color}-600 text-white hover:from-${cat.color}-500 hover:to-${cat.color}-700`
                  : ''
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{cat.name}</span>
            </Button>
          );
        })}
      </div>

      {/* Dica do Dia */}
      {currentTip && (
        <Card className={`border-${getCategoryColor(currentTip.category)}-200 shadow-lg`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getCategoryIcon(currentTip.category)}
              <span className="capitalize">{currentTip.category === 'nutrition' ? 'Nutrição' : 
                currentTip.category === 'exercise' ? 'Exercícios' :
                currentTip.category === 'mental' ? 'Saúde Mental' :
                currentTip.category === 'sleep' ? 'Sono' :
                currentTip.category === 'hydration' ? 'Hidratação' : currentTip.category}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`p-6 bg-gradient-to-br from-${getCategoryColor(currentTip.category)}-50 to-${getCategoryColor(currentTip.category)}-100 rounded-xl`}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {currentTip.title}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {currentTip.content}
              </p>
            </div>

            {currentTip.tips && currentTip.tips.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">💡 Dicas Práticas:</h4>
                <ul className="space-y-2">
                  {currentTip.tips.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-600 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button
              onClick={loadRandomTip}
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white py-6 text-lg shadow-lg"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Próxima Dica
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Dicas Rápidas */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle>🌟 Dicas Rápidas do Dia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Apple className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-gray-900">Nutrição</h4>
              </div>
              <p className="text-sm text-gray-700">
                Inclua pelo menos 5 porções de frutas e vegetais por dia
              </p>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Dumbbell className="w-5 h-5 text-orange-600" />
                <h4 className="font-semibold text-gray-900">Exercício</h4>
              </div>
              <p className="text-sm text-gray-700">
                30 minutos de atividade física moderada diariamente
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Moon className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Sono</h4>
              </div>
              <p className="text-sm text-gray-700">
                Durma de 7-9 horas por noite para recuperação completa
              </p>
            </div>

            <div className="p-4 bg-cyan-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-cyan-600" />
                <h4 className="font-semibold text-gray-900">Hidratação</h4>
              </div>
              <p className="text-sm text-gray-700">
                Beba água regularmente ao longo do dia
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personalização baseada no perfil */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-3">
            🎯 Recomendações Personalizadas para Você
          </h3>
          <div className="space-y-2 text-sm text-gray-700">
            {profile.goal === 'lose-weight' && (
              <>
                <p>• Foque em criar um déficit calórico saudável de 300-500 calorias</p>
                <p>• Combine exercícios aeróbicos com treino de força</p>
                <p>• Priorize proteínas para manter massa muscular</p>
              </>
            )}
            {profile.goal === 'gain-muscle' && (
              <>
                <p>• Consuma proteínas suficientes (1.6-2.2g por kg de peso)</p>
                <p>• Mantenha superávit calórico moderado de 200-300 calorias</p>
                <p>• Priorize treino de força com progressão de carga</p>
              </>
            )}
            {profile.goal === 'maintain' && (
              <>
                <p>• Mantenha equilíbrio entre calorias consumidas e gastas</p>
                <p>• Continue com rotina regular de exercícios</p>
                <p>• Foque em hábitos sustentáveis a longo prazo</p>
              </>
            )}
            {profile.goal === 'improve-health' && (
              <>
                <p>• Priorize alimentos integrais e naturais</p>
                <p>• Mantenha rotina regular de sono e exercícios</p>
                <p>• Pratique técnicas de gerenciamento de estresse</p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
