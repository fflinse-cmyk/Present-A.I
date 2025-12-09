import React from 'react';
import { ArrowLeft } from './Icons';

interface QuizLayoutProps {
  children: React.ReactNode;
  step: number;
  totalSteps: number;
  title?: string;
  onBack?: () => void;
}

export const QuizLayout: React.FC<QuizLayoutProps> = ({ children, step, totalSteps, title, onBack }) => {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-10 p-4 bg-white text-slate-900 relative overflow-hidden font-sans">
      
      <div className="w-full max-w-lg z-10 relative flex flex-col">
        
        {/* Logo Centered - Made smaller (h-12) */}
        <div className="flex justify-center mb-8">
            <img src="https://imgur.com/sIfdRRg.png" alt="PresentAI Logo" className="h-12 object-contain" />
        </div>

        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-4 px-2">
           <div className="flex items-center gap-2">
             {onBack ? (
               <button 
                onClick={onBack}
                className="p-2 -ml-2 rounded-full hover:bg-slate-50 text-slate-500 hover:text-christmas-green transition-colors flex items-center gap-1"
                aria-label="Voltar"
               >
                 <ArrowLeft className="w-5 h-5" />
                 <span className="text-sm font-medium">Voltar</span>
               </button>
             ) : (
               <div className="h-9"></div> /* Spacer */
             )}
           </div>
           
           <div className="text-xs text-slate-400 font-bold tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
             ETAPA {step}/{totalSteps}
           </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-100 rounded-full mb-10 overflow-hidden">
          <div 
            className="h-full bg-christmas-green rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(34,197,94,0.4)]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Content (No Card, Loose Text) */}
        <div className="w-full animate-fade-in relative z-20">
          {children}
        </div>
        
      </div>
    </div>
  );
};