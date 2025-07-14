# Bankist App (React Migration)

This project is a migration of the original Bankist JavaScript app (HTML/CSS/JS) to a modern React application. The goal is to demonstrate how to refactor a vanilla JS project into a component-based, state-driven React app, preserving all original features and UI/UX.

## Features

- User login with demo accounts
- View account balance, transaction history, and summary (in/out/interests)
- Transfer money between users
- Request a loan (with eligibility check)
- Close account (delete user)
- Automatic logout timer for security
- Sorting of transactions
- Responsive and modern UI (original Bankist design)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal).

## Demo Credentials

You can use the following demo users to log in and test all features:

| Name              | Username | PIN  |
| ----------------- | -------- | ---- |
| Jonas Schmedtmann | js       | 1111 |
| Jessica Davis     | jd       | 2222 |

- **Username**: The initials of the user's name (all lowercase).
- **PIN**: As shown above.

## Project Structure

- `src/components/Bankist/` — All React components for the Bankist app
- `src/components/Bankist/accounts.js` — Demo account data
- `src/components/Bankist/BankistApp.js` — Main app logic and state
- `src/components/Bankist/BankistApp.css` — Styles (migrated from original CSS)

## Technical Details

- React functional components and hooks (`useState`, `useEffect`, `useMemo`)
- State management for accounts, session, timer, and UI feedback
- All business logic (transfers, loans, close account, timer) migrated from the original JS
- No backend: all data is in-memory and resets on reload

## Credits

- Original design and logic by Jonas Schmedtmann (as part of his JavaScript course)
- React migration and refactor by MindTzijib

---

Feel free to explore, test, and extend the app!
