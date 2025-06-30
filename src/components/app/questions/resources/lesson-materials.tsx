'use client';

import { QuestionResources } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface LessonMaterialsProps {
  resources: QuestionResources[] | undefined;
  levelTitle?: string;
}

export default function LessonMaterials({ resources, levelTitle }: LessonMaterialsProps) {
  if (!resources || resources.length === 0) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 mt-8"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-800 rounded-lg">
          <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
            Артефакты для самостоятельной работы
          </h3>
          {levelTitle && (
            <p className="text-sm text-green-700 dark:text-green-300">
              Дополнительные материалы по теме "{levelTitle}"
            </p>
          )}
        </div>
      </div>
      
      <p className="text-sm text-green-800 dark:text-green-200 mb-4">
        Загрузите полезные шаблоны, чек-листы и руководства для применения полученных знаний на практике.
      </p>

      <div className="grid gap-3">
        {resources.map((resource) => (
          <motion.div
            key={resource.uid}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-green-200 dark:border-green-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-800 rounded">
                <Download className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  {resource.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Материал для скачивания
                </p>
              </div>
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/30"
            >
              <a 
                href={resource.resource} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-3 h-3" />
                Открыть
              </a>
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
        <p className="text-xs text-green-700 dark:text-green-300">
          💡 <strong>Совет:</strong> Используйте эти материалы для закрепления знаний и применения изученного в своем бизнесе.
        </p>
      </div>
    </motion.div>
  );
} 