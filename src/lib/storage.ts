import { QuizAnswers, UserProfile, Meal, Goal, WaterLog } from './types';

// Criar perfil do usuário baseado nas respostas do quiz
export function createUserProfile(answers: QuizAnswers): UserProfile {
  const dailyCalories = calculateDailyCalories(answers);
  const dailyWater = calculateDailyWater(answers);

  return {
    ...answers,
    dailyCalories,
    dailyWater,
    createdAt: new Date().toISOString()
  };
}

// Calcular calorias diárias usando fórmula de Harris-Benedict
function calculateDailyCalories(answers: QuizAnswers): number {
  let bmr: number;

  // Calcular Taxa Metabólica Basal (BMR)
  if (answers.gender === 'male') {
    bmr = 88.362 + (13.397 * answers.weight) + (4.799 * answers.height) - (5.677 * answers.age);
  } else {
    bmr = 447.593 + (9.247 * answers.weight) + (3.098 * answers.height) - (4.330 * answers.age);
  }

  // Multiplicador de atividade
  const activityMultipliers = {
    'sedentary': 1.2,
    'light': 1.375,
    'moderate': 1.55,
    'active': 1.725,
    'very-active': 1.9
  };

  let tdee = bmr * activityMultipliers[answers.activityLevel];

  // Ajustar baseado no objetivo
  if (answers.goal === 'lose-weight') {
    tdee -= 500; // Déficit de 500 calorias
  } else if (answers.goal === 'gain-muscle') {
    tdee += 300; // Superávit de 300 calorias
  }

  return Math.round(tdee);
}

// Calcular água diária recomendada
function calculateDailyWater(answers: QuizAnswers): number {
  // Fórmula básica: 35ml por kg de peso corporal
  let waterMl = answers.weight * 35;

  // Ajustar baseado no nível de atividade
  if (answers.activityLevel === 'active' || answers.activityLevel === 'very-active') {
    waterMl += 500; // Adicionar 500ml para pessoas muito ativas
  }

  return Math.round(waterMl);
}

// Salvar perfil do usuário
export function saveUserProfile(profile: UserProfile): void {
  localStorage.setItem('userProfile', JSON.stringify(profile));
  localStorage.setItem('onboardingComplete', 'true');
}

// Obter perfil do usuário
export function getUserProfile(): UserProfile | null {
  const profile = localStorage.getItem('userProfile');
  return profile ? JSON.parse(profile) : null;
}

// Verificar se onboarding foi completado
export function isOnboardingComplete(): boolean {
  return localStorage.getItem('onboardingComplete') === 'true';
}

// ===== MEALS =====

export function saveMeal(meal: Meal): void {
  const meals = getTodayMeals();
  meals.push(meal);
  localStorage.setItem('meals', JSON.stringify(meals));
}

export function getTodayMeals(): Meal[] {
  const today = new Date().toISOString().split('T')[0];
  const allMeals = localStorage.getItem('meals');
  if (!allMeals) return [];
  
  const meals: Meal[] = JSON.parse(allMeals);
  return meals.filter(meal => meal.date === today);
}

export function deleteMeal(id: string): void {
  const allMeals = localStorage.getItem('meals');
  if (!allMeals) return;
  
  const meals: Meal[] = JSON.parse(allMeals);
  const filtered = meals.filter(meal => meal.id !== id);
  localStorage.setItem('meals', JSON.stringify(filtered));
}

export function getTodayCalories(): number {
  const meals = getTodayMeals();
  return meals.reduce((sum, meal) => sum + meal.calories, 0);
}

// ===== WATER LOGS =====

export function saveWaterLog(log: WaterLog): void {
  const logs = getTodayWaterLogs();
  logs.push(log);
  localStorage.setItem('waterLogs', JSON.stringify(logs));
}

export function getTodayWaterLogs(): WaterLog[] {
  const today = new Date().toISOString().split('T')[0];
  const allLogs = localStorage.getItem('waterLogs');
  if (!allLogs) return [];
  
  const logs: WaterLog[] = JSON.parse(allLogs);
  return logs.filter(log => log.date === today);
}

export function getTodayWater(): number {
  const logs = getTodayWaterLogs();
  return logs.reduce((sum, log) => sum + log.amount, 0);
}

// ===== GOALS =====

export function saveGoal(goal: Goal): void {
  const goals = getGoals();
  goals.push(goal);
  localStorage.setItem('goals', JSON.stringify(goals));
}

export function getGoals(): Goal[] {
  const goals = localStorage.getItem('goals');
  return goals ? JSON.parse(goals) : [];
}

export function updateGoal(updatedGoal: Goal): void {
  const goals = getGoals();
  const index = goals.findIndex(g => g.id === updatedGoal.id);
  if (index !== -1) {
    goals[index] = updatedGoal;
    localStorage.setItem('goals', JSON.stringify(goals));
  }
}

export function deleteGoal(id: string): void {
  const goals = getGoals();
  const filtered = goals.filter(g => g.id !== id);
  localStorage.setItem('goals', JSON.stringify(filtered));
}
