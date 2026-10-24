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

### How execution works

In the local development setup, the frontend and Spring Boot backend run as separate processes, while Docker runs the Java or Python execution engine for each request.

In the Terraform deployment, one EC2 instance hosts Docker Engine, the frontend container, and the backend container. The frontend's Nginx server serves the UI and proxies `/api/` requests to the backend over Docker's private Compose network. The backend starts a short-lived Java or Python runner container through the Docker Engine on that same EC2 instance.

```text
Browser → frontend (port 80) → backend (private port 8080)
                                      │
                                      ├── java-engine container
                                      └── python-engine container
```

The backend port is not published to the internet. The runner containers are still on the same EC2 host as the application; this setup does not use Swarm, a separate worker node, or a job queue.

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

## ☁️ Deploy to AWS with Terraform

The Terraform configuration creates one Ubuntu EC2 instance, installs Docker Engine and Docker Compose at first boot, assigns an Elastic IP, and configures Systems Manager access. Terraform provisions the host; it does not copy or deploy the application source code.

### Prerequisites

- An AWS account and credentials configured for Terraform.
- Terraform 1.5+.
- IAM permissions to create EC2, security groups, an Elastic IP, an instance profile/role, and attach the AWS-managed `AmazonSSMManagedInstanceCore` policy.

### Provision the host

From the `terraform` directory:

```bash
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars to set the region and instance type.
terraform init
terraform validate
terraform plan
terraform apply
```

By default, only HTTP port 80 is public. SSH is closed, and the EC2 instance is configured for AWS Systems Manager Session Manager. Use the instance ID from `terraform output -raw instance_id` to connect in the AWS Console under **EC2 → Instances → Connect → Session Manager** (or use the AWS CLI `ssm start-session` command). The AWS identity used to open the session needs the relevant Systems Manager permissions.

If SSH is required instead, set `key_name` and `allowed_ssh_cidr` in `terraform.tfvars`; use a narrow CIDR such as your own public IP with `/32`, never `0.0.0.0/0`. Port 443 is not opened because this configuration does not set up TLS. Add a TLS-terminating reverse proxy or load balancer before exposing HTTPS.

### Deploy the application

Terraform does not automatically deploy CodeExec. Once the instance is ready, connect with Session Manager, clone or otherwise copy this repository onto the instance, and run:

```bash
cd CodeExec
sudo ./deploy.sh
```

`deploy.sh` builds both execution-engine images and builds/starts the frontend and backend Compose services on the EC2 host. The public URL is available from `terraform output -raw website_url`; the API is available through that same host at `/api/execute`.

The default `t3.micro` is a small prototype size (1 GiB RAM). The deployment builds several images on the EC2 instance, and every concurrent execution consumes additional resources. Use a larger instance for builds and real concurrency; swap is not a substitute for RAM. The root EBS volume defaults to 30 GiB and stores Docker images and build layers.

To remove the resources created by Terraform, run `terraform destroy` from the same directory and state.

### Important isolation limits

The backend container mounts `/var/run/docker.sock` so it can start runner containers. Access to this socket gives the backend powerful control of the host's Docker Engine. Docker resource limits and disabled runner networking are useful safeguards, but containers share the host kernel; this single-host design should not be treated as strong isolation for arbitrary hostile code. For a public execution service, move execution to a separate worker system with explicit job dispatch and stronger workload isolation. That queue/worker architecture and an external image registry/CI pipeline are not implemented by this Terraform configuration.

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
