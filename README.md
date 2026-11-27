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

```bash
cp .env.example .env
docker compose up -d
```

| Service        | URL                      |
|----------------|--------------------------|
| PostgreSQL     | `localhost:5432`         |
| MinIO console  | http://localhost:9001    |
| Mailpit inbox  | http://localhost:8025    |

## Project docs

- [User stories](docs/user-stories.md)
- [Permission matrix](docs/permissions.md)
- [Ticket lifecycle](docs/ticket-lifecycle.md)
- [Data model](docs/data-model.md)
- [Architecture decisions](docs/adr/)
