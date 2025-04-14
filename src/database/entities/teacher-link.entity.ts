import { DbTeacher } from './teacher.entity';

export class DbTeacherLink {
  id: string;
  teacherId: string;
  teacher?: DbTeacher;
  name: string;
  link: string;
  createdAt?: Date;
  updatedAt?: Date;
}
