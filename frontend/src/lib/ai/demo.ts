// Realistic fallback content used when no API key is configured (DEMO MODE).
// This guarantees the product is fully demonstrable offline / on stage.

import type {
  GradeInput,
  GradeResult,
  LessonInput,
  Quiz,
  QuizInput,
  QuizQuestion,
  QuestionType,
} from "../types";

const min = (total: number, pct: number) => Math.max(1, Math.round((total * pct) / 100));

export function demoLesson(input: LessonInput): string {
  const { subject, grade, topic, durationMinutes: d } = input;
  const hook = min(d, 12);
  const direct = min(d, 30);
  const guided = min(d, 25);
  const independent = min(d, 18);
  const wrap = Math.max(1, d - hook - direct - guided - independent);

  return `> _Demo content — add an Anthropic API key in \`.env.local\` to generate tailored plans with Claude._

## Learning Objectives
By the end of this lesson, students will be able to:
- Explain the key ideas behind **${topic}** in their own words.
- Apply ${topic} to solve a guided practice problem or scenario.
- Connect ${topic} to a real-world example relevant to ${grade} learners.

## Materials & Preparation
- Slides / board for the core explanation
- Printed practice handout (1 per student)
- Short ${subject} warm-up prompt displayed on entry
- Exit-ticket slips

## Lesson Flow
| Phase | Time | What the teacher does | What students do |
| --- | --- | --- | --- |
| Hook | ${hook} min | Pose a curiosity question about ${topic} | Predict & discuss with a partner |
| Direct Instruction | ${direct} min | Explain ${topic} with worked examples | Take structured notes |
| Guided Practice | ${guided} min | Model one problem, then circulate | Solve in pairs |
| Independent Practice | ${independent} min | Support struggling students | Work individually |
| Wrap-up & Check | ${wrap} min | Review key points, collect exit tickets | Complete exit ticket |

## Core Explanation
${topic} is a foundational idea in ${subject}. Introduce it by connecting to what students already know, then build up the new concept step by step. Use at least two worked examples and make the reasoning visible at each step. Pause frequently to check understanding with quick questions.

## Guided & Independent Practice
- **Guided:** Work through one representative ${topic} problem together, narrating your thinking.
- **Independent:** Students complete 3–5 problems of increasing difficulty on the handout.

## Differentiation
- **Support:** Provide a partially completed example and sentence starters.
- **Extension:** Offer a challenge task that asks students to explain *why* ${topic} works.

## Homework
Write a short paragraph (4–6 sentences) explaining ${topic} to a younger student, with one example.

## Discussion Questions
- Where might you see ${topic} outside the classroom?
- What is the most common mistake people make with ${topic}, and why?
- How would you explain ${topic} to someone who has never heard of it?
- What questions do you still have about ${topic}?

## Exit Ticket
In one sentence: *What is the most important thing you learned about ${topic} today?*`;
}

function mcQuestion(id: number, topic: string): QuizQuestion {
  const options = [
    `A clear, correct statement about ${topic}`,
    `A common misconception about ${topic}`,
    `An unrelated statement`,
    `A partially-true but incomplete statement`,
  ];
  return {
    id,
    type: "multiple_choice",
    question: `Which of the following best describes ${topic}?`,
    options,
    answer: options[0],
    explanation: `Option A is the accurate description; the others are distractors based on typical errors.`,
  };
}

function tfQuestion(id: number, topic: string): QuizQuestion {
  return {
    id,
    type: "true_false",
    question: `True or False: Understanding ${topic} requires connecting it to prior knowledge.`,
    options: ["True", "False"],
    answer: "True",
    explanation: `New concepts like ${topic} are learned best when anchored to what students already know.`,
  };
}

function openQuestion(id: number, topic: string): QuizQuestion {
  return {
    id,
    type: "open",
    question: `Explain ${topic} in your own words and give one example.`,
    answer: `A strong answer defines ${topic} accurately and supports it with a relevant, correct example.`,
    explanation: `Look for an accurate definition plus a concrete, correct example.`,
  };
}

export function demoQuiz(input: QuizInput): Quiz {
  const builders: Record<QuestionType, (id: number, topic: string) => QuizQuestion> = {
    multiple_choice: mcQuestion,
    true_false: tfQuestion,
    open: openQuestion,
  };
  const types = input.types.length ? input.types : (["multiple_choice"] as QuestionType[]);
  const questions: QuizQuestion[] = [];
  for (let i = 0; i < input.numQuestions; i++) {
    const type = types[i % types.length];
    questions.push(builders[type](i + 1, input.topic));
  }
  return {
    title: `${input.topic} — ${input.subject} Quiz (${input.grade})`,
    questions,
  };
}

export function demoGrade(input: GradeInput): GradeResult {
  const len = input.studentAnswer.trim().split(/\s+/).filter(Boolean).length;
  const score = Math.max(55, Math.min(92, 60 + Math.round(len / 4)));
  return {
    score,
    summary: `A solid attempt that shows real understanding of the ${input.subject} task, with a few areas to refine.`,
    strengths: [
      "Addresses the main part of the question directly",
      "Uses relevant subject vocabulary",
      "Shows a logical line of reasoning",
    ],
    mistakes: [
      "One step in the explanation is incomplete and needs more detail",
      "A key term could be defined more precisely",
    ],
    recommendations: [
      `Review the core concept behind "${input.question.slice(0, 40)}…"`,
      "Add a worked example to support the explanation",
      "Re-read the answer aloud to check it fully answers the question",
    ],
  };
}

export function demoAssistant(question: string): string {
  const q = question.trim().replace(/\s+/g, " ");
  return `> _Demo response — add an Anthropic API key in \`.env.local\` for tailored, real-time answers from Claude._

Great question${q ? ` about *"${q.slice(0, 80)}${q.length > 80 ? "…" : ""}"*` : ""}! Here's a practical, classroom-ready approach:

**1. Start from what they know.** Open with a familiar example or a quick question that activates prior knowledge before introducing anything new.

**2. Make it concrete.** Use a visual, a hands-on demo, or a relatable analogy. Abstract ideas land far better when students can *see* or *do* them first.

**3. Check understanding often.** Use quick think-pair-share moments or a one-question exit ticket so you know who needs another pass.

**4. Differentiate.** Have a simpler scaffold ready for students who struggle and an extension question for those who finish early.

Want me to turn this into a full lesson plan or a short quiz? Head to the **Lesson Planner** or **Quiz Generator** and I'll build it for you.`;
}
