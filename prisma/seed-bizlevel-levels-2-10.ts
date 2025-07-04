import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Данные уровней 2–10: номер, название и краткое описание
const levelsInfo = [
  { number: 2, title: 'Экспресс-стресс-менеджмент', description: '1–2 техники снятия стресса: дыхательные упражнения, быстрые мини-перерывы' },
  { number: 3, title: 'Управление приоритетами: матрица «Важно-Срочно»', description: 'Как структурировать задачи и выделять главное по методике «Важно-Срочно»' },
  { number: 4, title: 'Базовый учёт доходов/расходов', description: 'Простой метод фиксации денежных операций и разграничения личных и бизнес-денег' },
  { number: 5, title: 'Создание УТП (Уникальное торговое предложение)', description: 'Формулируем уникальность вашего продукта или услуги пошагово' },
  { number: 6, title: 'Elevator Pitch: 1-минутное представление', description: 'Как за 60 секунд объяснить ценность вашего бизнеса собеседнику' },
  { number: 7, title: 'Мини-планирование на 1 неделю (SMART)', description: 'Ставим SMART-цели на ближайшую неделю: продажи, маркетинг, финансы' },
  { number: 8, title: 'Блиц-опрос клиентов: 5 ключевых вопросов', description: 'Быстро выявляем потребности клиентов через короткие интервью' },
  { number: 9, title: 'Регистрация и первый юридический чек-лист', description: 'Краткий обзор основных юридических и налоговых правил для старта' },
  { number: 10, title: 'Моя карта ближайших действий', description: 'Объединяем всё изученное: цели, УТП, опросы, базовый учёт, приоритеты' }
]

// Небольшой набор публичных Vimeo ID для демонстрации (будут циклически использоваться)
const demoVideoIds = ['76979871', '148751763', '394233151']

/**
 * Генерирует массив вопросов для одного уровня
 */
function generateLevelQuestions(levelNumber: number) {
  const levelTag = `level-${levelNumber}`
  const questions: any[] = []

  // 1. Приветствие (MULTIPLE_CHOICE)
  questions.push({
    uid: `${levelTag}-intro`,
    type: 'MULTIPLE_CHOICE',
    title: `Введение уровня ${levelNumber}`,
    question: 'Готовы перейти к новым бизнес-знаниям?',
    answers: ['Да, готовы!', 'Пока нет'],
    correctAnswer: 0,
    tags: [levelTag, 'intro', 'test'],
    slug: `${levelTag}-intro`,
  })

  // 2-4. Три видео-урока
  for (let i = 1; i <= 3; i++) {
    const videoId = demoVideoIds[(i - 1) % demoVideoIds.length]
    questions.push({
      uid: `${levelTag}-video-${i}`,
      type: 'VIDEO',
      title: `Урок ${i}: Видео уровня ${levelNumber}`,
      question: 'Посмотрите видео-урок и сделайте заметки',
      videoId,
      tags: [levelTag, 'video-lesson'],
      slug: `${levelTag}-video-${i}`,
      hint: 'Запишите 3 ключевые идеи из видео',
      resources: [{
        title: `Слайды урока ${i}`,
        url: `https://bizlevel.kz/resources/${levelTag}-video-${i}.pdf`,
      }]
    })
  }

  // 5-7. Три теста после видео
  for (let i = 1; i <= 3; i++) {
    questions.push({
      uid: `${levelTag}-test-${i}`,
      type: 'MULTIPLE_CHOICE',
      title: `Тест ${i}: Проверка понимания`,
      question: 'Выберите верное утверждение по теме урока',
      answers: ['Утверждение A', 'Утверждение B', 'Утверждение C', 'Утверждение D'],
      correctAnswer: 0,
      hint: 'Вспомните основные идеи видео',
      tags: [levelTag, 'test'],
      slug: `${levelTag}-test-${i}`,
    })
  }

  // 8. Финальный тест с ресурсами
  questions.push({
    uid: `${levelTag}-final-test`,
    type: 'MULTIPLE_CHOICE',
    title: `Итоговый тест уровня ${levelNumber}`,
    question: 'Какой главный вывод вы сделали из этого уровня?',
    answers: [
      'Чёткое понимание темы',
      'Отложу на потом',
      'Ничего нового',
      'Затрудняюсь ответить'
    ],
    correctAnswer: 0,
    hint: 'Подумайте о практическом применении знаний',
    tags: [levelTag, 'test'],
    slug: `${levelTag}-final-test`,
    resources: [{
      title: 'Дополнительные материалы уровня',
      url: `https://bizlevel.kz/resources/${levelTag}-materials.pdf`
    }]
  })

  return questions
}

