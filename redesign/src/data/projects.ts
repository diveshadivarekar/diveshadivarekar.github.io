/**
 * Smaller projects listed on the Work page.
 *
 * Titles and links come from ../../../Json/work-data.json. Add a project there and it
 * shows up on the Work page. Add a matching entry in `details` below to give it filter
 * categories, a longer summary or topic tags.
 */
import type { ImageMetadata } from 'astro';
import work from '../../../Json/work-data.json';
import codeClash from '../assets/covers/code-clash.jpg';
import codeMania from '../assets/covers/code-mania.jpg';
import dishGenie from '../assets/covers/dish-genie.jpg';
import vaidya from '../assets/covers/vaidya.jpg';
import cesa from '../assets/covers/cesa.jpg';
import studySearch from '../assets/shots/study-search.jpg';
import pointMedia from '../assets/shots/point-media.jpg';
import feedMeMore from '../assets/shots/feed-me-more.jpg';

interface Cover {
  image: ImageMetadata;
  /** A logo is shown whole on this background; a screenshot fills the space. */
  background?: string;
  alt: string;
}

const covers: Record<string, Cover> = {
  'Code Clash': { image: codeClash, background: '#fbf9f6', alt: 'Code Clash logo' },
  'Code Mania': { image: codeMania, background: '#ffffff', alt: 'Code Mania logo' },
  'Dish Genie': { image: dishGenie, background: '#ffffff', alt: 'Dish Genie logo' },
  'Vaidya Saarthi': { image: vaidya, background: '#587ead', alt: 'Vaidya Saarthi logo' },
  'Computer Engineering Student Association': { image: cesa, background: '#1b0a33', alt: 'CESA logo' },
  'Study Search': { image: studySearch, alt: 'Screenshot of Study Search' },
  'Point Media 01': { image: pointMedia, alt: 'Screenshot of Point Media' },
  'Feed Me More': { image: feedMeMore, alt: 'Screenshot of the Feed Me More site' },
};

// These addresses returned "not found" to a signed-out visitor on 27 November 2026.
// Remove a line once the repository or file is public again.
const unavailable = new Set([
  'https://github.com/diveshadivarekar/CODE-CLASH',
  'https://github.com/diveshadivarekar/Team_X-techathon-healthcare',
  'https://github.com/diveshadivarekar/Dish-Genie',
  'https://github.com/diveshadivarekar/Code-Mania',
  'https://drive.google.com/file/d/1HiqbYa3kn6XRFaSzd5c2MF5OJnNnLewi/view',
]);

export const categories = ['AI', 'Education', 'Tools and apps', 'Websites'] as const;
export type Category = (typeof categories)[number];

export interface Project {
  title: string;
  summary: string;
  categories: Category[];
  tags: string[];
  link?: { label: string; href: string };
  cover?: Cover;
}

type Details = Partial<Omit<Project, 'title' | 'link'>> & { href?: string };

const details: Record<string, Details> = {
  'Vaidya Saarthi': {
    summary: 'An AI assistant app with features for doctors, patients and hospitals.',
    categories: ['AI'],
    tags: ['AI', 'Healthcare'],
  },
  Bloomify: {
    summary: 'An AI agent that sets question papers based on Bloom’s taxonomy.',
    categories: ['AI', 'Education'],
    tags: ['AI agent', 'Education'],
  },
  'Dish Genie': {
    summary: 'An AI app built on the T5 transformer model.',
    categories: ['AI'],
    tags: ['T5', 'NLP'],
  },
  'Breast Cancer Detection': {
    summary: 'A web app that predicts breast cancer using a support vector machine (SVM).',
    categories: ['AI'],
    tags: ['SVM', 'Flask'],
  },
  'Code Clash': { summary: 'A platform for quizzes and data structures and algorithms questions.', categories: ['Education'] },
  'Code Mania': { summary: 'A platform for quizzes and data structures and algorithms questions.', categories: ['Education'] },
  'Route Craft': { summary: 'A personalised learning pathway generator.', categories: ['Education'] },
  'Study Search': { summary: 'A search engine for students.', categories: ['Education', 'Tools and apps'] },
  'Beach Guard': { summary: 'An app that shows whether beach locations are suitable for recreation.', categories: ['Tools and apps'] },
  'Bharat Krishi': { summary: 'A super app for India’s farmers.', categories: ['Tools and apps'] },
  'Divesh IDE': { summary: 'An IDE for running Java, Python, HTML, CSS and JavaScript programs.', categories: ['Tools and apps'] },
  'Task-Assist': { summary: 'A planner for individuals and organisations.', categories: ['Tools and apps'] },
  'Video to Flipbook Creator': { summary: 'A tool that turns videos into flipbooks.', categories: ['Tools and apps'] },
  'Point Media 01': { summary: 'Free software.', categories: ['Tools and apps'] },
  'Feed Me More': { summary: 'A website for organic food delivery.', categories: ['Websites'] },
  'Computer Engineering Student Association': { summary: 'A portfolio site for the CESA student association.', categories: ['Websites'] },
  'Divesh Website': { summary: 'My portfolio website.', categories: ['Websites'], href: '/' },
};

function toLink(href: string): Project['link'] {
  if (!href || href === '#' || unavailable.has(href)) return undefined;
  const url = href.startsWith('./') ? href.slice(1) : href;
  let label = 'Open project';
  if (url.startsWith('https://github.com/')) label = 'Code on GitHub';
  else if (url.startsWith('https://youtu')) label = 'Watch video';
  else if (url.startsWith('https://drive.google.com/')) label = 'View on Google Drive';
  else if (url.includes('vercel.app')) label = 'Live app';
  else if (url === '/') label = 'Go to home page';
  return { label, href: url };
}

const fromJson: Project[] = work.map((item) => {
  const { href, ...extra } = details[item.title] ?? {};
  return {
    title: item.title,
    summary: item.description,
    categories: [],
    tags: [],
    link: toLink(href ?? item.link),
    cover: covers[item.title],
    ...extra,
  };
});

// Bloomify is presented as a case study, so it is left out of this list.
// Projects with a picture come first.
export const projects: Project[] = fromJson
  .filter((p) => p.title !== 'Bloomify')
  .sort((a, b) => Number(!!b.cover) - Number(!!a.cover));
