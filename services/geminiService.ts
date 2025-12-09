
import { GoogleGenAI, Type } from "@google/genai";
import { QuizState, AIResponse } from "../types";

const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateGiftIdeas = async (profile: QuizState): Promise<AIResponse> => {
  const model = "gemini-2.5-flash";
  
  const prompt = `
    Atue como um especialista em presentes de Natal de alto nível.
    Analise o seguinte perfil de destinatário e sugira presentes:
    
    Perfil:
    - Quem é: ${profile.recipient}
    - Gênero: ${profile.gender}
    - Intenção do Presente: ${profile.intent}
    - Idade: ${profile.ageGroup}
    - Estilo: ${profile.style}
    - Nível de Dificuldade: ${profile.difficulty}
    - Já tem tudo?: ${profile.hasEverything}
    - Tradicional vs Diferente: ${profile.preference}
    - Orçamento: ${profile.budget}
    - Formato: ${profile.format}
    - Sentimento Desejado: ${profile.vibe}
    - Maior Medo de quem presenteia: ${profile.fear}
    - Nível de Risco: ${profile.riskLevel}
    - Útil vs Emocional: ${profile.utilityVsEmotion}

    Retorne APENAS um JSON válido com a seguinte estrutura, sem markdown:
    {
      "analysis": "Uma frase curta e perspicaz sobre o perfil psicológico desta pessoa.",
      "suggestions": [
        { "name": "Nome do Presente", "description": "Descrição curta", "estimatedPrice": "Preço estimado em R$", "reason": "Por que combina", "category": "Perfect Match" },
        { "name": "Nome do Presente", "description": "Descrição curta", "estimatedPrice": "Preço estimado em R$", "reason": "Por que combina", "category": "Perfect Match" },
        { "name": "Nome do Presente", "description": "Descrição curta", "estimatedPrice": "Preço estimado em R$", "reason": "Por que combina", "category": "Perfect Match" },
        { "name": "Experiência Criativa", "description": "Descrição curta", "estimatedPrice": "Preço estimado em R$", "reason": "Por que combina", "category": "Creative" },
        { "name": "Ideia Econômica/DIY", "description": "Descrição curta", "estimatedPrice": "Baixo custo", "reason": "Por que combina", "category": "DIY" }
      ]
    }
  `;

  try {
    const response = await genAI.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING },
            suggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  estimatedPrice: { type: Type.STRING },
                  reason: { type: Type.STRING },
                  category: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AIResponse;
    }
    throw new Error("No response text");
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback in case of API error to avoid crashing the demo flow
    return {
      analysis: "Não foi possível analisar o perfil detalhadamente neste momento, mas baseamos nas categorias gerais.",
      suggestions: [
        { name: "Kit Personalizado Premium", description: "Um conjunto selecionado com base nos gostos gerais.", estimatedPrice: "R$ 150 - R$ 300", reason: "Opção segura e elegante.", category: "Perfect Match" },
        { name: "Experiência Gastronômica", description: "Jantar ou kit de degustação.", estimatedPrice: "R$ 200+", reason: "Cria memórias duradouras.", category: "Creative" },
        { name: "Álbum de Memórias", description: "Fotolivro customizado.", estimatedPrice: "R$ 80", reason: "Alto valor emocional.", category: "DIY" }
      ]
    };
  }
};
