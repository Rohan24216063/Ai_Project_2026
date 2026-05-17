# Stage 1: Build
FROM maven:3.9-eclipse-temurin-25 AS builder

WORKDIR /build

# Copy pom.xml and dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:25-jdk-alpine

WORKDIR /app

# Copy JAR from builder stage
COPY --from=builder /build/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget -q --spider http://localhost:8080/api/health || exit 1

# Run application
ENTRYPOINT ["java", "-jar", "app.jar"]
