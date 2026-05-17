# 🎓 University Management System - Frontend

বিশ্ববিদ্যালয় ব্যবস্থাপনা সিস্টেমের React ফ্রন্টএন্ড।

## 📋 Features (প্রাথমিক পর্যায়)

✅ **Login Page** - ইমেইল এবং পাসওয়ার্ড দিয়ে লগইন  
✅ **Register Page** - ছাত্র হিসেবে রেজিস্ট্রেশন  
✅ **Form Validation** - Client-side validation  
✅ **API Integration** - Backend API-তে কানেক্ট  
✅ **JWT Authentication** - Token-based auth  
✅ **Responsive Design** - Mobile-first approach  
✅ **Bengali Language** - সম্পূর্ণ বাংলায়  

## 🚀 শুরু করা

### Prerequisites
- Node.js 18+ (বা npm)
- npm 9+

### Installation

```bash
# Frontend folder-এ যান
cd frontend

# Dependencies ইনস্টল করুন
npm install

# Development সার্ভার চালান
npm run dev
```

Frontend এখন চলবে: **http://localhost:5173**

### Environment Variables

Frontend folder-এ `.env` ফাইল তৈরি করুন (প্রয়োজন হলে):

```
VITE_API_URL=http://localhost:8080/api
```

## 📁 ফোল্ডার স্ট্রাকচার

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Login.jsx         ← Login component
│   │   └── Register.jsx      ← Register component (Student)
│   ├── api/
│   │   ├── apiClient.js      ← Axios configuration
│   │   └── authAPI.js        ← Auth API calls
│   ├── App.jsx               ← Main app component
│   ├── main.jsx              ← Entry point
│   └── index.css             ← Tailwind CSS
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 ডিজাইন

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Form Handling:** React Hook Form
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Validation:** Built-in validation

## 🔐 Authentication Flow

```
User Login
    ↓
Email + Password → Backend API
    ↓
Backend validates + generates JWT
    ↓
Frontend stores token in localStorage
    ↓
All future requests include token in headers
```

## 📝 API Endpoints (Backend)

### Authentication

```
POST /api/auth/login
- Email, Password পাঠান
- Token + User info পাবেন

POST /api/auth/register/student
- Student details পাঠান
- User created
```

## 🧪 Testing

### Local Testing

1. **Login Page Test:**
   - URL: http://localhost:5173/login
   - Demo Email: admin@university.edu
   - Demo Password: password123

2. **Register Page Test:**
   - URL: http://localhost:5173/register
   - সব ফিল্ড fill করুন
   - Registration submit করুন

### With Postman

Backend API-কে Postman-এ টেস্ট করতে পারেন (Frontend ছাড়াই)

## 🐛 Common Issues

### API Connection Error
```
Error: Cannot find module or Network Error
→ নিশ্চিত করুন Backend চলছে (localhost:8080)
→ CORS configuration চেক করুন
```

### Form Validation Issues
```
Error: Invalid email format
→ সঠিক ইমেইল format ব্যবহার করুন
→ পাসওয়ার্ড: Capital, small, numbers
```

## 🚀 Phase-wise Frontend Development

```
Phase-१: Login & Register Pages ✅ (Current)
Phase-२: Student Dashboard (Soon)
Phase-३: Staff/Teacher Portals (Soon)
Phase-४: Analytics & Reports (Soon)
Phase-५: Real-time Features (Soon)
```

## 📦 Build for Production

```bash
npm run build
```

এটি `dist/` folder-এ optimized build তৈরি করবে।

## 📧 Support

Backend Team-এ যোগাযোগ করুন যদি API issues থাকে।

---

**Made with ❤️ for University Management System**
