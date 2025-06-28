import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Структура первого уровня BizLevel
const level1Questions = [
  // 1. Введение
  {
    uid: 'welcome-to-business',
    type: 'MULTIPLE_CHOICE' as const,
    title: 'Добро пожаловать в мир бизнеса!',
    question: 'Готовы ли вы начать свой путь предпринимателя?',
    answers: ['Да, начнем!', 'Хочу узнать больше'],
    correctAnswer: 0,
    tags: ['level-1', 'business-basics'],
    slug: 'welcome-to-business',
  },
  
  // 2. Видео 1
  {
    uid: 'business-model-intro',
    type: 'VIDEO' as const,
    title: 'Урок 1: Что такое бизнес-модель?',
    question: 'Посмотрите видео о типах бизнес-моделей',
    videoId: '123456789', // Vimeo ID
    tags: ['level-1', 'video-lesson', 'business-basics'],
    slug: 'business-model-intro',
    hint: 'Изучите различные типы бизнес-моделей и выберите подходящую для вашего проекта',
    resources: [{
      title: 'Гид по бизнес-моделям для начинающих',
      url: 'https://bizlevel.kz/resources/business-models-guide.pdf'
    }]
  },
  
  // 3. Тест после видео 1
  {
    uid: 'business-models-test-1',
    type: 'MULTIPLE_CHOICE' as const,
    title: 'Проверка знаний: Бизнес-модели',
    question: 'Какая бизнес-модель подразумевает регулярные платежи?',
    answers: [
      'Разовая продажа',
      'Подписка',
      'Фриланс',
      'Аукцион'
    ],
    correctAnswer: 1,
    hint: 'Подумайте о Netflix или Spotify',
    tags: ['level-1', 'test', 'business-basics'],
    slug: 'business-models-test-1',
  },
  
  // 4. Видео 2
  {
    uid: 'smart-goals-video',
    type: 'VIDEO' as const,
    title: 'Урок 2: SMART-цели для предпринимателей',
    question: 'Изучите принципы целеполагания в бизнесе',
    videoId: '987654321', // Vimeo ID
    tags: ['level-1', 'video-lesson', 'goal-setting'],
    slug: 'smart-goals-video',
    hint: 'Научитесь ставить конкретные, измеримые цели',
    resources: [{
      title: 'Шаблон для постановки SMART-целей',
      url: 'https://bizlevel.kz/resources/smart-goals-template.pdf'
    }]
  },
  
  // 5. Тест по целеполаганию
  {
    uid: 'smart-goals-test',
    type: 'MULTIPLE_CHOICE' as const,
    title: 'Тест: SMART-цели',
    question: 'Выберите правильную SMART-цель:',
    answers: [
      'Сделать бизнес успешнее',
      'Увеличить продажи кофе на 20% к 1 мая 2025',
      'Работать лучше с клиентами',
      'Развивать компанию'
    ],
    correctAnswer: 1,
    hint: 'SMART = Конкретная, Измеримая, Достижимая, Релевантная, Ограниченная по времени',
    tags: ['level-1', 'test', 'goal-setting'],
    slug: 'smart-goals-test',
  },
  
  // 6. Видео 3
  {
    uid: 'target-audience-video',
    type: 'VIDEO' as const,
    title: 'Урок 3: Целевая аудитория и клиенты',
    question: 'Узнайте, как найти и понять свою целевую аудиторию',
    videoId: '456789123', // Vimeo ID
    tags: ['level-1', 'video-lesson', 'business-basics'],
    slug: 'target-audience-video',
    hint: 'Изучите методы исследования и сегментации аудитории',
    resources: [{
      title: 'Чек-лист для исследования аудитории',
      url: 'https://bizlevel.kz/resources/audience-research-checklist.pdf'
    }]
  },
  
  // 7. Итоговый тест
  {
    uid: 'level-1-final-test',
    type: 'MULTIPLE_CHOICE' as const,
    title: 'Итоговый тест: Основы бизнеса',
    question: 'Что является первым шагом при запуске бизнеса?',
    answers: [
      'Определить цели и целевую аудиторию',
      'Найти инвесторов',
      'Создать продукт',
      'Запустить рекламу'
    ],
    correctAnswer: 0,
    hint: 'Подумайте о том, что нужно сделать перед всеми остальными шагами',
    tags: ['level-1', 'test', 'business-basics'],
    slug: 'level-1-final-test',
  },
]

