# Journal API Spec

### Get List Journal

Endpoint : GET /api/journals

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Query Parameters (Optional):

- startDate (string): "YYYY-MM-DD". Example: "2024-04-25"
- endDate (string): "YYYY-MM-DD"

Response Body (Success) :

```
{
	"data": 
	[
		{
			"id": 1,
			"user_id": 1,
			"mood": "baik",
			"title": "kejadian unik",
			"question_1": "lorem epsum",
			"question_2": "lorem epsum",
			"question_3": "lorem epsum",
			"created_at": "2024-04-25 15:21:12",
			"updated_at": "2024-04-25 15:21:12"
		},
		{
			"id": 2,
			"user_id": 1,
			"mood": "kurang baik",
			"title": "kejadian unik 2",
			"question_1": "lorem epsum",
			"question_2": "lorem epsum",
			"question_3": null,
			"created_at": "2024-04-25 15:21:12",
			"updated_at": "2024-04-25 15:21:12"
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

### Get List Journal by Date

Endpoint : GET /api/journals?date='yyyy-dd-mm'

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
			"mood": "baik",
			"title": "kejadian unik",
			"question_1": "lorem epsum",
			"question_2": "lorem epsum",
			"question_3": "lorem epsum",
			"created_at": "2024-04-25 15:21:12",
			"updated_at": "2024-04-25 15:21:12"
		},
		{
			"id": 2,
			"user_id": 1,
			"mood": "kurang baik",
			"title": "kejadian unik",
			"question_1": "lorem epsum",
			"question_2": "lorem epsum",
			"question_3": null,
			"created_at": "2024-04-25 15:21:12",
			"updated_at": "2024-04-25 15:21:12"
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

### Get Journal

Endpoint : GET /api/journals/:id

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Response Body (Success) :

```
{
	"data": {
		"id": 1,
		"user_id",
		"mood": "baik",
		"title": "kejadian unik",
		"question_1": "lorem epsum",
		"question_2": "lorem epsum",
		"question_3": "lorem epsum",
		"created_at": "2024-04-25 15:21:12",
		"updated_at": "2024-04-25 15:21:12"
	}
}
```

Response Body (Failed) :

```
{
	"errors": "Journal is not found"
}
```

### Create Journal

Endpoint : POST /api/journals/

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Request Body :

```
{
	"mood": "baik",
	"title": "kejadian unik",
	"question_1": "lorem epsum",
	"question_2": "lorem epsum",
	"question_3": "lorem epsum",
}
```

Response Body (success) :

```
{
	"data": {
		"id": 1,
		"user_id": 1,
		"mood": "baik",
		"title": "kejadian unik",
		"question_1": "lorem epsum",
		"question_2": "lorem epsum",
		"question_3": "lorem epsum",
		"created_at": "2024-04-25 15:21:12",
		"updated_at": "2024-04-25 15:21:12"
	}
}
```

Response Body (failed) :

```
{
	"errors": "mood is required"
}
```

### Update Journal

Endpoint : PUT /api/journals/:id

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Request Body :

```
{
	"mood": "baik",
	"title": "kejadian unik",
	"question_1": "lorem epsum edit",
	"question_2": "lorem epsum edit",
	"question_3": "lorem epsum",
}
```

Response Body (success) :

```
{
	"data": {
		"id": 1,
		"user_id": 1,
		"mood": "baik",
		"title": "kejadian unik",
		"question_1": "lorem epsum edit",
		"question_2": "lorem epsum edit",
		"question_3": "lorem epsum",
		"created_at": "2024-04-25 15:21:12",
		"updated_at": "2024-04-25 15:21:12"
	}
}
```

Response Body (failed) :

```
{
	"errors": "mood is required"
}
```

### Remove Journal

Endpoint : DELETE /api/journals/:id

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
