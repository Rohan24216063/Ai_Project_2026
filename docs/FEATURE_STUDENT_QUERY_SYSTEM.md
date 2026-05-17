# 🎓 Department Student Query System - Complete Feature Design

**AI-Powered Student Query Handling সহ Department Management**

---

## 📊 **System Overview**

```
STUDENTS                DEPARTMENT STAFF              TEACHERS              DEPT HEAD
   │                          │                           │                    │
   │                          │                           │                    │
   └─→ Ask Question ─→ Knowledge Base (AI) ─────→ Direct Communication ◄─ Monitor All
       │                       │                           │                    │
       │                   Confidence                  If Needed               └─ Reports
       │                   ≥ 70% ✅                                               
       │                       │
       ├─→ Get Answer (3-5 sec)
       │
       └─→ If Confidence < 70%
           → Create Ticket
           → Route to Staff/Teacher
           → Staff Updates KB
           → Ticket Resolved
           → Student Gets Answer
```

---

## **👥 Role-Based System Architecture**

### **1️⃣ STUDENT (ছাত্র/ছাত্রী)**

#### 📱 **Student Dashboard Pages**

```
┌─────────────────────────────────────────┐
│         STUDENT PORTAL                  │
├─────────────────────────────────────────┤
│                                          │
│  ┌──────────────────────────────────┐  │
│  │  Ask a Question                   │  │
│  │  [____________ Search Bar ______] │  │
│  │  [  Ask New Question  ]           │  │
│  └──────────────────────────────────┘  │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │  Recent Queries & Status         │  │
│  │  ─────────────────────────────  │  │
│  │  Q#1: "ড্রপ ডেট কী?"             │  │
│  │  Status: ✅ ANSWERED (AI)        │  │
│  │  Answer: "৩০ মে, ২০২৬"          │  │
│  │                                   │  │
│  │  Q#2: "গ্রেড অ্যাপিল কীভাবে?"     │  │
│  │  Status: ⏳ PENDING (Ticket)      │  │
│  │  Assigned: Dr. Ahmed (Teacher)   │  │
│  │  [View Details]                  │  │
│  └──────────────────────────────────┘  │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │  Direct Chat with Staff/Teachers │  │
│  │  [Open Chat]                     │  │
│  │  Available: Dr. Ahmed, Prof. X   │  │
│  └──────────────────────────────────┘  │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │  Knowledge Base (পড়ার জন্য)      │  │
│  │  - Course Rules                  │  │
│  │  - Academic Policies             │  │
│  │  - Important Dates               │  │
│  │  - Credit Transfer Rules         │  │
│  └──────────────────────────────────┘  │
│                                          │
└─────────────────────────────────────────┘
```

#### **📋 Student Features**

| ফিচার | কী করবে | পেজ |
|--------|---------|-----|
| **Ask Question** | টেক্সট/ভয়েস দিয়ে প্রশ্ন জিজ্ঞাসা | `/student/ask` |
| **Instant Reply** | AI ৩-৫ সেকেন্ডে উত্তর দেয় | `/student/query/{id}` |
| **Track Status** | প্রশ্নের অবস্থা দেখা | `/student/my-queries` |
| **Ticket View** | যদি টিকিট তৈরি হয়, ট্র্যাক করা | `/student/tickets/{id}` |
| **Direct Chat** | Staff/Teacher-এর সাথে সরাসরি চ্যাট | `/student/chat` |
| **Knowledge Base** | সব নিয়ম-কানুন পড়া | `/student/kb` |
| **Feedback** | উত্তর সঠিক ছিল কিনা জানানো | `/student/query/{id}/feedback` |

#### **📌 Student Workflow**

```
Step-१: Question Ask
  └─ "আমি কীভাবে কোর্স ড্রপ করব?"
     └─ Category: Academic
        └─ Priority: Normal

Step-२: AI Processing
  └─ NLP Intent: COURSE_DROP_QUERY
     └─ Search KB for similar content
        └─ Found: "Drop & Add Policy (30MB)"
           └─ Confidence: 95%

Step-३: Response
  ├─ If Confidence ≥ 70% → Direct Answer (3-5 sec) ✅
  │  Response: "আপনার সেমিস্টারে ড্রপ ডেট ৩০ মে। এখানে আবেদন করুন: [Link]"
  │
  └─ If Confidence < 70% → Escalate to Ticket
     └─ Create Ticket (নাম, প্রশ্ন, অগ্রাধিকার)
        └─ Notify Staff/Teachers
           └─ Student: "টিকিট #TCK-001 তৈরি হয়েছে। উত্তর পেতে ২ ঘণ্টা অপেক্ষা করুন"

Step-४: Feedback
  └─ Student: "উত্তর সঠিক ছিল? Yes/No"
     └─ Store for Analytics
```

