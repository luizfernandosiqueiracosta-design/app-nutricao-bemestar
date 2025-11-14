'use client';

import { useState } from 'react';
import { QuizAnswers } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Leaf, User, Target, Activity, Apple, Droplet } from 'lucide-react';

interface QuizProps {
  onComplete: (answers: QuizAnswers) => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({
    dietaryPreferences: [],
  });

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(answers as QuizAnswers);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const updateAnswer = (key: keyof QuizAnswers, value: any) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const toggleDietaryPreference = (preference: string) => {
    const current = answers.dietaryPreferences || [];
    if (current.includes(preference)) {
      updateAnswer('dietaryPreferences', current.filter(p => p !== preference));
    } else {
      updateAnswer('dietaryPreferences', [...current, preference]);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return answers.name && answers.age && answers.gender;
      case 2:
        return answers.weight && answers.height;
      case 3:
        return answers.activityLevel;
      case 4:
        return answers.goal;
      case 5:
        return true; // Preferências são opcionais
      case 6:
        return answers.waterIntake && answers.sleepHours;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-green-200">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-3 rounded-2xl">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              LifeWave
            </h1>
          </div>
          <CardTitle className="text-2xl">Vamos Conhecer Você!</CardTitle>
          <CardDescription>
            Responda algumas perguntas para personalizarmos sua experiência
          </CardDescription>
          <Progress value={progress} className="mt-4" />
          <p className="text-sm text-muted-foreground">
            Passo {step} de {totalSteps}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Passo 1: Informações Básicas */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-500">
              <div className="flex items-center gap-2 text-green-600 mb-4">
                <User className="w-5 h-5" />
                <h3 className="font-semibold text-lg">Informações Básicas</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  value={answers.name || ''}
                  onChange={(e) => updateAnswer('name', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Idade</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={answers.age || ''}
                    onChange={(e) => updateAnswer('age', parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Gênero</Label>
                  <RadioGroup
                    value={answers.gender}
                    onValueChange={(value) => updateAnswer('gender', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="font-normal cursor-pointer">Masculino</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="font-normal cursor-pointer">Feminino</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other" className="font-normal cursor-pointer">Outro</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* Passo 2: Medidas Corporais */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-500">
              <div className="flex items-center gap-2 text-green-600 mb-4">
                <Activity className="w-5 h-5" />
                <h3 className="font-semibold text-lg">Medidas Corporais</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={answers.weight || ''}
                    onChange={(e) => updateAnswer('weight', parseFloat(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="170"
                    value={answers.height || ''}
                    onChange={(e) => updateAnswer('height', parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Passo 3: Nível de Atividade */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-500">
              <div className="flex items-center gap-2 text-green-600 mb-4">
                <Activity className="w-5 h-5" />
                <h3 className="font-semibold text-lg">Nível de Atividade Física</h3>
              </div>

              <RadioGroup
                value={answers.activityLevel}
                onValueChange={(value) => updateAnswer('activityLevel', value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="sedentary" id="sedentary" />
                  <Label htmlFor="sedentary" className="font-normal cursor-pointer flex-1">
                    <div className="font-semibold">Sedentário</div>
                    <div className="text-sm text-muted-foreground">Pouco ou nenhum exercício</div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light" className="font-normal cursor-pointer flex-1">
                    <div className="font-semibold">Levemente Ativo</div>
                    <div className="text-sm text-muted-foreground">Exercício leve 1-3 dias/semana</div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate" className="font-normal cursor-pointer flex-1">
                    <div className="font-semibold">Moderadamente Ativo</div>
                    <div className="text-sm text-muted-foreground">Exercício moderado 3-5 dias/semana</div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="active" id="active" />
                  <Label htmlFor="active" className="font-normal cursor-pointer flex-1">
                    <div className="font-semibold">Muito Ativo</div>
                    <div className="text-sm text-muted-foreground">Exercício intenso 6-7 dias/semana</div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="very-active" id="very-active" />
                  <Label htmlFor="very-active" className="font-normal cursor-pointer flex-1">
                    <div className="font-semibold">Extremamente Ativo</div>
                    <div className="text-sm text-muted-foreground">Exercício muito intenso diariamente</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Passo 4: Objetivo */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-500">
              <div className="flex items-center gap-2 text-green-600 mb-4">
                <Target className="w-5 h-5" />
                <h3 className="font-semibold text-lg">Qual é o Seu Objetivo?</h3>
              </div>

              <RadioGroup
                value={answers.goal}
                onValueChange={(value) => updateAnswer('goal', value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="lose-weight" id="lose-weight" />
                  <Label htmlFor="lose-weight" className="font-normal cursor-pointer flex-1">
                    <div className="font-semibold">Perder Peso</div>
                    <div className="text-sm text-muted-foreground">Reduzir gordura corporal de forma saudável</div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="maintain" id="maintain" />
                  <Label htmlFor="maintain" className="font-normal cursor-pointer flex-1">
                    <div className="font-semibold">Manter Peso</div>
                    <div className="text-sm text-muted-foreground">Manter peso atual e hábitos saudáveis</div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="gain-muscle" id="gain-muscle" />
                  <Label htmlFor="gain-muscle" className="font-normal cursor-pointer flex-1">
                    <div className="font-semibold">Ganhar Massa Muscular</div>
                    <div className="text-sm text-muted-foreground">Aumentar músculos e força</div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="improve-health" id="improve-health" />
                  <Label htmlFor="improve-health" className="font-normal cursor-pointer flex-1">
                    <div className="font-semibold">Melhorar Saúde Geral</div>
                    <div className="text-sm text-muted-foreground">Foco em bem-estar e qualidade de vida</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Passo 5: Preferências Alimentares */}
          {step === 5 && (
            <div className="space-y-4 animate-in fade-in duration-500">
              <div className="flex items-center gap-2 text-green-600 mb-4">
                <Apple className="w-5 h-5" />
                <h3 className="font-semibold text-lg">Preferências Alimentares</h3>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                Selecione todas que se aplicam (opcional)
              </p>

              <div className="space-y-3">
                {['Vegetariano', 'Vegano', 'Sem Glúten', 'Sem Lactose', 'Low Carb', 'Cetogênica', 'Paleo', 'Mediterrânea'].map((pref) => (
                  <div key={pref} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-green-50 transition-colors">
                    <Checkbox
                      id={pref}
                      checked={answers.dietaryPreferences?.includes(pref)}
                      onCheckedChange={() => toggleDietaryPreference(pref)}
                    />
                    <Label htmlFor={pref} className="font-normal cursor-pointer flex-1">
                      {pref}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Passo 6: Hábitos Diários */}
          {step === 6 && (
            <div className="space-y-4 animate-in fade-in duration-500">
              <div className="flex items-center gap-2 text-green-600 mb-4">
                <Droplet className="w-5 h-5" />
                <h3 className="font-semibold text-lg">Hábitos Diários</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="waterIntake">Quantos copos de água você bebe por dia?</Label>
                <Input
                  id="waterIntake"
                  type="number"
                  placeholder="8"
                  value={answers.waterIntake || ''}
                  onChange={(e) => updateAnswer('waterIntake', parseInt(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">1 copo = aproximadamente 250ml</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sleepHours">Quantas horas você dorme por noite?</Label>
                <Input
                  id="sleepHours"
                  type="number"
                  placeholder="7"
                  value={answers.sleepHours || ''}
                  onChange={(e) => updateAnswer('sleepHours', parseInt(e.target.value))}
                />
              </div>
            </div>
          )}

          {/* Botões de Navegação */}
          <div className="flex gap-3 pt-4">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1"
              >
                Voltar
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              {step === totalSteps ? 'Finalizar' : 'Próximo'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
