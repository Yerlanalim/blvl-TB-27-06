import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface StudyCompletionEmailProps {
  headingText: string;
  username: string;
  studyPathTitle: string;
  completionDate: string;
}

export default function RoadmapCompleteEmail({
  headingText = 'Поздравляем с вашим достижением, Alex!',
  username = 'Alex',
  studyPathTitle = 'Основы предпринимательства',
  completionDate = 'June 1, 2025',
}: StudyCompletionEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Поздравляем! Вы завершили {studyPathTitle} - Посмотрите ваш сертификат</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with logo */}
          <Section style={headerSection}>
            <Img
              src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//logo.png"
              width="120"
              height="120"
              alt="Logo"
              style={logo}
            />
          </Section>

          {/* Hero section */}
          <Section style={heroSection}>
            <Heading style={heading}>{headingText}</Heading>
            <Text style={subheading}>
              Вы успешно завершили <strong>{studyPathTitle}</strong>
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Achievement section */}
          <Section style={achievementSection}>
            <Text style={achievementText}>
              <strong>Поздравляем, {username}!</strong> Вы продемонстрировали преданность и
              настойчивость в прохождении этого пути обучения.
            </Text>
          </Section>

          {/* Certificate details */}
          <Section style={certificateSection}>
            <Text style={certificateTitle}>Детали вашего сертификата</Text>
            <div style={certificateBox}>
              <Text style={certificateDetail}>
                <span style={certificateLabel}>Путь обучения:</span> {studyPathTitle}
              </Text>
              <Text style={certificateDetail}>
                <span style={certificateLabel}>Дата завершения:</span> {completionDate}
              </Text>
            </div>
          </Section>

          {/* Next steps section */}
          <Section style={nextStepsSection}>
            <Text style={nextStepsTitle}>Продолжите ваш путь обучения</Text>
            <Text style={nextStepsText}>
              Не останавливайтесь на достигнутом! Ознакомьтесь с другими нашими путями для продолжения обучения и роста.
            </Text>
            <Button
              style={{ ...button, padding: '12px 20px' }}
              href={`${process.env.NEXT_PUBLIC_URL}/roadmaps`}
            >
              Изучить другие пути
            </Button>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>© 2025 DEV BIZLEVEL LTD. All rights reserved.</Text>
            <Text style={footerText}>
              Вы получаете это письмо, потому что завершили путь обучения на BizLevel.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '24px',
  borderRadius: '12px',
  maxWidth: '600px',
};

const headerSection = {
  padding: '20px 0',
};

const logo = {
  margin: '0 auto',
};

const heroSection = {
  padding: '20px 0',
  textAlign: 'center' as const,
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#333',
  margin: '16px 0',
};

const subheading = {
  fontSize: '18px',
  color: '#666',
  margin: '0 0 24px',
  lineHeight: '26px',
};

const divider = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const achievementSection = {
  padding: '10px 0',
  textAlign: 'center' as const,
};

const achievementText = {
  fontSize: '16px',
  color: '#4b5563',
  lineHeight: '24px',
  margin: '0',
};

const certificateSection = {
  padding: '20px 0',
};

const certificateTitle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#333',
  margin: '0 0 12px',
};

const certificateBox = {
  backgroundColor: '#f8fafc',
  padding: '16px',
  borderRadius: '8px',
  border: '1px solid #e6ebf1',
};

const certificateDetail = {
  fontSize: '16px',
  color: '#4b5563',
  margin: '8px 0',
  lineHeight: '24px',
};

const certificateLabel = {
  fontWeight: 'bold',
  color: '#5b61d6',
};

const nextStepsSection = {
  padding: '20px 0',
};

const nextStepsTitle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#333',
  margin: '0 0 12px',
};

const nextStepsText = {
  fontSize: '16px',
  color: '#4b5563',
  margin: '0 0 16px',
};

const button = {
  backgroundColor: '#5b61d6',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
};

const footer = {
  textAlign: 'center' as const,
  padding: '0 0 20px',
};

const footerText = {
  fontSize: '14px',
  color: '#9ca3af',
  margin: '0 0 8px',
};
