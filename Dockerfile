FROM openjdk:17-jdk-slim

# Устанавливаем директорию приложения
WORKDIR /app

# Копируем файл JAR в контейнер
COPY target/spring-boot_security-demo-0.0.1-SNAPSHOT.jar /app/spring-boot_security-demo-0.0.1-SNAPSHOT.jar

# Указываем команду для запуска приложения
ENTRYPOINT ["java", "-jar", "spring-boot_security-demo-0.0.1-SNAPSHOT.jar"]