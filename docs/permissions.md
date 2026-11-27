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

## Open questions to decide
- May a technician see tickets that are not assigned to them (for example to help a colleague)? Current choice: no.
- May an employee cancel their own ticket while it is still `REPORTED`? Current choice: yes, it moves to `REJECTED` with reason "withdrawn".
