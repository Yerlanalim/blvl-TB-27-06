import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface NoChallengesEmailProps {
  userName?: string;
  userEmail?: string;
  suggestedChallenge?: {
    title: string;
    difficulty: string;
    url: string;
  };
  streakCount?: number;
  daysInactive?: number;
}

export default function NoChallengesEmail({
  userName = 'there',
  suggestedChallenge = {
    title: 'Основы бизнес-планирования',
    difficulty: 'Начальный',
    url: 'https://bizlevel.kz/question/business-planning-basics',
  },
  streakCount = 0,
  daysInactive = 7,
}: NoChallengesEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Мы скучаем по вам в BizLevel! Вернитесь к изучению бизнеса с быстрым заданием</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={logoContainer}>
            <Img
              src={`https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//logo.png`}
              width="80"
              height="80"
              alt="Logo"
              style={logo}
            />
          </Section>

          {/* Hero Section */}
          <Section style={heroSection}>
            <Heading style={h1}>Мы скучаем по вам!</Heading>
            <Text style={heroText}>
              Прошло {daysInactive} дней с вашего последнего бизнес-задания.
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Personal Message */}
          <Section style={section}>
            <Text style={text}>Привет, {userName}!</Text>
            <Text style={text}>
              Мы заметили, что вы не выполняли бизнес-задания в последнее время. Постоянная практика
              - ключ к мастерству в бизнесе, и мы хотели бы видеть вас снова на правильном пути!
            </Text>
            <Text style={text}>
              {streakCount > 0 ? (
                <>
                  У вас была <strong>серия из {streakCount} дней</strong> ранее. Давайте вернем этот
                  импульс!
                </>
              ) : (
                <>
                  Создание серии изучения бизнеса может значительно улучшить ваши навыки со временем. Даже
                  5 минут в день имеют огромное значение.
                </>
              )}
            </Text>
          </Section>

          {/* Challenge Recommendation */}
          <Section style={challengeSection}>
            <Heading as="h2" style={h2}>
              Задание специально для вас
            </Heading>
            <div style={challengeCard}>
              <Heading as="h3" style={h3}>
                {suggestedChallenge.title}
              </Heading>
              <Text style={challengeDescription}>
                Это задание займет всего 3-5 минут и поможет вам вернуться к изучению
                бизнеса.
              </Text>
              <Button href={suggestedChallenge.url} style={button}>
                Выполнить задание
              </Button>
            </div>
          </Section>

          {/* CTA Section */}
          <Section style={section}>
            <div style={ctaSection}>
              <Heading as="h2" style={h2}>
                Готовы вернуться?
              </Heading>
              <Text style={text}>
                Всего 5 минут изучения бизнеса каждый день могут значительно улучшить ваши навыки
                со временем. Давайте восстановим этот импульс вместе!
              </Text>
              <Button href="https://bizlevel.kz/dashboard" style={buttonLarge}>
                Продолжить ваш путь в бизнесе
              </Button>
            </div>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            {/* Social Links - BIZLEVEL: Скрыто GitHub для бизнес-версии */}
            <Section style={socialLinks}>
              <Link href="https://x.com/bizlevel_dev" style={socialLink}>
                <svg
                  data-testid="geist-icon"
                  height="24"
                  strokeLinejoin="round"
                  viewBox="0 0 16 16"
                  width="24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.60022 2H5.80022L8.78759 6.16842L12.4002 2H14.0002L9.5118 7.17895L14.4002 14H10.2002L7.21285 9.83158L3.60022 14H2.00022L6.48864 8.82105L1.60022 2ZM10.8166 12.8L3.93657 3.2H5.18387L12.0639 12.8H10.8166Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </Link>
            </Section>

            <Text style={footerFine}>© 2025 DEV BIZLEVEL LTD. All rights reserved.</Text>
            <Text style={footerFine}>
              Вы получаете это письмо, потому что согласились получать ежедневные напоминания от
              BizLevel. Хотите перестать получать эти письма? <br />
              <Link href={`https://bizlevel.kz/settings/`} style={footerLink}>
                Обновить настройки email
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0',
  maxWidth: '600px',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
};

const logoContainer = {
  padding: '30px 30px 20px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
  display: 'block',
};

const heroSection = {
  backgroundColor: '#4f46e5',
  padding: '50px 30px',
  textAlign: 'center' as const,
  color: '#ffffff',
  marginBottom: '20px',
};

const h1 = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: '700',
  margin: '0 0 20px',
  lineHeight: '1.2',
};

const heroText = {
  color: '#ffffff',
  fontSize: '18px',
  margin: '0',
  lineHeight: '1.5',
  maxWidth: '400px',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const section = {
  padding: '40px 30px',
};

const challengeSection = {
  padding: '40px 30px',
  backgroundColor: '#f9fafb',
};

const challengeCard = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '24px',
  textAlign: 'center' as const,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e5e7eb',
};

const challengeDescription = {
  color: '#6b7280',
  fontSize: '16px',
  lineHeight: '1.5',
  margin: '0 0 24px',
};

const ctaSection = {
  backgroundColor: '#eff6ff',
  padding: '30px',
  textAlign: 'center' as const,
  borderRadius: '8px',
  width: '89%',
};

const h2 = {
  color: '#374151',
  fontSize: '24px',
  fontWeight: '600',
  margin: '0 0 20px',
  textAlign: 'center' as const,
};

const h3 = {
  color: '#4f46e5',
  fontSize: '20px',
  fontWeight: '600',
  margin: '0 0 12px',
};

const text = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px',
};

const button = {
  backgroundColor: '#4f46e5',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
  margin: '8px 0',
};

const buttonLarge = {
  backgroundColor: '#4f46e5',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 32px',
  margin: '24px 0 0',
  boxShadow: '0 2px 4px rgba(79, 70, 229, 0.2)',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '40px 0',
  borderWidth: '1px',
};

const footer = {
  padding: '0 30px 40px',
  textAlign: 'center' as const,
};

const socialLinks = {
  margin: '25px 0',
};

const socialLink = {
  display: 'inline-block',
  margin: '0 12px',
  color: '#6b7280',
};

const footerFine = {
  color: '#9ca3af',
  fontSize: '12px',
  margin: '8px 0',
};

const footerLink = {
  color: '#4f46e5',
  textDecoration: 'underline',
};
