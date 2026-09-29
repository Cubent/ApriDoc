import type { SampleQuestion } from './sample-questions-quiz';

export const step3SampleQuestions: SampleQuestion[] = [
  {
    id: 'q1',
    system: 'Preventive Medicine',
    stem: 'A 52-year-old woman presents for a routine health maintenance visit. She has no personal or family history of cancer. She reports smoking one pack of cigarettes daily for the past 30 years and continues to smoke. She has an occasional cough but no other symptoms. Which of the following is the most appropriate next step?',
    choices: [
      {
        id: 'a',
        text: 'Chest x-ray',
        isCorrect: false,
        explanation: 'Chest x-ray is not recommended as a lung cancer screening tool, since it lacks the sensitivity to detect early-stage disease.',
      },
      {
        id: 'b',
        text: 'Low-dose CT of the chest',
        isCorrect: true,
        explanation:
          'The USPSTF recommends annual low-dose CT screening for lung cancer in adults aged 50 to 80 with a 20 pack-year smoking history who currently smoke or quit within the past 15 years. This patient has 30 pack-years and continues to smoke, meeting the criteria.',
      },
      {
        id: 'c',
        text: 'Pulmonary function testing',
        isCorrect: false,
        explanation: 'Pulmonary function tests evaluate for lung disease such as COPD; they are not a cancer screening test.',
      },
      {
        id: 'd',
        text: 'Reassurance; no screening indicated',
        isCorrect: false,
        explanation: 'Incorrect. This patient clearly meets USPSTF criteria for lung cancer screening based on her age and smoking history.',
      },
      {
        id: 'e',
        text: 'Sputum cytology',
        isCorrect: false,
        explanation: 'Sputum cytology is not used as a lung cancer screening test due to insufficient sensitivity.',
      },
    ],
  },
  {
    id: 'q2',
    system: 'Patient Safety / Systems-Based Practice',
    stem: 'A hospital identifies that several patients have received the wrong dose of insulin because of look-alike vial packaging between regular and NPH insulin. Which of the following interventions is most likely to prevent this error from recurring?',
    choices: [
      {
        id: 'a',
        text: 'Disciplinary action against the nurses involved',
        isCorrect: false,
        explanation: 'Disciplinary action targets individuals rather than the system, and does not remove the underlying opportunity for the error to recur.',
      },
      {
        id: 'b',
        text: 'Mandatory additional training on insulin administration',
        isCorrect: false,
        explanation: 'Training relies on individuals remembering and performing correctly every time, which is a weaker safety strategy than redesigning the system itself.',
      },
      {
        id: 'c',
        text: 'Redesigning insulin storage to physically separate and differently label the two vial types',
        isCorrect: true,
        explanation:
          'This is a systems-based practice question about the hierarchy of effectiveness for error-prevention interventions. System redesigns and forcing functions, such as physically separating and distinctly labeling look-alike medications, are the most effective and durable interventions because they remove the opportunity for the error to occur, independent of individual vigilance.',
      },
      {
        id: 'd',
        text: 'Requiring physicians to co-sign every insulin order',
        isCorrect: false,
        explanation: 'An added administrative check can help, but it still depends on a human catching the error and is less reliable than removing the hazard itself.',
      },
      {
        id: 'e',
        text: 'Sending a hospital-wide email reminder about insulin safety',
        isCorrect: false,
        explanation: 'A one-time reminder is one of the weakest possible interventions in the hierarchy of hazard controls, well below engineering-level fixes.',
      },
    ],
  },
  {
    id: 'q3',
    system: 'Biostatistics',
    stem: 'A randomized controlled trial finds that a new medication reduces the incidence of stroke from 10% in the placebo group to 5% in the treatment group over 5 years. Which of the following is the number needed to treat (NNT) to prevent one stroke?',
    choices: [
      {
        id: 'a',
        text: '2',
        isCorrect: false,
        explanation: 'This does not correspond to any standard calculation from the data given.',
      },
      {
        id: 'b',
        text: '5',
        isCorrect: false,
        explanation: 'This is the absolute risk reduction expressed as a whole number (5%), not the NNT, which is 1 divided by the absolute risk reduction.',
      },
      {
        id: 'c',
        text: '10',
        isCorrect: false,
        explanation: 'This is the baseline (placebo group) risk percentage, not the NNT.',
      },
      {
        id: 'd',
        text: '20',
        isCorrect: true,
        explanation:
          'Absolute risk reduction (ARR) = 10% minus 5% = 5%, or 0.05. NNT = 1 / ARR = 1 / 0.05 = 20. You would need to treat 20 patients with the new medication for 5 years to prevent one additional stroke compared with placebo.',
      },
      {
        id: 'e',
        text: '50',
        isCorrect: false,
        explanation: 'This does not correspond to any standard calculation from the data given.',
      },
    ],
  },
  {
    id: 'q4',
    system: 'Ethics & Law',
    stem: 'An 81-year-old man with mild dementia is admitted for pneumonia. He initially agrees to intravenous antibiotics but later refuses further treatment, stating he wants to go home, though he is unable to explain the risks of leaving untreated. His daughter, who holds his health care power of attorney, insists he continue treatment. Which of the following is the most appropriate next step?',
    choices: [
      {
        id: 'a',
        text: "Assess the patient's decision-making capacity specifically for this decision",
        isCorrect: true,
        explanation:
          'Decision-making capacity is decision-specific and must be assessed by the treating physician for the specific decision at hand, rather than assumed to be globally absent because of a dementia diagnosis or globally present because he consented earlier. A surrogate\'s authority, such as the daughter\'s power of attorney, only becomes active once the patient is determined to lack capacity for that specific decision.',
      },
      {
        id: 'b',
        text: 'Continue treatment because the daughter has health care power of attorney',
        isCorrect: false,
        explanation: 'A health care proxy\'s authority is not automatic; it only takes effect once the patient is formally assessed to lack capacity for the decision in question.',
      },
      {
        id: 'c',
        text: 'Discharge the patient against medical advice per his request',
        isCorrect: false,
        explanation: 'This is premature without first assessing capacity, since untreated pneumonia can be life-threatening and his inability to explain the risks raises real concern about his capacity for this decision.',
      },
      {
        id: 'd',
        text: 'Obtain an emergency court order to compel treatment',
        isCorrect: false,
        explanation: 'This is a premature, resource-intensive step that skips the standard first step of a bedside capacity assessment.',
      },
      {
        id: 'e',
        text: 'Sedate the patient to safely continue intravenous antibiotics',
        isCorrect: false,
        explanation: 'Sedating a patient to override his stated wishes without first assessing his capacity would violate his autonomy if he is in fact found to have capacity.',
      },
    ],
  },
  {
    id: 'q5',
    system: 'Endocrinology / Cardiology',
    stem: 'A 46-year-old woman with type 2 diabetes has a hemoglobin A1c of 8.2% despite maximally tolerated metformin monotherapy and consistent adherence to diet and exercise. She has a history of heart failure with reduced ejection fraction. Which of the following is the most appropriate medication to add next?',
    choices: [
      {
        id: 'a',
        text: 'Dipeptidyl peptidase-4 (DPP-4) inhibitor',
        isCorrect: false,
        explanation: 'DPP-4 inhibitors are reasonable glucose-lowering agents in general, but they do not offer a cardiovascular or heart failure benefit, and some agents in this class have even been linked to increased heart failure hospitalization risk.',
      },
      {
        id: 'b',
        text: 'Sodium-glucose cotransporter-2 (SGLT2) inhibitor',
        isCorrect: true,
        explanation:
          'In patients with type 2 diabetes and established heart failure with reduced ejection fraction, SGLT2 inhibitors are preferred as the next agent after metformin, since trial evidence has shown they reduce heart failure hospitalizations and cardiovascular mortality independent of their glucose-lowering effect.',
      },
      {
        id: 'c',
        text: 'Sulfonylurea',
        isCorrect: false,
        explanation: 'A sulfonylurea lowers glucose but does not offer the same cardiovascular or heart failure benefit and is not preferred given this comorbidity profile.',
      },
      {
        id: 'd',
        text: 'Thiazolidinedione',
        isCorrect: false,
        explanation: 'Thiazolidinediones are relatively contraindicated in heart failure because they cause fluid retention and can worsen symptoms.',
      },
      {
        id: 'e',
        text: 'Basal insulin',
        isCorrect: false,
        explanation: 'Basal insulin is typically reserved for more advanced or symptomatic hyperglycemia rather than as the automatic second-line agent in this scenario.',
      },
    ],
  },
];
