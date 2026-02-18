# Protocol 66 - Patient Web App

> **אפליקציית מטופלים למעקב תרופתי - React + TypeScript + Tailwind**

---

## 🚀 התקנה מהירה

### דרישות מקדימות
- Node.js 18+ מותקן
- Backend רץ על http://localhost:8000

### צעדים:

```bash
# 1. התקן dependencies
npm install

# 2. הרץ את האפליקציה
npm run dev
```

**זהו! האפליקציה תעלה על http://localhost:3000** 🎉

---

## 📱 מה יש באפליקציה?

### עמודים:
- ✅ **Login** - Magic Link (קוד SMS)
- ✅ **Home** - מסך ראשי עם מעקב יומי
- ✅ **Camera** - צילום תרופות + AI verification
- ✅ **Mood** - דיווח מצב רוח (5 רמות)
- ✅ **History** - היסטוריית תרופות
- ✅ **Settings** - הגדרות והתנתקות

---

## 🔌 Integration עם Backend

האפליקציה מתחברת ל-API שלך:

```typescript
// Default: http://localhost:8000
const API_URL = "http://localhost:8000";

// Endpoints:
POST /api/v1/auth/send-magic-link
POST /api/v1/auth/verify-token
GET  /api/v1/meds/daily-plan
POST /api/v1/meds/verify-intake
POST /api/v1/mood/check-in
GET  /api/v1/meds/history
```

---

## 🎨 Features

- ⚡ **Vite** - מהיר במיוחד
- ⚛️ **React 18** + TypeScript
- 🎨 **Tailwind CSS** - עיצוב מודרני
- 🔐 **JWT Authentication** 
- 📱 **Responsive** - עובד על כל מכשיר
- 🌙 **Dark Mode** support
- 🇮🇱 **RTL** - תמיכה בעברית
- 📸 **Webcam** integration
- 🎭 **Framer Motion** - אנימציות

---

## 📦 Structure

```
src/
├── components/     # Layout, shared components
├── pages/          # All pages (Login, Home, Camera...)
├── services/       # API calls
├── store/          # Zustand state management
├── types/          # TypeScript types
└── utils/          # Helper functions
```

---

## 🛠️ Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## ⚙️ Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

---

## 🐛 Troubleshooting

### Backend לא עובד?
וודא שהBackend רץ על http://localhost:8000

```bash
cd ../protocol66
npm run start:dev
```

### Port 3000 תפוס?
שנה ב-`vite.config.ts`:
```typescript
server: {
  port: 3001  // או כל port אחר
}
```

---

## 📝 Testing Flow

1. **Login:**
   - הכנס מספר טלפון: `+972501234567`
   - בקונסול של Backend תראה את הקוד (בפיתוח)
   - הזן את הקוד

2. **Home Screen:**
   - ראה את רשימת התרופות
   - מעקב streak
   - התקדמות יומית

3. **Camera:**
   - אפשר גישה למצלמה
   - צלם תרופה
   - קבל אישור מיידי

4. **Mood:**
   - בחר emoji
   - שמור

---

## 🚀 Deploy

### Vercel (מומלץ):
```bash
npm run build
vercel
```

### Netlify:
```bash
npm run build
# Upload dist/ folder
```

---

## 🤝 Backend Connection

וודא שה-Backend שלך מאפשר CORS:

```typescript
// In backend (src/main.ts):
app.enableCors({
  origin: 'http://localhost:3000',
  credentials: true,
});
```

---

## 📄 License

Proprietary - Protocol 66

---

**Built with ❤️ for better medication adherence**