async function seedLevels2to10() {
  console.log('🌱 Начинаем seed уровней 2–10')

  // Общие вспомогательные теги
  const commonTags = ['video-lesson', 'test', 'intro']
  for (const tagName of commonTags) {
    await prisma.tag.upsert({ where: { name: tagName }, update: {}, create: { name: tagName } })
  }

  for (const level of levelsInfo) {
    const levelTag = `level-${level.number}`

    // Создаём тег уровня
    await prisma.tag.upsert({ where: { name: levelTag }, update: {}, create: { name: levelTag } })

    const questions = generateLevelQuestions(level.number)

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i]
      const prev = i > 0 ? questions[i - 1] : null
      const next = i < questions.length - 1 ? questions[i + 1] : null

      const createdQuestion = await prisma.questions.upsert({
        where: { slug: q.slug },
        update: {},
        create: {
          uid: q.uid,
          question: q.question,
          title: q.title,
          questionType: q.type,
          difficulty: 'BEGINNER',
          correctAnswer: q.type === 'MULTIPLE_CHOICE' ? q.correctAnswer.toString() : 'video_completed',
          codeSnippet: q.type === 'VIDEO' ? q.videoId : undefined,
          hint: q.hint,
          slug: q.slug,
          slugGenerated: true,
          questionDate: new Date().toISOString().split('T')[0],
          previousQuestionSlug: prev?.slug,
          nextQuestionSlug: next?.slug,
        }
      })

      // Ответы для MULTIPLE_CHOICE
      if (q.type === 'MULTIPLE_CHOICE' && q.answers) {
        for (const answer of q.answers) {
          try {
            await prisma.questionAnswers.create({
              data: { answer, questionUid: createdQuestion.uid }
            })
          } catch (e) {
            // Игнорируем дубликаты, если такой ответ уже существует
          }
        }
      }

      // Ресурсы
      if (q.resources) {
        for (const res of q.resources) {
          try {
            await prisma.questionResources.create({
              data: { questionUid: createdQuestion.uid, resource: res.url, title: res.title }
            })
          } catch (e) {
            // Дубликат ресурса — пропускаем
          }
        }
      }

      // Теги для вопроса
      const tagNames = q.tags as string[]
      for (const tagName of tagNames) {
        const tag = await prisma.tag.findUnique({ where: { name: tagName } })
        if (tag) {
          await prisma.questionTags.upsert({
            where: { questionId_tagId: { questionId: createdQuestion.uid, tagId: tag.uid } },
            update: {},
            create: { questionId: createdQuestion.uid, tagId: tag.uid }
          })
        }
      }

      console.log(`  ✅ Вопрос создан: ${q.slug}`)
    }

    // Обновляем StudyPath «business-basics», если существует
    try {
      const sp = await prisma.studyPath.findUnique({ where: { slug: 'business-basics' } })
      if (sp) {
        const newSlugs = questions.map(q => q.slug)
        const mergedSlugs = Array.from(new Set([...sp.questionSlugs, ...newSlugs]))

        await prisma.studyPath.update({
          where: { uid: sp.uid },
          data: {
            questionSlugs: mergedSlugs,
            overviewData: {
              ...(sp.overviewData as any || {}),
              [`level-${level.number}`]: {
                title: level.title,
                description: level.description,
                questions: newSlugs
              }
            }
          }
        })
      }
    } catch (e) {
      console.warn(`⚠️  Не удалось обновить StudyPath для уровня ${level.number}:`, e)
    }

    console.log(`🎉 Уровень ${level.number} (${level.title}) сгенерирован!`)
  }

  console.log('✅ Все уровни 2–10 успешно созданы')
}

export default seedLevels2to10

if (require.main === module) {
  seedLevels2to10()
    .catch((e) => {
      console.error('❌ Ошибка seed уровней 2-10:', e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
} 