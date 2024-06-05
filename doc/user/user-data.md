# User Data API Spec

### Get User Data

Endpoint : GET /api/userdata/

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Response Body (Success) :

```
{
	"data": {
		"id": 1,
		"user_id": 1,
		"gender": "P",
		"birthday": "2003-07-07",
		"preferences": ["Pengalaman", "Edukasi"],
		"created_at": "2024-04-25 15:21:12",
		"updated_at": "2024-04-25 15:21:12"
	}
}
```

Response Body (Failed) :

```
{
	"errors": "Username must not blank, ..."
}
```

### Create User Data

Endpoint : POST /api/userdata/

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Request Body :

```
{
	"gender": P,
	"birthday": "2003-07-07",
	"preferences": ["Pengalaman", "Edukasi"],
}
```

Response Body (success) :

```
{
	"data": {
		"id": 1,
		"user_id": 1,
		"gender": "P",
		"birthday": "2003-07-07",
		"preferences": ["Pengalaman", "Edukasi"],
		"created_at": "2024-04-25 15:21:12",
		"updated_at": "2024-04-25 15:21:12"
	}
}
```

Response Body (failed) :

```
{
	"errors": "gender is required"
}
```

### Update User Data

Endpoint : PUT /api/userdata/

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Request Body :

```
{
	"gender": "P",
	"birthday": "2003-07-07",
	"preferences": ["Pengalaman", "Edukasi"],
}
```

Response Body (success) :

```
{
	"data": {
		"id": 1,
		"user_id": 1,
		"gender": P,
		"birthday": "2003-07-07",
		"preferences": ["Pengalaman", "Edukasi"],
		"created_at": "2024-04-25 15:21:12",
		"updated_at": "2024-04-25 21:21:12"
	}
}
```

Response Body (failed) :

```
{
	"errors": "gender is required"
}
```
