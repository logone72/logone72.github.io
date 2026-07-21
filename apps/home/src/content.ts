export type Locale = 'en' | 'ko';

type Experience = {
  company: string;
  description: string;
  period: string;
  role: string;
  skills: string[];
};

export type HomeContent = {
  email: string;
  experience: Experience[];
  experienceDescription: string;
  experienceLabel: string;
  experienceTitle: string;
  github: string;
  introLabel: string;
  languageLabel: string;
  location: string;
  name: string;
  portfolioLabel: string;
  primaryLabel: string;
  profileLabel: string;
  replayIntro: string;
  role: string;
  scrollLabel: string;
  skillsLabel: string;
  skipIntro: string;
  summary: string;
  themeDark: string;
  themeLight: string;
};

const shared = {
  email: 'roegan.kim@gmail.com',
  github: 'https://github.com/logone72',
  name: 'Roegan Kim',
};

export const contentByLocale: Record<Locale, HomeContent> = {
  en: {
    ...shared,
    languageLabel: 'Language',
    portfolioLabel: 'Portfolio / 2026',
    primaryLabel: 'Primary',
    profileLabel: 'Profile',
    role: 'Frontend Developer',
    location: 'Seoul, South Korea',
    summary:
      'I build thoughtful interfaces and the systems that keep them clear, fast, and resilient.',
    scrollLabel: 'Explore experience',
    skillsLabel: 'Technologies',
    experienceLabel: 'Experience / Sample data',
    experienceTitle: 'Selected chapters',
    experienceDescription:
      'Placeholder entries ready to be replaced with actual career history.',
    introLabel: 'Drawing the page',
    skipIntro: 'Skip intro',
    replayIntro: 'Replay intro',
    themeDark: 'Dark mode',
    themeLight: 'Light mode',
    experience: [
      {
        period: '2024 — Now',
        company: 'Northstar Studio',
        role: 'Senior Frontend Engineer',
        description:
          'Led the interface architecture for a growing product suite and shaped a shared design system across teams.',
        skills: ['TypeScript', 'React', 'Design Systems'],
      },
      {
        period: '2021 — 2024',
        company: 'Atlas Product Lab',
        role: 'Frontend Engineer',
        description:
          'Built accessible product surfaces, improved delivery workflows, and made performance part of everyday development.',
        skills: ['Vue', 'Vite', 'Web Performance'],
      },
      {
        period: '2019 — 2021',
        company: 'Field Notes',
        role: 'UI Engineer',
        description:
          'Created reusable interface patterns and data-rich tools for editorial and research teams.',
        skills: ['JavaScript', 'CSS', 'D3.js'],
      },
      {
        period: '2017 — 2019',
        company: 'Independent Practice',
        role: 'Web Developer',
        description:
          'Designed and shipped focused websites and prototypes for small teams and independent creators.',
        skills: ['HTML', 'CSS', 'Creative Coding'],
      },
    ],
  },
  ko: {
    ...shared,
    languageLabel: '언어',
    portfolioLabel: '포트폴리오 / 2026',
    primaryLabel: '주요 링크',
    profileLabel: '프로필',
    role: '프론트엔드 개발자',
    location: '대한민국 서울',
    summary:
      '명확하고 빠르며 오래 유지되는 인터페이스와 그 기반이 되는 시스템을 만듭니다.',
    scrollLabel: '경력 살펴보기',
    skillsLabel: '기술 스택',
    experienceLabel: '경력 / 샘플 데이터',
    experienceTitle: '지나온 장면들',
    experienceDescription:
      '실제 경력으로 교체할 수 있도록 구성한 임시 데이터입니다.',
    introLabel: '페이지를 그리는 중',
    skipIntro: '인트로 건너뛰기',
    replayIntro: '인트로 다시 보기',
    themeDark: '다크 모드',
    themeLight: '라이트 모드',
    experience: [
      {
        period: '2024 — 현재',
        company: 'Northstar Studio',
        role: '시니어 프론트엔드 엔지니어',
        description:
          '확장되는 제품군의 인터페이스 구조를 설계하고 여러 팀이 함께 사용하는 디자인 시스템을 구축했습니다.',
        skills: ['TypeScript', 'React', 'Design Systems'],
      },
      {
        period: '2021 — 2024',
        company: 'Atlas Product Lab',
        role: '프론트엔드 엔지니어',
        description:
          '접근성 높은 제품 화면을 만들고 배포 흐름과 웹 성능을 일상적인 개발 과정에 녹였습니다.',
        skills: ['Vue', 'Vite', 'Web Performance'],
      },
      {
        period: '2019 — 2021',
        company: 'Field Notes',
        role: 'UI 엔지니어',
        description:
          '편집 및 리서치 팀을 위한 재사용 가능한 인터페이스 패턴과 데이터 도구를 만들었습니다.',
        skills: ['JavaScript', 'CSS', 'D3.js'],
      },
      {
        period: '2017 — 2019',
        company: 'Independent Practice',
        role: '웹 개발자',
        description:
          '작은 팀과 독립 창작자를 위한 목적이 분명한 웹사이트와 프로토타입을 설계하고 출시했습니다.',
        skills: ['HTML', 'CSS', 'Creative Coding'],
      },
    ],
  },
};
