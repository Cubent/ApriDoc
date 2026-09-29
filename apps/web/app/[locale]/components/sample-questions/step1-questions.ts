import type { SampleQuestion } from './sample-questions-quiz';

export const step1SampleQuestions: SampleQuestion[] = [
  {
    id: 'q1',
    system: 'Cardiovascular / Pharmacology',
    stem: "A 62-year-old man with a history of hypertension begins a new medication for blood pressure control. Three weeks later, he returns to clinic complaining of a persistent, dry, nonproductive cough that has not responded to over-the-counter cough suppressants. Chest examination and chest x-ray are unremarkable. Which of the following is the most likely cause of this patient's cough?",
    choices: [
      {
        id: 'a',
        text: 'Accumulation of bradykinin',
        isCorrect: true,
        explanation:
          'ACE inhibitors block the enzyme that degrades bradykinin (and substance P), in addition to blocking the conversion of angiotensin I to angiotensin II. Elevated bradykinin in the respiratory tract irritates sensory nerve fibers, producing a dry cough in up to 20% of patients. Switching to an angiotensin receptor blocker, which does not affect bradykinin metabolism, typically resolves the cough.',
      },
      {
        id: 'b',
        text: 'Beta-2 receptor blockade in bronchial smooth muscle',
        isCorrect: false,
        explanation:
          'Beta-blockers can cause bronchospasm in patients with reactive airway disease, but that presents as wheezing and dyspnea, not an isolated dry cough with a normal exam.',
      },
      {
        id: 'c',
        text: 'Direct irritation of the pharyngeal mucosa',
        isCorrect: false,
        explanation:
          'There is no exam or history finding to suggest direct mucosal irritation, and it would not explain why the cough started only after a new medication.',
      },
      {
        id: 'd',
        text: 'Hypersensitivity pneumonitis',
        isCorrect: false,
        explanation:
          'Hypersensitivity pneumonitis usually follows an inhaled antigen exposure and causes dyspnea with abnormal imaging, not an isolated dry cough with a normal chest x-ray.',
      },
      {
        id: 'e',
        text: 'Reflex bronchoconstriction from calcium channel blockade',
        isCorrect: false,
        explanation:
          'Calcium channel blockers are more classically associated with peripheral edema, flushing, and gingival hyperplasia, not a bradykinin-mediated cough.',
      },
    ],
  },
  {
    id: 'q2',
    system: 'Biochemistry',
    stem: 'A 4-month-old infant is brought to the pediatrician after his mother began supplementing breastfeeding with fruit juice. Shortly after each feeding, the infant becomes lethargic and vomits, with episodes of sweating and trembling. Laboratory studies show hypoglycemia and elevated urine reducing substances. Deficiency of which of the following enzymes is the most likely cause of this presentation?',
    choices: [
      {
        id: 'a',
        text: 'Aldolase B',
        isCorrect: true,
        explanation:
          'This presentation is classic for hereditary fructose intolerance, caused by deficiency of aldolase B, which normally converts fructose-1-phosphate to dihydroxyacetone phosphate and glyceraldehyde. Without aldolase B, fructose-1-phosphate accumulates in the liver, trapping phosphate and impairing glycogenolysis and gluconeogenesis, causing severe hypoglycemia after fructose or sucrose ingestion.',
      },
      {
        id: 'b',
        text: 'Fructokinase',
        isCorrect: false,
        explanation: 'Fructokinase deficiency causes essential fructosuria, a benign, asymptomatic condition without hypoglycemia.',
      },
      {
        id: 'c',
        text: 'Galactose-1-phosphate uridyltransferase',
        isCorrect: false,
        explanation:
          'Galactose-1-phosphate uridyltransferase deficiency causes classic galactosemia, which presents after milk (lactose) exposure, not fruit juice.',
      },
      {
        id: 'd',
        text: 'Glucose-6-phosphatase',
        isCorrect: false,
        explanation:
          'Glucose-6-phosphatase deficiency is von Gierke disease, presenting with fasting hypoglycemia unrelated to fructose intake.',
      },
      {
        id: 'e',
        text: 'Phosphofructokinase-1',
        isCorrect: false,
        explanation:
          'Phosphofructokinase-1 deficiency causes glycogen storage disease type VII, associated with exercise intolerance, not fructose-triggered hypoglycemia.',
      },
    ],
  },
  {
    id: 'q3',
    system: 'Microbiology',
    stem: 'A 19-year-old college student presents with a 1-week history of fatigue, sore throat, and fever. Examination reveals bilateral posterior cervical lymphadenopathy, tonsillar exudates, and splenomegaly. A peripheral blood smear shows numerous atypical, reactive lymphocytes, and a heterophile antibody test is positive. Which of the following is the most likely causal organism?',
    choices: [
      {
        id: 'a',
        text: 'Cytomegalovirus',
        isCorrect: false,
        explanation: 'Cytomegalovirus can cause a similar mononucleosis-like syndrome, but it is heterophile-antibody negative.',
      },
      {
        id: 'b',
        text: 'Epstein-Barr virus',
        isCorrect: true,
        explanation:
          'This vignette is classic for infectious mononucleosis caused by Epstein-Barr virus (EBV), which infects B lymphocytes and provokes a robust CD8+ T-cell response, producing the atypical, reactive lymphocytes seen on smear. Splenomegaly and a positive heterophile antibody (Monospot) test support EBV, which is also why contact sports are restricted for several weeks after diagnosis.',
      },
      {
        id: 'c',
        text: 'Human herpesvirus 6',
        isCorrect: false,
        explanation: 'Human herpesvirus 6 causes roseola infantum, a disease of young children, not college-age patients.',
      },
      {
        id: 'd',
        text: 'Streptococcus pyogenes',
        isCorrect: false,
        explanation: 'Streptococcus pyogenes causes exudative pharyngitis but does not explain the splenomegaly or atypical lymphocytosis.',
      },
      {
        id: 'e',
        text: 'Toxoplasma gondii',
        isCorrect: false,
        explanation:
          'Toxoplasma gondii can also cause a mono-like illness but is heterophile-negative and usually tied to cat exposure or undercooked meat.',
      },
    ],
  },
  {
    id: 'q4',
    system: 'Immunology / Pharmacology',
    stem: 'A 68-year-old woman is treated with intravenous vancomycin for a skin and soft tissue infection. Twenty minutes into the infusion, she develops flushing, pruritus, and an erythematous rash over her face, neck, and upper trunk, with a mild decrease in blood pressure. Which of the following mechanisms best explains this reaction?',
    choices: [
      {
        id: 'a',
        text: 'IgE-mediated mast cell degranulation',
        isCorrect: false,
        explanation:
          'A true anaphylactic (IgE-mediated) reaction is a different mechanism, even though it can look similar clinically; it is not the classic explanation for a rate-related infusion reaction like this one.',
      },
      {
        id: 'b',
        text: 'Direct, non-IgE-mediated mast cell and basophil degranulation',
        isCorrect: true,
        explanation:
          '"Red man syndrome" is caused by vancomycin directly triggering mast cell and basophil degranulation independent of IgE, typically related to the rate of infusion. It is not a true allergy, and it can usually be managed, and prevented on future doses, by slowing the infusion rate and premedicating with antihistamines, rather than by avoiding vancomycin altogether.',
      },
      {
        id: 'c',
        text: 'Immune complex deposition in small vessels',
        isCorrect: false,
        explanation:
          'Immune complex deposition (type III hypersensitivity) causes reactions like serum sickness, which occur days after exposure, not minutes into an infusion.',
      },
      {
        id: 'd',
        text: 'Type IV delayed-type hypersensitivity',
        isCorrect: false,
        explanation: 'Type IV, T-cell-mediated reactions develop over 1 to 2 days, not within minutes of drug exposure.',
      },
      {
        id: 'e',
        text: 'Direct myocardial depression from the drug',
        isCorrect: false,
        explanation: 'The findings described are mucocutaneous, not cardiac, so direct myocardial depression does not fit the presentation.',
      },
    ],
  },
  {
    id: 'q5',
    system: 'Pathology',
    stem: "A 27-year-old woman presents with a 3-month history of painless cervical lymphadenopathy and drenching night sweats. She also reports that the lymph nodes become painful after drinking alcohol. A lymph node biopsy shows large, binucleated cells with prominent eosinophilic nucleoli, described as having an 'owl's eye' appearance, surrounded by a mixed inflammatory infiltrate. Which of the following is the most likely diagnosis?",
    choices: [
      {
        id: 'a',
        text: 'Burkitt lymphoma',
        isCorrect: false,
        explanation:
          'Burkitt lymphoma shows a "starry sky" pattern with a MYC translocation, often presenting as a rapidly growing jaw or abdominal mass, not Reed-Sternberg cells.',
      },
      {
        id: 'b',
        text: 'Chronic lymphocytic leukemia',
        isCorrect: false,
        explanation:
          'Chronic lymphocytic leukemia shows small, mature-appearing lymphocytes with smudge cells on peripheral smear, not Reed-Sternberg cells.',
      },
      {
        id: 'c',
        text: 'Diffuse large B-cell lymphoma',
        isCorrect: false,
        explanation: 'Diffuse large B-cell lymphoma shows sheets of large atypical lymphoid cells without Reed-Sternberg cells.',
      },
      {
        id: 'd',
        text: 'Hodgkin lymphoma',
        isCorrect: true,
        explanation:
          'The binucleated "owl\'s eye" cells with prominent eosinophilic nucleoli are Reed-Sternberg cells, the diagnostic hallmark of Hodgkin lymphoma. Painless lymphadenopathy, B symptoms such as night sweats, and alcohol-induced lymph node pain are classic associated features, and Hodgkin lymphoma characteristically spreads contiguously between adjacent lymph node groups.',
      },
      {
        id: 'e',
        text: 'Follicular lymphoma',
        isCorrect: false,
        explanation:
          'Follicular lymphoma is characterized by a t(14;18) translocation and BCL-2 overexpression with a nodular growth pattern, not Reed-Sternberg cells.',
      },
    ],
  },
];
