# Chatbot API Spec

### Get Chatbot History

Endpoint : GET /api/chatbot

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Response Body (Success) :

```
{
	"data": [
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
	]
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
	"message": "Saya tidak dapat mendiagnosis hasilnya"
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
