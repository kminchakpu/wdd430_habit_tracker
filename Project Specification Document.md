
## Project Title & Description

Habit Tracker is a web application that helps users build and maintain healthy lifestyle and financial habits. Users can track healthy meals, exercise activity, water intake, income, expenses, and savings within a single application.

The application provides dashboards, charts, streak tracking, and progress reports that help users understand their habits and make informed decisions. The initial release focuses on secure account management, daily habit tracking, financial tracking, and progress visualization.

## Purpose and Target Audience

The application is intended for students, young adults, and individuals who are
building healthy and financial habits. It provides one place to record eating,
exercise, water intake, income, expenses, and savings progress without requiring
users to maintain separate personal trackers.

## User Scenarios & Testing

### User Story 1 - Create and Manage an Account (Priority: P0)

As a new or returning user, I want to create an account, sign in, and update my
profile so that my health and financial records remain associated with me and my
preferences stay current.

**Why this priority**: Account ownership and access control are prerequisites
for protecting personal wellness and financial information.

**Independent Test**: A tester can create a new account, sign in with the
account, update profile information, sign out, and sign in again to verify that
the updated profile is retained.

**Acceptance Scenarios**:

1. **Given** an unused email address and valid account details, **When** the user
   submits sign-up, **Then** an account is created and the user is informed that
   sign-up succeeded.
2. **Given** an existing account and valid credentials, **When** the user signs
   in, **Then** the user reaches their authenticated dashboard.
3. **Given** an authenticated user, **When** the user changes allowed profile
   fields with valid values, **Then** the updated profile is shown after saving
   and after the next sign-in.
4. **Given** invalid or already-used sign-up information, **When** the user
   submits the form, **Then** the account is not created and a clear validation
   message identifies the correction needed.

### User Story 2 - Record Daily Health Habits (Priority: P0)

As a user, I want to record daily eating, exercise, and water intake so that I
can build awareness of my routine and identify healthy patterns.

**Why this priority**: Daily health records are the core wellness value of the
application and establish the data needed for progress and streaks.

**Independent Test**: An authenticated tester can create, view, edit, and delete
one daily record for meals, exercise, and water intake, then verify that the
changes are reflected in the daily history.

**Acceptance Scenarios**:

1. **Given** an authenticated user on a selected date, **When** the user saves
   valid meal, exercise, or water information, **Then** the record is associated
   with that user and date and appears in the history.
2. **Given** an existing health record, **When** the user edits valid values,
   **Then** the updated values replace the previous values without creating an
   unintended duplicate.
3. **Given** an existing health record, **When** the user confirms deletion,
   **Then** the record is removed from the history and no longer contributes to
   progress summaries.
4. **Given** an invalid quantity, unsupported date, or missing required value,
   **When** the user submits the record, **Then** the record is rejected with a
   clear message and previously saved data is unchanged.

### User Story 3 - Record and Manage Finances (Priority: P0)

As a user, I want to record income, expenses, and savings so that I can
understand where my money goes and track progress toward savings goals.

**Why this priority**: Reliable financial records are essential to the
application's personal finance purpose and support meaningful summaries.

**Independent Test**: An authenticated tester can create, view, edit, and
delete an income, expense, and savings record, then verify that totals and the
record list reflect the changes.

**Acceptance Scenarios**:

1. **Given** an authenticated user and valid financial details, **When** the
   user creates an income, expense, or savings record, **Then** the record is
   stored under the correct category and date.
2. **Given** an existing financial record, **When** the user edits its valid
   amount, date, category, or note, **Then** summaries use the revised value.
3. **Given** an existing financial record, **When** the user confirms deletion,
   **Then** the record is removed and related totals are recalculated.
4. **Given** a negative, malformed, or otherwise invalid monetary amount, **When**
   the user submits the record, **Then** the record is rejected and no total is
   changed.

### User Story 4 - Review a Personal Dashboard (Priority: P1)

As an authenticated user, I want to view a dashboard with health and financial
summaries so that I can understand my current progress without reviewing every
individual record.

**Why this priority**: A combined summary turns individual entries into useful
feedback and encourages continued use of the tracker.

**Independent Test**: A tester with seeded health and financial records can open
the dashboard and verify that its totals, recent activity, charts, and trends
match the underlying records.

**Acceptance Scenarios**:

1. **Given** a user with records in the selected period, **When** the user opens
   the dashboard, **Then** the dashboard displays health progress, financial
   totals, recent activity, and savings progress for that period.
2. **Given** a user with no records in the selected period, **When** the user
   opens the dashboard, **Then** the dashboard shows zero or empty states with
   a clear way to add the first record.
3. **Given** a user viewing a dashboard period, **When** the user changes the
   period, **Then** all displayed summaries and charts use the newly selected
   period.

### User Story 5 - Review Statistics and Streaks (Priority: P1)

