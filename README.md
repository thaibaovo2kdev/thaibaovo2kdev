<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  <b>Social Manager</b> – Lên lịch & quản lý bài đăng mạng xã hội sử dụng NestJS
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjs" target="_blank">
    <img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" />
  </a>
  <a href="https://www.npmjs.com/~nestjs" target="_blank">
    <img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" />
  </a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank">
    <img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" />
  </a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank">
    <img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/>
  </a>
</p>

---

## 📘 Mô tả

**Social Manager** là hệ thống backend được phát triển bằng [NestJS](https://nestjs.com), dùng để:
- Lên lịch đăng bài lên Instagram
- Quản lý bài viết theo user
- Hỗ trợ retry + xử lý bất đồng bộ với RabbitMQ
- Quản lý bài đăng thất bại/thành công
- Phân quyền người dùng và thống kê hiệu suất

---

## 🧩 Cấu trúc thư mục chính
```bash
src/
├── auth/ # Đăng nhập, xác thực
├── dashboard/ # Thống kê tổng quan bài viết
├── analytics/ # Phân tích lượt đăng thành công/thất bại
├── permission/ # Guard & role base access
├── social/
│ └── instagram/ # Xử lý API bài viết Instagram
├── workers/ # RabbitMQ consumer xử lý đăng bài
├── entities/ # TypeORM entities
├── common/ # Global filter, guard, interceptor
├── utils/ # Tiện ích (localize, logger...)
```
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup


---

## 🔄 Luồng hoạt động

1. Người dùng gọi API để tạo bài viết và `scheduleTime`
2. Bài viết được lưu DB với trạng thái `pending`
3. Cronjob hoặc scheduler kiểm tra bài đến hạn
4. Gửi job vào hàng đợi RabbitMQ
5. Worker xử lý: gửi bài → `success` / `retry` / `failed`

---

## 🚀 Cài đặt

```bash
# Clone
git clone https://github.com/your-username/social-manager.git
cd social-manager

# Cài package
npm install

# Cấu hình env
cp .env.example .env

# Chạy DB và RabbitMQ (nếu dùng Docker)
docker-compose up -d

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
Env ví dụ
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=social_manager
JWT_SECRET=mysecretkey
RABBITMQ_URL=amqp://localhost:5672
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
