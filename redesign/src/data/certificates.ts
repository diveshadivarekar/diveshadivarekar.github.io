/** Real certificate images, each linked to the original file in documents/. */
import type { ImageMetadata } from 'astro';
import codeForBharat from '../assets/certs/code-for-bharat.jpg';
import ciphathon from '../assets/certs/ciphathon.jpg';
import sih from '../assets/certs/sih.jpg';
import codeClash from '../assets/certs/code-clash.jpg';
import jspmMerit from '../assets/certs/jspm-merit.jpg';
import dolphin from '../assets/certs/dolphin.jpg';
import nvidia from '../assets/certs/nvidia.jpg';

export interface Certificate {
  title: string;
  image: ImageMetadata;
  href: string;
}

const doc = (name: string) => encodeURI(`/documents/${name}`);

export const certificates = {
  codeForBharat: { title: 'Winner, Code for Bharat Season 2', image: codeForBharat, href: doc('cfbs2.pdf') },
  ciphathon: { title: '2nd place, MITWPU Ciphathon ’26', image: ciphathon, href: doc('mit wpu ciphathon 26.pdf') },
  sih: { title: 'Smart India Hackathon 2025 Grand Finale', image: sih, href: doc('sih 2025.pdf') },
  nvidia: { title: 'NVIDIA Fundamentals of Deep Learning', image: nvidia, href: doc('nvidia_deeplearning.jpg') },
  dolphin: { title: 'Dolphin Labs internship', image: dolphin, href: doc('dolphin internship.pdf') },
  codeClash: { title: 'Coordinator, Code Clash', image: codeClash, href: doc('code_clash.pdf') },
  jspmMerit: { title: 'Certificate of merit, diploma third year', image: jspmMerit, href: doc('jspm_merit.pdf') },
} satisfies Record<string, Certificate>;
