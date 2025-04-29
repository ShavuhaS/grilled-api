import { DbUser } from './user.entity';
import { DbCourseCategory } from './course-category.entity';

export class DbCategoryFollower {
  userId: string;
  user?: DbUser;
  categoryId: string;
  category?: DbCourseCategory;
  createdAt?: Date;
  updatedAt?: Date;
}