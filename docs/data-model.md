# Data model

GitHub renders this ER diagram automatically. All tables have `id` (UUID), `created_at` and `updated_at`; they're left out below for readability.

```mermaid
erDiagram
    USER ||--o{ TICKET : reports
    USER ||--o{ TICKET : "is assigned"
    LOCATION ||--o{ ASSET : contains
    ASSET ||--o{ TICKET : "has"
    ASSET |o--o| ASSET : "replaced by"
    TICKET ||--o{ TICKET_COMMENT : has
    TICKET ||--o{ ATTACHMENT : has
    TICKET ||--o{ STATUS_HISTORY : has
    TICKET ||--o{ WORK_LOG : has
    USER ||--o{ WORK_LOG : logs
    ASSET ||--o{ MAINTENANCE_PLAN : has
    MAINTENANCE_PLAN ||--o{ TICKET : creates
    THRESHOLD_RULE ||--o{ ASSET_REVIEW : triggers
    ASSET ||--o{ ASSET_REVIEW : has
    USER ||--o{ ASSET_REVIEW : writes
    ASSET_REVIEW ||--o| REPLACEMENT_REQUEST : leads_to
    USER ||--o{ AUDIT_LOG : causes

    USER {
        string name
        string email UK
        string password_hash
        enum role "EMPLOYEE TECHNICIAN MANAGER ADMIN"
        string[] skills
        string language "de en"
        boolean active
    }
    LOCATION {
        string name
        string building
        string floor
    }
    ASSET {
        string code UK "CMP-03"
        string name
        string category
        string serial_number UK
        enum status "RUNNING DOWN RETIRED"
        date purchase_date
        decimal replacement_price
        int expected_lifetime_years
        uuid replaced_by_id FK
        string qr_code_id UK
    }
    TICKET {
        string number UK "WF-1041"
        string title
        text description
        string category
        enum priority "LOW MEDIUM HIGH CRITICAL"
        enum status
        enum type "CORRECTIVE PLANNED"
        uuid asset_id FK "optional"
        uuid reporter_id FK
        uuid assignee_id FK
        uuid maintenance_plan_id FK
        timestamp due_at "SLA"
        timestamp resolved_at
        text solution_note
    }
    TICKET_COMMENT {
        uuid ticket_id FK
        uuid author_id FK
        text body
    }
    ATTACHMENT {
        uuid ticket_id FK
        uuid uploaded_by FK
        string object_key "S3 key"
        string content_type
        long size_bytes
    }
    STATUS_HISTORY {
        uuid ticket_id FK
        enum old_status
        enum new_status
        uuid changed_by FK
        timestamp changed_at
        text note
    }
    WORK_LOG {
        uuid ticket_id FK
        uuid technician_id FK
        int minutes
        text parts_used
        decimal cost
    }
    MAINTENANCE_PLAN {
        uuid asset_id FK
        int interval_days
        jsonb checklist
        uuid default_technician_id FK
        date next_due_date
        boolean active
    }
    THRESHOLD_RULE {
        string asset_category
        enum rule_type "REPAIR_COUNT REPAIR_COST DOWNTIME AGE"
        decimal limit_value
        int window_days
    }
    ASSET_REVIEW {
        uuid asset_id FK
        uuid rule_id FK
        uuid technician_id FK
        string condition
        text root_cause
        enum recommendation "KEEP OVERHAUL REPLACE"
        decimal overhaul_estimate
        decimal replacement_estimate
        text justification
        text ai_summary
        enum status
    }
    REPLACEMENT_REQUEST {
        uuid review_id FK
        uuid requested_by FK
        uuid manager_id FK
        enum decision "PENDING APPROVED REJECTED DEFERRED"
        text comment
        uuid new_asset_id FK
    }
    AUDIT_LOG {
        string entity_type
        uuid entity_id
        string action
        uuid user_id FK
        jsonb changes
        timestamp at
    }
```

Phase 4 adds `KNOWLEDGE_ARTICLE` (with a `vector` embedding column) and `CHAT_FEEDBACK`; their design waits until then.

## Design choices
- **UUID primary keys** plus a readable number (`WF-1041`, `CMP-03`) for humans.
- **Soft delete** for users and assets (`active` / `RETIRED`), so history is never lost.
- **Downtime** is calculated from `STATUS_HISTORY` instead of being stored, so there's one source of truth.
- **Phase 1 migrations** only create User, Location, Asset, Ticket, TicketComment, Attachment and StatusHistory. The other tables come with the phase that needs them.
