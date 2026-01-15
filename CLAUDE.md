# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Spring Boot 3.3.4 security demo application with role-based user management. Java 17, MySQL database, Thymeleaf templating with JavaScript frontend.

## Build & Run Commands

```bash
# Build the project
./mvnw clean package

# Run the application (default port 8080)
./mvnw spring-boot:run

# Run tests
./mvnw test

# Run a single test class
./mvnw test -Dtest=SpringBootSecurityDemoApplicationTests
```

## Database Setup

MySQL database required. Configuration in `src/main/resources/application.properties`:
- Database: `mydatabase` on localhost:3306
- DDL mode: `create` (schema recreated on startup)
- Credentials: root/pqGRSU123

## Architecture

### Layered Structure

```
ru.kata.spring.boot_security.demo/
├── configs/          # Security and MVC configuration
├── controllers/      # REST controllers (AdminController, UserController)
├── entities/         # JPA entities (User, Role)
├── repositories/     # Spring Data JPA repositories
├── security/         # UserDetailsServiceImpl
└── services/         # Business logic (UserService interface + impl)
```

### Key Design Decisions

- **User entity implements UserDetails** - uses email as username field
- **Role entity implements GrantedAuthority** - role name returned as authority
- **Many-to-Many User↔Role relationship** with lazy loading
- **EntityGraph annotations** on UserRepository to prevent N+1 queries when fetching roles
- **BCrypt password encoding** in UserServiceImpl.saveUser() and updateUser()
- **REST API design** - controllers return JSON, frontend (users.js, user.js) handles rendering

### Security Configuration (WebSecurityConfig)

- CSRF disabled for REST API compatibility
- `/admin/**` requires ROLE_ADMIN
- `/user/**` requires ROLE_ADMIN or ROLE_USER
- Login form uses email/password fields
- SuccessUserHandler redirects based on role after login

### View Mapping (WebConfig)

- `/user` → user.html
- `/admin` → users.html
- `/login` → login.html

### REST Endpoints

**AdminController (/admin):**
- GET /admin/currentUser - authenticated user info
- GET /admin/users - all users
- POST /admin/users - create user
- PUT /admin/users/{id} - update user
- DELETE /admin/users/{id} - delete user
- GET /admin/users/roles - all roles

**UserController (/user):**
- GET /user/profile_user - current user profile

### Frontend

Templates in `src/main/resources/templates/`, JavaScript in `src/main/resources/static/js/`:
- users.js - admin dashboard CRUD operations
- user.js - user profile display