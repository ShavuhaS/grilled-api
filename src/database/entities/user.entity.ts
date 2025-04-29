import { RoleEnum } from '../../common/enums/role.enum';
import { UserStateEnum } from '../../common/enums/user-state.enum';
import { DbVerifyEmailToken } from './verify-email-token.entity';
import { DbSkillFollower } from './skill-follower.entity';
import { DbCategoryFollower } from './category-follower.entity';
import { DbTeacher } from './teacher.entity';
import { DbUserCourse } from './user-course.entity';
import { DbCourseQuestion } from './course-question.entity';
import { DbCourseQuestionReply } from './course-question-reply.entity';
import { DbCompletedLesson } from './completed-lesson.entity';
import { DbTestResult } from './test-result.entity';
import { DbUserQuestionAnswer } from './user-question-answer.entity';

export class DbUser {
  id: string;
  googleId?: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  state: UserStateEnum;
  role: RoleEnum;
  lastPasswordChange: Date;
  lastLearning: Date;
  learningStreak: number;
  createdAt?: Date;
  updatedAt?: Date;
  teacher?: DbTeacher;
  verifyEmailToken?: DbVerifyEmailToken;
  followedSkills?: DbSkillFollower[];
  followedCategories?: DbCategoryFollower[];
  courses?: DbUserCourse[];
  courseQuestions?: DbCourseQuestion[];
  courseQuestionReplies?: DbCourseQuestionReply[];
  completedLessons?: DbCompletedLesson[];
  testResults?: DbTestResult[];
  testQuestionAnswers?: DbUserQuestionAnswer[];
}
