# Quisioner API Spec

### Get Quisioner

Endpoint : GET /api/quisioner

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Response Body (Success) :

```
{
	"data": [
		{
			"question_id": 1,
			"severity": 4
		},
		{
			"question_id": 2,
			"severity": 3
		},
		{
			"question_id": 3,
			"severity": 5
		},
		{
			"question_id": 4,
			"severity": 4
		},
		{
			"question_id": 5,
			"severity": 2
		},
		{
			"question_id": 6,
			"severity": 1
		},
		{
			"question_id": 7,
			"severity": 1
		},
		{
			"question_id": 8,
			"severity": 2
		},
		{
			"question_id": 5,
			"severity": 2
		},
	]
}
```


### Get Quisioner

Endpoint : GET /api/quisioner/severity

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Response Body (Success) :

```
{
	"data": {
		"severty": 23
	}
}
```

### Create Quisioner

Endpoint : POST /api/quisioner

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Response Body (Success) :

```
{
	"data": [
		{
			"question_id": 1,
			"severity": 4
		},
		{
			"question_id": 2,
			"severity": 3
		},
		{
			"question_id": 3,
			"severity": 5
		},
		{
			"question_id": 4,
			"severity": 4
		},
		{
			"question_id": 5,
			"severity": 2
		},
		{
			"question_id": 6,
			"severity": 1
		},
		{
			"question_id": 7,
			"severity": 1
		},
		{
			"question_id": 8,
			"severity": 2
		},
		{
			"question_id": 5,
			"severity": 2
		},
	]
}
```
