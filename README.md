## 1. Module Architecture
- **Design**: Domain-driven hierarchy with `AppModule` importing `DashboardModule` (sub-modules: Analytics, Reports), `PermissionModule`, and `SocialManagerModule` (sub-modules: Instagram, Facebook, TikTok).
- **Reusability**: `shared/base` provides `BaseSocialService`, `BaseSocialController`, and `BaseSocialHandler` for social media sub-modules, ensuring consistent logic. `createSocialModule` dynamically constructs modules.
- **Reasoning**: Reduces code duplication, improves maintainability, and supports scalability for adding new platforms.
- **Dependency Injection**: Services exported for cross-module use (e.g., `PermissionService`). Dynamic TypeORM configuration via `DatabaseConfig`.

## 2. Service Layer Design
- **Business Logic**: Encapsulated in services (`InstagramService`, `AnalyticsService`) and handlers (`InstagramHandler`, `AnalyticsHandler`) for complex operations like permission checks and engagement calculations.
- **Role-Based Access**: 
  - Users: Filter accounts by `userId`.
  - Managers: Filter by `teamId`.
  - Admins: Unrestricted access.
- **Analytics Integration**: Each social account links to analytics data via `accountId` and `platform`.
- **Event-Driven**: `AnalyticsEventEmitter` handles asynchronous analytics updates.
- **Error Handling**: Centralized with custom exceptions and logging.

## 3. Infrastructure Components
- **Middleware**: `ResponseMiddleware` standardizes responses with `success`, `statusCode`, `data`, `timestamp`, and `requestId`.
- **Guards**: `AuthGuard` for JWT verification, `RbacGuard` with `@Roles` decorator for RBAC.
- **Exception Filter**: `GlobalExceptionFilter` handles HTTP, database, and validation errors with logging.
- **ORM Filters**: `CustomQueryBuilder` supports user, team, and platform filtering with pagination and caching.
- **Logging**: `LoggerService` for request tracing and error logging.
- **Configuration**: `DatabaseConfig` for environment-specific database setups (PostgreSQL for production).

## 4. API Documentation
- **Key Endpoints**:
  - `POST /permissions`: Create a permission (admin only).
    - Example: `{ "userId": 1, "teamId": 1, "role": "admin", "resource": "instagram", "action": "create" }`
  - `POST /social-manager/instagram`: Create an Instagram account.
    - Example: `{ "userId": 1, "teamId": 1, "username": "example", "followers": 1000 }`
  - `GET /social-manager/instagram?page=1&limit=10`: Retrieve Instagram accounts with pagination.
  - `POST /dashboard/analytics`: Record engagement analytics.
    - Example: `{ "accountId": 1, "platform": "instagram", "engagement": { "likes": 100, "comments": 50, "shares": 20 } }`
  - `GET /dashboard/analytics?page=1&limit=10`: Retrieve analytics data.
  - `POST /dashboard/reports`: Create performance report.
    - Example: `{ "accountId": 1, "platform": "instagram", "performance": { "reach": 1000, "impressions": 5000 } }`
  - `GET /dashboard/reports?page=1&limit=10`: Retrieve reports.
- **DTO Structure**: Validated with `class-validator` (e.g., `InstagramAccountDto`, `CreateAnalyticsDto`).
- **Error Handling**: Standardized responses with `success: false`, `statusCode`, `message`, `timestamp`, `path`, and `requestId`.

## 5. Setup Instructions
- **Installation**:
  ```bash
  npm install
  npm install @nestjs/typeorm typeorm pg class-validator class-transformer @nestjs/event-emitter uuid
  ```
- **Environment**:
  - Create `.env` file:
    ```env
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=password
    DB_NAME=social_media
    NODE_ENV=development
    ```
- **Run**:
  ```bash
  npm run start
  ```
- **Test**:
  - Use Postman with `Authorization: Bearer mock-token`.
  - Test endpoints with pagination and role-based access (e.g., user vs. admin).