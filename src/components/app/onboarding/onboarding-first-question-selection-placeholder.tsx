import { CardHeader } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useOnboardingContext } from '@/contexts/onboarding-context';

export default function OnboardingFirstQuestionSelectionPlaceholder() {
  const { itemVariants } = useOnboardingContext();

  return (
    <CardHeader className="flex flex-col gap-y-4 max-w-xl relative">
      <div className="flex flex-col gap-y-5 mb-3 text-center">
        <motion.h1
          className="text-2xl flex flex-col font-medium bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          Этот раздел временно недоступен
        </motion.h1>
        <motion.div
          className="bg-black-75 border border-black-50 rounded-lg p-6"
          variants={itemVariants}
        >
          <div className="text-center">
            <h3 className="text-white font-medium text-lg mb-3">
              Раздел в разработке 🚧
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Персонализация обучения будет добавлена в следующих обновлениях.
              Пока что мы направим вас на первый уровень обучения.
            </p>
            <p className="text-gray-500 text-xs">
              TODO: v2.0 - добавить выбор пути обучения
            </p>
          </div>
        </motion.div>
      </div>
    </CardHeader>
  );
} 