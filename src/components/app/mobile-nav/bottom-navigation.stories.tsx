import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import BottomNavigation from './bottom-navigation';

const meta = {
  title: 'App/Mobile Navigation/Bottom Navigation',
  component: BottomNavigation,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof BottomNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Базовое состояние мобильной навигации с 4 основными разделами.',
      },
    },
  },
};

export const DashboardActive: Story = {
  args: {},
  parameters: {
    nextjs: {
      router: {
        pathname: '/dashboard',
      },
    },
    docs: {
      description: {
        story: 'Состояние с активным разделом "Главная".',
      },
    },
  },
};

export const RoadmapsActive: Story = {
  args: {},
  parameters: {
    nextjs: {
      router: {
        pathname: '/roadmaps',
      },
    },
    docs: {
      description: {
        story: 'Состояние с активным разделом "Карта".',
      },
    },
  },
};

export const LeoChatActive: Story = {
  args: {},
  parameters: {
    nextjs: {
      router: {
        pathname: '/leo-chat',
      },
    },
    docs: {
      description: {
        story: 'Состояние с активным разделом "Leo".',
      },
    },
  },
};

export const ProfileActive: Story = {
  args: {},
  parameters: {
    nextjs: {
      router: {
        pathname: '/settings/profile',
      },
    },
    docs: {
      description: {
        story: 'Состояние с активным разделом "Профиль".',
      },
    },
  },
};

export const OnlyMobileViewport: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Навигация отображается только на мобильных устройствах (класс lg:hidden).',
      },
    },
  },
}; 