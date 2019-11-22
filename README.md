# Local Park Passport
Local Park Passport is the definitive guide for find this best parks in your area depending on what your tastes are, the App allows you add parks with descriptions or search for parks based on rating.

#### Public Endpoints

[Register]<br>
[Login]<br>
[Fetch All Parks]<br>
[Fetch Parks by ID]<br>
[Fetch Park By rating]<br>

#### Authorization Endpoints

[All Deletes Actions]<br>
[All Edit(Put) Actions]<br>
[All Post Actions besides Login and Register]<br>

---

## Base API URL

**https://local-park.herokuapp.com/**


<a name="Register"></a>

## Register

_POST Request /api/register_

### Body

| Name        | Type   | Required | Description        |
| ----------- | ------ | -------- | ------------------ |
| fullname    | String | Yes      | User's name        |
| username    | String | Yes      | users's login name |
| email       | String | Yes      | User's email       |
| password    | String | Yes      | User's password    |

### Response

***201, Created***
> Server will respond with the added input information along with the user ID:

```
{
    "id": 3,
    "fullname": "blinx",
    "username": "blinx",
    "email": "blinx@email.com"
}
```

***400, Bad Request***
> Server returns a 400 status when a required column is missing in the given information:

```
{
    "message": "Please Provide needed columns (fullname, email, username and password)"
}
```


---

<a name="login"></a>

## Login

_POST Request /api/login_

### Body

| Name     | Type   | Required | Description        |
| -------- | ------ | -------- | ------------------ |
| username | String | Yes      | users's login name |
| password | String | Yes      | User's password    |

### Response

**200 Ok**

> The server will respond with a welcome message and JWT to access restricted routes.

```
{
    "message": "Welcome on board ${Username}",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NTUxOTExNTIsImV4cCI6MTU1NTI3NzU1Mn0.ZwIH2g1ACpZcH8ast9qdRcutjKkN"
}
```

**400 Bad Request**

> If you fail to submit a username or password, you will receive a message instructing you to add these.

```
{
    "message": "Please provide an username and password."
}
```

**401 Unathorized**

> If you submit a wrong username or password, you will receive a message of unathprization.

```
{
    "message": "Invalid Credentials!."
}
```

---

## Get users

_GET Request /api/users_

### Response

**200 Ok**

> The server will respond with a 200 and an array of all registered users.

```
[
    {
        "id": 1,
        "fullname": "blinx",
        "username": "blinx",
        "email": "blinx@email.com"
    },
    {
        "id": 2,
        "fullname": "ben",
        "username": "ben",
        "email": "ben@email.com"
    }
]
```

## Delete A User

_DELETE Request /api/users/:id_

### Response

**200 Ok**

> The server will respond with a 200 and a message if the users was successfully deleted.

**404 Not Found**

> If the ID cannot be located, the server will provide a message and 404 not found error.

```
{
    "message": "Could not find a user with given id"
}
```


## Edit A User

_Put Request /api/users/:id_

> user information can alsobe edited using the above link and method
---

<a name="fetch-all"></a>

## Fetch All Parks

_GET Request /api/parks_

### Response

**200 Ok**

> The server will respond with an array of all parks along with its rating.

```
[
    {
        "id": 1,
        "park_name": "Abiola Park",
        "park_description": "A lovely place with great scenery, nature at its best",
        "comment": "A place tobe eith family and friends"
    }
]
```

---

<a name="fetch-specific-park"></a>

## Fetch Specific Park

_GET Request /api/parks/:id_

### Response

**200 Ok**
> The server will respond with an array of selected park, with its rating as well a detailed information about its facilities.

```
{
    "id": 1,
    "park_name": "Abiola Park",
    "park_description": "A lovely place with great scenery, nature at its best",
    "rating": 4,
    "comment": "A place tobe eith family and friends",
    "facility": [
        {
            "id": 1,
            "facility_name": "dog park",
            "description": "A dos walk area"
        },
        {
            "id": 2,
            "facility_name": "wildlife",
            "description": "come see widelife at closer range"
        },
        {
            "id": 3,
            "facility_name": "hiking trails",
            "description": "let's climb the hills"
        },
        {
            "id": 4,
            "facility_name": "disc golf",
            "description": "a wide golfspace all green"
        }
    ]
}
```

