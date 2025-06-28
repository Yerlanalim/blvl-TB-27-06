#!/usr/bin/env tsx

/**
 * Тестовый скрипт для проверки работы навигации по уровням BizLevel
 * Проверяет логику навигации для всех вопросов level-1
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Упрощенная версия функции навигации для тестирования
async function testGetLevelBasedNavigation(uid: string) {
  // Получить текущий вопрос с тегами
  const currentQuestion = await prisma.questions.findUnique({
    where: { uid },
    select: {
      uid: true,
      slug: true,
      createdAt: true,
      questionType: true,
      tags: {
        select: {
          tag: {
            select: {
              name: true
            }
          }
        }
      }
    },
  });

  if (!currentQuestion) return null;

  // Найти теги уровня (level-1, level-2, etc.)
  const levelTags = currentQuestion.tags
    .map(t => t.tag.name)
    .filter(name => name.startsWith('level-'));

  if (levelTags.length === 0) {
    return null;
  }

  const levelTag = levelTags[0]; // Берем первый тег уровня

  // Получить все вопросы этого уровня, отсортированные по createdAt
  const levelQuestions = await prisma.questions.findMany({
    where: {
      tags: {
        some: {
          tag: {
            name: levelTag
          }
        }
      }
    },
    select: {
      uid: true,
      slug: true,
      createdAt: true,
      questionType: true,
      title: true,
      tags: {
        select: {
          tag: {
            select: {
              name: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  // Найти индекс текущего вопроса
  const currentIndex = levelQuestions.findIndex(q => q.uid === uid);
  if (currentIndex === -1) return null;

  // Логика последовательного прохождения
  const nextQuestion = currentIndex < levelQuestions.length - 1 ? levelQuestions[currentIndex + 1] : null;
  const previousQuestion = currentIndex > 0 ? levelQuestions[currentIndex - 1] : null;

  // Подсчитать прогресс
  const progress = {
    current: currentIndex + 1,
    total: levelQuestions.length,
    level: levelTag,
    percentage: Math.round(((currentIndex + 1) / levelQuestions.length) * 100)
  };

  return {
    nextQuestion: nextQuestion?.slug || null,
    previousQuestion: previousQuestion?.slug || null,
    progress
  };
}

async function testLevelNavigation() {
  console.log('🧪 Тестирование навигации по level-1...')
  console.log('='.repeat(50))
  
  try {
    // Получить все вопросы level-1
    const level1Questions = await prisma.questions.findMany({
      where: {
        tags: {
          some: {
            tag: {
              name: 'level-1'
            }
          }
        }
      },
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    console.log(`📚 Найдено ${level1Questions.length} вопросов level-1`)
    console.log()

    // Тестировать навигацию для каждого вопроса
    for (let i = 0; i < level1Questions.length; i++) {
      const question = level1Questions[i]
      const navigation = await testGetLevelBasedNavigation(question.uid)
      
      console.log(`${i + 1}. ${question.title}`)
      console.log(`   Тип: ${question.questionType}`)
      console.log(`   Slug: ${question.slug}`)
      
      if (navigation) {
        console.log(`   ⬅️  Предыдущий: ${navigation.previousQuestion || 'нет'}`)
        console.log(`   ➡️  Следующий: ${navigation.nextQuestion || 'нет'}`)
        
        if (navigation.progress) {
          console.log(`   📊 Прогресс: ${navigation.progress.current}/${navigation.progress.total} (${navigation.progress.percentage}%)`)
        }
      } else {
        console.log(`   ❌ Навигация не найдена`)
      }
      
      console.log()
    }

    console.log('='.repeat(50))
    console.log('✅ Тестирование завершено успешно!')
    
  } catch (error) {
    console.error('❌ Ошибка при тестировании:')
    console.error(error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testLevelNavigation() 