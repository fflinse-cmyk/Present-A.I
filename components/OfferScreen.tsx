
import React, { useState } from 'react';
import { CheckCircle, LockIcon, StarIcon, ArrowRight, GiftIcon } from './Icons';
import { generateGiftIdeas } from '../services/geminiService';
import { AIResponse, QuizState } from '../types';
import { PurchaseNotification } from './PurchaseNotification';

interface OfferScreenProps {
  quizData: QuizState;
  onSuccess: (data: AIResponse) => void;
}

export const OfferScreen: React.FC<OfferScreenProps> = ({ quizData, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [buttonText, setButtonText] = useState("Desbloquear Meu Resultado");

  const handleUnlock = async () => {
    setIsProcessing(true);
    setButtonText("Iniciando Checkout Seguro...");
    
    // Redireciona para o checkout
    setTimeout(() => {
        window.location.href = "https://checkout.dinamicasdivertida.site/VCCL1O8SCBJ0";
    }, 1500);
  };

  return (
    <div className="animate-fade-in pt-4 pb-12 font-sans max-w-lg mx-auto relative">
      
      {/* Sistema de Notificações de Compra */}
      <PurchaseNotification />
      
      {/* 1. Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 leading-tight">
          Seu presente perfeito já está calculado!
        </h1>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
          Com base nas suas respostas, nossa IA preparou <strong className="text-slate-800">3 recomendações 100% personalizadas</strong>, analisando estilo, personalidade, idade, orçamento e padrão emocional da pessoa.
        </p>
        
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center shadow-sm">
            <p className="font-bold text-slate-800 text-sm">Mas antes de revelar… veja o que você está prestes a desbloquear:</p>
        </div>
      </div>

      {/* 2. Análise Completa do Perfil */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="text-xl">📊</span> Análise Completa do Perfil
        </h3>
        <p className="text-sm text-slate-500 mb-4 font-medium">Plotamos tudo:</p>
        
        <ul className="grid grid-cols-1 gap-2 mb-6 text-sm text-slate-700">
            <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-christmas-green flex-shrink-0"/> Estilo predominante</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-christmas-green flex-shrink-0"/> Tendência de personalidade</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-christmas-green flex-shrink-0"/> Tipo ideal de presente</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-christmas-green flex-shrink-0"/> Nível de conexão emocional</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-christmas-green flex-shrink-0"/> Preferência entre útil x simbólico</li>
        </ul>
        
        {/* Radar Chart Visual */}
        <div className="relative w-full flex justify-center py-4 bg-white rounded-xl border border-slate-100 shadow-sm">
            <div className="relative w-64 h-64">
                 <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                    {/* Background Grid */}
                    <polygon points="50,10 90,40 75,90 25,90 10,40" fill="none" stroke="#E2E8F0" strokeWidth="1" />
                    <polygon points="50,25 70,40 62,65 38,65 30,40" fill="none" stroke="#E2E8F0" strokeWidth="1" />
                    
                    {/* Data Shape */}
                    <polygon points="50,15 85,42 65,80 35,85 15,45" fill="rgba(34, 197, 94, 0.2)" stroke="#22C55E" strokeWidth="2.5" />
                    
                    {/* Dots */}
                    <circle cx="50" cy="15" r="2" fill="#22C55E" />
                    <circle cx="85" cy="42" r="2" fill="#22C55E" />
                    <circle cx="65" cy="80" r="2" fill="#22C55E" />
                    <circle cx="35" cy="85" r="2" fill="#22C55E" />
                    <circle cx="15" cy="45" r="2" fill="#22C55E" />
                 </svg>
                 
                 {/* Labels */}
                 <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 text-[10px] font-bold bg-white px-2 py-0.5 rounded shadow text-slate-600">Estilo</div>
                 <div className="absolute top-[35%] right-0 transform translate-x-2 text-[10px] font-bold bg-white px-2 py-0.5 rounded shadow text-slate-600">Emoção</div>
                 <div className="absolute bottom-4 right-4 text-[10px] font-bold bg-white px-2 py-0.5 rounded shadow text-slate-600">Utilidade</div>
                 <div className="absolute bottom-2 left-4 text-[10px] font-bold bg-white px-2 py-0.5 rounded shadow text-slate-600">Inovação</div>
                 <div className="absolute top-[38%] left-0 transform -translate-x-3 text-[10px] font-bold bg-white px-2 py-0.5 rounded shadow text-slate-600">Orçamento</div>
            </div>
        </div>
      </div>

      {/* 3. Prova Social */}
      <div className="mb-10">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 leading-tight">
            💬 Mais de 12.000 pessoas já acertaram no presente com a nossa IA
          </h3>
          
          <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl text-sm relative border border-slate-100 shadow-sm">
                  <div className="flex text-gold-500 mb-2 gap-0.5">
                    <StarIcon className="w-3.5 h-3.5 fill-current"/>
                    <StarIcon className="w-3.5 h-3.5 fill-current"/>
                    <StarIcon className="w-3.5 h-3.5 fill-current"/>
                    <StarIcon className="w-3.5 h-3.5 fill-current"/>
                    <StarIcon className="w-3.5 h-3.5 fill-current"/>
                  </div>
                  <p className="text-slate-700 font-medium">“Finalmente acertei um presente sem ficar horas pesquisando.”</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl text-sm relative border border-slate-100 shadow-sm">
                  <div className="flex text-gold-500 mb-2 gap-0.5">
                    <StarIcon className="w-3.5 h-3.5 fill-current"/>
                    <StarIcon className="w-3.5 h-3.5 fill-current"/>
                    <StarIcon className="w-3.5 h-3.5 fill-current"/>
                    <StarIcon className="w-3.5 h-3.5 fill-current"/>
                    <StarIcon className="w-3.5 h-3.5 fill-current"/>
                  </div>
                  <p className="text-slate-700 font-medium">“Ela amou! Nunca teria pensado nessa ideia sozinho.”</p>
              </div>
               <div className="bg-slate-50 p-4 rounded-2xl text-sm relative border border-slate-100 shadow-sm">
                  <div className="flex text-gold-500 mb-2 gap-0.5">
                    <StarIcon className="w-3.5 h-3.5 fill-current"/>
                    <StarIcon className="w-3.5 h-3.5 fill-current"/>
                    <StarIcon className="w-3.5 h-3.5 fill-current"/>
                    <StarIcon className="w-3.5 h-3.5 fill-current"/>
                    <StarIcon className="w-3.5 h-3.5 fill-current"/>
                  </div>
                  <p className="text-slate-700 font-medium">“Vale cada centavo, a IA realmente entende o perfil da pessoa.”</p>
              </div>
          </div>
          
          <div className="flex items-center justify-center mt-6 gap-3">
              <div className="flex -space-x-3">
                 {[
                   'https://i.ibb.co/PZssmMfk/barbara-732x1024.jpg',
                   'https://i.ibb.co/23pZ7jzb/images-1.jpg',
                   'https://i.ibb.co/4RLTS7cs/images-4.jpg',
                   'https://i.ibb.co/qX3NFrQ/1093989ccd4728d23c3599ae91c83938.jpg'
                 ].map((src, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                       <img src={src} alt="User" className="w-full h-full object-cover" />
                    </div>
                 ))} 
              </div>
              <span className="text-xs text-slate-500 font-bold">+12.000 usuários</span>
          </div>
      </div>

      {/* 4. Bônus Exclusivos */}
      <div className="mb-10 text-left bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            🎁 Bônus Exclusivos Incluídos no Desbloqueio
        </h3>
        <ul className="space-y-3">
             {[
               'Lista de 200 ideias extras divididas por faixa de preço',
               'Mensagens prontas para colocar no cartão',
               'Guia de presentes de última hora',
               'Roteiro para Amigo Secreto',
               'Sugestões digitais e físicas'
             ].map((bonus, i) => (
                 <li key={i} className="flex items-start gap-3 text-sm text-slate-800 font-medium">
                    <span className="text-christmas-green mt-0.5 text-lg">🎄</span>
                    <span>{bonus}</span>
                 </li>
             ))}
        </ul>
      </div>

      {/* 6. Oferta Final */}
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 relative overflow-hidden transform transition hover:scale-[1.01]">
          <div className="absolute top-0 right-0 bg-christmas-red text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl shadow-md z-10">
             OFERTA LIMITADA
          </div>
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-christmas-green to-emerald-400"></div>

          <div className="mt-4 text-center">
            <img src="https://imgur.com/sIfdRRg.png" alt="PresentAI Logo" className="h-10 object-contain mx-auto mb-4" />
            
            <h3 className="text-xl font-bold text-slate-900 mb-1 flex items-center justify-center gap-2">
               🔓 Desbloqueie Agora
            </h3>
            
            <p className="text-sm text-slate-500 mb-3">
               por apenas <span className="text-4xl font-black text-christmas-green ml-1 tracking-tight">R$ 19,99</span>
            </p>

            {/* Tag de Compras Hoje */}
            <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full border border-red-100 mb-6 animate-pulse">
                <span>🔥</span> +1.543 Pessoas Compraram Hoje
            </div>
          </div>

          {/* Card com Borda Verde - Lista de Benefícios */}
          <div className="bg-green-50/50 rounded-xl border-2 border-christmas-green/20 p-4 mb-6">
             <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-800 font-medium">
                   <CheckCircle className="w-5 h-5 text-christmas-green flex-shrink-0" />
                   <span>Análise de Perfil Completa</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-800 font-medium">
                   <CheckCircle className="w-5 h-5 text-christmas-green flex-shrink-0" />
                   <span>3 Sugestões de "Natal Perfeito"</span>
                </li>
                 <li className="flex items-start gap-2 text-sm text-slate-800 font-medium">
                   <CheckCircle className="w-5 h-5 text-christmas-green flex-shrink-0" />
                   <span>Links diretos de compra</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-800 font-medium">
                   <CheckCircle className="w-5 h-5 text-christmas-green flex-shrink-0" />
                   <span>Todos os Bônus Exclusivos</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-800 font-medium">
                   <CheckCircle className="w-5 h-5 text-christmas-green flex-shrink-0" />
                   <span>Acesso Imediato</span>
                </li>
             </ul>
          </div>

          <button 
             onClick={handleUnlock}
             disabled={isProcessing}
             className="w-full bg-christmas-green hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/20 flex items-center justify-center gap-2 animate-pulse-scale text-lg group disabled:opacity-75 disabled:cursor-wait"
           >
             {isProcessing && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
             <span>{buttonText}</span>
             {!isProcessing && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>}
           </button>
           
           <p className="text-xs text-slate-400 mt-4 flex items-center justify-center gap-1.5 font-medium">
             <LockIcon className="w-3.5 h-3.5 text-slate-300" /> 
             Ambiente 100% Seguro e Criptografado
           </p>
      </div>

    </div>
  );
};
