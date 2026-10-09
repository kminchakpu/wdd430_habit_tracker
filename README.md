## Habit Tracker
## Project Description
Habit Tracker is a full-stack web application designed to help users manage important aspects of their health and personal finances from one centralized platform. The application allows authenticated users to record and monitor meals, exercise, water intake, income, expenses, and savings. It also provides dashboard summaries and analytics that help users understand their habits and financial activity over time.

The project is built with Next.js, TypeScript, Tailwind CSS, Prisma ORM, and PostgreSQL. Authentication is used to protect personal information and ensure that each user can access only their own records.



## Team Members
1. Kevin Cross Minchakpu
2. Kelsey Woodland
3. Saul Sebastian Bernal Sotelo
4. Maria Akumu


## Core Features
- User registration and login
- Authenticated user sessions
- User profile management
- Dashboard with selectable reporting periods
- Meal tracking
- Exercise tracking
- Water-intake tracking
- Income management
- Expense management
- Savings tracking
- Finance overview
- Monthly financial summaries
- Spending-category summaries
- Recent health and financial activity
- Analytics and charts
- Responsive user interface

## Technology Stack
- Frontend: Next.js, React, TypeScript
- Styling: Tailwind CSS
- Backend: Next.js Route Handlers
- Database: PostgreSQL
- ORM: Prisma
- Database Hosting: Neon
- Authentication: JWT-based authentication using HTTP-only cookies
- Testing: Vitest and React Testing Library
- Deployment: Vercel

## Local Setup Instructions
1. Clone the repository
git clone https://github.com/kminchakpu/wdd430_habit_tracker.git
cd wdd430_habit_tracker

2. Install dependencies
npm install

3. Configure environment variables
Create a .env file in the root of the project.
DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="your-secure-jwt-secret"

Do not commit the .env file or expose production credentials in the repository.
4. Generate the Prisma client
npx prisma generate

5. Start the development server
npm run dev

Open the local development URL displayed by Next.js in your browser.
6. Run tests
npm run test:run

7. Run lint
npm run lint

8. Verify the production build
npm run build

## Deployment Instructions
The application can be deployed using Vercel with the production PostgreSQL database hosted on Neon.
1. Push the latest application code to GitHub.
2. Import the GitHub repository into Vercel.
3. Add the required environment variables to the Vercel project:
   - DATABASE_URL
   - JWT_SECRET
4. Generate the Prisma client during the deployment process.
5. Deploy the application.
6. Verify registration, login, dashboard, health, finance, profile, and analytics functionality in the deployed application.

## Production URL: [VERCEL DEPLOYMENT URL](https://wdd430-habit-tracker.vercel.app/)

## API Route Documentation
The application uses Next.js Route Handlers for its backend API.

## Route	        Methods	 Purpose
/api/auth/register	POST	 Register a new user
/api/auth/login	    POST	 Authenticate a user
/api/auth/logout	POST	 Log the current user out
/api/auth/profile	GET, PUT	Retrieve or update the authenticated user's profile
/api/meals	        GET, POST	Retrieve and create meal records
/api/meals/[id]	    PATCH, DELETE	Update or delete a meal record
/api/exercise	    GET, POST	    Retrieve and create exercise records
/api/exercise/[id]	PATCH, DELETE	Update or delete an exercise record
/api/water	        GET, POST	    Retrieve and create water-intake records
/api/water/[id]	    PATCH, DELETE	Update or delete a water record
/api/income	        GET, POST	    Retrieve and create income records
/api/income/[id]	PATCH, DELETE	Update or delete an income record
/api/expenses	    GET, POST	    Retrieve and create expense records
/api/expenses/[id]	PATCH, DELETE	Update or delete an expense record
/api/savings	    GET, POST	    Retrieve and create savings records
/api/savings/[id]	PATCH, DELETE	Update or delete a savings record


Protected API routes use the authenticated user's ID when querying records so that users access only records associated with their accounts.

## Main Application Routes
Page            Purpose
/	            Application home page
/register	    User registration
/login	        User login
/dashboard	    Overall health and financial summary
/health	        Health overview
/exercise	    Exercise management
/water	        Water-intake management
/finances	    Overall financial summary
/income	        Income management
/expenses	    Expense management
/savings	    Savings management
/analytics	    Health and financial analytics
/profile	    User profile management


## Known Issues and Opportunities
The current application provides the core health and financial tracking functionality, but there are several opportunities for continued development:
- Expand automated testing to cover complete API and page-level workflows.
- Add more detailed analytics and reporting periods.
- Improve financial visualizations and trend comparisons.
- Add customizable health targets rather than relying on fixed goals.
- Add configurable currency preferences instead of using a single application currency.
- Improve timezone-aware date handling for users in different locations.
- Add stronger user-facing handling for unexpected server or network errors.
- Improve accessibility testing across forms, charts, navigation, and interactive elements.
- Add additional profile and account-management options.
- Continue improving responsive layouts for smaller screens.

## Product Demo Summary
Habit Tracker solves the problem of having personal health and financial information scattered across different tools. Instead of requiring users to maintain separate records for exercise, meals, water intake, income, expenses, and savings, the application brings these activities together in one authenticated dashboard. The intended users are individuals who want a simple way to develop greater awareness of both their physical habits and personal finances without needing several separate tracking applications.

The most important user flow begins when a user creates an account and signs in. After authentication, the user can record health information such as meals, exercise, and water intake and financial information such as income, expenses, and savings. The dashboard transforms these individual records into useful summaries, recent activity, and charts, while dedicated Health, Finance, and Analytics sections provide more focused views. Users can also select different dashboard reporting periods to understand how their activity changes over time.

The primary value of the application is that the information users enter becomes more useful than a collection of individual records. For example, the Finance overview combines income, expenses, and savings to show the user's available balance, current-month activity, recent transactions, and major spending categories. Similarly, health information can be summarized to help users understand their activity and progress. By combining tracking, visualization, and authenticated personal data in one application, Habit Tracker gives users a clearer picture of their habits and helps them make more informed health and financial decisions.

## Test the App
Use this login detail to login and test the app

email: esther@outlook.com
password: Password!