# Revathi C – Personal Portfolio (MERN)

This project converts the four supplied static portfolio pages (Home, About Me, Skills, Contact) into a React application backed by Node.js, Express, MongoDB, Mongoose and Axios.

## Requirements
- Node.js LTS
- MongoDB Community Server running locally
- VS Code

## 1. Start MongoDB
Start your local MongoDB service. The default connection is:
`mongodb://127.0.0.1:27017/RevathiPortfolioDB`

## 2. Start the backend
In terminal 1:
```bash
cd backend
npm install
```
Copy `.env.example` to `.env` (or create `.env` with the same values), then run:
```bash
npm run dev
```
Backend: `http://localhost:5000`
Portfolio API: `http://localhost:5000/api/portfolio`

The backend seeds the portfolio details supplied in the prompt if no portfolio document exists.

## 3. Start the frontend
In terminal 2:
```bash
cd frontend
npm install
npm run dev
```
Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## Features
- React Router pages: Home, About Me, Skills, Contact
- Axios GET request retrieves portfolio content from MongoDB
- React `useState`, `useEffect` and `map()` render dynamic sections
- Contact form POST endpoint stores messages in MongoDB
- Responsive layout

## API endpoints
- `GET /api/portfolio` – retrieve portfolio data
- `POST /api/messages` – save a contact form message

## Important notes
- The original `style.css` file was referenced in the HTML but was not included in the message. `frontend/src/App.css` therefore provides a fresh responsive style inspired by the supplied page structure; it cannot reproduce the exact original styling without that CSS file.
- The supplied phone number, email and address are included in the sample database seed. Review them before publishing. Consider whether you want your full home address and phone number publicly visible.
- The contact form stores messages in MongoDB. It does not send email notifications.
- This starter does not include an admin dashboard or authentication.
