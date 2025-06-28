import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Img,
} from '@react-email/components';
import * as React from 'react';

interface ReferralEmailProps {
  referrerUid: string;
  referrerEmail: string;
}

const ReferralEmail = ({ referrerUid, referrerEmail }: ReferralEmailProps) => {
  return (
    <Html>
      <Head />
                <Preview>Вас пригласили присоединиться к BizLevel! 🚀</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//logo.png"
              width="111"
              height="26"
              alt="BizLevel Logo"
              style={logo}
            />
          </Section>
          <Heading style={h1}>Добро пожаловать в BizLevel!</Heading>
          <Text style={text}>
            {referrerEmail ? (
              <>
                Вас пригласил присоединиться к BizLevel пользователь <strong>{referrerEmail}</strong>.
              </>
            ) : (
              <>Вас пригласили присоединиться к BizLevel!</>
            )}
          </Text>
          <Text style={text}>
            Приготовьтесь ускорить ваш бизнес-рост и сотрудничать с удивительными
            предпринимателями!
          </Text>
          <Section style={buttonContainer}>
            <Link href={`https://bizlevel.kz/signup?ref=${referrerUid || ''}`} style={button}>
              Принять приглашение
            </Link>
          </Section>
          <Text style={text}>
            Присоединяйтесь к нашему сообществу и выведите ваши бизнес-навыки на новый уровень!
          </Text>
          {/* BIZLEVEL: Скрыта ссылка на GitHub для бизнес-версии */}
          {/* BIZLEVEL: Скрыты социальные ссылки для бизнес-версии */}
          <Section style={socialContainer}>
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
          <Text style={text}>
            Если у вас есть вопросы или нужна помощь в начале работы, просто ответьте на это письмо. Мы
            здесь, чтобы помочь!
          </Text>
          <Section style={footer}>
            <Text style={footerText}>© 2025 Dev BizLevel. All rights reserved.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ReferralEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: "'Onest', 'Helvetica', sans-serif",
};

const container = {
  margin: '0 auto',
  padding: '40px 20px 48px',
  width: '100%',
  maxWidth: '600px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const logoContainer = {
  marginBottom: '32px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
};

const h1 = {
  color: '#333333',
  fontSize: '28px',
  fontWeight: '700',
  lineHeight: '36px',
  margin: '0 0 20px',
  textAlign: 'center' as const,
};

const text = {
  color: '#4f4f4f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'center' as const,
  margin: '0 0 20px',
};

const buttonContainer = {
  margin: '32px 0',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#5A5FCD',
  borderRadius: '6px',
  color: '#FFFFFF',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  padding: '12px 32px',
  display: 'inline-block',
};

// BIZLEVEL: Скрыта кнопка GitHub для бизнес-версии
// const secondaryButton = {
//   ...button,
//   backgroundColor: '#ffffff',
//   color: '#5A5FCD',
//   border: '2px solid #5A5FCD',
// };

const socialContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '16px',
  margin: '32px 0',
};

const socialLink = {
  textDecoration: 'none',
};

const footer = {
  marginTop: '32px',
  textAlign: 'center' as const,
  borderTop: '1px solid #e0e0e0',
  paddingTop: '24px',
};

const footerText = {
  color: '#999999',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '4px 0',
};
