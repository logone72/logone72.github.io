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
  experienceLabel: string;
  experienceTitle: string;
  github: string;
  introLabel: string;
  languageLabel: string;
  location: string;
  name: string;
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
    primaryLabel: 'Primary navigation',
    profileLabel: 'Profile',
    role: 'Frontend Developer',
    location: 'Seoul, South Korea',
    summary:
      "I've built and improved products in different fields. That experience helps me balance performance, maintainability, and usability.",
    scrollLabel: 'View timeline',
    skillsLabel: 'Related skills and topics',
    experienceLabel: 'Timeline',
    experienceTitle: 'Work and education',
    introLabel: 'Drawing the page',
    skipIntro: 'Skip intro',
    replayIntro: 'Replay intro',
    themeDark: 'Dark mode',
    themeLight: 'Light mode',
    experience: [
      {
        period: 'Oct 2024 to present',
        company: 'Standby Lab',
        role: 'Frontend Developer',
        description:
          'I build legal SaaS and back-office tools, maintain shared components, and set frontend standards. I reduced the initial JavaScript bundle by 80% and improved FCP by 50%.',
        skills: ['TypeScript', 'React', 'Vite', 'React Query'],
      },
      {
        period: 'Jan 2022 to Jun 2024',
        company: 'TeamO2 (Carmore)',
        role: 'Frontend Engineer',
        description:
          'At TeamO2, I developed a mobility service across mobile webviews, desktop browsers, and TV displays. I migrated roughly half of the legacy codebase to React and TypeScript and improved FCP by 50%.',
        skills: ['JavaScript', 'TypeScript', 'React', 'Webpack'],
      },
      {
        period: 'Aug 2021 to Dec 2021',
        company: 'KAIST',
        role: 'SW Jungle (Non-degree Program)',
        description:
          "I completed KAIST's five-month SW Jungle program, studying data structures, algorithms, web fundamentals, and systems programming in C. I also completed a Pintos operating system project.",
        skills: ['C', 'Algorithms', 'Operating Systems', 'Web'],
      },
      {
        period: 'Sep 2014 to Oct 2019',
        company: 'University College London',
        role: 'Mathematics BSc',
        description:
          'At University College London, I studied mathematics alongside students from many different backgrounds. The degree taught me to reason clearly and break complex problems into manageable parts.',
        skills: ['Mathematics', 'Problem Solving', 'English'],
      },
    ],
  },
  ko: {
    ...shared,
    name: '김록원',
    languageLabel: '언어',
    primaryLabel: '주요 링크',
    profileLabel: '프로필',
    role: '프론트엔드 개발자',
    location: '서울, 대한민국',
    summary:
      '여러 분야에서 제품을 만들고 개선해 왔습니다. 폭넓은 경험을 살려 성능과 유지보수성, 사용자 경험의 균형을 잡습니다.',
    scrollLabel: '이력 살펴보기',
    skillsLabel: '관련 기술과 주제',
    experienceLabel: '타임라인',
    experienceTitle: '경력과 학력',
    introLabel: '페이지를 그리는 중',
    skipIntro: '인트로 건너뛰기',
    replayIntro: '인트로 다시 보기',
    themeDark: '다크 모드',
    themeLight: '라이트 모드',
    experience: [
      {
        period: '2024.10 — 현재',
        company: '스탠바이랩',
        role: '프론트엔드 개발자',
        description:
          '법률 SaaS와 백오피스의 업무 흐름을 구현했습니다. 성능 개선과 공통 컴포넌트 구축, 개발 환경 표준화도 주도했습니다. 초기 JavaScript 번들을 80% 줄이고 FCP를 50% 개선했습니다.',
        skills: ['TypeScript', 'React', 'Vite', 'React Query'],
      },
      {
        period: '2022.01 — 2024.06',
        company: '팀오투 (카모아)',
        role: '프론트엔드 엔지니어',
        description:
          '모바일 웹뷰와 PC 웹, TV 환경을 아우르는 모빌리티 서비스를 개발하고 운영했습니다. 레거시 코드의 약 절반을 React와 TypeScript로 전환하고 FCP를 50% 개선했습니다.',
        skills: ['JavaScript', 'TypeScript', 'React', 'Webpack'],
      },
      {
        period: '2021.08 — 2021.12',
        company: 'KAIST SW 사관학교 정글',
        role: '비학위 소프트웨어 교육과정',
        description:
          '5개월 몰입형 과정에서 자료구조와 알고리즘, 웹 기초, C 기반 시스템 프로그래밍을 학습하고 Pintos 운영체제 프로젝트를 수행했습니다.',
        skills: ['C', '알고리즘', '운영체제', '웹'],
      },
      {
        period: '2014.09 — 2019.10',
        company: 'University College London',
        role: '수학 학사',
        description:
          '수학을 공부하며 논리적 사고와 문제 구조화 역량을 쌓았고, 다양한 배경의 학생들과 영어로 소통했습니다.',
        skills: ['수학', '문제 해결', '영어'],
      },
    ],
  },
};
