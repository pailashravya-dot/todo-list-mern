# MERN To-Do List – Architecture Plan

## 1. Project Overview

The project is a simple To-Do List web application built using the MERN stack.

MERN stands for:

* MongoDB – Database
* Express.js – Backend web framework
* React.js – Frontend library
* Node.js – JavaScript runtime

The application will allow users to:

1. Add a task.
2. Set the task duration in minutes.
3. View all tasks.
4. Mark a task as completed.
5. Mark a completed task as pending again.
6. Delete a task.

The project will not include user authentication, payment systems, Redux, or other unnecessary features.

The goal is to build a small application that is easy to understand, test, debug, and explain.

---

# 2. Functional Requirements

## 2.1 Add Task

The user should be able to enter:

* Task name
* Duration in minutes

Example:

```text
Task Name: Study DBMS
Duration: 60 minutes
```

The task should be saved in MongoDB.

---

## 2.2 View Tasks

The application should display all saved tasks.

Each task should show:

* Task name
* Duration
* Completion status
* Complete/Undo action
* Delete action

---

## 2.3 Complete Task

The user should be able to mark a pending task as completed.

Example:

```text
Study DBMS
60 minutes
Status: Completed
```

---

## 2.4 Undo Completion

The user should be able to change a completed task back to pending.

Example:

```text
Study DBMS
60 minutes
Status: Pending
```

---

## 2.5 Delete Task

The user should be able to permanently delete a task.

---

# 3. Technology Stack

## Frontend

* React.js
* Vite
* JavaScript
* HTML
* CSS

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Development Tools

* VS Code
* Git
* GitHub
* Postman or another API testing tool

---

# 4. Simple System Architecture

The application will follow this basic architecture:

```text
                USER
                  |
                  v
          React Frontend
                  |
                  | HTTP Requests
                  v
          Express Backend
                  |
                  v
             Routes
                  |
                  v
           Controllers
                  |
                  v
          Mongoose Model
                  |
                  v
             MongoDB
```

## Request Flow

For example, when the user adds a task:

```text
User enters task
       ↓
React form
       ↓
POST /api/tasks
       ↓
Express Route
       ↓
Task Controller
       ↓
Task Model
       ↓
MongoDB
       ↓
Response sent to React
       ↓
Task displayed on screen
```

---

# 5. Backend Architecture

The backend will use a simple MVC-style structure.

MVC means:

* Model – Handles database structure and communication.
* Controller – Contains application logic.
* Routes – Defines API endpoints.

## Backend Folder Structure

```text
backend/
│
├── controllers/
│   └── taskController.js
│
├── models/
│   └── Task.js
│
├── routes/
│   └── taskRoutes.js
│
├── middleware/
│
├── .env
├── .gitignore
├── package.json
└── server.js
```

---

# 6. Frontend Architecture

The frontend will be divided into small React components.

```text
frontend/
│
└── src/
    │
    ├── components/
    │   │
    │   ├── AddTask/
    │   │   ├── AddTask.jsx
    │   │   └── AddTask.css
    │   │
    │   ├── TaskList/
    │   │   ├── TaskList.jsx
    │   │   └── TaskList.css
    │   │
    │   └── TaskItem/
    │       ├── TaskItem.jsx
    │       └── TaskItem.css
    │
    ├── App.jsx
    ├── main.jsx
    └── index.css
```

## Component Responsibilities

### AddTask

Responsible for:

* Showing the task input form.
* Accepting task name.
* Accepting duration.
* Validating input.
* Sending a request to the backend.

### TaskList

Responsible for:

* Displaying all tasks.
* Rendering individual TaskItem components.

### TaskItem

Responsible for:

* Displaying one task.
* Showing completion status.
* Completing/undoing a task.
* Deleting a task.

### App

Responsible for:

* Managing the main application state.
* Connecting major components together.
* Fetching tasks from the backend.

---

# 7. Database Design

MongoDB will store each task as a document.

## Task Document

```json
{
  "_id": "...",
  "taskName": "Study DBMS",
  "duration": 60,
  "completed": false,
  "createdAt": "..."
}
```

## Fields

| Field       | Type     | Purpose                        |
| ----------- | -------- | ------------------------------ |
| `_id`       | ObjectId | Unique task identifier         |
| `taskName`  | String   | Name of the task               |
| `duration`  | Number   | Duration in minutes            |
| `completed` | Boolean  | Whether the task is completed  |
| `createdAt` | Date     | Time when the task was created |

---

# 8. API Design

The backend will provide REST API endpoints.

## Create Task

```text
POST /api/tasks
```

Purpose:

Create a new task.

Example request:

```json
{
  "taskName": "Study DBMS",
  "duration": 60
}
```

---

## Get Tasks

```text
GET /api/tasks
```

Purpose:

Retrieve all tasks.

---

## Update Task

```text
PUT /api/tasks/:id
```

Purpose:

Update a task's completion status.

Example:

```json
{
  "completed": true
}
```

The same endpoint can also change:

```json
{
  "completed": false
}
```

---

## Delete Task

```text
DELETE /api/tasks/:id
```

Purpose:

Delete a task using its ID.

---

# 9. CRUD Operations

The application follows CRUD.

