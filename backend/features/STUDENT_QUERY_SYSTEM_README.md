# 🎓 Student Query Handling System - Feature Implementation Guide

**আমাদের প্রথম এবং প্রধান ফিচার**

---

## 📌 **Quick Summary**

```
What: Department-based AI Student Query System
Who: Students ask → AI answers (90%) → Escalate if needed (10%)
When: 24/7, Real-time responses
Why: Reduce admin burden, 24/7 student support, Better service
How: Vector DB + LLM + Role-based Management
```

---

## 🏗️ **Architecture Overview**

### **Backend Structure**

```
backend/
├── src/main/java/com/universityapp/
│   ├── features/
│   │   ├── student_query/
│   │   │   ├── controller/QueryController.java          ✏️ REST APIs
│   │   │   ├── service/QueryService.java                🧠 বিজনেস লজিক
│   │   │   ├── service/AIResponseService.java           🤖 AI ইন্টিগ্রেশন
│   │   │   ├── service/EscalationService.java           📤 টিকিট সিস্টেম
│   │   │   ├── repository/QueryRepository.java          💾 DB এক্সেস
│   │   │   ├── model/Query.java                         📦 Entity
│   │   │   ├── dto/QueryRequest.java                    📨 Request DTO
│   │   │   └── dto/QueryResponse.java                   📤 Response DTO
│   │   │
│   │   ├── knowledge_base/
│   │   │   ├── controller/KBController.java             ✏️ KB Management
│   │   │   ├── service/KBService.java                   🧠 KB Logic
│   │   │   ├── service/VectorEmbeddingService.java      📊 Vector DB
│   │   │   ├── repository/KBRepository.java             💾 DB এক্সেস
│   │   │   ├── model/KnowledgeBase.java                 📦 Entity
│   │   │   └── dto/KBDocumentDTO.java                   📨 DTO
│   │   │
│   │   ├── ticket_system/
│   │   │   ├── controller/TicketController.java         ✏️ Ticket APIs
│   │   │   ├── service/TicketService.java               🧠 টিকিট লজিক
│   │   │   ├── repository/TicketRepository.java         💾 DB এক্সেস
│   │   │   ├── model/Ticket.java                        📦 Entity
│   │   │   └── enums/TicketStatus.java                  🏷️ Status Enum
│   │   │
│   │   └── analytics/
│   │       ├── controller/AnalyticsController.java      ✏️ Analytics APIs
│   │       ├── service/AnalyticsService.java            📊 বিশ্লেষণ
│   │       ├── repository/QueryLogRepository.java       💾 লগ স্টোর
│   │       └── model/QueryLog.java                      📦 Log Entity
│   │
│   ├── config/                                          ⚙️ Configuration
│   │   ├── SecurityConfig.java
│   │   ├── JwtConfig.java
│   │   ├── AIConfig.java                                🤖 AI সেটআপ
│   │   └── DatabaseConfig.java
│   │
│   ├── exception/                                       ⚠️ Exception Handling
│   │   ├── QueryNotFoundException.java
│   │   ├── KBException.java
│   │   └── AIException.java
│   │
│   └── util/
│       ├── PromptBuilder.java                           📝 Prompt Template
│       ├── EmbeddingUtil.java                           📊 Vector Operations
│       └── ValidationUtil.java
│
├── resources/
│   ├── db/
│   │   ├── migration/
│   │   │   ├── V1__init_tables.sql
│   │   │   ├── V2__add_queries_table.sql
│   │   │   ├── V3__add_tickets_table.sql
│   │   │   └── V4__add_analytics_tables.sql
│   │   └── schema.sql
│   │
│   └── prompts/                                          📝 AI Prompts
│       ├── system_prompt.txt
│       ├── query_classifier.txt
│       └── response_generator.txt
│
└── test/
    ├── QueryServiceTest.java
    ├── AIResponseServiceTest.java
    └── EscalationServiceTest.java
```

---

## 🗂️ **Database Schema**

