// All page content lives here. Edit this file to update the site.

export type Link = { label: string; href: string };

export type Role = {
  title: string;
  company: string;
  start: string; // YYYY-MM
  end: string | null; // null = present
  points: string[];
  tech?: string[];
};

export type Project = {
  name: string;
  context: string;
  summary: string;
  points: string[];
  tags: string[];
  link?: Link;
};

export type SkillGroup = { name: string; items: string[] };

export type Course = { name: string; date: string };

export type Education = {
  degree: string;
  school: string;
  start: string;
  end: string;
};

export const profile = {
  name: "Marcin Grzebyk",
  role: "Senior Software Engineer",
  tagline:
    "Full-stack developer building complex web applications — and the AI agents that help ship them.",
  siteUrl: "https://marcin15g.github.io",
  links: {
    github: "https://github.com/marcin15g",
    linkedin: "https://www.linkedin.com/in/marcin-grzebyk-28949b1a1",
  },
  about: [
    "I'm a full-stack developer who started out in ad tech — aligning ads on publisher sites and writing the tracking scripts behind them — and grew into building and maintaining complex web applications. Today I'm a Senior Software Engineer at GFT Technologies, delivering frontend features for a global vehicle brand's financial-services platform.",
    "Lately I'm most excited about AI-driven engineering: I designed and delivered an agentic platform that turns Jira tickets into vulnerability fixes, PR reviews and small code changes. I like owning work end to end — from requirements with stakeholders, through API contracts, to the UI.",
    "Away from the keyboard you'll find me looking after my terrariums, riding motorcycles, or gaming.",
  ],
  startedYear: 2018,
};

export const experience: Role[] = [
  {
    title: "Senior Software Engineer",
    company: "GFT Technologies",
    start: "2023-10",
    end: null,
    points: [
      "Delivering frontend features for a global vehicle brand's financial-services digitalization program — financing, credit, insurance and warranty products across markets on every continent.",
      "Building reusable, configurable UI components for multi-market, multi-brand customer journeys and designing REST API contracts with backend teams.",
      "Designed the architecture for and delivered an agentic platform (OpenAI Codex) that automates vulnerability fixes, PR reviews and small code changes from Jira tickets, running on AWS.",
      "Working directly with client project managers and stakeholders on requirements, estimation and solution design.",
    ],
    tech: ["React", "Node.js", "TypeScript", "AWS", "OpenAI Codex"],
  },
  {
    title: "Experienced Software Engineer",
    company: "GFT Technologies",
    start: "2022-05",
    end: "2023-10",
    points: [
      "Developed an internal credit risk platform that lets bank staff capture data, run calculations and generate compliant credit-granting reports.",
      "Designed REST API contracts and set up and debugged Java backend services locally.",
      "Implemented automated test coverage with WebdriverIO and Cucumber, plus SQL for test data; supported the team lead.",
    ],
    tech: ["Angular", "NgRx", "Redux", "PrimeNG", "WebdriverIO", "Cucumber"],
  },
  {
    title: "Full Stack Developer",
    company: "GumGum",
    start: "2021-10",
    end: "2022-05",
    points: [
      "Built tracking logic for ad visibility and user engagement (clicks, hovers) on an ad automation platform.",
      "Migrated the codebase to ES6 and upgraded it to the latest Node.js version.",
      "Maintained an internal ad test-rendering tool and added unit test coverage.",
    ],
    tech: ["JavaScript", "Node.js"],
  },
  {
    title: "Junior Full Stack Developer",
    company: "JustPremium",
    start: "2020-10",
    end: "2021-07",
    points: [
      "Contributed to Prebid.js, the open-source header bidding library, and maintained a proprietary adapter.",
      "Implemented new responsive ad formats for desktop and mobile, improving viewability and CTR.",
      "Built an internal service status page and a headless-Chrome QA tool that screenshots ads on publisher sites.",
    ],
    tech: ["JavaScript", "Angular", "Express", "PostgreSQL", "AWS S3"],
  },
  {
    title: "Support Engineer",
    company: "JustPremium",
    start: "2019-12",
    end: "2020-10",
    points: [
      "Handled ad display and tracking issues for clients in a distributed, international team.",
      "Wrote JavaScript loaded alongside ads and tracking scripts for viewability and clicks, cross-browser on desktop and mobile.",
    ],
    tech: ["JavaScript", "CSS"],
  },
  {
    title: "Junior Support Developer",
    company: "WSoft",
    start: "2018-12",
    end: "2019-12",
    points: [
      "Aligned ads on client websites, wrote simple JavaScript and provided technical support.",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "Agentic engineering platform",
    context: "GFT Technologies · current role",
    summary:
      "An AI agent platform that picks up Jira tickets and ships the change.",
    points: [
      "Designed the architecture and delivered the platform on OpenAI Codex.",
      "Automates vulnerability fixes, pull request reviews and small code changes.",
      "Triggered straight from Jira, running on AWS infrastructure.",
    ],
    tags: ["OpenAI Codex", "AI agents", "AWS", "Jira"],
  },
  {
    name: "Credit risk platform",
    context: "GFT Technologies · 2022–2023",
    summary:
      "An internal banking app for capturing data, running calculations and producing compliant credit reports.",
    points: [
      "Angular frontend with NgRx state management and PrimeNG components.",
      "REST API contracts designed together with the backend team.",
      "End-to-end tests with WebdriverIO and Cucumber.",
    ],
    tags: ["Angular", "NgRx", "PrimeNG", "WebdriverIO"],
  },
  {
    name: "Prebid.js contributions",
    context: "JustPremium · 2020–2021",
    summary:
      "Work on the open-source header bidding library used across the ad tech industry.",
    points: [
      "Contributed to the Prebid.js codebase.",
      "Maintained a proprietary bidder adapter passing modified parameters to the ad server.",
    ],
    tags: ["JavaScript", "Open source", "Ad tech"],
    link: { label: "Prebid.js on GitHub", href: "https://github.com/prebid/Prebid.js" },
  },
  {
    name: "Ad QA screenshot tool",
    context: "JustPremium · 2020–2021",
    summary:
      "An internal QA tool that checks how ads actually render on publisher sites.",
    points: [
      "Drives headless Chrome to capture screenshots of live ads automatically.",
      "Later extended to store results in AWS S3.",
    ],
    tags: ["Node.js", "Headless Chrome", "AWS S3"],
  },
];

export const skills: SkillGroup[] = [
  {
    name: "Frontend",
    items: ["TypeScript", "JavaScript", "React", "Next.js", "Angular", "NgRx / Redux", "HTML & CSS"],
  },
  {
    name: "Backend",
    items: ["Node.js", "Express", "NestJS", "Python", "REST API design", "SQL"],
  },
  {
    name: "Cloud & delivery",
    items: ["AWS", "GitHub Actions", "Jenkins", "Concourse", "Git", "Jira & Bitbucket", "WebdriverIO", "Cucumber"],
  },
  {
    name: "AI engineering",
    items: ["Claude Code", "Codex CLI", "Agentic automation", "AI-driven development"],
  },
];

export const courses: Course[] = [
  { name: "AI_devs 4: Builders", date: "2026-04" },
  { name: "AI_devs 3: Agents Reloaded", date: "2025-06" },
];

export const education: Education[] = [
  {
    degree: "Computer Engineering, Bachelor's degree",
    school: "Rzeszów University of Technology",
    start: "2017-10",
    end: "2021-07",
  },
  {
    degree: "IT Technician, Computer Science",
    school: "Electronic School Group in Rzeszów",
    start: "2013-09",
    end: "2017-06",
  },
];
