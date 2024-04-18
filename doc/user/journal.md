# Journal API Spec

### Get List Journals

Endpoint : GET /api/journals

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Response Body (Success) :

```
{
	"data": 
	[
		{
			"id": 1
			"mood": "baik",
			"question_1": "lorem epsum",
			"question_2": "lorem epsum",
			"question_3": "lorem epsum",
			"emosi": ['Senang','Senang']
		},
		{
			"id": 2
			"mood": "kurang baik",
			"question_1": "lorem epsum",
			"question_2": "lorem epsum",
			"question_3": null,
			"emosi": ['Marah','Tidak Senang']
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
		"id": 1
		"mood": "baik",
		"question_1": "lorem epsum",
		"question_2": "lorem epsum",
		"question_3": "lorem epsum",
		"emosi": ['Senang','Senang']
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
	"question_1": "lorem epsum",
	"question_2": "lorem epsum",
	"question_3": "lorem epsum",
	"emosi": ['Senang','Senang']
}
```

Response Body (success) :

```
{
	"data": {
		"id": 1
		"mood": "baik",
		"question_1": "lorem epsum",
		"question_2": "lorem epsum",
		"question_3": "lorem epsum",
		"emosi": ['Senang','Senang']
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
	"question_1": "lorem epsum edit",
	"question_2": "lorem epsum edit",
	"question_3": "lorem epsum",
	"emosi": ['Senang','Senang']
}
```

Response Body (success) :

```
{
	"data": {
		"id": 1
		"mood": "baik",
		"question_1": "lorem epsum edit",
		"question_2": "lorem epsum edit",
		"question_3": "lorem epsum",
		"emosi": ['Senang','Senang']
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

Endpoint : PUT /api/journals/:id

Request Header :

- Authorization : "Bearer 1o2ie012dk0sakd01"

Response Body (success) :

```
{
	"data": {
		"id": 1
		"mood": "baik",
		"question_1": "lorem epsum edit",
		"question_2": "lorem epsum edit",
		"question_3": "lorem epsum",
		"emosi": ['Senang','Senang']
	}
}
```

Response Body (failed) :

```
{
	"errors": "mood is required"
}
```
