FROM openjdk:17-jdk-slim

WORKDIR /app

# Install curl for health checks
RUN apt-get update && apt-get install -y curl

# Create directories for file uploads
RUN mkdir -p /app/uploads/covers /app/uploads/music

# Copy Maven files
COPY pom.xml .
COPY src ./src

# Install Maven and build the application
RUN apt-get install -y maven
RUN mvn clean package -DskipTests

# Expose port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/shopgame-backend-0.0.1-SNAPSHOT.jar"] 