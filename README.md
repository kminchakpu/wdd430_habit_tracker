## Team Members
1. Kevin Cross Minchakpu
2. Kelsey Woodland
3. Saul Sebastian Bernal Sotelo
4. Maria Akumu


## Product Overview
Habit Tracker is a full-stack web application designed to help users manage important aspects of their health and personal finances from one centralized platform. The application allows authenticated users to record and monitor meals, exercise, water intake, income, expenses, and savings. It also provides dashboard summaries and analytics that help users understand their habits and financial activity over time.

The project is built with Next.js, TypeScript, Tailwind CSS, Prisma ORM, and PostgreSQL. Authentication is used to protect personal information and ensure that each user can access only their own records.

Habit Tracker solves the problem of having personal health and financial information spread across multiple tools. Instead of using separate applications to track meals, exercise, water intake, income, expenses, and savings, users can manage these activities through one centralized application. The intended users are individuals who want a simple way to monitor their everyday health habits and personal finances.

The primary user flow begins with account registration and authentication. After signing in, users can record health activities such as meals, exercise, and water intake and financial activities such as income, expenses, and savings. The dashboard brings this information together through summaries, recent activity, charts, and selectable reporting periods.

The main value of Habit Tracker is that it turns individual records into useful information. The Finance overview, for example, combines income, expenses, and savings to display balances, monthly activity, spending categories, and recent transactions. Health and analytics features similarly help users understand their activity over time. This gives users a clearer view of their habits and supports more informed health and financial decisions.

## Key Features

- User registration and authentication
- Protected user-specific data
- User profile management
- Dashboard with health and financial summaries
- Selectable dashboard reporting periods
- Meal tracking
- Exercise tracking
- Water-intake tracking
- Income management
- Expense management
- Savings tracking
- Financial overview and monthly summaries
- Spending-category summaries
- Recent health and financial activity
- Analytics and data visualization
- Responsive user interface

## Technology Stack

- **Framework:** Next.js
- **Frontend:** React and TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Next.js Route Handlers
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Database Hosting:** Neon
- **Authentication:** JWT authentication with HTTP-only cookies
- **Testing:** Vitest and React Testing Library
- **Deployment:** Vercel

## Getting Started

### Prerequisites

Before running the application locally, install:

- Node.js
- npm
- Git
- Access to a PostgreSQL database

### 1. Clone the Repository

