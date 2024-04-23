# User Auth API Spec

### Login User

Endpoint : POST /api/users/login

Request Body :

```
{
	"username": "tantows001",
	"password": "12354",
	"name": "Tantowi Shah Hanif"
}
```

Response Body (Success) :

```
{
	"data": {
		"id": 2
		"email": "example@gmail.com",
		"firstName": "Tantowi",
		"lastName": "Shah Hanif",
		"exp": 500,
		"isAnonymous": true,
		"googleId": null
	},
	"token": "sadwpdpqodqwd0qdopqwkdopskapdo"
}
```

Response Body (Failed) :

```
{
	"errors": "Username must not blank, ..."
}
```

### Oauth User

Endpoint : POST /api/users/oauth

Request Body :

```}
{
	"idToken": "21sdad2190is"
}
```

Response Body (Success) :

```
{
	"data": {
		"id": 3
		"email": "example@gmail.com",
		"firstName": "Tantowi",
		"lastName": "Shah Hanif",
		"exp": 500,
		"isAnonymous": true,
		"googleId": "121322"
	},
	"token": "sadwpdpqodqwd0qdopqwkdopskapdo"
}
```

Response Body (Failed) :

```
{
	"errors": "idToken is invalid"
}
```

### Get User

Endpoint : GET /api/users/current

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Response Body (Success) :

```
{
	"data": {
		"id": 3
		"email": "example@gmail.com",
		"firstName": "Tantowi",
		"lastName": "Shah Hanif",
		"exp": 500,
		"isAnonymous": true,
		"googleId": null
	},
	"token": "sadwpdpqodqwd0qdopqwkdopskapdo"
}
```

Response Body (Failed) :

```
{
	"errors": "Username must not blank, ..."
}
```
