# Chatbot API Spec

### Get Chatbot History

Endpoint : GET /api/chatbot

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Response Body (Success) :

```
{
	"data": {
		"id": 1,
		"user_id": 2,
		"history chat": [
			{
	     	 		"role": "user",
      				"parts": ["Halo"],
			},
			{
	      			"role": "model",
      				"parts": ["Halo apakah kamu memiliki keluhan atau hal yang ingin diceritakan ?"],
			},
			{
	      			"role": "user",
      				"parts": ["Halo"],
			},
			{
	      			"role": "model",
      				"parts": ["Jika kamu ingin berbagi, saya di sini untuk mendengarkan. Atau, jika kamu ingin mencoba sesuatuyang menyenangkan untuk mengangkat semangatmu, aku bisa membantu menemukan beberapa video lucu di YouTube, atau kita bisa bermain permainan bersama. Apa pun yang membuatmu merasa lebih baik, aku di sini untukmu."],
			},
		],
		"ai_analysis" = Null,
		"created_at": "2024-04-25 15:21:12",
		"updated_at": "2024-04-25 15:21:12"
	}
}
```

Response Body (Failed) :

```
{
	"errors": "Unauthorized"
}
```

### Send Chat

Endpoint : GET /api/chatbot

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Request Body :

```
{
	"message": "Apakah saya terjangkit kesehatan mental"
}
```

Response Body (Success) :

```
{
	"data": {
		"message": "Saya tidak dapat mendiagnosis hasilnya"
	}
}
```

Response Body (Failed) :

```
{
	"errors": "Too many requests"
}
```

### Resume Chat

Endpoint : GET /api/chatbot/resume

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Response Body (Success) :

```
{
	"data": {
		"id": 1,
		"user_id": 2,
		"history chat": [],
		"ai_analysis" = "Percakapan ini menunjukkan bahwa User mengalami kurang percaya diri saat presentasi, yang dipicu oleh pikiran negatif "presentasi saya jelek" yang muncul saat merasa dilihat dan di-judge.  Pikiran ini kemungkinan berasal dari pengalaman masa kecil User yang sering dimarahi saat melakukan sesuatu. Terapi CBT dilakukan dengan membantu User mengenali dan mengganti pikiran negatif dengan pikiran positif, seperti "Mungkin presentasiku tidak sempurna, tapi aku sudah berusaha dan aku bangga dengan usahaku".

**Kegiatan yang perlu dilakukan:**

- **Menerapkan teknik CBT:**  User perlu terus menerus  mencatat pikiran negatif yang muncul dan menggantinya dengan pikiran positif. User juga bisa menuliskan afirmasi positif di kertas kecil dan membacanya saat merasa gugup.
- **Mencari dukungan:**  User perlu mencari dukungan dari teman atau keluarga untuk memberikan semangat saat merasa tidak percaya diri.
- **Melakukan latihan presentasi:**  Melatih presentasi di depan cermin atau teman dapat membantu meningkatkan kepercayaan diri dan mengurangi rasa gugup.
- **Mencari bantuan profesional:**  Jika ketidakpercayaan diri sangat mengganggu, User bisa mencari bantuan profesional dari psikolog melalui fitur chat psikolog atau mencari di peta aplikasi.

**Hal yang perlu dihindari:**

- **Menerima pikiran negatif:**  User perlu berusaha keras untuk tidak menerima pikiran negatif dan fokus pada pikiran positif.
- **Menghindari situasi presentasi:**  Menghindari situasi presentasi justru akan memperkuat rasa takut dan ketidakpercayaan diri.
- **Membandingkan diri dengan orang lain:**  Membandingkan diri dengan orang lain hanya akan membuat User merasa lebih tidak percaya diri.
"",
		"created_at": "2024-04-25 15:21:12",
		"updated_at": "2024-04-25 15:21:12"
	}
}

```

Response Body (Failed) :

```
{
	"errors": "Too many requests"
}
```

### Reset History

Endpoint : DELETE /api/chatbot

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Response Body (Success) :

```
{
	"message": "reset chatbot history success"
}
```

Response Body (Failed) :

```
{
	"errors": "Unauthorized"
}
```
