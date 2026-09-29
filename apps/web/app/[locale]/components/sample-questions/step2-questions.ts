import type { SampleQuestion } from './sample-questions-quiz';

export const step2SampleQuestions: SampleQuestion[] = [
  {
    id: 'q1',
    system: 'Cardiology',
    stem: 'A 68-year-old woman is brought to the emergency department with palpitations and lightheadedness that began 2 hours ago. Blood pressure is 78/50 mmHg, heart rate is 160/min and irregularly irregular, and she appears diaphoretic and confused. An ECG shows atrial fibrillation with a rapid ventricular response. Which of the following is the most appropriate next step in management?',
    choices: [
      {
        id: 'a',
        text: 'IV diltiazem',
        isCorrect: false,
        explanation:
          'IV diltiazem is appropriate for rate control in a hemodynamically stable patient, but in an unstable patient it can further lower blood pressure and delay definitive treatment.',
      },
      {
        id: 'b',
        text: 'IV metoprolol',
        isCorrect: false,
        explanation:
          'Like diltiazem, IV metoprolol is a rate-control option for stable atrial fibrillation, not the immediate step when a patient is hypotensive and confused.',
      },
      {
        id: 'c',
        text: 'Oral amiodarone load',
        isCorrect: false,
        explanation: 'Oral amiodarone loading takes too long to correct an acute, hemodynamically unstable arrhythmia.',
      },
      {
        id: 'd',
        text: 'Synchronized electrical cardioversion',
        isCorrect: true,
        explanation:
          'Any tachyarrhythmia causing hemodynamic instability (hypotension, altered mental status, ischemic chest pain, or shock) warrants immediate synchronized cardioversion, regardless of the rhythm or prior rate-control history. Synchronized cardioversion times the shock to the R wave to avoid inducing ventricular fibrillation, which is what separates it from defibrillation.',
      },
      {
        id: 'e',
        text: 'Unsynchronized defibrillation',
        isCorrect: false,
        explanation:
          'Unsynchronized defibrillation is used for pulseless ventricular tachycardia or fibrillation, not for a patient with a pulse and an organized, if irregular, rhythm. An unsynchronized shock delivered during a T wave in a patient with a pulse can itself precipitate ventricular fibrillation.',
      },
    ],
  },
  {
    id: 'q2',
    system: 'Obstetrics',
    stem: 'A 32-year-old woman at 34 weeks gestation presents with headache and blurry vision. Blood pressure is 168/112 mmHg on two readings taken 15 minutes apart, and urinalysis shows 3+ protein. Deep tendon reflexes are brisk. Which of the following is the most appropriate next step in management to prevent this patient\'s most serious immediate complication?',
    choices: [
      {
        id: 'a',
        text: 'Intravenous labetalol',
        isCorrect: false,
        explanation:
          'IV labetalol treats the hypertension itself and is appropriate here, but it does not prevent seizures, which is the most serious immediate risk the question is asking about.',
      },
      {
        id: 'b',
        text: 'Intravenous magnesium sulfate',
        isCorrect: true,
        explanation:
          'This patient has preeclampsia with severe features (blood pressure at least 160/110 plus symptoms such as headache or visual changes). The most immediate life-threatening complication is an eclamptic seizure, and IV magnesium sulfate is the standard for seizure prophylaxis in severe preeclampsia, independent of blood pressure control.',
      },
      {
        id: 'c',
        text: 'Oral nifedipine',
        isCorrect: false,
        explanation: 'Like labetalol, oral nifedipine lowers blood pressure but does not address seizure prevention.',
      },
      {
        id: 'd',
        text: 'Emergent cesarean delivery',
        isCorrect: false,
        explanation:
          'Delivery may ultimately be needed depending on gestational age and maternal or fetal status, but it is not the immediate next step for seizure prevention, and vaginal delivery may still be attempted first if the patient is stable.',
      },
      {
        id: 'e',
        text: 'Betamethasone injection',
        isCorrect: false,
        explanation:
          'Betamethasone accelerates fetal lung maturity and is appropriate at 34 weeks, but it does not address the immediate maternal seizure risk.',
      },
    ],
  },
  {
    id: 'q3',
    system: 'Psychiatry',
    stem: 'A 24-year-old woman is brought to the emergency department by her roommate after being found confused and agitated. She started fluoxetine 2 weeks ago for depression and took an over-the-counter cough suppressant containing dextromethorphan yesterday. Temperature is 39.4°C, heart rate is 128/min, and blood pressure is 162/98 mmHg. She is diaphoretic with tremor, hyperreflexia, and clonus in both lower extremities. Which of the following is the most likely diagnosis?',
    choices: [
      {
        id: 'a',
        text: 'Malignant hyperthermia',
        isCorrect: false,
        explanation: 'Malignant hyperthermia occurs after exposure to inhaled anesthetics or succinylcholine, not psychiatric or cough medications.',
      },
      {
        id: 'b',
        text: 'Neuroleptic malignant syndrome',
        isCorrect: false,
        explanation:
          'Neuroleptic malignant syndrome instead causes "lead-pipe" rigidity and hyporeflexia, develops over days, and typically follows antipsychotic use or dopamine antagonist withdrawal, not serotonergic drugs.',
      },
      {
        id: 'c',
        text: 'Serotonin syndrome',
        isCorrect: true,
        explanation:
          'The combination of two serotonergic agents (an SSRI and dextromethorphan, both of which increase serotonergic activity), hyperthermia, autonomic instability, and neuromuscular findings of hyperreflexia and clonus, especially lower-extremity predominant, is classic for serotonin syndrome. Clonus and hyperreflexia are the key exam findings that separate it from neuroleptic malignant syndrome.',
      },
      {
        id: 'd',
        text: 'Anticholinergic toxicity',
        isCorrect: false,
        explanation: 'Anticholinergic toxicity causes dry skin and absent bowel sounds, not diaphoresis and clonus.',
      },
      {
        id: 'e',
        text: 'Alcohol withdrawal',
        isCorrect: false,
        explanation: 'There is no alcohol use history here, and alcohol withdrawal does not explain the clear serotonergic drug trigger.',
      },
    ],
  },
  {
    id: 'q4',
    system: 'Surgery',
    stem: 'A 54-year-old man is postoperative day 1 after an open cholecystectomy. He develops a temperature of 38.3°C. He denies chest pain or shortness of breath, and his surgical incision looks clean without erythema or drainage. Lung auscultation reveals decreased breath sounds at both bases. Which of the following is the most likely cause of this patient\'s fever?',
    choices: [
      {
        id: 'a',
        text: 'Atelectasis',
        isCorrect: true,
        explanation:
          'Fever on postoperative day 1 is most commonly caused by atelectasis, from shallow breathing and poor lung expansion after anesthesia and incisional pain, consistent with the decreased basilar breath sounds described here. This timing is often remembered among the postoperative fever causes ("the 5 W\'s"): Wind (atelectasis or pneumonia) around days 1 to 2, Water (UTI) around day 3, Walking (DVT or PE) around days 4 to 6, and Wound (surgical site infection) around days 5 to 7.',
      },
      {
        id: 'b',
        text: 'Deep vein thrombosis',
        isCorrect: false,
        explanation: 'DVT-related fever typically presents later, around postoperative days 4 to 6, and would usually come with leg swelling or pain.',
      },
      {
        id: 'c',
        text: 'Surgical site infection',
        isCorrect: false,
        explanation: 'A clean, non-erythematous incision without drainage argues against surgical site infection, which also tends to present later, around days 5 to 7.',
      },
      {
        id: 'd',
        text: 'Urinary tract infection',
        isCorrect: false,
        explanation: 'Postoperative UTI classically presents a bit later, around day 3, and there are no urinary symptoms described here.',
      },
      {
        id: 'e',
        text: 'Clostridioides difficile colitis',
        isCorrect: false,
        explanation: 'C. difficile colitis usually follows several days of antibiotic exposure and presents with diarrhea, neither of which fits this vignette.',
      },
    ],
  },
  {
    id: 'q5',
    system: 'Pediatrics',
    stem: "An 11-month-old boy is brought to the emergency department for intermittent episodes of crying and drawing his knees to his chest, each lasting a few minutes, followed by periods where he appears comfortable. His mother reports one episode of red, mucoid ('currant jelly') stool. Abdominal examination reveals a palpable, sausage-shaped mass in the right upper quadrant. Which of the following is the most appropriate next step in management?",
    choices: [
      {
        id: 'a',
        text: 'Abdominal CT with contrast',
        isCorrect: false,
        explanation:
          'CT is not first-line in children because of radiation exposure. Ultrasound (showing a "target sign") is the preferred initial imaging study when the diagnosis is uncertain, followed directly by enema reduction rather than CT.',
      },
      {
        id: 'b',
        text: 'Air or contrast enema',
        isCorrect: true,
        explanation:
          'This presentation, intermittent colicky abdominal pain, currant jelly stools, and a sausage-shaped abdominal mass, is classic for intussusception, most commonly ileocolic in this age group. An air or contrast enema is both diagnostic and therapeutic in a hemodynamically stable child without signs of perforation or peritonitis, successfully reducing most cases without surgery.',
      },
      {
        id: 'c',
        text: 'Exploratory laparotomy',
        isCorrect: false,
        explanation: 'Surgery is reserved for cases with signs of perforation, peritonitis, hemodynamic instability, or failed enema reduction, none of which are described here.',
      },
      {
        id: 'd',
        text: 'Reassurance and outpatient follow-up',
        isCorrect: false,
        explanation: 'Reassurance is inappropriate given the real risk of bowel ischemia and perforation if intussusception is left untreated.',
      },
      {
        id: 'e',
        text: 'Upper GI series with small bowel follow-through',
        isCorrect: false,
        explanation: 'An upper GI series evaluates for different pathology, such as malrotation with volvulus, not intussusception.',
      },
    ],
  },
];
