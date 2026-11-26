/**
 * Personal details shared by several pages, taken from the résumé and CV.
 * Edit them here once. To update the résumé download, replace
 * public/Divesh-Adivarekar-Resume.pdf.
 */
import achieverr from '../assets/logos/achieverr.png';
import mobisoft from '../assets/logos/mobisoft.png';
import dolphin from '../assets/logos/dolphin.png';
import pvg from '../assets/logos/pvg.png';

export const email = 'diveshadivarekar09@gmail.com';
export const resume = '/Divesh-Adivarekar-Resume.pdf';
export const patentUrl = 'https://lnkd.in/p/drrfM6ri';
/** Shown in the Home and Contact headers. Set to '' to hide. */
export const availability = 'Graduating June 2027 · Looking for AI and full-stack roles';

export const social = [
  { href: 'https://github.com/diveshadivarekar', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/divesh-adivarekar/', label: 'LinkedIn' },
  { href: 'https://www.instagram.com/diveshadivarekar/', label: 'Instagram' },
];

export const stats = [
  { value: '9.71', label: 'SGPA in B.E. AI & Data Science' },
  { value: '3', label: 'internships in AI, software and embedded systems' },
  { value: 'Top 0.2%', label: 'in the Amazon ML Challenge 2025' },
  { value: '1', label: 'patent granted, with one more in process' },
];

export const experience = [
  {
    when: 'Mar 2026 – Present',
    title: 'AI & Software Development Intern',
    company: 'Achieverr AI',
    logo: achieverr,
    logoBg: '#f3feff',
    points: [
      'Built LLM agent pipelines for Atlas, an AI career agent that finds and auto-applies to jobs (NVIDIA Inception).',
      'Built per-job CV tailoring with LLMs, and tuned vector database indexing and retrieval to make RAG results more relevant.',
      'Optimised FastAPI and Node.js APIs, reducing latency and supporting more concurrent requests.',
    ],
    stack: ['LLM agents', 'RAG', 'FastAPI', 'Node.js'],
  },
  {
    when: 'Sep 2025 – Feb 2026',
    title: 'Intern Project Lead, Project Mapparazzi',
    company: 'Mobisoft Infotech, with a UK-based CIC',
    logo: mobisoft,
    logoBg: '#16161c',
    points: [
      'Led a cross-functional team building a metro-centric real estate app covering 500+ properties, with valuation and commute metrics.',
      'Wrote Python data ingestion scripts that cut processing time by 40% and removed manual entry errors.',
    ],
    stack: ['Python', 'Data pipelines', 'Team leadership'],
  },
  {
    when: 'Jun 2023 – Jul 2023',
    title: 'Embedded Systems Intern (Team Lead)',
    company: 'Dolphin Labs',
    logo: dolphin,
    logoBg: '#ffffff',
    points: [
      'Led a team building a Wi-Fi-controlled autonomous vehicle with obstacle avoidance and ultrasonic and alcohol safety alerts.',
    ],
    stack: ['IoT', 'Sensors', 'Embedded systems'],
    certificate: '/documents/dolphin%20internship.pdf',
  },
];

export const education = [
  {
    when: 'Aug 2024 – Jun 2027',
    title: 'B.E. Artificial Intelligence and Data Science',
    place: 'PVG’s College of Engineering and Technology, Pune',
    logo: pvg,
    score: 'SGPA 9.71',
  },
  {
    when: 'Sep 2021 – Apr 2024',
    title: 'Diploma in Computer Engineering',
    place: 'Rajarshi Shahu College of Engineering (Polytechnic), Pune',
    logo: undefined,
    score: '91.37%',
  },
];

export const awards = [
  { rank: 'Winner', event: 'Code for Bharat (Microsoft)', year: '2025', detail: 'Shipped a working MVP in a hackathon with a $2,000 prize pool.' },
  { rank: 'Top 0.2%', event: 'Amazon ML Challenge', year: '2025', detail: 'Top 200 of 82,788 teams, on a 50 GB dataset of 150k product listings.' },
  { rank: 'Top 2', event: 'Lenovo LEAP Hackathon', year: '2026', detail: 'CitizenEase, an AI agent system for filling in government forms.' },
  { rank: 'Top 5', event: 'Smart India Hackathon, Grand Finalist', year: '2025', detail: 'A microgrid monitoring MVP in hardware and software for the Government of Odisha.' },
  { rank: '1st Runner-Up', event: 'MITWPU Ciphathon ’26', year: '2026', detail: 'SentinAI, an autonomous exploit detection and simulation platform.' },
  { rank: 'Best Solution', event: 'Innovate You 24-hour Techathon', year: '2026', detail: 'Krishi Sahayak, an AI AgriTech platform for farmers.' },
];

export const intellectualProperty = [
  {
    status: 'Patent granted',
    when: 'Jul 2026',
    title: 'Multi-compartment waste collection cart with load-balanced segregation and integrated electronic safety compliance',
    link: patentUrl,
  },
  { status: 'Copyright registered', when: 'Government of India', title: 'Deepfake Detection Hub: AI-powered media and fake news authentication' },
  { status: 'Patent in process', when: '', title: 'Automated multi-modal assessment system' },
  { status: 'Trademark in process', when: '', title: 'One trademark application' },
];

export const leadership = [
  { title: 'Technical Head, aIdeas', detail: 'Built certificate and receipt generator tools, and analysed participant feedback to improve club events.' },
  { title: 'Vice President, CESA', detail: 'Led technical operations and developed a platform for the Codemania event at RSCOE Polytechnic.' },
];

export const certifications = [
  { title: 'TensorFlow-Keras Bootcamp', issuer: 'OpenCV University', when: 'Mar 2026' },
  { title: 'IBM SkillsBuild AI Literacy', issuer: 'IBM', when: 'Dec 2025' },
  { title: 'Fundamentals of Deep Learning', issuer: 'NVIDIA', when: 'Sep 2024' },
  { title: 'Cyber Security Fundamentals', issuer: 'Infosys Springboard', when: 'Jan 2024' },
];

export const skills = [
  { group: 'AI and LLM engineering', items: ['LLM agents', 'RAG', 'LangChain', 'LangGraph', 'MCP', 'Prompt engineering', 'Hugging Face', 'OpenAI and Anthropic APIs', 'Ollama'] },
  { group: 'Machine learning and data', items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'NLP', 'FAISS', 'Pinecone', 'ChromaDB', 'n8n'] },
  { group: 'Backend and web', items: ['FastAPI', 'Node.js', 'Express', 'Next.js', 'React', 'REST', 'GraphQL', 'WebSockets'] },
  { group: 'Languages and databases', items: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C++', 'SQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Supabase'] },
  { group: 'Cloud and DevOps', items: ['AWS', 'GCP', 'Azure', 'Render', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'SAST/DAST'] },
];
