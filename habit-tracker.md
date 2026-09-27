3. Architecture & Design Planning 

A. Data Model Sketch 

Habit Tracker Data Model 

The Habit Tracker uses a relational data model in which the User is the central entity. Each authenticated user owns their health and financial records. The application uses PostgreSQL for persistent relational data and Prisma ORM for database access and migrations. 

 

 

The specification explicitly identifies MealRecord, ExerciseRecord, and WaterIntakeRecord for health tracking and IncomeRecord, ExpenseRecord, and SavingsRecord for financial tracking. The DashboardSummary is different because it is a calculated/derived view based on the user's underlying records rather than necessarily being a separate persistent entity. 

Relationships 

The main relationship is: 

User → Records = One-to-Many 

One user can have many meal, exercise, water intake, income, expense, and savings records. Each individual record belongs to exactly one authenticated user. This ownership requirement is explicitly stated in the functional requirements. 

 

User 1 ──────── * MealRecord 

User 1 ──────── * ExerciseRecord 

User 1 ──────── * WaterIntakeRecord 

User 1 ──────── * IncomeRecord 

User 1 ──────── * ExpenseRecord 

User 1 ──────── * SavingsRecord 

 

Color Palette 

Based on the implemented Header, Hero, and global styles, our primary palette is: 

Purpose 

Color 

Value / Tailwind 

Main background 

Slate blue-gray 

#344054 

Primary health/action 

Emerald 

emerald-600 

Primary hover 

Dark emerald 

emerald-700 

Hero CTA/accent 

Rose 

rose-600 

Main dark text 

Slate 

slate-900 

Secondary text 

Slate 

slate-500 

Light backgrounds 

Slate 

slate-100 

Borders 

Slate 

slate-200 / slate-300 

Hero heading 

Near white 

slate-50 

Hero supporting text 

Light cyan 

cyan-100 

Cards 

White 

white 

 

The dark blue-gray background provides contrast for the landing-page hero, while emerald is used as a major action and health-oriented accent. Rose provides additional emphasis for the hero's primary call to action. Neutral slate colors are used throughout cards, borders, navigation, charts, and secondary text. 

Typography 

The agreed font families are: 

Poppins-Used as the primary interface and body font because of its clean, modern appearance and readability. 

Play-Used as a complementary display font that can provide stronger visual distinction for branding and prominent headings. 

sans-serif — Used as the fallback font family. 

The Typography follows a clear hierarchy. Major hero headings range from text-4xl on smaller screens through sm:text-5xl and lg:text-6xl on larger screens. Supporting text uses comfortable sizes such as text-lg with leading-8, while navigation, labels, and dashboard descriptions use smaller text-sm and text-xs sizes. 

Layout Conventions 

The interface would use a centred responsive container with a maximum width of max-w-7xl. Horizontal padding increases with viewport size: 

Mobile:   px-4 

Small:    sm:px-6 

Desktop:  lg:px-8 

The landing page would use a single-column mobile layout that becomes a two-column layout on large screens. The Hero demonstrates this with lg:grid-cols-2, placing the main message and calls to action beside the dashboard preview on desktop. 

Cards use rounded corners such as rounded-xl and rounded-2xl, subtle borders, white backgrounds, and shadows to separate content without making the interface visually heavy. 

Spacing Conventions 

The team uses Tailwind's spacing system consistently instead of arbitrary CSS values. Common spacing includes: 

Small spacing:      gap-2 / gap-3 

Standard spacing:   gap-4 

Section spacing:    gap-12 

Card padding:       p-4 / p-5 

Button padding:     px-4 py-2 or px-6 py-3 

Section padding:    py-16 → md:py-20 → lg:py-24 

This creates predictable spacing across navigation, cards, buttons, dashboard elements, and page sections. 

Responsive Design 

The application follows a mobile-first responsive design. Navigation changes from a hamburger/mobile menu to the full desktop navigation at the lg breakpoint. The hero changes from one column to two columns at lg, and typography and spacing progressively increase on larger screens. 

 