---

### **2️⃣ DEPARTMENT STAFF/OFFICER (ডিপার্টমেন্ট অফিসার)**

#### 📊 **Staff Dashboard Pages**

```
┌──────────────────────────────────────────────────────┐
│         DEPARTMENT STAFF PORTAL                       │
├──────────────────────────────────────────────────────┤
│                                                        │
│  ┌────────────────────────────────────────────────┐  │
│  │  Knowledge Base Management                      │  │
│  │  [+ Add New Policy] [Update] [Delete]          │  │
│  │  ─────────────────────────────────────────────│  │
│  │  Documents:                                     │  │
│  │  ✅ Drop & Add Policy                          │  │
│  │  ✅ Credit Transfer Rules                      │  │
│  │  ✅ Course Prerequisites                       │  │
│  │  ✅ Grade Appeal Process                       │  │
│  │  ☐ New Document Upload                        │  │
│  │    [Choose File] [Upload]                     │  │
│  │                                                 │  │
│  │  Version Control:                              │  │
│  │  Last Updated: 17 May 2026                    │  │
│  │  Updated By: Officer Ahmed                     │  │
│  └────────────────────────────────────────────────┘  │
│                                                        │
│  ┌────────────────────────────────────────────────┐  │
│  │  Pending Tickets & Queries                     │  │
│  │  Filter: [All] [AI Escalated] [Urgent]        │  │
│  │  ─────────────────────────────────────────────│  │
│  │  TCK-001: "গ্রেড অ্যাপিল"                      │  │
│  │    Student: Rohan (EC-001)                    │  │
│  │    Status: ⏳ PENDING                          │  │
│  │    Created: 17 May, 10:30 AM                 │  │
│  │    [View Details] [Reply] [Assign to Teacher]│  │
│  │                                                 │  │
│  │  TCK-002: "কোর্স স্বপ অনুমোদন"               │  │
│  │    Status: ⏳ PENDING                          │  │
│  │    [View Details] [Reply] [Close]             │  │
│  │                                                 │  │
│  └────────────────────────────────────────────────┘  │
│                                                        │
│  ┌────────────────────────────────────────────────┐  │
│  │  Response Queue                                 │  │
│  │  Write Response and Update KB                  │  │
│  │  ─────────────────────────────────────────────│  │
│  │  [Response Text Area]                         │  │
│  │  [Save Response] [Add to KB] [Close Ticket]  │  │
│  │                                                 │  │
│  └────────────────────────────────────────────────┘  │
│                                                        │
│  ┌────────────────────────────────────────────────┐  │
│  │  Communication with Teachers                    │  │
│  │  Assign Complex Cases: [Select Teacher]        │  │
│  │  ─────────────────────────────────────────────│  │
│  │  @ Dr. Ahmed                                   │  │
│  │  @ Prof. Karim                                 │  │
│  │  @ Lecturer Fatima                            │  │
│  └────────────────────────────────────────────────┘  │
│                                                        │
└──────────────────────────────────────────────────────┘
```

#### **📋 Staff Features & Responsibilities**

| কাজ | কী করবে | পেজ | রোল |
|-----|---------|-----|-----|
| **KB Upload** | নিয়ম-কানুন, পলিসি ডকুমেন্ট আপলোড | `/staff/kb/upload` | Officer |
| **KB Edit** | বিদ্যমান ডকুমেন্ট আপডেট/ডিলিট | `/staff/kb/manage` | Officer |
| **Ticket View** | সব পেন্ডিং টিকিট দেখা | `/staff/tickets` | Officer |
| **Respond** | ছাত্রের প্রশ্নের উত্তর দেওয়া | `/staff/tickets/{id}/respond` | Officer |
| **Escalate** | জটিল প্রশ্ন শিক্ষকদের কাছে পাঠানো | `/staff/tickets/{id}/assign` | Officer |
| **Analytics** | প্রশ্নের ট্রেন্ড দেখা | `/staff/analytics` | Officer |

