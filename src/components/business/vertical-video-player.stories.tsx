import type { Meta, StoryObj } from '@storybook/react';
import VerticalVideoPlayer from './vertical-video-player';

const meta: Meta<typeof VerticalVideoPlayer> = {
  title: 'Business/VerticalVideoPlayer',
  component: VerticalVideoPlayer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Вертикальный видеоплеер для бизнес-уроков с поддержкой свайп-жестов и полноэкранного режима',
      },
    },
  },
  argTypes: {
    videoId: {
      control: 'text',
      description: 'ID видео из Vimeo',
    },
    title: {
      control: 'text',
      description: 'Заголовок урока',
    },
    enableSwipeNavigation: {
      control: 'boolean',
      description: 'Включить свайп-жесты для навигации',
    },
    isFullscreen: {
      control: 'boolean',
      description: 'Полноэкранный режим',
    },
    onComplete: { action: 'completed' },
    onPlay: { action: 'played' },
    onNext: { action: 'next' },
    onPrevious: { action: 'previous' },
    onExitFullscreen: { action: 'exit-fullscreen' },
  },
};

export default meta;
type Story = StoryObj<typeof VerticalVideoPlayer>;

export const Default: Story = {
  args: {
    videoId: '123456789', // Демо ID
    title: 'Урок 1: Основы бизнес-планирования',
    enableSwipeNavigation: true,
    isFullscreen: false,
  },
};

export const WithoutTitle: Story = {
  args: {
    videoId: '123456789',
    enableSwipeNavigation: true,
    isFullscreen: false,
  },
};

export const FullscreenMode: Story = {
  args: {
    videoId: '123456789',
    title: 'Урок 2: Анализ конкурентов',
    enableSwipeNavigation: true,
    isFullscreen: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const WithoutSwipeNavigation: Story = {
  args: {
    videoId: '123456789',
    title: 'Урок 3: Финансовое планирование',
    enableSwipeNavigation: false,
    isFullscreen: false,
  },
};

export const BusinessLesson: Story = {
  args: {
    videoId: '123456789',
    title: 'Урок 4: Маркетинговые стратегии для стартапов',
    enableSwipeNavigation: true,
    isFullscreen: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример бизнес-урока с полной функциональностью свайп-навигации',
      },
    },
  },
};

export const MobileOptimized: Story = {
  args: {
    videoId: '123456789',
    title: 'Урок 5: Управление командой',
    enableSwipeNavigation: true,
    isFullscreen: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Оптимизированная версия для мобильных устройств с свайп-жестами',
      },
    },
  },
}; 