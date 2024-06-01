import { Mood } from "@prisma/client";

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.5-flash-latest";
const API_KEY = process.env.GEMINI_API_KEY;

export async function runChatJournal(mood: Mood, title: string, question_1: string, question_2: string, question_3: string, question_4: string
) {
    const prompt = `mood: ${mood}\njudul: ${title}\n Apa pikiran negatif yang kamu miliki dan bagaimana kamu menyangkalnya?\n${question_1}\nApa yang kamu rasakan hari ini dan mengapa?\n${question_2}\nTuliskan apapun yang ada di pikiranmu!\n${question_3}\nApa yang kamu harapkan untuk dilakukan besok?${question_4}\n\n Sebagai ahli psikologi dengan metode CBT(Cognitive Behavioral Therapy) yang menggunakan tutur bahasa non-formal, gunakan kata kamu untuk menggambarkan penulis, dari pertanyaan dan jawaban jurnal harian CBT (Cognitive Behavioral Therapy) diatas, tolong buatkan analisis dengan format berikut:\n\npenjelasan keseluruhan hasil analisis jurnal, buat 1 paragraf saja\nKegiatan yang perlu dilakukan :\n- kegiatan 1\n- kegiatan 2\n- seterusnya jika ada\nHal yang perlu dihindari :\n- hindari 1\n hindari 2\n dan seterusnya jika ada`
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 1,
      topK: 0,
      topP: 0.95,
      maxOutputTokens: 8192,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: []
    });
  
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    
    return response.text()
  }