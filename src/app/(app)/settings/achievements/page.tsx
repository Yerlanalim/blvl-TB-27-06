'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Target, 
  Zap, 
  CheckCircle, 
  Lock,
  Calendar,
  TrendingUp,
  Award,
  Star,
  Flame,
  BookOpen,
  Users
} from 'lucide-react';

// import { useUser } from '@/hooks/use-user'; // ЭТАП 6.2: Временно не используется

// BIZLEVEL: Типы достижений для бизнес-обучения
interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'levels' | 'streak' | 'speed' | 'accuracy' | 'social';
  isUnlocked: boolean;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
  requirement: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// BIZLEVEL: Заглушка достижений для бизнес-обучения
const achievements: Achievement[] = [
  // Завершение уровней
  {
    id: 'first-steps',
    title: 'Первые шаги',
    description: 'Завершите свой первый урок по основам бизнеса',
    icon: BookOpen,
    category: 'levels',
    isUnlocked: true,
    unlockedAt: new Date('2024-01-15'),
    requirement: 'Завершить 1 урок',
    rarity: 'common',
  },
  {
    id: 'business-expert',
    title: 'Знаток бизнеса',
    description: 'Завершите 3 уровня обучения',
    icon: Target,
    category: 'levels',
    isUnlocked: false,
    progress: 1,
    maxProgress: 3,
    requirement: 'Завершить 3 уровня',
    rarity: 'rare',
  },
  {
    id: 'master-entrepreneur',
    title: 'Мастер предпринимательства',
    description: 'Завершите все 5 уровней обучения',
    icon: Trophy,
    category: 'levels',
    isUnlocked: false,
    progress: 1,
    maxProgress: 5,
    requirement: 'Завершить все уровни',
    rarity: 'legendary',
  },
  
  // Серии дней
  {
    id: 'streak-3',
    title: '3 дня подряд',
    description: 'Занимайтесь 3 дня подряд',
    icon: Flame,
    category: 'streak',
    isUnlocked: true,
    unlockedAt: new Date('2024-01-17'),
    requirement: 'Серия 3 дня',
    rarity: 'common',
  },
  {
    id: 'streak-week',
    title: 'Неделя',
    description: 'Занимайтесь неделю подряд',
    icon: Calendar,
    category: 'streak',
    isUnlocked: false,
    progress: 3,
    maxProgress: 7,
    requirement: 'Серия 7 дней',
    rarity: 'rare',
  },
  {
    id: 'streak-month',
    title: 'Месяц',
    description: 'Занимайтесь месяц подряд',
    icon: Award,
    category: 'streak',
    isUnlocked: false,
    progress: 3,
    maxProgress: 30,
    requirement: 'Серия 30 дней',
    rarity: 'epic',
  },
  
  // Скорость
  {
    id: 'speed-learner',
    title: 'Быстрее среднего',
    description: 'Завершите урок быстрее среднего времени',
    icon: Zap,
    category: 'speed',
    isUnlocked: false,
    requirement: 'Время < среднего',
    rarity: 'common',
  },
  {
    id: 'lightning-fast',
    title: 'Скоростной ученик',
    description: 'Завершите 5 уроков быстрее среднего',
    icon: TrendingUp,
    category: 'speed',
    isUnlocked: false,
    progress: 0,
    maxProgress: 5,
    requirement: '5 быстрых завершений',
    rarity: 'rare',
  },
  
  // Точность
  {
    id: 'perfect-test',
    title: 'Идеальный тест',
    description: 'Ответьте правильно на все вопросы теста',
    icon: CheckCircle,
    category: 'accuracy',
    isUnlocked: false,
    requirement: '100% правильных ответов',
    rarity: 'common',
  },
  {
    id: 'flawless-streak',
    title: 'Безошибочный',
    description: 'Ответьте правильно на 20 вопросов подряд',
    icon: Star,
    category: 'accuracy',
    isUnlocked: false,
    progress: 8,
    maxProgress: 20,
    requirement: '20 правильных подряд',
    rarity: 'epic',
  },
  
  // Социальные
  {
    id: 'first-referral',
    title: 'Наставник',
    description: 'Пригласите друга в BizLevel',
    icon: Users,
    category: 'social',
    isUnlocked: false,
    requirement: 'Пригласить 1 друга',
    rarity: 'rare',
  },
];

const categoryNames = {
  levels: 'Уровни',
  streak: 'Постоянство',
  speed: 'Скорость',
  accuracy: 'Точность',
  social: 'Социальные',
};

const rarityColors = {
  common: 'bg-gray-500',
  rare: 'bg-blue-500',
  epic: 'bg-purple-500',
  legendary: 'bg-yellow-500',
};

const rarityNames = {
  common: 'Обычное',
  rare: 'Редкое',
  epic: 'Эпическое',
  legendary: 'Легендарное',
};