#### **💾 Staff Workflow**

```
Step-१: Upload/Update Knowledge Base
  └─ Officer Login
     └─ Go to "Knowledge Base Management"
        └─ [+ Add New Document]
           └─ Title: "Drop & Add Policy 2026"
              Content: "ড্রপ/অ্যাড ডেট ১৫ মে থেকে ৩০ মে..."
              Category: ACADEMIC
              [Upload]
           └─ System: Embed করা হয় Vector DB-এ
              └─ AI এখন এই ডাটা থেকে উত্তর দিতে পারবে ✅

Step-२: Handle Pending Tickets
  └─ Officer sees "TCK-001: Grade Appeal"
     └─ [View Details]
        └─ Student Query: "আমার গ্রেড কম, আমি চাই আবার দেখা হোক"
           └─ Response options:
              ├─ Simple Reply: সরাসরি জবাব
              │  └─ "আপনার আবেদন গৃহীত হয়েছে, ২৪ ঘণ্টায় উত্তর পাবেন"
              │     └─ [Add to KB for future] ✅
              │
              └─ Complex → Assign to Teacher:
                 └─ "এটি শিক্ষকের সিদ্ধান্তের বিষয়"
                    └─ Assign: Dr. Ahmed
                       └─ Notify Teacher
                          └─ Teacher handles → Update KB

Step-३: Analytics
  └─ See Trending Questions:
     └─ "Grade Appeal" - 25 questions (May)
        └─ Suggestion: Add detailed "Grade Appeal Process" to KB
```

---

### **3️⃣ TEACHERS (শিক্ষক)**

#### 👨‍🏫 **Teacher Dashboard Pages**

```
┌──────────────────────────────────────────────────┐
│         TEACHER PORTAL                            │
├──────────────────────────────────────────────────┤
│                                                    │
│  ┌────────────────────────────────────────────┐  │
│  │  Assigned Queries/Tickets                   │  │
│  │  [Filter: All] [Urgent] [Mine]             │  │
│  │  ─────────────────────────────────────────│  │
│  │  TCK-002: "কোর্স কম্বিনেশন সম্ভব কিনা?"    │  │
│  │    Assigned to: Me (Dr. Ahmed)             │  │
│  │    Student: Rima (EC-045)                 │  │
│  │    Created: 17 May 11:00 AM              │  │
│  │    [View & Reply]                         │  │
│  │                                             │  │
│  │  TCK-003: "ক্রেডিট ট্রান্সফার প্রসেস"       │  │
│  │    Status: ⏳ PENDING                      │  │
│  │    [View & Reply]                         │  │
│  │                                             │  │
│  └────────────────────────────────────────────┘  │
│                                                    │
│  ┌────────────────────────────────────────────┐  │
│  │  Reply to Student                           │  │
│  │  ─────────────────────────────────────────│  │
│  │  Ticket: TCK-002                          │  │
│  │  Student: Rima                            │  │
│  │                                             │  │
│  │  [Response Text Area]                     │  │
│  │  "আপনার কোর্স কম্বিনেশন সম্ভব কারণ...   │  │
│  │   আপনার মেজর এবং মাইনর..."              │  │
│  │                                             │  │
│  │  ☐ Add to Knowledge Base for future       │  │
│  │     (Similar questions-এর জন্য)          │  │
│  │                                             │  │
│  │  [Send Reply] [Close Ticket]              │  │
│  └────────────────────────────────────────────┘  │
│                                                    │
│  ┌────────────────────────────────────────────┐  │
│  │  KB Contribution History                    │  │
│  │  Answers you've added:                      │  │
│  │  ✅ "Grade Appeal Process" (May 15)        │  │
│  │  ✅ "Course Combination Rules" (May 16)    │  │
│  │  ✅ "Credit Transfer" (May 17)             │  │
│  │                                             │  │
│  │  Total: 12 contributions this month        │  │
│  │  [View All]                                │  │
│  └────────────────────────────────────────────┘  │
│                                                    │
└──────────────────────────────────────────────────┘
```

