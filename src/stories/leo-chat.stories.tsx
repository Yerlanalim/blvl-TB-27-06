import type { Meta, StoryObj } from '@storybook/react';
import LeoChat from '@/components/app/leo-chat/leo-chat';

const meta: Meta<typeof LeoChat> = {
  title: 'App/Leo Chat',
  component: LeoChat,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Leo - персональный бизнес-наставник. Плавающий чат для помощи пользователям в изучении бизнеса.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LeoChat>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Базовое состояние Leo чата с плавающей кнопкой.',
      },
    },
  },
};

export const WithDarkBackground: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0a' },
      ],
    },
    docs: {
      description: {
        story: 'Leo чат на темном фоне (как в приложении).',
      },
    },
  },
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Leo чат в мобильном разрешении - занимает весь экран при открытии.',
      },
    },
  },
};

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Leo чат на планшете - адаптивное окно чата.',
      },
    },
  },
};

export const DesktopView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'Leo чат на десктопе - компактное окно справа внизу.',
      },
    },
  },
};

export const InteractionDemo: Story = {
  parameters: {
    docs: {
      description: {
        story: `
## Функциональность Leo чата:

### Основные возможности:
- **Плавающая кнопка** - всегда видна в правом нижнем углу
- **Адаптивное окно** - полный экран на мобильных, окно на десктопе
- **Минимизация** - возможность свернуть чат
- **Состояние в localStorage** - запоминает открыт ли чат
- **Быстрые вопросы** - готовые кнопки для начала диалога

### Интерфейс:
- **Аватар Leo** - круг с буквой "L" в зеленом цвете
- **Временные метки** - время отправки каждого сообщения  
- **Разные стили** - пользователь справа (зеленый), Leo слева (серый)
- **Анимации** - плавное появление/исчезновение окна

### Планируемые возможности:
- Интеграция с AI для ответов Leo
- Сохранение истории в базе данных
- Контекстные подсказки в зависимости от страницы
- Система уведомлений от Leo
        `,
      },
    },
  },
}; 