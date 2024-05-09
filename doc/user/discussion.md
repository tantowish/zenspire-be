# Discussion API Spec

### Get List Discussion

Endpoint : GET /api/disscusions

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Response Body (Success) :

```
{
	"data": 
	[
		{
			"id": 1,
			"user_id": 1,
			"title": "baik",
			"body": "lorem epsum",
			"image": "lorem epsum.png",
			"created_at": "2024-04-25 15:21:12",
			"updated_at": "2024-04-25 15:21:12",
			"_count": {
				"comment": 12,
				"discussionLike": 102
			},
			"user": {
				"first_name": "Tantowi",
				"last_name": null,
				"isAnonymous": true
			}
		},
		{
			"id": 2,
			"user_id": 2,
			"title": "kurang baik",
			"body": "lorem epsum",
			"image": "lorem epsum.png",
			"created_at": "2024-04-25 15:21:12",
			"updated_at": "2024-04-25 15:21:12",
			"_count": {
				"comment": 12,
				"discussionLike": 102
			},
			"user": {
				"first_name": "Tantowi",
				"last_name": null,
				"isAnonymous": true,
			}
		},
	]
}
```

Response Body (Failed) :

```
{
	"errors": "User is not found"
}
```

### Get List Discussion By Current User

Endpoint : GET /api/disscusions/current

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Response Body (Success) :

```
{
	"data": 
	[
		{
			"id": 1,
			"user_id": 1,
			"title": "baik",
			"body": "lorem epsum",
			"image": "lorem epsum.png",
			"created_at": "2024-04-25 15:21:12",
			"updated_at": "2024-04-25 15:21:12",
			"_count": {
				"comment": 12,
				"discussionLike": 102
			},
			"user": {
				"first_name": "Tantowi",
				"last_name": null,
				"isAnonymous": true
			}
		},
		{
			"id": 2,
			"user_id": 1,
			"title": "kurang baik",
			"body": "lorem epsum",
			"image": "lorem epsum.png",
			"created_at": "2024-04-25 15:21:12",
			"updated_at": "2024-04-25 15:21:12",
			"_count": {
				"comment": 12,
				"discussionLike": 102
			},
			"user": {
				"first_name": "Tantowi",
				"last_name": null,
				"isAnonymous": true,
			}
		},
	]
}
```

Response Body (Failed) :

```
{
	"errors": "User is not found"
}
```

### Get List Discussion Popular

Endpoint : GET /api/disscusions/popular

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Response Body (Success) :

```
{
	"data": 
	[
		{
			"id": 1,
			"user_id": 1,
			"title": "baik",
			"body": "lorem epsum",
			"image": "lorem epsum.png",
			"created_at": "2024-04-25 15:21:12",
			"updated_at": "2024-04-25 15:21:12",
			"_count": {
				"comment": 12,
				"discussionLike": 102
			},
			"user": {
				"first_name": "Tantowi",
				"last_name": null,
				"isAnonymous": true
			}
		},
		{
			"id": 2,
			"user_id": 1,
			"title": "kurang baik",
			"body": "lorem epsum",
			"image": "lorem epsum.png",
			"created_at": "2024-04-25 15:21:12",
			"updated_at": "2024-04-25 15:21:12",
			"_count": {
				"comment": 12,
				"discussionLike": 102
			},
			"user": {
				"first_name": "Tantowi",
				"last_name": null,
				"isAnonymous": true,
			}
		},
	]
}
```

Response Body (Failed) :

```
{
	"errors": "User is not found"
}
```

### Get Discussion (update)

Endpoint : GET /api/disscusions/:id

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Response Body :

```
{
	"data": {
			"id": 1,
			"user_id": 1,
			"title": "baik",
			"body": "lorem epsum",
			"image": "lorem epsum.png",
			"created_at": "2024-04-25 15:21:12",
			"updated_at": "2024-04-25 15:21:12",
			"_count": {
				"comment": 12,
				"discussionLike": 102
			},
			"user": {
				"first_name": "Tantowi",
				"last_name": null,
				"isAnonymous": true
			},
			"comment": [
				{
					"id": 5,
					"user_id": 1,
					"discussion_id": 2,
					"body": "lorem epsum",
					"created_at": "2024-04-25 15:21:12",
					"updated_at": "2024-04-25 15:21:12",
					"user": {
						"first_name": "Tantowi",
						"last_name": null,
						"isAnonymous": true
					},
				},
				{
					"id": 9,
					"user_id": 2,
					"discussion_id": 2,
					"body": "lorem epsum",
					"created_at": "2024-04-25 15:21:12",
					"updated_at": "2024-04-25 15:21:12",
					"user": {
						"first_name": "Tantowi",
						"last_name": null,
						"isAnonymous": true
					}
				}

			]
	}
}
```

### Create Discussion

Endpoint : POST /api/disscusions/

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Request Body :

```
{
	"title": "baik",
	"body": "lorem epsum",
	"image": "lorem epsum.png",
}
```

Response Body (Success):

```
{
	"data": {
		"id": 1,
		"user_id": 1,
		"title": "baik",
		"body": "lorem epsum",
		"image": "lorem epsum.png",
		"created_at": "2024-04-25 15:21:12",
		"updated_at": "2024-04-25 15:21:12"
	}
}
```

Response Body (failed) :

```
{
	"errors": "body is required"
}
```

### Update Discussion

Endpoint : PUT /api/disscusions/:id

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Requiest Body :

```
{
	"title": "baik",
	"body": "lorem epsum edit",
	"image": "lorem epsum.png",
}
```

Response Body (Success):

```
{
	"data": {
		"id": 1,
		"user_id": 1,
		"title": "baik",
		"body": "lorem epsum edit",
		"image": "lorem epsum.png",
		"created_at": "2024-04-25 15:21:12",
		"updated_at": "2024-04-25 15:21:12"
	}
}
```

Response Body (failed) :

```
{
	"errors": "body is required"
}
```

### Remove Discussion

Endpoint : DELETE /api/discussions/:id

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Response Body (success) :

```
{
	"message": "Berhasil menghapus jurnal"
}
```

Response Body (failed) :

```
{
	"errors": "Journal not found"
}
```

### Like Discussion

Endpoint : POST /api/discussions/:id/like

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Response Body (success) :

```
{
	"message": "Berhasil like discussion id 2"
}
```

Response Body (failed) :

```
{
	"errors": "Discussion not found"
}
```
