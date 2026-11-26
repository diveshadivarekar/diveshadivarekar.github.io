/**
 * Major projects. Facts come from the CV, the achievement entries and the team-drps
 * project page. Pictures are real screenshots or photos; a project without one shows the
 * logos of its technologies until you add a screenshot to src/assets/projects/.
 */
import type { ImageMetadata } from 'astro';
import bloomify from '../assets/shots/bloomify.jpg';
import scrollSite from '../assets/shots/team-drps.jpg';
import ciphathon from '../assets/certs/ciphathon.jpg';

export interface CaseStudy {
  id: string;
  title: string;
  badge: string;
  summary: string;
  points: string[];
  metrics: { value: string; label: string }[];
  stack: string[];
  link?: { label: string; href: string };
  image?: ImageMetadata;
  imageAlt?: string;
  /** Says what the picture is, so it isn't mistaken for something else. */
  imageCaption?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'assessment',
    title: 'Automated Multi-Modal Assessment System',
    badge: 'Patent in process',
    summary: 'An AI grading engine that reads handwritten answers and scores what they mean.',
    points: [
      'Paired TrOCR handwriting recognition with BERT similarity scoring.',
      'Added a rubric-based, keyword-aware scoring layer for grades that can be explained and audited.',
      'Built a Supabase dashboard for reviewing and exporting grades.',
    ],
    metrics: [
      { value: '70%', label: 'less assessment time' },
      { value: '90%+', label: 'agreement with human graders' },
    ],
    stack: ['Python', 'TrOCR', 'BERT', 'NLP', 'Supabase'],
  },
  {
    id: 'deepfake',
    title: 'Deepfake Detection Hub',
    badge: 'Copyright registered',
    summary: 'A platform that checks whether media is authentic and explains its verdict.',
    points: [
      'Trained an EfficientNet-B0 classifier on curated deepfake datasets.',
      'Served it through a FastAPI microservice, with explainability reports written by LLaMA 3.',
      'Built Supabase pipelines for real-time audio and video metadata.',
    ],
    metrics: [
      { value: '96%', label: 'accuracy on 10,000+ samples' },
      { value: '<200 ms', label: 'response time' },
    ],
    stack: ['Python', 'FastAPI', 'EfficientNet', 'LLaMA 3', 'Supabase'],
  },
  {
    id: 'super-assistant',
    title: 'Super Assistant OS',
    badge: 'AI-native operating layer',
    summary: 'An agent layer that runs whole workflows from a request in plain language.',
    points: [
      'Built agents that carry out natural-language workflows from start to finish.',
      'Designed a modular tool-calling framework with context-aware memory, so agents plan and chain steps on their own.',
    ],
    metrics: [
      { value: '30%', label: 'faster execution' },
      { value: '15+', label: 'commands covered' },
    ],
    stack: ['Python', 'LLMs', 'LangChain', 'LangGraph'],
  },
  {
    id: 'citizenease',
    title: 'CitizenEase',
    badge: 'Top 2, Lenovo LEAP 2026',
    summary: 'An agent system that automates submitting government forms.',
    points: [
      'Combined an LLM with Playwright browser automation to fill in forms.',
      'Used DigiLocker-based eligibility matching and Bhashini speech recognition and voice output.',
      'Designed the interface to meet WCAG 2.2 AAA accessibility.',
    ],
    metrics: [
      { value: 'Top 2', label: 'at Lenovo LEAP Hackathon' },
      { value: 'AAA', label: 'WCAG 2.2 accessible interface' },
    ],
    stack: ['LLMs', 'Playwright', 'DigiLocker', 'Bhashini'],
  },
  {
    id: 'sentinai',
    image: ciphathon,
    imageAlt: 'MITWPU Ciphathon certificate for second place',
    imageCaption: 'Ciphathon ’26 certificate for this project',
    title: 'SentinAI',
    badge: '1st Runner-Up, Ciphathon ’26',
    summary: 'An autonomous security platform that proves vulnerabilities instead of only listing them.',
    points: [
      'Chains exploits and generates tests automatically.',
      'Adds zero-trust simulation, business impact output and Jira integration.',
      'Built as a team project with Team DRPS.',
    ],
    metrics: [{ value: '2nd place', label: 'MITWPU Ciphathon ’26' }],
    stack: ['Security automation', 'Zero-trust simulation', 'Jira'],
  },
  {
    id: 'bloomify',
    title: 'Bloomify',
    badge: 'Live app',
    summary: 'A question paper platform for teachers, built around Bloom’s taxonomy.',
    points: [
      'Built a responsive, server-rendered app with dynamic maths rendering.',
      'Used the Gemini API to generate topic-wise question banks with adjustable difficulty.',
      'Backed it with optimised FastAPI endpoints.',
    ],
    metrics: [],
    stack: ['Next.js', 'React', 'Tailwind', 'FastAPI', 'Gemini API'],
    image: bloomify,
    imageAlt: 'Bloomify home page',
    imageCaption: 'Screenshot of the live site',
    link: { label: 'Open the live app', href: 'https://existence-bloomify.vercel.app/' },
  },
  {
    id: 'sealed-books',
    title: 'Reading books that can never be opened',
    badge: 'In development',
    summary: 'A pipeline that virtually unwraps sealed or carbonised books from CT scans and recovers their text.',
    points: [
      'Designed to unfold pages digitally and score the confidence of every recovered character.',
      'A final-year team project, currently in development.',
    ],
    metrics: [],
    stack: ['Deep learning', 'Computer vision', '3D CT data'],
    image: scrollSite,
    imageAlt: 'Home screen of the project showcase site',
    imageCaption: 'Screenshot of the project showcase',
    link: { label: 'Explore the project', href: '/team-drps/' },
  },
];

export const featuredIds = ['assessment', 'deepfake', 'super-assistant', 'citizenease'];
export const featuredStudies = featuredIds.map((id) => caseStudies.find((c) => c.id === id)!);
