# ADR 0002: SeaweedFS instead of MinIO for local S3 storage

- Status: accepted
- Date: 2026-11-27

## Context
The plan used MinIO for local S3-compatible storage of ticket photos. MinIO no longer publishes free container images (`minio/minio` can't be pulled from Docker Hub or Quay any more).

## Decision
Use SeaweedFS (`chrislusf/seaweedfs`, Apache 2.0) with its S3 gateway on port 8333. Dev credentials are in `infra/seaweedfs/s3.json`.

## Consequences
- The backend only uses the standard S3 API (AWS SDK), so production can use any S3-compatible provider (for example Hetzner Object Storage) by changing the endpoint and keys.
- Anonymous S3 access is refused; the backend must sign requests just like in production.
