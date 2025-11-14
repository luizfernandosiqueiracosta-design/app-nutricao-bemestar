'use client';

import { useState, useEffect } from 'react';
import { UserProfile, Goal } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Target, Plus, CheckCircle, Trash2, TrendingUp } from 'lucide-react';
import { saveGoal, getGoals, updateGoal, deleteGoal } from '@/lib/storage';

interface GoalsTrackerProps {
  profile: UserProfile;
}

export default function GoalsTracker({ profile }: GoalsTrackerProps) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: 0,
    current: 0,
    unit: '',
    deadline: ''
  });

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = () => {
    setGoals(getGoals());
  };

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.target || !newGoal.unit || !newGoal.deadline) {
      alert('Preencha todos os campos');
      return;
    }

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      target: newGoal.target,
      current: newGoal.current,
      unit: newGoal.unit,
      deadline: newGoal.deadline,
      completed: false
    };

    saveGoal(goal);
    loadGoals();
    setShowAddGoal(false);
    setNewGoal({ title: '', target: 0, current: 0, unit: '', deadline: '' });
  };

  const handleUpdateProgress = (id: string, newCurrent: number) => {
    const goal = goals.find(g => g.id === id);
    if (goal) {
      const updatedGoal = {
        ...goal,
        current: newCurrent,
        completed: newCurrent >= goal.target
      };
      updateGoal(updatedGoal);
      loadGoals();
    }
  };

  const handleDeleteGoal = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta meta?')) {
      deleteGoal(id);
      loadGoals();
    }
  };

  const activeGoals = goals.filter(g => !g.completed);
  const completedGoals = goals.filter(g => g.completed);

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Suas Metas de Saúde
              </h2>
              <p className="text-gray-600">
                {activeGoals.length} metas ativas • {completedGoals.length} concluídas
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-2xl">
              <Target className="w-8 h-8 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botão Adicionar Meta */}
      {!showAddGoal && (
        <Button
          onClick={() => setShowAddGoal(true)}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-6 text-lg shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Adicionar Nova Meta
        </Button>
      )}

      {/* Formulário Adicionar Meta */}
      {showAddGoal && (
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle>Nova Meta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Título da Meta</Label>
              <Input
                placeholder="Ex: Perder 5kg, Correr 10km..."
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Meta (número)</Label>
                <Input
                  type="number"
                  placeholder="Ex: 5"
                  value={newGoal.target || ''}
                  onChange={(e) => setNewGoal({ ...newGoal, target: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label>Unidade</Label>
                <Input
                  placeholder="Ex: kg, km, dias..."
                  value={newGoal.unit}
                  onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label>Progresso Atual</Label>
              <Input
                type="number"
                placeholder="0"
                value={newGoal.current || ''}
                onChange={(e) => setNewGoal({ ...newGoal, current: parseFloat(e.target.value) })}
              />
            </div>

            <div>
              <Label>Data Limite</Label>
              <Input
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleAddGoal}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Adicionar Meta
              </Button>
              <Button
                onClick={() => setShowAddGoal(false)}
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Metas Ativas */}
      {activeGoals.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Metas Ativas</h3>
          {activeGoals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            const daysRemaining = getDaysRemaining(goal.deadline);
            
            return (
              <Card key={goal.id} className="border-purple-200">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                        {goal.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {daysRemaining > 0 
                          ? `${daysRemaining} dias restantes`
                          : daysRemaining === 0
                          ? 'Último dia!'
                          : 'Prazo expirado'}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleDeleteGoal(goal.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-3xl font-bold text-purple-600">
                          {goal.current}
                        </p>
                        <p className="text-sm text-gray-600">
                          de {goal.target} {goal.unit}
                        </p>
                      </div>
                      <p className="text-2xl font-semibold text-purple-600">
                        {Math.round(progress)}%
                      </p>
                    </div>
                    <Progress value={progress} className="h-3" />
                  </div>

                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Atualizar progresso"
                      className="flex-1"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const input = e.target as HTMLInputElement;
                          handleUpdateProgress(goal.id, parseFloat(input.value));
                          input.value = '';
                        }
                      }}
                    />
                    <Button
                      onClick={(e) => {
                        const input = (e.currentTarget.previousSibling as HTMLInputElement);
                        handleUpdateProgress(goal.id, parseFloat(input.value));
                        input.value = '';
                      }}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <TrendingUp className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Metas Concluídas */}
      {completedGoals.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Metas Concluídas
          </h3>
          {completedGoals.map((goal) => (
            <Card key={goal.id} className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500 p-2 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{goal.title}</h4>
                      <p className="text-sm text-gray-600">
                        {goal.current} {goal.unit} alcançados! 🎉
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDeleteGoal(goal.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Mensagem Vazia */}
      {goals.length === 0 && !showAddGoal && (
        <Card className="border-gray-200">
          <CardContent className="p-12 text-center">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              Você ainda não tem metas definidas
            </p>
            <p className="text-sm text-gray-500">
              Comece adicionando sua primeira meta de saúde!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