| CRUD Operation | Application Feature | HTTP Method |
| -------------- | ------------------- | ----------- |
| Create         | Add task            | POST        |
| Read           | View tasks          | GET         |
| Update         | Complete/undo task  | PUT         |
| Delete         | Delete task         | DELETE      |

---

# 10. Input Validation

The application should validate user input before saving data.

## Task Name

Invalid:

```text
""
```

Invalid:

```text
"     "
```

Valid:

```text
"Study DBMS"
```

---

## Duration

Invalid:

```text
-10
```

Invalid:

```text
0
```

Invalid:

```text
"abc"
```

Valid:

```text
30
```

---

# 11. Edge Cases

The application should consider the following cases:

1. User submits an empty task name.
2. User enters only spaces as the task name.
3. User leaves duration empty.
4. User enters a negative duration.
5. User enters zero duration.
6. User enters non-numeric duration.
7. User tries to update an invalid task ID.
8. User tries to delete an invalid task ID.
9. User tries to delete a task that no longer exists.
10. MongoDB connection fails.
11. Backend server is unavailable.
12. Frontend receives an unexpected API response.
13. There are no tasks to display.

---

# 12. Error Handling

The backend should return appropriate HTTP status codes.

Examples:

```text
201 Created
```

When a task is successfully created.

```text
200 OK
```

When a task is successfully retrieved or updated.

```text
400 Bad Request
```

When the user sends invalid data.

```text
404 Not Found
```

When the requested task does not exist.

```text
500 Internal Server Error
```

When an unexpected server/database error occurs.

---

# 13. Frontend State

The React application needs to keep track of the tasks.

Conceptually:

```javascript
tasks = [
  {
    id: "...",
    taskName: "Study DBMS",
    duration: 60,
    completed: false
  }
]
```

When the backend data changes, the frontend should update the displayed task list.

---

# 14. Development Plan

The project will be developed feature-by-feature rather than generating the entire application at once.

## Phase 1 – Project Setup

* Create project folder.
* Create backend.
* Create frontend.
* Install required packages.
* Configure environment variables.
* Configure Git.

## Phase 2 – Backend Setup

* Create Express server.
* Connect MongoDB.
* Create Task model.
* Create task routes.
* Create task controllers.

## Phase 3 – Create Task

Implement:

```text
POST /api/tasks
```

Test:

* Valid task.
* Empty task name.
* Invalid duration.
* Negative duration.
* Zero duration.

## Phase 4 – Get Tasks

Implement:

```text
GET /api/tasks
```

Test:

* No tasks.
* One task.
* Multiple tasks.

## Phase 5 – Frontend

Create:

* AddTask component.
* TaskList component.
* TaskItem component.

Connect frontend to backend.

## Phase 6 – Update Task

Implement:

```text
PUT /api/tasks/:id
```

Allow the user to:

* Complete a task.
* Undo completion.

## Phase 7 – Delete Task

Implement:

```text
DELETE /api/tasks/:id
```

Test successful deletion and invalid task IDs.

## Phase 8 – Testing and Debugging

Test:

* Normal cases.
* Invalid input.
* Empty states.
* API errors.
* Database errors.

For every bug:

```text
Reproduce
   ↓
Read exact error
   ↓
Compare expected vs actual
   ↓
Find root cause
   ↓
Make smallest fix
   ↓
Retest
```

## Phase 9 – GitHub

Commit the project after meaningful feature slices.

Example:

```text
Initial project setup
Add task API
Add get tasks API
Build task form
Display tasks
Add task completion
Add delete task
Final testing
```

Never commit:

```text
.env
node_modules/
```

---

# 15. Testing Strategy

Every feature should be tested before moving to the next feature.

Testing should include:

### Normal Cases

Example:

```text
Task: Study DBMS
Duration: 60
```

Expected:

```text
Task successfully created.
```

### Edge Cases

Example:

```text
Task: ""
Duration: 60
```

Expected:

```text
Validation error.
```

Another example:

```text
Task: Study DBMS
Duration: -10
```

Expected:

```text
Validation error.
```

---

# 16. Security and Configuration

Sensitive information such as the MongoDB connection string should be stored in `.env`.

Example:

```text
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

The `.env` file must not be uploaded to GitHub.

The project should contain a `.gitignore` file.

Example:

```text
node_modules/
.env
```

---

# 17. Deployment Plan

The application will eventually have:

```text
React Frontend
      |
      v
Deployed Frontend
      |
      | API requests
      v
Deployed Express Backend
      |
      v
MongoDB
```

The exact deployment configuration will be handled after the application works correctly locally.

---

# 18. Important Development Rule

AI will be used as a coding assistant, not as a replacement for understanding the project.

For every AI-generated feature:

1. Read the generated code.
2. Understand what it does.
3. Run the application.
4. Test normal cases.
5. Test edge cases.
6. Check the code for unnecessary complexity.
7. Fix problems.
8. Verify the final behavior.

The developer is responsible for the final code.

---

# 19. Final Project Goal

The final application should allow a user to:

```text
              TO-DO LIST

+--------------------------------+
| Task: [ Study DBMS          ]  |
| Duration: [ 60 ] minutes       |
|          [ Add Task ]           |
+--------------------------------+

Tasks:

☐ Study DBMS
  60 minutes
  [Complete] [Delete]

☑ Finish Assignment
  30 minutes
  [Undo] [Delete]
```

The application should have a simple, clean structure and every part of the code should be understandable to the developer.