export default function AchievementsPage() {
  // const { user } = useUser(); // ЭТАП 6.2: Временно не используется
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = Object.keys(categoryNames) as Array<keyof typeof categoryNames>;
  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const totalCount = achievements.length;
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  return (
    <div className="flex flex-col">
      <div className="space-y-1 p-8">
        <h1 className="text-3xl">Достижения</h1>
        <p className="text-base">Отслеживайте свой прогресс и получайте награды за успехи в обучении.</p>
      </div>
      <Separator className="w-full bg-black-50" />

      {/* Общая статистика */}
      <div className="p-8">
        <Card className="bg-black-75 border-black-50 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-accent" />
              Общий прогресс
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Получено достижений</span>
              <span className="text-accent font-bold">{unlockedCount}/{totalCount}</span>
            </div>
            <Progress 
              value={completionPercentage} 
              className="h-3 bg-black-100"
              indicatorColor="bg-accent"
            />
            <p className="text-xs text-gray-400 mt-2">
              {completionPercentage}% завершено
            </p>
          </CardContent>
        </Card>

        {/* Фильтры по категориям */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            className="text-sm"
          >
            Все
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="text-sm"
            >
              {categoryNames[category]}
            </Button>
          ))}
        </div>

        {/* Сетка достижений */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAchievements.map((achievement) => (
            <Dialog key={achievement.id}>
              <DialogTrigger asChild>
                <Card 
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                    achievement.isUnlocked 
                      ? 'bg-black-75 border-accent/50 hover:border-accent' 
                      : 'bg-black-100 border-black-50 opacity-75'
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-full ${
                        achievement.isUnlocked ? 'bg-accent/20' : 'bg-gray-600/20'
                      }`}>
                        {achievement.isUnlocked ? (
                          <achievement.icon className="w-6 h-6 text-accent" />
                        ) : (
                          <Lock className="w-6 h-6 text-gray-500" />
                        )}
                      </div>
                      <Badge 
                        className={`${rarityColors[achievement.rarity]} text-white text-xs`}
                      >
                        {rarityNames[achievement.rarity]}
                      </Badge>
                    </div>
                    <CardTitle className={`text-lg ${
                      achievement.isUnlocked ? 'text-white' : 'text-gray-400'
                    }`}>
                      {achievement.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm mb-3">
                      {achievement.description}
                    </CardDescription>
                    
                    {/* Прогресс для незавершенных достижений */}
                    {!achievement.isUnlocked && achievement.progress !== undefined && achievement.maxProgress && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Прогресс</span>
                          <span className="text-gray-300">
                            {achievement.progress}/{achievement.maxProgress}
                          </span>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-2 bg-black-100"
                          indicatorColor="bg-accent"
                        />
                      </div>
                    )}
                    
                    {/* Дата получения */}
                    {achievement.isUnlocked && achievement.unlockedAt && (
                      <p className="text-xs text-accent mt-2">
                        Получено: {achievement.unlockedAt.toLocaleDateString('ru-RU')}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </DialogTrigger>
              
              {/* Модальное окно с деталями */}
              <DialogContent className="bg-black-75 border-black-50">
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-3 rounded-full ${
                      achievement.isUnlocked ? 'bg-accent/20' : 'bg-gray-600/20'
                    }`}>
                      {achievement.isUnlocked ? (
                        <achievement.icon className="w-8 h-8 text-accent" />
                      ) : (
                        <Lock className="w-8 h-8 text-gray-500" />
                      )}
                    </div>
                    <div>
                      <DialogTitle className="text-xl">{achievement.title}</DialogTitle>
                      <Badge className={`${rarityColors[achievement.rarity]} text-white mt-1`}>
                        {rarityNames[achievement.rarity]}
                      </Badge>
                    </div>
                  </div>
                </DialogHeader>
                
                <DialogDescription className="text-base mb-4">
                  {achievement.description}
                </DialogDescription>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-300">Категория: </span>
                    <span className="text-sm text-white">{categoryNames[achievement.category]}</span>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-300">Требование: </span>
                    <span className="text-sm text-white">{achievement.requirement}</span>
                  </div>
                  
                  {achievement.isUnlocked && achievement.unlockedAt && (
                    <div>
                      <span className="text-sm font-medium text-gray-300">Получено: </span>
                      <span className="text-sm text-accent">
                        {achievement.unlockedAt.toLocaleDateString('ru-RU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                  
                  {!achievement.isUnlocked && achievement.progress !== undefined && achievement.maxProgress && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Прогресс:</span>
                        <span className="text-white">
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                      <Progress 
                        value={(achievement.progress / achievement.maxProgress) * 100} 
                        className="h-3 bg-black-100"
                        indicatorColor="bg-accent"
                      />
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
} 