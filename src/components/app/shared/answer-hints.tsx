'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { MessageCircle, Eye, Lightbulb } from 'lucide-react';
import { useTranslation } from '@/utils/translations/ru';

interface AnswerHintsProps {
  attempts: number;
  questionHint?: string | null;
  questionTitle?: string; // eslint-disable-line @typescript-eslint/no-unused-vars
  questionUid?: string; // eslint-disable-line @typescript-eslint/no-unused-vars
  onAskLeo?: () => void;
  showCorrectAnswer?: () => void;
}

/**
 * Компонент для показа подсказок при неправильных ответах
 * - После 1 попытки: показывает hint из БД или общую подсказку
 * - После 2 попытки: показывает кнопку "Спросить Leo"
 * - После 3+ попытки: показывает кнопку "Показать правильный ответ"
 */
export default function AnswerHints({
  attempts,
  questionHint,
  questionTitle: _questionTitle, // eslint-disable-line @typescript-eslint/no-unused-vars
  questionUid: _questionUid, // eslint-disable-line @typescript-eslint/no-unused-vars
  onAskLeo,
  showCorrectAnswer,
}: AnswerHintsProps) {
  const { t } = useTranslation();

  if (attempts === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-3"
    >
      {/* Первая попытка - показываем подсказку */}
      {attempts >= 1 && (
        <Card className="p-4 bg-amber-500/10 border-amber-500/20">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-amber-200 mb-1">
                {t('lessons.hintTitle')}
              </h4>
              <p className="text-sm text-amber-100">
                {questionHint || 'Подумайте еще раз о концепции. Попробуйте другой подход к решению.'}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Вторая попытка - предлагаем спросить Leo */}
      {attempts >= 2 && (
        <Card className="p-4 bg-blue-500/10 border-blue-500/20">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-blue-200 mb-1">
                {t('lessons.needHelp')}
              </h4>
              <p className="text-sm text-blue-100 mb-3">
                {t('lessons.hintDescription')}
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={onAskLeo}
                className="bg-blue-500/20 border-blue-500/40 text-blue-200 hover:bg-blue-500/30"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {t('lessons.askLeo')}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Третья попытка - показываем правильный ответ */}
      {attempts >= 3 && (
        <Card className="p-4 bg-green-500/10 border-green-500/20">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <Eye className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-green-200 mb-1">
                {t('lessons.showAnswer')}
              </h4>
              <p className="text-sm text-green-100 mb-3">
                {t('lessons.showAnswerDescription')}
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={showCorrectAnswer}
                className="bg-green-500/20 border-green-500/40 text-green-200 hover:bg-green-500/30"
              >
                <Eye className="w-4 h-4 mr-2" />
                {t('lessons.showCorrectAnswer')}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </motion.div>
  );
} 