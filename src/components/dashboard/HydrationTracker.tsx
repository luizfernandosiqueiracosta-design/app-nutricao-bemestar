'use client';

import { useState, useEffect } from 'react';
import { UserProfile, WaterLog } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Droplet, Plus, Bell, Clock } from 'lucide-react';
import { saveWaterLog, getTodayWaterLogs } from '@/lib/storage';

interface HydrationTrackerProps {
  profile: UserProfile;
}

export default function HydrationTracker({ profile }: HydrationTrackerProps) {
  const [waterLogs, setWaterLogs] = useState<WaterLog[]>([]);
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderInterval, setReminderInterval] = useState(60); // minutos

  useEffect(() => {
    loadWaterLogs();
    
    // Carregar configuração de lembretes
    const savedReminder = localStorage.getItem('waterReminder');
    if (savedReminder) {
      const config = JSON.parse(savedReminder);
      setReminderEnabled(config.enabled);
      setReminderInterval(config.interval);
    }
  }, []);

  useEffect(() => {
    // Configurar lembretes
    if (reminderEnabled) {
      const interval = setInterval(() => {
        showWaterReminder();
      }, reminderInterval * 60 * 1000);

      // Salvar configuração
      localStorage.setItem('waterReminder', JSON.stringify({
        enabled: true,
        interval: reminderInterval
      }));

      return () => clearInterval(interval);
    } else {
      localStorage.setItem('waterReminder', JSON.stringify({
        enabled: false,
        interval: reminderInterval
      }));
    }
  }, [reminderEnabled, reminderInterval]);

  const loadWaterLogs = () => {
    setWaterLogs(getTodayWaterLogs());
  };

  const totalWater = waterLogs.reduce((sum, log) => sum + log.amount, 0);
  const progress = (totalWater / profile.dailyWater) * 100;
  const remaining = Math.max(0, profile.dailyWater - totalWater);

  const showWaterReminder = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('💧 Hora de Beber Água!', {
        body: `Você já bebeu ${(totalWater / 1000).toFixed(1)}L hoje. Continue se hidratando!`,
        icon: '/icon.svg'
      });
    } else {
      // Fallback para alerta visual
      alert('💧 Hora de Beber Água!\n\nLembre-se de se manter hidratado!');
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  const handleAddWater = (amount: number) => {
    const log: WaterLog = {
      id: Date.now().toString(),
      amount,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toISOString().split('T')[0]
    };

    saveWaterLog(log);
    loadWaterLogs();
  };

  const toggleReminder = () => {
    if (!reminderEnabled) {
      requestNotificationPermission();
    }
    setReminderEnabled(!reminderEnabled);
  };

  return (
    <div className="space-y-6">
      {/* Resumo de Hidratação */}
      <Card className="border-blue-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <Droplet className="w-6 h-6" />
            Hidratação de Hoje
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-5xl font-bold text-gray-900">
                {(totalWater / 1000).toFixed(1)}L
              </p>
              <p className="text-gray-600">
                de {(profile.dailyWater / 1000).toFixed(1)}L
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-semibold text-blue-600">
                {Math.round(progress)}%
              </p>
            </div>
          </div>
          <Progress value={progress} className="h-4" />
          <p className="text-gray-600">
            {remaining > 0 
              ? `Faltam ${(remaining / 1000).toFixed(1)}L para atingir sua meta`
              : '🎉 Meta de hidratação alcançada!'}
          </p>
        </CardContent>
      </Card>

      {/* Botões Rápidos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          onClick={() => handleAddWater(250)}
          className="h-24 flex flex-col gap-2 bg-gradient-to-br from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white"
        >
          <Droplet className="w-6 h-6" />
          <span className="text-lg font-semibold">250ml</span>
          <span className="text-xs">Copo</span>
        </Button>
        <Button
          onClick={() => handleAddWater(500)}
          className="h-24 flex flex-col gap-2 bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white"
        >
          <Droplet className="w-6 h-6" />
          <span className="text-lg font-semibold">500ml</span>
          <span className="text-xs">Garrafa</span>
        </Button>
        <Button
          onClick={() => handleAddWater(750)}
          className="h-24 flex flex-col gap-2 bg-gradient-to-br from-blue-600 to-cyan-700 hover:from-blue-700 hover:to-cyan-800 text-white"
        >
          <Droplet className="w-6 h-6" />
          <span className="text-lg font-semibold">750ml</span>
          <span className="text-xs">Garrafa G</span>
        </Button>
        <Button
          onClick={() => handleAddWater(1000)}
          className="h-24 flex flex-col gap-2 bg-gradient-to-br from-blue-700 to-cyan-800 hover:from-blue-800 hover:to-cyan-900 text-white"
        >
          <Droplet className="w-6 h-6" />
          <span className="text-lg font-semibold">1L</span>
          <span className="text-xs">Litro</span>
        </Button>
      </div>

      {/* Configuração de Lembretes */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-600">
            <Bell className="w-5 h-5" />
            Lembretes de Hidratação
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Ativar Lembretes</p>
              <p className="text-sm text-gray-600">
                Receba notificações para beber água
              </p>
            </div>
            <Button
              onClick={toggleReminder}
              variant={reminderEnabled ? 'default' : 'outline'}
              className={reminderEnabled ? 'bg-green-600 hover:bg-green-700' : ''}
            >
              {reminderEnabled ? 'Ativado' : 'Desativado'}
            </Button>
          </div>

          {reminderEnabled && (
            <div className="space-y-2 p-4 bg-purple-50 rounded-lg">
              <p className="text-sm font-semibold text-gray-900">
                Intervalo entre lembretes:
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[30, 60, 120].map((interval) => (
                  <Button
                    key={interval}
                    onClick={() => setReminderInterval(interval)}
                    variant={reminderInterval === interval ? 'default' : 'outline'}
                    size="sm"
                    className={reminderInterval === interval ? 'bg-purple-600' : ''}
                  >
                    {interval} min
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Histórico de Hoje */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Histórico de Hoje
          </CardTitle>
        </CardHeader>
        <CardContent>
          {waterLogs.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Nenhum registro de hidratação hoje
            </p>
          ) : (
            <div className="space-y-3">
              {waterLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-4 bg-blue-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500 p-2 rounded-lg">
                      <Droplet className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{log.amount}ml</p>
                      <p className="text-sm text-gray-600">{log.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-blue-600">
                      +{(log.amount / 1000).toFixed(2)}L
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dicas de Hidratação */}
      <Card className="border-cyan-200 bg-gradient-to-r from-cyan-50 to-blue-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-3">💡 Dicas de Hidratação</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Beba água ao acordar para ativar o metabolismo</li>
            <li>• Mantenha uma garrafa de água sempre por perto</li>
            <li>• Beba água antes, durante e após exercícios</li>
            <li>• Aumente a ingestão em dias quentes</li>
            <li>• Água com limão ajuda na digestão</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
