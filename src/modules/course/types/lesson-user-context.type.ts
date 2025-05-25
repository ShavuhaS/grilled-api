import { TestResults } from '../../test/types/test-results.type';

export type LessonUserContext =
  | {
      isStudent: false;
    }
  | {
      isStudent: true;
      completed: boolean;
      testResults?: TestResults;
    };
