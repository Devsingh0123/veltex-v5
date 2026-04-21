# Veltex Backend Setup Guide 🚀

Yeh backend **Node.js, Express aur MySQL** par based hai.

## 🛠️ Setup Instructions

### 1. MySQL Database Setup
- **MySQL Workbench** open karein.
- `setup_db.sql` file ka code copy karke run karein. Isse `veltex_db` aur `contact_submissions` table ban jayenge.

### 2. Environment Variables (.env)
- `backend/.env` file open karein.
- `DB_USER` (default: root) aur `DB_PASSWORD` (aapka MySQL password) check karein ki sahi hai ya nahi.

### 3. Server Start Karein
Ab ek naya terminal open karein aur ye commands chalayein:
```bash
cd backend
npm run dev
```
Server `http://localhost:5000` par start ho jayega.

## 📡 API Endpoints

- **POST `/api/contact`**: Frontend se form data bhejta hai (ContactPage.jsx se linked hai).
- **GET `/api/contact`**: Saare submissions retrieve karne ke liye (Browser mein test kar sakte hain).

## 📂 Folder Structure
- `config/`: Database connection logic.
- `controllers/`: Actual functionality (Data save/get).
- `routes/`: URL path define karte hain.
- `server.js`: Poore system ka brain.
