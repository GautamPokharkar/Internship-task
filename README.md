# 🗂️ Voice AI Dashboard (Next.js)

A minimal full-stack dashboard built with **Next.js App Router**, **Tailwind CSS**, and local JSON storage. Designed for learning and showcasing frontend + basic backend skills.

---

## ✅ Features

- 🌐 Landing, Signup, Login, and Dashboard pages
- 🔐 State-based Auth (no JWT)
- 📝 Form handling with validation
- 📁 File-based user storage (`public/users.json`)
- 🔧 STT Configuration UI from `stt.json`


---

## 📄 Pages Overview

| Route                  | Description                                    |
|------------------------|------------------------------------------------|
| `/`                    | Minimal landing page with "Sign Up" CTA       |
| `/signup`              | Sign up form (username, email, password)      |
| `/login`               | Login via saved users (in `users.json`)       |
| `/dashboard`           | Protected page with sidebar + links           |
| `/dashboard/profile`   | View/update user info                         |
| `/dashboard/agent`     | 3-linked dropdowns via `stt.json`             |

---

## 🧰 Tech Stack

- [Next.js (App Router)]
- [Tailwind CSS]
- React Hooks: `useState`, `useEffect`
- File-based JSON storage

---


