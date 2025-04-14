import { DbTeacher } from './teacher.entity';

export class DbTeacherCertificate {
  id: string;
  teacherId: string;
  teacher?: DbTeacher;
  name: string;
  issuer: string;
  credId?: string;
  credLink?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
