# ADR 0001: Monorepo with Spring Boot backend and React frontend

- Status: accepted
- Date: 2026-11-27

## Context
WorkFlow needs a secure REST API with role-based access, scheduled jobs and reporting queries, plus a responsive web UI that technicians also use on phones. It's built by one developer in about 16 weeks.

## Decision
- One Git repository with `backend/` (Java 21, Spring Boot 3) and `frontend/` (React, TypeScript, Vite).
- PostgreSQL as the only database, using the pgvector image now so Phase 4 needs no new service.
- Docker Compose for local services; GitHub Actions builds and tests both parts on every push.

## Consequences
- One pull request can change the API and the UI together.
- Spring Boot matches what German industry employers ask for; the trade-off is more boilerplate than Node.
- CI has to build two toolchains (Maven and npm), handled as two parallel jobs.
