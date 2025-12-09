import React, { useEffect, useState } from 'react';

export const LoadingAnalysis: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Conectando ao sistema inteligente...");

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 40); // 4 seconds total roughly

    // Message updates
    setTimeout(() => setMessage("Analisando perfil psicológico..."), 1000);
    setTimeout(() => setMessage("Cruzando dados com 42.000+ casos..."), 2500);
    setTimeout(() => setMessage("Finalizando recomendação exclusiva..."), 3500);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
      <div className="relative w-24 h-24 mb-8">
        <svg className="animate-spin w-full h-full text-slate-200" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75 text-christmas-red" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 mb-2">{progress}%</h3>
      <p className="text-slate-600 text-lg mb-6 animate-pulse font-medium">{message}</p>
      
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
        <div 
          className="bg-christmas-green h-full rounded-full transition-all duration-100" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="mt-8 p-4 bg-christmas-lightGreen/50 rounded-lg border border-christmas-green/20 text-sm text-slate-700">
        <p className="italic">"A tecnologia de análise de perfil é impressionante. Nunca acertei tanto num presente."</p>
        <span className="block mt-2 text-christmas-green font-bold">- Avaliação Verificada ⭐⭐⭐⭐⭐</span>
      </div>
    </div>
  );
};