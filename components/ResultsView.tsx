
import React from 'react';
import { AIResponse } from '../types';
import { StarIcon, GiftIcon } from './Icons';

export const ResultsView: React.FC<{ data: AIResponse }> = ({ data }) => {
  return (
    <div className="animate-fade-in w-full max-w-2xl mx-auto pb-10 pt-4 font-sans">
        {/* Logo - Made smaller (h-12) */}
        <div className="flex justify-center mb-8">
            <img src="https://imgur.com/sIfdRRg.png" alt="PresentAI Logo" className="h-12 object-contain" />
        </div>

        <div className="text-center mb-8">
            <div className="w-20 h-20 bg-christmas-red rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-red-500/20">
                <GiftIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Relatório Completo</h2>
            <div className="bg-christmas-lightGreen p-6 rounded-2xl border border-christmas-green/20 text-left mt-8">
                <h4 className="text-christmas-green text-sm font-bold uppercase mb-2 tracking-wide">Análise de Perfil</h4>
                <p className="text-slate-700 italic font-medium leading-relaxed">"{data.analysis}"</p>
            </div>
        </div>

        <div className="space-y-8">
            {data.suggestions.map((gift, idx) => (
                <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50 group hover:border-christmas-green/30 transition-all">
                    <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                            gift.category === 'Perfect Match' ? 'bg-green-100 text-green-700' :
                            gift.category === 'DIY' ? 'bg-purple-100 text-purple-700' :
                            'bg-blue-100 text-blue-700'
                        }`}>
                            {gift.category === 'Perfect Match' ? 'Natal Perfeito' : gift.category}
                        </span>
                        <span className="text-slate-600 text-sm font-bold">{gift.estimatedPrice}</span>
                    </div>
                    <div className="p-6 md:p-8">
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{gift.name}</h3>
                        <p className="text-slate-600 mb-6 leading-relaxed">{gift.description}</p>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <p className="text-sm text-slate-700 flex gap-3">
                                <StarIcon className="w-5 h-5 flex-shrink-0 text-gold-500" />
                                <span><strong>Por que funciona:</strong> {gift.reason}</span>
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-12 text-center">
            <button 
                onClick={() => window.location.reload()} 
                className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-3 px-6 rounded-lg transition-colors text-sm"
            >
                Fazer nova consulta
            </button>
        </div>
    </div>
  );
};
