# CodeExec ⚡

Interactive, animated code execution and step-by-step visual execution tracer for algorithms and data structures in **Java** and **Python**.

---

## 🏛 Architecture Overview

CodeExec consists of three decoupled layers:

1. **Frontend (UI & Visualizer)**:
   - Built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.
   - Renders step-by-step animations for Stacks, Queues, Linked Lists, Trees, Arrays, Graphs, DSU, and Recursion.
   - Runs on `http://localhost:5173`.

2. **Backend Execution Service (Spring Boot)**:
   - Built with **Java 21** and **Spring Boot**.
   - Handles `/api/execute` requests, manages secure temp sandboxes, and orchestrates Docker containers.
   - Runs on `http://localhost:8080`.

3. **Execution Engines (Docker Sandboxes)**:
   - **`java-engine`**: Eclipse Temurin JDK 21 container with custom JDI (Java Debug Interface) AST step tracer (`JavaTracer.java`).
   - **`python-engine`**: Python 3.11-slim container with custom execution tracer (`pg_logger.py`, `normalizer.py`, and `compressor.py`).

---

## 🚀 Quick Start Guide

### Prerequisites
- **Java JDK 21+** (`java -version`)
- **Docker Desktop** (Ensure the Docker daemon is running: `docker ps`)
- **Node.js 18+** (`node -v`)

---

### 1. Build Docker Execution Images

From the project root directory:

```powershell
# Build the Java execution sandbox image
docker build -t java-engine ./java-engine

# Build the Python execution sandbox image
docker build -t python-engine ./python-engine
```

Verify images are available:
```powershell
docker images
```

---

### 2. Compile & Run the Backend Service

Using the included Maven Wrapper:

```powershell
# 1. Compile backend code
.\mvnw.cmd clean compile

# 2. Run backend via Spring Boot
.\mvnw.cmd spring-boot:run
```

Alternatively, build an executable JAR:
```powershell
.\mvnw.cmd clean package -DskipTests
java -jar target\execution-service-0.0.1-SNAPSHOT.jar
```

The backend starts at `http://localhost:8080`.

#### Test Backend Execution
In PowerShell:
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/execute" -Method Post -ContentType "application/json" -Body '{"language":"python","code":"x = [1, 2, 3]\nx.append(4)\nprint(x)"}'
```

Or using `request.json`:
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/execute" -Method Post -ContentType "application/json" -InFile "request.json"
```

---

### 3. Run the Frontend Visualizer

In a new terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open your browser at [http://localhost:5173](http://localhost:5173).

---

## 📡 API Specification

### Endpoint: `POST /api/execute`

**Request Body:**
```json
{
  "language": "python",
  "code": "x = 10\ny = 20\nz = x + y"
}
```

**Response Format:**
```json
{
  "status": "success",
  "stdout": "...",
  "trace": [
    {
      "step": 1,
      "line": 1,
      "event": "step_line",
      "variables": { "x": 10 }
    }
  ],
  "error": null
}
```