#### **📋 Teacher Features**

| কাজ | কী করবে | পেজ |
|-----|---------|-----|
| **View Assigned** | তাদের কাছে যে টিকিট আছে দেখা | `/teacher/tickets` |
| **Reply to Query** | ছাত্রের প্রশ্নের বিস্তারিত উত্তর | `/teacher/tickets/{id}/reply` |
| **Contribute to KB** | উত্তর Knowledge Base-এ যোগ করা | `/teacher/kb/add` |
| **Chat with Students** | সরাসরি ছাত্রদের সাথে চ্যাট | `/teacher/chat` |
| **Contribution Stats** | তাদের অবদান দেখা | `/teacher/contributions` |

#### **🔄 Teacher Workflow**

```
Step-१: New Assignment
  └─ Staff assigns ticket to Dr. Ahmed
     └─ Email: "TCK-002 assigned to you: Course Combination Query"

Step-२: View & Reply
  └─ Dr. Ahmed opens ticket
     └─ Student's Question: "আমি EC-201 এবং CS-301 একসাথে নিতে পারি?"
        └─ Dr. Ahmed replies:
           "হ্যাঁ, কারণ এই দুটি কোর্সের কোন পূর্ব-শর্ত নেই।
            তবে প্রতি সেমিস্টারে সর্বোচ্চ ১৮ ক্রেডিট নেওয়ার শর্ত মেনে চলতে হবে।"

Step-३: Contribute to KB
  └─ ☐ Add to KB checkbox mark করা
     └─ System: এই উত্তর সংরক্ষণ করে
        └─ পরবর্তী সারণী প্রশ্নে AI সরাসরি উত্তর দিতে পারবে ✅

Step-४: Ticket Close
  └─ [Close Ticket]
     └─ Student notified: "আপনার প্রশ্নের উত্তর দেওয়া হয়েছে"
```

---

### **4️⃣ DEPARTMENT HEAD (বিভাগীয় প্রধান)**

#### 🎯 **Department Head Dashboard Pages**

```
┌─────────────────────────────────────────────────────┐
│         DEPARTMENT HEAD DASHBOARD                    │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │  Department Overview                         │  │
│  │  ─────────────────────────────────────────  │  │
│  │  Total Students: 245                        │  │
│  │  Faculty Members: 15                        │  │
│  │  Staff Officers: 3                          │  │
│  │                                              │  │
│  │  Query Statistics (This Month):             │  │
│  │  ├─ Total Queries: 450                      │  │
│  │  ├─ AI Resolved: 405 (90%)                 │  │
│  │  ├─ Escalated Tickets: 45 (10%)             │  │
│  │  ├─ Avg Response Time: 4.2 sec (AI)         │  │
│  │  └─ Avg Staff Response: 2 hours (Manual)    │  │
│  │                                              │  │
│  │  Ticket Status:                             │  │
│  │  ├─ OPEN: 5 (জরুরি!)                       │  │
│  │  ├─ IN_PROGRESS: 8                         │  │
│  │  └─ RESOLVED: 32                           │  │
│  │                                              │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │  Query Analysis & Trends                     │  │
│  │  ─────────────────────────────────────────  │  │
│  │  Top Questions:                             │  │
│  │  1. Drop & Add Policy (125 questions)      │  │
│  │  2. Grade Appeal Process (45 questions)     │  │
│  │  3. Credit Transfer Rules (38 questions)    │  │
│  │  4. Prerequisite Info (32 questions)        │  │
│  │  5. Transcript Request (28 questions)       │  │
│  │                                              │  │
│  │  Suggestion: Add "Drop & Add FAQ" to KB    │  │
│  │                                              │  │
│  │  [View Detailed Charts] [Export Report]    │  │
│  │                                              │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │  Staff Performance                           │  │
│  │  ─────────────────────────────────────────  │  │
│  │  Officer Ahmed:                             │  │
│  │    Tickets Handled: 25                      │  │
│  │    Avg Resolution Time: 1.5 hours          │  │
│  │    KB Contributions: 12                      │  │
│  │    ⭐ Performance: Excellent                 │  │
│  │                                              │  │
│  │  Dr. Ahmed (Teacher):                       │  │
│  │    Tickets Handled: 15                      │  │
│  │    Avg Resolution Time: 2 hours            │  │
│  │    KB Contributions: 8                       │  │
│  │    ⭐ Performance: Good                      │  │
│  │                                              │  │
│  │  [Full Performance Report]                  │  │
│  │                                              │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │  System Health & Alerts                      │  │
│  │  ─────────────────────────────────────────  │  │
│  │  ⚠️  5 Open Tickets (Needs Attention)        │  │
│  │  ℹ️  KB Updated: 3 times today              │  │
│  │  ✅ AI Confidence: 89% (Good)               │  │
│  │  🔴 Escalation Rate: 11% (Monitor)          │  │
│  │                                              │  │
│  │  [System Logs] [Settings] [Users]           │  │
│  │                                              │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
└─────────────────────────────────────────────────────┘
```

