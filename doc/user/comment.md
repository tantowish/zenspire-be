# Comment API Spec

### Get List Comment

Endpoint : GET /api/disscusions/:id/comments

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Response Body (Success) :

```
{
	"data": [
		{
			"id": 2,
			"user_id": 1,
			"discussion_id": 2,
			"body": "test",
			"created_at": "2024-04-11 12:00:12",
			"updated_at": "2024-04-11 12:00:12",
			"user": {
				first_name: "Tantowi",
				last_name: null,
				isAnonymous: true
			}
		},
		{
			"id": 1,
			"user_id": 2,
			"discussion_id": 3,
			"body": "test",
			"created_at": "2024-04-11 12:00:12",
			"updated_at": "2024-04-11 12:00:12",
			"user": {
				first_name: "Tantowi",
				last_name: null,
				isAnonymous: true
			}
		},
	]
}
```

Response Body (Failed) :

```
{
	"errors": "Discussion not found"
}
```

### Get Comment

Endpoint : GET /api/disscusions/:id/comments/:id

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Response Body (Success) :

```
{
	"data": {
		"id": 2,
		"user_id": 1,
		"discussion_id": 2,
		"body": "test",
		"created_at": "2024-04-11 12:00:12",
		"updated_at": "2024-04-11 12:00:12"
	}
}
```

Response Body (Failed) :

```
{
	"errors": "Comment not found"
}
```

### Create Comment

Endpoint : POST /api/disscusions/:id/comments/

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Request Body :

```
{
	"body": "lorem epsum",
}
```

Response Body (Success):

```
{
	"data": {
		"id": 3,
		"user_id": 1,
		"discussion_id": 2,
		"body": "lorem epsum",
		"created_at": "2024-04-11 12:00:12",
		"updated_at": "2024-04-11 12:00:12"
	}
}
```

Response Body (failed) :

```
{
	"errors": "body is required"
}
```

### Update Comment

Endpoint : PUT /api/disscusions/:id/comments/:id

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Request Body :

```
{
	"body": "lorem epsum edit",
}
```

Response Body (Success):

```
{
	"data": {
		"id": 3,
		"user_id": 1,
		"discussion_id": 2,
		"body": "lorem epsum edit",
		"created_at": "2024-04-11 12:00:12",
		"updated_at": "2024-04-11 12:00:12"
	}
}
```

Response Body (failed) :

```
{
	"errors": "Unauthorized"
}
```

### Remove Comment

Endpoint : DELETE /api/disscusions/:id/comments/:id

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Response Body (success) :

```
{
	"message": "Berhasil menghapus comment"
}
```

Response Body (failed) :

```
{
	"errors": "Comment not found"
}
```
