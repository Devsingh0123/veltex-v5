-- -------------------------------------------------------
-- SETUP DATABASE SCRIPT
-- -------------------------------------------------------
-- Iss script ko copy karein aur MySQL Workbench mein run karein.
-- Yeh script 'veltex_db' database aur uske andar 'contact_submissions' table banayega.

-- 1. Database banayein (agar pehle se nahi hai)
CREATE DATABASE IF NOT EXISTS veltex_db;

-- 2. Database select karein
USE veltex_db;

-- 3. 'contact_submissions' table banayein
-- id: Har entry ko ek unique number milega (Auto Increment)
-- name, email, service, message: Form ka data
-- created_at: Kab message aaya (Automatic timestamp)
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    service VARCHAR(100),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Check karein ki table sahi se bana ya nahi
DESCRIBE contact_submissions;
