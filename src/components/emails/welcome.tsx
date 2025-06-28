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

interface WelcomeEmailProps {
  userName?: string;
  couponCodeText?: string;
  userEmail?: string;
}

export default function WelcomeEmail({
  userName = 'there',
  couponCodeText = 'WELCOME60',
  userEmail = 'user@example.com',
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Добро пожаловать в BizLevel - Ваш путь к мастерству в бизнесе начинается!</Preview>
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
            <Heading style={h1}>Добро пожаловать в BizLevel!</Heading>
            <Text style={heroText}>
              Мы рады приветствовать вас в нашем сообществе предпринимателей.
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Personal Welcome */}
          <Section style={section}>
            <Text style={text}>Привет, {userName}!</Text>
            <Text style={text}>
              Я Логан, основатель BizLevel, и я хотел лично поблагодарить вас за то, что стали
              частью нашего растущего сообщества. Ваше решение присоединиться к нам очень много значит!
            </Text>
            <Text style={text}>
              В BizLevel мы создаем яркое сообщество предпринимателей, которые посвящены
              непрерывному обучению и росту. Готовитесь ли вы к собеседованиям в бизнесе,
              расширяете свои знания в предпринимательстве или просто любите решать сложные бизнес-задачи -
              вы попали по адресу.
            </Text>
          </Section>

          {/* Feature Showcase */}
          <Section style={featureSection}>
            <Heading as="h2" style={h2}>
              Узнайте, что предлагает BizLevel
            </Heading>

            <table style={featureRow}>
              <tr>
                <td style={featureColumn}>
                  <Img
                    src={`https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//08-02-25-roadmap-redesign.png`}
                    width="200"
                    height="auto"
                    alt="Пути обучения"
                    style={featureIcon}
                  />
                  <Heading as="h3" style={h3}>
                    Персонализированные пути обучения
                  </Heading>
                  <Text style={featureText}>
                    Настройте свой путь обучения с помощью наших адаптивных программ, созданных под ваши
                    цели и уровень навыков в бизнесе.
                  </Text>
                </td>

                <td style={featureColumn}>
                  <Img
                    src={`https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//Screenshot%202025-03-04%20at%2022.28.57.png`}
                    width="200"
                    height="auto"
                    alt="Бизнес-задания"
                    style={featureIcon}
                  />
                  <Heading as="h3" style={h3}>
                    Интерактивные задания
                  </Heading>
                  <Text style={featureText}>
                    Практикуйтесь с нашей обширной библиотекой бизнес-заданий, разработанных для развития
                    ваших навыков решения проблем.
                  </Text>
                </td>
              </tr>
            </table>

            <table style={featureRow}>
              <tr>
                <td style={featureColumn}>
                  <Img
                    src={`https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//leaderboard-hero-redesign.png`}
                    width="200"
                    height="auto"
                    alt="Сообщество"
                    style={featureIcon}
                  />
                  <Heading as="h3" style={h3}>
                    Поддерживающее сообщество
                  </Heading>
                  <Text style={featureText}>
                    Общайтесь с единомышленниками-предпринимателями, делитесь знаниями и растите вместе.
                  </Text>
                </td>

                <td style={featureColumn}>
                  <Img
                    src={`https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//Screenshot%202025-03-04%20at%2022.31.23.png`}
                    width="200"
                    height="auto"
                    alt="Аналитика"
                    style={featureIcon}
                  />
                  <Heading as="h3" style={h3}>
                    Аналитика прогресса
                  </Heading>
                  <Text style={featureText}>
                    Отслеживайте свой путь обучения с подробной аналитикой и инсайтами для оптимизации
                    вашего роста.
                  </Text>
                </td>
              </tr>
            </table>
          </Section>

          {/* Special Offer */}
          <Section style={offerSection}>
            <Heading as="h2" style={h2}>
              Специальное предложение для вас
            </Heading>
            <Text style={text}>
              В знак благодарности за присоединение к нам мы предлагаем вам скидку 60% на первые
              три месяца премиум-подписки.
            </Text>
            <Section style={couponContainer}>
              <Text style={couponCode}>{couponCodeText}</Text>
              <Text style={couponText}>Используйте этот код при оформлении</Text>
            </Section>
            <Button href="https://dub.sh/upgrade-bizlevel" style={button}>
              Обновить сейчас
            </Button>
          </Section>

          {/* Getting Started */}
          <Section style={section}>
            <Heading as="h2" style={h2}>
              Готовы начать?
            </Heading>
            <Text style={text}>Вот несколько вещей, которые вы можете сделать прямо сейчас:</Text>
            <ul style={list}>
              <li style={listItem}>
                <Link href="https://bizlevel.kz/profile" style={link}>
                  Заполните свой профиль
                </Link>{' '}
                чтобы персонализировать ваш опыт
              </li>
              <li style={listItem}>
                <Link href="https://bizlevel.kz/roadmaps" style={link}>
                  Изучите пути обучения
                </Link>{' '}
                которые соответствуют вашим интересам
              </li>
              <li style={listItem}>
                <Link href="https://bizlevel.kz/roadmaps" style={link}>
                  Попробуйте бизнес-задание
                </Link>{' '}
                чтобы проверить свои навыки
              </li>
            </ul>
          </Section>

          {/* Follow Development */}
          <Section style={section}>
            <Text style={text}>
              Если вы хотите следить за развитием BizLevel, вы можете делать это{' '}
              <Link href="https://bizlevel.kz/blog" style={link}>
                в нашем блоге
              </Link>
              . Ваша поддержка действительно много значит для нас.
            </Text>
            <Text style={text}>
              Если у вас есть вопросы или отзывы, не стесняйтесь обращаться ко мне по{' '}
              <Link
                href={`mailto:team@bizlevel.kz?subject=Question from ${userEmail}`}
                style={link}
              >
                электронной почте
              </Link>
              .
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>Давайте вместе революционизируем мир бизнеса!</Text>
            <Text style={footerText}>С наилучшими пожеланиями,</Text>
            <Text style={footerSignature}>Logan</Text>
            <Text style={footerFounder}>Основатель, BizLevel</Text>

            {/* Social Links - BIZLEVEL: Скрыто GitHub, оставлен только Twitter */}
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
              You're receiving this email because you signed up for BizLevel.
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

const featureSection = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  margin: '0 30px 40px',
  textAlign: 'center' as const,
  padding: '40px 20px',
};

