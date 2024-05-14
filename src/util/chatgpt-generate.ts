import { Mood } from "@prisma/client";
import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.GPT_API_KEY,
});

export async function runChatJournal(mood: Mood, title: string, question_1: string, question_2: string, question_3: string | null) {
    const prompt = `mood: ${mood}\njudul: ${title}\n apa yang kamu rasakan hari ini dan mengapa?\n${question_1}\nTuliskan apapun yang ada di pikiranmu!\n${question_2}\nApa yang kamu harapkan untuk dilakukan besok?\n${question_3}\n\n Sebagai ahli psikologi yang menggunakan tutur bahasa non-formal, gunakan kata kamu untuk menggambarkan penulis, dari pertanyaan dan jawaban jurnal harian diatas, tolong buatkan analisis dengan format berikut:\n\npenjelasan keseluruhan hasil analisis jurnal, buat 1 paragraf saja\nKegiatan yang perlu dilakukan :\n- kegiatan 1\n- kegiatan 2\n- seterusnya jika ada\nHal yang perlu dihindari :\n- hindari 1\n hindari 2\n dan seterusnya jika ada`

    const chatCompletion = await openai.chat.completions.create({
        messages: [{role: 'user', content: prompt}],
        model: 'gpt-4o'
    })

    return chatCompletion.choices[0].message.content!
}