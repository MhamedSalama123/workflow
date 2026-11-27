# Permission matrix

The server enforces every rule; the UI only hides what the user can't do.

Legend: **C** create · **R** read · **U** update · **D** delete · **own** = only records the user reported or is assigned to · — = no access

| Resource              | Employee                 | Technician                      | Manager            | Admin   |
|-----------------------|--------------------------|---------------------------------|--------------------|---------|
| Users                 | R own profile, U own profile | R own profile, U own profile | R all              | C R U D (deactivate) |
| Locations             | R                        | R                               | C R U D            | C R U D |
| Assets                | R                        | R, U status                     | C R U D            | C R U D |
| Tickets               | C, R own                 | C, R own + assigned, U status of assigned | C R U, assign | C R U D |
| Ticket comments       | C R on own tickets       | C R on assigned tickets         | C R all            | C R all |
| Attachments           | C R on own tickets       | C R on assigned tickets         | C R all            | C R D all |
| Status history        | R on own tickets         | R on assigned tickets           | R all              | R all   |
| Work logs             | —                        | C R U own entries               | R all              | R all   |
| Maintenance plans     | —                        | R                               | C R U D            | C R U D |
| Threshold rules       | —                        | —                               | C R U D            | C R U D |
| Asset reviews         | —                        | R, U when assigned              | R all              | R all   |
| Replacement requests  | —                        | C from own review               | R, decide          | R all   |
| Knowledge articles    | R approved               | R approved, C draft             | C R U D, approve   | C R U D |
| Reports / dashboard   | —                        | R own workload                  | R all              | R all   |
| Audit log             | —                        | —                               | R                  | R       |

## Notes on the matrix
- **"Assigned" means the current assignee only.** A technician loses access to a ticket (and its comments, attachments and status history) as soon as it's reassigned. Their past work stays visible to others in `STATUS_HISTORY`.
- **Other users' names:** "R own profile" doesn't hide who you work with. On a ticket, every role sees the display name and role of commenters (for example "M. Weber · Technician"), and never their email or other profile data.
- **Comments are immutable** for every role, admins included: no edit and no delete. Moderation goes through the audit log (Phase 2).
- **Comments on final tickets:** on `CLOSED` and `REJECTED` tickets, Employees and Technicians can only read comments. Managers and Admins may still comment (for example a closing remark).

## Error codes for ticket endpoints
| Situation | Status |
|-----------|--------|
| Not logged in | `401` |
| Ticket the user may not see (doesn't exist, not own, not currently assigned) | `404`, so its existence stays hidden; this applies to every ticket endpoint |
| User can see the ticket, but the role may not do this action (for example an employee changing status) | `403` |
| Action is allowed for the role but not in the ticket's current state (forbidden transition, comment on a locked ticket) | `409` |
| Invalid input | `400` |

## Resolved questions
Decided on 2026-11-27 while writing acceptance criteria for #3 and #4.
- ✅ **Comments on `CLOSED` / `REJECTED` tickets:** locked for Employees and Technicians (`409`); Managers and Admins may still comment.
- ✅ **Reopen comment:** the reopen request (`RESOLVED → IN_PROGRESS`) carries one required `reason` (10–500 chars, trimmed). The server stores it as `STATUS_HISTORY.note` and also posts it as a `TicketComment` by the same user, so it shows in the timeline.
- ✅ **Reassigned technicians:** current assignee only; earlier assignees lose access.
- ✅ **403 vs. 404:** `404` for any ticket the user may not see, on all ticket endpoints; `403` only when the ticket is visible but the action isn't allowed.
- ✅ **Comment length:** trimmed, not blank, at most 2000 characters.
- ✅ **Commenter visibility:** display name and role only, never email or other profile data.
- ✅ **Comment edit/delete:** immutable for every role, admins included; moderation goes through the audit log (Phase 2).

## Open questions to decide
- May a technician see tickets that are not assigned to them (for example to help a colleague)? Current choice: no.
- May an employee cancel their own ticket while it is still `REPORTED`? Current choice: yes, it moves to `REJECTED` with reason "withdrawn".
