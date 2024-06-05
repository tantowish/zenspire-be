# Journal API Spec

### Get List Journal

Endpoint : GET /api/journals

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Query Parameters (Optional):

Date range filter :

- startDate (string): "YYYY-MM-DD". Example: "2024-04-25"
- endDate (string): "YYYY-MM-DD"

Search filter :

- search(string): "How%20to%20overcome"

Response Body (Success) :

```
{
	"data":
	[
		{
			"id": 1,
			"user_id": 1,
			"mood": "minimal",
			"title": "kejadian unik",
			"question_1": "lorem epsum",
			"question_2": "lorem epsum",
			"question_3": "lorem epsum",
			"question_4": "lorem epsum",
			"created_at": "2024-04-25 15:21:12",
			"updated_at": "2024-04-25 15:21:12"
		},
		{
			"id": 2,
			"user_id": 1,
			"mood": "berat",
			"title": "kejadian unik 2",
			"question_1": "lorem epsum",
			"question_2": "lorem epsum",
			"question_3": "lorem epsum",
			"question_4": "lorem epsum",
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
		"mood": "minimal",
		"title": "kejadian unik",
		"question_1": "lorem epsum",
		"question_2": "lorem epsum",
		"question_3": "lorem epsum",
		"question_4": "lorem epsum",
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
	"mood": "minimal",
	"title": "kejadian unik",
	"question_1": "lorem epsum",
	"question_2": "lorem epsum",
	"question_3": "lorem epsum",
	"question_4": "lorem epsum",
}
```

Response Body (success) :

```
{
	"data": {
		"id": 1,
		"user_id": 1,
		"mood": "minimal",
		"title": "kejadian unik",
		"question_1": "lorem epsum",
		"question_2": "lorem epsum",
		"question_3": "lorem epsum",
		"question_4": "lorem epsum",
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
	"mood": "minimal",
	"title": "kejadian unik",
	"question_1": "lorem epsum edit",
	"question_2": "lorem epsum edit",
	"question_3": "lorem epsum",
	"question_4": "lorem epsum",
}
```

Response Body (success) :

```
{
	"data": {
		"id": 1,
		"user_id": 1,
		"mood": "minimal",
		"title": "kejadian unik",
		"question_1": "lorem epsum edit",
		"question_2": "lorem epsum edit",
		"question_3": "lorem epsum",
		"question_4": "lorem epsum",
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

### Get Mood Anxiety level

Endpoint : GET /api/journals/moods

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Response Body (Success) :

```
{
    "data": [
        {
            "mood": "minimal",
            "count": 1
        },
        {
            "mood": "ringan",
            "count": 0
        },
        {
            "mood": "sedang",
            "count": 0
        },
        {
            "mood": "berat",
            "count": 0
        },
        {
            "mood": "ekstrem",
            "count": 0
        }
    ]
}
```

Response Body (Failed) :

```
{
	"errors": "unauthorized"
}
```

Get Journal Analysis AI

Endpoint : GET /api/journals/:id/analysis

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Response Body (Success) :

```
{
    "data": {
		"id": 1,
		"journal_id": 1,
		"body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		"created_at": "2024-04-25 15:21:12",
		"updated_at": "2024-04-25 15:21:12"
	}
}
```