As an authenticated user, I want weekly and monthly statistics and habit streaks
so that I can measure consistency and see changes over time.

**Why this priority**: Trends and streaks provide motivation beyond individual
daily entries and help users evaluate progress.

**Independent Test**: A tester can seed records across consecutive and
non-consecutive dates, view weekly and monthly reports, and verify the displayed
statistics and streak boundaries.

**Acceptance Scenarios**:

1. **Given** records across a calendar period, **When** the user selects weekly
   statistics, **Then** the application displays totals and trends for each
   relevant week.
2. **Given** records across a calendar period, **When** the user selects monthly
   statistics, **Then** the application displays totals and trends for the
   selected month.
3. **Given** qualifying records on consecutive dates, **When** the user views
   streaks, **Then** the current and longest streaks are calculated and shown.
4. **Given** a missing qualifying day, **When** the user views streaks, **Then**
   the streak is ended at that day and later activity starts a new streak.

### User Story 6 - Recover from Errors and Protect Personal Data (Priority: P1)

As a user, I want clear errors and private records so that I can correct input
mistakes and trust the application with wellness and financial information.

**Why this priority**: Clear validation and isolation are necessary for a usable
and trustworthy personal data application.

**Independent Test**: A tester can submit invalid input, retry after correction,
and verify that one authenticated user cannot view or modify another user's
records.

**Acceptance Scenarios**:

1. **Given** invalid user input, **When** the user submits it, **Then** the
   application identifies the invalid field without discarding unrelated valid
   form values.
2. **Given** an unauthenticated request for protected data, **When** the request
   is made, **Then** access is denied and no personal record is returned.
3. **Given** two authenticated users, **When** one user requests the other
   user's record by identifier, **Then** the request is denied and the record is
   unchanged.

### Edge Cases

- Duplicate entries for the same user, date, and habit type must either update
  the existing daily value or be rejected consistently; they must not silently
  inflate totals.
- Dates must be interpreted consistently across the user's selected calendar
  date and must not shift records unexpectedly because of time-zone conversion.
- Empty dashboards and reports must provide useful zero or empty states rather
  than errors.
- Large values, zero values, decimal monetary values, and rounding boundaries
  must be handled without inaccurate displayed totals.
- Deleting a record that is already absent must return a safe not-found result
  and must not affect other records.
- Concurrent edits to the same record must not silently overwrite newer data
  without a clear result to the user.
- Invalid, expired, or missing authentication must not expose record contents.

## Requirements

### Functional Requirements

- **FR-001**: The system MUST allow a user to sign up, sign in, sign out, and
  update their profile.
- **FR-002**: The system MUST associate every health and financial record with
  exactly one authenticated user.
- **FR-003**: The system MUST allow users to create, view, update, and delete
  daily meal, exercise, and water-intake records.
- **FR-004**: The system MUST support health records for a user-selected calendar
  date and prevent unsupported future or malformed dates according to the
  product's validation rules.
- **FR-005**: The system MUST allow users to create, view, update, and delete
  income records.
- **FR-006**: The system MUST allow users to create, view, update, and delete
  expense records.
- **FR-007**: The system MUST allow users to create, view, update, and delete
  savings records and show savings progress over time.
- **FR-008**: The system MUST validate all user input before business logic or
  persistence and MUST return field-level errors for invalid input where
  applicable.
- **FR-009**: The system MUST prevent a user from reading, changing, or deleting
  another user's records.
- **FR-010**: The system MUST calculate health progress, financial totals, and
  savings summaries from the user's records for a selected period.
- **FR-011**: The system MUST provide a dashboard with summary cards, recent
  activity, charts, and selectable reporting periods.
- **FR-012**: The system MUST provide weekly and monthly statistics for health and
  financial activity.
- **FR-013**: The system MUST calculate current and longest habit streaks using
  the applicable qualifying daily records and clearly handle missing days.
- **FR-014**: The system MUST present empty, loading, validation, authorization,
  not-found, and server-error states in a way users can understand and recover
  from.
- **FR-015**: The system MUST preserve monetary accuracy for zero, decimal, and
  large amounts and MUST display the currency consistently.
- **FR-016**: The system MUST use the Next.js App Router and file-based routing,
  with Server Components by default and Client Components only where
  interactivity requires them.
- **FR-017**: The system MUST use TypeScript with strict mode, explicit types,
  and no production use of `any`.
- **FR-018**: The system MUST use Tailwind CSS with mobile-first responsive
  utility styling and consistent spacing, colors, and typography.
- **FR-019**: The system MUST use PostgreSQL with Prisma ORM, including proper
  relationships, constraints, and validation before persistence.
- **FR-020**: The system MUST provide resource-organized API routes for the core
  operations below:
  - Authentication: account creation, sign-in, sign-out, and profile updates
  - Habits: daily habit records and progress
  - Water intake: water records
  - Exercise: exercise records
  - Meals: meal records
  - Income: income records
  - Expenses: expense records
  - Savings: savings records and progress
  - Dashboard statistics: summaries, trends, and streaks
