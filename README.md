# Edu-Labs
## Task Manager Backend
Introduction:- <br/>
The Task Manager backend provides API endpoints to manage tasks and user authentication. This backend enables users to create, update, delete, and view tasks, as well as handle user registration and login. The application includes role-based access control to ensure that only authorized users can perform specific actions.

## Project Type 
Backend

## Deployed API
Backend:- Backend URL <br/>
Database:-  "mongo_url='mongodb+srv://babakhalilmalyam2:123Edu_Labs@cluster0.skria.mongodb.net/?retryWrites=true&w=majority'"


## Installation & Getting Started
Clone the Repository


```
git clone https://github.com/your-repo/task-manager-backend.git
cd task-manager-backend
```

Install Dependencies


```
npm install
```
Set Up Environment Variables Create a .env file in the root directory and add the following:


```
JWT_SECRET=<your-jwt-secret>
mongo_url=<your-mongo-db-uri>
SESSION_SECRET=<your-Session-secret>
PORT=<your-port-number>
JWT_REFRESH_SECRET=<your-jwt-secret-refresh>
NODE_ENV='production'

```
Start the Server


```
npm start
```
Server will be running on http://localhost:3200.

## API Endpoints
User Authentication

Register User 
- Endpoint: POST /api/register 
- Description: Register a new user. 
- Input: 

```
{
  "name": "Baba",
  "email": "babakhalilmalyam@gmail.com",
  "password": "1234"
}
```
- Response:
  
```
{
  "message": "User registered successfully",
  "user": {
    "_id": "66c952cbe2d29b2edf74a8d1",
    "name": "Baba",
    "email": "babakhalilmalyam@gmail.com",
    "role": "user"
  }
}
```
Login User
- Endpoint: POST /api/login
- Description: Log in as a user.
- Input:

```
{
  "email": "babakhalilmalyam@gmail.com",
  "password": "1234"
}
```
- Response:
```
{
  "message": "Login successful",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Yzk1MmNiZTJkMjliMmVkZjc0YThkMSIsImVtYWlsIjoiYmFiYWtoYWxpbG1hbHlhbUBnbWFpbC5jb20iLCJuYW1lIjoiQmFiYSIsImlhdCI6MTcyNDQ3MTQ5MywiZXhwIjoxNzI0NDg5NDkzfQ.XPUBQcijYe_kSTz2iQkJDWoSB2-Kdr_IMXwL5-V2pus",
  "userRole": "user"
}
```
Logout User
- Endpoint: POST /api/logout
- Description: Log out the user.
- Response:

```
{
  "message": "Logout successful"
}
```
## Task Management
Create Task
- Endpoint: POST /api/tasks
- Description: Create a new task (Requires user or admin role).
- Input:
```
{
  "title": "Task-1",
  "description": "Task-1 created",
  "status": "pending",
  "priority": "high",
  "assignedTo": "babakhalilmalyam2@gmail.com"
}
```
- Response:
```
{
  "title": "Task-1",
  "description": "Task-1 created",
  "status": "pending",
  "priority": "high",
  "assignedTo": "66c95e8c25e3f4e573673efc",
  "createdBy": "66c952cbe2d29b2edf74a8d1",
  "_id": "66c962f7f00952b7a8aa7e85",
  "createdAt": "2024-08-24T04:35:03.385Z",
  "__v": 0
}
```
Get All Tasks
- Endpoint: GET /api/tasks
- Description: Retrieve all tasks (Requires authentication).
- Response:
```
[
  {
    "_id": "66c9603fbbcf631c5c58b965",
    "title": "Task-1",
    "description": "Task-1 created",
    "status": "pending",
    "priority": "high",
    "assignedTo": {
      "_id": "66c95e8c25e3f4e573673efc",
      "name": "Baba khalil",
      "email": "babakhalilmalyam2@gmail.com"
    },
    "createdBy": {
      "_id": "66c952cbe2d29b2edf74a8d1",
      "name": "Baba",
      "email": "babakhalilmalyam@gmail.com"
    },
    "createdAt": "2024-08-24T04:23:27.571Z",
    "__v": 0
  }
]
```
Get Task by ID
- Endpoint: GET /api/tasks/:id
- Description: Retrieve a task by its ID (Requires authentication).
- Response:
```
{
  "_id": "66c9603fbbcf631c5c58b965",
  "title": "Task-1",
  "description": "Task-1 created",
  "status": "pending",
  "priority": "high",
  "assignedTo": {
    "_id": "66c95e8c25e3f4e573673efc",
    "name": "Baba khalil",
    "email": "babakhalilmalyam2@gmail.com"
  },
  "createdBy": {
    "_id": "66c952cbe2d29b2edf74a8d1",
    "name": "Baba",
    "email": "babakhalilmalyam@gmail.com"
  },
  "createdAt": "2024-08-24T04:23:27.571Z",
  "__v": 0
}
```
Update Task
- Endpoint: PUT /api/tasks/:id
- Description: Update an existing task by its ID (Requires admin or user role).
- Input:
```
{
  "status": "completed"
}
```
- Response:
```
{
  "_id": "66c9603fbbcf631c5c58b965",
  "title": "Task-1",
  "description": "Task-1 created",
  "status": "completed",
  "priority": "high",
  "assignedTo": "66c95e8c25e3f4e573673efc",
  "createdBy": "66c952cbe2d29b2edf74a8d1",
  "createdAt": "2024-08-24T04:23:27.571Z",
  "__v": 0
}
```
Delete Task
- Endpoint: DELETE /api/tasks/:id
- Description: Delete a task by its ID (Requires admin role).
- Response:
```
{
  "message": "Task Deleted"
}
```
## Technology Stack
Node.js: JavaScript runtime environment. <br/>
Express.js: Web framework for Node.js. <br/>
Mongoose: MongoDB object modeling for Node.js. <br/>
JWT: JSON Web Tokens for authentication. <br/>
Bcrypt.js: Password hashing.<br/>
## Usage
After starting the server, use tools like Postman or cURL to interact with the API endpoints as described above.
