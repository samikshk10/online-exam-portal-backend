export interface MCQQuestionResponse {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface CodeQuestionResponse {
  id: string;
  question: string;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
