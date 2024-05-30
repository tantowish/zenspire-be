import { Mood } from "@prisma/client";

export const journals = [
    {
        "user_id": 1,
        "mood": "minimal" as Mood,
        "title": "Hari yang Cerah",
        "question_1": "Saya merasa sedikit khawatir tentang presentasi besok, tetapi saya ingat bahwa saya telah mempersiapkannya dengan baik dan saya akan melakukannya dengan baik.",
        "question_2": "Saya merasa gembira hari ini karena saya mendapatkan kabar baik dari keluarga. Ini membuat saya merasa bahagia dan bersyukur.",
        "question_3": "Saya sedang memikirkan rencana liburan minggu depan. Saya tidak sabar untuk bersantai dan menikmati waktu bersama keluarga.",
        "question_4": "Besok saya ingin menyelesaikan tugas-tugas yang tertunda dan berolahraga di sore hari."
      },
      {
        "user_id": 1,
        "mood": "sedang" as Mood,
        "title": "Malam yang Tenang",
        "question_1": "Saya merasa sedikit gelisah tentang deadline proyek, tetapi saya mengingatkan diri sendiri bahwa saya bisa menyelesaikannya dengan baik.",
        "question_2": "Saya merasa tenang dan rileks hari ini. Saya menghabiskan waktu dengan membaca buku dan mendengarkan musik yang menenangkan.",
        "question_3": "Saya sedang memikirkan tentang semua hal baik yang terjadi dalam hidup saya. Saya sangat bersyukur untuk semuanya.",
        "question_4": "Besok saya ingin bangun pagi, sarapan dengan tenang, dan memulai hari dengan semangat."
      },
      {
        "user_id": 2,
        "mood": "berat" as Mood,
        "title": "Hari yang Berat",
        "question_1": "Saya merasa sedikit sedih karena bertengkar dengan teman dekat saya. Namun saya mencoba untuk memaafkan dan melupakan kejadian tersebut.",
        "question_2": "Saya merasa sedih hari ini karena ada beberapa hal yang tidak berjalan sesuai rencana. Ini membuat saya merasa frustrasi dan lelah.",
        "question_3": "Saya sedang memikirkan solusi untuk masalah yang sedang saya hadapi. Saya berharap dapat menemukan jalan keluar yang terbaik.",
        "question_4": "Besok saya ingin melakukan sesuatu yang menyenangkan untuk menghibur diri. Saya ingin melupakan semua kesedihan dan fokus pada hal-hal positif."
      },
      {
        "user_id": 2,
        "mood": "ringan" as Mood,
        "title": "Melihat Sisi Positif",
        "question_1": "Saya merasa sedikit khawatir tentang masa depan, tetapi saya percaya bahwa dengan kerja keras dan optimisme, saya dapat mencapai tujuan saya.",
        "question_2": "Saya merasa optimis hari ini. Saya yakin bahwa segala sesuatu akan baik-baik saja. Saya merasa semangat untuk menghadapi tantangan yang ada.",
        "question_3": "Saya sedang memikirkan semua hal baik yang ingin saya capai dalam hidup. Saya bersemangat untuk bekerja keras dan mewujudkan mimpi-mimpi saya.",
        "question_4": "Besok saya ingin memulai proyek baru yang telah lama saya rencanakan. Saya ingin menggunakan waktu dengan bijak dan mencapai hasil yang memuaskan."
      },
      {
        "user_id": 3,
        "mood": "berat" as Mood,
        "title": "Kecewa dan Marah",
        "question_1": "Saya merasa marah karena ada orang yang tidak bertanggung jawab dan membuat saya kecewa. Namun saya berusaha untuk mengendalikan emosi dan mencari solusi yang baik.",
        "question_2": "Saya merasa marah hari ini karena saya merasa tidak dihargai oleh orang-orang di sekitar saya. Ini membuat saya merasa kesal dan tidak nyaman.",
        "question_3": "Saya sedang memikirkan cara untuk menyelesaikan konflik dengan orang tersebut. Saya ingin mencapai kesepakatan yang adil dan baik untuk semua pihak.",
        "question_4": "Besok saya ingin meluangkan waktu untuk diri sendiri. Saya ingin melakukan hal-hal yang membuat saya senang dan rileks."
      },
      {
        "user_id": 3,
        "mood": "minimal" as Mood,
        "title": "Menikmati Hari Ini",
        "question_1": "Saya merasa sedikit khawatir tentang pekerjaan, tetapi saya fokus pada hal-hal positif dan berusaha untuk tetap tenang.",
        "question_2": "Saya merasa bahagia hari ini karena saya dapat menghabiskan waktu dengan orang-orang yang saya cintai. Ini membuat saya merasa bersyukur dan senang.",
        "question_3": "Saya sedang memikirkan semua hal baik yang terjadi dalam hidup saya. Saya sangat bersyukur untuk semua kebaikan yang telah saya terima.",
        "question_4": "Besok saya ingin melakukan sesuatu yang menyenangkan dan bermanfaat. Saya ingin menggunakan waktu dengan baik dan membuat hari saya lebih bermakna."
      }
]