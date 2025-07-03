import { prisma } from '@/lib/prisma';
import chalk from 'chalk';

/**
 * Проверка целостности уровней BizLevel
 * Выводит статус для каждого уровня с emoji:
 *   ✅ OK, ⚠️ Warning, ❌ Error
 */
async function validateLevels() {
  const levelTags = await prisma.tag.findMany({
    where: { name: { startsWith: 'level-' } },
    select: { uid: true, name: true },
  });

  for (const tag of levelTags) {
    const questions = await prisma.questions.findMany({
      where: {
        questionTags: { some: { tagId: tag.uid } },
      },
      orderBy: { previousQuestionSlug: 'asc' },
      select: {
        uid: true,
        slug: true,
        questionType: true,
        previousQuestionSlug: true,
        nextQuestionSlug: true,
        codeSnippet: true,
      },
    });

    const total = questions.length;
    const videoQuestions = questions.filter((q) => q.questionType === 'VIDEO');
    const testQuestions = questions.filter((q) => q.questionType === 'MULTIPLE_CHOICE');

    const errors: string[] = [];
    const warnings: string[] = [];

    // Навигация
    if (total === 0) {
      errors.push('Нет уроков');
    } else {
      if (questions[0].previousQuestionSlug !== null) {
        errors.push('Первый урок имеет previousQuestionSlug');
      }
      if (questions[total - 1].nextQuestionSlug !== null) {
        errors.push('Последний урок имеет nextQuestionSlug');
      }
      // проверить цепочку целиком
      for (let i = 0; i < total - 1; i++) {
        if (questions[i].nextQuestionSlug !== questions[i + 1].slug) {
          errors.push(`Разрыв навигации между ${questions[i].slug} -> ${questions[i + 1].slug}`);
          break;
        }
      }
    }

    // Видео
    for (const q of videoQuestions) {
      if (!q.codeSnippet) {
        errors.push(`VIDEO урок ${q.slug} без Vimeo ID`);
      } else if (!/^\d+$/.test(q.codeSnippet)) {
        errors.push(`Vimeo ID неверный у ${q.slug}`);
      }
    }

    // Минимальная структура
    if (videoQuestions.length === 0) warnings.push('Нет VIDEO уроков');
    if (testQuestions.length === 0) warnings.push('Нет тестов');

    // Приветствие и финальный тест
    const hasGreeting = questions[0]?.questionType === 'MULTIPLE_CHOICE';
    const hasFinalTest = questions[total - 1]?.questionType === 'MULTIPLE_CHOICE';
    if (!hasGreeting) warnings.push('Отсутствует приветственный урок');
    if (!hasFinalTest) warnings.push('Отсутствует финальный тест');

    // Подготовка вывода
    let statusEmoji = '✅';
    if (errors.length) statusEmoji = '❌';
    else if (warnings.length) statusEmoji = '⚠️';

    const summary = `${tag.name}: ${statusEmoji} ${errors.length ? 'Error' : warnings.length ? 'Warning' : 'OK'} (${total} questions)`;

    if (statusEmoji === '✅') console.log(chalk.green(summary));
    else if (statusEmoji === '⚠️') console.log(chalk.yellow(summary));
    else console.log(chalk.red(summary));

    if (errors.length) errors.forEach((e) => console.log(chalk.red(`  - ${e}`)));
    if (warnings.length) warnings.forEach((w) => console.log(chalk.yellow(`  - ${w}`)));
    console.log();
  }

  await prisma.$disconnect();
}

validateLevels().catch((err) => {
  console.error(err);
  process.exit(1);
}); 