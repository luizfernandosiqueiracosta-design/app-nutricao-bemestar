'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, CreditCard, Sparkles, Zap, Crown } from 'lucide-react';

export default function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'basic',
      name: 'Básico',
      price: 29.90,
      period: 'mensal',
      icon: Sparkles,
      color: 'green',
      features: [
        'Registro de refeições ilimitado',
        'Monitoramento de hidratação',
        'Dicas diárias de bem-estar',
        'Acompanhamento de metas básicas',
        'Suporte por email'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 69.90,
      period: 'trimestral',
      icon: Zap,
      color: 'purple',
      popular: true,
      features: [
        'Tudo do plano Básico',
        'Planos de refeição personalizados',
        'Receitas saudáveis exclusivas',
        'Análise nutricional detalhada',
        'Lembretes inteligentes',
        'Integração com smartwatches',
        'Suporte prioritário'
      ]
    },
    {
      id: 'elite',
      name: 'Elite',
      price: 199.90,
      period: 'anual',
      icon: Crown,
      color: 'yellow',
      features: [
        'Tudo do plano Premium',
        'Consultoria nutricional online',
        'Plano de treino personalizado',
        'Acompanhamento semanal',
        'Acesso a comunidade exclusiva',
        'Relatórios mensais detalhados',
        'Suporte 24/7',
        'Desconto em produtos parceiros'
      ]
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    // Aqui você integraria com sistema de pagamento
    alert(`Plano ${plans.find(p => p.id === planId)?.name} selecionado! Em breve você será redirecionado para o pagamento.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardContent className="p-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Escolha Seu Plano
            </h2>
            <p className="text-gray-600">
              Invista na sua saúde e bem-estar com o plano ideal para você
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Planos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isSelected = selectedPlan === plan.id;
          
          return (
            <Card
              key={plan.id}
              className={`relative border-2 transition-all ${
                plan.popular
                  ? 'border-purple-500 shadow-2xl scale-105'
                  : isSelected
                  ? 'border-green-500 shadow-xl'
                  : 'border-gray-200 hover:border-gray-300 shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    ⭐ Mais Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-${plan.color}-400 to-${plan.color}-600 mx-auto mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">
                    R$ {plan.price.toFixed(2)}
                  </span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                {plan.period === 'anual' && (
                  <p className="text-sm text-green-600 font-semibold mt-2">
                    Economize 30%
                  </p>
                )}
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full py-6 text-lg font-semibold shadow-lg ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700'
                      : `bg-gradient-to-r from-${plan.color}-500 to-${plan.color}-600 hover:from-${plan.color}-600 hover:to-${plan.color}-700`
                  } text-white`}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Assinar Agora
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Garantia */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            ✅ Garantia de 7 Dias
          </h3>
          <p className="text-gray-700">
            Experimente sem riscos! Se não ficar satisfeito, devolvemos 100% do seu dinheiro nos primeiros 7 dias.
          </p>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Perguntas Frequentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">
              Posso cancelar a qualquer momento?
            </h4>
            <p className="text-sm text-gray-600">
              Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas adicionais.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-1">
              Como funciona a integração com smartwatches?
            </h4>
            <p className="text-sm text-gray-600">
              Nos planos Premium e Elite, você pode sincronizar dados de Apple Watch, Fitbit, Garmin e outros dispositivos compatíveis.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-1">
              Posso mudar de plano depois?
            </h4>
            <p className="text-sm text-gray-600">
              Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-1">
              Quais formas de pagamento são aceitas?
            </h4>
            <p className="text-sm text-gray-600">
              Aceitamos cartão de crédito, débito, PIX e boleto bancário.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