#### **📋 Department Head Features**

| কাজ | কী করবে | পেজ |
|-----|---------|-----|
| **Overview** | সম্পূর্ণ ডিপার্টমেন্ট অবস্থা দেখা | `/head/dashboard` |
| **Query Analytics** | কোন প্রশ্ন বেশি আসছে বিশ্লেষণ | `/head/analytics` |
| **Ticket Monitoring** | সব পেন্ডিং টিকিট ট্র্যাক করা | `/head/tickets` |
| **Staff Performance** | কর্মীদের কর্মক্ষমতা মূল্যায়ন | `/head/staff-performance` |
| **System Health** | AI confidence, escalation rate মনিটর | `/head/system-health` |
| **Reports** | মাসিক/বার্ষিক রিপোর্ট তৈরি | `/head/reports` |
| **Alerts & Escalation** | জরুরি বিষয় দেখা | `/head/alerts` |

#### **📊 Department Head Workflow**

```
Daily Routine:
│
├─ Morning (9:00 AM):
│  └─ Check Dashboard
│     └─ See: 5 open tickets (⚠️ Alert)
│        └─ Review which ones are urgent
│           └─ Notify relevant staff if needed
│
├─ Ongoing:
│  └─ Monitor Performance
│     └─ See Officer Ahmed handled 25 tickets (Good!)
│        └─ See 3 new KB entries added
│           └─ System running smoothly
│
├─ Weekly:
│  └─ Analytics Review
│     └─ Top 5 questions identified
│        └─ Suggest KB improvements
│           └─ Email: "Add FAQ for Drop & Add"
│
└─ Monthly:
   └─ Generate Report
      └─ Total: 450 queries, 90% auto-resolved ✅
         └─ Share with Admin
            └─ Request: More AI training data if needed
```

---

## **🔄 Complete Data Flow Diagram**

```
┌─────────────┐
│   Student   │
│   Asks Q    │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  API: POST /ask     │
│  Body: {query, id}  │
└──────┬──────────────┘
       │
       ▼
┌──────────────────────────────┐
│  AI Processing Pipeline      │
├──────────────────────────────┤
│ 1. NLP: Intent Detection     │
│ 2. Vector DB: Search KB      │
│ 3. Score: Confidence Check   │
└──────┬───────────┬───────────┘
       │           │
   ≥70%│       <70%│
       │           │
       ▼           ▼
   ┌─────────┐  ┌──────────────────┐
   │ Send    │  │ Create Ticket    │
   │ Answer  │  │ Route to Staff   │
   │ (3 sec) │  │ Route to Teacher │
   └────┬────┘  └────────┬─────────┘
        │                │
        │                ▼
        │        ┌──────────────────┐
        │        │ Staff/Teacher    │
        │        │ Manual Response  │
        │        │ + KB Update      │
        │        └────────┬─────────┘
        │                 │
        └────────┬────────┘
                 │
                 ▼
        ┌──────────────────┐
        │ Update KB        │
        │ (Vector DB)      │
        └────────┬─────────┘
                 │
                 ▼
        ┌──────────────────┐
        │ Send to Student  │
        │ Close Ticket     │
        │ Log Analytics    │
        └──────────────────┘
                 │
                 ▼
        ┌──────────────────┐
        │ Department Head  │
        │ Views Analytics  │
        │ Monitors All     │
        └──────────────────┘
```

---

## **📱 API Endpoints Summary**

