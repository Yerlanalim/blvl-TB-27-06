import { AnswerDifficulty, UserBookmarks } from '@prisma/client';
import { BaseRecord } from './BaseRecord';
import { QuestionDifficulty } from './Questions';
import { User } from './User';

type RoadmapStatus = 'ACTIVE' | 'COMPLETED' | 'ARCHIVED' | 'CREATING';

// Специальный тип для roadmap question с корректной типизацией answers
export type RoadmapQuestionWithAnswers = Omit<RoadmapUserQuestions, 'answers' | 'userAnswers'> & {
  answers: RoadmapUserQuestionsAnswers[];
};

// Main roadmap associated with a user
export interface UserRoadmaps extends BaseRecord {
  // Connects to the user
  userUid: string;
  // Related questions specific to this roadmap
  questions: RoadmapUserQuestions[];
  // Status of the roadmap (active, completed, archived, creating)
  status: RoadmapStatus;
  // User answers to default questions
  DefaultRoadmapQuestionsUsersAnswers?: DefaultRoadmapQuestionsUsersAnswers[];
  // Index of the user's current question
  currentQuestionIndex: number;
  // Indicates if the roadmap has been generated
  hasGeneratedRoadmap: boolean;
  // the roadmap title
  title: string | null;
  // the roadmap description
  description: string | null;
}

export type UserRoadmapsWithAnswers = Omit<UserRoadmaps, 'DefaultRoadmapQuestionsUsersAnswers'> &
  RoadmapUserQuestionsAnswers;

// Individual questions in a user's roadmap
export interface RoadmapUserQuestions extends BaseRecord {
  // Question text
  question: string;
  // Optional code snippet for the question
  codeSnippet: string | null;
  // Optional hint to help the user
  hint: string | null;
  // Enum for question difficulty
  difficulty: QuestionDifficulty;
  // Track completion status for this question
  completed: boolean;
  // Timestamp for when the question was completed
  completedAt: Date | null;
  // Connect to the associated roadmap
  roadmapUid: string;
  // Relation to the UserRoadmaps type
  // Connects to the correct answer
  correctAnswerUid: string;
  // Array of possible answers
  answers: RoadmapUserQuestionsUserAnswers[];
  // User-specific answers
  userAnswers?: RoadmapUserQuestionsUserAnswers[];
  // Order of the question in the roadmap
  order: number;
  // Indicates if the user answered the question correctly
  userCorrect: boolean;

  // the bookmark
  bookmarks?: UserBookmarks[];
}

// Possible answers for roadmap questions
export interface RoadmapUserQuestionsAnswers extends BaseRecord {
  // Connects to the associated roadmap question
  questionUid: string;
  // Indicates whether this is the correct answer
  correct: boolean;
  // Answer text
  answer: string;
  // Connects to the user who answered the question
  answerUid: string;
}

// User-provided answers to roadmap questions
interface RoadmapUserQuestionsUserAnswers extends BaseRecord {
  // Connects to the associated roadmap question
  questionUid: string;
  // Relation to the RoadmapUserQuestions type
  question: RoadmapUserQuestions;
  // Indicates whether the user's answer was correct
  correct: boolean;
  // User-provided answer text
  answer: string;
  // the difficulty of the answer
  difficulty: AnswerDifficulty;
}

// Default questions used to generate user roadmaps
export interface DefaultRoadmapQuestions extends BaseRecord {
  // Default question text
  question: string;
  // Optional code snippet for the default question
  codeSnippet: string | null;
  // Optional hint for the question
  hint: string | null;
  // Enum for question difficulty
  difficulty: QuestionDifficulty;
  // Submitted answers
  answers: DefaultRoadmapQuestionsAnswers[];
  // Connects to the correct answer
  correctAnswer: string;
  // Order of the question in the default roadmap
  order: number;
  // AI-generated title for the question
  aiTitle: string | null;
}

// User answers to the default roadmap questions
interface DefaultRoadmapQuestionsAnswers extends BaseRecord {
  // Connects to the associated default question
  questionUid: string;
  // User-provided answer text
  answer: string;
}

// User-specific answers to default roadmap questions
interface DefaultRoadmapQuestionsUsersAnswers extends BaseRecord {
  // Connects to the associated default question
  questionUid: string;
  // Relation to the DefaultRoadmapQuestions type
  question: DefaultRoadmapQuestions;
  // Connects to the user who answered the question
  userUid: string;
  // Relation to the Users type
  user: User;
  // Indicates whether the user's answer was correct
  correct: boolean;
  // User-provided answer text
  answer: string;
  // Connects to the associated roadmap
  roadmapUid: string;
  // Relation to the UserRoadmaps type
  roadmap: UserRoadmaps;
}
