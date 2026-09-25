# FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion built with Next.js. Browse a library of workouts, dive into detailed instructions, and build your daily training plan — all tracked live with badge counters and persisted across reloads.

## Technologies Used

- **Next.js (App Router)** — routing and page structure
- **TypeScript** — type-safe components and data models
- **Tailwind CSS** — styling and full responsive design
- **React Context API** — global state for Plan and Saved workouts
- **react-toastify** — toast notifications for user actions
- **localStorage** — persists plan/saved data across page reloads

## Features

1. **Dynamic Workout Library** — Fetches all workouts from a live API and displays them in a responsive 3-column grid with category tags, equipment, and stats.
2. **Workout Detail Pages** — Dynamic routing (`/workout/[id]`) shows a full breakdown of each lift: specs table, step-by-step instructions, and images.
3. **Live Plan & Saved Tracking** — Add workouts to today's plan or save them for later, with navbar badge counters that update instantly.
4. **My Plan Dashboard** — A dedicated page with live metrics (exercises, minutes, calories), tabbed views (Today's Plan / Saved), and the ability to mark workouts done or remove them.
5. **Persistent State** — Plan and saved data are stored in localStorage, so nothing is lost on page reload.
6. **Toast Notifications** — Real-time feedback for every action (add, save, remove, mark as done).
7. **Fully Responsive Design** — Works cleanly across mobile, tablet, and desktop screen sizes.
8. **Custom 404 Page** — Friendly error page for any unknown route.




## GitHub Repository

https://github.com/TunazzinaEmma2002/FITLOG

## Live Link
https://fitlog-plum-rho.vercel.app/