```
STUDENT APIs:
POST   /api/v1/queries/ask           - প্রশ্ন জিজ্ঞাসা করা
GET    /api/v1/queries/{id}          - প্রশ্নের উত্তর পাওয়া
GET    /api/v1/queries/my-queries    - নিজের সব প্রশ্ন দেখা
POST   /api/v1/queries/{id}/feedback - ফিডব্যাক দেওয়া
GET    /api/v1/kb                    - Knowledge Base দেখা
WS     /api/v1/chat/{user_id}        - Staff/Teacher সাথে চ্যাট

STAFF APIs:
POST   /api/v1/staff/kb/upload       - নতুন ডকুমেন্ট আপলোড
PUT    /api/v1/staff/kb/{id}         - ডকুমেন্ট আপডেট
DELETE /api/v1/staff/kb/{id}         - ডকুমেন্ট ডিলিট
GET    /api/v1/staff/tickets         - পেন্ডিং টিকিট দেখা
POST   /api/v1/staff/tickets/{id}/respond    - উত্তর দেওয়া
POST   /api/v1/staff/tickets/{id}/assign     - শিক্ষকদের কাছে পাঠানো
GET    /api/v1/staff/analytics       - প্রশ্নের ট্রেন্ড দেখা

TEACHER APIs:
GET    /api/v1/teacher/tickets       - অ্যাসাইন করা টিকিট দেখা
POST   /api/v1/teacher/tickets/{id}/reply    - জবাব দেওয়া
POST   /api/v1/teacher/tickets/{id}/close    - টিকিট বন্ধ করা
POST   /api/v1/teacher/kb/contribute         - KB-তে অবদান রাখা
WS     /api/v1/teacher/chat/{user_id}        - ছাত্রদের সাথে চ্যাট

HEAD APIs:
GET    /api/v1/head/dashboard        - সম্পূর্ণ অবস্থা দেখা
GET    /api/v1/head/analytics        - বিস্তারিত বিশ্লেষণ
GET    /api/v1/head/tickets          - সব টিকিট (মনিটর)
GET    /api/v1/head/staff-performance - কর্মীদের মূল্যায়ন
GET    /api/v1/head/system-health    - সিস্টেম স্বাস্থ্য
GET    /api/v1/head/reports          - মাসিক রিপোর্ট
```

---

## **📊 Database Tables Required**

```sql
-- মূল টেবিলগুলি:

१. users (সব ইউজারের জন্য)
२. students (ছাত্রদের বিশেষ তথ্য)
३. staff_officers (অফিসারদের তথ্য)
४. teachers (শিক্ষকদের তথ্য)
५. queries (সব প্রশ্ন সংরক্ষণ)
६. tickets (জটিল প্রশ্নের টিকিট)
७. knowledge_base (সব নিয়ম-কানুন)
८. kb_embeddings (Vector DB reference)
९. responses (staff/teacher রেসপন্স)
१०. notifications (সব নোটিফিকেশন)
११. analytics_logs (প্রশ্ন ও রেসপন্স ট্র্যাকিং)
१२. chat_messages (সরাসরি চ্যাট)
१३. feedback (ছাত্রের ফিডব্যাক)
```

---

## **✅ Summary - কে কী করবে**

| ভূমিকা | প্রধান কাজ | মূল পেজ | সময় |
|--------|----------|---------|------|
| **Student** | প্রশ্ন জিজ্ঞাসা, ট্র্যাকিং | Dashboard, Ask, Track | ২ মিনিট |
| **Staff** | KB আপলোড, টিকিট হ্যান্ডেল | KB Management, Tickets | ১-২ ঘণ্টা |
| **Teacher** | জটিল প্রশ্নের উত্তর, KB যোগ | Assigned Tickets, Reply | ১-২ ঘণ্টা |
| **Dept Head** | সম্পূর্ণ মনিটরিং | Dashboard, Analytics, Reports | দৈনিক ১০ মিনিট |
| **AI System** | তাৎক্ষণিক উত্তর, সব ডাটা পরিচালনা | ব্যাকগ্রাউন্ড | ৩-৫ সেকেন্ড |

---

**এখন সব কিছু পরিষ্কার?** 🎉

এটাই আমরা বিল্ড করব **Phase-१** -তে! প্রস্তুত? 🚀