---

<a name="search-park-by-rating"></a>

## Search park by rating

_GET Request /api/parksByRating/:id_

### Response

**200 Ok**

> The server will respond with an array of all parks having the inputed rating.

```
[
    {
        "id": 1,
        "park_name": "Abiola Park",
        "park_description": "A lovely place with great scenery, nature at its best",
        "rating": 4,
        "comment": "A place tobe eith family and friends"
    }
]
```

---

<a name="post-parks"></a>

## Post Parks

_POST Request /api/parks_

> user must be "Authenticated" to post parks

### Body

| Name             | Type   | Required | Description        |
| ---------------- | ------ | -------- | ------------------ |
| park_name        | String | Yes      | park's name        |
| city             | String | Yes      | park's location    |
| country          | String | Yes      | User's location    |
| park_description | String | Yes      | park's description |


### Response

**201 Created**

> The server will respond with an array of the newly added park with its ID.

```
[
{
    "id": 3,
    "park_name": "shila Park",
    "city": "Lagos",
    "country": "Nigeria",
    "park_description": "A lovely scene"
}
]
```

---


## Delete A Park

_DELETE Request /api/parks/:id_

### Response

**200 Ok**

> The server will respond with a 200 and a message if the park was successfully deleted.

**404 Not Found**

> If the ID cannot be located, the server will provide a message and 404 not found error.

```
{
    "message": "Could not find a park link with given id"
}
```



## Edit A Park information

_PUT Request /api/parks/:id_

### Response

**200 Ok**

> The server will respond with a 200 and no body if the facility was successfully deleted.

**404 Not Found**

> If the ID cannot be located, the server will provide a message and 404 not found error.

```
{
    "message": "Could not find a park link with given id"
}
```
---

<a name="post-ratings"></a>

## Post Ratings

_POST Request /api/rating/:id_

> user must be "Authenticated" to post parks

### Body

| Name    | Type   | Required | Description                 |
| --------| ------ | -------  | ----------------------------|
| comment | String | Yes      | few words about the park    |
| rating  | String | Yes      | User's location             |
| user_id | String | Yes      | park's description          |


### Response

**201 Created**

> The server will respond with an array requesting that facilities of the park be added too.

```
[
    {
        message: add facilities
    }
]
```

**400, Bad Request**
 > The server will respond with an array indicatingthe required columns if any was omited.
 
```
[
     {
         message: "Please provide all needed columns (rating, comment and user_id)"
     }
 ]
```

---

---

<a name="add-facility"></a>

## Add A Facility

_POST Request /api/links_

Available facilities are as below:

| id | facility_name  |
|----| -------------- |
| 1  | dog park      |
| 2  | wildlife      | 
| 3  | hiking trails |
| 4  | disc golf     |
| 5  | open space    |
| 6  | tree climbing |
| 7  | waterfalls    |
| 8  | kids play area| 
| 9  | horse riding  | 

### Body

| Name          | Type    | Required | Description    |
| --------------| --------| -------- | ---------------|
| facility_id   | integer | Yes      | facilities' id |

### Response

**201 Created**

> The server will respond with amessage that says  facility added.

```
{
    message: "Facility added"
}
```

**400 Bad Request**

> If you fail to input required coloumn or spelt the column wrongly it will return a message that indicates invalid column was passed.

```
{
    message: "Please provide all needed columns (park_id && facility_id)"
}
```

---

<a name="get facilities"></a>

## Get facilities linked to a park

_GET Request /api/linked/:id_

### Response

**200 Ok**

> The server will respond with a 200 and a body of the park and all facilities it has.

**404 Not Found**

> If the ID cannot be located, the server will provide a message and 404 not found error.

```
{
    message: `Park with link of ${id} does not exist in the database`
}
```

---

<a name="delete-facility"></a>

## Delete A facility

_DELETE Request /api/links/:id_

### Response

**200 Ok**

> The server will respond with a 200 and a message if the facility was successfully deleted.

**404 Not Found**

> If the ID cannot be located, the server will provide a message and 404 not found error.

```
{
    "message": "Could not find a park link with given id"
}
```
