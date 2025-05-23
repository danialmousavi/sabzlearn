# 🌱 SabzLearn

![Project Status](https://img.shields.io/badge/status-active-brightgreen.svg) ![License](https://img.shields.io/badge/license-MIT-blue.svg) ![React](https://img.shields.io/badge/frontend-React-61DAFB.svg) ![Node.js](https://img.shields.io/badge/backend-Node.js-339933.svg)

## 📚 Overview
SabzLearn is a dynamic, CMS-style educational platform designed for selling online courses. Users can register for courses, watch course videos, and leave comments. The admin panel allows creating courses and articles (using CKEditor), managing comments (view, reply, delete), and controlling user accounts.

---

## 📋 Table of Contents
- [Features](#-features)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features
- **Course Management** 📖: Users can enroll in courses and watch videos; admins can create and manage courses.
- **Article Creation** ✍️: Admins can create articles using CKEditor.
- **Comment System** 💬: Users can comment on courses; admins can view, reply to, or delete comments.
- **User Management** 👥: Admins can control user accounts.
- **Fully Dynamic** 🚀: All sections are dynamically managed via a single-page application (SPA).

---

## 🛠 Technologies
- **Frontend**: React, React Hooks ⚛️
- **Backend**: Node.js 🟢
- **Authentication**: JSON Web Tokens (JWT) 🔐
- **Database**: MongoDB (running on port 27017) 🍃
- **Editor**: CKEditor for article creation 📝
- **Architecture**: Single-Page Application (SPA) 🌐

---

## 🔧 Installation

### Prerequisites
- Node.js (version 20.18.1) 🟢
- MongoDB-robo3t (running on port 27017) 🍃

### Steps
```bash
# Clone the repository
git clone https://github.com/your-username/sabzlearn.git

# Navigate to the project directory
cd sabzlearn

# Install backend dependencies
cd backend
npm install
npm run dev (port 3000)
# Install FrontEnd dependencies
cd backend
npm install
npm start
