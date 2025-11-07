# Power Sound

Modern, minimalistic web-player for discovering and listening to music from our crew. Built as a pet project to explore UI/UX, animations, audio APIs, and a clean React + Vite architecture.

## Preview

<img width="300" alt="Power Sound preview" src="https://github.com/user-attachments/assets/e43992f3-0692-4329-85e5-742fa7eb3cd8" />

## Features

- Simple and focus-oriented player for a small curated tracklist
- Play / pause / stop controls
- Track progress bar with time display
- Search by track name / artist
- Sorting options for track list
- Background video for immersive atmosphere
- Responsive layout (desktop / mobile friendly)
- Clean component-based architecture

## Stack

- TypeScript
- React
- Vite
- CSS Modules / custom CSS
- HTML5 Audio API

## Project Structure

Основные части проекта:

- `src/main.tsx` – входная точка приложения
- `src/App.tsx` – корневой компонент
- `src/pages/HomePage.tsx` + `HomePage.css` – основная страница плеера
- `src/components/`
  - `BackgroundVideo/` – видеофон
  - `PowerBanner/` – верхний баннер / заголовок
  - `Avatar/` – аватар/обложка
  - `Search/` – поиск по трекам
  - `SortSelector/` – выбор сортировки
  - `BottomSort/` – сортировка/контролы снизу
  - `TrackProgressBar/` – прогресс и время трека
  - `ButtomSheet/` – доп. панель / нижний sheet
- `src/lib/`
  - `Tracks.ts` – список треков, метаданные
  - `TrackInfo.ts` – модель данных трека
  - `TrackPlayer.ts` – логика управления аудио
  - `MyVibe.ts` – вспомогательные утилиты/логика

## Getting Started

1. Установить зависимости:

   ```bash
   npm install
   ```

2. Запустить dev-сервер:

   ```bash
   npm run dev
   ```

3. Открыть приложение в браузере (обычно):

   ```
   http://localhost:5173
   ```

## Usage

- Выбери трек из списка.
- Управляй воспроизведением (play/pause).
- Следи за прогрессом трека на полосе.
- Используй поиск и сортировку, чтобы быстро находить нужные треки.
- Наслаждайся атмосферным фоном и минималистичным интерфейсом.

## Development Notes

Этот репозиторий создан как пет-проект для:

- Практики с React + TypeScript + Vite
- Работа с аудио (HTML5 Audio API)
- Отработки композиции компонентов и простой архитектуры
- Экспериментов с UI-анимациями и визуальным стилем

## How to Contribute (для друзей/команды)

- Форкни репозиторий или создай ветку.
- Добавь новый трек в `src/lib/Tracks.ts` с корректными метаданными и файлом в `public/`.
- Соблюдай существующий стиль кода.
- Открой Pull Request с коротким описанием изменений.

## License

MIT – свободно используй код как референс или основу для своих экспериментов.
