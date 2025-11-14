'use client';

import { useState, useEffect } from 'react';
import { UserProfile, Meal } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Flame, Plus, Trash2, Coffee, Sun, Moon, Apple } from 'lucide-react';
import { saveMeal, getTodayMeals, deleteMeal } from '@/lib/storage';
import { foodDatabase } from '@/lib/food-database';

interface CalorieTrackerProps {
  profile: UserProfile;
}

export default function CalorieTracker({ profile }: CalorieTrackerProps) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [portion, setPortion] = useState(1);

  useEffect(() => {
    loadMeals();
  }, []);

  const loadMeals = () => {
    setMeals(getTodayMeals());
  };

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0);
  const progress = (totalCalories / profile.dailyCalories) * 100;

  const filteredFoods = foodDatabase.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMeal = () => {
    if (!selectedFood) return;

    const meal: Meal = {
      id: Date.now().toString(),
      name: selectedFood.name,
      calories: Math.round(selectedFood.calories * portion),
      protein: Math.round(selectedFood.protein * portion),
      carbs: Math.round(selectedFood.carbs * portion),
      fat: Math.round(selectedFood.fat * portion),
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toISOString().split('T')[0]
    };

    saveMeal(meal);
    loadMeals();
    setShowAddMeal(false);
    setSearchTerm('');
    setSelectedFood(null);
    setPortion(1);
  };

  const handleDeleteMeal = (id: string) => {
    deleteMeal(id);
    loadMeals();
  };

  const getMealIcon = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour < 12) return <Coffee className="w-4 h-4" />;
    if (hour < 17) return <Sun className="w-4 h-4" />;
    return <Moon className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Resumo de Calorias */}
      <Card className="border-orange-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-600">
            <Flame className="w-6 h-6" />
            Calorias de Hoje
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-5xl font-bold text-gray-900">{totalCalories}</p>
              <p className="text-gray-600">de {profile.dailyCalories} cal</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-semibold text-orange-600">
                {Math.round(progress)}%
              </p>
            </div>
          </div>
          <Progress value={progress} className="h-4" />
          
          {/* Macronutrientes */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{totalProtein}g</p>
              <p className="text-sm text-gray-600">Proteína</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{totalCarbs}g</p>
              <p className="text-sm text-gray-600">Carboidratos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{totalFat}g</p>
              <p className="text-sm text-gray-600">Gorduras</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botão Adicionar Refeição */}
      {!showAddMeal && (
        <Button
          onClick={() => setShowAddMeal(true)}
          className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-6 text-lg shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Adicionar Refeição
        </Button>
      )}

      {/* Formulário Adicionar Refeição */}
      {showAddMeal && (
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Apple className="w-5 h-5" />
              Adicionar Refeição
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Buscar Alimento</Label>
              <Input
                placeholder="Ex: Arroz, Frango, Banana..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {searchTerm && (
              <div className="max-h-60 overflow-y-auto space-y-2 border rounded-lg p-2">
                {filteredFoods.map((food) => (
                  <button
                    key={food.id}
                    onClick={() => setSelectedFood(food)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedFood?.id === food.id
                        ? 'bg-green-100 border-2 border-green-500'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <p className="font-semibold">{food.name}</p>
                    <p className="text-sm text-gray-600">
                      {food.calories} cal | P: {food.protein}g | C: {food.carbs}g | G: {food.fat}g
                    </p>
                  </button>
                ))}
              </div>
            )}

            {selectedFood && (
              <div className="space-y-4 p-4 bg-green-50 rounded-lg">
                <p className="font-semibold text-green-900">
                  {selectedFood.name} selecionado
                </p>
                <div>
                  <Label>Porções (100g cada)</Label>
                  <Input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={portion}
                    onChange={(e) => setPortion(parseFloat(e.target.value))}
                  />
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Total:</p>
                  <p className="text-lg font-bold">
                    {Math.round(selectedFood.calories * portion)} calorias
                  </p>
                  <p className="text-sm text-gray-600">
                    P: {Math.round(selectedFood.protein * portion)}g | 
                    C: {Math.round(selectedFood.carbs * portion)}g | 
                    G: {Math.round(selectedFood.fat * portion)}g
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={handleAddMeal}
                disabled={!selectedFood}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Adicionar
              </Button>
              <Button
                onClick={() => {
                  setShowAddMeal(false);
                  setSearchTerm('');
                  setSelectedFood(null);
                }}
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Refeições */}
      <Card>
        <CardHeader>
          <CardTitle>Refeições de Hoje</CardTitle>
        </CardHeader>
        <CardContent>
          {meals.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Nenhuma refeição registrada ainda
            </p>
          ) : (
            <div className="space-y-3">
              {meals.map((meal) => (
                <div
                  key={meal.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      {getMealIcon(meal.time)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{meal.name}</p>
                      <p className="text-sm text-gray-600">
                        {meal.time} • {meal.calories} cal
                      </p>
                      <p className="text-xs text-gray-500">
                        P: {meal.protein}g | C: {meal.carbs}g | G: {meal.fat}g
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDeleteMeal(meal.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
