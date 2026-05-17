# 🎓 Ai_Project_2026 - University Management System with AI

**বিশ্ববিদ্যালয় ব্যবস্থাপনা সিস্টেম AI ইন্টিগ্রেশন সহ**

---

## 📌 প্রকল্প বর্ণনা

এটি একটি আধুনিক বিশ্ববিদ্যালয় ব্যবস্থাপনা সিস্টেম যা:
- ✅ সম্পূর্ণ প্রশাসনিক কাজ স্বয়ংক্রিয় করে
- ✅ কৃত্রিম বুদ্ধিমত্তা (Ollama/Hermes2) দিয়ে স্মার্ট সিদ্ধান্ত নেয়
- ✅ সব ধরনের ব্যবহারকারীদের সেবা দেয় (শিক্ষক, ছাত্র, প্রশাসক)

---

## 🛠️ প্রযুক্তি স্ট্যাক

| স্তর | প্রযুক্তি |
|------|----------|
| **Backend** | Java 25 LTS + Spring Boot 3.2 |
| **Frontend** | React + TypeScript |
| **Database** | PostgreSQL 15+ |
| **AI Engine** | Ollama + Hermes2 |
| **Authentication** | JWT Token |
| **Build Tool** | Maven 3.9+ |

---

## 📂 প্রজেক্ট স্ট্রাকচার

```
Ai_Project_2026/
├── backend/                    # Spring Boot Application
│   ├── pom.xml                # Maven Configuration
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/universityapp/
│   │   │   │       ├── config/         # Configuration Classes
│   │   │   │       ├── controller/     # REST Controllers
│   │   │   │       ├── service/        # Business Logic
│   │   │   │       ├── repository/     # Database Access
│   │   │   │       ├── model/          # Entity Classes
│   │   │   │       └── exception/      # Custom Exceptions
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/               # Unit Tests
│   └── .gitignore
├── frontend/                   # React Application
│   ├── package.json
│   ├── src/
│   └── .gitignore
├── database/                   # Database Schema
│   └── schema.sql
├── docs/                       # Documentation
│   ├── FEATURES.md
│   ├── API.md
│   └── SETUP.md
├── .gitignore
└── README.md
```

---

## 🚀 শুরু করার জন্য

### প্রয়োজনীয় সফটওয়্যার
```bash
✅ Java 25 LTS
✅ Maven 3.9+
✅ PostgreSQL 15+
✅ Git 2.50+
✅ Ollama (AI এর জন্য)
```

### ইনস্টলেশন স্টেপ

#### 1️⃣ প্রজেক্ট ক্লোন করুন
```bash
git clone https://github.com/Rohan24216063/Ai_Project_2026.git
cd Ai_Project_2026
```

#### 2️⃣ ডাটাবেস সেটআপ করুন
```bash
# PostgreSQL-এ নতুন ডাটাবেস তৈরি করুন
createdb university_db

# Schema লোড করুন
psql university_db < database/schema.sql
```

#### 3️⃣ Backend সেটআপ করুন
```bash
cd backend

# Dependencies ইন্সটল করুন
mvn clean install

# Application properties আপডেট করুন
# src/main/resources/application.properties-এ DB password পরিবর্তন করুন
```

#### 4️⃣ Ollama সেটআপ করুন (AI এর জন্য)
```bash
# Ollama ডাউনলোড করুন: https://ollama.ai

# Hermes2 মডেল টানুন
ollama pull hermes2

# Ollama সার্ভার চালু করুন
ollama serve
```

#### 5️⃣ Backend চালু করুন
```bash
# backend ফোল্ডারে থাকা অবস্থায়
mvn spring-boot:run

# সফল হলে: http://localhost:8080/api এ রেডি
```

---

## 📚 ফিচার ডকুমেন্টেশন

প্রতিটি ফিচারের জন্য আলাদা README ফাইল:

- 📖 [Authentication (লগইন/রেজিস্ট্রেশন)](./backend/features/authentication/README.md)
- 📖 [Student Management](./backend/features/student-management/README.md)
- 📖 [Course Management](./backend/features/course-management/README.md)
- (আরও ফিচার যোগ হবে...)

---

## 🔐 নিরাপত্তা

- ✅ JWT টোকেন ভিত্তিক authentication
- ✅ Role-based access control (RBAC)
- ✅ Password encryption (BCrypt)
- ✅ CORS নিরাপত্তা

---

## 📝 API ডকুমেন্টেশন

**বেসিক URLs:**
```
Base URL: http://localhost:8080/api

ফিচার যোগ হওয়ার সাথে সাথে এখানে UPDATE হবে
```

---

## 🧪 টেস্টিং

```bash
# সব টেস্ট চালান
mvn test

# নির্দিষ্ট টেস্ট ক্লাস চালান
mvn test -Dtest=AuthenticationServiceTest
```

---

## 🤝 অবদানকারী

- **Developer:** Rohan24216063
- **AI Integration:** Ollama/Hermes2
- **Period:** May 2026 - May 2026

---

## 📞 যোগাযোগ

- GitHub: [@Rohan24216063](https://github.com/Rohan24216063)
- Project Issues: GitHub Issues এর মাধ্যমে

---

## 📜 লাইসেন্স

এই প্রজেক্ট শিক্ষা উদ্দেশ্যে তৈরি।

---

## 📅 আপডেট লগ

| সংস্করণ | তারিখ | পরিবর্তন |
|---------|-------|----------|
| 1.0.0 | May 17, 2026 | প্রাথমিক সেটআপ |

---

**আপনার মতামত এবং পরামর্শ স্বাগত!** 💬
