# 🐳 Docker Setup Guide

**Docker দিয়ে PostgreSQL চালানোর সম্পূর্ণ গাইড**

---

## ✅ Docker ইনস্টল করা আছে কিনা চেক করুন

```bash
docker --version
docker-compose --version
```

যদি ইনস্টল না থাকে: **https://www.docker.com/products/docker-desktop**

---

## 🚀 ডাটাবেস চালু করুন (এক কমান্ডে!)

### **সহজ উপায়:**

```bash
# প্রজেক্ট রুট ফোল্ডারে যান
cd Ai_Project_2026

# Docker Compose চালু করুন
docker-compose up -d

# স্ট্যাটাস চেক করুন
docker-compose ps
```

**বাস! PostgreSQL চলছে!** ✅

---

## 📊 ডাটাবেস কানেক্ট করুন

### **Option-1: DBeaver (GUI Tool)**

```
Connection Settings:
├─ Host: localhost
├─ Port: 5432
├─ Database: university_db
├─ Username: postgres
├─ Password: postgres123
```

### **Option-२: psql Command Line**

```bash
psql -h localhost -U postgres -d university_db
```

### **Option-३: Spring Boot (স্বয়ংক্রিয়)**

Backend চালু করলে স্বয়ংক্রিয়ভাবে কানেক্ট হবে:
```bash
cd backend
mvn spring-boot:run
```

---

## 🛑 ডাটাবেস বন্ধ করুন

```bash
# Container থেমে দেওয়া
docker-compose stop

# Container পুরোপুরি সরানো
docker-compose down

# ডাটা ডিলিট সহ সবকিছু সরানো
docker-compose down -v
```

---

## 🔍 Logs দেখুন (ট্রাবলশুট করতে)

```bash
# সব লগ দেখুন
docker-compose logs

# PostgreSQL-এর লগ দেখুন
docker-compose logs postgres

# লাইভ লগ দেখুন
docker-compose logs -f postgres
```

---

## 💾 ডাটা ব্যাকআপ নিন

```bash
# ডাটাবেস ডাম্প করুন
docker exec university_postgres pg_dump -U postgres university_db > backup.sql

# ডাটাবেস রিস্টোর করুন
docker exec -i university_postgres psql -U postgres university_db < backup.sql
```

---

## 🎯 আমাদের সেটআপে কী করছি?

```yaml
docker-compose.yml:
├─ PostgreSQL 16 (Alpine - হালকা)
├─ Port: 5432
├─ Username: postgres
├─ Password: postgres123
├─ Database: university_db
├─ Volume: postgres_data (ডাটা সংরক্ষণ)
└─ Health Check: স্বয়ংক্রিয় পরীক্ষা
```

---

## ⚡ দ্রুত শুরু করুন:

```bash
# ১. Docker চালু করুন
docker-compose up -d

# २. Backend চালু করুন (নতুন টার্মিনাল)
cd backend && mvn spring-boot:run

# ३. Backend রেডি
# ✅ http://localhost:8080/api
```

---

## 🆘 সমস্যা হলে:

### **ডাটাবেস কানেক্ট না হচ্ছে?**
```bash
# Container লগ দেখুন
docker-compose logs postgres

# Container পুনরায় শুরু করুন
docker-compose restart postgres
```

### **Port 5432 ব্যস্ত?**
```bash
# docker-compose.yml এ পোর্ট পরিবর্তন করুন:
# ports:
#   - "5433:5432"  # এভাবে
```

### **সম্পূর্ণ রিসেট করতে:**
```bash
docker-compose down -v
docker-compose up -d
```

---

**এটাই সবচেয়ে সহজ এবং পেশাদার উপায়!** 🎉
