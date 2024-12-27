# Project Management API

A RESTful API built with NestJS, PostgreSQL, and Prisma for managing projects and tasks.

## Features

- User authentication with JWT
- Project management (CRUD operations)
- Task management with status tracking
- User assignment to tasks
- Advanced filtering capabilities

## Tech Stack

- NestJS
- PostgreSQL
- Prisma ORM
- JWT Authentication
- TypeScript

## Prerequisites

- Node.js (v14+ recommended)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd project-management-api
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create a .env file and add:
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
JWT_SECRET="your-secret-key"
```

4. Run Prisma migrations
```bash
npx prisma migrate dev
```

5. Start the application
```bash
npm run start:dev
```

## API Testing Guide

### 1. Authentication

#### Register a New User
```http
POST http://localhost:3000/auth/register
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "test123"
}
```

#### Login
```http
POST http://localhost:3000/auth/login
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "test123"
}
```
Response will include JWT token needed for other requests.

### 2. User Management

#### Get All Users
```http
GET http://localhost:3000/users
Authorization: Bearer <your-token>
```

#### Update User
```http
PUT http://localhost:3000/users/:id
Authorization: Bearer <your-token>
Content-Type: application/json

{
    "name": "Updated Name",
    "email": "updated@example.com"
}
```

#### Delete User
```http
DELETE http://localhost:3000/users/:id
Authorization: Bearer <your-token>
```

### 3. Project Management

#### Create Project
```http
POST http://localhost:3000/projects
Authorization: Bearer <your-token>
Content-Type: application/json

{
    "name": "New Project",
    "description": "Project Description",
    "userId": "user-id-here"
}
```

#### Get All Projects
```http
GET http://localhost:3000/projects
Authorization: Bearer <your-token>
```

#### Update Project
```http
PUT http://localhost:3000/projects/:id
Authorization: Bearer <your-token>
Content-Type: application/json

{
    "name": "Updated Project",
    "status": "ONGOING",
    "description": "Updated description"
}
```

#### Delete Project
```http
DELETE http://localhost:3000/projects/:id
Authorization: Bearer <your-token>
```

### 4. Task Management

#### Create Task
```http
POST http://localhost:3000/tasks
Authorization: Bearer <your-token>
Content-Type: application/json

{
    "title": "New Task",
    "description": "Task Description",
    "projectId": "project-id-here",
    "assignedUserId": "user-id-here"
}
```

#### Get All Tasks
```http
GET http://localhost:3000/tasks
Authorization: Bearer <your-token>
```

#### Update Task
```http
PUT http://localhost:3000/tasks/:id
Authorization: Bearer <your-token>
Content-Type: application/json

{
    "status": "IN_PROGRESS",
    "description": "Updated description"
}
```

#### Delete Task
```http
DELETE http://localhost:3000/tasks/:id
Authorization: Bearer <your-token>
```

### 5. Task Filtering

#### Filter Tasks by Status and Assigned User
```http
GET http://localhost:3000/tasks?status=IN_PROGRESS&assignedUserId=user-id-here
Authorization: Bearer <your-token>
```

#### Get Project Tasks with Status Filter
```http
GET http://localhost:3000/tasks/projects/:projectId/tasks?status=TODO
Authorization: Bearer <your-token>
```

## Testing Flow

1. **Initial Setup**
   - Register a new user
   - Login to get JWT token
   - Save the token for subsequent requests

2. **Project Creation**
   - Create a new project
   - Note down the project ID

3. **Task Management**
   - Create tasks in the project
   - Update task status
   - Assign tasks to users

4. **Testing Filters**
   - Filter tasks by status
   - Filter by assigned user
   - Filter project tasks

## Error Handling

- 401: Unauthorized - Invalid or missing token
- 404: Not Found - Resource doesn't exist
- 400: Bad Request - Invalid input data

## Development

```bash
# development
npm run start:dev

# production mode
npm run start:prod

# unit tests
npm run test
```

## License

MIT
