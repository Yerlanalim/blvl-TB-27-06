'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import VerticalVideoPlayer from '@/components/business/vertical-video-player';
import { useOnboardingContext } from '@/contexts/onboarding-context';

export default function OnboardingIntroVideo() {
  const { itemVariants, setCanContinue } = useOnboardingContext();
  const [hasWatchedVideo, setHasWatchedVideo] = useState(false);

  // Vimeo ID для вводного видео (из плана: https://vimeo.com/263619741)
  const INTRO_VIDEO_ID = '263619741';

  const handleVideoPlay = () => {
    // Разрешаем продолжить сразу после начала воспроизведения
    setCanContinue(true);
  };

  const handleVideoComplete = () => {
    setHasWatchedVideo(true);
    setCanContinue(true);
  };

  return (
    <motion.div
      className="w-full space-y-6"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6 }}
    >
      {/* Заголовок и описание */}
      <div className="text-center space-y-4">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Добро пожаловать в BizLevel! 🚀
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Посмотрите короткое видео о том, как наша система поможет вам освоить основы бизнеса
          </p>
        </motion.div>

        {/* Преимущества обучения - показываем до видео */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">📚</div>
            <h3 className="font-semibold text-gray-800 mb-1">5 уровней</h3>
            <p className="text-sm text-gray-600">От основ до экспертизы</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🎥</div>
            <h3 className="font-semibold text-gray-800 mb-1">Видео-уроки</h3>
            <p className="text-sm text-gray-600">Короткие и понятные</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🤖</div>
            <h3 className="font-semibold text-gray-800 mb-1">AI-наставник Leo</h3>
            <p className="text-sm text-gray-600">Помощь 24/7</p>
          </div>
        </motion.div>
      </div>

      {/* Видео плеер */}
      <motion.div
        className="flex justify-center"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6 }}
      >
        <div className="w-full max-w-sm">
          <VerticalVideoPlayer
            videoId={INTRO_VIDEO_ID}
            title="Как работает BizLevel"
            onPlay={handleVideoPlay}
            onComplete={handleVideoComplete}
            enableSwipeNavigation={false}
            className="mx-auto"
          />
        </div>
      </motion.div>

      {/* Сообщение после просмотра */}
      {hasWatchedVideo && (
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
            <div className="text-green-600 text-center">
              <div className="text-2xl mb-2">✅</div>
              <p className="font-semibold">Готовы начать обучение!</p>
              <p className="text-sm mt-1">Нажмите "Продолжить" чтобы перейти к первому уроку</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Подсказка для пользователя */}
      {!hasWatchedVideo && (
        <motion.div
          className="text-center"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-gray-500">
            💡 Вы можете продолжить сразу после начала просмотра или досмотреть до конца
          </p>
        </motion.div>
      )}
    </motion.div>
  );
} 