const featureRow = {
  display: 'table',
  width: '100%',
  maxWidth: '500px',
  margin: '0 auto 30px',
};

const featureColumn = {
  display: 'table-cell',
  width: '50%',
  padding: '0 15px',
  verticalAlign: 'top',
};

const featureIcon = {
  marginBottom: '15px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '200px',
  height: 'auto',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
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
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 10px',
};

const text = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px',
};

const featureText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0',
};

const offerSection = {
  padding: '40px 30px',
  textAlign: 'center' as const,
  backgroundColor: '#eff6ff',
  margin: '0 20px 40px',
  borderRadius: '8px',
};

const couponContainer = {
  margin: '30px auto',
  padding: '20px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  border: '2px dashed #4f46e5',
  maxWidth: '260px',
};

const couponCode = {
  color: '#4f46e5',
  fontSize: '26px',
  fontWeight: 'bold',
  letterSpacing: '2px',
  margin: '0',
};

const couponText = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '8px 0 0',
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
  padding: '14px 32px',
  margin: '20px 0 0',
  boxShadow: '0 2px 4px rgba(79, 70, 229, 0.2)',
  maxWidth: '100%',
};

const list = {
  padding: '0 0 0 20px',
  margin: '20px 0',
};

const listItem = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '12px 0',
};

const link = {
  color: '#4f46e5',
  textDecoration: 'none',
  fontWeight: '500',
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

const footerText = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '1.5',
  margin: '8px 0',
};

const footerSignature = {
  color: '#374151',
  fontSize: '22px',
  fontWeight: '600',
  margin: '20px 0 5px',
  fontFamily: 'cursive',
};

const footerFounder = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0 0 25px',
};

const socialLinks = {
  margin: '25px 0',
};

const socialLink = {
  display: 'inline-block',
  margin: '0 12px',
  padding: '8px',
  borderRadius: '6px',
  backgroundColor: '#f3f4f6',
};

const footerFine = {
  color: '#9ca3af',
  fontSize: '12px',
  lineHeight: '1.5',
  margin: '8px 0',
};