```bash
git clone https://github.com/kminchakpu/wdd430_habit_tracker.git
cd wdd430_habit_tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and add the required environment variables:

```env
DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="your-secure-jwt-secret"
```

Do not commit `.env` or production credentials to the repository.

### 4. Generate the Prisma Client

```bash
npx prisma generate
```

### 5. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed by Next.js in your browser.

## Testing and Verification

Run the automated test suite:

```bash
npm run test:run
```

Run ESLint:

```bash
npm run lint
```

Verify the production build:

```bash
npm run build
```

The application should pass tests, linting, and the production build before deployment.

## Deployment

The application is deployed with Vercel and uses a PostgreSQL database hosted on Neon.

### Deployment Steps

1. Push the latest code to the GitHub repository.
2. Import the repository into Vercel.
3. Configure the required environment variables in Vercel:
   - `DATABASE_URL`
   - `JWT_SECRET`
4. Deploy the application.
5. Verify authentication and protected routes.
6. Verify health and finance CRUD operations.
7. Verify the dashboard and analytics using production data.

### Production Application

Deployment URL: https://wdd430-habit-tracker.vercel.app/

## Application Routes

| Route              | Description |

| `/`                | Application home page |
| `/register`        | Create a user account |
| `/login`           | Sign in to an existing account |
| `/dashboard`       | View overall health and financial summaries |
| `/health`          | View health information |
| `/exercise`        | Manage exercise records |
| `/water`           | Manage water-intake records |
| `/finances`        | View financial summaries and recent activity |
| `/income`          | Manage income records |
| `/expenses`        | Manage expense records |
| `/savings`         | Manage savings records |
| `/analytics`       | View health and financial analytics |
| `/profile`         | View and update the user profile |

## API Documentation

Habit Tracker uses Next.js Route Handlers to provide backend API functionality. Protected routes use the authenticated user's ID to ensure records are scoped to the correct account.

### Authentication

| Endpoint                 | Method             | Description |
|---|---|---|
| `/api/auth/register`     | `POST`             | Register a new user |
| `/api/auth/login`        | `POST`             | Authenticate a user |
| `/api/auth/logout`       | `POST`             | End the current user's session |
| `/api/auth/profile`      | `GET`              | Retrieve the authenticated user's profile |
| `/api/auth/profile`      | `PUT`              | Update the authenticated user's profile |

### Meals

| Endpoint           | Method             | Description |

| `/api/meals`       | `GET`              | Retrieve the user's meal records |
| `/api/meals`       | `POST`             | Create a meal record |
| `/api/meals/[id]`  | `PATCH`            | Update a meal record |
| `/api/meals/[id]`  | `DELETE`           | Delete a meal record |

### Exercise

| Endpoint              | Method          | Description |

| `/api/exercise`       | `GET`           | Retrieve exercise records |
| `/api/exercise`       | `POST`          | Create an exercise record |
| `/api/exercise/[id]`  | `PATCH`         | Update an exercise record |
| `/api/exercise/[id]`  | `DELETE`        | Delete an exercise record |

### Water Intake

| Endpoint              | Method | Description |

| `/api/water`          | `GET` | Retrieve water-intake records |
| `/api/water`          | `POST` | Create a water-intake record |
| `/api/water/[id]`     | `PATCH` | Update a water-intake record |
| `/api/water/[id]`     | `DELETE` | Delete a water-intake record |

### Income

| Endpoint           | Method             | Description |
|---|---|---|
| `/api/income`      | `GET`              | Retrieve income records |
| `/api/income`      | `POST`             | Create an income record |
| `/api/income/[id]` | `PATCH`            | Update an income record |
| `/api/income/[id]` | `DELETE`           | Delete an income record |

### Expenses

| Endpoint              | Method          | Description |
|---|---|---|
| `/api/expenses`       | `GET`           | Retrieve expense records |
| `/api/expenses`       | `POST`          | Create an expense record |
| `/api/expenses/[id]`  | `PATCH`         | Update an expense record |
| `/api/expenses/[id]`  | `DELETE`        | Delete an expense record |

### Savings

| Endpoint              | Method          | Description |
|---|---|---|
| `/api/savings`        | `GET`           | Retrieve savings records |
| `/api/savings`        | `POST`          | Create a savings record |
| `/api/savings/[id]`   | `PATCH`         | Update a savings record |
| `/api/savings/[id]`   | `DELETE`        | Delete a savings record |

## Data Security

Habit Tracker protects user data through authentication and user-scoped database queries. Health and financial records are associated with a specific user account, and protected operations require an authenticated session.

Authentication tokens are stored using HTTP-only cookies, helping prevent client-side JavaScript from directly accessing the session token.

Sensitive configuration values such as database credentials and JWT secrets are stored in environment variables rather than committed to source control.

## Known Issues and Opportunities

The current application implements its core health and finance tracking requirements. Future improvements could include:

- Expand automated testing for complete API and page-level workflows.
- Add customizable health targets instead of relying on fixed goals.
- Add user-configurable currency preferences.
- Improve timezone-aware date handling for users in different regions.
- Expand analytics with additional trends and comparisons.
- Add more detailed financial reports.
- Improve user-facing network and server error handling.
- Expand accessibility testing for forms, navigation, and charts.
- Add additional profile and account-management options.
- Continue improving responsive layouts for smaller screens.

## Product Demo

The product demonstration covers the application's primary user flow:

1. Sign in to an authenticated user account.
2. Review health and financial information on the Dashboard.
3. Change the Dashboard reporting period.
4. View and manage health records, including exercise and water intake.
5. View and manage income, expenses, and savings.
6. Review the Finance overview, monthly summary, spending categories, and recent activity.
7. View Analytics to understand health and financial trends.

The demo highlights how Habit Tracker transforms individual records into useful summaries that help users better understand their health habits and personal finances.

## Project Structure

The application follows the Next.js App Router architecture. Major areas of the project include:


app/
├── api/                 # API route handlers
├── (dashboard)/         # Protected application pages
├── login/               # Login page
└── register/            # Registration page

components/
├── auth/                # Authentication and profile components
├── dashboard/           # Dashboard components
└── ui/                  # Reusable UI components

lib/
├── auth.ts              # Authentication utilities
├── dashboard.ts         # Dashboard calculations and transformations
└── prisma.ts            # Prisma database client

prisma/
└── schema.prisma        # Database models


## Repository

GitHub: `kminchakpu/wdd430_habit_tracker`

## License

This project was developed as part of the WDD 430 course project.

## Test the App
Use this login detail to login and test the app

email: esther@outlook.com
password: Password!