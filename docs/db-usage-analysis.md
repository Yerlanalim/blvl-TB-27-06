# Анализ использования таблиц Supabase (Этап 8.3.1)

> Дата: 2025-07-03

| Таблица | Используется | Кол-во файлов | Последние заметные файлы | Вердикт |
|---------|--------------|---------------|--------------------------|---------|
| DefaultRoadmapQuestions | **ДА** | множество | `src/types/Roadmap.ts`, `prisma/schema.prisma` | Оставить |
| DefaultRoadmapQuestionsAnswers | **ДА** | множество | `prisma/schema.prisma`, запросы в roadmap utils | Оставить |
| RoadmapUserQuestions | **ДА** | множество | `src/utils/data/roadmap/fetch-roadmap-question.ts` | Оставить |
| RoadmapUserQuestionsAnswers | **ДА** | множество | `src/actions/ai/roadmap/generate.ts` | Оставить |
| RoadmapUserQuestionsUserAnswers | **ДА** | множество | `prisma/schema.prisma` | Оставить |
| UserRoadmaps | **ДА** | множество | `src/utils/data/roadmap/fetch-single-roadmap.ts` | Оставить |
| PseoPages | **ДА** | множество | `src/app/(app)/admin/pseo/*.tsx`, `prisma/schema.prisma` | Оставить |
| Mission | **ДА** | множество | `src/components/app/shared/question/daily-goals-card.tsx`, `prisma/schema.prisma` | Оставить |
| UserMission | **ДА** | множество | `src/actions/daily-missions/create-user-missions-record.ts`, `prisma/schema.prisma` | Оставить |

## Вывод
Все проанализированные таблицы активно используются в кодовой базе BizLevel. Удалять их **нельзя** — они задействованы в функциональности уроков, дорожных карт, SEO-страниц и геймификации (миссии). Для дальнейшей очистки необходимо сфокусироваться на других потенциально устаревших таблицах.

---

_Отчёт сгенерирован вручную на основе результатов `scripts/analyze-db-usage.ts` и дополнительного анализа кода._ 