- **FR-021**: The project SHOULD include unit tests for business logic, API route
  tests for resource behavior and validation, and component tests where a
  component contains meaningful rendering or interaction logic.
- **FR-022**: Components MUST use PascalCase, variables and functions MUST use
  camelCase, and routes MUST use kebab-case.

### Key Entities

- **User**: An account owner with authentication credentials and profile data.
- **HabitRecord**: A user's daily health tracking record, including date and
  health activity values.
- **MealRecord**: A user's meal or healthy-eating entry for a selected date.
- **ExerciseRecord**: A user's exercise activity, duration or quantity, date, and
  optional notes.
- **WaterIntakeRecord**: A user's water intake quantity for a selected date.
- **IncomeRecord**: Money received by a user, including amount, date, source, and
  optional note.
- **ExpenseRecord**: Money spent by a user, including amount, date, category, and
  optional note.
- **SavingsRecord**: Money allocated toward savings, including amount, date, and
  optional goal information.
- **DashboardSummary**: A calculated view of health, financial, savings, trend,
  and streak information for a selected period; it is derived from records.

## Technical Requirements

- The application MUST use Next.js with the App Router.
- The application MUST use TypeScript with strict mode enabled.
- The application MUST use Tailwind CSS for utility-first, mobile-first styling.
- The application MUST use PostgreSQL for persistent relational data.
- The application MUST use Prisma ORM for database access and migrations.
- Server Components MUST be the default, and Client Components MUST be limited
  to required interactive behavior.
- All user-controlled input MUST be validated before persistence, and financial
  calculations MUST avoid floating-point inaccuracies.

## Implementation Priority

- **P0 - Core access and recording**: Authentication; user profile updates;
  creation, viewing, editing, and deletion of daily health records; creation,
  viewing, editing, and deletion of income, expense, and savings records; input
  validation; user data isolation; and the essential resource API routes.
- **P1 - Insight and trust**: Dashboard summaries; charts; weekly and monthly
  statistics; current and longest streaks; savings progress; empty and error
  states; and the tests required by the constitution.
- **P2 - Refinement and scale**: Additional report filters, richer trend views,
  improved accessibility and responsive polish, and future integrations or
  automation that do not change the P0 data model without review.

## Core API Endpoints

### Authentication

POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
PUT /api/auth/profile

### Health Tracking

GET /api/meals
POST /api/meals
PUT /api/meals/:id
DELETE /api/meals/:id

GET /api/exercise
POST /api/exercise
PUT /api/exercise/:id
DELETE /api/exercise/:id

GET /api/water
POST /api/water
PUT /api/water/:id
DELETE /api/water/:id

### Financial Tracking

GET /api/income
POST /api/income
PUT /api/income/:id
DELETE /api/income/:id

GET /api/expenses
POST /api/expenses
PUT /api/expenses/:id
DELETE /api/expenses/:id

GET /api/savings
POST /api/savings
PUT /api/savings/:id
DELETE /api/savings/:id

### Dashboard

GET /api/dashboard
GET /api/dashboard/stats
GET /api/dashboard/streaks

## Success Criteria

### Measurable Outcomes

- **SC-001**: At least 95% of valid sign-up and sign-in attempts complete with a
  clear success or actionable failure result within 3 seconds under normal
  operating conditions.
- **SC-002**: A user can create or update a daily health record in under 60
  seconds after reaching the relevant entry view.
- **SC-003**: A user can create an income or expense record in under 45 seconds
  after reaching the relevant entry view.
- **SC-004**: For a test dataset, 100% of dashboard totals, weekly statistics,
  monthly statistics, savings progress, and streak values match independently
  calculated expected results.
- **SC-005**: In usability testing, at least 90% of participants can complete
  sign-in, add one health record, add one financial record, and find their
  dashboard summary without assistance.
- **SC-006**: In authorization tests, 100% of attempts by one user to access or
  mutate another user's records are denied.
- **SC-007**: At least 95% of tested invalid submissions are rejected before
  persistence and identify the field or correction needed.
- **SC-008**: The primary tracking and dashboard workflows remain usable without
  horizontal scrolling at supported mobile and desktop viewport sizes.

## Assumptions

- The first release supports one primary currency per user profile; multi-
  currency conversion is outside this specification.
- Users enter their own health and financial records; importing external bank or
  wearable data is outside the initial scope.
- A user may edit or delete only records they own.
- Authentication uses a conventional email-based account flow; the detailed
  credential recovery and multi-factor authentication policy will be defined
  during planning if required by the deployment context.
- Reports use the user's selected calendar periods and a consistent application
  time zone.
- P0, P1, and P2 describe delivery order; each later priority must preserve the
  P0 data integrity and authorization guarantees.
