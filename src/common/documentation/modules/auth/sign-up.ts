import { ApiDocumentationParams } from '../../types/api-documentation-params.type';
import { RegistrationDto } from '../../../dtos/registration.dto';

export const SignUpDocumentation: ApiDocumentationParams = {
  authRequired: false,
  body: {
    type: RegistrationDto,
  },
  ok: {
    description: 'Verification email has been successfully sent',
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Email should not be empty
      Email should be a string
      Email should be a valid email
      Password should not be empty
      Password should be a valid string
      Password should contain at least one lowercase letter, one uppercase letter, one digit, one special character, having from 8 to 64 characters in total
      Name should not be empty
      Name should be a string
      Name should be at least 2 characters long
      Name should be at most 40 characters long
      Surname should not be empty
      Surname should be at least 3 characters long
      Surname should be at most 40 characters long
      Role should not be empty
      Role should be either STUDENT, or TEACHER
      
    AlreadyRegisteredException:
      User with such credentials is already registered
      
    EmailAlreadySentException:
      Email verification email has already been sent`,
  },
};