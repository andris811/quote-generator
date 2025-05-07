# 🧠 QuoteLift

A simple, responsive quote generator app built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**. It fetches random quotes, allows users to save favorites (in `localStorage`), and share quotes to X (Twitter).

<!-- ![screenshot](./screenshot.png) -->

---

## 🚀 Features

- 📝 Fetch a random quote from a public API
- ⭐ Save quotes to localStorage as favorites
- 🗑️ Remove saved quotes
- 📤 Share quotes to Twitter
- 📱 Fully responsive layout with Tailwind

---

## 🔧 Tech Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

---

## 📦 Installation

```bash
git clone https://github.com/your-username/quote-generator.git
cd quote-generator
npm install
npm run dev
```

## 🛠 Folder Structure
```less
src/
  components/     // Reusable UI components like QuoteCard and Favorites
  types/          // TypeScript types
  utils/          // Fetch logic
  App.tsx         // Main component
  index.css       // Tailwind setup
  main.tsx        // Entry point
```

## 🌐 API Source
Quotes are fetched from [dummyjson.com](https://dummyjson.com/quotes/random).

## 📜 License
MIT — Feel free to use, modify, and share!

## 🙌 Acknowledgments
Built by Andras Varga during a 2-day micro project to practice state, props, fetch logic, and styling with Tailwind.