```sql
-- ১. QUERIES Table (সব প্রশ্ন)
CREATE TABLE queries (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50),              -- ACADEMIC, ADMIN, TECHNICAL
    intent VARCHAR(50),                -- DROP_COURSE, GRADE_APPEAL, etc.
    ai_response TEXT,
    ai_confidence FLOAT,               -- 0-1, threshold: 0.7
    is_escalated BOOLEAN DEFAULT false,
    escalated_ticket_id INT,
    student_feedback BOOLEAN,          -- Helpful? Yes/No
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (escalated_ticket_id) REFERENCES tickets(id)
);

-- २. KNOWLEDGE_BASE Table (নিয়ম-কানুন)
CREATE TABLE knowledge_base (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50),              -- POLICY, SCHEDULE, FAQ, RULE
    department_id INT,
    uploaded_by INT,                   -- Staff ID
    vector_embedding VECTOR(1536),     -- OpenAI embedding
    version INT DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES staff_officers(id)
);

-- ३. TICKETS Table (জটিল প্রশ্নের টিকিট)
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    ticket_number VARCHAR(20) UNIQUE NOT NULL,
    query_id INT NOT NULL,
    student_id INT NOT NULL,
    assigned_to INT,                   -- Staff or Teacher ID
    status VARCHAR(20),                -- OPEN, IN_PROGRESS, RESOLVED, CLOSED
    priority VARCHAR(20),              -- LOW, MEDIUM, HIGH, URGENT
    escalation_reason TEXT,
    resolution_notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    resolved_at TIMESTAMP,
    FOREIGN KEY (query_id) REFERENCES queries(id),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id)
);

-- ४. QUERY_LOGS Table (বিশ্লেষণের জন্য)
CREATE TABLE query_logs (
    id SERIAL PRIMARY KEY,
    query_id INT NOT NULL,
    student_id INT NOT NULL,
    intent VARCHAR(50),
    confidence_score FLOAT,
    response_time_ms INT,
    was_escalated BOOLEAN,
    was_helpful BOOLEAN,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (query_id) REFERENCES queries(id),
    FOREIGN KEY (student_id) REFERENCES students(id)
);

-- ५. RESPONSES Table (Staff/Teacher উত্তর)
CREATE TABLE responses (
    id SERIAL PRIMARY KEY,
    ticket_id INT NOT NULL,
    responded_by INT NOT NULL,         -- Staff or Teacher ID
    response_text TEXT NOT NULL,
    add_to_kb BOOLEAN DEFAULT false,
    kb_id INT,                         -- যদি KB-এ যুক্ত হয়েছে
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (ticket_id) REFERENCES tickets(id),
    FOREIGN KEY (responded_by) REFERENCES users(id),
    FOREIGN KEY (kb_id) REFERENCES knowledge_base(id)
);

-- ६. CHAT_MESSAGES Table (সরাসরি চ্যাট)
CREATE TABLE chat_messages (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    staff_or_teacher_id INT NOT NULL,
    message TEXT NOT NULL,
    sender_type VARCHAR(20),           -- STUDENT, STAFF, TEACHER
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (staff_or_teacher_id) REFERENCES users(id)
);

-- ७. NOTIFICATIONS Table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50),                  -- QUERY_ANSWERED, TICKET_ASSIGNED, etc.
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Index তৈরি করা (পারফরম্যান্সের জন্য)
CREATE INDEX idx_queries_student_id ON queries(student_id);
CREATE INDEX idx_queries_escalated ON queries(is_escalated);
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_kb_category ON knowledge_base(category);
CREATE INDEX idx_query_logs_created ON query_logs(created_at);
```

---

## 🚀 **Implementation Roadmap**

### **Phase-१: Core Setup (Days 1-3)**

```
Day-१:
├─ Database Schema Migration
├─ Basic Model/Entity Classes
├─ Repository Layer
└─ Git Commit: "Add database schema and models"

Day-२:
├─ Query Controller (REST APIs)
├─ Query Service (বিজনেস লজিক)
├─ DTOs (Request/Response)
└─ Git Commit: "Implement Query API endpoints"

Day-३:
├─ Unit Tests
├─ API Documentation
└─ Git Commit: "Add tests and API docs"
```

### **Phase-२: AI Integration (Days 4-6)**

