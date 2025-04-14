import { DbUser } from './user.entity';
import { DbTeacherCertificate } from './teacher-certificate.entity';
import { DbTeacherLink } from './teacher-link.entity';

export class DbTeacher {
  userId: string;
  user?: DbUser;
  avatar?: string;
  workplace?: string;
  position?: string;
  aboutMe?: string;
  createdAt?: Date;
  updatedAt?: Date;
  certificates?: DbTeacherCertificate[];
  links?: DbTeacherLink[];
}
