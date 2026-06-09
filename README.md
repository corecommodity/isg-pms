# isg-pms

Portfolio Management System

## 🚀 How to Run the Project

### 🔹 Backend (FastAPI)

1. Navigate to backend folder:

   ```bash
   cd isg-pms/backend
   ```

2. Run the FastAPI server:

   ```bash
   uvicorn main:app --reload
   ```

---

### 🔹 Frontend (React)

1. Navigate to frontend folder:

   ```bash
   cd isg-pms/frontend
   ```

2. Install dependencies (first time only):

   ```bash
   npm install
   ```

3. Start the React app:

   ```bash
   npm start
   ```

---

## 📌 Notes

* Backend uses FastAPI
* Frontend uses React

## 🐳 Docker Setup

### Build Docker Images

Build the backend and frontend images:

```bash
docker compose build
```

### Start Containers

Start all services:

```bash
docker compose up
```
