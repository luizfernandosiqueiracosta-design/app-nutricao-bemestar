// Base de dados de alimentos comuns brasileiros

export const foodDatabase = [
  // Carboidratos
  {
    id: '1',
    name: 'Arroz Branco Cozido',
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fat: 0.3,
    portion: '100g'
  },
  {
    id: '2',
    name: 'Arroz Integral Cozido',
    calories: 112,
    protein: 2.6,
    carbs: 24,
    fat: 0.9,
    portion: '100g'
  },
  {
    id: '3',
    name: 'Macarrão Cozido',
    calories: 131,
    protein: 5,
    carbs: 25,
    fat: 1.1,
    portion: '100g'
  },
  {
    id: '4',
    name: 'Pão Francês',
    calories: 300,
    protein: 9,
    carbs: 58,
    fat: 3.6,
    portion: '100g'
  },
  {
    id: '5',
    name: 'Pão Integral',
    calories: 253,
    protein: 9,
    carbs: 49,
    fat: 3.4,
    portion: '100g'
  },
  {
    id: '6',
    name: 'Batata Cozida',
    calories: 87,
    protein: 1.9,
    carbs: 20,
    fat: 0.1,
    portion: '100g'
  },
  {
    id: '7',
    name: 'Batata Doce Cozida',
    calories: 86,
    protein: 1.6,
    carbs: 20,
    fat: 0.1,
    portion: '100g'
  },

  // Proteínas
  {
    id: '8',
    name: 'Peito de Frango Grelhado',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    portion: '100g'
  },
  {
    id: '9',
    name: 'Carne Bovina Magra',
    calories: 250,
    protein: 26,
    carbs: 0,
    fat: 15,
    portion: '100g'
  },
  {
    id: '10',
    name: 'Peixe Grelhado',
    calories: 206,
    protein: 22,
    carbs: 0,
    fat: 12,
    portion: '100g'
  },
  {
    id: '11',
    name: 'Ovo Cozido',
    calories: 155,
    protein: 13,
    carbs: 1.1,
    fat: 11,
    portion: '100g'
  },
  {
    id: '12',
    name: 'Feijão Preto Cozido',
    calories: 77,
    protein: 4.5,
    carbs: 14,
    fat: 0.5,
    portion: '100g'
  },
  {
    id: '13',
    name: 'Lentilha Cozida',
    calories: 116,
    protein: 9,
    carbs: 20,
    fat: 0.4,
    portion: '100g'
  },

  // Laticínios
  {
    id: '14',
    name: 'Leite Integral',
    calories: 61,
    protein: 3.2,
    carbs: 4.8,
    fat: 3.3,
    portion: '100ml'
  },
  {
    id: '15',
    name: 'Leite Desnatado',
    calories: 34,
    protein: 3.4,
    carbs: 5,
    fat: 0.1,
    portion: '100ml'
  },
  {
    id: '16',
    name: 'Iogurte Natural',
    calories: 61,
    protein: 3.5,
    carbs: 4.7,
    fat: 3.3,
    portion: '100g'
  },
  {
    id: '17',
    name: 'Queijo Minas',
    calories: 264,
    protein: 17.4,
    carbs: 3.1,
    fat: 20.8,
    portion: '100g'
  },

  // Frutas
  {
    id: '18',
    name: 'Banana',
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fat: 0.3,
    portion: '100g'
  },
  {
    id: '19',
    name: 'Maçã',
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fat: 0.2,
    portion: '100g'
  },
  {
    id: '20',
    name: 'Laranja',
    calories: 47,
    protein: 0.9,
    carbs: 12,
    fat: 0.1,
    portion: '100g'
  },
  {
    id: '21',
    name: 'Morango',
    calories: 32,
    protein: 0.7,
    carbs: 7.7,
    fat: 0.3,
    portion: '100g'
  },
  {
    id: '22',
    name: 'Abacate',
    calories: 160,
    protein: 2,
    carbs: 8.5,
    fat: 14.7,
    portion: '100g'
  },

  // Vegetais
  {
    id: '23',
    name: 'Brócolis Cozido',
    calories: 35,
    protein: 2.4,
    carbs: 7,
    fat: 0.4,
    portion: '100g'
  },
  {
    id: '24',
    name: 'Alface',
    calories: 15,
    protein: 1.4,
    carbs: 2.9,
    fat: 0.2,
    portion: '100g'
  },
  {
    id: '25',
    name: 'Tomate',
    calories: 18,
    protein: 0.9,
    carbs: 3.9,
    fat: 0.2,
    portion: '100g'
  },
  {
    id: '26',
    name: 'Cenoura Crua',
    calories: 41,
    protein: 0.9,
    carbs: 10,
    fat: 0.2,
    portion: '100g'
  },

  // Oleaginosas
  {
    id: '27',
    name: 'Amendoim',
    calories: 567,
    protein: 26,
    carbs: 16,
    fat: 49,
    portion: '100g'
  },
  {
    id: '28',
    name: 'Castanha do Pará',
    calories: 656,
    protein: 14,
    carbs: 12,
    fat: 66,
    portion: '100g'
  },
  {
    id: '29',
    name: 'Amêndoas',
    calories: 579,
    protein: 21,
    carbs: 22,
    fat: 50,
    portion: '100g'
  },

  // Outros
  {
    id: '30',
    name: 'Azeite de Oliva',
    calories: 884,
    protein: 0,
    carbs: 0,
    fat: 100,
    portion: '100ml'
  },
  {
    id: '31',
    name: 'Aveia',
    calories: 389,
    protein: 17,
    carbs: 66,
    fat: 7,
    portion: '100g'
  },
  {
    id: '32',
    name: 'Granola',
    calories: 471,
    protein: 13,
    carbs: 64,
    fat: 18,
    portion: '100g'
  }
];
