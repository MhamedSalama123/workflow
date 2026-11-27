# WorkFlow

A maintenance platform (CMMS) where employees report problems, managers assign them, and technicians fix them. It includes preventive maintenance, QR codes, reports and AI-assisted triage.

> Status: Phase 0, planning and setup. Live demo coming in Phase 1.

## Tech stack

| Layer    | Choice                                              |
|----------|-----------------------------------------------------|
| Backend  | Java 21, Spring Boot 3, Spring Security, Spring Data JPA |
| Frontend | React, TypeScript, Vite                             |
| Database | PostgreSQL 16 + pgvector, Flyway migrations         |
| Storage  | S3-compatible (MinIO locally)                       |
| Email    | Mailpit locally                                     |
| DevOps   | Docker Compose, GitHub Actions                      |

## Run locally

Requirements: Docker, Java 21, Node 24.

```bash
cp .env.example .env
docker compose up -d                 # PostgreSQL, MinIO, Mailpit

cd backend && ./mvnw spring-boot:run # API on :8080
cd frontend && npm install && npm run dev   # UI on :5173
```

| Service        | URL                                  |
|----------------|--------------------------------------|
| Frontend       | http://localhost:5173                |
| API health     | http://localhost:8080/actuator/health |
| PostgreSQL     | `localhost:5432`                     |
| MinIO console  | http://localhost:9001                |
| Mailpit inbox  | http://localhost:8025                |

Tests: `cd backend && ./mvnw verify` (needs Docker for Testcontainers) and `cd frontend && npm test`.

## Project docs

- [User stories](docs/user-stories.md)
- [Permission matrix](docs/permissions.md)
- [Ticket lifecycle](docs/ticket-lifecycle.md)
- [Data model](docs/data-model.md)
- [Architecture decisions](docs/adr/)