```
Day-४:
├─ Knowledge Base Upload Feature
├─ Vector Embedding Service (Ollama)
├─ KB Controller
└─ Git Commit: "Implement KB upload and embedding"

Day-५:
├─ AI Response Service (LangChain4j)
├─ Prompt Engineering
├─ Confidence Scoring
└─ Git Commit: "Integrate AI for query answering"

Day-६:
├─ Testing AI Responses
├─ Fine-tune Prompts
└─ Git Commit: "Test and optimize AI responses"
```

### **Phase-३: Escalation & Management (Days 7-9)**

```
Day-७:
├─ Ticket System
├─ Escalation Logic
├─ Ticket Controller
└─ Git Commit: "Implement ticket escalation system"

Day-८:
├─ Staff/Teacher Response Handling
├─ KB Update from Responses
├─ Notification System
└─ Git Commit: "Add manual response and KB update flow"

Day-९:
├─ Chat System (WebSocket)
├─ Direct communication
└─ Git Commit: "Implement real-time chat"
```

### **Phase-४: Analytics & Frontend Prep (Days 10-12)**

```
Day-१०:
├─ Query Logs & Analytics
├─ Analytics Service
├─ Dashboard Data APIs
└─ Git Commit: "Add analytics and logging"

Day-११:
├─ Department Head Dashboard API
├─ Performance Metrics
├─ Report Generation
└─ Git Commit: "Implement analytics dashboard APIs"

Day-१२:
├─ Frontend Integration Preparation
├─ API Documentation
└─ Git Commit: "Final backend refinements"
```

---

## 💡 **Key Technical Details**

### **A. AI/LLM Integration**

```
┌─────────────────────────────────┐
│  Query: "ড্রপ ডেট কী?"            │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  Step 1: Embedding              │
│  Convert to Vector (1536-dim)   │
│  Using: Ollama/Hermes2          │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  Step 2: Vector Search          │
│  Find Similar Documents in KB   │
│  Using: Cosine Similarity       │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  Step 3: RAG (Retrieval Aug.)   │
│  Inject top-3 docs in prompt    │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  Step 4: LLM Response           │
│  Generate answer using GPT/etc  │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  Step 5: Confidence Scoring     │
│  0-1 range (threshold: 0.7)     │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  Step 6: Response               │
│  Send to Student or Escalate    │
└─────────────────────────────────┘
```

### **B. Escalation Logic**

```java
public class EscalationService {
    
    public void handleEscalation(Query query, AIResponse aiResponse) {
        // Confidence Threshold: 70%
        if (aiResponse.getConfidence() < 0.7) {
            
            // ১. Create Ticket
            Ticket ticket = createTicket(query);
            
            // २. Intelligent Routing
            String assignedTo = routeTicket(query);
            // Logic:
            // - If GRADE_APPEAL → Assign to Department Head
            // - If TECHNICAL → Assign to Staff Officer
            // - If COMPLEX ACADEMIC → Assign to Teacher
            
            // ३. Send Notification
            sendNotification(assignedTo, ticket);
            
            // ४. Update Query
            query.setEscalated(true);
            query.setEscalatedTicketId(ticket.getId());
            queryRepository.save(query);
        }
    }
}
```

### **C. Knowledge Base Update Flow**

```
Staff/Teacher:
    └─ Provides manual response to escalated query
       └─ [Checkbox] "Add to Knowledge Base?"
          └─ If checked:
             ├─ Process Response Text
             ├─ Generate Vector Embedding
             ├─ Store in KB
             └─ AI can now answer similar queries directly ✅
```

---

## 📚 **Code Examples (প্রধান Classes)**

### **১. Query Model**

```java
@Entity
@Table(name = "queries")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Query {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Enumerated(EnumType.STRING)
    private QueryCategory category;      // ACADEMIC, ADMIN, TECHNICAL
    
    @Enumerated(EnumType.STRING)
    private QueryIntent intent;          // DROP_COURSE, GRADE_APPEAL, etc.
    
    @Column(columnDefinition = "TEXT")
    private String aiResponse;
    
    @Column
    private Float aiConfidence;          // 0-1
    
    @Column
    private Boolean isEscalated = false;
    
    @OneToOne
    @JoinColumn(name = "escalated_ticket_id")
    private Ticket escalatedTicket;
    
    @Column
    private Boolean studentFeedback;     // Helpful? Yes/No
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
```

