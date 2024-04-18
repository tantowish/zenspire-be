# Chatbot API Spec

### Get Chatbot History

Endpoint : GET /api/chatbot

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Response Body (Success) :

```
{

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

Endpoint : GET /api/chatbot/reset

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
