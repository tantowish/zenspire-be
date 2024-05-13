import { Mood } from "@prisma/client";

export const journals = [
    {
        "user_id": 1,
        "mood": "baik" as Mood,
        "title": "Perasaan Hari Ini",
        "question_1": "Saya merasa sangat bahagia hari ini karena mendapat kabar baik dari teman lama yang sudah lama tidak berhubungan. Itu membuat hari saya terasa lebih cerah dan penuh energi.",
        "question_2": "Saat ini saya sedang memikirkan presentasi besar yang harus saya siapkan untuk pertemuan besok. Saya ingin memastikan bahwa semua detailnya telah dipersiapkan dengan baik.",
        "question_3": "Besok, saya berharap dapat menyelesaikan proyek yang sudah tertunda dalam beberapa hari terakhir. Saya ingin memulai hari dengan semangat baru dan menyelesaikan semua pekerjaan dengan efisien."
    },
    {
        "user_id": 1,
        "mood": "sangat_baik" as Mood,
        "title": "Refleksi Pagi",
        "question_1": "Pagi ini saya merasa sedikit lelah karena tidur kurang dari biasanya. Namun, secangkir kopi hangat membantu saya untuk merasa lebih segar dan siap menghadapi hari.",
        "question_2": "Saat ini saya sedang merenungkan rencana perjalanan akhir pekan ini. Saya berharap dapat bersantai dan menikmati waktu berkualitas bersama keluarga.",
        "question_3": "Hari ini, saya ingin fokus untuk menyelesaikan tugas-tugas yang mendesak di tempat kerja. Saya berharap dapat menyelesaikannya dengan efektif agar dapat bersantai di penghujung hari."
    },
    {
        "user_id": 2,
        "mood": "sangat_baik" as Mood,
        "title": "Momen Siang Ini",
        "question_1": "Siang ini saya merasa cukup puas karena berhasil menyelesaikan beberapa tugas penting di tempat kerja. Saya merasa produktif dan termotivasi untuk melanjutkan pekerjaan.",
        "question_2": "Saat ini saya sedang memikirkan menu makan siang. Saya ingin menikmati makanan yang sehat dan lezat untuk mengisi energi.",
        "question_3": "Sore nanti, saya ingin meluangkan waktu untuk berolahraga. Saya percaya bahwa aktivitas fisik dapat membantu saya untuk merasa lebih rileks dan fokus."
    },
    {
        "user_id": 2,
        "mood": "sangat_baik" as Mood,
        "title": "Perasaan Sore Hari",
        "question_1": "Sore ini saya merasa sedikit lelah setelah seharian bekerja. Namun, saya merasa senang karena berhasil menyelesaikan semua tugas yang direncanakan.",
        "question_2": "Saat ini saya sedang memikirkan rencana makan malam bersama keluarga. Saya ingin menikmati waktu berkualitas dan berbagi cerita tentang hari kami.",
        "question_3": "Malam nanti, saya ingin bersantai dan membaca buku. Saya berharap dapat tidur lebih awal agar dapat bangun dengan penuh energi besok pagi."
    },
    {
        "user_id": 3,
        "mood": "baik" as Mood,
        "title": "Malam yang Tenang",
        "question_1": "Malam ini saya merasa cukup rileks dan tenang setelah menikmati waktu bersama keluarga. Saya merasa bersyukur atas semua hal baik dalam hidup saya.",
        "question_2": "Saat ini saya sedang merenungkan pelajaran yang saya dapatkan hari ini. Saya ingin menjadi pribadi yang lebih baik setiap harinya.",
        "question_3": "Besok pagi, saya ingin memulai hari dengan penuh semangat dan optimisme. Saya berharap dapat menjalani hari yang produktif dan menyenangkan."
    },
    {
        "user_id": 3,
        "mood": "sangat_baik" as Mood,
        "title": "Akhir Pekan yang Menyenangkan",
        "question_1": "Hari ini saya merasa sangat gembira karena akhirnya tiba akhir pekan. Saya berencana untuk menghabiskan waktu bersama keluarga dan teman-teman.",
        "question_2": "Saat ini saya sedang memikirkan rencana perjalanan singkat ke luar kota. Saya ingin menikmati pemandangan alam dan suasana yang berbeda.",
        "question_3": "Akhir pekan ini, saya berharap dapat bersantai dan melupakan semua beban pekerjaan. Saya ingin kembali dengan energi yang terisi penuh untuk menghadapi minggu depan."
    }
]