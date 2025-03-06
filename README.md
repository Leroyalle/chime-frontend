# Chime Frontend

Фронтенд часть социальной платформы Chime.

## Возможности

- Посты с медиа
- Личные интерактивные чаты
- Лайки и комментарии
- Система хэштегов
- Репосты и закладки

## Технологии

- Next.js
- TypeScript
- NextUI + Shadcn/ui
- TanStack Query
- Zustand
- Tailwind CSS
- Socket IO

## Запуск приложения

### Требования:

- Node.js 18+
- Docker (опционально)

### Локальная разработка:

1. Клонируйте репозиторий:

```bash
git clone https://github.com/Leroyalle/chime-frontend.git
cd chime-frontend
```

2. Создайте и заполните файл `.env`:

```bash
cp .env.example .env
```

3. Установите зависимости:

```bash
npm install --legacy-peer-deps
```

4. Запустите сервер разработки:

```bash
npm run dev
```

### Продакшн:

```bash
npm run build
npm start
```

### Docker:

Проект включает Dockerfile и docker-compose.yml для контейнеризации.

```bash
# Сборка и запуск
docker compose up
```
