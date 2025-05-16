# Task Management System

A full-stack Task Management web application built using **React (Vite)** for the frontend and **Node.js with Express** for the backend. It supports task creation, user assignments, role-based access (Admin/User), and allows up to 3 PDF documents to be attached to each task.

---

## Features

*  User Authentication (Admin/User roles)
*  Task CRUD operations
*  Assign tasks to specific users
*  Role-based access control
*  Upload up to 3 PDF files per task
*  Sort tasks by due date, priority, or status
*  Responsive UI with Tailwind CSS
*  Dockerized with Docker Compose
*  Unit and Integration Testing (80%+ coverage)

---

## Tech Stack

**Frontend:**

* React (Vite)
* Tailwind CSS
* Axios

**Backend:**

* Node.js
* Express
* MongoDB (Mongoose)
* Multer (File uploads)
* JWT (Authentication)

**Other Tools:**
* MongoDB as database
* Docker & Docker Compose for containerization (DevOps)

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/prateek-dhanker/Task-Manager
```

### 2. Setup Backend (Server)

```bash
cd Server
npm install
# Create a config.env file based on the example below
npm start
```

### 3. Setup Frontend (Client)

```bash
cd Client
npm install
npm run dev
```

Frontend will run on: `http://localhost:5173`

Backend will run on: `http://localhost:3000`

---

## ⚙️ Environment Variables

Create a file `Server/config.env`:

```env
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret_key
```
### If using Docker
```env
MONGO_URI=mongodb://mongo:27017/taskmanager
JWT_SECRET=your_jwt_secret_key
```


---

## 🐳 Docker Setup

To run the app with Docker:

```bash
docker-compose up --build
```

Make sure Docker is installed on your machine.

---

## Project Structure

```
Task Manager/
├── Client/             # React frontend
│   ├── src/
│   ├── public/
│   └── Dockerfile
├── Server/             # Node.js backend
│   ├── routes/
│   ├── models/
│   ├── uploads/        # PDF file storage (ignored in git)
│   ├── config.env
│   └── Dockerfile
├── docker-compose.yml
├── README.md
```

---

## API Documentation

Need to change server APIs from pages/[filename].jsx files as per usecase

### For Local Runs
```
http:localhost:3000/api....
```
### For Dockerized Runs
```
http:server:3000/api....
```

---

## Notes

* PDF uploads are limited to 3 per task
* `uploads/` and `config.env` should be added to `.gitignore`
* Admin can view all tasks, while regular users see only their own

---

## Author

**Prateek Dhanker**

[LinkedIn](https://www.linkedin.com/in/prateek-dhanker07/)

[Resume](https://drive.google.com/file/d/10L8pXX43ImmwjVPWXle9x9t4_fTFRn5F/view?usp=drive_link)