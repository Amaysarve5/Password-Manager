# PassOp – Password Manager

PassOp is a full-stack password manager application with a React + Vite + TailwindCSS frontend and a Node.js + Express + MongoDB backend.

## Features

- Add, edit, and delete passwords securely
- Responsive and modern UI with TailwindCSS
- Copy username and password to clipboard
- Animated icons for actions
- Data stored in MongoDB Atlas via backend API

## Project Structure

```
Password_manager-mongo/
├── backend/
│   ├── .env
│   ├── package.json
│   └── server.js
├── Frontend/
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   ├── vite.config.js
│   ├── public/
│   │   ├── vite.svg
│   │   └── Icons/
│   │       ├── crosseye.svg
│   │       ├── eye.svg
│   │       └── github.png
│   └── src/
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── assets/
│       │   └── react.svg
│       └── Components/
│           ├── Footer.jsx
│           ├── Manager.jsx
│           └── Navbar.jsx
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Backend Setup

1. Go to the `backend` directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file with your MongoDB URI and port (see `.env` example in repo).
4. Start the backend server:
   ```sh
   node server.js
   ```
   The backend runs on [http://localhost:3000](http://localhost:3000).

### Frontend Setup

1. Go to the `Frontend` directory:
   ```sh
   cd Frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
   The frontend runs on [http://localhost:5173](http://localhost:5173) by default.

## Usage

- Open the frontend in your browser.
- Add, edit, or delete passwords.
- All data is stored in MongoDB Atlas via the backend API.

## Author

- [Amay Sarve](https://github.com/Amaysarve5)

---

This project uses [React](https://react.dev/), [Vite](https://vitejs.dev/), [TailwindCSS](https://tailwindcss.com/), [Express](https://expressjs.com/), and [MongoDB Atlas](https://www.mongodb.com/atlas).
