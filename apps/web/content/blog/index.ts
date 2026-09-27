import { post as bestUsmleQuestionBanks } from './best-usmle-question-banks';
import { post as step1StudyGuide } from './usmle-step-1-study-guide';
import { post as step2CkStudyGuide } from './usmle-step-2-ck-study-guide';
import { post as step3StudyGuide } from './usmle-step-3-study-guide';
import { post as twoPassesQbank } from './two-passes-through-a-usmle-question-bank';
import type { BlogPost } from './types';

export const posts: BlogPost[] = [
  bestUsmleQuestionBanks,
  twoPassesQbank,
  step1StudyGuide,
  step2CkStudyGuide,
  step3StudyGuide,
];
