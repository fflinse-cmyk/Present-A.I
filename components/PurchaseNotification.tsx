
import React, { useState, useEffect } from 'react';
import { CheckCircle } from './Icons';

const NAMES = [
  "Ana Paula M.", "Ricardo S.", "Fernanda L.", "João Pedro C.", 
  "Beatriz A.", "Carlos E.", "Mariana G.", "Lucas F.", 
  "Patrícia D.", "Gabriel R."
];

const LOCATIONS = [
  "São Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", 
  "Curitiba, PR", "Brasília, DF", "Porto Alegre, RS", 
  "Salvador, BA", "Recife, PE"
];

const ACTIONS = [
  "acabou de desbloquear o relatório",
  "garantiu o presente perfeito",
  "liberou as sugestões agora"
];

export const PurchaseNotification: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({ name: '', location: '', action: '' });

  useEffect(() => {
    // Primeira notificação aparece rápido (3s)
    const initialTimeout = setTimeout(() => {
      triggerNotification();
    }, 3000);

    // Loop de notificações subsequentes
    const interval = setInterval(() => {
      triggerNotification();
    }, Math.random() * 8000 + 12000); // Entre 12s e 20s

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const triggerNotification = () => {
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];
    const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
    const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];

    setData({ name, location, action });
    setVisible(true);

    // Esconde após 4 segundos
    setTimeout(() => {
      setVisible(false);
    }, 4000);
  };

  if (!visible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in pointer-events-none max-w-[90%] md:max-w-sm">
      <div className="bg-white rounded-lg shadow-xl border border-slate-100 p-3 flex items-center gap-3 transform transition-all duration-500 hover:scale-105">
        <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
           <CheckCircle className="w-5 h-5 text-christmas-green" />
        </div>
        <div>
          <p className="text-xs text-slate-500 font-medium">{data.location}</p>
          <p className="text-sm text-slate-800 font-bold leading-tight">
            {data.name} <span className="font-normal text-slate-600">{data.action}</span>
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">Agora mesmo</p>
        </div>
      </div>
    </div>
  );
};
