import type { SampleQuestion } from './sample-questions-quiz';

export const abimSampleQuestions: SampleQuestion[] = [
  {
    id: 'q1',
    system: 'Hematology',
    stem: 'A 68-year-old man presents with fatigue. Laboratory studies show hemoglobin 9.8 g/dL, MCV 72 fL, and ferritin 8 ng/mL. He has no history of gastrointestinal symptoms or overt blood loss. Which of the following is the most appropriate next step in management?',
    choices: [
      {
        id: 'a',
        text: 'Begin oral iron supplementation and recheck hemoglobin in 3 months',
        isCorrect: false,
        explanation: 'Starting iron without investigating the underlying cause risks missing a treatable malignancy, such as a colonic source of occult blood loss.',
      },
      {
        id: 'b',
        text: 'Bone marrow biopsy',
        isCorrect: false,
        explanation: 'Bone marrow biopsy is not first-line for straightforward iron deficiency anemia with a clearly low ferritin.',
      },
      {
        id: 'c',
        text: 'Colonoscopy and upper endoscopy',
        isCorrect: true,
        explanation:
          'Iron deficiency anemia in an older man (or a postmenopausal woman) without an obvious source should prompt evaluation for occult gastrointestinal blood loss, most commonly from a colonic or gastric malignancy, even without overt GI symptoms. Bidirectional endoscopy is the standard next step.',
      },
      {
        id: 'd',
        text: 'Reassurance; this is consistent with anemia of chronic disease',
        isCorrect: false,
        explanation: 'Anemia of chronic disease typically shows a normal or elevated ferritin, not a markedly low one like 8 ng/mL, which is essentially diagnostic of true iron deficiency.',
      },
      {
        id: 'e',
        text: 'Serum protein electrophoresis',
        isCorrect: false,
        explanation: 'Serum protein electrophoresis evaluates for plasma cell disorders such as multiple myeloma, which is not suggested by this microcytic, iron-deficient picture.',
      },
    ],
  },
  {
    id: 'q2',
    system: 'Rheumatology',
    stem: 'A 55-year-old man presents with acute swelling and severe pain in his right great toe that began overnight. Examination shows warmth, erythema, and exquisite tenderness at the first metatarsophalangeal joint. Arthrocentesis reveals needle-shaped, negatively birefringent crystals under polarized light. Which of the following is the most appropriate initial treatment?',
    choices: [
      {
        id: 'a',
        text: 'Allopurinol',
        isCorrect: false,
        explanation: 'Urate-lowering therapy is not started during an acute flare, since initiating it can actually worsen or prolong the attack; it is started later, once the flare has resolved.',
      },
      {
        id: 'b',
        text: 'Colchicine or an NSAID',
        isCorrect: true,
        explanation:
          'This presentation, podagra with negatively birefringent, needle-shaped crystals, is classic for an acute gout flare. First-line treatment for an acute flare is an NSAID, colchicine, or a corticosteroid, chosen based on the patient\'s comorbidities.',
      },
      {
        id: 'c',
        text: 'Intravenous vancomycin',
        isCorrect: false,
        explanation: 'Vancomycin would be appropriate for a septic joint, but the crystal findings here confirm gout rather than infection.',
      },
      {
        id: 'd',
        text: 'Methotrexate',
        isCorrect: false,
        explanation: 'Methotrexate is used for rheumatoid arthritis, not gout.',
      },
      {
        id: 'e',
        text: 'Probenecid',
        isCorrect: false,
        explanation: 'Like allopurinol, probenecid is a urate-lowering agent for long-term prevention and is not appropriate to start during an acute flare.',
      },
    ],
  },
  {
    id: 'q3',
    system: 'Nephrology',
    stem: 'A 74-year-old woman is hospitalized for a gastrointestinal illness with several days of vomiting and poor oral intake. Her creatinine has risen from a baseline of 0.9 mg/dL to 2.1 mg/dL. Urinalysis shows no protein or blood, and microscopy shows no casts. Fractional excretion of sodium is 0.8%. Which of the following is the most likely cause of her acute kidney injury?',
    choices: [
      {
        id: 'a',
        text: 'Acute interstitial nephritis',
        isCorrect: false,
        explanation: 'Acute interstitial nephritis often shows white blood cells or white cell casts, sometimes eosinophils, and is usually related to a drug exposure.',
      },
      {
        id: 'b',
        text: 'Acute tubular necrosis',
        isCorrect: false,
        explanation: 'Acute tubular necrosis typically shows a higher fractional excretion of sodium (above 2%) along with muddy brown granular casts on microscopy, reflecting tubular cell injury.',
      },
      {
        id: 'c',
        text: 'Prerenal azotemia',
        isCorrect: true,
        explanation:
          'A low fractional excretion of sodium (under 1%) in the setting of volume depletion, from vomiting and poor oral intake, with a bland urinalysis showing no protein, blood, or casts, is classic for prerenal azotemia, where the kidneys are appropriately conserving sodium and water in response to reduced renal perfusion.',
      },
      {
        id: 'd',
        text: 'Rapidly progressive glomerulonephritis',
        isCorrect: false,
        explanation: 'Rapidly progressive glomerulonephritis would show red blood cell casts and significant proteinuria, neither of which is present here.',
      },
      {
        id: 'e',
        text: 'Urinary tract obstruction',
        isCorrect: false,
        explanation: 'Obstruction would typically be suggested by hydronephrosis on imaging, not by the labs described here.',
      },
    ],
  },
  {
    id: 'q4',
    system: 'Gastroenterology',
    stem: 'A 59-year-old man with cirrhosis due to alcohol use disorder is hospitalized with worsening ascites and new confusion. Temperature is 38.1°C. Paracentesis shows an ascitic fluid absolute neutrophil count of 350 cells/mm3. Which of the following is the most appropriate next step in management?',
    choices: [
      {
        id: 'a',
        text: 'Discharge with outpatient follow-up; this ascitic fluid count is normal',
        isCorrect: false,
        explanation: 'An ascitic fluid absolute neutrophil count of 250 cells/mm3 or higher is diagnostic of spontaneous bacterial peritonitis, and this patient\'s count of 350 exceeds that threshold.',
      },
      {
        id: 'b',
        text: 'Empiric intravenous antibiotics',
        isCorrect: true,
        explanation:
          'An ascitic fluid absolute neutrophil count of 250 cells/mm3 or higher is diagnostic of spontaneous bacterial peritonitis (SBP), regardless of whether the fluid culture is positive, and warrants prompt empiric intravenous antibiotics, typically a third-generation cephalosporin, since untreated SBP carries significant morbidity and mortality.',
      },
      {
        id: 'c',
        text: 'Large-volume paracentesis for symptomatic relief only',
        isCorrect: false,
        explanation: 'Paracentesis alone provides symptomatic relief but does not treat the underlying infection.',
      },
      {
        id: 'd',
        text: 'Liver transplantation evaluation',
        isCorrect: false,
        explanation: 'Transplant evaluation may be appropriate longer-term but is not the immediate next step for an acute infection.',
      },
      {
        id: 'e',
        text: 'Start lactulose alone without antibiotics',
        isCorrect: false,
        explanation: 'Lactulose treats the hepatic encephalopathy, but antibiotics for the underlying SBP trigger cannot be omitted.',
      },
    ],
  },
  {
    id: 'q5',
    system: 'Infectious Disease',
    stem: 'A 70-year-old woman completes a 10-day course of oral vancomycin for her first episode of Clostridioides difficile infection, with initial resolution of diarrhea. Two weeks after completing therapy, her diarrhea recurs, and stool testing is again positive for C. difficile toxin. Which of the following is the most appropriate treatment for this first recurrence?',
    choices: [
      {
        id: 'a',
        text: 'Fecal microbiota transplantation',
        isCorrect: false,
        explanation: 'Fecal microbiota transplantation is generally reserved for multiple recurrences, typically the second or later recurrence, not the first.',
      },
      {
        id: 'b',
        text: 'IV metronidazole',
        isCorrect: false,
        explanation: 'Metronidazole is not preferred for C. difficile infection, since it does not achieve adequate colonic concentrations compared with oral therapy; current guidelines reserve it for when oral therapy is not feasible.',
      },
      {
        id: 'c',
        text: 'Oral fidaxomicin',
        isCorrect: true,
        explanation:
          'For a first recurrence of C. difficile infection, oral fidaxomicin is preferred over repeating the same standard vancomycin course, since it is associated with a lower recurrence rate. If fidaxomicin is unavailable, a prolonged tapered and pulsed vancomycin regimen is an alternative.',
      },
      {
        id: 'd',
        text: 'Oral vancomycin at the same dose and duration as before',
        isCorrect: false,
        explanation: 'Simply repeating the original standard regimen is less effective for recurrent disease than fidaxomicin or a tapered and pulsed vancomycin course.',
      },
      {
        id: 'e',
        text: 'Watchful waiting; recurrence is expected and self-limited',
        isCorrect: false,
        explanation: 'This is inappropriate given the risk of ongoing morbidity, dehydration, and potential progression to severe disease.',
      },
    ],
  },
];