async function seedLevel1() {
  console.log('🌱 Начинаем seed данных для уровня 1...')
  
  try {
    // Создание тегов
    const tagNames = ['level-1', 'business-basics', 'goal-setting', 'video-lesson', 'test']
    for (const tagName of tagNames) {
      await prisma.tag.upsert({
        where: { name: tagName },
        update: {},
        create: { name: tagName }
      })
    }
    console.log('✅ Теги созданы')

    // Создание вопросов с навигацией
    for (let i = 0; i < level1Questions.length; i++) {
      const questionData = level1Questions[i]
      const prevQuestion = i > 0 ? level1Questions[i - 1] : null
      const nextQuestion = i < level1Questions.length - 1 ? level1Questions[i + 1] : null

      // Создание вопроса
      const question = await prisma.questions.upsert({
        where: { slug: questionData.slug },
        update: {},
        create: {
          uid: questionData.uid,
          question: questionData.question,
          title: questionData.title,
          questionType: questionData.type,
          difficulty: 'BEGINNER',
          correctAnswer: questionData.correctAnswer?.toString() || 'video_completed',
          codeSnippet: questionData.type === 'VIDEO' ? questionData.videoId : undefined,
          hint: questionData.hint,
          slug: questionData.slug,
          questionDate: new Date().toISOString().split('T')[0],
          previousQuestionSlug: prevQuestion?.slug,
          nextQuestionSlug: nextQuestion?.slug,
        }
      })

      // Добавление ответов для MULTIPLE_CHOICE вопросов
      if (questionData.type === 'MULTIPLE_CHOICE' && questionData.answers) {
        for (const answer of questionData.answers) {
          await prisma.questionAnswers.create({
            data: {
              answer: answer,
              questionUid: question.uid
            }
          })
        }
      }

      // Добавление ресурсов для VIDEO вопросов
      if (questionData.resources) {
        for (const resource of questionData.resources) {
          await prisma.questionResources.create({
            data: {
              questionUid: question.uid,
              resource: resource.url,
              title: resource.title
            }
          })
        }
      }

      // Добавление тегов
      for (const tagName of questionData.tags) {
        const tag = await prisma.tag.findUnique({ where: { name: tagName } })
        if (tag) {
          await prisma.questionTags.upsert({
            where: {
              questionId_tagId: {
                questionId: question.uid,
                tagId: tag.uid
              }
            },
            update: {},
            create: {
              questionId: question.uid,
              tagId: tag.uid
            }
          })
        }
      }

      console.log(`✅ Создан вопрос: ${questionData.title}`)
    }

    console.log('🎉 Seed данных для уровня 1 успешно создан!')
    console.log(`📊 Создано ${level1Questions.length} вопросов`)
    console.log('📝 Структура уровня:')
    console.log('   - 1 вводный вопрос')
    console.log('   - 3 видео урока (VIDEO тип)')
    console.log('   - 3 теста (MULTIPLE_CHOICE тип)')
    console.log('   - Навигация между вопросами настроена')
    console.log('   - Ресурсы для изучения добавлены')
    
  } catch (error) {
    console.error('❌ Ошибка при создании seed данных:', error)
    throw error
  }
}

// Функция для очистки старых технических данных
async function cleanupTechBlitzData() {
  console.log('🧹 Очистка старых технических данных...')
  
  try {
    // Удаление вопросов с техническими тегами
    const techTags = ['javascript', 'react', 'python', 'coding', 'programming']
    
    for (const tagName of techTags) {
      const tag = await prisma.tag.findUnique({ where: { name: tagName } })
      if (tag) {
        // Удаление связей вопросов с техническими тегами
        await prisma.questionTags.deleteMany({
          where: { tagId: tag.uid }
        })
        
        // Удаление самого тега
        await prisma.tag.delete({
          where: { uid: tag.uid }
        })
        
        console.log(`✅ Удален технический тег: ${tagName}`)
      }
    }
    
    console.log('✅ Очистка технических данных завершена')
    
  } catch (error) {
    console.log('ℹ️ Технические данные отсутствуют или уже очищены')
  }
}

async function main() {
  await cleanupTechBlitzData()
  await seedLevel1()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

export default main 