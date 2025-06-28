import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function linkTagsToQuestions() {
  console.log('🔗 Связывание тегов с вопросами level-1...')
  
  try {
    // Получить все теги
    const tags = await prisma.tag.findMany({
      where: {
        name: {
          in: ['level-1', 'business-basics', 'goal-setting', 'video-lesson', 'test']
        }
      }
    })
    
    console.log('📋 Найдено тегов:', tags.length)
    
    // Получить все вопросы level-1
    const questions = await prisma.questions.findMany({
      where: {
        slug: {
          in: [
            'welcome-to-business',
            'business-model-intro', 
            'business-models-test-1',
            'smart-goals-video',
            'smart-goals-test', 
            'target-audience-video',
            'level-1-final-test'
          ]
        }
      }
    })
    
    console.log('📝 Найдено вопросов:', questions.length)
    
    // Создать карту тегов для быстрого поиска
    const tagMap = new Map(tags.map(tag => [tag.name, tag.uid]))
    
    // Связать вопросы с тегами
    for (const question of questions) {
      const questionTags: string[] = []
      
      // Все вопросы получают тег level-1
      questionTags.push('level-1')
      
      // Определить дополнительные теги по slug
      if (['welcome-to-business', 'business-model-intro', 'business-models-test-1', 
           'target-audience-video', 'level-1-final-test'].includes(question.slug || '')) {
        questionTags.push('business-basics')
      }
      
      if (['smart-goals-video', 'smart-goals-test'].includes(question.slug || '')) {
        questionTags.push('goal-setting')
      }
      
      if (['business-model-intro', 'smart-goals-video', 'target-audience-video'].includes(question.slug || '')) {
        questionTags.push('video-lesson')
      }
      
      if (['business-models-test-1', 'smart-goals-test', 'level-1-final-test'].includes(question.slug || '')) {
        questionTags.push('test')
      }
      
      // Создать связи
      for (const tagName of questionTags) {
        const tagUid = tagMap.get(tagName)
        if (tagUid) {
          try {
            await prisma.questionTags.create({
              data: {
                questionId: question.uid,
                tagId: tagUid
              }
            })
            console.log(`✅ Связь создана: ${question.slug} -> ${tagName}`)
          } catch (error: any) {
            if (error.code === 'P2002') {
              // Связь уже существует, пропускаем
              console.log(`⚠️ Связь уже существует: ${question.slug} -> ${tagName}`)
            } else {
              console.error(`❌ Ошибка создания связи ${question.slug} -> ${tagName}:`, error.message)
            }
          }
        }
      }
    }
    
    // Проверить результат
    console.log('\n📊 Проверка результата:')
    const questionsWithTags = await prisma.questions.findMany({
      where: {
        slug: {
          in: [
            'welcome-to-business',
            'business-model-intro', 
            'business-models-test-1',
            'smart-goals-video',
            'smart-goals-test', 
            'target-audience-video',
            'level-1-final-test'
          ]
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
    
    for (const question of questionsWithTags) {
      const tagNames = question.tags.map(qt => qt.tag.name).sort()
      console.log(`${question.slug}: [${tagNames.join(', ')}]`)
    }
    
    console.log('\n🎉 Связывание тегов завершено!')
    
  } catch (error) {
    console.error('❌ Ошибка:', error)
  } finally {
    await prisma.$disconnect()
  }
}

linkTagsToQuestions() 