### **२. AI Response Service**

```java
@Service
@RequiredArgsConstructor
public class AIResponseService {
    
    private final VectorEmbeddingService embeddingService;
    private final KnowledgeBaseService kbService;
    private final OllamaClient ollamaClient;
    
    public AIResponse processQuery(String query, Student student) {
        
        // Step 1: Embed query
        Embedding queryEmbedding = embeddingService.embed(query);
        
        // Step 2: Search KB
        List<KnowledgeBase> relevantDocs = kbService.searchByVector(
            queryEmbedding, 
            k=3, 
            student.getDepartment()
        );
        
        // Step 3: Build prompt with RAG
        String prompt = buildRAGPrompt(query, relevantDocs, student);
        
        // Step 4: Generate response
        String response = ollamaClient.generate(
            model = "hermes2",
            prompt = prompt,
            temperature = 0.3
        );
        
        // Step 5: Calculate confidence
        Float confidence = calculateConfidence(
            response, 
            relevantDocs, 
            query
        );
        
        return AIResponse.builder()
            .response(response)
            .confidence(confidence)
            .usedDocuments(relevantDocs)
            .build();
    }
    
    private String buildRAGPrompt(String query, List<KBDoc> docs, Student student) {
        return """
            You are a helpful university student advisor for {student.department}.
            
            Use the following knowledge base documents to answer the student's query:
            
            %s
            
            Student Query: %s
            Student Details: {student.semester} semester, {student.majorSubject}
            
            Provide a helpful, accurate answer in Bengali.
            """.formatted(
                docs.stream().map(KBDoc::getContent).collect(joining("\n---\n")),
                query
            );
    }
}
```

### **३. Escalation Service**

```java
@Service
@RequiredArgsConstructor
public class EscalationService {
    
    private final TicketService ticketService;
    private final NotificationService notificationService;
    private final UserRepository userRepository;
    
    public Ticket escalateQuery(Query query, AIResponse aiResponse) {
        
        // ১. Check Confidence
        if (aiResponse.getConfidence() >= 0.7) {
            return null; // No escalation needed
        }
        
        // २. Create Ticket
        Ticket ticket = ticketService.createTicket(
            query.getStudent(),
            query,
            determinePriority(query)
        );
        
        // ३. Intelligent Routing
        User assignedTo = routeTicket(query);
        ticket.setAssignedTo(assignedTo);
        ticket = ticketService.save(ticket);
        
        // ४. Notify Assignee
        notificationService.notifyTicketAssignment(
            assignedTo,
            ticket
        );
        
        // ५. Update Query
        query.setEscalated(true);
        query.setEscalatedTicket(ticket);
        
        return ticket;
    }
    
    private User routeTicket(Query query) {
        return switch(query.getIntent()) {
            case GRADE_APPEAL, WAIVER_REQUEST 
                -> query.getStudent().getDepartment().getHead();
            case COURSE_SWAP, PREREQUISITE_OVERRIDE
                -> query.getStudent().getDepartment().getCoordinator();
            default 
                -> query.getStudent().getDepartment().getFirstAvailableTeacher();
        };
    }
}
```

---

## 🧪 **Testing Strategy**

```
Unit Tests:
├─ QueryServiceTest
├─ AIResponseServiceTest
├─ EscalationServiceTest
├─ EmbeddingServiceTest
└─ KBServiceTest

Integration Tests:
├─ QueryAPIIntegrationTest
├─ AIIntegrationTest
├─ DatabaseIntegrationTest
└─ EndToEndWorkflowTest

Performance Tests:
├─ VectorSearchPerformance
├─ AIResponseLatency (Target: < 5 sec)
└─ DatabaseQueryPerformance
```

---

## ✅ **Success Criteria**

```
✅ AI Confidence Threshold: 90%+ queries can be answered automatically
✅ Response Time: < 5 seconds for 95% of queries
✅ Escalation Rate: < 15% of queries need manual handling
✅ User Satisfaction: 95%+ feedback rating
✅ KB Coverage: 200+ documents covering all academic rules
✅ System Uptime: 99.5%+
```

---

**এখন শুরু করতে প্রস্তুত?** 🚀

এই Design অনুযায়ী আমরা Backend code লিখব!
