
import React, { useState, useEffect } from 'react';
import { QuizLayout } from './components/QuizLayout';
import { OptionButton } from './components/OptionButton';
import { LoadingAnalysis } from './components/LoadingAnalysis';
import { OfferScreen } from './components/OfferScreen';
import { ResultsView } from './components/ResultsView';
import { QuizState, AIResponse } from './types';
import { ArrowRight, StarIcon, CheckCircle } from './components/Icons';

const INITIAL_STATE: QuizState = {
  recipient: '',
  intent: '',
  gender: '',
  ageGroup: '',
  style: '',
  difficulty: '',
  hasEverything: '',
  preference: '',
  budget: '',
  format: '',
  vibe: '',
  fear: '',
  riskLevel: '',
  utilityVsEmotion: ''
};

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuizState>(INITIAL_STATE);
  const [aiResult, setAiResult] = useState<AIResponse | null>(null);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const update = (field: keyof QuizState, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const next = () => setStep(prev => prev + 1);
  const back = () => setStep(prev => Math.max(1, prev - 1));

  // Helper for auto-advance on selection
  const handleSelection = (field: keyof QuizState, value: string) => {
    update(field, value);
    // Pequeno delay para feedback visual do clique antes de mudar
    setTimeout(() => {
        next();
    }, 250); 
  };

  // Render Step Content
  const renderStep = () => {
    if (aiResult) {
        return <ResultsView data={aiResult} />;
    }

    switch (step) {
      case 1: // LANDING PAGE / APRESENTAÇÃO
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 text-center animate-fade-in font-sans max-w-lg mx-auto">
             <div className="mb-6">
                <img src="https://imgur.com/sIfdRRg.png" alt="PresentAI Logo" className="h-14 object-contain mx-auto" />
             </div>

             <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
               Descubra o <span className="text-christmas-green">Presente de Natal</span> <span className="text-christmas-red underline decoration-christmas-red/30 decoration-4 underline-offset-4">Perfeito</span> em 30 Segundos.
             </h1>
             
             <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-md mx-auto">
               Nossa <strong className="text-slate-800">Inteligência Artificial</strong> analisa o <strong className="text-slate-800">perfil psicológico</strong> e encontra o presente que vai <strong className="text-christmas-red">emocionar</strong> quem você ama.
             </p>

             <div className="relative w-full max-w-xs mx-auto mb-8 group">
                <div className="absolute inset-0 bg-christmas-green/20 rounded-full blur-2xl transform group-hover:scale-110 transition-transform duration-700"></div>
                <img 
                  src="https://i.imgur.com/vpgeCIe.png" 
                  alt="Caixa de Presente" 
                  className="relative z-10 w-64 h-auto object-contain drop-shadow-2xl mx-auto transform group-hover:-translate-y-2 transition-transform duration-500 rounded-3xl border-4 border-white" 
                />
             </div>

             <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl mb-8 shadow-sm max-w-sm mx-auto relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-christmas-green to-emerald-400"></div>
                 <div className="flex justify-center mb-2 text-gold-500 gap-1">
                    <StarIcon className="w-4 h-4 fill-current" />
                    <StarIcon className="w-4 h-4 fill-current" />
                    <StarIcon className="w-4 h-4 fill-current" />
                    <StarIcon className="w-4 h-4 fill-current" />
                    <StarIcon className="w-4 h-4 fill-current" />
                 </div>
                 <p className="text-sm text-slate-700 leading-snug">
                    <span className="font-black text-slate-900 bg-green-100 px-1 rounded text-christmas-green">+12.000 pessoas</span> já encontraram o presente perfeito usando nossa IA — e <span className="font-bold text-slate-900">97% disseram que acertaram em cheio</span>.
                 </p>
             </div>

             <button
                onClick={next}
                className="w-full bg-christmas-green hover:bg-emerald-600 text-white font-bold py-5 rounded-xl shadow-xl shadow-green-900/20 text-xl flex items-center justify-center gap-2 animate-pulse-scale"
              >
                Iniciar Teste Gratuito <ArrowRight className="w-6 h-6" />
              </button>
              
              <p className="mt-4 text-xs text-slate-400 font-medium tracking-wide flex items-center justify-center gap-1">
                🔒 100% Gratuito e Seguro
              </p>
          </div>
        );

      case 2: // ETAPA 1 (Question 1) — O Começo da Busca
        return (
          <div className="text-center py-2 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 leading-tight">
              Para quem você quer achar um presente <span className="text-christmas-red underline decoration-christmas-red/30">realmente inesquecível</span>?
            </h2>

            <div className="space-y-4 text-left">
                {['💑 Amor da minha vida (Namorado/a, Esposo/a)', '👨‍👩‍👧‍👦 Familiar Próximo (Pai, Mãe, Irmãos)', '👯 Melhor Amigo(a)', '💼 Chefe ou Colega de Trabalho', '🧸 Criança / Filho(a)'].map(opt => (
                    <OptionButton 
                      key={opt} 
                      label={opt} 
                      selected={data.recipient === opt}
                      onClick={() => handleSelection('recipient', opt)} 
                    />
                ))}
            </div>
          </div>
        );

      case 3: // ETAPA 2 — Intensificação da Dor
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Escolher presente é difícil… mas <span className="text-christmas-red">errar é pior</span>.</h2>
              <p className="text-slate-600">O presente é para alguém que você quer...</p>
            </div>
            <div className="space-y-4">
                <OptionButton 
                  label="🤩 Impressionar (Algo UAU)" 
                  selected={data.intent === 'Impressionar'}
                  onClick={() => handleSelection('intent', 'Impressionar')} 
                />
                <OptionButton 
                  label="😲 Surpreender (Algo Inesperado)" 
                  selected={data.intent === 'Surpreender'}
                  onClick={() => handleSelection('intent', 'Surpreender')} 
                />
                <OptionButton 
                  label="🥹 Emocionar (Tocar o coração)" 
                  selected={data.intent === 'Emocionar'}
                  onClick={() => handleSelection('intent', 'Emocionar')} 
                />
            </div>
          </div>
        );

      case 4: // ETAPA 3 — Conexão Emocional
        return (
          <div className="space-y-8">
            <div>
               <h2 className="text-2xl font-bold text-slate-900 mb-2">A relação determina <span className="text-christmas-green">70% do tipo de presente</span> perfeito.</h2>
               <p className="text-slate-600">Qual é a relação entre você e essa pessoa? (Identificação)</p>
            </div>
            <div className="space-y-4">
                <OptionButton 
                  label="👨 É para um Homem" 
                  selected={data.gender === 'Homem'}
                  onClick={() => handleSelection('gender', 'Homem')} 
                />
                <OptionButton 
                  label="👩 É para uma Mulher" 
                  selected={data.gender === 'Mulher'}
                  onClick={() => handleSelection('gender', 'Mulher')} 
                />
                <OptionButton 
                  label="🌈 Outro / Prefiro não dizer" 
                  selected={data.gender === 'Neutro'}
                  onClick={() => handleSelection('gender', 'Neutro')} 
                />
            </div>
          </div>
        );

      case 5: // ETAPA 4 — A Primeira Filtragem Forte
        return (
           <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Presente errado para a idade = <span className="text-christmas-red">frustração certa</span>.</h2>
                <p className="text-slate-600">Vamos evitar isso. Qual a idade aproximada?</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {['👶 0–10 anos', '👱‍♂️ 11–17 anos', '🎓 18–25 anos', '💼 26–35 anos', '🏠 36–50 anos', '👓 51–65 anos', '👵 65+ anos'].map(opt => (
                    <OptionButton 
                      key={opt} 
                      label={opt} 
                      selected={data.ageGroup === opt}
                      onClick={() => handleSelection('ageGroup', opt)} 
                    />
                ))}
            </div>
          </div>
        );

      case 6: // ETAPA 5 — Primeira Personalização Real
        return (
          <div className="space-y-8">
             <div>
               <h2 className="text-2xl font-bold text-slate-900 mb-2">Agora estamos chegando perto.</h2>
               <p className="text-slate-600 mb-4">O <span className="text-christmas-green font-bold">estilo da pessoa</span> é um dos fatores mais importantes.</p>
               <p className="text-sm font-medium text-slate-900">Qual destes estilos mais combina com ela?</p>
             </div>
             <div className="grid grid-cols-2 gap-4">
                {['👔 Elegante / Clássico', '🏄 Despojado / Casual', '🎨 Criativo / Artístico', '🤓 Geek / Tech', '⚽ Esportivo / Fitness', '🎸 Rocker / Alternativo', '🌿 Zen / Natural', '💅 Vaidoso / Glamour'].map(opt => (
                     <OptionButton 
                      key={opt} 
                      label={opt} 
                      selected={data.style === opt}
                      onClick={() => handleSelection('style', opt)} 
                    />
                ))}
             </div>
          </div>
        );

      case 7: // ETAPA 6 — Gatilho de Escassez Emocional
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Algumas pessoas são <span className="text-christmas-red">difíceis de presentear</span>...</h2>
              <p className="text-slate-600">Se for o seu caso, relaxa: você está no lugar certo.</p>
            </div>
            <div className="space-y-4">
                <OptionButton 
                  label="😤 Sim, muito difícil agradar" 
                  selected={data.difficulty === 'Difícil'}
                  onClick={() => handleSelection('difficulty', 'Difícil')} 
                />
                <OptionButton 
                  label="🤔 Às vezes, depende do momento" 
                  selected={data.difficulty === 'Médio'}
                  onClick={() => handleSelection('difficulty', 'Médio')} 
                />
                <OptionButton 
                  label="😊 Não, ela gosta de tudo" 
                  selected={data.difficulty === 'Fácil'}
                  onClick={() => handleSelection('difficulty', 'Fácil')} 
                />
            </div>
          </div>
        );
      
      case 8: // ETAPA 7 — A Pergunta que Filtra de Verdade
        return (
            <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Preciso saber isso para evitar <span className="text-christmas-red">sugestões fracas</span>.</h2>
                <p className="text-slate-600">Ela já tem quase tudo?</p>
            </div>
            <div className="space-y-4">
               {['😱 Sim, parece que tem tudo', '🛍️ Não, sempre precisa de algo', '🤷 Não sei dizer ao certo'].map(opt => (
                    <OptionButton 
                      key={opt} 
                      label={opt} 
                      selected={data.hasEverything === opt}
                      onClick={() => handleSelection('hasEverything', opt)} 
                    />
               ))}
            </div>
         </div>
        );

      case 9: // ETAPA 8 — Intensificação de Desejo
        return (
            <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Se você quer <span className="text-christmas-green">causar impacto</span>, preciso entender isso agora.</h2>
                <p className="text-slate-600">Você quer um presente mais tradicional ou mais diferente?</p>
            </div>
            <div className="space-y-4">
               {['🎩 Tradicional e Seguro', '🦄 Diferente e Inesperado', '⚖️ Um equilíbrio dos dois'].map(opt => (
                    <OptionButton 
                      key={opt} 
                      label={opt} 
                      selected={data.preference === opt}
                      onClick={() => handleSelection('preference', opt)} 
                    />
               ))}
            </div>
         </div>
        );

      case 10: // ETAPA 9 — Orçamento Inteligente
        return (
            <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Ótimos presentes não dependem de preço.</h2>
                <p className="text-slate-600">Mas preciso do seu limite para te entregar o perfeito.</p>
            </div>
            <div className="space-y-4">
               {['💰 Até R$ 50,00', '💳 De R$ 50 a R$ 150', '💎 De R$ 150 a R$ 300', '🚀 De R$ 300 a R$ 600', '👑 Acima de R$ 600'].map(opt => (
                    <OptionButton 
                      key={opt} 
                      label={opt} 
                      selected={data.budget === opt}
                      onClick={() => handleSelection('budget', opt)} 
                    />
               ))}
            </div>
         </div>
        );

      case 11: // ETAPA 10 — Micro-Compromisso Final
        return (
            <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2"><span className="text-christmas-green">97% das pessoas</span> que respondem até aqui recebem sugestões super certeiras.</h2>
                <p className="text-slate-600">Você prefere ideias de presente físico, digital ou tanto faz?</p>
            </div>
            <div className="space-y-4">
                <OptionButton label="📦 Apenas Físicos" selected={data.format === 'Físico'} onClick={() => handleSelection('format', 'Físico')} />
                <OptionButton label="🎫 Experiências / Digitais" selected={data.format === 'Digital'} onClick={() => handleSelection('format', 'Digital')} />
                <OptionButton label="🔄 Tanto faz (O melhor presente vence)" selected={data.format === 'Qualquer um'} onClick={() => handleSelection('format', 'Qualquer um')} />
            </div>
          </div>
        );

      case 12: // ETAPA 11 — Contexto Natalino
        return (
            <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">É Natal. Isso muda tudo: o presente precisa ter <span className="text-christmas-red">sentimento</span>.</h2>
                <p className="text-slate-600">O presente deve transmitir qual sensação principal?</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
                <OptionButton label="❤️ Amor e Paixão" selected={data.vibe === 'Amor'} onClick={() => handleSelection('vibe', 'Amor')} />
                <OptionButton label="🙏 Gratidão e Reconhecimento" selected={data.vibe === 'Gratidão'} onClick={() => handleSelection('vibe', 'Gratidão')} />
                <OptionButton label="😲 Surpresa e Diversão" selected={data.vibe === 'Diversão'} onClick={() => handleSelection('vibe', 'Diversão')} />
                <OptionButton label="🌟 Admiração e Respeito" selected={data.vibe === 'Admiração'} onClick={() => handleSelection('vibe', 'Admiração')} />
            </div>
          </div>
        );

      case 13: // ETAPA 12 — Prova Social Fortíssima
        return (
            <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Clientes dizem que "parece até que o PresentAI conhece a pessoa".</h2>
                <p className="text-slate-600 font-bold">O que você mais teme ao escolher esse presente?</p>
            </div>
            <div className="space-y-4">
                <OptionButton label="😓 Comprar algo que ela não use" selected={data.fear === 'Inutilidade'} onClick={() => handleSelection('fear', 'Inutilidade')} />
                <OptionButton label="💸 Parecer barato ou simples demais" selected={data.fear === 'Parecer barato'} onClick={() => handleSelection('fear', 'Parecer barato')} />
                <OptionButton label="🙈 Errar o estilo completamente" selected={data.fear === 'Errar estilo'} onClick={() => handleSelection('fear', 'Errar estilo')} />
                <OptionButton label="🎁 Dar algo repetido" selected={data.fear === 'Repetido'} onClick={() => handleSelection('fear', 'Repetido')} />
            </div>
          </div>
        );

      case 14: // ETAPA 13 — Pré-Venda Oculta
        return (
            <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Perfeito.</h2>
                <p className="text-slate-600">Com suas respostas, eu já posso calcular o nível de compatibilidade. Você quer recomendações seguras ou surpreendentes?</p>
            </div>
            <div className="space-y-4">
                <OptionButton label="🛡️ 100% Seguras (Sem erro)" selected={data.riskLevel === 'Seguro'} onClick={() => handleSelection('riskLevel', 'Seguro')} />
                <OptionButton label="✨ Surpreendentes (Arriscar para ganhar)" selected={data.riskLevel === 'Arriscado'} onClick={() => handleSelection('riskLevel', 'Arriscado')} />
                <OptionButton label="⚖️ Mix Equilibrado" selected={data.riskLevel === 'Mix'} onClick={() => handleSelection('riskLevel', 'Mix')} />
            </div>
          </div>
        );
      
      case 15: // ETAPA 14 — Gatilho de Antecipação
        return (
            <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">As suas sugestões estão quase prontas...</h2>
                <p className="text-slate-600">Mas antes, preciso ajustar o último detalhe. Essa pessoa prefere receber presentes úteis ou emocionais?</p>
            </div>
            <div className="space-y-4">
                <OptionButton label="🛠️ Úteis e Práticos" selected={data.utilityVsEmotion === 'Útil'} onClick={() => handleSelection('utilityVsEmotion', 'Útil')} />
                <OptionButton label="💖 Emocionais e Simbólicos" selected={data.utilityVsEmotion === 'Emocional'} onClick={() => handleSelection('utilityVsEmotion', 'Emocional')} />
                <OptionButton label="🔄 Um pouco dos dois" selected={data.utilityVsEmotion === 'Híbrido'} onClick={() => handleSelection('utilityVsEmotion', 'Híbrido')} />
            </div>
          </div>
        );

      case 16: // NOVO PASSO DE TRANSIÇÃO (PRE-LOADER)
        return (
          <div className="space-y-6 text-center py-4">
             <div className="w-16 h-16 bg-christmas-green/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle className="w-8 h-8 text-christmas-green" />
             </div>
             
             <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
               ✨ Pronto! Agora sim, vou montar suas sugestões perfeitas...
             </h2>

             <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-left space-y-4 shadow-sm">
                <p className="text-slate-700 leading-relaxed">
                  Com todas as suas respostas, consigo criar uma análise completa — e é exatamente aqui que muita gente erra: entregar presentes aleatórios, sem considerar personalidade, orçamento, conexão emocional e estilo.
                </p>
                <p className="text-slate-700 font-medium leading-relaxed">
                  Mas você fez tudo do jeito certo.
                </p>
                <p className="text-slate-900 font-bold leading-relaxed border-l-4 border-christmas-green pl-4">
                  Agora vou cruzar todos os dados que você me enviou e gerar 3 sugestões perfeitas.
                </p>
             </div>

             <button
                onClick={next}
                className="w-full bg-christmas-green hover:bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-xl shadow-green-900/20 text-lg flex items-center justify-center gap-2 mt-4 animate-pulse-scale"
              >
                Gerar Sugestões <span className="text-xl">🔮</span>
              </button>
          </div>
        );

      case 17: // Processing
        return <LoadingAnalysis onComplete={() => setStep(18)} />;

      case 18: // ETAPA 15 — O TRAVAMENTO PARA OFERTA (Offer Screen)
        return <OfferScreen quizData={data} onSuccess={setAiResult} />;

      default:
        return null;
    }
  };

  // If showing result, use a simpler full-width layout but with white background
  if (aiResult) {
      return (
        <div className="min-h-screen bg-white p-4 font-sans">
            {renderStep()}
        </div>
      );
  }

  // Landing Page (Step 1) uses a different layout (No Progress Bar)
  if (step === 1) {
    return renderStep();
  }

  // Quiz Steps (2 to 18) use QuizLayout
  // We subtract 1 from step to make Question 1 appear as "Step 1" in the UI logic if desired,
  // We cap visual progress bar at step 15 (last question) so user feels progress is done at step 16/17
  return (
    <QuizLayout 
        step={Math.min(step - 1, 14)} 
        totalSteps={14} 
        onBack={step > 1 && step < 18 ? back : undefined}
    >
      {renderStep()}
    </QuizLayout>
  );
};

export default App;
