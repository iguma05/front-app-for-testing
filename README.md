## Описание

Это полнофункциональное Todo-приложение с архитектурой Frontend + BFF (Backend for Frontend). Приложение состоит из React frontend и Node.js/Koa backend сервера, которые работают в Docker контейнерах.

## Структура проекта

```
├── src/                       # React frontend приложение
│   ├── components/            # React компоненты
│   ├── pages/                 # Страницы приложения
│   ├── store/                 # Redux store и API
│   ├── types/                 # TypeScript типы
│   ├── hooks/                 # Кастомные хуки
│   └── constants/             # Константы приложения
├── server/                    # BFF (Backend for Frontend)
│   ├── routes/                # API маршруты
│   ├── middlewares/           # Middleware функции
│   ├── utils/                 # Утилиты
│   ├── config.js              # Конфигурация сервера
│   └── server.js              # Главный файл сервера
├── public/                    # Статические файлы
├── scripts/                   # Скрипты развертывания
├── docker-compose.yml         # Docker Compose конфигурация
├── Dockerfile.api             # Dockerfile для backend
├── Dockerfile.frontend        # Dockerfile для frontend
├── nginx.conf                 # Конфигурация Nginx
└── package.json               # Зависимости и скрипты
```

## Технологический стек

### Frontend

- **React 19** - библиотека для создания пользовательских интерфейсов
- **TypeScript** - типизированный JavaScript
- **Redux Toolkit** - управление состоянием приложения
- **RTK Query** - работа с API и кэширование данных
- **React Router** - маршрутизация в приложении
- **Material-UI** - компоненты пользовательского интерфейса
- **React Hook Form** - управление формами
- **Yup** - валидация данных
- **Axios** - HTTP клиент для API запросов
- **React Toastify** - уведомления

### Backend (BFF)

- **Node.js** - серверная среда выполнения
- **Koa.js** - веб-фреймворк для Node.js
- **@koa/cors** - обработка CORS запросов
- **@koa/router** - маршрутизация
- **koa-bodyparser** - парсинг тела запросов

### DevOps и развертывание

- **Docker** - контейнеризация приложения
- **Docker Compose** - оркестрация контейнеров
- **Nginx** - веб-сервер для статических файлов
- **Node.js Alpine** - легковесный образ для контейнеров

## Запуск приложения

### Запуск через Docker (рекомендуется)

```bash
# Сборка и запуск всех сервисов
docker-compose up --build

# Запуск в фоновом режиме
docker-compose up -d --build

# Остановка сервисов
docker-compose down

# Просмотр логов
docker-compose logs -f
```

После запуска приложение будет доступно по адресам:

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

### Запуск в режиме разработки

```bash
# Установка зависимостей
npm install

# Запуск frontend и backend одновременно
npm start

# Или запуск по отдельности:
npm run dev:frontend  # Frontend на localhost:3000
npm run dev:backend   # Backend на localhost:3001
```

### Сборка для продакшена

```bash
# Сборка frontend приложения
npm run build

# Сборка Docker образов
docker-compose build

# Запуск продакшен версии
docker-compose up -d
```

### Запуск тестов

```bash
# Запуск тестов
npm test
```

## Развертывание

# Ручное развертывание через Docker
docker-compose -f docker-compose.yml up -d --build
```

### Переменные окружения

Для продакшен развертывания необходимо настроить следующие переменные:

- `NODE_ENV=production` - режим работы
- `PORT=3001` - порт backend сервера
- `API_URL` - URL внешнего API (настраивается в docker-compose.yml)

## Разработка

### Архитектура приложения

- **Frontend**: React приложение с Material-UI компонентами
- **BFF**: Koa.js сервер, который проксирует запросы к внешнему API
- **Docker**: Контейнеризация для изоляции и портабельности

### Структура компонентов

- Все компоненты находятся в папке `src/components/`
- Стили компонентов вынесены в отдельные CSS файлы
- Используется модульная архитектура с разделением на страницы и компоненты

### Управление состоянием

- Используется Redux Toolkit для глобального состояния
- RTK Query для работы с API и кэширования данных
- Redux Persist для сохранения состояния между сессиями
