#!/usr/bin/env tsx

/**
 * Скрипт для создания seed данных первого уровня BizLevel
 * Запуск: npm run seed:level1
 */

import seedLevel1 from '../prisma/seed-bizlevel-level1'

async function runSeed() {
  console.log('🚀 Запуск seed данных для уровня 1 BizLevel...')
  console.log('='.repeat(50))
  
  try {
    await seedLevel1()
    console.log('='.repeat(50))
    console.log('✅ Seed данных успешно создан!')
    console.log('🎯 Первый уровень готов к использованию')
    console.log('📚 Можете начинать тестирование обучения')
  } catch (error) {
    console.error('='.repeat(50))
    console.error('❌ Ошибка при создании seed данных:')
    console.error(error)
    process.exit(1)
  }
}

runSeed() 