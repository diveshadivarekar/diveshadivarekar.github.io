/**
 * Timeline entries for the Achievements page.
 *
 * Text, dates and certificate links come from ../../../Json/blog-data.json. For a new
 * entry, add its title to `groups` below (otherwise it only shows under "All"), and to
 * `awards` if it won something.
 */
import updates from '../../../Json/blog-data.json';

export const categories = ['Awards', 'Hackathons and events', 'Courses', 'Experience', 'Academics'] as const;
export type Category = (typeof categories)[number];

const groups: Partial<Record<Category, string[]>> = {
  'Hackathons and events': [
    'SentinAI – 1st Runner-Up at MITWPU Ciphathon 26',
    'Team DRPS Wins Best Solution at Innovate You National Techathon',
    'Finalists at Smart India Hackathon 2025 – Hardware Edition',
    'Code For Bharat Season 2 Hackathon',
    'Galgotias International Hackathon 2.0',
    'Agro-Tech Hackathon 2025',
    'Innovation Foundation Techathon 2.0',
    'Nirman X ODOO Hackathon',
    'National Level Online Coding Challenge Competition',
    'Tech talk week 2025',
    'PICT Tech fiesta',
    'All India Placement Aptitude Test 2024 - Fourth Editions',
    'TATA CRUCIBLE THE CAMPUS QUIZ 2024',
    'TECH TITANS 2k-24',
    'TASK-ASSIST: PERSONAL PLANNER Research paper',
    'MSBTE State level Technical Paper Presentation Competition',
    'Samsung Solve for Tomorrow',
    'Softgyan Technical Paper Presentation',
  ],
  Courses: [
    'Natural Language Processing (NLP) and Text Mining Tutorial for Beginners',
    'Introduction to Data Mining',
    'Introduction to SQL',
    'Exploring Natural Language Processing (NLP) using Deep Learning',
    'Spoken Tutorial by IIT Bombay',
    'AI Tools Workshop',
    'Data Engineering - Foundation',
    'Data Science - Foundation',
    'Data Visualization - Foundation',
    'Indexes in Raven DB',
    'Generative AI Foundations: IT Integration with Generative AI',
    'Smart Cities Urban Planning & Management',
    'Angular',
    'amcat exam',
    'NVIDIA Fundamentals of Deep Learning',
    'Machine Learning Engineer Masterclass',
    'Kafka and Zookeeper Masterclass',
    'Cyber Security Fundamentals Certification Drive',
    'ITIL Awareness',
    'Cyber Security Fundamentals Certification',
    'Network Fundamentals',
    'Fundamentals of Cryptography',
    'Introduction to Cyber Security',
    'Fundamentals of Information Security',
    'Principles of IoT & Python Basics',
    'Infosys Networking and Web Technology',
    'Completed course on C++',
    'Dev Town Python & Computer Vision',
    'Android Fundamentals with Capstone Project',
    'Infosys Learn and Master C Programming For Absolute Beginners!',
    'Infosys Python for Data Science',
    'Infosys Computer Vision 101',
    'Infosys Advanced Python Concepts',
    'Infosys Basics of Python',
    'P2B#151 Google Colab Machine Learning App',
    'CS50 at Harvard University',
  ],
  Experience: [
    'Code Clash',
    'Internship on IoT',
    'Internship on Artificial Intelligence',
    'IEEE SB Interns II Python',
    'Joined CESA RSCOE',
    'Sequence SQL Presentation',
  ],
  Academics: ["JSPM's RSCOE Merit", 'Second Rank (91.37%)', 'Second Rank (91.07%)', 'Third Rank (90%)'],
};

/** Only results stated in the entry's own text. */
const awards: Record<string, string> = {
  'SentinAI – 1st Runner-Up at MITWPU Ciphathon 26': '1st Runner-Up',
  'Team DRPS Wins Best Solution at Innovate You National Techathon': 'Best Solution',
  'Finalists at Smart India Hackathon 2025 – Hardware Edition': 'Grand Finalist, Top 5',
  'Code For Bharat Season 2 Hackathon': 'Winner',
  'Nirman X ODOO Hackathon': 'Top 7',
  'Softgyan Technical Paper Presentation': 'Winner',
  "JSPM's RSCOE Merit": 'Merit award',
  'Second Rank (91.37%)': '2nd rank',
  'Second Rank (91.07%)': '2nd rank',
  'Third Rank (90%)': '3rd rank',
};

export interface Achievement {
  title: string;
  iso: string;
  year: number;
  month: string;
  description: string;
  categories: Category[];
  award?: string;
  link?: { label: string; href: string };
}

function toLink(href: string | undefined): Achievement['link'] {
  if (!href) return undefined;
  // Local paths in the JSON are written as "./documents/x.pdf", "documents/x.pdf" or "/x".
  const url = href.startsWith('http') ? href : encodeURI('/' + href.replace(/^\.?\//, ''));
  return { label: url.endsWith('.html') ? 'Read more' : 'View certificate', href: url };
}

export const achievements: Achievement[] = updates
  .map((item) => {
    // Collapses stray whitespace, including non-breaking spaces, so titles match the lists above.
    const title = item.title.replace(/\s+/g, ' ').trim();
    const matched = categories.filter((c) => groups[c]?.includes(title));
    const award = awards[title];
    const date = new Date(`${item.date}T00:00:00Z`);
    return {
      title,
      iso: item.date,
      year: date.getUTCFullYear(),
      month: date.toLocaleString('en-GB', { month: 'short', timeZone: 'UTC' }),
      description: (item.description ?? '').replace(/<br\s*\/?>/gi, ' ').trim(),
      categories: award ? (['Awards', ...matched] as Category[]) : matched,
      award,
      link: toLink((item as { certificate_url?: string }).certificate_url),
    };
  })
  .sort((a, b) => b.iso.localeCompare(a.iso));
