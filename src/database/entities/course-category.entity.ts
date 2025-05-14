import { DbCourse } from './course.entity';
import { DbCategoryFollower } from './category-follower.entity';

export class DbCourseCategory {
  id: string;
  parentId?: string;
  parent?: DbCourseCategory;
  subcategories?: DbCourseCategory[];
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  courses?: DbCourse[];
  followers?: DbCategoryFollower[];
}
